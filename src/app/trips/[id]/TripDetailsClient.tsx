"use client";

import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import type { Trip, GographySchedule, GalleryImage, DetailedItineraryDay, TripFAQ, DayImage } from "@/lib/mockTrips";

import { ImageLightbox } from "./components/ImageLightbox";
import { TripHero } from "./components/TripHero";
import { TripOverview } from "./components/TripOverview";
import { TripPdfDownload } from "./components/TripPdfDownload";
import { TripGalleryGrid } from "./components/TripGalleryGrid";
import { TripItinerary } from "./components/TripItinerary";
import { TripFAQSection } from "./components/TripFAQ";
import { BookingCard } from "./components/BookingCard";
import { IncludesCard } from "./components/IncludesCard";
import { RemindersCard } from "./components/RemindersCard";

interface TripDetailsClientProps {
  trip: Trip;
  schedules: GographySchedule[];
  gallery: GalleryImage[];
  itinerary: DetailedItineraryDay[];
  faqs: TripFAQ[];
}

export default function TripDetailsClient({ trip, schedules, gallery, itinerary, faqs }: TripDetailsClientProps) {
  const [selectedScheduleId, setSelectedScheduleId] = useState(schedules[0]?.id ?? "");
  const [galleryModal, setGalleryModal] = useState<{ open: boolean; index: number }>({ open: false, index: 0 });
  const [dayImageModal, setDayImageModal] = useState<{ images: DayImage[]; index: number } | null>(null);

  const selectedSchedule = schedules.find((s) => s.id === selectedScheduleId) ?? schedules[0];

  const handleBooking = () => {
    const message = encodeURIComponent(
      `สวัสดีครับ/ค่ะ สนใจทริป "${trip.name}" รอบ ${selectedSchedule?.dates ?? ""} ขอข้อมูลเพิ่มเติมได้เลยครับ/ค่ะ`
    );
    window.open(`https://line.me/R/ti/p/@lenvoyage?text=${message}`, "_blank");
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: trip.name, url: window.location.href });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert("คัดลอกลิงก์แล้ว");
    }
  };

  const galleryLightboxImages = gallery.map((img) => ({
    url: img.storage_url,
    label: img.title,
    alt: img.alt_text,
  }));

  const dayLightboxImages = dayImageModal?.images.map((img) => ({
    url: img.storage_url,
    label: img.caption,
    alt: img.alt_text,
  })) ?? [];

  return (
    <>
      {galleryModal.open && gallery.length > 0 && (
        <ImageLightbox
          images={galleryLightboxImages}
          initialIndex={galleryModal.index}
          maxWidth="5xl"
          onClose={() => setGalleryModal({ open: false, index: 0 })}
        />
      )}
      {dayImageModal && (
        <ImageLightbox
          images={dayLightboxImages}
          initialIndex={dayImageModal.index}
          maxWidth="3xl"
          onClose={() => setDayImageModal(null)}
        />
      )}

      <div className="bg-white min-h-screen">
        <Navbar />

        <TripHero trip={trip} firstSchedule={schedules[0]} />

        <div className="max-w-7xl mx-auto px-4 md:px-6 py-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

            {/* Left column */}
            <div className="lg:col-span-8 space-y-8">
              <TripOverview trip={trip} />
              {trip.pdf && <TripPdfDownload url={trip.pdf} />}
              {gallery.length > 0 && (
                <TripGalleryGrid
                  gallery={gallery}
                  onImageClick={(index) => setGalleryModal({ open: true, index })}
                />
              )}
              {itinerary.length > 0 && (
                <TripItinerary
                  itinerary={itinerary}
                  onImageClick={(images, index) => setDayImageModal({ images, index })}
                />
              )}
              {faqs.length > 0 && (
                <TripFAQSection
                  faqs={faqs}
                  onImageClick={(images, index) => setDayImageModal({ images, index })}
                />
              )}
            </div>

            {/* Right column */}
            <div className="lg:col-span-4">
              <div className="sticky top-24 space-y-5">
                <BookingCard
                  trip={trip}
                  schedules={schedules}
                  selectedScheduleId={selectedScheduleId}
                  onScheduleChange={setSelectedScheduleId}
                  onBook={handleBooking}
                  onShare={handleShare}
                />
                <IncludesCard />
                <RemindersCard />
              </div>
            </div>

          </div>
        </div>

        <Footer />
      </div>
    </>
  );
}
