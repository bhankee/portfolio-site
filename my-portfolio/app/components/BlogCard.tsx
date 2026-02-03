"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";

interface BlogCardProps {
  title: string;
  url: string;
  image: string;
  description: string;
}

export default function BlogCard({
  title,
  url,
  image,
  description,
}: BlogCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <Link
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <div
        ref={ref}
        className={`
        relative w-full h-full flex flex-col 
        bg-white/80 backdrop-blur-md
        border border-gray-200
        rounded-2xl shadow-lg hover:shadow-xl
        transition-all duration-700 ease-out
        overflow-hidden

        ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}
      `}
      >
        <div className="relative w-full h-44 overflow-hidden rounded-t-2xl">
          <Image
            src={image || "/images/blog-placeholder.png"}
            alt={title}
            fill
            sizes="(max-width: 768px) 100vw,
         (max-width: 1200px) 50vw,
         33vw"
            className="
            object-cover 
            transition-transform duration-500 
            group-hover:scale-105
          "
          />
        </div>
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-semibold text-blue-900 mb-2 line-clamp-2">
            {title}
          </h3>

          <p className="text-gray-700 text-sm leading-relaxed line-clamp-3 flex-grow">
            {description || "Click to read the full article on Dev.to."}
          </p>
        </div>
      </div>
    </Link>
  );
}
