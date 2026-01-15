"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AllTours() {
    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/cover.jpg"
                        alt="All Tours Cover"
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Gradient Overlay */}
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
                            All Tours
                        </h1>
                        <h2 className="text-white text-3xl md:text-6xl lg:text-7xl font-semibold mb-6 drop-shadow-2xl">
                            Discover The World
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-white text-xl md:text-4xl mb-5 max-w-2xl drop-shadow-xl font-light">
                            เลือกเส้นทางที่คุณอยากไปสัมผัส
                        </p>
                        <p className="text-white/90 text-sm md:text-2xl mb-8 max-w-3xl drop-shadow-lg leading-relaxed font-light px-4">
                            ทริปถ่ายภาพที่คัดสรรมาแล้ว เพื่อให้คุณได้ภาพที่ดีที่สุด<br className="hidden md:block" />
                            และประสบการณ์การเดินทางที่น่าจดจำ
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Tours List Section */}
            <section className="py-12 md:py-20 px-4 md:px-8 bg-gray-50 min-h-screen">
                <div className="max-w-7xl mx-auto">
                    {/* Header & Filter */}
                    <div className="mb-8 md:mb-12">
                        <h3 className="text-gray-500 text-base md:text-lg mb-4">ประเทศ</h3>
                        <button className="flex items-center justify-between w-full md:w-auto md:min-w-[200px] border border-gray-300 rounded-full px-6 py-3 bg-white hover:border-orange-500 transition-colors">
                            <span className="font-semibold text-gray-800">Country</span>
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </button>
                    </div>

                    {/* Tours Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Tour Items Mock Data */}
                        {[
                            {
                                id: 1,
                                image: "/69.jpg",
                                title: "Aurora Valentine Journey – Lofoten & Finland 2026",
                                date: "13-20 ก.พ.",
                                duration: "8 วัน 6 คืน",
                                location: "นอร์เวย์",
                                price: "165,900",
                                seats: "รับ 6 ท่าน",
                                status: "available"
                            },
                            {
                                id: 2,
                                image: "/ice-cave.png",
                                title: "[ Private ] Arctic Aurora: New Year in Norway & Finland 2026",
                                date: "29 ธ.ค. - 6 ม.ค.",
                                duration: "9 วัน 7 คืน",
                                location: "นอร์เวย์",
                                price: "229,000",
                                seats: "เต็ม",
                                status: "full"
                            },
                            {
                                id: 3,
                                image: "/cover.jpg",
                                title: "LOFOTEN WINTER - Aurora 2026",
                                date: "11-17 มี.ค., 18-24 มี.ค.",
                                duration: "7 วัน 5 คืน",
                                location: "นอร์เวย์",
                                price: "89,900",
                                seats: "รับ 6 ท่าน",
                                status: "available"
                            },
                            {
                                id: 4,
                                image: "/69.jpg",
                                title: "Aurora Valentine Journey – Lofoten & Finland 2026",
                                date: "13-20 ก.พ.",
                                duration: "8 วัน 6 คืน",
                                location: "นอร์เวย์",
                                price: "165,900",
                                seats: "รับ 6 ท่าน",
                                status: "available"
                            },
                            {
                                id: 5,
                                image: "/ice-cave.png",
                                title: "[ Private ] Arctic Aurora: New Year in Norway & Finland 2026",
                                date: "29 ธ.ค. - 6 ม.ค.",
                                duration: "9 วัน 7 คืน",
                                location: "นอร์เวย์",
                                price: "229,000",
                                seats: "เต็ม",
                                status: "full"
                            },
                            {
                                id: 6,
                                image: "/cover.jpg",
                                title: "LOFOTEN WINTER - Aurora 2026",
                                date: "11-17 มี.ค., 18-24 มี.ค.",
                                duration: "7 วัน 5 คืน",
                                location: "นอร์เวย์",
                                price: "89,900",
                                seats: "รับ 6 ท่าน",
                                status: "available"
                            },
                        ].map((tour) => (
                            <motion.div
                                key={tour.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col"
                            >
                                {/* Card Image */}
                                <div className="relative h-60 w-full overflow-hidden">
                                    <Image
                                        src={tour.image}
                                        alt={tour.title}
                                        fill
                                        className="object-cover hover:scale-110 transition-transform duration-700"
                                    />
                                    {/* Overlay Text example for first item */}
                                    {tour.id % 3 === 1 && (
                                        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                                            <div className="text-center text-white drop-shadow-md">
                                                <p className="text-sm font-light tracking-widest uppercase mb-1">Valentine</p>
                                                <p className="font-bold text-lg">NORTHERN LIGHTS WITH LOVE</p>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Card Content */}
                                <div className="p-6 flex-grow flex flex-col justify-between">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 min-h-[56px]">
                                            {tour.title}
                                        </h3>

                                        {/* Date */}
                                        <div className="flex items-center gap-2 mb-6">
                                            <span className="bg-gray-100 p-1.5 rounded-md">
                                                <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            </span>
                                            <span className="text-gray-600 text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">{tour.date}</span>
                                        </div>

                                        {/* Details: Duration & Location */}
                                        <div className="space-y-2 mb-6 text-sm text-gray-600">
                                            <div className="flex items-center gap-3">
                                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                <span>{tour.duration}</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="w-5 h-5 flex items-center justify-center text-lg">🇳🇴</span>
                                                <span>{tour.location}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price & Seats */}
                                    <div className="space-y-4">
                                        <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                                            <div className="text-red-500 font-bold text-2xl">
                                                ฿{tour.price}
                                            </div>
                                            <div className={`text-sm font-medium ${tour.status === 'full' ? 'text-red-500' : 'text-green-600'}`}>
                                                {tour.seats}
                                            </div>
                                        </div>

                                        <button className="w-full bg-[#ff4d00] hover:bg-[#e64500] text-white py-3 rounded-full transition-colors duration-300 font-medium flex items-center justify-center gap-2">
                                            ดูทริป
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
