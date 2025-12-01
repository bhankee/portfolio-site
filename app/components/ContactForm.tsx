"use client";
import React, { useState } from "react";
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
        headers: { "Content-Type": "application/json" },
        method: "POST",
      });

      if (res.ok) {
        setStatus("sent");
        setTimeout(() => {
          reset();
          setStatus("idle");
        }, 2500);
      } else {
        throw new Error("Failed to send");
      }
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  return (
    <section className="py-16 max-w-xl mx-auto px-6">
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
            className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition"
          />
          <input
            type="email"
            placeholder="Your Email"
            {...register("email", { required: true })}
            className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition"
          />
          <textarea
            placeholder="Your Message"
            rows={5}
            {...register("message", { required: true })}
            className="px-4 py-3 rounded-xl bg-white border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-500 transition resize-none"
          />
          <button
            type="submit"
            disabled={status === "sending" || status === "sent"}
            className={`py-3 rounded-full font-semibold shadow-md transition-all duration-300 flex items-center justify-center gap-2
              ${
                status === "sent"
                  ? "bg-green-500 hover:bg-green-600 text-white"
                  : "bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-300 hover:to-orange-400 text-white"
              }
              ${status === "sending" ? "opacity-90 cursor-wait" : ""}
              ${status === "sent" ? "cursor-default" : ""}
            `}
          >
            {status === "sending" ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
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
              <>
                <svg
                  className="h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-7.071 7.071a1 1 0 01-1.414 0L3.293 9.343a1 1 0 111.414-1.414L8 11.222l6.293-6.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Sent</span>
              </>
            ) : (
              <>
                <svg
                  className="h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 17l4 4m0 0l4-4m-4 4V3"
                  />
                </svg>
                <span>Send Message</span>
              </>
            )}

            {status === "error" && (
              <span className="text-red-100 ml-1">Error</span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactForm;
