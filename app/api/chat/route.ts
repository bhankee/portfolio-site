import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    // Parse request body
    const body = (await req.json()) as {
      messages?: ChatMessage[];
    };

    // Read backend base URL from env
    const pythonApiBase = process.env.NEXT_PUBLIC_RAG_API_URL;

    if (!pythonApiBase) {
      return NextResponse.json(
        {
          error:
            "Chat backend is not configured. Please set NEXT_PUBLIC_RAG_API_URL.",
        },
        { status: 500 },
      );
    }

    // Ensure no trailing slash and append /chat
    const backendUrl = `${pythonApiBase.replace(/\/+$/, "")}/chat`;

    // Call Python RAG backend
    const res = await fetch(backendUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        messages: body.messages ?? [],
      }),
      cache: "no-store",
    });

    // Read raw text so we don't lose backend error details
    const text = await res.text();

    if (!res.ok) {
      console.error("Python RAG backend error:", res.status, text);

      return NextResponse.json(
        {
          error: "Python chat backend returned an error.",
          status: res.status,
          backend: text,
        },
        { status: 502 },
      );
    }

    // Parse successful response
    const data = JSON.parse(text) as { reply: string };

    return NextResponse.json({ reply: data.reply });
  } catch (err: any) {
    console.error("Chat API proxy error:", err);

    return NextResponse.json(
      {
        error: "Unexpected error while calling chat backend.",
        detail: err?.message ?? String(err),
      },
      { status: 500 },
    );
  }
}
