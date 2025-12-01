"use client";

import React, { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      className={`w-full flex items-center justify-between px-4 sm:px-8 py-4 fixed top-0 left-0 right-0 z-[9999]`}
    >
      {/* Hamburger Icon */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-8 h-8"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className={`block w-6 h-0.5 mb-1 transition-all ${
            menuOpen ? "rotate-45 translate-y-2 bg-yellow-500" : "bg-gray-800"
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 mb-1 transition-all ${
            menuOpen ? "opacity-0" : "bg-gray-800"
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 transition-all ${
            menuOpen ? "-rotate-45 -translate-y-2 bg-yellow-500" : "bg-gray-800"
          }`}
        ></span>
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <ul
          className="
    absolute top-full left-0 w-full sm:hidden z-20
    flex flex-col items-center gap-4 py-6
    bg-white/95 backdrop-blur-md
    border-b border-blue-500/20 shadow-md
    animate-[fadeInDown_0.3s_ease]
  "
        >
          {["About", "Expertise", "Projects", "Contact"].map((label, idx) => (
            <li key={idx}>
              <a
                href={`#${label.toLowerCase()}`}
                className="text-gray-900 hover:text-blue-600 font-medium transition"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* Desktop Menu */}
      <div className="hidden sm:flex w-full justify-end mt-4">
        <ul
          className="
        flex items-center gap-6 px-6 py-3
        rounded-full border border-gray-700
        bg-black/60 backdrop-blur-md
        shadow-[0_0_15px_rgba(0,0,0,0.3)]
      "
        >
          {["About", "Expertise", "Projects", "Contact"].map((label, idx) => (
            <li
              key={idx}
              className="
            text-gray-300 font-medium
            hover:text-white transition
            relative px-3 py-1 group
          "
            >
              <a href={`#${label.toLowerCase()}`}>{label}</a>
              <span
                className="
              absolute inset-x-1 -bottom-1 h-[3px]
              group-hover:bg-yellow-400
              rounded-full transition-all
            "
              />
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
