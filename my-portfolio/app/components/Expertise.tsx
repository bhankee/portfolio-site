"use client";

import ExpertiseCard from "./ExpertCard";

const expertiseSections = [
  {
    id: "engineering",
    title: "Software Engineering",
    description:
      "I’ve spent nearly a decade designing and shipping software that’s reliable, scalable, and simple to maintain. From architecting front-end systems in React and Next.js to contributing across full-stack features, I focus on writing code that’s durable, readable, and production-ready.",
    imageSrc: "/images/engineering.png",
    skills: ["Architecture", "Mentoring", "TypeScript", "Maintainability"],
  },
  {
    id: "ai",
    title: "AI Feature Development",
    description:
      "I build AI-driven features that feel purposeful—not gimmicky. Whether it’s integrating GPT-4o with LangChain or designing FastAPI workflows, my goal is to create intelligence that improves user flow, reduces friction, and turns complex tasks into seamless experiences.",
    imageSrc: "/images/ai.png",
    skills: ["Automation", "LangChain", "RAG", "LLMs"],
  },
  {
    id: "business",
    title: "Business-Driven Impact",
    description:
      "My background in business strategy shapes how I approach engineering. I translate product goals, KPIs, and operational needs into technical decisions, ensuring the features I build drive measurable outcomes—not just pass code review.",
    imageSrc: "/images/business.png",
    skills: ["MBA", "Business Strategy", "Measurable", "Impact"],
  },
];

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
        {expertiseSections.map((item, index) => {
          return (
            <div key={item.id}>
              <ExpertiseCard
                index={index}
                title={item.title}
                description={item.description}
                imageSrc={item.imageSrc}
                skills={item.skills}
                id={item.id}
              />
            </div>
          );
        })}
      </div>
    </section>
  );
}
