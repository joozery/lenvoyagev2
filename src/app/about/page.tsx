"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useRef, useEffect, useState } from "react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { TeamMember } from "@/services/api";

export default function About() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
    const [isLoading, setIsLoading] = useState(true);

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

    useEffect(() => {
        const fetchMembers = async () => {
            try {
                // Fetch using absolute URL to handle server-side rendering
                const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
                const res = await fetch(`${API_URL}/api/teams`);
                if (!res.ok) throw new Error("Failed to fetch");
                const result = await res.json();
                setTeamMembers(result.data || []);
            } catch (error) {
                console.error("Error fetching team:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchMembers();
    }, []);

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/cover.jpg"
                        alt="About Lens Voyage"
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
                            About Us
                        </h1>
                        <h2 className="text-white text-3xl md:text-6xl lg:text-7xl font-semibold mb-6 drop-shadow-2xl">
                            Lens Voyage
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-white text-xl md:text-4xl mb-5 max-w-2xl drop-shadow-xl font-light">
                            รู้จักกับเรา และการเดินทางของเรา
                        </p>
                        <p className="text-white/90 text-sm md:text-2xl mb-8 max-w-3xl drop-shadow-lg leading-relaxed font-light px-4">
                            เราคือกลุ่มช่างภาพที่รักการเดินทาง และอยากแบ่งปันมุมมองความงามของโลกผ่านเลนส์<br className="hidden md:block" />
                            ให้กับทุกคนที่ร่วมเดินทางไปกับเรา
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* About Us Content Section */}
            <section className="py-16 md:py-24 px-6 md:px-8 bg-white">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold mb-8 md:mb-12"
                    >
                        About <span className="text-orange-500">Us</span>
                    </motion.h2>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-base md:text-xl text-gray-700 leading-relaxed font-light px-4"
                    >
                        Gography เกิดจากการรวมตัวของกลุ่มช่างภาพที่รักการเดินทาง<br className="hidden md:block" />
                        เราเดินทางไปในหลายที่ทั่วโลก ผ่านประสบการณ์ที่หลากหลาย และเข้าใจดีว่า<br className="hidden md:block" />
                        อะไรที่ทำให้การเดินทางสมบูรณ์แบบ เราจึงออกแบบเส้นทางทุกทริปโดยใช้มุมมองของ<br className="hidden md:block" />
                        นักเดินทางตัวจริง ที่รู้ว่าควรเติมอะไรลงไปในทริป เพื่อให้ทุกคนที่ร่วมเดินทางกับเราได้รับ<br className="hidden md:block" />
                        ช่วงเวลาที่ดีและความทรงจำที่คุ้มค่าที่สุด
                    </motion.p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="relative w-full py-16 md:py-20 overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/cover.jpg"
                        alt="Stats Background"
                        fill
                        className="object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/60" />
                </div>

                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-16">
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">
                        {/* Left Card - Glassmorphism */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="w-full lg:w-1/2 bg-white/10 backdrop-blur-md rounded-[2.5rem] p-8 md:p-14 border border-white/20 shadow-2xl"
                        >
                            <div className="space-y-8 md:space-y-10">
                                {/* Stat 1 */}
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl md:text-7xl font-bold text-white">3,000</span>
                                        <span className="text-2xl md:text-4xl font-bold text-orange-500">+ คน</span>
                                    </div>
                                    <p className="text-gray-300 text-base md:text-lg mt-2 font-light">
                                        ที่เราได้พาไปเก็บช่วงเวลาที่ดีที่สุดช่วงเวลาหนึ่งในชีวิต
                                    </p>
                                </div>

                                {/* Stat 2 */}
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl md:text-7xl font-bold text-white">100</span>
                                        <span className="text-2xl md:text-4xl font-bold text-orange-500">%</span>
                                    </div>
                                    <p className="text-gray-300 text-base md:text-lg mt-2 font-light">
                                        จำนวนรีวิวที่ผู้คนแนะนำบริการของเรา
                                    </p>
                                </div>

                                {/* Stat 3 */}
                                <div>
                                    <div className="flex items-baseline gap-2">
                                        <span className="text-5xl md:text-7xl font-bold text-white">8</span>
                                        <span className="text-2xl md:text-4xl font-bold text-orange-500">ปี</span>
                                    </div>
                                    <p className="text-gray-300 text-base md:text-lg mt-2 font-light">
                                        คือระยะเวลาที่เราได้สร้างความทรงจำให้คนมากมาย
                                    </p>
                                </div>
                            </div>
                        </motion.div>

                        {/* Right Side - List */}
                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="w-full lg:w-1/2"
                        >
                            <ul className="space-y-6 md:space-y-8">
                                {[
                                    "ทุกทริปได้รับความประทับใจจริง",
                                    "ประสบการณ์ที่ดีจากการเดินทาง",
                                    "จุดหมายพิเศษสำหรับช่างภาพ",
                                    "ทำให้การเดินทางสมบูรณ์แบบ"
                                ].map((item, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                                        className="flex items-center gap-4 md:gap-6"
                                    >
                                        <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full border border-white/30 flex items-center justify-center text-white bg-white/5">
                                            {/* Aperture Icon */}
                                            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8Z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.31 8 20.05 17.94" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.69 8h11.48" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7.38 12l5.74-9.94" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.69 16L3.95 6.06" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.31 16H2.83" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16.62 12l-5.74 9.94" />
                                            </svg>
                                        </div>
                                        <span className="text-lg md:text-2xl text-white font-light tracking-wide">{item}</span>
                                    </motion.li>
                                ))}
                            </ul>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 md:py-24 px-6 md:px-8 bg-white">
                <div className="max-w-7xl mx-auto text-center">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-6xl font-bold mb-12 md:mb-20 text-black"
                    >
                        Team<span className="text-orange-500">.</span>
                    </motion.h2>

                    <div className="grid md:grid-cols-3 gap-12 md:gap-8">
                        {isLoading ? (
                            <div className="col-span-3 py-10 text-gray-500">Loading team...</div>
                        ) : teamMembers.length === 0 ? (
                            <div className="col-span-3 py-10 text-gray-500">ยังไม่มีข้อมูลทีมงาน</div>
                        ) : (
                            teamMembers.map((item, index) => (
                                <motion.div
                                    key={item._id || index}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: index * 0.2 }}
                                    className="flex flex-col items-center"
                                >
                                    <div className="w-48 h-48 md:w-56 md:h-56 rounded-full bg-gray-200 mb-6 md:mb-8 relative overflow-hidden group hover:shadow-xl transition-shadow duration-300">
                                        {item.avatar?.url ? (
                                            <Image
                                                src={item.avatar.url}
                                                alt={item.name}
                                                fill
                                                className="object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gray-200 text-gray-400">
                                                <span className="text-4xl font-bold">{item.name.charAt(0)}</span>
                                            </div>
                                        )}
                                    </div>

                                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{item.name}</h3>
                                    <h4 className="text-orange-500 font-medium tracking-wide text-sm uppercase mb-3">{item.role}</h4>
                                    <p className="text-gray-500 leading-relaxed max-w-xs mx-auto text-sm line-clamp-4">
                                        {item.bio || "-"}
                                    </p>

                                    {/* Social Links */}
                                    {item.socialLinks && (item.socialLinks.facebook || item.socialLinks.instagram) && (
                                        <div className="flex gap-4 mt-4">
                                            {item.socialLinks.facebook && (
                                                <a href={item.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                                                </a>
                                            )}
                                            {item.socialLinks.instagram && (
                                                <a href={item.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-orange-500 transition-colors">
                                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
                                                </a>
                                            )}
                                        </div>
                                    )}
                                </motion.div>
                            ))
                        )}
                    </div>
                </div>
            </section>

            {/* Gallery Section */}
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
                            className="text-5xl md:text-8xl lg:text-9xl font-bold text-white mb-6 md:mb-8"
                        >
                            Gallery<span className="text-orange-500">.</span>
                        </motion.h2>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                        >
                            <Link href="/gallery" className="inline-flex items-center gap-2 text-white text-xl hover:text-orange-500 transition-colors group">
                                See All
                                <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
                            </Link>
                        </motion.div>
                    </div>
                </div>

                {/* Bottom Thumbnails - Scrollable with Arrows */}
                <div className="relative z-10 w-full pb-8 px-4 md:px-8 group">
                    {/* Left Arrow */}
                    <button
                        onClick={() => scroll('left')}
                        className="absolute left-8 md:left-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/20 opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                    </button>

                    {/* Right Arrow */}
                    <button
                        onClick={() => scroll('right')}
                        className="absolute right-8 md:right-12 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-black/40 hover:bg-orange-500 text-white flex items-center justify-center backdrop-blur-sm transition-all duration-300 border border-white/20 opacity-0 group-hover:opacity-100 -translate-x-4 group-hover:translate-x-0"
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
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

            {/* Footer */}
            <Footer />
        </div>
    );
}

