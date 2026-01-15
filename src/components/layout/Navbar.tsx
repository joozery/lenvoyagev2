"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    const links = [
        { href: "/", label: "Home" },
        { href: "/about", label: "About Us" },
        { href: "/tours", label: "All Tours" },
        { href: "/gallery", label: "Gallery" },
        { href: "/contact", label: "Contact/Booking" },
    ];

    return (
        <nav className="relative z-50 flex items-center justify-between px-6 py-6 md:px-8">
            {/* Logo */}
            <div className="flex items-center relative z-50">
                <Link href="/" className="relative w-24 h-10 md:w-32 md:h-12">
                    <Image
                        src="/logo.png"
                        alt="Lens Voyage Logo"
                        fill
                        sizes="128px"
                        className="object-contain object-left"
                        priority
                    />
                </Link>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center gap-8 text-white text-xl lg:text-2xl">
                {links.map((link) => {
                    const isActive = pathname === link.href;
                    // Special styling for Contact button
                    if (link.href === "/contact") {
                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`px-6 py-3 rounded-full transition-colors ${isActive
                                        ? "bg-orange-600 text-white font-bold"
                                        : "bg-orange-500 hover:bg-orange-600 text-white"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        );
                    }
                    return (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`transition-colors ${isActive
                                    ? "text-orange-500 font-bold"
                                    : "hover:text-orange-400"
                                }`}
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden relative z-50">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="text-white p-2 focus:outline-none"
                    aria-label="Toggle menu"
                >
                    <div className="w-8 h-8 flex flex-col justify-center items-end gap-1.5">
                        <motion.span
                            animate={isOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                            className="w-8 h-0.5 bg-white block transition-transform"
                        />
                        <motion.span
                            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                            className="w-6 h-0.5 bg-white block transition-opacity"
                        />
                        <motion.span
                            animate={isOpen ? { rotate: -45, y: -8, width: 32 } : { rotate: 0, y: 0, width: 24 }}
                            className="h-0.5 bg-white block transition-all"
                        />
                    </div>
                </button>
            </div>

            {/* Mobile Fullscreen Menu */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: "-100%" }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: "-100%" }}
                        transition={{ duration: 0.4, ease: "easeInOut" }}
                        className="fixed inset-0 bg-black/95 backdrop-blur-md z-40 flex flex-col items-center justify-center"
                    >
                        <div className="flex flex-col items-center gap-8 text-white">
                            {links.map((link, index) => (
                                <motion.div
                                    key={link.href}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.1 + index * 0.1 }}
                                >
                                    <Link
                                        href={link.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`text-3xl font-light ${pathname === link.href ? "text-orange-500 font-bold" : "hover:text-orange-400"
                                            } ${link.href === "/contact" ? "mt-4 bg-orange-500 px-8 py-3 rounded-full font-normal" : ""}`}
                                    >
                                        {link.label}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>

                        {/* Decorative Background Element */}
                        <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-orange-900/20 to-transparent pointer-events-none" />
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
