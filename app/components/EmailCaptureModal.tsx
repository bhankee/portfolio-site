"use client";

import { useEffect, useState } from "react";
import validateEmail from "../utils/validateEmail";

export default function EmailCaptureModal() {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  // Auto-open after 3 seconds
  useEffect(() => {
    const lastShown = localStorage.getItem("resumeModalLastShown");

    if (lastShown) {
      const lastTime = parseInt(lastShown, 10);
      const now = Date.now();

      // If it's been less than 24 hours - Don't show
      const oneDay = 24 * 60 * 60 * 1000;
      if (now - lastTime < oneDay) return;
    }

    const timer = setTimeout(() => {
      setOpen(true);

      localStorage.setItem("resumeModalLastShown", Date.now().toString());
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(null);
    setStatus("sending");

    const res = await fetch("/api/send-resume", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setStatus("success");

      setTimeout(() => {
        setOpen(false);
        setStatus("idle");
        setEmail("");
      }, 2000);
    } else {
      setStatus("idle");
      setEmailError("Something went wrong. Try again.");
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center z-[9999] animate-fadeIn"
      onClick={() => setOpen(false)}
    >
      <div
        className="bg-white rounded-3xl shadow-2xl p-10 w-11/12 max-w-xl relative animate-scaleIn"
        onClick={(e) => e.stopPropagation()}
      >
        {status !== "success" && (
          <button
            onClick={() => setOpen(false)}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 text-2xl"
          >
            ✕
          </button>
        )}

        {status === "success" ? (
          <div className="flex flex-col items-center text-center py-6 animate-fadeIn">
            <div className="w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center text-3xl mb-4 shadow-lg">
              ✓
            </div>
            <p className="text-xl font-semibold text-blue-900 mb-2">
              Email Sent!
            </p>
            <p className="text-gray-600">Check your inbox for your resume.</p>
          </div>
        ) : (
          <>
            <h2 className="text-3xl font-bold text-blue-900 mb-4 text-center">
              Want a copy of my resume?
            </h2>

            <p className="text-gray-700 text-lg mb-8 text-center leading-relaxed">
              Enter your email and I&apos;ll send a downloadable version
              straight to your inbox.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-6 py-4 text-lg rounded-xl border bg-gray-50 outline-none transition 
                    ${
                      emailError
                        ? "border-red-500 focus:border-red-600 focus:ring-red-300"
                        : "border-gray-300 focus:border-blue-600 focus:ring-blue-300"
                    }
                  `}
                />
                {emailError && (
                  <p className="text-red-600 text-sm font-medium pt-1">
                    {emailError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full py-4 text-xl rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-semibold shadow-lg transition transform hover:scale-[1.02] flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <span className="animate-spin h-6 w-6 border-4 border-white border-t-transparent rounded-full"></span>
                    Sending…
                  </>
                ) : (
                  "Send My Resume"
                )}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
