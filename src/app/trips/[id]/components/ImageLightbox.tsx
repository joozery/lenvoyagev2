"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

export interface LightboxImage {
  url: string;
  label: string;
  alt: string;
}

interface ImageLightboxProps {
  images: LightboxImage[];
  initialIndex?: number;
  maxWidth?: "3xl" | "5xl";
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex = 0, maxWidth = "5xl", onClose }: ImageLightboxProps) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(() => setCurrent((i) => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setCurrent((i) => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [prev, next, onClose]);

  const widthClass = maxWidth === "3xl" ? "max-w-3xl" : "max-w-5xl";

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center" onClick={onClose}>
      <div className={`relative ${widthClass} w-full mx-4`} onClick={(e) => e.stopPropagation()}>
        <button
          onClick={onClose}
          className="absolute -top-10 right-0 text-white text-3xl hover:text-gray-300"
          aria-label="ปิด"
        >
          ✕
        </button>
        <div className="relative aspect-video rounded-2xl overflow-hidden">
          <Image src={images[current].url} alt={images[current].alt} fill className="object-cover" />
        </div>
        <p className="text-white text-center mt-3 text-sm">{images[current].label}</p>
        {images.length > 1 && (
          <div className="flex justify-center gap-4 mt-4">
            <button onClick={prev} className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition">←</button>
            <span className="text-white/60 self-center text-sm">{current + 1} / {images.length}</span>
            <button onClick={next} className="px-6 py-2 bg-white/20 hover:bg-white/30 text-white rounded-full transition">→</button>
          </div>
        )}
      </div>
    </div>
  );
}
