"use client";

import React from "react";
import Image from "next/image";
import { motion, easeInOut } from "framer-motion";

interface ExpertiseCardProps {
  id: string;
  index: number; // FIXED
  title: string;
  description: string;
  imageSrc: string;
  skills: string[];
}

const floatAnimation = {
  animate: { y: [0, -10, 0] },
  transition: { duration: 5, repeat: Infinity, ease: easeInOut },
};

const ExpertiseCard: React.FC<ExpertiseCardProps> = ({
  id,
  index,
  title,
  description,
  imageSrc,
  skills,
}) => {
  return (
    <motion.section
      key={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true, amount: 0.3 }}
      className="
        relative overflow-hidden rounded-2xl border border-gray-200
        bg-gradient-to-r from-blue-50/60 to-white shadow-lg
        px-6 py-10 md:px-10 md:py-14
      "
    >
      <div
        className={`
          flex flex-col items-center gap-10 md:gap-12
          ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}
        `}
      >
        {/* Image */}
        <motion.div
          className="md:w-5/12 w-full flex justify-center"
          animate={floatAnimation.animate}
          transition={floatAnimation.transition}
        >
          <div className="relative w-56 h-56 md:w-64 md:h-64">
            <Image
              src={imageSrc}
              alt={title}
              fill
              className="object-contain drop-shadow-[0_12px_30px_rgba(0,0,0,0.18)]"
            />
          </div>
        </motion.div>

        {/* Text */}
        <div className="md:w-7/12 w-full text-center md:text-left">
          <h3 className="text-2xl md:text-3xl font-semibold text-blue-800 mb-4">
            {title}
          </h3>
          <p className="text-gray-700 text-lg leading-relaxed">{description}</p>
        </div>
      </div>

      {/* Bullets at bottom */}
      <ul className="flex flex-wrap justify-center gap-2 pt-10">
        {skills.map((skill, i) => (
          <li
            key={i}
            className="flex items-center gap-2 text-gray-700 hover:text-blue-800 text-lg transition"
          >
            {i !== 0 && <span className="text-yellow-500 text-xl">•</span>}
            {skill}
          </li>
        ))}
      </ul>
    </motion.section>
  );
};

export default ExpertiseCard;
