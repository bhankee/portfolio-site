from __future__ import annotations

import os
from functools import lru_cache
from typing import List, Literal

import psycopg
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from openai import OpenAI
from pydantic import BaseModel
from pgvector.psycopg import register_vector

# IMPORTANT: this import should NOT create circular imports.
# In the improved ingest.py below, ingest.py will import get_db_conn/get_openai_client
# FROM THIS FILE, which is okay as long as ingest.py does not import app.
from ingest import ingest_resume  # <-- rename file to ingest.py

# -------------------------------
# Load environment variables
# -------------------------------
_BASE_DIR = os.path.dirname(os.path.abspath(__file__))
load_dotenv(dotenv_path=os.path.join(_BASE_DIR, ".env"), override=True)

# -------------------------------
# FastAPI app
# -------------------------------
app = FastAPI(title="Brad Portfolio RAG Backend")

# -------------------------------
# Pydantic models (API schemas)
# -------------------------------
class ChatMessage(BaseModel):
    role: Literal["system", "user", "assistant"]
    content: str


class ChatRequest(BaseModel):
    messages: List[ChatMessage]


class ChatResponse(BaseModel):
    reply: str


# -------------------------------
# Database connection (Supabase pooler)
# -------------------------------
def get_db_conn() -> psycopg.Connection:
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        raise RuntimeError("DATABASE_URL is not set")

    if "sslmode=" not in db_url:
        sep = "&" if "?" in db_url else "?"
        db_url = f"{db_url}{sep}sslmode=require"

    conn = psycopg.connect(db_url)

    # ✅ Teach psycopg how to send/receive pgvector values
    register_vector(conn)

    return conn


# DEV ONLY: Debug search endpoint
@app.get("/debug/search")
def debug_search(q: str):
    return {"q": q, "context": get_relevant_context(q, top_k=5)}

@app.get("/debug/counts")
def debug_counts():
    with get_db_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("select count(*) from documents;")
            docs = cur.fetchone()[0]
            cur.execute("select count(*) from chunks;")
            chunks = cur.fetchone()[0]
    return {"documents": docs, "chunks": chunks}



@app.get("/health/db")
def health_db():
    try:
        with get_db_conn() as conn:
            with conn.cursor() as cur:
                cur.execute("select now();")
                now = cur.fetchone()[0]
        return {"ok": True, "db_time": str(now)}
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"DB connection failed: {exc}")


# -------------------------------
# OpenAI client singleton
# -------------------------------
@lru_cache(maxsize=1)
def get_openai_client() -> OpenAI:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise RuntimeError("OPENAI_API_KEY is not set")
    return OpenAI(api_key=api_key)


# -------------------------------
# Startup ingestion (resume for now; extend later)
# -------------------------------
@app.on_event("startup")
def startup_ingest():
    """
    Runs once when the FastAPI process starts.
    Safe to call repeatedly because ingestion is idempotent (upsert + replace chunks).
    """
    try:
        ingest_resume()
    except Exception as exc:
        # For a portfolio app, you might prefer logging + continuing.
        # But failing fast is also fine if you want ingestion to be required.
        print(f"[startup] ingestion failed: {exc}")


# -------------------------------
# Retrieval using pgvector (NOT in-memory cosine)
# -------------------------------
def get_relevant_context(query: str, top_k: int = 5) -> str:
    query = (query or "").strip()
    if not query:
        return ""

    client = get_openai_client()
    q_embedding = client.embeddings.create(
        model="text-embedding-3-small",
        input=query,
    ).data[0].embedding

    # Convert Python list -> pgvector literal string
    vector_literal = "[" + ",".join(str(x) for x in q_embedding) + "]"

    with get_db_conn() as conn:
        with conn.cursor() as cur:
            cur.execute(
                """
                select c.content
                from chunks c
                join documents d on d.id = c.document_id
                where d.source_id = %s
                order by c.embedding <=> %s::vector
                limit %s;
                """,
                ("resume", vector_literal, top_k),
            )
            rows = cur.fetchall()

    return "\n\n".join(r[0] for r in rows)



# -------------------------------
# Chat endpoint (RAG + LLM)
# -------------------------------
@app.post("/chat", response_model=ChatResponse)
def chat(request: ChatRequest) -> ChatResponse:
    if not request.messages:
        raise HTTPException(status_code=400, detail="No messages provided")

    last_user_message = next(
        (m for m in reversed(request.messages) if m.role == "user"), None
    )
    query = last_user_message.content if last_user_message else ""

    try:
        context = get_relevant_context(query=query)
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"RAG retrieval error: {exc}") from exc

    system_message = ChatMessage(
        role="system",
        content=(
            "You are a helpful assistant that answers questions about Brad Hankee "
            "based on his portfolio documents. Be concise but specific. "
            "If you are not sure, say you are not sure rather than making something up."
        ),
    )

    context_message = (
        ChatMessage(
            role="system",
            content="Here is context from Brad's documents:\n\n" + context,
        )
        if context
        else ChatMessage(
            role="system",
            content=(
                "No document context was retrieved. "
                "Answer based only on what the user has provided."
            ),
        )
    )

    all_messages = [system_message, context_message, *request.messages]

    try:
        completion = get_openai_client().chat.completions.create(
            model="gpt-4o-mini",
            messages=[m.model_dump() for m in all_messages],
            temperature=0.3,
        )
    except Exception as exc:
        raise HTTPException(status_code=500, detail=f"LLM error: {exc}") from exc

    reply = completion.choices[0].message.content or ""
    return ChatResponse(reply=reply)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
