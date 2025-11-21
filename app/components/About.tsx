"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const About: React.FC = () => {
  const words = ["discipline", "creativity", "energy"];
  const [activeWord, setActiveWord] = useState("discipline");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i = (i + 1) % words.length;
      setActiveWord(words[i]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section className="relative flex flex-col-reverse md:flex-row items-center md:items-start justify-between max-w-6xl mx-auto py-32 px-6">
        <div
          className="
    about-panel
    w-full flex flex-col md:flex-row relative z-10
    rounded-2xl
    bg-black/70
    backdrop-blur-md
    border border-white/20
    shadow-2xl shadow-black/50
    p-12
    before:absolute before:inset-0 before:rounded-2xl
    before:bg-gradient-to-br before:from-white/[0.08] before:to-transparent
    before:pointer-events-none
    "
        >
          {/* Profile Image Section */}
          <div className="md:w-1/2 flex justify-center mb-12 md:mb-0 relative z-20">
            <div className="relative">
              <img
                src="/images/profile_pic.png"
                alt="Brad Hankee"
                className="
          relative z-10
          rounded-full
          w-52 h-52
          border-4 border-yellow-400
          shadow-[0_-8px_32px_rgba(0,0,0,0.6)]
          transition-all duration-500 hover:scale-[1.05]
          ring-4 ring-yellow-400/20
        "
              />
            </div>
          </div>

          {/* Content Section */}
          <div className="md:w-1/2 text-center md:text-left space-y-8 md:pl-8">
            <div>
              <h1 className="text-6xl md:text-7xl font-heading tracking-tight text-white drop-shadow-lg">
                Brad{" "}
                <span className="text-yellow-400 font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                  Hankee
                </span>
              </h1>
              <div className="mt-4 h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto md:mx-0"></div>
            </div>

            <div className="space-y-4">
              <p className="text-xl text-gray-200 leading-relaxed font-medium">
                Full Stack Developer driven by{" "}
                <span className="inline-block min-w-[120px] text-yellow-400 font-semibold transition-all duration-500">
                  {activeWord}
                </span>
              </p>

              <p className="text-lg text-gray-300/90 leading-relaxed">
                Specializing in{" "}
                <span className="text-yellow-400 font-semibold bg-yellow-400/10 px-2 py-1 rounded">
                  React
                </span>
                {", "}
                <span className="text-yellow-400 font-semibold bg-yellow-400/10 px-2 py-1 rounded">
                  Next.js
                </span>
                {", and "}
                <span className="text-yellow-400 font-semibold bg-yellow-400/10 px-2 py-1 rounded">
                  Python
                </span>
                {"."}
              </p>
            </div>

            <div className="pt-4">
              <Link
                href="/documents/resume.pdf"
                download
                className="
          group relative inline-flex items-center gap-3
          px-8 py-4
          rounded-full
          bg-gradient-to-r from-yellow-400 to-orange-400
          hover:from-yellow-300 hover:to-orange-300
          text-black font-bold text-lg
          tracking-wide
          shadow-xl shadow-yellow-400/25
          transition-all duration-300
          hover:shadow-2xl hover:shadow-yellow-400/40
          hover:scale-105
          border border-yellow-300
        "
              >
                <svg
                  className="w-5 h-5 transition-transform group-hover:translate-y-[-2px]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
                Download Resume
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
