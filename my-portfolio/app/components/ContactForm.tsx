"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import validateEmail from "../utils/validateEmail";
import { Send, CheckCircle, Loader2, AlertTriangle } from "lucide-react";

export type FormData = {
  name: string;
  email: string;
  message: string;
};

const ContactForm: React.FC = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">(
    "idle"
  );
  const [emailError, setEmailError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    if (!validateEmail(data.email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    setEmailError(null);
    setStatus("sending");

    try {
      const res = await fetch("/api/email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Failed to send email");

      setStatus("sent");

      // Reset after a short delay
      setTimeout(() => {
        reset();
        setStatus("idle");
      }, 2500);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  return (
    <section className="py-16 max-w-xl mx-auto px-6" id="contact">
      <div className="bg-white/80 backdrop-blur-md border border-gray-200 shadow-lg rounded-2xl p-8 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-blue-800">
          Contact Me
        </h2>
        <div className="mt-3 h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto"></div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-5 mt-8"
        >
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       placeholder-gray-500 transition"
          />

          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: true })}
            className={`px-4 py-3 rounded-xl bg-white border shadow-sm
              ${
                emailError
                  ? "border-red-400 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-200 focus:ring-blue-500 focus:border-blue-500"
              }
              focus:outline-none placeholder-gray-500 transition`}
          />

          <textarea
            placeholder="Your Message"
            rows={5}
            {...register("message", { required: true })}
            className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       placeholder-gray-500 transition resize-none"
          />

          {emailError && (
            <p className="flex items-center gap-2 text-red-600 text-sm font-medium pt-1 text-center">
              <AlertTriangle size={16} />
              {emailError}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className={`py-3 rounded-full font-semibold shadow-md transition-all duration-300
              flex items-center justify-center gap-2 text-white
              ${
                status === "sent"
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400"
              }
              ${status === "sending" ? "opacity-90 cursor-wait" : ""}
              ${status === "sent" ? "cursor-default" : ""}
            `}
          >
            {status === "sending" && (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                <span>Sending…</span>
              </>
            )}

            {status === "sent" && (
              <>
                <CheckCircle className="h-5 w-5" />
                <span>Sent</span>
              </>
            )}

            {status === "idle" && (
              <>
                <Send className="h-5 w-5" />
                <span>Send Message</span>
              </>
            )}

            {status === "error" && (
              <span className="flex items-center gap-1 text-red-200">
                <AlertTriangle size={16} />
                Error
              </span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
