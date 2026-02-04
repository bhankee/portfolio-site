import { NextRequest, NextResponse } from "next/server";

type ChatMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as {
      messages: ChatMessage[];
    };

    const pythonApiUrl = process.env.NEXT_PUBLIC_RAG_API_URL;

    if (!pythonApiUrl) {
      return NextResponse.json(
        {
          error:
            "Chat backend is not configured. Please set NEXT_PUBLIC_RAG_API_URL on the server.",
        },
        { status: 500 },
      );
    }

    const res = await fetch(pythonApiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ messages: body.messages ?? [] }),
    });

    if (!res.ok) {
      const data = (await res.json().catch(() => null)) as {
        error?: string;
      } | null;
      console.error("Python RAG backend error:", data);
      return NextResponse.json(
        { error: data?.error || "Python chat backend returned an error." },
        { status: 500 },
      );
    }

    const data = (await res.json()) as { reply: string };

    return NextResponse.json({
      reply: data.reply,
    });
  } catch (error) {
    console.error("Chat API proxy error:", error);
    return NextResponse.json(
      { error: "Something went wrong while calling the chat backend." },
      { status: 500 },
    );
  }
}
