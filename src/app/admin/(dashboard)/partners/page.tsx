"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Globe, Building2, Handshake } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function PartnersPage() {
    const [partners, setPartners] = useState([
        { id: 1, name: "Nexus", logo: "/partner-1.png", website: "https://nexus.com" },
        { id: 2, name: "Global Travel", logo: "/partner-2.png", website: "https://globaltravel.com" },
        { id: 3, name: "Canon", logo: "/partner-3.png", website: "https://canon.com" },
        { id: 4, name: "Sony", logo: "/partner-4.png", website: "https://sony.com" },
        { id: 5, name: "National Geographic", logo: "/partner-5.png", website: "https://nationalgeographic.com" },
        { id: 6, name: "Expedia", logo: "/partner-6.png", website: "https://expedia.com" },
    ])

    const [newPartner, setNewPartner] = useState({ name: "", website: "" })
    const [isOpen, setIsOpen] = useState(false)

    const handleAddPartner = () => {
        if (!newPartner.name) return
        const id = partners.length > 0 ? Math.max(...partners.map(p => p.id)) + 1 : 1

        setPartners([...partners, {
            id,
            name: newPartner.name,
            logo: "/placeholder-logo.png", // Mock logo path
            website: newPartner.website || "#"
        }])

        setNewPartner({ name: "", website: "" })
        setIsOpen(false)
    }

    const handleDeletePartner = (id: number) => {
        if (confirm("คุณแน่ใจหรือไม่ที่จะลบพาร์ทเนอร์รายนี้?")) {
            setPartners(partners.filter(p => p.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">พาร์ทเนอร์</h2> {/* Our Partners */}
                    <p className="text-zinc-500">จัดการโลโก้พาร์ทเนอร์ที่จะแสดงบนหน้าแรกของเว็บไซต์</p>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 shadow-lg shadow-orange-500/20">
                            <Plus className="h-4 w-4" /> เพิ่มพาร์ทเนอร์
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>เพิ่มพาร์ทเนอร์ใหม่</DialogTitle>
                            <DialogDescription>อัปโหลดโลโก้และระบุรายละเอียดบริษัท</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">ชื่อพาร์ทเนอร์</label>
                                <Input
                                    value={newPartner.name}
                                    onChange={(e) => setNewPartner({ ...newPartner, name: e.target.value })}
                                    placeholder="เช่น Nexus"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">เว็บไซต์ (ถ้ามี)</label>
                                <Input
                                    value={newPartner.website}
                                    onChange={(e) => setNewPartner({ ...newPartner, website: e.target.value })}
                                    placeholder="https://example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">โลโก้</label>
                                <div className="border-2 border-dashed border-zinc-200 rounded-lg h-32 flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:border-orange-200 cursor-pointer transition-colors">
                                    <Plus className="h-8 w-8 mb-2 text-zinc-300" />
                                    <span className="text-xs">คลิกเพื่ออัปโหลดโลโก้</span>
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddPartner} className="bg-orange-500 text-white hover:bg-orange-600">บันทึก</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                {partners.map((partner) => (
                    <Card key={partner.id} className="group relative overflow-hidden border-zinc-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center p-6 text-center bg-white hover:border-orange-200">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <Button
                                size="icon"
                                variant="destructive"
                                className="h-8 w-8 rounded-full shadow-sm"
                                onClick={() => handleDeletePartner(partner.id)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>

                        <div className="w-24 h-24 rounded-full bg-white border border-zinc-100 shadow-sm flex items-center justify-center mb-4 p-4 group-hover:scale-105 transition-transform relative">
                            {/* Mock Logo Display */}
                            <div className="flex flex-col items-center justify-center">
                                <Handshake className="w-8 h-8 text-zinc-300 group-hover:text-orange-500 transition-colors" />
                                <span className="text-[10px] text-zinc-400 mt-1">โลโก้</span>
                            </div>
                        </div>

                        <h3 className="font-semibold text-zinc-900 truncate w-full text-sm">{partner.name}</h3>
                        <a href={partner.website} target="_blank" className="text-xs text-zinc-400 hover:text-orange-500 truncate w-full flex items-center justify-center gap-1 mt-1 transition-colors">
                            <Globe className="w-3 h-3" /> {partner.website.includes('http') ? partner.website.replace('https://', '').replace('www.', '').split('/')[0] : partner.website}
                        </a>
                    </Card>
                ))}

                {/* Add Trigger Card */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-zinc-200 rounded-xl hover:bg-zinc-50 hover:border-orange-300 transition-all group h-full min-h-[180px]"
                >
                    <div className="w-12 h-12 rounded-full bg-zinc-100 flex items-center justify-center mb-3 group-hover:bg-white group-hover:shadow-sm transition-colors">
                        <Plus className="h-5 w-5 text-zinc-400 group-hover:text-orange-500" />
                    </div>
                    <span className="text-sm font-medium text-zinc-600 group-hover:text-zinc-900">เพิ่มใหม่</span>
                </button>
            </div>
        </div>
    )
}
