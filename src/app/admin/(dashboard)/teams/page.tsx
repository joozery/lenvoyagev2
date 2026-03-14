"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Edit, Image as ImageIcon, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { teamsAPI, uploadAPI, TeamMember } from "@/services/api"

export default function TeamsPage() {
    const [members, setMembers] = useState<TeamMember[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const [isOpen, setIsOpen] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [currentMemberId, setCurrentMemberId] = useState<string | null>(null)
    const [isSaving, setIsSaving] = useState(false)

    const [newMember, setNewMember] = useState({
        name: "",
        role: "",
        bio: "",
        email: "",
        facebook: "",
        instagram: "",
        imageFile: null as File | null,
        imagePreview: ""
    })

    useEffect(() => {
        fetchMembers()
    }, [])

    const fetchMembers = async () => {
        try {
            setIsLoading(true)
            const data = await teamsAPI.getAll()
            setMembers(data)
            setError("")
        } catch (err: any) {
            console.error("Failed to fetch teams:", err)
            setError("ไม่สามารถโหลดข้อมูลทีมงานได้")
        } finally {
            setIsLoading(false)
        }
    }

    const resetForm = () => {
        setNewMember({
            name: "",
            role: "",
            bio: "",
            email: "",
            facebook: "",
            instagram: "",
            imageFile: null,
            imagePreview: ""
        })
        setIsEditing(false)
        setCurrentMemberId(null)
        setIsOpen(false)
        setError("")
    }

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setNewMember({
                ...newMember,
                imageFile: file,
                imagePreview: URL.createObjectURL(file)
            })
            setError("")
        }
    }

    const clearImage = () => {
        setNewMember({ ...newMember, imageFile: null, imagePreview: "" })
    }

    const handleEditMember = (member: TeamMember) => {
        setIsEditing(true)
        setCurrentMemberId(member._id!)
        setNewMember({
            name: member.name,
            role: member.role,
            bio: member.bio || "",
            email: member.email || "",
            facebook: member.socialLinks?.facebook || "",
            instagram: member.socialLinks?.instagram || "",
            imageFile: null,
            imagePreview: member.avatar?.url || ""
        })
        setIsOpen(true)
    }

    const handleSaveMember = async () => {
        if (!newMember.name || !newMember.role) {
            setError("กรุณากรอกชื่อและตำแหน่ง")
            return
        }

        setIsSaving(true)
        setError("")

        try {
            let avatarData = null
            if (newMember.imageFile) {
                avatarData = await uploadAPI.uploadFile(newMember.imageFile, 'image')
            }

            const memberData: Partial<TeamMember> = {
                name: newMember.name,
                role: newMember.role,
                bio: newMember.bio,
                email: newMember.email,
                socialLinks: {
                    facebook: newMember.facebook,
                    instagram: newMember.instagram
                }
            }

            if (avatarData) {
                memberData.avatar = {
                    url: avatarData.url,
                    publicId: avatarData.publicId
                }
            }

            if (isEditing && currentMemberId) {
                await teamsAPI.update(currentMemberId, memberData)
            } else {
                await teamsAPI.create({ ...memberData, order: members.length, isVisible: true })
            }

            await fetchMembers()
            resetForm()
        } catch (err: any) {
            console.error("Failed to save member:", err)
            setError(err.response?.data?.error || "ไม่สามารถบันทึกข้อมูลได้")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDeleteMember = async (id: string) => {
        if (confirm("คุณแน่ใจหรือไม่ที่จะลบรายชื่อสมาชิกนี้?")) {
            try {
                await teamsAPI.delete(id)
                await fetchMembers()
            } catch (err: any) {
                console.error("Failed to delete member:", err)
                alert("ไม่สามารถลบข้อมูลได้")
            }
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">ทีมงานเบื้องหน้า</h2>
                    <p className="text-zinc-500">จัดการข้อมูลทีมงานที่จะแสดงบนหน้าเว็บไซต์</p>
                </div>

                <Dialog open={isOpen} onOpenChange={(open) => {
                    if (!open) resetForm()
                    setIsOpen(open)
                }}>
                    <DialogTrigger asChild>
                        <Button className="bg-orange-500 hover:bg-orange-600 text-white gap-2 shadow-lg shadow-orange-500/20">
                            <Plus className="h-4 w-4" /> เพิ่มสมาชิก
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                        <DialogHeader>
                            <DialogTitle>{isEditing ? "แก้ไขสมาชิก" : "เพิ่มสมาชิกใหม่"}</DialogTitle>
                            <DialogDescription>
                                สร้างโปรไฟล์สำหรับสมาชิกทีมใหม่ กดบันทึกเมื่อเสร็จสิ้น
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            {error && (
                                <div className="p-3 bg-red-50 border border-red-200 text-red-600 rounded-lg text-sm font-medium">
                                    {error}
                                </div>
                            )}

                            {/* Image Upload */}
                            <div className="space-y-4">
                                <h3 className="text-sm font-semibold text-zinc-700 uppercase tracking-wide">รูปโปรไฟล์</h3>
                                {!newMember.imagePreview ? (
                                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-zinc-300 rounded-xl cursor-pointer bg-zinc-50 hover:bg-zinc-100 transition-colors group">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <div className="w-10 h-10 mb-2 rounded-full bg-orange-100 flex items-center justify-center group-hover:bg-orange-200 transition-colors">
                                                <ImageIcon className="w-5 h-5 text-orange-600" />
                                            </div>
                                            <p className="mb-1 text-xs font-medium text-zinc-700">คลิกอัพโหลดรูปภาพ</p>
                                        </div>
                                        <input type="file" className="hidden" accept="image/*" onChange={handleImageUpload} />
                                    </label>
                                ) : (
                                    <div className="relative rounded-xl overflow-hidden border-2 border-zinc-200 w-32 h-32 mx-auto">
                                        <img src={newMember.imagePreview} alt="Preview" className="w-full h-full object-cover" />
                                        <button
                                            onClick={clearImage}
                                            className="absolute top-1 right-1 p-1 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-medium">ชื่อ - นามสกุล *</label>
                                <Input
                                    placeholder="เช่น สมชาย ใจดี"
                                    value={newMember.name}
                                    onChange={(e) => setNewMember({ ...newMember, name: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">ตำแหน่ง *</label>
                                <Input
                                    placeholder="เช่น ช่างภาพอาวุโส"
                                    value={newMember.role}
                                    onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">ประวัติย่อ</label>
                                <textarea
                                    className="flex min-h-[80px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                    placeholder="รายละเอียดสั้นๆ เกี่ยวกับสมาชิก..."
                                    value={newMember.bio}
                                    onChange={(e) => setNewMember({ ...newMember, bio: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">อีเมล (ถ้ามี)</label>
                                <Input
                                    type="email"
                                    placeholder="contact@example.com"
                                    value={newMember.email}
                                    onChange={(e) => setNewMember({ ...newMember, email: e.target.value })}
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">Facebook URL</label>
                                    <Input
                                        placeholder="https://facebook.com/..."
                                        value={newMember.facebook}
                                        onChange={(e) => setNewMember({ ...newMember, facebook: e.target.value })}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-zinc-700">Instagram URL</label>
                                    <Input
                                        placeholder="https://instagram.com/..."
                                        value={newMember.instagram}
                                        onChange={(e) => setNewMember({ ...newMember, instagram: e.target.value })}
                                    />
                                </div>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="button" variant="outline" onClick={resetForm}>ยกเลิก</Button>
                            <Button type="submit" onClick={handleSaveMember} disabled={isSaving || !newMember.name || !newMember.role} className="bg-orange-500 text-white hover:bg-orange-600">
                                {isSaving ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

            </div>

            {isLoading ? (
                <div className="text-center py-10 text-zinc-500">กำลังโหลด...</div>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {members.map((member) => (
                        <Card key={member._id} className="group relative overflow-hidden border-zinc-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10 flex gap-1">
                                <Button size="icon" variant="secondary" className="h-8 w-8 rounded-full bg-white/90 hover:bg-white shadow-sm" onClick={() => handleEditMember(member)}>
                                    <Edit className="h-3.5 w-3.5 text-zinc-600" />
                                </Button>
                                <Button
                                    size="icon"
                                    variant="destructive"
                                    className="h-8 w-8 rounded-full shadow-sm"
                                    onClick={() => handleDeleteMember(member._id!)}
                                >
                                    <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                            </div>

                            <CardContent className="p-6 text-center space-y-4">
                                {/* Avatar Area */}
                                <div className="mx-auto w-32 h-32 rounded-full bg-zinc-100 border-4 border-white shadow-md overflow-hidden relative group-hover:border-orange-100 transition-colors">
                                    {member.avatar?.url ? (
                                        <img src={member.avatar.url} alt={member.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-zinc-200 text-zinc-400">
                                            <span className="text-4xl font-bold text-zinc-300">{member.name.charAt(0)}</span>
                                        </div>
                                    )}
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
            )}
        </div>
    )
}
