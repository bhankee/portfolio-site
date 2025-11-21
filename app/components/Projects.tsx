import React from "react";
import Image from "next/image";

type Project = {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
};

const projects: Project[] = [
  {
    id: 1,
    title: "AI Roast My Portfolio",
    description:
      "A health monitoring application that pulls daily data from smart scales and uses AI to generate custom meal & activity plans.",
    image: "/images/roast-my-portfolio.png",
    technologies: ["Next.js", "Langchain", "Python", "Docker"],
    githubUrl: "https://github.com/bhankee",
    liveUrl: "https://roast-my-portfolio-ten.vercel.app/",
  },
  {
    id: 2,
    title: "My Health AI",
    description:
      "A health monitoring application that pulls daily data from smart scales and uses AI to generate custom meal & activity plans.",
    image: "/images/health-ai-1.png",
    technologies: ["Next.js", "TypeScript", "Stripe", "Tailwind CSS"],
    githubUrl: "https://github.com/bhankee/health-ai",
    liveUrl: "https://github.com/bhankee/health-ai",
  },
];

const Projects: React.FC = () => (
  <section className="relative py-16 md:py-32 px-3 md:px-6">
    <div className="max-w-6xl mx-auto">
      {/* Projects Panel with Similar Styling to About */}
      <div
        className="
          relative z-10
          rounded-xl md:rounded-2xl
          bg-black/60
          backdrop-blur-md
          border border-white/20
          shadow-2xl shadow-black/50
          p-6 md:p-12
          before:absolute before:inset-0 before:rounded-xl md:before:rounded-2xl
          before:bg-gradient-to-br before:from-white/[0.08] before:to-transparent
          before:pointer-events-none
        "
      >
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading tracking-tight text-white drop-shadow-lg mb-4">
            Featured{" "}
            <span className="text-yellow-400 font-bold bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
              Projects
            </span>
          </h2>
          <div className="h-1 w-24 md:w-32 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full mx-auto"></div>
          <p className="text-lg md:text-xl text-gray-300/90 mt-4 md:mt-6 max-w-2xl mx-auto px-4 md:px-0">
            A showcase of my recent work in web development and software
            engineering.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="
                  group relative
                  rounded-lg md:rounded-xl
                  bg-black/40
                  backdrop-blur-sm
                  border border-white/10
                  shadow-xl shadow-black/30
                  overflow-hidden
                  transition-all duration-500
                  hover:scale-[1.02]
                  hover:shadow-2xl hover:shadow-yellow-400/20
                  hover:border-yellow-400/30
                "
            >
              {/* Project Image */}
              <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              </div>

              {/* Project Content */}
              <div className="p-4 md:p-6 space-y-3 md:space-y-4">
                <h3 className="text-lg md:text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {project.title}
                </h3>

                <p className="text-gray-300/90 text-sm md:text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Technologies */}
                <div className="flex flex-wrap gap-1.5 md:gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="
                          px-2 md:px-3 py-1 text-xs
                          bg-yellow-400/10
                          text-yellow-400
                          border border-yellow-400/20
                          rounded-full
                          font-medium
                        "
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Project Links */}
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-2 md:pt-4">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                          flex items-center justify-center gap-2 px-4 py-2.5 md:py-2
                          bg-white/10 hover:bg-white/20
                          text-white hover:text-yellow-400
                          rounded-lg text-sm font-medium
                          transition-all duration-300
                          border border-white/20 hover:border-yellow-400/30
                        "
                    >
                      <svg
                        className="w-4 h-4"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="
                          flex items-center justify-center gap-2 px-4 py-2.5 md:py-2
                          bg-gradient-to-r from-yellow-400 to-orange-400
                          hover:from-yellow-300 hover:to-orange-300
                          text-black font-medium text-sm
                          rounded-lg
                          transition-all duration-300
                          hover:scale-105
                        "
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      Live Demo
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Projects;
