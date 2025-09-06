import React from "react";

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between px-4 sm:px-8 py-4 bg-white dark:bg-gray-900 shadow-sm fixed top-0 left-0 z-10">
            <a href="/" className="font-bold text-lg text-gray-900 dark:text-white">
                My Portfolio
            </a>
            <ul className="flex gap-6 text-sm font-medium">
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
        </nav>
    );
}