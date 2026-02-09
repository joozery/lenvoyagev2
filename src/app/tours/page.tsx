"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface Tour {
    _id: string;
    name: string;
    location: string;
    price: number;
    duration: string;
    tourDate: string;
    seatsAvailable: number;
    status: string;
    image: {
        url: string;
    };
    pdf?: {
        url: string;
        publicId?: string;
    };
}

export default function AllTours() {
    const [tours, setTours] = useState<Tour[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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
            } finally {
                setIsLoading(false);
            }
        };

        fetchTours();
    }, []);

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
                        {isLoading ? (
                            <div className="col-span-3 text-center py-20 text-gray-500">
                                กำลังโหลดข้อมูล...
                            </div>
                        ) : tours.length === 0 ? (
                            <div className="col-span-3 text-center py-20 text-gray-500">
                                ยังไม่มีทัวร์ที่เปิดให้บริการในขณะนี้
                            </div>
                        ) : (
                            tours.filter(tour => tour.status !== 'ร่าง').map((tour) => (
                                <motion.div
                                    key={tour._id}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 border border-gray-100 flex flex-col h-full"
                                >
                                    {/* Card Image */}
                                    <div className="relative h-60 w-full overflow-hidden">
                                        <Image
                                            src={tour.image?.url || "/placeholder-tour.jpg"}
                                            alt={tour.name}
                                            fill
                                            className="object-cover hover:scale-110 transition-transform duration-700"
                                        />
                                        {/* Status Badge */}
                                        {tour.status === "เร็วๆนี้" && (
                                            <div className="absolute top-4 right-4 bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-10">
                                                Coming Soon
                                            </div>
                                        )}
                                        {tour.status === "เต็มแล้ว" && (
                                            <div className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-md z-10">
                                                Sold Out
                                            </div>
                                        )}
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 flex-grow flex flex-col justify-between">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4 line-clamp-2 min-h-[56px]">
                                                {tour.name}
                                            </h3>

                                            {/* Date */}
                                            <div className="flex items-center gap-2 mb-6">
                                                <span className="bg-gray-100 p-1.5 rounded-md">
                                                    <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                </span>
                                                <span className="text-gray-600 text-sm font-medium bg-gray-100 px-3 py-1 rounded-md">{tour.tourDate}</span>
                                            </div>

                                            {/* Details: Duration & Location */}
                                            <div className="space-y-2 mb-6 text-sm text-gray-600">
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                                    <span>{tour.duration}</span>
                                                </div>
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                                    <span>{tour.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Price & Seats */}
                                        <div className="space-y-4">
                                            <div className="flex items-end justify-between border-t border-gray-100 pt-4">
                                                <div className="text-red-500 font-bold text-2xl">
                                                    ฿{tour.price.toLocaleString()}
                                                </div>
                                                <div className={`text-sm font-medium ${tour.status === 'เต็มแล้ว' ? 'text-red-500' : 'text-green-600'}`}>
                                                    {tour.status === 'เต็มแล้ว' ? 'เต็ม' : `รับ ${tour.seatsAvailable} ท่าน`}
                                                </div>
                                            </div>

                                            {tour.pdf?.url ? (
                                                <a
                                                    href={`/api/view-pdf?url=${encodeURIComponent(tour.pdf.url)}${tour.pdf?.publicId ? `&publicId=${encodeURIComponent(tour.pdf.publicId)}` : ''}`}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block w-full"
                                                >
                                                    <button className="w-full bg-[#ff4d00] hover:bg-[#e64500] text-white py-3 rounded-full transition-colors duration-300 font-medium flex items-center justify-center gap-2 cursor-pointer">
                                                        ดูทริป
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                    </button>
                                                </a>
                                            ) : (
                                                <Link href={`/tours/${tour._id}`} className="block w-full">
                                                    <button className="w-full bg-[#ff4d00] hover:bg-[#e64500] text-white py-3 rounded-full transition-colors duration-300 font-medium flex items-center justify-center gap-2">
                                                        ดูทริป
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                                                    </button>
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
