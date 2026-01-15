"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function Home() {
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
            <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-gray-900 mb-4">
              15 <span className="text-4xl md:text-5xl font-normal">ประเทศ</span>
            </h2>
            <p className="text-gray-600 text-lg">
              ที่พร้อมพาคุณไปพบกับความสุข
            </p>
          </motion.div>

          {/* Tour Cards */}
          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Chengtu */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src="/tour-chengtu.jpg"
                  alt="Chengtu Tour"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Chengtu</h3>
                <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  จีนตอนใต้
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    6 วัน 5 คืน
                  </div>
                  <div className="text-orange-500 font-bold text-lg">
                    เหลือ X ฿
                  </div>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full transition-colors duration-300 font-medium">
                  ดูทัวร์
                </button>
              </div>
            </motion.div>

            {/* Card 2: GER-AUT-CZE */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src="/tour-europe.jpg"
                  alt="GER-AUT-CZE Tour"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">GER-AUT-CZE</h3>
                <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  ยุโรปกลาง
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    9 วัน 7 คืน
                  </div>
                  <div className="text-orange-500 font-bold text-lg">
                    เหลือ X ฿
                  </div>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full transition-colors duration-300 font-medium">
                  ดูทัวร์
                </button>
              </div>
            </motion.div>

            {/* Card 3: Grand Italy */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="relative h-64">
                <Image
                  src="/tour-italy.jpg"
                  alt="Grand Italy Tour"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">Grand Italy</h3>
                <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  อิตาลี
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-gray-600 text-sm">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    8 วัน 6 คืน
                  </div>
                  <div className="text-orange-500 font-bold text-lg">
                    เหลือ X ฿
                  </div>
                </div>
                <button className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-full transition-colors duration-300 font-medium">
                  ดูทัวร์
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section >

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

      {/* Partners Section */}
      < section className="relative w-full py-20 bg-white" >
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <motion.div
                key={i}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="shrink-0 w-20 h-20 md:w-28 md:h-28 rounded-full bg-white shadow-lg flex items-center justify-center p-4 hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="relative w-full h-full">
                  <Image
                    src="/partner-logo.png"
                    alt={`Partner ${i}`}
                    fill
                    sizes="(max-width: 768px) 96px, 128px"
                    className="object-contain"
                  />
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section >

      {/* Gallery Section - Let Your Next Frame Be Here */}
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
            {/* Gallery Item 1 */}
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

            {/* Gallery Item 2 */}
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

            {/* Gallery Item 3 */}
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
      </section >

      {/* Footer */}
      <Footer />
    </div>
  );
}
