"use client";

import { useState } from "react";
import Image from "next/image";
import type { DetailedItineraryDay, DayImage } from "@/lib/mockTrips";

interface DayCardProps {
  day: DetailedItineraryDay;
  onImageClick: (images: DayImage[], index: number) => void;
}

function DayCard({ day, onImageClick }: DayCardProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-4 px-6 py-5 text-left bg-white hover:bg-gray-50 transition"
      >
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-[#ff5e00] text-white flex flex-col items-center justify-center text-xs font-bold leading-tight">
          <span className="text-[10px] uppercase tracking-wide opacity-80">DAY</span>
          <span className="text-lg leading-none">{day.day_number}</span>
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-800 truncate">{day.day_title}</p>
          <p className="text-sm text-gray-400 mt-0.5 truncate">{day.day_description}</p>
        </div>
        <span className="text-gray-400 text-xl flex-shrink-0">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-6 pb-6 bg-white border-t border-gray-100">
          <p className="text-gray-600 leading-relaxed mt-4 text-sm">{day.day_description}</p>

          {day.activities && day.activities.length > 0 && (
            <div className="mt-5 space-y-3">
              {day.activities.map((act) => (
                <div key={act.id} className="flex gap-4">
                  <div className="flex-shrink-0 w-14 text-right">
                    <span className="text-xs font-semibold text-[#ff5e00] bg-orange-50 px-2 py-1 rounded-lg">
                      {act.activity_time}
                    </span>
                  </div>
                  <div className="flex-1 pb-3 border-b border-gray-100 last:border-0">
                    <p className="text-sm text-gray-700">{act.activity_description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {day.images && day.images.length > 0 && (
            <div className="flex gap-3 mt-5 flex-wrap">
              {day.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => onImageClick(day.images!, idx)}
                  className="relative w-28 h-20 rounded-xl overflow-hidden hover:opacity-90 transition"
                >
                  <Image src={img.storage_url} alt={img.alt_text} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

interface TripItineraryProps {
  itinerary: DetailedItineraryDay[];
  onImageClick: (images: DayImage[], index: number) => void;
}

export function TripItinerary({ itinerary, onImageClick }: TripItineraryProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-6">โปรแกรมรายวัน</h3>
      <div className="space-y-4">
        {itinerary.map((day) => (
          <DayCard key={day.id} day={day} onImageClick={onImageClick} />
        ))}
      </div>
    </div>
  );
}
