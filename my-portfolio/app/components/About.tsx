"use client";
import React from "react";
import { CheckCircle } from "lucide-react";

import Link from "next/link";
import Image from "next/image";

const About: React.FC = () => {
  const aboutMeList = [
    "8+ years delivering high-quality, scalable software",
    "AI-focused engineer building intelligent, user-centric features",
    "Business-driven developer aligning technology with measurable impact",
  ];

  return (
    <section
      className="relative flex flex-col md:flex-row items-center justify-between max-w-6xl mx-auto 
  pt-2 pb-16 md:pt-16 md:pb-24 px-6"
    >
      <div className="w-full md:w-1/2 flex flex-col items-center mb-10 md:mb-0 order-1 md:order-2">
        <Image
          src="/images/profile_pic.png"
          alt="Brad Hankee"
          width={250}
          height={250}
          priority
          className="rounded-full border-4 border-blue-900 shadow-lg ring-4 ring-blue-900/20"
        />
        <div className="flex gap-4 mt-4">
          <Link
            href="https://www.linkedin.com/in/brad-hankee"
            target="_blank"
            className="p-2 rounded-full hover:bg-blue-50 transition group"
          >
            <Image
              src="/images/icons/linkedin.svg"
              alt="LinkedIn"
              width={28}
              height={28}
              className="group-hover:scale-110 transition-transform"
            />
          </Link>

          <Link
            href="https://github.com/bhankee"
            target="_blank"
            className="p-2 rounded-full hover:bg-blue-50 transition group"
          >
            <Image
              src="/images/icons/github.svg"
              alt="GitHub"
              width={28}
              height={28}
              className="group-hover:scale-110 transition-transform"
            />
          </Link>
        </div>
      </div>
      <div className="w-full md:w-1/2 text-center md:text-left space-y-6 md:pl-8 order-2 md:order-1">
        <div>
          <Image
            src="/images/name-logo-dark.png"
            alt="Brad Hankee"
            width={550}
            height={150}
            priority
            className="mx-auto md:mx-0"
          />
          <div className="mt-3 h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto md:mx-0"></div>
        </div>
        <ul className="space-y-4 text-gray-800">
          {aboutMeList.map((text, index) => (
            <li key={index} className="flex items-start gap-3">
              <CheckCircle
                size={24}
                className="text-blue-600 shrink-0 mt-0.5 transition-transform duration-300 group-hover:scale-110"
              />
              <span className="text-lg font-medium text-left flex-1">
                {text}
              </span>
            </li>
          ))}
        </ul>
        <div className="flex justify-center md:justify-start pt-4">
          <Link
            href="/documents/resume.pdf"
            download
            className="group inline-flex items-center gap-3 px-6 py-3 rounded-full
                   bg-blue-600 hover:bg-blue-500 !text-white font-semibold tracking-wide
                   shadow-md hover:shadow-lg transition-all duration-300"
          >
            <svg
              className="w-5 h-5 transition-transform group-hover:-translate-y-1"
              fill="white"
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
    </section>
  );
};

export default About;
