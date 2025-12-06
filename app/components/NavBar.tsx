"use client";

import React, { useState } from "react";
import NavLink from "./NavLink";
import Link from "next/link";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "About", href: "#about" },
    { label: "Expertise", href: "#expertise" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav className="w-full flex items-center justify-between mt-4 px-4 sm:px-8 fixed top-0 left-0 right-0 z-[9999] bg-transparent">
      <Link href="/" className="hidden sm:flex items-center">
        <div className="relative w-32 h-24">
          <Image
            src="/images/logo.png"
            alt="Brad Hankee Logo"
            fill
            sizes="128px"
            className="object-contain transition-transform duration-300 hover:scale-105"
            priority
          />
        </div>
      </Link>

      {/* Hamburger */}
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

      {/* MOBILE MENU */}
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
          {navItems.map((item, idx) => (
            <li key={idx}>
              <NavLink
                label={item.label}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="text-gray-900 hover:text-blue-600 font-medium transition"
              />
            </li>
          ))}

          <li>
            <Link
              href="/blog"
              onClick={() => setMenuOpen(false)}
              className="text-gray-900 hover:text-blue-600 font-medium transition"
            >
              Blog
            </Link>
          </li>
        </ul>
      )}

      {/* DESKTOP MENU */}
      <div className="hidden sm:flex w-full justify-end">
        <ul
          className="
          flex items-center gap-2 px-6 py-3
          rounded-full border border-gray-700
          bg-black/60 backdrop-blur-md
          shadow-[0_0_15px_rgba(0,0,0,0.3)]
        "
        >
          {navItems.map((item, idx) => (
            <li
              key={idx}
              className="text-gray-300 font-medium hover:text-white transition relative px-3 py-1 group"
            >
              <NavLink label={item.label} href={item.href} />

              <span
                className="
                absolute inset-x-1 -bottom-1 h-[3px]
                group-hover:bg-yellow-400
                rounded-full transition-all
              "
              />
            </li>
          ))}

          <li className="text-gray-300 font-medium hover:text-white transition relative px-3 py-1 group">
            <Link href="/blog">Blog</Link>
            <span
              className="
              absolute inset-x-1 -bottom-1 h-[3px]
              group-hover:bg-yellow-400
              rounded-full transition-all
            "
            />
          </li>
        </ul>
      </div>
    </nav>
  );
}
