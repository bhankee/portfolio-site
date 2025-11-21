"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState, useEffect } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`w-full flex items-center justify-between px-4 sm:px-8 py-4 fixed top-0 left-0 right-0 z-[9999] transition-all duration-300 ${"bg-black/70 backdrop-blur-md border-b border-yellow-400/20 shadow-xl shadow-black/50"}`}
    >
      <Link href="/" className="font-bold text-lg">
        <Image
          src="/images/name-logo.png"
          alt="Brad Hankee"
          width={200}
          height={75}
          style={{ height: "75px", width: "auto" }}
          priority
          className={`transition-transform duration-500 ease-in-out brightness-0 invert ${
            isScrolled ? "rotate-[8deg]" : "rotate-0"
          }`}
        />
      </Link>
      {/* Hamburger Icon */}
      <button
        className="sm:hidden flex flex-col justify-center items-center w-8 h-8"
        aria-label="Toggle menu"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        <span
          className={`block w-6 h-0.5 bg-white mb-1 transition-all ${
            menuOpen ? "rotate-45 translate-y-2" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-white mb-1 transition-all ${
            menuOpen ? "opacity-0" : ""
          }`}
        ></span>
        <span
          className={`block w-6 h-0.5 bg-white transition-all ${
            menuOpen ? "-rotate-45 -translate-y-2" : ""
          }`}
        ></span>
      </button>
      {/* Desktop Menu */}
      <ul className="hidden sm:flex gap-6 text-sm font-medium">
        <li>
          <a
            href="#about"
            className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
          >
            About
          </a>
        </li>
        <li>
          <a
            href="#projects"
            className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
          >
            Projects
          </a>
        </li>
        <li>
          <a
            href="#contact"
            className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
          >
            Contact
          </a>
        </li>
      </ul>
      {/* Mobile Menu */}
      {menuOpen && (
        <ul className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-md shadow-xl flex flex-col items-center gap-4 py-6 sm:hidden z-20 border-b border-yellow-400/20">
          <li>
            <a
              href="#about"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              About
            </a>
          </li>
          <li>
            <a
              href="#projects"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className="text-white hover:text-yellow-400 transition-colors duration-300 font-medium"
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
