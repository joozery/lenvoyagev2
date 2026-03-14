"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, ArrowLeft, Image as ImageIcon, FileText, X } from "lucide-react"
import { toursAPI, uploadAPI, Tour } from "@/services/api"
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

export default function CreateTourPage() {
    const router = useRouter()
    const [isSaving, setIsSaving] = useState(false)
    const [error, setError] = useState("")

    const [newTour, setNewTour] = useState({
        name: "",
        location: "",
        price: "",
        duration: "",
        tourDate: "",
        startDate: "",
        endDate: "",
        seatsAvailable: "",
        status: "ร่าง",
        // New detailed fields
        tripDetails: "",
        faq: "",
        // Files
        imageFile: null as File | null,
        pdfFile: null as File | null,
        imagePreview: "",
        pdfPreview: "",
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

    const [dailyItineraryItems, setDailyItineraryItems] = useState<ItineraryItem[]>([{ day: 1, title: "", details: "" }])

    const handleAddItineraryDay = () => {
        setDailyItineraryItems([
            ...dailyItineraryItems, 
            { day: dailyItineraryItems.length + 1, title: "", details: "" }
        ])
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

    const handleUpdateItineraryDay = (index: number, field: 'title' | 'details', value: string) => {
        const newItems = [...dailyItineraryItems];
        newItems[index] = { ...newItems[index], [field]: value };
        setDailyItineraryItems(newItems);
    }

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

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setNewTour({
                ...newTour,
                imageFile: file,
                imagePreview: URL.createObjectURL(file)
            })
            setError("")
        }
    }

    const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setNewTour({ ...newTour, pdfFile: file })
            setError("")
        }
    }

    const clearImage = () => {
        setNewTour({ ...newTour, imageFile: null, imagePreview: "" })
    }

    const clearPdf = () => {
        setNewTour({ ...newTour, pdfFile: null, pdfPreview: "" })
    }

    const handleSaveTour = async () => {
        if (!newTour.name || !newTour.price || !newTour.imageFile) {
            setError("กรุณากรอกข้อมูลให้ครบถ้วนและอัพโหลดรูปภาพ")
            return
        }

        setIsSaving(true)
        setError("")

        try {
            // Upload image to Cloudinary
            const imageData = await uploadAPI.uploadFile(newTour.imageFile, 'image')

            // Upload PDF if selected
            let pdfData = null
            if (newTour.pdfFile) {
                pdfData = await uploadAPI.uploadFile(newTour.pdfFile, 'pdf')
            }

            const tourData: Partial<Tour> = {
                name: newTour.name,
                location: newTour.location,
                price: Number(newTour.price),
                duration: newTour.duration,
                tourDate: newTour.tourDate || formatDateRangeThai(newTour.startDate, newTour.endDate),
                startDate: newTour.startDate ? new Date(newTour.startDate) : undefined as any,
                endDate: newTour.endDate ? new Date(newTour.endDate) : undefined as any,
                seatsAvailable: Number(newTour.seatsAvailable) || 0,
                status: newTour.status as any,
                image: {
                    url: imageData.url,
                    publicId: imageData.publicId
                }
            }

            if (pdfData) {
                tourData.pdf = {
                    url: pdfData.url,
                    publicId: pdfData.publicId
                }
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

            // In the future, send tripDetails, dailyItinerary, faq to the backend when the schema supports it.
            // For now, these are UI ready.
            tourData.tripDetails = newTour.tripDetails;
            tourData.dailyItinerary = JSON.stringify(processedItineraryItems.filter(item => item.title || item.details || (item.images && item.images.length > 0)));

            await toursAPI.create(tourData)
            router.push("/admin/tours")
        } catch (err: any) {
            console.error("Failed to save tour:", err)
            setError(err.response?.data?.error || "ไม่สามารถบันทึกข้อมูลทัวร์ได้")
            setIsSaving(false)
        }
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
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">สร้างทัวร์ใหม่</h2>
                    <p className="text-zinc-500">กรอกรายละเอียดเพื่อเปิดแพ็คเกจทัวร์ใหม่</p>
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
                                    value={newTour.name}
                                    onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
                                    placeholder="เช่น ล่าแสงเหนือที่นอร์เวย์ 8 วัน 7 คืน"
                                    className="h-12 text-lg"
                                />
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">สถานที่ *</label>
                                    <Input
                                        value={newTour.location}
                                        onChange={(e) => setNewTour({ ...newTour, location: e.target.value })}
                                        placeholder="เช่น 🇳🇿 New Zealand"
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">ระยะเวลา *</label>
                                    <Input
                                        value={newTour.duration}
                                        onChange={(e) => setNewTour({ ...newTour, duration: e.target.value })}
                                        placeholder="เช่น 7 วัน 6 คืน"
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">ลานออกเดินทาง (วันไป) *</label>
                                    <Input
                                        type="date"
                                        value={newTour.startDate}
                                        onChange={(e) => {
                                            const start = e.target.value;
                                            setNewTour({
                                                ...newTour,
                                                startDate: start,
                                                tourDate: formatDateRangeThai(start, newTour.endDate)
                                            });
                                            if (newTour.endDate) {
                                                generateItineraryDays(start, newTour.endDate);
                                            }
                                        }}
                                        className="h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">เดินทางกลับ (วันกลับ) *</label>
                                    <Input
                                        type="date"
                                        value={newTour.endDate}
                                        onChange={(e) => {
                                            const end = e.target.value;
                                            setNewTour({
                                                ...newTour,
                                                endDate: end,
                                                tourDate: formatDateRangeThai(newTour.startDate, end)
                                            });
                                            if (newTour.startDate) {
                                                generateItineraryDays(newTour.startDate, end);
                                            }
                                        }}
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">สรุปวันที่ (Auto หรือกรอกเองได้) *</label>
                                <Input
                                    value={newTour.tourDate}
                                    onChange={(e) => setNewTour({ ...newTour, tourDate: e.target.value })}
                                    placeholder="เช่น 13-20 ก.พ. 2569"
                                    className="h-11 bg-zinc-50"
                                />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-zinc-200 shadow-sm overflow-hidden">
                        <div className="bg-zinc-50 px-6 py-4 border-b border-zinc-200">
                            <h3 className="text-lg font-bold text-zinc-900">2. รายละเอียดเชิงลึก (Tour Details)</h3>
                        </div>
                        <CardContent className="p-6 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">รายละเอียดทริปโดยรวม (คำโฆษณา / ไฮไลท์)</label>
                                <Textarea
                                    value={newTour.tripDetails}
                                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewTour({ ...newTour, tripDetails: e.target.value })}
                                    placeholder="เขียนแนะนำทริปนี้ว่ามีความน่าสนใจอย่างไร..."
                                    className="min-h-[150px] resize-y"
                                />
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <label className="text-sm font-medium text-zinc-700">กำหนดการเดินทางรายวัน</label>
                                    <Button type="button" variant="outline" size="sm" onClick={handleAddItineraryDay} className="h-8 gap-1.5 text-orange-600 border-orange-200 hover:bg-orange-50">
                                        <Plus className="h-3.5 w-3.5" /> เพิ่มวัน
                                    </Button>
                                </div>
                                
                                <div className="space-y-4">
                                    {dailyItineraryItems.map((item, index) => (
                                        <div key={`day-${index}`} className="p-4 border border-zinc-200 rounded-xl bg-white space-y-4 relative group">
                                            {dailyItineraryItems.length > 1 && (
                                                <button 
                                                    type="button" 
                                                    onClick={() => handleRemoveItineraryDay(index)}
                                                    className="absolute top-3 right-3 p-1.5 text-zinc-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            )}
                                            
                                            <div className="flex items-center gap-3 border-b border-zinc-100 pb-3">
                                                <div className="bg-orange-100 text-orange-700 font-bold px-3 py-1 rounded-lg text-sm shrink-0">
                                                    Day {item.day}
                                                </div>
                                                <Input
                                                    value={item.title}
                                                    onChange={(e) => handleUpdateItineraryDay(index, 'title', e.target.value)}
                                                    placeholder="เช่น เดินทางถึงสนามบิน - เข้าที่พัก"
                                                    className="h-10 border-transparent bg-transparent hover:bg-zinc-50 focus:bg-white px-2 focus:border-zinc-300 font-medium"
                                                />
                                            </div>
                                            
                                            <Textarea
                                                value={item.details}
                                                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleUpdateItineraryDay(index, 'details', e.target.value)}
                                                placeholder={`รายละเอียดการเดินทางวันที่ ${item.day}...`}
                                                className="min-h-[100px] bg-zinc-50/50 border-zinc-200 text-sm"
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
                                    value={newTour.price}
                                    onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
                                    placeholder="เช่น 129000"
                                    className="h-12 text-xl font-bold text-orange-600"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">จำนวนที่นั่งรับ (ท่าน) *</label>
                                <Input
                                    type="number"
                                    value={newTour.seatsAvailable}
                                    onChange={(e) => setNewTour({ ...newTour, seatsAvailable: e.target.value })}
                                    placeholder="เช่น 12"
                                    className="h-11"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium text-zinc-700">สถานะ *</label>
                                <select
                                    value={newTour.status}
                                    onChange={(e) => setNewTour({ ...newTour, status: e.target.value })}
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
                                {!newTour.imagePreview ? (
                                    <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-colors group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <ImageIcon className="w-8 h-8 text-zinc-400 mb-2 group-hover:text-orange-500 transition-colors" />
                                            <span className="text-sm text-zinc-600">คลิกเพื่ออัพโหลดรูปภาพ</span>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                ) : (
                                    <div className="relative rounded-xl overflow-hidden border-2 border-zinc-200 h-40">
                                        <img src={newTour.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button onClick={clearImage} className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors shadow-md">
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="pt-4 border-t border-zinc-100">
                                <label className="text-sm font-medium text-zinc-700 block mb-2">ไฟล์ PDF โปรแกรมเต็ม</label>
                                {!newTour.pdfFile && !newTour.pdfPreview ? (
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
                                            <span className="text-sm text-zinc-700 truncate">{newTour.pdfFile ? newTour.pdfFile.name : "มีไฟล์แล้ว"}</span>
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
                                {isSaving ? "กำลังบันทึก..." : "เปิดสร้างแพ็คเกจทัวร์"}
                            </Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
