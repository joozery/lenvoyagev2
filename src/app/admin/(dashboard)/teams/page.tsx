"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit, Save } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function TeamsPage() {
    const [members, setMembers] = useState([
        {
            id: 1,
            name: "Alex Morgan",
            role: "Lead Photographer",
            bio: "Specializes in landscape and aurora photography with 10+ years exp."
        },
        {
            id: 2,
            name: "Sarah Jenkins",
            role: "Tour Guide",
            bio: "Local expert in Iceland, passionate about storytelling and history."
        },
        {
            id: 3,
            name: "David Chen",
            role: "Videographer",
            bio: "Master of cinematic travel films and drone operations."
        }
    ])

    // New Member Form State
    const [newMember, setNewMember] = useState({ name: "", role: "", bio: "" })
    const [isOpen, setIsOpen] = useState(false)

    const handleAddMember = () => {
        if (!newMember.name || !newMember.role) return; // Simple validation

        const id = members.length > 0 ? Math.max(...members.map(m => m.id)) + 1 : 1
        setMembers([...members, { id, ...newMember }])

        // Reset and close
        setNewMember({ name: "", role: "", bio: "" })
        setIsOpen(false)
    }

    const handleDeleteMember = (id: number) => {
        if (confirm("คุณแน่ใจหรือไม่ที่จะลบรายชื่อสมาชิกนี้?")) {
            setMembers(members.filter(m => m.id !== id))
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">ทีมงานเบื้องหน้า</h2> {/* Team Members */}
                    <p className="text-zinc-500">จัดการข้อมูลทีมงานที่จะแสดงบนหน้าเว็บไซต์</p>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 shadow-lg shadow-orange-500/20">
                            <Plus className="h-4 w-4" /> เพิ่มสมาชิก
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                        <DialogHeader>
                            <DialogTitle>เพิ่มสมาชิกใหม่</DialogTitle>
                            <DialogDescription>
                                สร้างโปรไฟล์สำหรับสมาชิกทีมใหม่ กดบันทึกเมื่อเสร็จสิ้น
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label htmlFor="name" className="text-sm font-medium">ชื่อ - นามสกุล</label>
                                <Input
                                    id="name"
                                    placeholder="เช่น สมชาย ใจดี"
                                    value={newMember.name}
                                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="role" className="text-sm font-medium">ตำแหน่ง</label>
                                <Input
                                    id="role"
                                    placeholder="เช่น ช่างภาพอาวุโส"
                                    value={newMember.role}
                                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="bio" className="text-sm font-medium">ประวัติย่อ</label>
                                <textarea
                                    id="bio"
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="รายละเอียดสั้นๆ เกี่ยวกับสมาชิก..."
                                    value={newMember.bio}
                                    onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddMember} className="bg-orange-500 text-white hover:bg-orange-600">บันทึก</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {members.map((member) => (
                    <Card key={member.id} className="group relative overflow-hidden border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
                            <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm">
                                <Edit className="h-3.5 w-3.5 text-zinc-600" />
                            </Button>
                            <Button
                                size="icon"
                                variant="destructive"
                                className="h-8 w-8 rounded-full shadow-sm"
                                onClick={() => handleDeleteMember(member.id)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>

                        <CardContent className="p-6 text-center space-y-4">
                            {/* Avatar Area */}
                            <div className="mx-auto w-32 h-32 rounded-full bg-zinc-100 border-4 border-white shadow-md overflow-hidden relative group-hover:border-orange-100 transition-colors">
                                <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-zinc-400">
                                    <span className="text-4xl font-bold text-zinc-300">{member.name.charAt(0)}</span>
                                </div>
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-xl font-bold text-zinc-900">{member.name}</h3>
                                <p className="text-sm font-medium text-orange-600 uppercase tracking-wide">{member.role}</p>
                            </div>

                            <p className="text-sm text-zinc-500 leading-relaxed px-2 line-clamp-3">
                                {member.bio}
                            </p>
                        </CardContent>
                    </Card>
                ))}

                {/* Add New Placeholder Card (Click to open Dialog) */}
                <button
                    onClick={() => setIsOpen(true)}
                    className="flex flex-col items-center justify-center gap-4 h-full min-h-[320px] rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50/50 hover:bg-zinc-100/50 hover:border-orange-300 transition-all group"
                >
                    <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center shadow-sm border border-zinc-100 group-hover:scale-110 transition-transform">
                        <Plus className="h-6 w-6 text-zinc-400 group-hover:text-orange-500" />
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-medium text-zinc-900">เพิ่มสมาชิกใหม่</p>
                        <p className="text-xs text-zinc-500">คลิกเพื่อสร้างโปรไฟล์</p>
                    </div>
                </button>
            </div>
        </div>
    )
}
