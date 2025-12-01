"use client";

import { motion, easeInOut } from "framer-motion";
import Image from "next/image";

const expertiseSections = [
  {
    id: "engineering",
    title: "Software Engineering",
    description:
      "8+ years delivering high-quality, production-ready applications using React, Next.js, TypeScript, and Python. Comfortable owning features from idea to deployment.",
    imageSrc: "/images/engineering.png",
    bullets: ["React", "Mentoring", "TypeScript", "Python"],
  },
  {
    id: "ai",
    title: "AI Feature Development",
    description:
      "Building AI-powered tools with GPT-4o, LangChain, and FastAPI—focusing on smarter user experiences, automation, and actionable insights.",
    imageSrc: "/images/ai.png",
    bullets: ["React", "Mentoring", "TypeScript", "Python"],
  },
  {
    id: "business",
    title: "Business-Driven Impact",
    description:
      "Business-trained engineer who aligns technical decisions with KPIs, user needs, and strategy. I care about shipped impact, not just shipped code.",
    imageSrc: "/images/business.png",
    bullets: ["React", "Mentoring", "TypeScript", "Python"],
  },
];

const floatAnimation = {
  animate: {
    y: [0, -10, 0],
  },
  transition: {
    duration: 5,
    repeat: Infinity,
    ease: easeInOut,
  },
};

export default function Expertise() {
  return (
    <section id="expertise" className="py-24 max-w-6xl mx-auto px-6">
      <div className="text-center">
        <div className="inline-block">
          <h2 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
            Expertise
          </h2>
          <div className="h-1 w-24 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mt-6 mb-10"></div>
        </div>
      </div>

      <div className="space-y-16">
        {expertiseSections.map((item, index) => (
          <motion.section
            key={item.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true, amount: 0.3 }}
            className="relative overflow-hidden rounded-2xl border border-gray-200 bg-gradient-to-r from-blue-50/60 to-white shadow-lg px-6 py-10 md:px-10 md:py-14"
          >
            {/* Top section: image + text */}
            <div
              className={`flex flex-col items-center gap-10 md:gap-12 ${
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Floating image */}
              <motion.div
                className="md:w-5/12 w-full flex justify-center"
                animate={floatAnimation.animate}
                transition={floatAnimation.transition}
              >
                <div className="relative w-56 h-56 md:w-64 md:h-64">
                  <Image
                    src={item.imageSrc}
                    alt={item.title}
                    fill
                    className="object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
                  />
                </div>
              </motion.div>

              {/* Text block */}
              <div className="md:w-7/12 w-full text-center md:text-left">
                <h3 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>

            {/* NOW the bullet list is *outside* the flex row, so always at the bottom */}
            <ul className="flex flex-wrap justify-center gap-2 pt-10">
              {item.bullets.map((bullet, i) => (
                <li
                  key={i}
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-800 text-lg transition"
                >
                  <span
                    className={`${
                      i === 0 ? "hidden" : "text-yellow-500 text-xl"
                    }`}
                  >
                    •
                  </span>
                  {bullet}
                </li>
              ))}
            </ul>
          </motion.section>
        ))}
      </div>
    </section>
  );
}
