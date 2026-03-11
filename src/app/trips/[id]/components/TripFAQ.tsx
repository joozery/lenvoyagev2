"use client";

import { useState } from "react";
import Image from "next/image";
import type { TripFAQ, DayImage } from "@/lib/mockTrips";

interface FAQItemProps {
  faq: TripFAQ;
  onImageClick: (images: DayImage[], index: number) => void;
}

function FAQItem({ faq, onImageClick }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-6 py-5 text-left bg-white hover:bg-gray-50 transition"
      >
        <span className="font-semibold text-gray-800 pr-4">{faq.question}</span>
        <span className="text-gray-400 text-xl flex-shrink-0">{open ? "−" : "+"}</span>
      </button>
      {open && (
        <div className="px-6 pb-5 bg-white border-t border-gray-100">
          <p className="text-gray-600 leading-relaxed mt-3">{faq.answer}</p>
          {faq.images && faq.images.length > 0 && (
            <div className="flex gap-3 mt-4 flex-wrap">
              {faq.images.map((img, idx) => (
                <button
                  key={img.id}
                  onClick={() => onImageClick(faq.images!, idx)}
                  className="relative w-32 h-24 rounded-xl overflow-hidden hover:opacity-90 transition"
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

interface TripFAQSectionProps {
  faqs: TripFAQ[];
  onImageClick: (images: DayImage[], index: number) => void;
}

export function TripFAQSection({ faqs, onImageClick }: TripFAQSectionProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
      <h3 className="text-xl font-bold text-gray-900 mb-6">คำถามที่พบบ่อย</h3>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <FAQItem key={faq.id} faq={faq} onImageClick={onImageClick} />
        ))}
      </div>
    </div>
  );
}
