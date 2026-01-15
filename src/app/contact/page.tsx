"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useState } from "react";
import { useRouter } from "next/navigation";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";


export default function ContactPage() {
    const router = useRouter();

    // State for selections
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedMonth, setSelectedMonth] = useState("");
    const [selectedYear, setSelectedYear] = useState("");

    // State for dropdown visibility
    const [openDropdown, setOpenDropdown] = useState<"country" | "month" | "year" | null>(null);

    // Mock Data
    const countries = ["Norway", "Iceland", "Japan", "New Zealand", "Vietnam", "China", "Georgia"];
    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const years = ["2025", "2026", "2027"];

    // Handler for toggling dropdowns
    const toggleDropdown = (name: "country" | "month" | "year") => {
        if (openDropdown === name) {
            setOpenDropdown(null);
        } else {
            setOpenDropdown(name);
        }
    };

    // Handler for Search
    const handleSearch = () => {
        // Construct query params
        const params = new URLSearchParams();
        if (selectedCountry) params.set("country", selectedCountry);
        if (selectedMonth) params.set("month", selectedMonth);
        if (selectedYear) params.set("year", selectedYear);

        // Navigate to tours page with filters (demo flow)
        console.log("Searching for:", { selectedCountry, selectedMonth, selectedYear });
        router.push(`/tours?${params.toString()}`);
    };

    // Dropdown component helper
    const DropdownList = ({ items, onSelect, current }: { items: string[], onSelect: (val: string) => void, current: string }) => (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-3xl shadow-xl overflow-hidden z-20 max-h-60 overflow-y-auto"
        >
            {items.map((item) => (
                <button
                    key={item}
                    onClick={() => {
                        onSelect(item);
                        setOpenDropdown(null);
                    }}
                    className={`w-full text-left px-8 py-3 hover:bg-orange-50 transition-colors ${current === item ? 'text-orange-500 font-medium bg-orange-50/50' : 'text-gray-600'}`}
                >
                    {item}
                </button>
            ))}
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="relative h-screen w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src="/cover.jpg"
                        alt="Contact Cover"
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
                            Contact Us
                        </h1>
                        <h2 className="text-white text-2xl md:text-4xl lg:text-5xl font-light mb-6 drop-shadow-2xl tracking-wide">
                            LET'S START THE JOURNEY
                        </h2>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        <p className="text-white/90 text-sm md:text-2xl mb-8 max-w-3xl drop-shadow-lg leading-relaxed font-light px-4">
                            เราพร้อมที่จะพาคุณออกเดินทางเพื่อเก็บเกี่ยวประสบการณ์<br className="hidden md:block" />
                            และความทรงจำที่ดีที่สุดไปพร้อมกับเรา
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Booking Search Section */}
            <section className="py-16 md:py-24 px-6 md:px-8 bg-white text-black bg-white">
                <div className="max-w-4xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="text-4xl md:text-7xl font-bold mb-10 md:mb-16 text-black"
                    >
                        Booking<span className="text-orange-500">.</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="space-y-8"
                    >
                        <div className="flex flex-col md:flex-row gap-8 md:gap-12">
                            {/* Country Input */}
                            <div className="flex-1 relative">
                                <label className="block text-xl text-gray-500 mb-2 font-medium">ประเทศ</label>
                                <button
                                    onClick={() => toggleDropdown("country")}
                                    className={`w-full flex items-center justify-between border ${openDropdown === 'country' ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-400'} rounded-full px-8 py-4 bg-white hover:border-orange-500 transition-all text-xl text-gray-500`}
                                >
                                    <span className={selectedCountry ? "text-black" : ""}>{selectedCountry || "Country"}</span>
                                    <svg className={`w-6 h-6 transition-transform duration-300 ${openDropdown === 'country' ? 'rotate-90 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                </button>
                                {openDropdown === "country" && <DropdownList items={countries} onSelect={setSelectedCountry} current={selectedCountry} />}
                            </div>

                            {/* Date Inputs */}
                            <div className="flex-1">
                                <label className="block text-xl text-gray-500 mb-2 font-medium">วันที่</label>
                                <div className="flex gap-4">
                                    {/* Month */}
                                    <div className="flex-1 relative">
                                        <button
                                            onClick={() => toggleDropdown("month")}
                                            className={`w-full flex items-center justify-between border ${openDropdown === 'month' ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-400'} rounded-full px-8 py-4 bg-white hover:border-orange-500 transition-all text-xl text-gray-500`}
                                        >
                                            <span className={selectedMonth ? "text-black" : ""}>{selectedMonth || "Months"}</span>
                                            <svg className={`w-6 h-6 transition-transform duration-300 ${openDropdown === 'month' ? 'rotate-90 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </button>
                                        {openDropdown === "month" && <DropdownList items={months} onSelect={setSelectedMonth} current={selectedMonth} />}
                                    </div>

                                    {/* Year */}
                                    <div className="flex-1 relative">
                                        <button
                                            onClick={() => toggleDropdown("year")}
                                            className={`w-full flex items-center justify-between border ${openDropdown === 'year' ? 'border-orange-500 ring-2 ring-orange-100' : 'border-gray-400'} rounded-full px-8 py-4 bg-white hover:border-orange-500 transition-all text-xl text-gray-500`}
                                        >
                                            <span className={selectedYear ? "text-black" : ""}>{selectedYear || "Year"}</span>
                                            <svg className={`w-6 h-6 transition-transform duration-300 ${openDropdown === 'year' ? 'rotate-90 text-orange-500' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </button>
                                        {openDropdown === "year" && <DropdownList items={years} onSelect={setSelectedYear} current={selectedYear} />}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            className="w-full bg-orange-500 hover:bg-orange-600 text-white rounded-full py-5 text-2xl font-medium transition-colors flex items-center justify-center gap-4 mt-8 group"
                        >
                            Search
                            <svg className="w-8 h-8 group-hover:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Footer */}
            <Footer />
        </div>
    );
}
