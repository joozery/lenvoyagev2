"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, MapPin, Trash2, Edit, Calendar, Upload, FileText, Image as ImageIcon, X } from "lucide-react"
import { toursAPI, uploadAPI, Tour } from "@/services/api"

import Link from "next/link"

export default function ToursPage() {
    // 1. Tours State
    const [tours, setTours] = useState<Tour[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const [searchQuery, setSearchQuery] = useState("")

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

    // Handlers
    // Moved complex add/edit logic to separate pages

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

                <Link href="/admin/tours/create">
                    <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 shadow-lg shadow-orange-500/20">
                        <Plus className="h-4 w-4" /> สร้างทัวร์ใหม่
                    </Button>
                </Link>
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
                                                <Link href={`/admin/tours/${tour._id}/edit`}>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-8 w-8 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100"
                                                    >
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </Link>
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
