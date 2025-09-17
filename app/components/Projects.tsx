import React from "react";

type Project = {
    title: string;
    description: string;
    link?: string;
    image?: string;
};

const projects: Project[] = [
    {
        title: "My Health AI",
        description: "A health monitoring application that pulls daily data from smart scales and uses AI to generate custom meal & activity plans.",
        link: "https://github.com/bhankee/health-ai",
        image: "/images/health-ai-1.png",
    }

];

const Projects: React.FC = () => (
    <section id="projects" className="py-12 bg-gradient-to-br from-indigo-800 via-gray-700 to-gray-900 text-white">
        <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center "> Current Project</h2>
            <div
                className={`grid gap-8 ${projects.length === 1
                    ? "justify-center"
                    : "md:grid-cols-2"
                    }`}
            >
                {projects.map((project, idx) => (
                    <div
                        key={idx}
                        className={`bg-white rounded-lg shadow-md p-6 flex flex-col items-center ${projects.length === 1 ? "max-w-lg w-full" : ""
                            }`}
                    >
                        {project.image && project.link ? (
                            <a
                                href={project.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full mb-4 block group"
                            >
                                <div className="w-full aspect-square overflow-hidden rounded">
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            </a>
                        ) : project.image ? (
                            <div className="w-full aspect-square mb-4 overflow-hidden rounded">
                                <img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        ) : null}

                        <h3 className="text-xl font-semibold mb-2 bg-gradient-to-r from-blue-900 via-blue-700 to-indigo-800 bg-clip-text text-transparent">{project.title}</h3>
                        <p className="text-gray-700 mb-4 text-center">{project.description}</p>

                    </div>
                ))}
            </div>
        </div>
    </section>
);

export default Projects;