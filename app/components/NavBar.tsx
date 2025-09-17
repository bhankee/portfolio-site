"use client"

import Link from "next/link";
import React, { useState } from "react";


export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <nav className="w-full flex items-center justify-between px-4 sm:px-8 py-4 bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 z-10">
            <Link href="/" className="font-bold text-lg text-gray-900 dark:text-white">
                Brad Hankee
            </Link>
            {/* Hamburger Icon */}
            <button
                className="sm:hidden flex flex-col justify-center items-center w-8 h-8"
                aria-label="Toggle menu"
                onClick={() => setMenuOpen(!menuOpen)}
            >
                <span className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-200 mb-1 transition-all ${menuOpen ? "rotate-45 translate-y-2" : ""}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-200 mb-1 transition-all ${menuOpen ? "opacity-0" : ""}`}></span>
                <span className={`block w-6 h-0.5 bg-gray-700 dark:bg-gray-200 transition-all ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`}></span>
            </button>
            {/* Desktop Menu */}
            <ul className="hidden sm:flex gap-6 text-sm font-medium">
                <li>
                    <a href="#about" className="hover:underline text-gray-700 dark:text-gray-200">About</a>
                </li>
                <li>
                    <a href="#projects" className="hover:underline text-gray-700 dark:text-gray-200">Projects</a>
                </li>
                <li>
                    <a href="#contact" className="hover:underline text-gray-700 dark:text-gray-200">Contact</a>
                </li>
            </ul>
            {/* Mobile Menu */}
            {menuOpen && (
                <ul className="absolute top-full left-0 w-full bg-white dark:bg-gray-900 shadow-md flex flex-col items-center gap-4 py-4 sm:hidden z-20">
                    <li>
                        <a href="#about" className="hover:underline text-gray-700 dark:text-gray-200" onClick={() => setMenuOpen(false)}>About</a>
                    </li>
                    <li>
                        <a href="#projects" className="hover:underline text-gray-700 dark:text-gray-200" onClick={() => setMenuOpen(false)}>Projects</a>
                    </li>
                    <li>
                        <a href="#contact" className="hover:underline text-gray-700 dark:text-gray-200" onClick={() => setMenuOpen(false)}>Contact</a>
                    </li>
                </ul>
            )}
        </nav>
    );
}