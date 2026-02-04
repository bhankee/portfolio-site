"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";

type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const ChatBot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content:
        "Hi, I’m Brad’s RAG based portfolio assistant. Ask me about his experience, skills, or projects!",
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!listRef.current) return;
    listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, isOpen]);

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isSending) return;

    const userMessage: ChatMessage = {
      id: `${Date.now()}-user`,
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);
    setError(null);

    try {
      const payloadMessages = [
        ...messages.map((message) => ({
          role: message.role,
          content: message.content,
        })),
        { role: "user", content: trimmed },
      ];

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: payloadMessages }),
      });

      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error || "Failed to get response.");
      }

      const data = await res.json();

      const assistantMessage: ChatMessage = {
        id: `${Date.now()}-assistant`,
        role: "assistant",
        content: data.reply || "I’m sorry, I couldn’t generate a response.",
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = async (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      await handleSend();
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-3 shadow-xl shadow-black/40 hover:from-yellow-300 hover:to-orange-400 transition-transform duration-200 hover:scale-105"
        aria-label={isOpen ? "Close chat" : "Open chat"}
      >
        <MessageCircle className="w-5 h-5" />
        <span className="hidden sm:inline text-sm font-semibold">
          Chat with my AI
        </span>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 left-4 right-4 sm:left-auto sm:right-6 z-40 w-auto sm:w-[420px] bg-white/95 backdrop-blur-md border border-gray-200 rounded-2xl shadow-2xl shadow-black/40 flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gradient-to-r from-slate-900 to-slate-800 rounded-t-2xl">
            <div>
              <p className="text-sm font-semibold text-white">
                Brad’s RAG Portfolio Assistant
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="text-slate-200 hover:text-white transition"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-slate-200" strokeWidth={4} />
            </button>
          </div>

          <div
            ref={listRef}
            className="flex-1 overflow-y-auto px-4 py-3 space-y-3 max-h-80"
          >
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-2xl px-3 py-2 text-sm shadow-sm max-w-[85%] ${
                    msg.role === "user"
                      ? "bg-gradient-to-r from-yellow-400 to-orange-500 text-slate-900"
                      : "bg-blue-100 text-slate-900"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {error && (
              <p className="text-xs text-red-500 text-center mt-2">{error}</p>
            )}
          </div>

          <div className="border-t border-gray-200 p-3">
            <div className="flex items-end gap-2 min-w-0">
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask about Brad’s background…"
                rows={1}
                className="flex-1 min-w-0 resize-none rounded-xl border border-gray-200 bg-white px-3 py-2 text-base sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <button
                type="button"
                onClick={async () => await handleSend()}
                disabled={isSending || !input.trim()}
                className="inline-flex items-center justify-center rounded-full bg-blue-300 text-white p-2 shadow-sm disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-400 transition"
                aria-label="Send message"
              >
                {isSending ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="mt-1 text-[10px] text-gray-400 text-right">
              Powered by AI + Brad&apos;s resume.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
