"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Plus, Search, MapPin, MoreVertical, Trash2, Edit, DollarSign, Calendar } from "lucide-react"

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
    const [tours, setTours] = useState([
        {
            id: 1,
            name: "Aurora Hunting in Iceland (ล่าแสงเหนือที่ไอซ์แลนด์)",
            location: "Iceland",
            price: 2499,
            duration: "7 วัน",
            status: "เปิดขาย", // Active
            image: "iceland.jpg"
        },
        {
            id: 2,
            name: "Kyoto Cherry Blossom (ชมซากุระเกียวโต)",
            location: "Japan",
            price: 3100,
            duration: "10 วัน",
            status: "เร็วๆนี้", // Upcoming
            image: "japan.jpg"
        },
        {
            id: 3,
            name: "New Zealand Landscape (ถ่ายภาพวิวทิวทัศน์นิวซีแลนด์)",
            location: "New Zealand",
            price: 4200,
            duration: "14 วัน",
            status: "ร่าง", // Draft
            image: "nz.jpg"
        }
    ])

    // 2. Search State
    const [searchQuery, setSearchQuery] = useState("")

    // 3. New Tour State
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [newTour, setNewTour] = useState({
        name: "",
        location: "",
        price: "",
        duration: ""
    })

    // Handlers
    const handleAddTour = () => {
        if (!newTour.name || !newTour.price) return

        const id = tours.length > 0 ? Math.max(...tours.map(t => t.id)) + 1 : 1
        const tourToAdd = {
            id,
            name: newTour.name,
            location: newTour.location,
            price: Number(newTour.price),
            duration: newTour.duration,
            status: "ร่าง", // Default status
            image: "placeholder.jpg"
        }

        setTours([...tours, tourToAdd])
        setNewTour({ name: "", location: "", price: "", duration: "" })
        setIsDialogOpen(false)
    }

    const handleDeleteTour = (id: number) => {
        if (confirm("คุณแน่ใจหรือไม่ที่จะลบทัวร์นี้?")) {
            setTours(tours.filter(t => t.id !== id))
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
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">จัดการทัวร์</h2> {/* Tours Management */}
                    <p className="text-zinc-500">สร้างและจัดการแพ็คเกจทัวร์ถ่ายภาพของคุณ</p>
                </div>

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 shadow-lg shadow-orange-500/20">
                            <Plus className="h-4 w-4" /> สร้างทัวร์ใหม่
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>สร้างทัวร์ใหม่</DialogTitle>
                            <DialogDescription>กรอกรายละเอียดสำหรับแพ็คเกจทัวร์ใหม่</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">ชื่อทัวร์</label>
                                <Input
                                    value={newTour.name}
                                    onChange={(e) => setNewTour({ ...newTour, name: e.target.value })}
                                    placeholder="เช่น ล่าแสงเหนือที่นอร์เวย์"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">สถานที่</label>
                                    <Input
                                        value={newTour.location}
                                        onChange={(e) => setNewTour({ ...newTour, location: e.target.value })}
                                        placeholder="เช่น Norway"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">ระยะเวลา</label>
                                    <Input
                                        value={newTour.duration}
                                        onChange={(e) => setNewTour({ ...newTour, duration: e.target.value })}
                                        placeholder="เช่น 7 วัน"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">ราคา ($)</label>
                                <Input
                                    type="number"
                                    value={newTour.price}
                                    onChange={(e) => setNewTour({ ...newTour, price: e.target.value })}
                                    placeholder="เช่น 2999"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddTour} className="bg-orange-500 text-white hover:bg-orange-600">บันทึก</Button>
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
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">ราคา</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">ระยะเวลา</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">สถานะ</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500 text-right">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-zinc-100">
                            {filteredTours.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-zinc-500">
                                        ไม่พบทัวร์ที่ตรงกับ "{searchQuery}"
                                    </td>
                                </tr>
                            ) : (
                                filteredTours.map((tour) => (
                                    <tr key={tour.id} className="hover:bg-zinc-50/50 transition-colors">
                                        <td className="p-6 align-middle">
                                            <div className="flex flex-col">
                                                <span className="font-semibold text-zinc-900 text-base">{tour.name}</span>
                                                <div className="flex items-center gap-1 text-zinc-500 text-xs mt-1">
                                                    <MapPin className="h-3 w-3" /> {tour.location}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle font-medium text-zinc-900">
                                            ${tour.price.toLocaleString()}
                                        </td>
                                        <td className="p-6 align-middle text-zinc-600">
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-3.5 w-3.5 text-zinc-400" />
                                                {tour.duration}
                                            </div>
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
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100">
                                                    <Edit className="h-4 w-4" />
                                                </Button>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-zinc-400 hover:text-red-600 hover:bg-red-50"
                                                    onClick={() => handleDeleteTour(tour.id)}
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
