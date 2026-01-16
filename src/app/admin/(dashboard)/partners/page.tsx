"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Plus, Trash2, Globe, Building2, Handshake, ChevronDown, ChevronUp, Eye, EyeOff, Upload, X } from "lucide-react"
import { partnersAPI, uploadAPI, Partner } from "@/services/api"
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
    const [partners, setPartners] = useState<Partner[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")

    const [newPartner, setNewPartner] = useState({
        name: "",
        website: "",
        logoFile: null as File | null,
        logoPreview: ""
    })
    const [isOpen, setIsOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)
    const [isSectionOpen, setIsSectionOpen] = useState(true)
    const [isVisibleOnWebsite, setIsVisibleOnWebsite] = useState(true)

    // Fetch partners on mount
    useEffect(() => {
        fetchPartners()
    }, [])

    const fetchPartners = async () => {
        try {
            setIsLoading(true)
            const data = await partnersAPI.getAll()
            setPartners(data)
            setError("")
        } catch (err: any) {
            console.error("Failed to fetch partners:", err)
            setError("ไม่สามารถโหลดข้อมูลพาร์ทเนอร์ได้")
        } finally {
            setIsLoading(false)
        }
    }

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (file) {
            setNewPartner({
                ...newPartner,
                logoFile: file,
                logoPreview: URL.createObjectURL(file)
            })
        }
    }

    const clearLogo = () => {
        setNewPartner({ ...newPartner, logoFile: null, logoPreview: "" })
    }

    const handleAddPartner = async () => {
        if (!newPartner.name || !newPartner.logoFile) {
            setError("กรุณากรอกชื่อและอัพโหลดโลโก้")
            return
        }

        setIsSaving(true)
        setError("")

        try {
            // Upload logo to Cloudinary
            const logoData = await uploadAPI.uploadFile(newPartner.logoFile, 'image')

            // Create partner
            const partnerData: Partial<Partner> = {
                name: newPartner.name,
                website: newPartner.website || "",
                logo: {
                    url: logoData.url,
                    publicId: logoData.publicId
                },
                isVisible: isVisibleOnWebsite,
                order: partners.length
            }

            await partnersAPI.create(partnerData)

            // Refresh partners list
            await fetchPartners()

            // Reset form
            setNewPartner({ name: "", website: "", logoFile: null, logoPreview: "" })
            setIsOpen(false)
        } catch (err: any) {
            console.error("Failed to create partner:", err)
            setError(err.response?.data?.error || "ไม่สามารถสร้างพาร์ทเนอร์ได้")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDeletePartner = async (id: string) => {
        if (!confirm("คุณแน่ใจหรือไม่ที่จะลบพาร์ทเนอร์รายนี้?")) return

        try {
            await partnersAPI.delete(id)
            await fetchPartners()
        } catch (err: any) {
            console.error("Failed to delete partner:", err)
            setError("ไม่สามารถลบพาร์ทเนอร์ได้")
        }
    }

    return (
        <div className="space-y-6">
            {/* Visibility Control Card */}
            <Card className="p-6 bg-gradient-to-r from-orange-50 to-red-50 border-orange-200">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${isVisibleOnWebsite ? 'bg-green-100' : 'bg-zinc-100'}`}>
                            {isVisibleOnWebsite ? (
                                <Eye className="w-6 h-6 text-green-600" />
                            ) : (
                                <EyeOff className="w-6 h-6 text-zinc-400" />
                            )}
                        </div>
                        <div>
                            <h3 className="font-semibold text-zinc-900">การแสดงผลบนเว็บไซต์</h3>
                            <p className="text-sm text-zinc-600">
                                {isVisibleOnWebsite
                                    ? "Section Partners กำลังแสดงบนหน้าเว็บหลัก"
                                    : "Section Partners ถูกซ่อนจากหน้าเว็บหลัก"}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={() => setIsVisibleOnWebsite(!isVisibleOnWebsite)}
                        className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${isVisibleOnWebsite ? 'bg-green-500' : 'bg-zinc-300'
                            }`}
                    >
                        <span
                            className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${isVisibleOnWebsite ? 'translate-x-7' : 'translate-x-1'
                                }`}
                        />
                    </button>
                </div>
            </Card>

            <div className="flex items-center justify-between">
                <div className="flex-1">
                    <div className="flex items-center gap-3">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-900">พาร์ทเนอร์</h2>
                        <button
                            onClick={() => setIsSectionOpen(!isSectionOpen)}
                            className="p-2 hover:bg-zinc-100 rounded-lg transition-colors group"
                            title={isSectionOpen ? "ซ่อน" : "แสดง"}
                        >
                            {isSectionOpen ? (
                                <ChevronUp className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600" />
                            ) : (
                                <ChevronDown className="h-5 w-5 text-zinc-400 group-hover:text-zinc-600" />
                            )}
                        </button>
                    </div>
                    <p className="text-zinc-500 mt-1">จัดการโลโก้พาร์ทเนอร์ที่จะแสดงบนหน้าแรกของเว็บไซต์</p>
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
                                {!newPartner.logoPreview ? (
                                    <label className="border-2 border-dashed border-zinc-200 rounded-lg h-32 flex flex-col items-center justify-center text-zinc-500 hover:bg-zinc-50 hover:border-orange-200 cursor-pointer transition-colors">
                                        <Plus className="h-8 w-8 mb-2 text-zinc-300" />
                                        <span className="text-xs">คลิกเพื่ออัปโหลดโลโก้</span>
                                        <input
                                            type="file"
                                            className="hidden"
                                            accept="image/*"
                                            onChange={handleLogoUpload}
                                        />
                                    </label>
                                ) : (
                                    <div className="relative border-2 border-zinc-200 rounded-lg h-32 overflow-hidden">
                                        <img
                                            src={newPartner.logoPreview}
                                            alt="Logo Preview"
                                            className="w-full h-full object-contain p-4"
                                        />
                                        <button
                                            onClick={clearLogo}
                                            className="absolute top-2 right-2 p-1.5 bg-red-500 hover:bg-red-600 rounded-full text-white transition-colors"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                        <DialogFooter>
                            {error && (
                                <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                    {error}
                                </div>
                            )}
                            <Button onClick={handleAddPartner} className="bg-orange-500 text-white hover:bg-orange-600" disabled={isSaving}>
                                {isSaving ? "กำลังบันทึก..." : "บันทึก"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <div
                className={`grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 transition-all duration-300 ease-in-out ${isSectionOpen
                    ? 'opacity-100 max-h-[2000px]'
                    : 'opacity-0 max-h-0 overflow-hidden'
                    }`}
            >
                {partners.map((partner) => (
                    <Card key={partner._id} className="group relative overflow-hidden border-zinc-200 shadow-sm hover:shadow-md transition-all flex flex-col items-center p-6 text-center bg-white hover:border-orange-200">
                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                            <Button
                                size="icon"
                                variant="destructive"
                                className="h-8 w-8 rounded-full shadow-sm"
                                onClick={() => handleDeletePartner(partner._id!)}
                            >
                                <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                        </div>

                        <div className="w-24 h-24 rounded-full bg-white border border-zinc-100 shadow-sm flex items-center justify-center mb-4 p-4 group-hover:scale-105 transition-transform relative">
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

            {!isSectionOpen && (
                <div className="text-center py-8 text-zinc-400 text-sm">
                    คลิกปุ่มด้านบนเพื่อแสดงพาร์ทเนอร์ทั้งหมด ({partners.length} รายการ)
                </div>
            )}
        </div>
    )
}
