"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function GalleryPage() {
    const scrollRef = useRef<HTMLDivElement>(null);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 350;
            if (direction === 'left') {
                current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            } else {
                current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/cover.jpg"
                        alt="Gallery Cover"
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
                            Gallery
                        </h1>
                        <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-light mb-6 drop-shadow-2xl tracking-wide">
                            MOMENTS FROZEN IN TIME
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-white/90 text-sm md:text-2xl mb-8 max-w-3xl drop-shadow-lg leading-relaxed font-light px-4">
                            รวบรวมภาพความประทับใจจากการเดินทางทั่วทุกมุมโลก<br className="hidden md:block" />
                            ผ่านมุมมองของช่างภาพและเพื่อนร่วมทางของเรา
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Interactive Gallery Section */}
            <section className="relative h-screen w-full overflow-hidden flex flex-col justify-between">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/gallery-lake.jpg"
                        alt="Gallery Background"
                        fill
                        className="object-cover"
                    />
                    {/* Gradient Overlay - Dark on right side */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-black/80" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/90" />
                </div>

                {/* Main Content */}
                <div className="relative z-10 flex-grow flex items-center justify-end px-6 md:px-16 lg:px-20">
                    <div className="text-right">
                        <motion.h2
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-8xl lg:text-9xl font-bold text-white mb-8"
                        >
                            Gallery<span className="text-orange-500">.</span>
                        </motion.h2>
                    </div>
                </div>

                {/* Bottom Thumbnails - Scrollable with Arrows */}
                <div className="relative z-10 w-full pb-8 px-4 md:px-8 group">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-4 md:left-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/20 md:opacity-0 group-hover:opacity-100 translate-x-2 md:translate-x-4 group-hover:translate-x-0"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-4 md:right-12 top-1/2 -translate-y-1/2 z-20 w-10 h-10 md:w-12 md:h-12 rounded-full bg-black/40 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/20 md:opacity-0 group-hover:opacity-100 -translate-x-2 md:-translate-x-4 group-hover:translate-x-0"
                    >
                        <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                    </button>

                    <div
                        ref={scrollRef}
                        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth"
                    >
                        {[...Array(8)].map((_, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 50 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 * index }}
                                className="flex-shrink-0 relative w-64 h-40 md:w-80 md:h-52 bg-gray-200 rounded-lg overflow-hidden cursor-pointer hover:opacity-100 transition-opacity opacity-90 border border-white/10"
                            >
                                <Image
                                    src={`/gallery-${index % 2 === 0 ? 'lavender' : 'beach'}.jpg`}
                                    alt={`Gallery thumbnail ${index + 1}`}
                                    fill
                                    sizes="320px"
                                    className="object-cover hover:scale-105 transition-transform duration-500"
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Video Section */}
            <section className="relative h-screen w-full overflow-hidden flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/ice-cave.png"
                        alt="Video Background"
                        fill
                        className="object-cover"
                    />
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-black/30" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-8xl lg:text-9xl font-bold text-white mb-10 md:mb-16 drop-shadow-2xl"
                    >
                        Video<span className="text-orange-500">.</span>
                    </motion.h2>

                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 lg:gap-12">
                        {/* Video Card 1 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="w-full md:w-[400px] aspect-video bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group cursor-pointer hover:bg-white/30 transition-all duration-300"
                        >
                            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-white/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                                <svg className="w-6 h-6 md:w-8 md:h-8 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </motion.div>

                        {/* Video Card 2 */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="w-full md:w-[400px] aspect-video bg-white/20 backdrop-blur-md border border-white/30 flex items-center justify-center group cursor-pointer hover:bg-white/30 transition-all duration-300"
                        >
                            <div className="w-20 h-20 rounded-full border-2 border-white/80 flex items-center justify-center group-hover:scale-110 group-hover:bg-white/10 transition-all duration-300">
                                <svg className="w-8 h-8 text-white ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
