import hashlib
import os
from typing import List, Tuple

from pypdf import PdfReader


# -------------------------------
# Small text chunker (simple + good enough for resume)
# -------------------------------
def chunk_text(full_text: str, max_chunk_length: int = 700) -> List[str]:
    full_text = (full_text or "").strip()
    if not full_text:
        return []

    raw_paragraphs = [p.strip() for p in full_text.split("\n\n")]
    paragraphs = [p for p in raw_paragraphs if p]

    chunks: List[str] = []
    for para in paragraphs:
        if len(para) <= max_chunk_length:
            chunks.append(para)
        else:
            for i in range(0, len(para), max_chunk_length):
                chunks.append(para[i : i + max_chunk_length])

    return chunks


# -------------------------------
# DB helpers come from main.py
# (This avoids re-duplicating env/connection logic)
# IMPORTANT: ingest.py should NOT import `app` from main.
# -------------------------------
def _get_clients():
    from main import get_db_conn, get_openai_client  # local import avoids circular issues at import time
    return get_db_conn, get_openai_client


def upsert_document(
    source_type: str,
    title: str | None,
    source_url: str | None,
    source_id: str,
    content: str,
) -> Tuple[str, bool]:
    """
    Upsert document row.
    Returns (document_id, changed) where changed=True if content_hash changed.
    """
    get_db_conn, _ = _get_clients()

    content_hash = hashlib.sha256(content.encode("utf-8")).hexdigest()

    with get_db_conn() as conn:
        with conn.cursor() as cur:
            # Read previous hash (if any)
            cur.execute("select id, content_hash from documents where source_id = %s", (source_id,))
            existing = cur.fetchone()

            if existing and existing[1] == content_hash:
                # No change, skip re-embedding
                return (existing[0], False)

            # Ensure documents.source_id is unique in DB
            cur.execute(
                """
                insert into documents (source_type, title, source_url, source_id, content_hash)
                values (%s, %s, %s, %s, %s)
                on conflict (source_id) do update
                set
                  source_type = excluded.source_type,
                  title = excluded.title,
                  source_url = excluded.source_url,
                  content_hash = excluded.content_hash,
                  updated_at = now()
                returning id;
                """,
                (source_type, title, source_url, source_id, content_hash),
            )
            doc_id = cur.fetchone()[0]
        conn.commit()

    return (doc_id, True)


def replace_chunks(document_id: str, chunks: List[str]) -> None:
    """
    Deletes existing chunks for document_id and inserts new ones.
    This is simplest + reliable while you're learning.
    """
    get_db_conn, get_openai_client = _get_clients()

    if not chunks:
        return

    client = get_openai_client()
    emb = client.embeddings.create(
        model="text-embedding-3-small",
        input=chunks,
    )

    rows = [
        (document_id, i, chunks[i], emb.data[i].embedding)
        for i in range(len(chunks))
    ]

    with get_db_conn() as conn:
        with conn.cursor() as cur:
            cur.execute("delete from chunks where document_id = %s", (document_id,))
            cur.executemany(
                """
                insert into chunks (document_id, chunk_index, content, embedding)
                values (%s, %s, %s, %s)
                """,
                rows,
            )
        conn.commit()


def ingest_resume() -> None:
    """
    Loads resume.pdf -> chunks -> embeddings -> stores in Postgres (pgvector).
    Safe to call multiple times because it is idempotent.
    """
    base_dir = os.path.dirname(os.path.abspath(__file__))
    resume_path = os.path.join(base_dir, "..", "my-portfolio", "public", "documents", "resume.pdf")

    if not os.path.exists(resume_path):
        raise RuntimeError(f"Resume PDF not found at {resume_path}")

    reader = PdfReader(resume_path)
    full_text = "\n\n".join((page.extract_text() or "") for page in reader.pages).strip()
    if not full_text:
        raise RuntimeError("Resume PDF text extraction returned empty content")

    chunks = chunk_text(full_text)

    doc_id, changed = upsert_document(
        source_type="resume",
        title="Brad Hankee Resume",
        source_url=None,
        source_id="resume",
        content=full_text,
    )

    # Only re-embed/re-insert chunks if the resume content changed
    if changed:
        replace_chunks(doc_id, chunks)
