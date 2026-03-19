"use client";

import React, { useState, useCallback, useEffect } from "react";
import Image from "next/image";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, X, Play } from "lucide-react";

type Video = {
  id: string;
  title: string;
};

const videos: Video[] = [
  {
    id: "lOIFC4zRrik?si=gyI1S9SkfS_8Vk-E",
    title: "Getting the Interview in Software and AI Engineering",
  },
  {
    id: "7OdCKH3y348?si=5Em1UcmNWPQeJ4L4",
    title: "Gen AI Image Generator",
  },
  {
    id: "yJ2lMG4Gz04?si=huwS-qURUxI0GTnI",
    title: "All Things AI Engineering",
  },
  {
    id: "REPLACE_WITH_VIDEO_ID_4",
    title: "Coming Soon...",
  },
  {
    id: "REPLACE_WITH_VIDEO_ID_5",
    title: "Coming Soon...",
  },
];

function thumbnailUrl(videoId: string) {
  const baseId = videoId.split("?")[0];
  return `https://img.youtube.com/vi/${baseId}/maxresdefault.jpg`;
}

function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    function updateCardCount() {
      if (window.innerWidth >= 1024) setCount(3);
      else if (window.innerWidth >= 640) setCount(2);
      else setCount(1);
    }
    updateCardCount();
    window.addEventListener("resize", updateCardCount);
    return () => window.removeEventListener("resize", updateCardCount);
  }, []);

  return count;
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

type LightboxProps = {
  video: Video;
  onClose: () => void;
};

function Lightbox({ video, onClose }: LightboxProps) {
  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        key="backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/85 backdrop-blur-sm px-4"
        onClick={handleBackdropClick}
      >
        <motion.div
          key="modal"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 28 }}
          className="relative w-full max-w-4xl"
        >
          <button
            onClick={onClose}
            aria-label="Close video"
            className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
          >
            <X size={28} />
          </button>
          <div className="relative w-full pb-[56.25%] rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe
              className="absolute inset-0 w-full h-full"
              src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-4 px-1">
            <h3 className="text-white font-semibold text-lg leading-snug">
              {video.title}
            </h3>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

type CardProps = {
  video: Video;
  onClick: () => void;
};

function VideoCard({ video, onClick }: CardProps) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ y: -4 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      className="group relative flex-shrink-0 w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-400 rounded-2xl"
    >
      {/* Thumbnail */}
      <div className="relative w-full pb-[56.25%] overflow-hidden rounded-2xl bg-gray-900 shadow-lg border border-white/10 retro-frame">
        <Image
          src={thumbnailUrl(video.id)}
          alt={video.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized // YouTube CDN — skip Next.js optimisation
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        {/* Play button — always visible on touch, hover-reveal on desktop */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 rounded-full bg-yellow-400/90 flex items-center justify-center shadow-lg transition-all duration-300 scale-90 opacity-100 sm:opacity-0 sm:scale-90 group-hover:opacity-100 group-hover:scale-100">
            <Play size={22} className="text-black fill-black ml-1" />
          </div>
        </div>
      </div>

      {/* Text */}
      <div className="mt-3 px-1">
        <h3 className="text-sm font-semibold text-blue-900 leading-snug line-clamp-2 group-hover:text-yellow-600 transition-colors">
          {video.title}
        </h3>
      </div>
    </motion.button>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────

const VideoCarousel: React.FC = () => {
  const [startIndex, setStartIndex] = useState(0);
  const [activeVideo, setActiveVideo] = useState<Video | null>(null);
  const visible = useVisibleCount();

  const maxIndex = Math.max(0, videos.length - visible);
  const canPrev = startIndex > 0;
  const canNext = startIndex < maxIndex;

  useEffect(() => {
    setStartIndex((i) => Math.min(i, maxIndex));
  }, [maxIndex]);

  const prev = () => setStartIndex((i) => Math.max(0, i - 1));
  const next = () => setStartIndex((i) => Math.min(maxIndex, i + 1));

  return (
    <section
      id="videos"
      className="relative py-12 md:py-24 max-w-7xl mx-auto px-6"
    >
      {/* Heading */}
      <div className="text-center mb-8 md:mb-12">
        <h2 className="text-3xl md:text-5xl font-bold">
          <span className="text-blue-800">YouTube</span>{" "}
          <span className="text-yellow-500">Videos</span>
        </h2>
        <div className="mt-3 h-1 w-28 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full mx-auto" />
        <p className="text-base md:text-lg text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed">
          Tutorials, deep-dives, and project walkthroughs from my channel.
        </p>
      </div>

      {/* Carousel */}
      <div className="relative px-8 sm:px-10">
        {/* Prev button */}
        <button
          onClick={prev}
          disabled={!canPrev}
          aria-label="Previous videos"
          className={`absolute left-0 top-[40%] z-10 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border shadow-md transition-all duration-200 ${
            canPrev
              ? "bg-white border-gray-200 hover:bg-yellow-400 hover:border-yellow-400 text-gray-700 hover:text-black"
              : "bg-white/40 border-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Track */}
        <div className="overflow-hidden">
          <motion.div
            className="flex"
            animate={{ x: `${-(startIndex * 100) / visible}%` }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 28,
              mass: 0.9,
            }}
          >
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 px-2 sm:px-3"
                style={{ width: `${100 / visible}%` }}
              >
                <VideoCard
                  video={video}
                  onClick={() => setActiveVideo(video)}
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Next button */}
        <button
          onClick={next}
          disabled={!canNext}
          aria-label="Next videos"
          className={`absolute right-0 top-[40%] z-10 -translate-y-1/2 w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border shadow-md transition-all duration-200 ${
            canNext
              ? "bg-white border-gray-200 hover:bg-yellow-400 hover:border-yellow-400 text-gray-700 hover:text-black"
              : "bg-white/40 border-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dot indicators */}
      <div className="flex justify-center gap-2 mt-8">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setStartIndex(i)}
            aria-label={`Go to slide ${i + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === startIndex
                ? "w-6 bg-yellow-500"
                : "w-2 bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>

      {activeVideo && (
        <Lightbox video={activeVideo} onClose={() => setActiveVideo(null)} />
      )}
    </section>
  );
};

export default VideoCarousel;
