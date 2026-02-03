"use client";

import React from "react";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  tech: string[];
  githubUrl?: string;
  liveUrl?: string;
  image: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "AI Roast My Portfolio",
    description:
      "An AI-powered portfolio feedback tool that analyzes developer sites using GPT-4o, Lighthouse stats, and screenshot vision to deliver structured UI/UX performance insights.",
    image: "/images/roast-my-portfolio.png",
    tech: ["Next.js", "Langchain", "Python", "Docker"],
    githubUrl: "https://github.com/bhankee",
    liveUrl: "https://roastmyportfolio.ai",
  },
  {
    id: 2,
    title: "My Health AI",
    description:
      "A health tracking platform that pulls daily analytics and uses AI to generate meal and activity guidance, helping users optimize weight loss and wellness goals.",
    image: "/images/health-ai.png",
    tech: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/bhankee/health-ai",
    liveUrl: "https://github.com/bhankee/health-ai",
  },
];

const Projects: React.FC = () => (
  <section id="projects" className="relative py-24 max-w-7xl mx-auto px-6">
    <div className="text-center mb-12">
      <h2 className="text-4xl md:text-5xl font-bold">
        <span className="text-blue-800">Featured</span>{" "}
        <span className="text-yellow-500">Projects</span>
      </h2>
      <div className="mt-3 h-1 w-28 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto"></div>
      <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
        A showcase of impactful solutions and intelligent applications I’ve
        built — combining AI engineering, thoughtful design, and measurable
        impact.
      </p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.map((project) => (
        <div
          key={project.id}
          role="button"
          tabIndex={0}
          onClick={() =>
            project.liveUrl && window.open(project.liveUrl, "_blank")
          }
          className="cursor-pointer group relative w-full overflow-hidden rounded-2xl bg-white/80 backdrop-blur-md shadow-lg hover:shadow-xl border border-gray-200 transition-all duration-300"
        >
          <div className="relative w-full h-44 overflow-hidden rounded-t-2xl">
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={`object-cover transition-transform duration-500 group-hover:scale-105 ${
                project.id === 1 ? "object-top" : ""
              }`}
            />
          </div>
          <div className="p-6">
            <h3 className="text-xl font-semibold text-blue-900 mb-2">
              {project.title}
            </h3>
            <p className="text-gray-700 text-sm mb-4">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-xs bg-blue-50 text-blue-600 rounded-full border border-blue-200"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex gap-4">
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-blue-600 font-medium hover:translate-x-1 transition-all"
                >
                  Live Demo →
                </a>
              )}

              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-gray-600 hover:text-gray-800 transition-all"
                >
                  GitHub
                </a>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default Projects;
