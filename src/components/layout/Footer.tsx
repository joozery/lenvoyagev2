import Image from "next/image";
import Link from "next/link"; // Assuming you might validly use Link later, though currently not using it heavily in footer.
// Using <a> tags for external/social links as per existing code.

export function Footer() {
    return (
        <footer className="w-full bg-[#1a1a1a] text-white py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6 md:px-8">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 md:gap-8">
                    {/* Left Column: Contact Info */}
                    <div className="space-y-8 w-full md:w-auto">
                        <h2 className="text-4xl font-bold">
                            Contact<span className="text-orange-500">.</span>
                        </h2>

                        {/* Social Icons */}
                        <div className="flex gap-4">
                            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-orange-500 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-orange-500 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" /></svg>
                            </a>
                            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-black hover:bg-orange-500 hover:text-white transition-colors">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </a>
                        </div>

                        {/* Contact Details */}
                        <div className="space-y-4 text-gray-300">
                            <div className="flex items-start gap-3">
                                <svg className="w-6 h-6 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <p className="max-w-xs text-sm md:text-base">79/579 รามคำแหง 150 แขวง/เขตสะพานสูง กรุงเทพ 10240</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <p className="text-sm md:text-base">+66 928780919</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                                <p className="text-sm md:text-base">info@gography.com</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <svg className="w-6 h-6 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>
                                <p className="text-sm md:text-base">@gography</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column: Logo & Slogan */}
                    <div className="flex flex-col items-end text-right w-full md:w-auto">
                        <div className="relative w-40 h-14 md:w-48 md:h-16 mb-6 md:mb-8">
                            <Image
                                src="/logo.png"
                                alt="Lens Voyage Logo"
                                fill
                                sizes="192px"
                                className="object-contain object-right"
                            />
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg md:text-xl font-bold leading-relaxed">
                                การมอบช่วงเวลา<br />
                                และความทรงจำที่ดีให้กับคุณ<br />
                                คือจุดหมายของเรา
                            </h3>
                            <p className="text-xs text-gray-400 mt-4 leading-relaxed font-light">
                                Gography - ทริปถ่ายภาพที่ออกแบบโดยช่างภาพ<br />
                                เพื่อนักเดินทางตัวจริง
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
