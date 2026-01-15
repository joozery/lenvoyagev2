"use client"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ShieldCheck, Plus, Search, MoreVertical, Filter, Lock } from "lucide-react"

export default function AdminsPage() {
    const admins = [
        {
            id: 1,
            name: "Admin Account",
            email: "admin@lensvoyage.com",
            role: "Super Admin", // ผู้ดูแลสูงสุด
            accessLevel: "Full Access", // เข้าถึงทั้งหมด
            status: "Online", // ออนไลน์
            lastActive: "Now" // ขณะนี้
        },
        {
            id: 2,
            name: "Sarah Condor",
            email: "sarah@lensvoyage.com",
            role: "Content Manager", // ผู้จัดการเนื้อหา
            accessLevel: "Media, Blogs", // สื่อ, บล็อก
            status: "Offline", // ออฟไลน์
            lastActive: "2h ago" // 2 ชม. ที่แล้ว
        },
        {
            id: 3,
            name: "Mike Ross",
            email: "mike@lensvoyage.com",
            role: "Support Lead", // หัวหน้าฝ่ายสนับสนุน
            accessLevel: "Users, Bookings", // ผู้ใช้, การจอง
            status: "Online",
            lastActive: "5m ago" // 5 นาทีที่แล้ว
        }
    ]

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">ผู้ดูแลระบบ</h2> {/* Admin Staffs */}
                    <p className="text-zinc-500">จัดการสิทธิ์การเข้าถึงและทีมงานผู้ดูแลระบบ</p>
                </div>
                <Button className="bg-zinc-900 text-white hover:bg-zinc-800 gap-2 shadow-lg shadow-zinc-900/20">
                    <Plus className="h-4 w-4" /> เพิ่มผู้ดูแลใหม่
                </Button>
            </div>

            {/* Stats Overview */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card className="bg-white border-zinc-200 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                            <ShieldCheck className="h-6 w-6 text-blue-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">ผู้ดูแลทั้งหมด</p> {/* Total Admins */}
                            <h3 className="text-2xl font-bold text-zinc-900">8</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-zinc-200 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                            <div className="h-3 w-3 bg-green-500 rounded-full animate-pulse" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">ใช้งานอยู่ขณะนี้</p> {/* Active Now */}
                            <h3 className="text-2xl font-bold text-zinc-900">3</h3>
                        </div>
                    </CardContent>
                </Card>
                <Card className="bg-white border-zinc-200 shadow-sm">
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center">
                            <Lock className="h-6 w-6 text-orange-600" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-zinc-500">สถานะความปลอดภัย</p> {/* Security Status */}
                            <h3 className="text-2xl font-bold text-green-600">ปลอดภัย</h3> {/* Secure */}
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
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">การเข้าถึง</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">สถานะ</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500">ใช้งานล่าสุด</th>
                                <th className="h-12 px-6 align-middle font-semibold text-zinc-500 text-right"></th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {admins.map((admin) => (
                                <tr key={admin.id} className="border-b border-zinc-100 last:border-0 hover:bg-zinc-50/50">
                                    <td className="p-6 align-middle">
                                        <div className="flex items-center gap-3">
                                            <div className="h-9 w-9 rounded-full bg-zinc-900 text-white flex items-center justify-center font-bold">
                                                {admin.name.charAt(0)}
                                            </div>
                                            <div>
                                                <p className="font-medium text-zinc-900">{admin.name}</p>
                                                <p className="text-xs text-zinc-500">{admin.email}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="p-6 align-middle">
                                        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ring-1 ring-inset ${admin.role === 'Super Admin' ? 'bg-purple-50 text-purple-700 ring-purple-600/20' :
                                                'bg-blue-50 text-blue-700 ring-blue-600/20'
                                            }`}>
                                            {admin.role === 'Super Admin' ? 'ผู้ดูแลสูงสุด' :
                                                admin.role === 'Content Manager' ? 'ผู้จัดการเนื้อหา' :
                                                    'หัวหน้าฝ่ายสนับสนุน'}
                                        </span>
                                    </td>
                                    <td className="p-6 align-middle text-zinc-600">
                                        {admin.accessLevel === 'Full Access' ? 'เข้าถึงทั้งหมด' :
                                            admin.accessLevel === 'Media, Blogs' ? 'สื่อ, บล็อก' : 'ผู้ใช้, การจอง'}
                                    </td>
                                    <td className="p-6 align-middle">
                                        <div className="flex items-center gap-1.5">
                                            <div className={`h-2 w-2 rounded-full ${admin.status === 'Online' ? 'bg-green-500' : 'bg-zinc-300'}`} />
                                            <span className="text-zinc-600">{admin.status === 'Online' ? 'ออนไลน์' : 'ออฟไลน์'}</span>
                                        </div>
                                    </td>
                                    <td className="p-6 align-middle text-zinc-500">
                                        {admin.lastActive === 'Now' ? 'ขณะนี้' :
                                            admin.lastActive === '2h ago' ? '2 ชม. ที่แล้ว' : '5 นาทีที่แล้ว'}
                                    </td>
                                    <td className="p-6 align-middle text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900">
                                            <MoreVertical className="h-4 w-4" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </CardContent>
            </Card>
        </div>
    )
}
