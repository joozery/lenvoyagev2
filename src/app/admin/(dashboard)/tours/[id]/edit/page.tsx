"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Plus, ArrowLeft, Image as ImageIcon, FileText, X, Pencil } from "lucide-react"
import { toursAPI, uploadAPI, Tour } from "@/services/api"
import { ItineraryDayModal, ItineraryItemData } from "@/components/admin/ItineraryDayModal"
import { RichTextEditor } from "@/components/ui/rich-text-editor"
import Link from "next/link"

const thMonthsShort = ['ม.ค.', 'ก.พ.', 'มี.ค.', 'เม.ย.', 'พ.ค.', 'มิ.ย.', 'ก.ค.', 'ส.ค.', 'ก.ย.', 'ต.ค.', 'พ.ย.', 'ธ.ค.'];

const formatDateRangeThai = (start: string, end: string) => {
    if (!start || !end) return "";
    const startDate = new Date(start);
    const endDate = new Date(end);

    const startDay = startDate.getDate();
    const startMonth = thMonthsShort[startDate.getMonth()];

    const endDay = endDate.getDate();
    const endMonth = thMonthsShort[endDate.getMonth()];

    if (startMonth === endMonth) {
        return `${startDay}-${endDay} ${startMonth}`;
    } else {
        return `${startDay} ${startMonth} - ${endDay} ${endMonth}`;
    }
}

export default function EditTourPage({ params }: { params: Promise<{ id: string }> }) {
    const router = useRouter()
    const resolvedParams = use(params);
    const tourId = resolvedParams.id;
    
    const [isSaving, setIsSaving] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const [editTour, setEditTour] = useState({
        name: "",
        location: "",
        price: "",
        duration: "",
        tourDate: "",
        startDate: "",
        endDate: "",
        seatsAvailable: "",
        status: "ร่าง",
        // Detailed fields
        tripDetails: "",
        faq: "",
        // Files
        imageFile: null as File | null,
        pdfFile: null as File | null,
        imagePreview: "",
        pdfPreview: "",
        originalImagePublicId: "",
        originalPdfPublicId: ""
    })

    interface ItineraryImage {
        url?: string;
        publicId?: string;
        file?: File;
        preview?: string;
    }

    interface ItineraryItem {
        day: number;
        title: string;
        details: string;
        images?: ItineraryImage[];
    }

    interface FAQItem {
        question: string;
        answer: string;
    }

    const [dailyItineraryItems, setDailyItineraryItems] = useState<ItineraryItem[]>([{ day: 1, title: "", details: "" }])
    const [faqItems, setFaqItems] = useState<FAQItem[]>([])

    const [isItineraryModalOpen, setIsItineraryModalOpen] = useState(false);
    const [editingItineraryDayIndex, setEditingItineraryDayIndex] = useState<number | null>(null);

    const openAddItineraryModal = () => {
        setEditingItineraryDayIndex(null);
        setIsItineraryModalOpen(true);
    };

    const openEditItineraryModal = (index: number) => {
        setEditingItineraryDayIndex(index);
        setIsItineraryModalOpen(true);
    };

    const handleSaveItineraryModal = (data: ItineraryItemData) => {
        if (editingItineraryDayIndex !== null) {
            const newItems = [...dailyItineraryItems];
            newItems[editingItineraryDayIndex] = {
                ...newItems[editingItineraryDayIndex],
                day: data.day,
                title: data.title,
                details: data.details
            };
            setDailyItineraryItems(newItems);
        } else {
            setDailyItineraryItems([...dailyItineraryItems, {
                day: data.day,
                title: data.title,
                details: data.details,
                images: []
            }]);
        }
        setIsItineraryModalOpen(false);
    };

    const handleAddItineraryDay = () => {
        openAddItineraryModal();
    }

    const handleRemoveItineraryDay = (indexToRemove: number) => {
        if (dailyItineraryItems.length <= 1) return;
        
        const newItems = dailyItineraryItems.filter((_, index) => index !== indexToRemove)
        // Re-index days
        const reindexedItems = newItems.map((item, index) => ({
            ...item,
            day: index + 1
        }))
        setDailyItineraryItems(reindexedItems)
    }

    const handleAddFAQ = () => {
        setFaqItems([...faqItems, { question: "", answer: "" }]);
    };

    const handleRemoveFAQ = (indexToRemove: number) => {
        setFaqItems(faqItems.filter((_, index) => index !== indexToRemove));
    };

    const handleFAQChange = (index: number, field: 'question' | 'answer', value: string) => {
        const newItems = [...faqItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setFaqItems(newItems);
    };

    const generateItineraryDays = (start: string, end: string) => {
        if (!start || !end) return;
        const startDate = new Date(start);
        const endDate = new Date(end);
        
        // Calculate diff in days
        const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include both start and end days
        
        if (diffDays > 0 && diffDays <= 30) { // Limit to 30 days max to prevent huge arrays
            const newItems = Array.from({ length: diffDays }, (_, i) => {
                // Try to keep existing titles/details if possible
                const existing = dailyItineraryItems[i];
                return {
                    day: i + 1,
                    title: existing?.title || "",
                    details: existing?.details || ""
                };
            });
            setDailyItineraryItems(newItems);
        }
    }

    const handleAddItineraryImage = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files || files.length === 0) return;
        
        const newItems = [...dailyItineraryItems];
        if (!newItems[index].images) {
            newItems[index].images = [];
        }

        // Add all selected files
        Array.from(files).forEach((file) => {
            newItems[index].images!.push({
                file,
                preview: URL.createObjectURL(file)
            });
        });
        
        setDailyItineraryItems(newItems);
        // Reset file input
        e.target.value = '';
    }

    const handleRemoveItineraryImage = (dayIndex: number, imgIndex: number) => {
        const newItems = [...dailyItineraryItems];
        if (newItems[dayIndex].images) {
            const img = newItems[dayIndex].images![imgIndex];
            if (img.preview) {
                URL.revokeObjectURL(img.preview);
            }
            newItems[dayIndex].images!.splice(imgIndex, 1);
            setDailyItineraryItems(newItems);
        }
    }

    useEffect(() => {
        const fetchTour = async () => {
            try {
                // Decode just in case
                const res = await fetch(`/api/tours/${encodeURIComponent(decodeURIComponent(tourId))}`);
                const data = await res.json();
                if (data.success && data.data) {
                    const tour = data.data;
                    setEditTour({
                        ...editTour,
                        name: tour.name,
                        location: tour.location,
                        price: tour.price?.toString() || "",
                        duration: tour.duration,
                        tourDate: tour.tourDate,
                        startDate: tour.startDate ? new Date(tour.startDate).toISOString().split('T')[0] : "",
                        endDate: tour.endDate ? new Date(tour.endDate).toISOString().split('T')[0] : "",
                        seatsAvailable: tour.seatsAvailable?.toString() || "",
                        status: tour.status || "ร่าง",
                        imagePreview: tour.image?.url || "",
                        pdfPreview: tour.pdf?.url || "",
                        originalImagePublicId: tour.image?.publicId || "",
                        originalPdfPublicId: tour.pdf?.publicId || "",
                        tripDetails: tour.tripDetails || "",
                    });
                    
                    if (tour.dailyItinerary) {
                        try {
                            const parsedItems = JSON.parse(tour.dailyItinerary);
                            if (Array.isArray(parsedItems) && parsedItems.length > 0) {
                                setDailyItineraryItems(parsedItems);
                            }
                        } catch (e) {
                            console.error("Failed to parse dailyItinerary", e);
                        }
                    }

                    if (tour.faqs) {
                        try {
                            const parsedFaqs = JSON.parse(tour.faqs);
                            if (Array.isArray(parsedFaqs)) {
                                setFaqItems(parsedFaqs);
                            }
                        } catch (e) {
                            console.error("Failed to parse faqs", e);
                        }
                    }
                } else {
                    setError("ไม่พบทัวร์นี้");
                }
            } catch (err: any) {
                console.error("Failed to fetch tour:", err);
                setError("ดึงข้อมูลทัวร์ไม่สำเร็จ");
            } finally {
                setIsLoading(false);
            }
        };

        if (tourId) {
            fetchTour();
        }
    }, [tourId]);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setEditTour({
                ...editTour,
                imageFile: file,
                imagePreview: URL.createObjectURL(file)
            })
            setError("")
        }
    }

    const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setEditTour({ ...editTour, pdfFile: file })
            setError("")
        }
    }

    const clearImage = () => {
        setEditTour({ ...editTour, imageFile: null, imagePreview: "" })
    }

    const clearPdf = () => {
        setEditTour({ ...editTour, pdfFile: null, pdfPreview: "" })
    }

    const handleSaveTour = async () => {
        if (!editTour.name || !editTour.price || (!editTour.imageFile && !editTour.imagePreview)) {
            setError("กรุณากรอกข้อมูลให้ครบถ้วนและต้องมีรูปภาพ")
            return
        }

        setIsSaving(true)
        setError("")

        try {
            // Upload image to Cloudinary if new file selected
            let imageData = null
            if (editTour.imageFile) {
                imageData = await uploadAPI.uploadFile(editTour.imageFile, 'image')
            }

            // Upload PDF if new selected
            let pdfData = null
            if (editTour.pdfFile) {
                pdfData = await uploadAPI.uploadFile(editTour.pdfFile, 'pdf')
            }

            const tourData: Partial<Tour> = {
                name: editTour.name,
                location: editTour.location,
                price: Number(editTour.price),
                duration: editTour.duration,
                tourDate: editTour.tourDate || formatDateRangeThai(editTour.startDate, editTour.endDate),
                startDate: editTour.startDate ? new Date(editTour.startDate) : undefined as any,
                endDate: editTour.endDate ? new Date(editTour.endDate) : undefined as any,
                seatsAvailable: Number(editTour.seatsAvailable) || 0,
                status: editTour.status as any,
                tripDetails: editTour.tripDetails,
            }

            // Upload daily itinerary images and format
            const processedItineraryItems = await Promise.all(
                dailyItineraryItems.map(async (item) => {
                    const uploadedImages = [];
                    if (item.images && item.images.length > 0) {
                        for (const img of item.images) {
                            if (img.file) {
                                const uploadRes = await uploadAPI.uploadFile(img.file, 'image');
                                uploadedImages.push({
                                    url: uploadRes.url,
                                    publicId: uploadRes.publicId
                                });
                            } else if (img.url && img.publicId) {
                                uploadedImages.push({
                                    url: img.url,
                                    publicId: img.publicId
                                });
                            }
                        }
                    }
                    return {
                        day: item.day,
                        title: item.title,
                        details: item.details,
                        images: uploadedImages
                    };
                })
            );

            tourData.dailyItinerary = JSON.stringify(processedItineraryItems.filter(item => item.title || item.details || (item.images && item.images.length > 0)));
            tourData.faqs = JSON.stringify(faqItems.filter(item => item.question && item.answer));

            if (imageData) {
                tourData.image = {
                    url: imageData.url,
                    publicId: imageData.publicId
                }
            }

            if (pdfData) {
                tourData.pdf = {
                    url: pdfData.url,
                    publicId: pdfData.publicId
                }
            } else if (!editTour.pdfFile && !editTour.pdfPreview && editTour.originalPdfPublicId) {
                // User removed PDF - backend handling needs actual DB field null support, currently ignoring
                // Actually they don't have a way to just set to null in current API. 
            }

            await toursAPI.update(tourId, tourData)
            router.push("/admin/tours")
        } catch (err: any) {
            console.error("Failed to save tour:", err)
            setError(err.response?.data?.error || "ไม่สามารถอัปเดตข้อมูลทัวร์ได้")
            setIsSaving(false)
        }
    }

    if (isLoading) {
        return <div className="p-10 text-center text-zinc-500">กำลังโหลด...</div>;
    }

    return (
        <div className="space-y-8 max-w-5xl mx-auto pb-12">
            <div className="flex items-center gap-4">
                <Link href="/admin/tours">
                    <Button variant="outline" size="icon" className="h-10 w-10 min-w-10 rounded-full">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">แก้ไขทัวร์</h2>
                    <p className="text-zinc-500">อัปเดตรายละเอียดแพ็คเกจทัวร์: {editTour.name}</p>
                </div>
            </div>

            {error && (
                <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-medium">
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Main Content Form */}
                <div className="lg:col-span-2 space-y-8">
                    <Card className="border-zinc-200 shadow-sm overflow-hidden">
                        <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200">
                            <h3 className="text-lg font-bold text-zinc-900">1. ข้อมูลพื้นฐาน (Basic Info)</h3>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">ชื่อทัวร์ *</label>
                                <Input
                                    value={editTour.name}
                                    onChange={(e) => setEditTour({ ...editTour, name: e.target.value })}
                                    placeholder="เช่น ล่าแสงเหนือที่นอร์เวย์"
                                    className="h-12 text-lg"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">สถานที่ *</label>
                                    <Input
                                        value={editTour.location}
                                        onChange={(e) => setEditTour({ ...editTour, location: e.target.value })}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">ระยะเวลา *</label>
                                    <Input
                                        value={editTour.duration}
                                        onChange={(e) => setEditTour({ ...editTour, duration: e.target.value })}
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">วันไป *</label>
                                    <Input
                                        type="date"
                                        value={editTour.startDate}
                                        onChange={(e) => {
                                            const start = e.target.value;
                                            setEditTour({
                                                ...editTour,
                                                startDate: start,
                                                tourDate: formatDateRangeThai(start, editTour.endDate)
                                            });
                                            if (editTour.endDate) {
                                                generateItineraryDays(start, editTour.endDate);
                                            }
                                        }}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">วันกลับ *</label>
                                    <Input
                                        type="date"
                                        value={editTour.endDate}
                                        onChange={(e) => {
                                            const end = e.target.value;
                                            setEditTour({
                                                ...editTour,
                                                endDate: end,
                                                tourDate: formatDateRangeThai(editTour.startDate, end)
                                            });
                                            if (editTour.startDate) {
                                                generateItineraryDays(editTour.startDate, end);
                                            }
                                        }}
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">สรุปวันที่ (Auto หรือกรอกเองได้) *</label>
                                <Input
                                    value={editTour.tourDate}
                                    onChange={(e) => setEditTour({ ...editTour, tourDate: e.target.value })}
                                    className="h-11"
                                />
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-zinc-200 shadow-sm overflow-hidden">
                        <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200">
                            <h3 className="text-lg font-bold text-zinc-900">2. รายละเอียดเชิงลึก (Tour Details)</h3>
                        </div>
                        <CardContent className="p-0">
                            <Tabs defaultValue="details" className="w-full">
                                <div className="px-6 pt-4 border-b border-zinc-100">
                                    <TabsList className="bg-zinc-100/50 p-1">
                                        <TabsTrigger value="details" className="data-[state=active]:bg-white">รายละเอียดโดยรวม</TabsTrigger>
                                        <TabsTrigger value="itinerary" className="data-[state=active]:bg-white">กำหนดการเดินทางรายวัน</TabsTrigger>
                                        <TabsTrigger value="faq" className="data-[state=active]:bg-white">คำถามที่พบบ่อย (FAQ)</TabsTrigger>
                                    </TabsList>
                                </div>
                                
                                <TabsContent value="details" className="p-6 m-0 border-none focus-visible:ring-0">
                                    <div className="space-y-4">
                                        <label className="text-sm font-medium text-zinc-700">รายละเอียดทริปโดยรวม (คำโฆษณา / ไฮไลท์)</label>
                                        <RichTextEditor
                                            content={editTour.tripDetails}
                                            onChange={(content) => setEditTour({ ...editTour, tripDetails: content })}
                                            placeholder="เขียนแนะนำทริปนี้..."
                                        />
                                    </div>
                                </TabsContent>
                                
                                <TabsContent value="itinerary" className="p-6 m-0 border-none focus-visible:ring-0">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-medium text-zinc-700">กำหนดการเดินทางรายวัน</h4>
                                                <p className="text-xs text-zinc-500">สร้างและแก้ไขกำหนดการเดินทางแต่ละวัน (วันที่จะสร้างให้อัตโนมัติตามช่วงวันที่เลือกด้านบน)</p>
                                            </div>
                                            <Button type="button" variant="outline" size="sm" onClick={handleAddItineraryDay} className="h-8 gap-1.5 text-orange-600 border-orange-200 hover:bg-orange-50">
                                                <Plus className="h-3.5 w-3.5" /> เพิ่มวัน
                                            </Button>
                                        </div>
                                        
                                        <div className="space-y-4">
                                            {dailyItineraryItems.map((item, index) => (
                                                <div key={`day-${index}`} className="p-4 border border-zinc-200 rounded-xl bg-white space-y-4 relative group">
                                                    <div className="absolute top-3 right-3 flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                                                        <button 
                                                            type="button" 
                                                            onClick={() => openEditItineraryModal(index)}
                                                            className="p-1.5 text-zinc-400 hover:text-orange-500 rounded-lg hover:bg-orange-50 transition-colors"
                                                            title="แก้ไขวันเดินทาง"
                                                        >
                                                            <Pencil className="w-4 h-4" />
                                                        </button>
                                                        {dailyItineraryItems.length > 1 && (
                                                            <button 
                                                                type="button" 
                                                                onClick={() => handleRemoveItineraryDay(index)}
                                                                className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                                                title="ลบวันเดินทาง"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        )}
                                                    </div>
                                                    
                                                    <div className="flex items-center gap-3 border-b border-zinc-100 pb-3 pr-16">
                                                        <div className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-lg text-sm shrink-0">
                                                            Day {item.day}
                                                        </div>
                                                        <div className="font-medium text-zinc-900 truncate">
                                                            {item.title || "ไม่ได้ระบุชื่อวัน"}
                                                        </div>
                                                    </div>
                                                    
                                                    <div 
                                                        className="min-h-[60px] text-sm text-zinc-600 prose prose-sm max-w-none"
                                                        dangerouslySetInnerHTML={{ __html: item.details || "<p class='text-zinc-400 italic'>ไม่มีรายละเอียด</p>" }}
                                                    />
                                                    
                                                    <div className="pt-2">
                                                        <div className="flex flex-wrap gap-2 mb-2">
                                                            {item.images && item.images.map((img, imgIndex) => (
                                                                <div key={imgIndex} className="relative w-20 h-20 rounded-md overflow-hidden border border-zinc-200 group/img">
                                                                    <img src={img.preview || img.url} alt={`Day ${item.day} image`} className="w-full h-full object-cover" />
                                                                    <button
                                                                        type="button"
                                                                        onClick={() => handleRemoveItineraryImage(index, imgIndex)}
                                                                        className="absolute inset-0 bg-black/50 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-opacity"
                                                                    >
                                                                        <X className="w-4 h-4 text-white" />
                                                                    </button>
                                                                </div>
                                                            ))}
                                                            <label className="w-20 h-20 rounded-md border border-dashed border-zinc-300 flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:text-orange-500 hover:border-orange-300 cursor-pointer transition-colors bg-white">
                                                                <input 
                                                                    type="file" 
                                                                    accept="image/*" 
                                                                    multiple
                                                                    className="hidden" 
                                                                    onChange={(e) => handleAddItineraryImage(index, e)}
                                                                />
                                                                <Plus className="w-5 h-5 mb-1" />
                                                                <span className="text-[10px] font-medium">เพิ่มรูป</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="faq" className="p-6 m-0 border-none focus-visible:ring-0">
                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div className="space-y-1">
                                                <h4 className="text-sm font-medium text-zinc-700">คำถามที่พบบ่อย (FAQ)</h4>
                                                <p className="text-xs text-zinc-500">เพิ่มรายละเอียดคำถามและคำตอบสำหรับลูกค้าในหน้ารายละเอียดทริป</p>
                                            </div>
                                            <Button type="button" variant="outline" size="sm" onClick={handleAddFAQ} className="h-8 gap-1.5 text-orange-600 border-orange-200 hover:bg-orange-50">
                                                <Plus className="h-3.5 w-3.5" /> เพิ่มคำถาม
                                            </Button>
                                        </div>

                                        <div className="space-y-4">
                                            {faqItems.length === 0 ? (
                                                <div className="text-center py-8 border border-dashed border-zinc-200 rounded-xl">
                                                    <p className="text-zinc-400 text-sm">ยังไม่มีรายการคำถาม</p>
                                                </div>
                                            ) : (
                                                faqItems.map((item, index) => (
                                                    <div key={`faq-${index}`} className="p-4 border border-zinc-200 rounded-xl bg-white space-y-3 relative group">
                                                        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                                                            <button
                                                                type="button"
                                                                onClick={() => handleRemoveFAQ(index)}
                                                                className="p-1.5 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"
                                                                title="ลบรายการ"
                                                            >
                                                                <X className="w-4 h-4" />
                                                            </button>
                                                        </div>

                                                        <div className="space-y-2 pr-8">
                                                            <label className="text-xs font-bold text-zinc-600">คำถามที่ {index + 1}</label>
                                                            <Input
                                                                value={item.question}
                                                                onChange={(e) => handleFAQChange(index, 'question', e.target.value)}
                                                                placeholder="เช่น อัตรานี้รวมตั๋วเครื่องบินไหม?"
                                                                className="h-10 font-bold text-zinc-800"
                                                            />
                                                        </div>

                                                        <div className="space-y-2">
                                                            <label className="text-xs font-bold text-zinc-600">คำตอบ</label>
                                                            <Textarea
                                                                value={item.answer}
                                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleFAQChange(index, 'answer', e.target.value)}
                                                                placeholder="เขียนรายละเอียดคำตอบ..."
                                                                className="min-h-[80px] resize-y text-sm"
                                                            />
                                                        </div>
                                                    </div>
                                                )))
                                            }
                                        </div>
                                    </div>
                                </TabsContent>
                            </Tabs>
                        </CardContent>
                    </Card>
                </div>

                {/* Right Column - Sidebar Form */}
                <div className="space-y-8">
                    <Card className="border-zinc-200 shadow-sm overflow-hidden sticky top-6">
                        <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200">
                            <h3 className="text-lg font-bold text-zinc-900">ข้อมูลการขาย (Sales & Media)</h3>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">ราคาต่อท่าน (฿) *</label>
                                <Input
                                    type="number"
                                    value={editTour.price}
                                    onChange={(e) => setEditTour({ ...editTour, price: e.target.value })}
                                    className="h-12 text-xl font-bold text-orange-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">จำนวนที่นั่งรับ (ท่าน) *</label>
                                <Input
                                    type="number"
                                    value={editTour.seatsAvailable}
                                    onChange={(e) => setEditTour({ ...editTour, seatsAvailable: e.target.value })}
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">สถานะ *</label>
                                <select
                                    value={editTour.status}
                                    onChange={(e) => setEditTour({ ...editTour, status: e.target.value })}
                                    className="flex h-11 w-full rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
                                >
                                    <option value="ร่าง">ร่าง (Draft)</option>
                                    <option value="เปิดขาย">เปิดขาย (Open)</option>
                                    <option value="เร็วๆนี้">เร็วๆนี้ (Coming Soon)</option>
                                    <option value="เต็มแล้ว">เต็มแล้ว (Sold Out)</option>
                                </select>
                            </div>

                            <div className="pt-4 border-t border-zinc-100">
                                <label className="text-sm font-medium text-zinc-700 block mb-2">รูปภาพหน้าปก *</label>
                                {!editTour.imagePreview ? (
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-colors group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <ImageIcon className="w-8 h-8 text-zinc-400 mb-2 group-hover:text-orange-500 transition-colors" />
                                            <span className="text-sm text-zinc-600">คลิกเพื่ออัพโหลดรูปภาพ</span>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                ) : (
                                    <div className="relative rounded-xl overflow-hidden border-2 border-zinc-200 h-40">
                                        <img src={editTour.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button onClick={clearImage} className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors shadow-md">
                                            <X className="w-4 h-4" />
                                        </button>
                                        {editTour.imageFile && (
                                            <div className="absolute bottom-0 left-0 right-0 bg-orange-500/90 text-white text-xs text-center py-1">
                                                (ไฟล์ใหม่)
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-zinc-100">
                                <label className="text-sm font-medium text-zinc-700 block mb-2">ไฟล์ PDF โปรแกรมเต็ม</label>
                                {!editTour.pdfFile && !editTour.pdfPreview ? (
                                    <label className="flex flex-col items-center justify-center w-full h-24 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-colors group">
                                        <div className="flex flex-col items-center justify-center">
                                            <FileText className="w-6 h-6 text-zinc-400 mb-1 group-hover:text-orange-500" />
                                            <span className="text-xs text-zinc-600">อัพโหลด PDF</span>
                                        </div>
                                        <input type="file" className="hidden" accept=".pdf" onChange={handlePdfUpload} />
                                    </label>
                                ) : (
                                    <div className="flex items-center justify-between p-3 bg-zinc-100 rounded-xl border border-zinc-200">
                                        <div className="flex items-center gap-2 overflow-hidden">
                                            <FileText className="w-5 h-5 text-red-500 flex-shrink-0" />
                                            <div className="flex flex-col">
                                                <span className="text-sm text-zinc-700 truncate max-w-[120px]">
                                                    {editTour.pdfFile ? editTour.pdfFile.name : "ไฟล์ PDF เดิม"}
                                                </span>
                                                {editTour.pdfPreview && !editTour.pdfFile && (
                                                    <a
                                                        href={`/api/view-pdf?url=${encodeURIComponent(editTour.pdfPreview)}&publicId=${encodeURIComponent(editTour.originalPdfPublicId)}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-[10px] text-blue-600 hover:underline"
                                                    >
                                                        เปิดดู
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <button onClick={clearPdf} className="p-1.5 hover:bg-zinc-200 rounded-full transition-colors flex-shrink-0">
                                            <X className="w-4 h-4 text-zinc-500" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <Button 
                                onClick={handleSaveTour} 
                                className="w-full h-12 bg-orange-500 hover:bg-orange-600 text-white font-bold text-lg rounded-xl shadow-lg shadow-orange-500/20 mt-6"
                                disabled={isSaving}
                            >
                                {isSaving ? "กำลังบันทึก..." : "อัปเดตข้อมูลทัวร์"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>

            <ItineraryDayModal
                isOpen={isItineraryModalOpen}
                onClose={() => setIsItineraryModalOpen(false)}
                onSave={handleSaveItineraryModal}
                initialData={editingItineraryDayIndex !== null ? dailyItineraryItems[editingItineraryDayIndex] : null}
                nextDayNumber={dailyItineraryItems.length > 0 ? Math.max(...dailyItineraryItems.map(d => d.day)) + 1 : 1}
            />
        </div>
    )
}
