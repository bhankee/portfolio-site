"use client";
import React from "react";

const items = [
    { src: "/images/military-dark.png", alt: "discipline", title: "Discipline" },
    { src: "/images/cook-dark.png", alt: "creativity", title: "Creativity" },
    { src: "/images/punk-dark.png", alt: "energy", title: "Energy" },
];

const ImageTriad: React.FC = () => {
    return (
        <section className="w-4/5 mx-auto px-6 py-12">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 items-start justify-center">
                {items.map((image, idx) => {
                    const imgSizeClass = idx === 1 ? "w-40 h-40 md:w-48 md:h-48" : "w-44 h-44 md:w-52 md:h-52";

                    const imgTransformStyle: React.CSSProperties =
                        idx === 0
                            ? { transform: "translate(-12px, -12px)" }
                            : idx === 1
                                ? { transform: "translate(-16px, -10px)" }
                                : { transform: "translate(-10px, -8px)" };

                    const radius = 40;
                    const circumference = 2 * Math.PI * radius;
                    const extraDegrees = 15;
                    const extraLength = (extraDegrees / 360) * circumference;

                    const offsetIndex = (idx + 2) % 3;
                    const oneThird = circumference / 3;
                    const offset = -oneThird * offsetIndex + extraLength;

                    const startAngle = -90 + offsetIndex * 120 + extraDegrees;
                    const endAngle = startAngle + 120;
                    const toRad = (deg: number) => (deg * Math.PI) / 180;
                    const startX = 50 + radius * Math.cos(toRad(startAngle));
                    const startY = 50 + radius * Math.sin(toRad(startAngle));
                    const endX = 50 + radius * Math.cos(toRad(endAngle));
                    const endY = 50 + radius * Math.sin(toRad(endAngle));
                    const largeArcFlag = 0;
                    const pathD = `M ${startX} ${startY} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${endX} ${endY}`;

                    const label = idx === 0 ? "Military" : idx === 1 ? "Culinary School" : "Punk Rock";

                    return (
                        <div key={image.alt} className="flex flex-col items-center text-center">
                            <h3 className="mb-2 text-xl md:text-2xl font-extrabold uppercase tracking-wider -translate-y-1" aria-label={image.title}>
                                <span className="spot-text">{image.title}</span>
                            </h3>
                            <div className="relative w-56 h-56 md:w-64 md:h-64 mt-8.5">
                                <svg
                                    className="absolute inset-0 m-auto w-full h-full -translate-x-2 -translate-y-2 md:-translate-x-3 md:-translate-y-3"
                                    viewBox="0 0 100 100"
                                    preserveAspectRatio="xMidYMid meet"
                                    style={{ zIndex: 0, transform: `rotate(${idx === 0 ? -8 : idx === 1 ? 8 : -4}deg) scale(1.3)` }}
                                    aria-hidden
                                >
                                    <circle cx="50" cy="50" r="40" fill="none" stroke="var(--muted, rgba(11,18,32,0.06))" strokeWidth="10" />
                                    <g>
                                        <path id={`arcPath-${idx}`} d={pathD} fill="none" stroke="var(--accent-1)" strokeWidth="12" strokeLinecap="round" />

                                        <text fill="var(--foreground, #0b1220)" fontSize="6.5" fontWeight={700} dominantBaseline="middle" alignmentBaseline="middle">
                                            <textPath href={`#arcPath-${idx}`} startOffset="50%" textAnchor="middle" dy="1">
                                                {label}
                                            </textPath>
                                        </text>
                                    </g>
                                </svg>
                                <div
                                    className={`absolute inset-0 m-auto ${imgSizeClass}  overflow-hidden  z-10 flex items-center justify-center`}
                                    style={imgTransformStyle}
                                >
                                    <img src={image.src} alt={image.alt} className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500 opacity-30" style={{ mixBlendMode: "normal" }} />
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default ImageTriad;

