"use client";

import Image from "next/image";
import type { GalleryImage } from "@/lib/mockTrips";

const VISIBLE = 5;

interface TripGalleryGridProps {
  gallery: GalleryImage[];
  onImageClick: (index: number) => void;
}

export function TripGalleryGrid({ gallery, onImageClick }: TripGalleryGridProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-5">แกลเลอรี่</h3>
      <div className="grid grid-cols-3 gap-3" style={{ gridTemplateRows: "auto auto" }}>
        <button
          onClick={() => onImageClick(0)}
          className="col-span-2 row-span-2 relative aspect-[4/3] rounded-2xl overflow-hidden hover:opacity-95 transition"
        >
          <Image src={gallery[0].storage_url} alt={gallery[0].alt_text} fill className="object-cover" />
        </button>
        {gallery.slice(1, VISIBLE).map((img, idx) => (
          <button
            key={img.id}
            onClick={() => onImageClick(idx + 1)}
            className="relative aspect-square rounded-2xl overflow-hidden hover:opacity-95 transition"
          >
            <Image src={img.storage_url} alt={img.alt_text} fill className="object-cover" />
            {idx === VISIBLE - 2 && gallery.length > VISIBLE && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-bold text-lg">+{gallery.length - VISIBLE}</span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
}
