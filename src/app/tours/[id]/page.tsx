"use client";
import { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

interface Tour {
    _id: string;
    name: string;
    location: string;
    price: number;
    duration: string;
    tourDate: string;
    startDate?: string;
    endDate?: string;
    seatsAvailable: number;
    status: string;
    image: {
        url: string;
    };
    pdf?: {
        url: string;
        publicId?: string;
    };
    tripDetails?: string;
    dailyItinerary?: string;
    faqs?: string;
}

const FAQItem = ({ question, answer, index }: { question: string, answer: string, index: number }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="border border-gray-200 rounded-2xl overflow-hidden mb-4 bg-white transition-shadow duration-300 hover:shadow-md">
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-orange-50/30 transition-colors"
            >
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-[#ff4d00] text-white flex items-center justify-center font-bold shrink-0 shadow-sm shadow-orange-200">
                        {index + 1}
                    </div>
                    <span className="font-bold text-gray-900 text-[16px]">{question}</span>
                </div>
                <div className={`text-gray-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </div>
            </button>
            <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className="overflow-hidden">
                    <div className="p-5 pt-0 text-gray-600 text-[15px] leading-relaxed">
                        <div className="pt-4 border-t border-gray-100 whitespace-pre-line">{answer}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mockFAQs = [
    { question: "เงื่อนไขอัตราบริการ", answer: "อัตรานี้รวมค่าตั๋วเครื่องบินเดินทางไปกลับ ค่าที่พัก ค่าอาหาร และค่าเข้าชมสถานที่ตามที่ระบุในโปรแกรม (หากมีการเปลี่ยนแปลงจะแจ้งให้ทราบล่วงหน้า)" },
    { question: "เงื่อนไขนอกการรับผิดชอบ", answer: "บริษัทขอสงวนสิทธิ์ไม่รับผิดชอบค่าใช้จ่ายที่เกิดจากเหตุสุดวิสัย เช่น ภัยธรรมชาติ การยกเลิกเที่ยวบิน หรือเหตุการณ์ทางการเมือง" },
    { question: "เที่ยวบินการเดินทาง 6-15 เม.ย.", answer: "เที่ยวบินขาไป: SQ707 ออกเดินทาง 12.15 น. / เที่ยวบินขากลับ: SQ298 ออกเดินทางเวลา 10.50 น. (เวลาท้องถิ่น)" },
    { question: "สัมภาระการเดินทาง", answer: "สัมภาระโหลดใต้ท้องเครื่อง 1 ใบ น้ำหนักไม่เกิน 25 กิโลกรัม และสัมภาระถือขึ้นเครื่อง 1 ใบ น้ำหนักไม่เกิน 7 กิโลกรัม" },
    { question: "สภาพอากาศโดยเฉลี่ย", answer: "อุณหภูมิเฉลี่ยในช่วงการเดินทางอยู่ที่ 10-15 องศาเซลเซียส แนะนำให้เตรียมเสื้อกันหนาว อุปกรณ์กันแดด และรองเท้าที่สวมใส่สบาย" },
];

export default function TourDetail({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const tourId = resolvedParams.id;
    const [tour, setTour] = useState<Tour | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTour = async () => {
            try {
                // Decode first in case it was somehow encoded in params, then encode it once cleanly for the fetch URL
                const safeName = encodeURIComponent(decodeURIComponent(tourId));
                const res = await fetch(`/api/tours/${safeName}`);
                const data = await res.json();
                if (data.success) {
                    setTour(data.data);
                }
            } catch (error) {
                console.error("Failed to fetch tour:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (tourId) {
            fetchTour();
        }
    }, [tourId]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-gray-500">กำลังโหลดข้อมูล...</div>
            </div>
        );
    }

    if (!tour) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50">
                <div className="text-gray-500 mb-4">ไม่พบข้อมูลทัวร์</div>
                <Link href="/tours">
                    <button className="text-[#ff4d00] underline">กลับไปหน้ารวมทัวร์</button>
                </Link>
            </div>
        );
    }

    // Try parsing daily itinerary and safely rendering HTML
    let itineraryItems: any[] = [];
    try {
        if (tour.dailyItinerary) {
            itineraryItems = JSON.parse(tour.dailyItinerary);
        }
    } catch (e) {
        console.error("Failed to parse daily itinerary", e);
    }

    let faqItems: any[] = [];
    try {
        if (tour.faqs) {
            faqItems = JSON.parse(tour.faqs);
        }
    } catch (e) {
        console.error("Failed to parse FAQs", e);
    }

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] w-full overflow-hidden">
                {/* Background Image */}
                <div className="absolute inset-0">
                    <Image
                        src={tour.image?.url || "/placeholder-tour.jpg"}
                        alt={tour.name}
                        fill
                        className="object-cover object-center"
                        priority
                    />
                    {/* Top gradient only for Navbar readability */}
                    <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black/70 to-transparent" />
                </div>

                {/* Navigation */}
                <Navbar />
            </section>
            
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Left Column - Main Content */}
                    <div className="lg:w-2/3 space-y-8">

                        {/* Trip Details Card */}
                        {(tour.tripDetails && tour.tripDetails !== '<p></p>') && (
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                <h2 className="text-2xl font-bold text-gray-900 mb-6">รายละเอียดทริป</h2>
                                {tour.tripDetails.includes('<p>') || tour.tripDetails.includes('<h1>') || tour.tripDetails.includes('<ul>') ? (
                                    <div 
                                        className="text-gray-600 leading-relaxed text-[15px] prose prose-sm max-w-none"
                                        dangerouslySetInnerHTML={{ __html: tour.tripDetails }}
                                    />
                                ) : (
                                    <div className="text-gray-600 leading-relaxed whitespace-pre-line text-[15px]">
                                        {tour.tripDetails}
                                    </div>
                                )}
                            </div>
                        )}

                        {/* Daily Itinerary */}
                        {itineraryItems.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-8 mt-12">กำหนดการเดินทางรายวัน</h2>
                                
                                {itineraryItems.map((item: any, index: number) => (
                                    <div key={index} className="relative pl-0 lg:pl-12 mb-12">
                                        {/* Vertical Line Connection */}
                                        {index !== itineraryItems.length - 1 && (
                                            <div className="absolute left-[39px] top-12 bottom-[-40px] w-0.5 bg-orange-100 z-0 hidden lg:block"></div>
                                        )}
                                        
                                        {/* Day Tag */}
                                        <div className="flex items-center gap-4 mb-6 relative z-10 pl-6 lg:pl-0">
                                            <div className="absolute left-0 lg:-left-12 top-1 lg:top-0 w-10 h-10 bg-[#ff4d00] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-200">
                                                {item.day}
                                            </div>
                                            <div className="bg-orange-50 border border-orange-100 text-gray-800 font-bold px-5 py-3 rounded-lg flex-1 ml-6 lg:ml-0">
                                                {item.title || `วันที่ ${item.day}`}
                                            </div>
                                        </div>

                                        {/* Day Content Box */}
                                        <div className="bg-white rounded-[20px] p-6 lg:p-8 shadow-sm border border-gray-100 ml-0 lg:ml-2">
                                            {/* We can safely render HTML content for details */}
                                            {item.details && (
                                                <div 
                                                    className="mb-8 text-gray-600 prose prose-sm max-w-none"
                                                    dangerouslySetInnerHTML={{ __html: item.details }}
                                                />
                                            )}

                                            {/* Images for this day if any */}
                                            {item.images && item.images.length > 0 && (
                                                <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50 mt-6">
                                                    <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                                        <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                        รูปภาพ
                                                    </div>
                                                    <div className={`grid ${item.images.length === 1 ? 'grid-cols-1' : item.images.length === 2 ? 'grid-cols-2' : 'grid-cols-1 sm:grid-cols-3'} gap-4`}>
                                                        {item.images.map((img: any, imgIdx: number) => (
                                                            <div key={imgIdx} className="w-full h-40 lg:h-48 relative rounded-lg overflow-hidden">
                                                                <Image src={img.url} alt={`Day ${item.day} image ${imgIdx + 1}`} fill className="object-cover" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* FAQ Section */}
                        {faqItems.length > 0 && (
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-12">
                                <h2 className="text-2xl font-bold text-gray-900 mb-8">คำถามที่พบบ่อย (FAQ)</h2>
                                <div>
                                    {faqItems.map((faq: any, index: number) => (
                                        <FAQItem key={index} index={index} question={faq.question} answer={faq.answer} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sticky Sidebar */}
                    <div className="lg:w-1/3">
                        <div className="sticky top-28 space-y-6">
                            {/* Booking Card */}
                            <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                                {/* Price */}
                                <div className="mb-6">
                                    <div className="text-gray-500 text-sm font-medium mb-1">ราคาเริ่มต้น</div>
                                    <div className="text-[#ff4d00] font-bold text-4xl mb-1">฿{tour.price.toLocaleString()}</div>
                                    <div className="text-gray-500 text-sm">ต่อท่าน</div>
                                </div>

                                <hr className="border-gray-100 my-6" />

                                {/* Departure Select */}
                                <div className="mb-6">
                                    <h3 className="text-[15px] font-bold text-gray-900 mb-3">เลือกรอบเดินทาง</h3>
                                    <button className="w-full border-2 border-orange-500 rounded-xl p-4 flex flex-col items-start bg-orange-50/30 ring-1 ring-orange-500/20 text-left transition-colors cursor-pointer hover:bg-orange-50 relative">
                                        <div className="font-bold text-gray-900 text-[15px] mb-1">{tour.tourDate}</div>
                                        <div className="text-gray-500 text-sm">{tour.duration}</div>
                                        <div className="absolute top-4 right-4 bg-orange-100 text-orange-600 text-xs font-bold px-3 py-1 rounded-full">
                                            รับ {tour.seatsAvailable} ท่าน
                                        </div>
                                    </button>
                                </div>

                                {/* Selected Info */}
                                <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-5 mb-8">
                                    <h4 className="text-[13px] font-bold text-gray-700 mb-4">รายละเอียดรอบที่เลือก</h4>
                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            <span className="text-sm font-bold text-gray-800">{tour.tourDate}</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                                            <span className="text-sm font-bold text-gray-800">{tour.duration}</span>
                                        </div>
                                        <div className="flex items-start gap-3">
                                            <svg className="w-4 h-4 text-blue-500 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                            <span className="text-sm font-bold text-gray-800">รับ {tour.seatsAvailable} ท่าน</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    <Link href="/contact" className="block w-full">
                                        <button className="w-full bg-[#ff4d00] hover:bg-[#e64500] text-white py-3.5 rounded-xl transition-colors duration-300 font-bold text-[15px]">
                                            สอบถาม/จองทริป
                                        </button>
                                    </Link>
                                    <button className="w-full bg-white hover:bg-gray-50 text-gray-800 border border-gray-200 py-3.5 rounded-xl transition-colors duration-300 font-bold text-[15px]">
                                        แชร์ทริปนี้
                                    </button>
                                    {tour.pdf?.url && (
                                        <a
                                            href={`/api/view-pdf?url=${encodeURIComponent(tour.pdf.url)}${tour.pdf?.publicId ? `&publicId=${encodeURIComponent(tour.pdf.publicId)}` : ''}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block w-full"
                                        >
                                            <button className="w-full bg-white hover:bg-orange-50 text-[#ff4d00] border-2 border-[#ff4d00] py-3.5 rounded-xl transition-colors duration-300 font-bold text-[15px]">
                                                ดูโปรแกรม (PDF)
                                            </button>
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            <Footer />
        </div>
    );
}
