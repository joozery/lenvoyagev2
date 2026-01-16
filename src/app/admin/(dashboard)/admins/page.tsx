"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Plus, Search, MoreVertical, Filter, Lock, Trash2 } from "lucide-react"
import { adminsAPI, AdminUser } from "@/services/api"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function AdminsPage() {
    const [admins, setAdmins] = useState<AdminUser[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const [isSaving, setIsSaving] = useState(false)

    const [newAdmin, setNewAdmin] = useState({
        username: "",
        email: "",
        password: "",
        role: "admin" as "admin" | "super-admin"
    })

    // Fetch admins on mount
    useEffect(() => {
        fetchAdmins()
    }, [])

    const fetchAdmins = async () => {
        try {
            setIsLoading(true)
            const data = await adminsAPI.getAll()
            setAdmins(data)
            setError("")
        } catch (err: any) {
            console.error("Failed to fetch admins:", err)
            setError("ไม่สามารถโหลดข้อมูลผู้ดูแลระบบได้")
        } finally {
            setIsLoading(false)
        }
    }

    const handleAddAdmin = async () => {
        if (!newAdmin.username || !newAdmin.email || !newAdmin.password) {
            setError("กรุณากรอกข้อมูลให้ครบถ้วน")
            return
        }

        setIsSaving(true)
        setError("")

        try {
            await adminsAPI.create(newAdmin)
            await fetchAdmins()
            setNewAdmin({ username: "", email: "", password: "", role: "admin" })
            setIsDialogOpen(false)
        } catch (err: any) {
            console.error("Failed to create admin:", err)
            setError(err.response?.data?.error || "ไม่สามารถสร้างผู้ดูแลระบบได้")
        } finally {
            setIsSaving(false)
        }
    }

    const handleDeleteAdmin = async (id: string) => {
        if (!confirm("คุณแน่ใจหรือไม่ที่จะลบผู้ดูแลระบบรายนี้?")) return

        try {
            await adminsAPI.delete(id)
            await fetchAdmins()
        } catch (err: any) {
            console.error("Failed to delete admin:", err)
            setError(err.response?.data?.error || "ไม่สามารถลบผู้ดูแลระบบได้")
        }
    }

    const activeAdmins = admins.filter(a => a.lastLogin &&
        new Date().getTime() - new Date(a.lastLogin).getTime() < 3600000) // Active in last hour

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">ผู้ดูแลระบบ</h2>
                    <p className="text-zinc-500">จัดการสิทธิ์การเข้าถึงและทีมงานผู้ดูแลระบบ</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-zinc-900 text-white hover:bg-zinc-800 gap-2 shadow-lg shadow-zinc-900/20">
                            <Plus className="h-4 w-4" /> เพิ่มผู้ดูแลใหม่
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>เพิ่มผู้ดูแลระบบใหม่</DialogTitle>
                            <DialogDescription>สร้างบัญชีผู้ดูแลระบบใหม่</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">ชื่อผู้ใช้</label>
                                <Input
                                    value={newAdmin.username}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, username: e.target.value })}
                                    placeholder="admin123"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">อีเมล</label>
                                <Input
                                    type="email"
                                    value={newAdmin.email}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, email: e.target.value })}
                                    placeholder="admin@lensvoyage.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">รหัสผ่าน</label>
                                <Input
                                    type="password"
                                    value={newAdmin.password}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, password: e.target.value })}
                                    placeholder="••••••••"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">บทบาท</label>
                                <select
                                    value={newAdmin.role}
                                    onChange={(e) => setNewAdmin({ ...newAdmin, role: e.target.value as "admin" | "super-admin" })}
                                    className="w-full border border-zinc-200 rounded-md px-3 py-2"
                                >
                                    <option value="admin">Admin</option>
                                    <option value="super-admin">Super Admin</option>
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            {error && (
                                <div className="w-full mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                                    {error}
                                </div>
                            )}
                            <Button onClick={handleAddAdmin} disabled={isSaving}>
                                {isSaving ? "กำลังบันทึก..." : "บันทึก"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-white border-zinc-200 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">ผู้ดูแลทั้งหมด</p>
                            <h3 className="text-2xl font-bold text-zinc-900">{admins.length}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-zinc-200 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">ใช้งานอยู่ขณะนี้</p>
                            <h3 className="text-2xl font-bold text-zinc-900">{activeAdmins.length}</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-zinc-200 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                            <Lock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">สถานะความปลอดภัย</p>
                            <h3 className="text-2xl font-bold text-green-600">ปลอดภัย</h3>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Table */}
            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-zinc-200 shadow-sm mt-8">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                    <Input
                        placeholder="ค้นหาผู้ดูแล..."
                        className="pl-9 bg-zinc-50 border-zinc-200"
                    />
                </div>
                <Button variant="outline" className="text-zinc-600 gap-2">
                    <Filter className="h-4 w-4" /> บทบาท
                </Button>
            </div>

            <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-0">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                            <tr>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">ชื่อ / อีเมล</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">บทบาท</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">สร้างเมื่อ</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">เข้าสู่ระบบล่าสุด</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500 text-right">การจัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {isLoading ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-zinc-500">กำลังโหลด...</td>
                                </tr>
                            ) : admins.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-zinc-500">ไม่พบผู้ดูแลระบบ</td>
                                </tr>
                            ) : (
                                admins.map((admin) => (
                                    <tr key={admin._id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                                        <td className="p-6 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold">
                                                    {admin.username.charAt(0).toUpperCase()}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-zinc-900">{admin.username}</p>
                                                    <p className="text-xs text-zinc-500">{admin.email}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle">
                                            <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${admin.role === 'super-admin'
                                                    ? 'bg-purple-50 text-purple-700 ring-purple-600/20'
                                                    : 'bg-blue-50 text-blue-700 ring-blue-600/20'
                                                }`}>
                                                {admin.role === 'super-admin' ? 'ผู้ดูแลสูงสุด' : 'ผู้ดูแล'}
                                            </span>
                                        </td>
                                        <td className="p-6 align-middle text-zinc-600">
                                            {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString('th-TH') : '-'}
                                        </td>
                                        <td className="p-6 align-middle text-zinc-500">
                                            {admin.lastLogin ? new Date(admin.lastLogin).toLocaleString('th-TH') : 'ยังไม่เคยเข้าสู่ระบบ'}
                                        </td>
                                        <td className="p-6 align-middle text-right">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-zinc-400 hover:text-red-600"
                                                onClick={() => handleDeleteAdmin(admin._id!)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
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
