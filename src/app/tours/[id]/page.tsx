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
                        <div className="pt-4 border-t border-gray-100">{answer}</div>
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

    // Mock data based on the design request
    const mockTripDetails = `ฤดูใบไม้เปลี่ยนสีที่งดงามที่สุดแห่งปี\nสัมผัสความมหัศจรรย์ของธรรมชาติ ใบไม้สีทอง และทะเลสาบสะท้อนฟ้า\n\nเตรียมตัวออกเดินทางสู่ ดินแดนแห่งธรรมชาติที่บริสุทธิ์ที่สุดในโลก กับทริปฤดูใบไม้ร่วงของนิวซีแลนด์ในช่วงเวลาที่สวยที่สุดของปี — ช่วงปลายเมษายนถึงต้นพฤษภาคม ที่ต้นไม้หลากหลายชนิดเปลี่ยนสีเป็นเหลือง แดง ส้ม ทอง สะท้อนบนผิวน้ำของทะเลสาบใส และตัดกับฉากหลังของเทือกเขาหิมะอย่างงดงาม`;

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
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-gray-900 mb-6">รายละเอียดทริป</h2>
                            <div className="text-gray-600 leading-relaxed whitespace-pre-line text-[15px]">
                                {mockTripDetails}
                            </div>
                        </div>

                        {/* Daily Itinerary */}
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-8 mt-12">กำหนดการเดินทางรายวัน</h2>
                            
                            {/* Day 1 Mock */}
                            {/* Day 0 Mock */}
                            <div className="relative pl-12 mb-12">
                                {/* Vertical Line Connection */}
                                <div className="absolute left-[39px] top-12 bottom-[-40px] w-0.5 bg-orange-100 z-0 hidden lg:block"></div>
                                
                                {/* Day Tag */}
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="absolute -left-12 top-0 w-10 h-10 bg-[#ff4d00] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-200">
                                        1
                                    </div>
                                    <div className="bg-orange-50 border border-orange-100 text-gray-800 font-bold px-5 py-3 rounded-lg flex-1">
                                        Day 0: Suvarnabhumi Airport ✈ Changi Airport
                                    </div>
                                </div>

                                {/* Day Content Box */}
                                <div className="bg-white rounded-[20px] p-6 lg:p-8 shadow-sm border border-gray-100 ml-0 lg:ml-2">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6">วันที่ 6 เมษายน 2569 (-- // -- // --)</h3>
                                    
                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]"><span className="font-bold text-gray-800">09.00 น.</span> พบกันที่ <span className="font-bold text-gray-800">ท่าอากาศยานนานาชาติสุวรรณภูมิ</span> พร้อมทีมงานคอยอำนวยความสะดวกในการเช็คอิน</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]"><span className="font-bold text-gray-800">12.15 น.</span> ออกเดินทางจาก <span className="font-bold text-gray-800">ท่าอากาศยานนานาชาติสุวรรณภูมิ(BKK)</span> มุ่งหน้าสู่ <span className="font-bold text-gray-800">ท่าอากาศยานชางงี(SIN)</span> โดยสายการบิน <span className="font-bold text-gray-800">Singapore Airlines</span> เที่ยวบินที่ <span className="font-bold text-gray-800">SQ707</span> (ใช้เวลาเดินทาง 2 ชั่วโมง 25 นาที)</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]"><span className="font-bold text-gray-800">15.40 น.</span> เดินทางถึง <span className="font-bold text-gray-800">ท่าอากาศยานชางงี(SIN)</span> ประเทศสิงคโปร์ เพื่อแวะต่อเครื่อง (ใช้เวลาต่อเครื่อง 4 ชั่วโมง 10 นาที )</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]"><span className="font-bold text-gray-800">19.50 น.</span> ออกเดินทางไป <span className="font-bold text-gray-800">ท่าอากาศยานนานาชาติไครสต์เชิร์ช (CHC)</span> โดยสายการบิน <span className="font-bold text-gray-800">Singapore Airlines</span> เที่ยวบินที่ <span className="font-bold text-gray-800">SQ297</span> (ใช้เวลาเดินทาง 9 ชั่วโมง 40 นาที)</p>
                                        </li>
                                    </ul>

                                    <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            รูปภาพ
                                        </div>
                                        <div className="w-48 h-32 relative rounded-lg overflow-hidden">
                                            <Image src="/69.jpg" alt="Day 0 scenery" fill className="object-cover" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Day 1 Mock */}
                            <div className="relative pl-12 mb-12">
                                {/* Vertical Line Connection */}
                                <div className="absolute left-[39px] top-12 bottom-[-40px] w-0.5 bg-orange-100 z-0 hidden lg:block"></div>
                                
                                {/* Day Tag */}
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="absolute -left-12 top-0 w-10 h-10 bg-[#ff4d00] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-200">
                                        2
                                    </div>
                                    <div className="bg-orange-50 border border-orange-100 text-gray-800 font-bold px-5 py-3 rounded-lg flex-1">
                                        Day 1: Changi Airport ✈ Christchurch &gt; Lake Takapo
                                    </div>
                                </div>

                                {/* Day Content Box */}
                                <div className="bg-white rounded-[20px] p-6 lg:p-8 shadow-sm border border-gray-100 ml-0 lg:ml-2">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6">วันที่ 7 เมษายน 2569 (-- // -- // --)</h3>
                                    
                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]"><span className="font-bold text-gray-800">09.30 น.</span> ถึง <span className="font-bold text-gray-800">ท่าอากาศยานนานาชาติไครสต์เชิร์ช(CHC)</span> ประเทศนิวซีแลนด์ ตามเวลาท้องถิ่น</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]">นำท่านผ่านด่านตรวจคนเข้าเมือง รับสัมภาระ และทีมงานจัดการเรื่องรถเช่า</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]">มุ่งหน้าสู่ <span className="font-bold text-gray-800">Lake Tekapo</span> (ใช้เวลาเดินทางประมาณ 3 ชั่วโมง)</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]">แวะร้านพาย <span className="font-bold text-gray-800">Fairly Bakery</span> (ร้านพายชื่อดัง)</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]">ถ่ายภาพแสงเย็นที่ <span className="font-bold text-gray-800">Lake Tekapo</span></p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]">รับประทานอาหารเย็น และเข้าสู่ที่พัก</p>
                                        </li>
                                    </ul>

                                    <div className="mb-8">
                                        <div className="font-bold text-gray-900 text-[16px] mb-2">ที่พัก Peppers Bluewater Resort หรือเทียบเท่า</div>
                                        <div className="text-gray-500 text-[14px]">หมายเหตุ: ที่พักเป็นลักษณะบ้านพัก 2 ห้องนอน 1 ห้องน้ำ และห้องครัว</div>
                                    </div>

                                    <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            รูปภาพ
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="w-full h-32 lg:h-40 relative rounded-lg overflow-hidden">
                                                <Image src="/placeholder-tour.jpg" alt="Lake Tekapo View 1" fill className="object-cover" />
                                            </div>
                                            <div className="w-full h-32 lg:h-40 relative rounded-lg overflow-hidden hidden sm:block">
                                                <Image src="/69.jpg" alt="Lake Tekapo View 2" fill className="object-cover" />
                                            </div>
                                            <div className="w-full h-32 lg:h-40 relative rounded-lg overflow-hidden hidden sm:block">
                                                <Image src="/placeholder-tour.jpg" alt="Lake Tekapo View 3" fill className="object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Day 2 Mock */}
                            <div className="relative pl-12">
                                {/* Day Tag */}
                                <div className="flex items-center gap-4 mb-6 relative z-10">
                                    <div className="absolute -left-12 top-0 w-10 h-10 bg-[#ff4d00] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md shadow-orange-200">
                                        3
                                    </div>
                                    <div className="bg-orange-50 border border-orange-100 text-gray-800 font-bold px-5 py-3 rounded-lg flex-1">
                                        Day 2: Lake Takapo &gt; Mt. Cook &gt; Twizel
                                    </div>
                                </div>

                                {/* Day Content Box */}
                                <div className="bg-white rounded-[20px] p-6 lg:p-8 shadow-sm border border-gray-100 ml-0 lg:ml-2">
                                    <h3 className="text-lg font-bold text-gray-900 mb-6">วันที่ 8 เมษายน 2569 (-- // -- // --)</h3>
                                    
                                    <ul className="space-y-4 mb-8">
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]">ตื่นเช้าเพื่อรับประทานอาหาร และเตรียมตัวเดินทาง</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]">เดินทางสู่ <span className="font-bold text-gray-800">Aoraki / Mount Cook National Park</span> ยอดเขาที่สูงที่สุดในนิวซีแลนด์</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]">เดินเทรลเบาๆ ที่ <span className="font-bold text-gray-800">Hooker Valley Track</span> ชมวิวภูเขาหิมะและธารน้ำแข็ง</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]">รับประทานอาหารกลางวัน (อิสระตามอัธยาศัย)</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]">แวะชมฟาร์มปลาแซลมอน <span className="font-bold text-gray-800">High Country Salmon</span> แซลมอนสีส้มสดๆ ในน้ำแร่ธารน้ำแข็ง</p>
                                        </li>
                                        <li className="flex items-start gap-3">
                                            <div className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-2 shrink-0"></div>
                                            <p className="text-gray-600 text-[15px]">เดินทางเข้าสู่ที่พักเมือง <span className="font-bold text-gray-800">Twizel</span> เมืองระหว่างทางที่เงียบสงบ</p>
                                        </li>
                                    </ul>

                                    <div className="mb-8">
                                        <div className="font-bold text-gray-900 text-[16px] mb-2">ที่พัก Mountain Chalets Motel หรือเทียบเท่า</div>
                                        <div className="text-gray-500 text-[14px]">หมายเหตุ: ที่พักสไตล์ชาเล่ต์ พร้อมสิ่งอำนวยความสะดวกครบครัน</div>
                                    </div>

                                    <div className="border border-gray-100 rounded-xl p-4 bg-gray-50/50">
                                        <div className="flex items-center gap-2 text-sm font-bold text-gray-800 mb-3">
                                            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                            รูปภาพ
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                            <div className="w-full h-32 lg:h-40 relative rounded-lg overflow-hidden">
                                                <Image src="/placeholder-tour.jpg" alt="Mt Cook View 1" fill className="object-cover" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* FAQ Section */}
                        <div className="bg-white rounded-3xl p-8 shadow-sm border border-gray-100 mt-12">
                            <h2 className="text-2xl font-bold text-gray-900 mb-8">คำถามที่พบบ่อย (FAQ)</h2>
                            <div>
                                {mockFAQs.map((faq, index) => (
                                    <FAQItem key={index} index={index} question={faq.question} answer={faq.answer} />
                                ))}
                            </div>
                        </div>
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
