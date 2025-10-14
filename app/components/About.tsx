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
            <section className="relative flex flex-col-reverse md:flex-row items-center md:items-start justify-between max-w-5xl mx-auto py-24 px-6">
                <div className="about-bg" aria-hidden />
                <div className="about-panel w-full md:mx-0 md:w-full flex flex-col md:flex-row items-start relative z-10 ">
                    <div className="md:w-1/2 flex justify-center mb-10 md:mb-0 relative z-20 order-1">
                        <div className="relative">
                            <img
                                src="/images/profile_pic.png"
                                alt="Brad Hankee"
                                className="rounded-full w-48 h-48 border-4 border-yellow-400 shadow-lg"
                            />
                        </div>
                    </div>
                    {/* RIGHT: heading, animated paragraph, skills, resume */}
                    <div className="md:w-1/2 text-center md:text-left space-y-6 order-2">
                        <h1 className="text-5xl font-bold">
                            Brad <span className="text-yellow-500">Hankee</span>
                        </h1>
                        <p className="text-gray-400">
                            Specializing in <span className="text-yellow-500">React</span>, <span className="text-yellow-500">Next.js</span>, and <span className="text-yellow-500">Python</span>.
                        </p>
                        <Link
                            href="/documents/resume.pdf"
                            download
                            className="mt-2 inline-block px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold shadow transition-colors duration-300 hover:from-yellow-500 hover:to-orange-600"
                        >
                            Download Resume
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
};

export default About;

