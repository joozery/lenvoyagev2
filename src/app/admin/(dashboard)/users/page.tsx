"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Users, MoreVertical, Mail, Shield, Plus, Ban, CheckCircle, Search } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function UsersPage() {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Admin User",
            email: "admin@lensvoyage.com",
            role: "ผู้ดูแลสูงสุด", // Super Admin
            status: "ใช้งาน", // Active
            joined: "12 ม.ค. 2024"
        },
        {
            id: 2,
            name: "John Doe",
            email: "john@lensvoyage.com",
            role: "ไกด์นำเที่ยว", // Tour Guide
            status: "ใช้งาน",
            joined: "04 ก.พ. 2024"
        },
        {
            id: 3,
            name: "Alicia Smith",
            email: "alicia@example.com",
            role: "ลูกค้า", // Customer
            status: "ใช้งาน",
            joined: "10 มี.ค. 2025"
        },
        {
            id: 4,
            name: "Michael Johnson",
            email: "michael@example.com",
            role: "ลูกค้า",
            status: "ระงับการใช้งาน", // Inactive
            joined: "12 มี.ค. 2025"
        }
    ])

    // Search
    const [searchQuery, setSearchQuery] = useState("")

    // Add User State
    const [isOpen, setIsOpen] = useState(false)
    const [newUser, setNewUser] = useState({ name: "", email: "", role: "ลูกค้า" })

    // Handlers
    const handleAddUser = () => {
        if (!newUser.name || !newUser.email) return
        const id = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1

        setUsers([...users, {
            id,
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            status: "ใช้งาน",
            joined: new Date().toLocaleDateString('th-TH', { month: 'short', day: '2-digit', year: 'numeric' })
        }])

        setNewUser({ name: "", email: "", role: "ลูกค้า" })
        setIsOpen(false)
    }

    const toggleStatus = (id: number) => {
        setUsers(users.map(u => {
            if (u.id === id) {
                return { ...u, status: u.status === 'ใช้งาน' ? 'ระงับการใช้งาน' : 'ใช้งาน' }
            }
            return u
        }))
    }

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        u.email.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">ลูกค้าสมาชิก</h2> {/* Customers */}
                    <p className="text-zinc-500">จัดการสิทธิ์ผู้ใช้งานและบัญชีลูกค้า</p>
                </div>

                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-zinc-900 text-white hover:bg-zinc-800 gap-2">
                            <Plus className="h-4 w-4" /> เพิ่มผู้ใช้
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>เพิ่มผู้ใช้ใหม่</DialogTitle>
                            <DialogDescription>สร้างบัญชีใหม่ด้วยตนเอง</DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">ชื่อ - นามสกุล</label>
                                <Input
                                    value={newUser.name}
                                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                                    placeholder="เช่น สมชาย ใจดี"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">อีเมล</label>
                                <Input
                                    type="email"
                                    value={newUser.email}
                                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">บทบาท</label>
                                <select
                                    className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                                    value={newUser.role}
                                    onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                                >
                                    <option value="ลูกค้า">ลูกค้า</option>
                                    <option value="ไกด์นำเที่ยว">ไกด์นำเที่ยว</option>
                                    <option value="ผู้ดูแลระบบ">ผู้ดูแลระบบ</option>
                                </select>
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={handleAddUser} className="bg-zinc-900 text-white">บันทึก</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Search Bar */}
            <div className="flex items-center gap-2 max-w-md bg-white p-2 rounded-md border border-zinc-200">
                <Search className="h-4 w-4 text-zinc-400 ml-2" />
                <Input
                    placeholder="ค้นหาด้วยชื่อ หรือ อีเมล..."
                    className="border-none shadow-none focus-visible:ring-0 px-2 h-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-0">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                            <tr>
                                <th className="h-10 px-6 align-middle font-semibold text-zinc-500">ชื่อ / อีเมล</th>
                                <th className="h-10 px-6 align-middle font-semibold text-zinc-500">บทบาท</th>
                                <th className="h-10 px-6 align-middle font-semibold text-zinc-500">สถานะ</th>
                                <th className="h-10 px-6 align-middle font-semibold text-zinc-500">วันที่เข้าร่วม</th>
                                <th className="h-10 px-6 align-middle font-semibold text-zinc-500 text-right">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="p-8 text-center text-zinc-500">ไม่พบผู้ใช้</td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="border-b border-zinc-100 hover:bg-zinc-50/50">
                                        <td className="p-6 align-middle">
                                            <div className="flex items-center gap-3">
                                                <div className="h-9 w-9 rounded-full bg-zinc-100 flex items-center justify-center text-zinc-500 font-bold border border-zinc-200">
                                                    {user.name.charAt(0)}
                                                </div>
                                                <div className="flex flex-col">
                                                    <span className="font-medium text-zinc-900">{user.name}</span>
                                                    <div className="flex items-center gap-1 text-zinc-500 text-xs">
                                                        <Mail className="h-3 w-3" /> {user.email}
                                                    </div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle">
                                            <div className="flex items-center gap-2 text-zinc-700">
                                                <Shield className="h-3 w-3 text-zinc-400" /> {user.role}
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle">
                                            <button
                                                onClick={() => toggleStatus(user.id)}
                                                className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium cursor-pointer transition-colors ${user.status === 'ใช้งาน'
                                                        ? 'bg-green-100 text-green-700 hover:bg-red-100 hover:text-red-700'
                                                        : 'bg-zinc-100 text-zinc-500 hover:bg-green-100 hover:text-green-700'
                                                    }`}
                                                title="คลิกเพื่อเปลี่ยนสถานะ"
                                            >
                                                {user.status}
                                            </button>
                                        </td>
                                        <td className="p-6 align-middle text-zinc-500">{user.joined}</td>
                                        <td className="p-6 align-middle text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                                <MoreVertical className="h-4 w-4" />
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
