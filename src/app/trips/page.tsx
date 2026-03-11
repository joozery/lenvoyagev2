"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { MOCK_TRIPS, type Trip } from "@/lib/mockTrips";

const MONTH_LABELS: Record<number, string> = {
  1: "มกราคม", 2: "กุมภาพันธ์", 3: "มีนาคม", 4: "เมษายน",
  5: "พฤษภาคม", 6: "มิถุนายน", 7: "กรกฎาคม", 8: "สิงหาคม",
  9: "กันยายน", 10: "ตุลาคม", 11: "พฤศจิกายน", 12: "ธันวาคม",
};

const PAGE_SIZE = 9;

// ---------------------------------------------------------------------------
// TripCard — schedule pills (from gography) + lenvoyage visual style
// ---------------------------------------------------------------------------
function TripCard({ trip }: { trip: Trip }) {
  const [selectedId, setSelectedId] = useState(trip.schedules[0]?.id ?? "");
  const current = trip.schedules.find((s) => s.id === selectedId) ?? trip.schedules[0];

  if (!current) return null;

  const isFull = current.status === "full";
  const isSoon = current.status === "coming_soon";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
    >
      {/* Image */}
      <div className="relative h-60 w-full overflow-hidden">
        <Image
          src={trip.image}
          alt={trip.name}
          fill
          className="object-cover hover:scale-110 transition-transform duration-700"
        />
        {isFull && (
          <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-10">
            เต็มแล้ว
          </span>
        )}
        {isSoon && !isFull && (
          <span className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-10">
            เร็วๆ นี้
          </span>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 min-h-[56px]">
            {trip.name}
          </h3>

          {/* Schedule Pills (ported from gography TripCard) */}
          <div className="mb-5">
            <div className="flex items-start gap-2">
              <svg className="w-5 h-5 mt-0.5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <div className="flex flex-wrap gap-2">
                {trip.schedules.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setSelectedId(s.id)}
                    className={`px-3 py-1.5 text-xs rounded-full border transition-all font-medium cursor-pointer ${
                      selectedId === s.id
                        ? "bg-[#ff4d00] text-white border-[#ff4d00]"
                        : "bg-white text-gray-600 border-gray-300 hover:border-[#ff4d00] hover:text-[#ff4d00]"
                    } ${s.status === "full" ? "opacity-60" : ""}`}
                  >
                    {s.dates}{s.status === "full" ? " (เต็ม)" : ""}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Duration & Country */}
          <div className="space-y-2 mb-5 text-sm text-gray-600">
            <div className="flex items-center gap-3">
              <svg className="w-5 h-5 text-gray-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{current.duration}</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-lg leading-none">{trip.flag}</span>
              <span>{trip.country}</span>
            </div>
          </div>
        </div>

        {/* Price, Seats & CTA */}
        <div className="space-y-4">
          <div className="flex items-end justify-between border-t border-gray-100 pt-4">
            <div className="text-[#ff4d00] font-bold text-2xl">
              ฿{current.seatsAvailable > 0 ? trip.price.toLocaleString() : trip.price.toLocaleString()}
            </div>
            <div className={`text-sm font-medium ${isFull ? "text-red-500" : "text-green-600"}`}>
              {isFull ? "เต็มแล้ว" : `รับ ${current.seatsAvailable} ท่าน`}
            </div>
          </div>

          {trip.pdf ? (
            <a href={trip.pdf} target="_blank" rel="noopener noreferrer" className="block w-full">
              <button className="w-full bg-[#ff4d00] hover:bg-[#e64500] text-white py-3 rounded-full transition-colors duration-300 font-medium flex items-center justify-center gap-2 cursor-pointer">
                ดูทริป
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </a>
          ) : (
            <Link href={`/trips/${trip.id}`} className="block w-full">
              <button className="w-full bg-[#ff4d00] hover:bg-[#e64500] text-white py-3 rounded-full transition-colors duration-300 font-medium flex items-center justify-center gap-2 cursor-pointer">
                ดูทริป
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
}

// ---------------------------------------------------------------------------
// Main Page
// ---------------------------------------------------------------------------
export default function TripsPage() {
  const [selectedCountry, setSelectedCountry] = useState("ทั่วหมด");
  const [selectedMonth, setSelectedMonth] = useState("ทุกเดือน");
  const [currentPage, setCurrentPage] = useState(1);

  // Unique countries from mock data
  const countryOptions = useMemo(() => {
    const seen = new Set<string>();
    return MOCK_TRIPS.filter((t) => {
      if (seen.has(t.country)) return false;
      seen.add(t.country);
      return true;
    }).map((t) => ({ label: t.country, flag: t.flag }));
  }, []);

  // Unique months from mock schedules
  const monthOptions = useMemo(() => {
    const seen = new Set<number>();
    MOCK_TRIPS.forEach((t) =>
      t.schedules.forEach((s) => seen.add(new Date(s.startDate).getMonth() + 1))
    );
    return Array.from(seen).sort((a, b) => a - b).map((m) => ({
      value: String(m),
      label: MONTH_LABELS[m],
    }));
  }, []);

  // Client-side filter
  const filtered = useMemo(() => {
    return MOCK_TRIPS.filter((trip) => {
      const matchCountry = selectedCountry === "ทั่วหมด" || trip.country === selectedCountry;
      const matchMonth =
        selectedMonth === "ทุกเดือน" ||
        trip.schedules.some(
          (s) => String(new Date(s.startDate).getMonth() + 1) === selectedMonth
        );
      return matchCountry && matchMonth;
    });
  }, [selectedCountry, selectedMonth]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilterChange = () => setCurrentPage(1);

  return (
    <div className="min-h-screen bg-white">

      {/* ------------------------------------------------------------------ */}
      {/* Hero                                                                 */}
      {/* ------------------------------------------------------------------ */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/cover.jpg" alt="All Trips" fill className="object-cover object-center" priority />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/20" />
        </div>

        <Navbar />

        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center px-4">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-white text-5xl md:text-8xl lg:text-9xl font-bold mb-4 drop-shadow-2xl">
              All Trips
            </h1>
            <h2 className="text-white text-3xl md:text-5xl lg:text-6xl font-semibold mb-6 drop-shadow-2xl">
              สัมผัสโลกผ่านเลนส์ของคุณ
            </h2>
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}>
            <p className="text-white/90 text-xl md:text-3xl max-w-2xl drop-shadow-xl font-light leading-relaxed">
              ทริปถ่ายภาพที่คัดสรรมาแล้ว เพื่อให้คุณได้ภาพที่ดีที่สุด
            </p>
          </motion.div>
        </div>
      </section>

      {/* ------------------------------------------------------------------ */}
      {/* Trips Section                                                        */}
      {/* ------------------------------------------------------------------ */}
      <section className="py-12 md:py-20 px-4 md:px-8 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto">

          {/* Filters (ported from gography) */}
          <div className="flex flex-col sm:flex-row gap-3 mb-10 md:mb-14">
            {/* Country */}
            <div className="relative">
              <select
                value={selectedCountry}
                onChange={(e) => { setSelectedCountry(e.target.value); handleFilterChange(); }}
                className="w-full sm:w-auto sm:min-w-[200px] bg-white border border-gray-300 text-gray-800 rounded-full px-6 py-3 pr-10 focus:outline-none focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20 appearance-none cursor-pointer font-semibold transition-colors"
              >
                <option value="ทั่วหมด">🌍 ทุกประเทศ</option>
                {countryOptions.map((c) => (
                  <option key={c.label} value={c.label}>{c.flag} {c.label}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Month */}
            <div className="relative">
              <select
                value={selectedMonth}
                onChange={(e) => { setSelectedMonth(e.target.value); handleFilterChange(); }}
                className="w-full sm:w-auto sm:min-w-[200px] bg-white border border-gray-300 text-gray-800 rounded-full px-6 py-3 pr-10 focus:outline-none focus:border-[#ff4d00] focus:ring-2 focus:ring-[#ff4d00]/20 appearance-none cursor-pointer font-semibold transition-colors"
              >
                <option value="ทุกเดือน">📅 ทุกเดือน</option>
                {monthOptions.map((m) => (
                  <option key={m.value} value={m.value}>{m.label}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Clear filter */}
            {(selectedCountry !== "ทั่วหมด" || selectedMonth !== "ทุกเดือน") && (
              <div className="flex items-center gap-2 sm:ml-auto">
                <span className="text-sm text-gray-500">พบ {filtered.length} ทริป</span>
                <button
                  onClick={() => { setSelectedCountry("ทั่วหมด"); setSelectedMonth("ทุกเดือน"); setCurrentPage(1); }}
                  className="text-sm text-[#ff4d00] hover:underline font-medium cursor-pointer"
                >
                  ล้างตัวกรอง ✕
                </button>
              </div>
            )}
          </div>

          {/* Grid */}
          {paginated.length === 0 ? (
            <div className="col-span-3 text-center py-20 text-gray-500">
              ไม่พบทริปที่ตรงกับการค้นหา
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {paginated.map((trip) => (
                <TripCard key={trip.id} trip={trip} />
              ))}
            </div>
          )}

          {/* Pagination (ported from gography) */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-2 mt-12 flex-wrap">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentPage === 1
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "cursor-pointer bg-white border border-gray-300 text-gray-700 hover:border-[#ff4d00] hover:text-[#ff4d00]"
                }`}
              >
                ← ก่อนหน้า
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`cursor-pointer w-10 h-10 rounded-lg font-medium text-sm transition-colors ${
                    currentPage === page
                      ? "bg-[#ff4d00] text-white"
                      : "bg-white border border-gray-300 text-gray-700 hover:border-[#ff4d00] hover:text-[#ff4d00]"
                  }`}
                >
                  {page}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  currentPage === totalPages
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "cursor-pointer bg-white border border-gray-300 text-gray-700 hover:border-[#ff4d00] hover:text-[#ff4d00]"
                }`}
              >
                ถัดไป →
              </button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
