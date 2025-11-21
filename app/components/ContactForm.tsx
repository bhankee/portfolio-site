"use client";
import React, { FormEvent, useState } from "react";

import { useForm } from "react-hook-form";

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

  const onSubmit = async (data: FormData) => {
    setStatus("sending");

    try {
      const res = await fetch("/api/email", {
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (res.ok) {
        setStatus("sent");
        // keep 'sent' state visible briefly, then reset
        setTimeout(() => {
          setStatus("idle");
          reset();
        }, 2500);
      } else {
        setStatus("error");
        console.error("Failed to send message", await res.text());
        setTimeout(() => setStatus("idle"), 2500);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  return (
    <div className="min-h-125 max-w-lg mx-auto p-8 bg-black/70 backdrop-blur-md border border-yellow-400/20 shadow-xl shadow-black/50 rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-white">
        Contact Me
      </h2>
      {false ? (
        <div className="text-green-400 text-center font-semibold">
          Thank you for your message!
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true })}
            className="px-4 py-2 rounded border border-white/20 bg-black/40 backdrop-blur-sm text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
          />
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: true })}
            className="px-4 py-2 rounded border border-white/20 bg-black/40 backdrop-blur-sm text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors"
          />
          <textarea
            placeholder="Your Message"
            {...register("message", { required: true })}
            rows={5}
            className="px-4 py-2 rounded border border-white/20 bg-black/40 backdrop-blur-sm text-white placeholder-gray-400 focus:border-yellow-400/50 focus:outline-none transition-colors resize-none"
          />
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className={`px-6 py-3 rounded-full text-black font-semibold shadow-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              status === "sent"
                ? "bg-green-500 hover:bg-green-600 text-white"
                : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 hover:scale-105"
            } ${status === "sending" ? "opacity-90 cursor-wait" : ""} ${
              status === "sent" ? "cursor-default" : ""
            }`}
          >
            {status === "sending" ? (
              <svg
                className="animate-spin h-5 w-5 text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : status === "sent" ? (
              <svg
                className="h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.343a1 1 0 111.414-1.414L8 11.222l6.293-6.293a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <span>Send Message</span>
            )}

            {status === "sent" ? <span className="ml-1">Sent</span> : null}
            {status === "error" ? (
              <span className="ml-1 text-red-100">Error</span>
            ) : null}
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactForm;
