"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, MapPin, Trash2, Edit, Calendar, Upload, FileText, Image as ImageIcon, X } from "lucide-react"
import { toursAPI, uploadAPI, Tour } from "@/services/api"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function ToursPage() {
    // 1. Tours State
    const [tours, setTours] = useState<Tour[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    // 2. Search State
    const [searchQuery, setSearchQuery] = useState("")

    // 3. New Tour State
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentTourId, setCurrentTourId] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState(false)
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
        imageFile: null as File | null,
        pdfFile: null as File | null,
        imagePreview: "",
        pdfPreview: "",
    })

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

    // Fetch tours on mount
    useEffect(() => {
        fetchTours()
    }, [])

    const fetchTours = async () => {
        try {
            setIsLoading(true)
            const data = await toursAPI.getAll()
            setTours(data)
            setError("")
        } catch (err: any) {
            console.error("Failed to fetch tours:", err)
            setError("ไม่สามารถโหลดข้อมูลทัวร์ได้")
        } finally {
            setIsLoading(false)
        }
    }

    // File upload handlers
    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setNewTour({
                ...newTour,
                imageFile: file,
                imagePreview: URL.createObjectURL(file)
            })
            setError("");
        }
    }

    const handlePdfUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setNewTour({ ...newTour, pdfFile: file })
            setError("");
        }
    }

    const clearImage = () => {
        setNewTour({ ...newTour, imageFile: null, imagePreview: "" })
    }

    const clearPdf = () => {
        setNewTour({ ...newTour, pdfFile: null, pdfPreview: "" })
    }

    // Handlers
    const resetForm = () => {
        setNewTour({
            name: "",
            location: "",
            price: "",
            duration: "",
            tourDate: "",
            startDate: "",
            endDate: "",
            seatsAvailable: "",
            status: "ร่าง",
            imageFile: null,
            pdfFile: null,
            imagePreview: "",
            pdfPreview: ""
        })
        setIsEditing(false)
        setCurrentTourId(null)
        setIsDialogOpen(false)
    }

    const handleEditTour = (tour: Tour) => {
        setIsEditing(true)
        setCurrentTourId(tour._id!)
        setNewTour({
            name: tour.name,
            location: tour.location,
            price: tour.price.toString(),
            duration: tour.duration,
            tourDate: tour.tourDate,
            startDate: tour.startDate ? new Date(tour.startDate).toISOString().split('T')[0] : "",
            endDate: tour.endDate ? new Date(tour.endDate).toISOString().split('T')[0] : "",
            seatsAvailable: tour.seatsAvailable?.toString() || "",
            status: tour.status,
            imageFile: null, // Keep null, only update if new file selected
            pdfFile: null,
            imagePreview: tour.image?.url || "",
            pdfPreview: tour.pdf?.url || ""
        })
        setIsDialogOpen(true)
    }

    const handleSaveTour = async () => {
        if (!newTour.name || !newTour.price || (!isEditing && !newTour.imageFile)) {
            setError("กรุณากรอกข้อมูลให้ครบถ้วน")
            return
        }

        setIsSaving(true)
        setError("")

        try {
            // Upload image to Cloudinary if new file selected
            let imageData = null
            if (newTour.imageFile) {
                imageData = await uploadAPI.uploadFile(newTour.imageFile, 'image')
            }

            // Upload PDF if new file selected
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
            }

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
            }

            if (isEditing && currentTourId) {
                await toursAPI.update(currentTourId, tourData)
            } else {
                // For create, image is required (validated above)
                if (!isEditing && !imageData) throw new Error("Image is required")

                // Add image data for create if not added (should be covered by setup above but for type safety)
                if (!tourData.image && imageData) {
                    tourData.image = { url: imageData.url, publicId: imageData.publicId }
                }

                await toursAPI.create(tourData)
            }

            // Refresh tours list
            await fetchTours()

            // Reset form
            resetForm()
        } catch (err: any) {
            console.error("Failed to save tour:", err)
            setError(err.response?.data?.error || "ไม่สามารถบันทึกข้อมูลทัวร์ได้")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDeleteTour = async (id: string) => {
        if (!confirm("คุณแน่ใจหรือไม่ที่จะลบทัวร์นี้?")) return

        try {
            await toursAPI.delete(id)
            await fetchTours()
        } catch (err: any) {
            console.error("Failed to delete tour:", err)
            setError("ไม่สามารถลบทัวร์ได้")
        }
    }

    // Filter Logic
    const filteredTours = tours.filter(tour =>
        tour.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tour.location.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">จัดการทัวร์</h2>
                    <p className="text-zinc-500">สร้างและจัดการแพ็คเกจทัวร์ถ่ายภาพของคุณ</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={(open) => {
                    if (!open) resetForm()
                    setIsDialogOpen(open)
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 shadow-lg shadow-orange-500/20">
                            <Plus className="h-4 w-4" /> สร้างทัวร์ใหม่
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <DialogHeader>
                            <DialogTitle className="text-2xl">{isEditing ? "แก้ไขทัวร์" : "สร้างทัวร์ใหม่"}</DialogTitle>
                            <DialogDescription>กรอกรายละเอียด{isEditing ? "เพื่อแก้ไข" : "และอัพโหลดไฟล์สำหรับ"}แพ็คเกจทัวร์</DialogDescription>
                        </DialogHeader>

                        <div className="space-y-6 py-4">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                                    {error}
                                </div>
                            )}
                            {/* Basic Info Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide">ข้อมูลพื้นฐาน</h3>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">ชื่อทัวร์ *</label>
                                    <Input
                                        value={newTour.name}
                                        onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
                                        placeholder="เช่น ล่าแสงเหนือที่นอร์เวย์"
                                        className="h-11"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700">สถานที่ *</label>
                                        <Input
                                            value={newTour.location}
                                            onChange={(e) => setNewTour({ ...newTour, location: e.target.value })}
                                            placeholder="เช่น Norway"
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700">ระยะเวลา</label>
                                        <Input
                                            value={newTour.duration}
                                            onChange={(e) => setNewTour({ ...newTour, duration: e.target.value })}
                                            placeholder="เช่น 7 วัน"
                                            className="h-11"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">ราคา (฿) *</label>
                                    <Input
                                        type="number"
                                        value={newTour.price}
                                        onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
                                        placeholder="เช่น 129900"
                                        className="h-11"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700">วันไป *</label>
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
                                            }}
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700">วันกลับ *</label>
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
                                            }}
                                            className="h-11"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700">สรุปวันที่ (Auto) *</label>
                                        <Input
                                            value={newTour.tourDate}
                                            onChange={(e) => setNewTour({ ...newTour, tourDate: e.target.value })}
                                            placeholder="เช่น 13-20 ก.พ."
                                            className="h-11"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium text-zinc-700">จำนวนที่นั่ง *</label>
                                        <Input
                                            type="number"
                                            value={newTour.seatsAvailable}
                                            onChange={(e) => setNewTour({ ...newTour, seatsAvailable: e.target.value })}
                                            placeholder="เช่น 6"
                                            className="h-11"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">สถานะ *</label>
                                    <select
                                        value={newTour.status}
                                        onChange={(e) => setNewTour({ ...newTour, status: e.target.value })}
                                        className="flex h-11 w-full rounded-md border border-zinc-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-zinc-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    >
                                        <option value="ร่าง">ร่าง (Draft)</option>
                                        <option value="เปิดขาย">เปิดขาย (Open)</option>
                                        <option value="เร็วๆนี้">เร็วๆนี้ (Coming Soon)</option>
                                        <option value="เต็มแล้ว">เต็มแล้ว (Sold Out)</option>
                                    </select>
                                </div>
                            </div>

                            {/* Image Upload Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide">รูปภาพประกอบ</h3>

                                {!newTour.imagePreview ? (
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-colors group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <div className="w-12 h-12 mb-3 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                                <ImageIcon className="w-6 h-6 text-orange-600" />
                                            </div>
                                            <p className="mb-2 text-sm font-medium text-zinc-700">
                                                <span className="text-orange-600">คลิกเพื่ออัพโหลด</span> หรือลากไฟล์มาวาง
                                            </p>
                                            <p className="text-xs text-zinc-500">PNG, JPG หรือ WEBP (สูงสุด 10MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </label>
                                ) : (
                                    <div className="relative rounded-xl overflow-hidden border-2 border-zinc-200">
                                        <img
                                            src={newTour.imagePreview}
                                            alt="Preview"
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                                            <div className="flex items-center justify-between w-full">
                                                <p className="text-white text-sm font-medium truncate flex-1">{newTour.imageFile?.name || "รูปภาพปัจจุบัน"}</p>
                                                <button
                                                    onClick={clearImage}
                                                    className="ml-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* PDF Upload Section */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide">ไฟล์ตารางทัวร์ (PDF)</h3>

                                {!newTour.pdfFile && !newTour.pdfPreview ? (
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-colors group">
                                        <div className="flex flex-col items-center justify-center">
                                            <div className="w-12 h-12 mb-3 rounded-full bg-zinc-200 flex items-center justify-center group-hover:bg-zinc-300 transition-colors">
                                                <FileText className="w-6 h-6 text-zinc-600" />
                                            </div>
                                            <p className="mb-1 text-sm font-medium text-zinc-700">
                                                <span className="text-zinc-900">คลิกเพื่ออัพโหลด PDF</span>
                                            </p>
                                            <p className="text-xs text-zinc-500">ไฟล์ PDF เท่านั้น (สูงสุด 5MB)</p>
                                        </div>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept=".pdf"
                                            onChange={handlePdfUpload}
                                        />
                                    </label>
                                ) : (
                                    <div className="flex items-center justify-between p-4 bg-zinc-100 rounded-xl border border-zinc-200">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-red-100 flex items-center justify-center">
                                                <FileText className="w-5 h-5 text-red-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-zinc-900">
                                                    {newTour.pdfFile ? newTour.pdfFile.name : "ไฟล์ PDF ปัจจุบัน"}
                                                </p>
                                                {newTour.pdfPreview && !newTour.pdfFile && (
                                                    <a
                                                        href={`/api/view-pdf?url=${encodeURIComponent(newTour.pdfPreview)}${isEditing && currentTourId ? `&publicId=${encodeURIComponent(tours.find(t => t._id === currentTourId)?.pdf?.publicId || '')}` : ''}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-xs text-blue-600 hover:underline"
                                                    >
                                                        ดูไฟล์เดิม
                                                    </a>
                                                )}
                                                {newTour.pdfFile && <p className="text-xs text-zinc-500">พร้อมอัพโหลด</p>}
                                            </div>
                                        </div>
                                        <button
                                            onClick={clearPdf}
                                            className="p-1.5 hover:bg-zinc-200 rounded-full transition-colors"
                                        >
                                            <X className="w-4 h-4 text-zinc-600" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>

                        <DialogFooter className="gap-2">
                            <Button
                                variant="outline"
                                onClick={resetForm}
                                className="px-6"
                            >
                                ยกเลิก
                            </Button>
                            <Button
                                onClick={handleSaveTour}
                                className="bg-orange-500 text-white hover:bg-orange-600 px-6"
                                disabled={!newTour.name || !newTour.price || !newTour.tourDate || !newTour.seatsAvailable || isSaving}
                            >
                                {isSaving ? "กำลังบันทึก..." : (isEditing ? "บันทึกการแก้ไข" : "บันทึกข้อมูล")}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-zinc-200 shadow-sm">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <Input
                        placeholder="ค้นหาทัวร์ด้วยชื่อ หรือ สถานที่..."
                        className="pl-9 bg-zinc-50 border-zinc-200"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="text-zinc-600">ตัวกรอง</Button>
                    <Button variant="outline" className="text-zinc-600">ส่งออกข้อมูล</Button>
                </div>
            </div>

            <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-0">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                            <tr>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">ชื่อทัวร์</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">วันที่</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">ราคา</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">ระยะเวลา</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">ที่นั่ง</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">สถานะ</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500 text-right">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-zinc-100">
                            {filteredTours.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="p-8 text-center text-zinc-500">
                                        ไม่พบทัวร์ที่ตรงกับ "{searchQuery}"
                                    </td>
                                </tr>
                            ) : (
                                filteredTours.map((tour) => (
                                    <tr key={tour._id} className="hover:bg-zinc-50/50 transition-colors">
                                        <td className="p-6 align-middle">
                                            <div className="flex items-center gap-4">
                                                {/* Tour Image */}
                                                <div className="w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-zinc-100 border border-zinc-200">
                                                    {tour.image?.url ? (
                                                        <img
                                                            src={tour.image.url}
                                                            alt={tour.name}
                                                            className="w-full h-full object-cover"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-zinc-300">
                                                            <ImageIcon className="w-6 h-6" />
                                                        </div>
                                                    )}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-semibold text-zinc-900 text-base">{tour.name}</span>
                                                    <div className="flex items-center gap-1 text-zinc-500 text-xs mt-1">
                                                        <MapPin className="h-3 w-3" /> {tour.location}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle text-zinc-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                                                {tour.tourDate || '-'}
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle font-medium text-zinc-900">
                                            ฿{tour.price.toLocaleString()}
                                        </td>
                                        <td className="p-6 align-middle text-zinc-600">
                                            {tour.duration}
                                        </td>
                                        <td className="p-6 align-middle text-zinc-600">
                                            <span className="font-medium">{tour.seatsAvailable || 0} ที่นั่ง</span>
                                        </td>
                                        <td className="p-6 align-middle">
                                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${tour.status === 'เปิดขาย' ? 'bg-green-100 text-green-700' :
                                                tour.status === 'เร็วๆนี้' ? 'bg-blue-100 text-blue-700' :
                                                    'bg-zinc-100 text-zinc-600'
                                                }`}>
                                                {tour.status}
                                            </span>
                                        </td>
                                        <td className="p-6 align-middle text-right">
                                            <div className="flex items-center justify-end gap-2">
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
                                                    onClick={() => handleEditTour(tour)}
                                                >
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-zinc-400 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => handleDeleteTour(tour._id!)}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    )
}
