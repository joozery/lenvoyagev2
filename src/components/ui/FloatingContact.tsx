"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

interface Settings {
    facebookUrl: string;
    lineUrl: string;
}

export const FloatingContact = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [settings, setSettings] = useState<Settings | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch("/api/settings");
                const data = await res.json();
                if (data.success) {
                    setSettings(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch settings:", error);
            }
        };
        fetchSettings();
    }, []);

    if (!settings) return null;

    return (
        <div className="fixed bottom-6 right-6 z-[999]">
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.8 }}
                        className="flex flex-col gap-4 mb-4"
                    >
                        {settings.lineUrl && (
                            <a
                                href={settings.lineUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-16 h-16 rounded-full shadow-lg hover:scale-110 transition-transform relative overflow-hidden bg-white"
                            >
                                <Image
                                    src="/LINE_logo.png"
                                    alt="Line"
                                    fill
                                    className="object-cover"
                                />
                            </a>
                        )}
                        {settings.facebookUrl && (
                            <a
                                href={settings.facebookUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-16 h-16 bg-[#1877F2] rounded-full shadow-lg flex items-center justify-center hover:scale-110 transition-transform"
                            >
                                <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-0.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                </svg>
                            </a>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-16 h-16 bg-[#ff4d00] rounded-full shadow-2xl flex items-center justify-center relative overflow-hidden group"
            >
                <div className="absolute inset-0 bg-white/10 group-hover:bg-transparent transition-colors" />
                {isOpen ? (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                ) : (
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                )}
            </motion.button>
        </div>
    );
};
