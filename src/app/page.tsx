"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { partnersAPI, Partner } from "@/services/api";

interface Tour {
  _id: string;
  name: string;
  location: string;
  price: number;
  duration: string;
  tourDate: string;
  startDate?: string;
  endDate?: string;
  status: string;
  image: {
    url: string;
  };
  pdf?: {
    url: string;
    publicId?: string;
  };
}

const HomeTourCard = ({ programTours, index }: { programTours: Tour[], index: number }) => {
  const sortedTours = [...programTours].sort((a, b) => {
    if (!a.startDate || !b.startDate) return 0;
    return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
  });

  const [selectedTour, setSelectedTour] = useState(sortedTours[0]);

  const handleDateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tourId = e.target.value;
    const tour = sortedTours.find(t => t._id === tourId);
    if (tour) setSelectedTour(tour);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative h-64">
        <Image
          src={selectedTour.image?.url || "/placeholder-tour.jpg"}
          alt={selectedTour.name}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
        {/* Status Badge */}
        {selectedTour.status === "เร็วๆนี้" && (
          <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-10">
            Coming Soon
          </div>
        )}
        {selectedTour.status === "เต็มแล้ว" && (
          <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-10">
            Sold Out
          </div>
        )}
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2">{selectedTour.name}</h3>

        {/* Date Dropdown/Text replaces Location */}
        <div className="mb-4">
          {sortedTours.length > 1 ? (
            <div className="relative">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <select
                value={selectedTour._id}
                onChange={handleDateChange}
                className="w-full bg-gray-50 border border-gray-200 text-gray-700 text-sm rounded-xl pl-9 pr-10 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:border-orange-500 transition-all cursor-pointer font-medium"
              >
                {sortedTours.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.tourDate} {t.status === 'เต็มแล้ว' ? '(เต็ม)' : ''}
                  </option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
              </div>
            </div>
          ) : (
            <p className="text-gray-600 text-sm flex items-center gap-2 font-medium bg-gray-50 py-2 px-3 rounded-xl border border-gray-100">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {selectedTour.tourDate}
            </p>
          )}
        </div>

        <div className="mt-auto">
          <div className="flex items-center justify-between mb-4 border-t border-gray-100 pt-4">
            <div className="flex items-center gap-2 text-gray-600 text-sm">
              <svg className="w-4 h-4 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {selectedTour.duration}
            </div>
            <div className="text-orange-500 font-bold text-lg">
              ฿{selectedTour.price.toLocaleString()}
            </div>
          </div>

          <div className="flex flex-col gap-2 w-full">
            <Link href={`/tours/${encodeURIComponent(selectedTour.name)}`} className="block w-full">
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full transition-colors duration-300 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
                ดูรายละเอียดทัวร์
              </button>
            </Link>
            {selectedTour.pdf?.url && (
              <a
                href={`/api/view-pdf?url=${encodeURIComponent(selectedTour.pdf.url)}${selectedTour.pdf?.publicId ? `&publicId=${encodeURIComponent(selectedTour.pdf.publicId)}` : ''}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <button className="w-full bg-white hover:bg-orange-50 text-orange-500 border-2 border-orange-500 py-2.5 rounded-full transition-colors duration-300 font-medium cursor-pointer">
                  ดูโปรแกรม (PDF)
                </button>
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function Home() {
  const [tours, setTours] = useState<Tour[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [showPartnersSection, setShowPartnersSection] = useState(false);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const res = await fetch('/api/tours');
        const data = await res.json();
        if (data.success) {
          setTours(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch tours:', error);
      }
    };

    const fetchPartners = async () => {
      try {
        const data = await partnersAPI.getAll();
        // Filter only visible partners
        const visiblePartners = data.filter((p: Partner) => p.isVisible);
        setPartners(visiblePartners);
        // Show section only if there are visible partners
        setShowPartnersSection(visiblePartners.length > 0);
      } catch (error) {
        console.error('Failed to fetch partners:', error);
        setShowPartnersSection(false);
      }
    };

    fetchTours();
    fetchPartners();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/cover.jpg"
            alt="Mountain landscape at sunset"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Gradient Overlay - darker at top, lighter at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/30 to-black/20" />
        </div>

        {/* Navigation */}
        <Navbar />

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col items-center justify-center h-[calc(100vh-100px)] text-center px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-white text-5xl md:text-8xl lg:text-9xl font-bold mb-4 drop-shadow-2xl">
              Lens Voyage
            </h1>
            <h2 className="text-white text-3xl md:text-6xl lg:text-7xl font-semibold mb-6 drop-shadow-2xl">
              ชวนคุณออกเดินทางผ่านเลนส์
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-white text-xl md:text-4xl mb-5 max-w-2xl drop-shadow-xl font-light">
              เพื่อมองเห็นโลกในมุมของคุณและมีความหมาย
            </p>
            <p className="text-white/90 text-sm md:text-2xl mb-8 max-w-3xl drop-shadow-lg leading-relaxed font-light px-4">
              ทุกการเดินทางถูกออกแบบมาอย่างตั้งใจ เพื่อให้คุณสัมผัสคุณค่าของประสบการณ์<br className="hidden md:block" />
              ผ่านแสง เฟรม และช่วงเวลาที่น่าจดจำ
            </p>
          </motion.div>

          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="group flex items-center gap-2 border-2 border-white text-white px-6 py-3 md:px-8 md:py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-lg md:text-2xl font-medium"
          >
            Explore The Experience
            <svg
              className="w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </motion.button>

          {/* Carousel Dots */}
          <div className="flex gap-2 mt-8 md:mt-12">
            <div className="w-2 h-2 rounded-full bg-white"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
            <div className="w-2 h-2 rounded-full bg-white/50"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="relative min-h-screen w-full overflow-hidden flex items-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/ice-cave.png"
            alt="Why Choose Us background"
            fill
            sizes="100vw"
            className="object-cover"
          />
          {/* Dark Gradient Overlay - lighter at top, darker at bottom */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/60 to-black/80" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full px-6 md:px-16 lg:px-20 py-16 md:py-20">
          <div className="max-w-7xl mx-auto">
            {/* Main Heading - Top */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-white text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-10 md:mb-16"
            >
              Why<br />
              Choose<br />
              Us<span className="text-orange-500">.</span>
            </motion.h2>

            {/* 3 Columns - Below Heading */}
            <div className="grid md:grid-cols-3 gap-8 md:gap-12 lg:gap-16 mb-12 md:mb-20">
              {/* Column 1: Thoughtfully Designed Journeys */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
                className="space-y-4"
              >
                <h3 className="text-lg md:text-2xl font-bold leading-tight">
                  <span className="text-white block">Thoughtfully Designed</span>
                  <span className="text-orange-500 block">Journeys.</span>
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  ทุกทริปเดินทางถูกออกแบบมาอย่างพิถีพิถัน เพื่อตอบโจทย์ความต้องการของคุณ เพื่อให้คุณได้สัมผัสและความงดงามความสนุกสนานในทุกช่วงเวลาที่มีความหมายสำคัญ
                </p>
              </motion.div>

              {/* Column 2: Experience at the Heart */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-4"
              >
                <h3 className="text-lg md:text-2xl font-bold leading-tight">
                  <span className="text-orange-500 block">Experience.</span>
                  <span className="text-white block">at the Heart</span>
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  ให้ประสบการณ์ของคุณเป็น ความรู้สึกและสารองค์ประกอบของความงามและความสุขของคุณ ๆ เพื่อให้การเดินทางเป็นไปอย่างมีความหมายและความทรงจำ
                </p>
              </motion.div>

              {/* Column 3: A Value You Can Feel */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="space-y-4"
              >
                <h3 className="text-lg md:text-2xl font-bold leading-tight">
                  <span className="text-orange-500 block">A Value.</span>
                  <span className="text-white block">You Can Feel</span>
                </h3>
                <p className="text-white/90 text-sm leading-relaxed">
                  ประสบการณ์ที่คุณสามารถสัมผัสได้ ด้วยคุณค่าที่แท้จริงของความงามและความสุขที่เกิดขึ้นและมีคุณค่าที่แท้จริงที่คุณสามารถรู้สึกได้
                </p>
              </motion.div>
            </div>

            {/* CTA Section */}
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-6 text-center md:text-left">
              <p className="text-white text-base md:text-xl font-light">
                Ready to see the world differently?
              </p>
              <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                <button className="flex justify-center items-center gap-2 border-2 border-white text-white px-6 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-sm font-medium w-full md:w-auto">
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                  ดูรายละเอียด
                </button>
                <button className="group flex justify-center items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition-all duration-300 text-sm font-medium w-full md:w-auto">
                  สอบถาม / จองทัวร์
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tours Section */}
      <section className="relative w-full py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-4">
              Our Trips<span className="text-orange-500">.</span>
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              เลือกประสบการณ์การเดินทางที่ถูกออกแบบมาอย่างพิถีพิถัน คลิกเพื่อดูรายละเอียดทริป
            </p>
          </motion.div>

          {/* Tour Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {tours.length === 0 ? (
              // Loading Skeleton or Empty State
              <div className="col-span-3 text-center py-20 text-gray-500">
                กำลังโหลดข้อมูลการเดินทาง...
              </div>
            ) : (
              Object.values(
                tours.filter(tour => tour.status !== 'ร่าง').reduce((acc, tour) => {
                  if (!acc[tour.name]) {
                    acc[tour.name] = [];
                  }
                  acc[tour.name].push(tour);
                  return acc;
                }, {} as Record<string, Tour[]>)
              ).map((programTours, index) => (
                <HomeTourCard key={index} programTours={programTours} index={index} />
              ))
            )}
          </div>
        </div>
      </section>

      {/* Aurora Section - The Masterpiece of Light */}
      < section className="relative h-screen w-screen left-[50%] right-[50%] -ml-[50vw] -mr-[50vw] overflow-hidden flex items-center" >
        {/* Background Image */}
        < div className="absolute inset-0" >
          <Image
            src="/69.jpg"
            alt="Northern Lights Aurora Borealis"
            fill
            sizes="100vw"
            className="object-cover object-bottom"
          />
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/30" />
        </div >

        {/* Content */}
        < div className="relative z-10 w-full px-8 md:px-16 lg:px-20" >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl"
          >
            <h2 className="text-white text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold leading-tight mb-8">
              The<br />
              Masterpiece<br />
              of Light
            </h2>
            <p className="text-white/90 text-lg md:text-xl mb-10 max-w-2xl leading-relaxed">
              สัมผัสแสงอรุณที่สั่นพรุบแบบที่ไม่มีที่ไหนเหมือน<br />
              ที่พบมนุษย์ยอดกับทุกพื้นที่ของโลกเหนือใต้<br />
              และเรียนรู้การดับพร้อมภาพ
            </p>
            <button className="group flex items-center gap-3 border-2 border-white text-white px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300 text-lg font-medium">
              ดูรายละเอียดทัวร์
              <svg
                className="w-6 h-6 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </button>
          </motion.div>
        </div >
      </section >

      {/* Partners Section - Only show if there are visible partners */}
      {showPartnersSection && partners.length > 0 && (
        <section className="relative w-full py-20 bg-white">
          <div className="max-w-7xl mx-auto px-8 md:px-16">
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-12 text-center"
            >
              Our Partners<span className="text-orange-500">.</span>
            </motion.h2>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="flex flex-nowrap overflow-x-auto pb-4 justify-start md:justify-center gap-6 md:gap-8 no-scrollbar"
            >
              {partners.map((partner) => (
                <motion.div
                  key={partner._id}
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  className="shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-full bg-white shadow-lg flex items-center justify-center p-4 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                >
                  {partner.logo?.url ? (
                    <a
                      href={partner.website || '#'}
                      target={partner.website ? '_blank' : undefined}
                      rel={partner.website ? 'noopener noreferrer' : undefined}
                      className="relative w-full h-full"
                      onClick={(e) => !partner.website && e.preventDefault()}
                    >
                      <Image
                        src={partner.logo.url}
                        alt={partner.name}
                        fill
                        sizes="(max-width: 768px) 96px, 128px"
                        className="object-contain"
                      />
                    </a>
                  ) : (
                    <div className="text-xs text-gray-400 text-center">{partner.name}</div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      )}

      {/* Gallery Section - Let Your Next Frame Be Here
      < section className="relative w-full py-20 bg-gray-100" >
        <div className="max-w-7xl mx-auto px-8 md:px-16">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-20 text-center leading-tight"
          >
            Let Your Next Frame<br />
            Be Here<span className="text-orange-500">.</span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-4"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem]">
                <Image
                  src="/gallery-lavender.jpg"
                  alt="Family in lavender field"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <p className="text-gray-600 text-lg">
                Lorem ipsum<br />
                dolor sit amet,
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-4"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem]">
                <Image
                  src="/gallery-beach.jpg"
                  alt="Friends on black sand beach"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <p className="text-gray-600 text-lg">
                Lorem ipsum<br />
                dolor sit amet,
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="space-y-4"
            >
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem]">
                <Image
                  src="/gallery-lake.jpg"
                  alt="Boating in alpine lake"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover hover:scale-110 transition-transform duration-700"
                />
              </div>
              <p className="text-gray-600 text-lg">
                Lorem ipsum<br />
                dolor sit amet,
              </p>
            </motion.div>
          </div>
        </div>
      </section > */}

      {/* Footer */}
      <Footer />
    </div>
  );
}
