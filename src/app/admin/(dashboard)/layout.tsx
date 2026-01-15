"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    Settings,
    LogOut,
    Image as ImageIcon,
    Map as MapIcon,
    Ticket,
    ShieldCheck,
    Briefcase,
    Handshake
} from "lucide-react"

import { cn } from "@/lib/utils"
// Import the new dynamic header
import { AdminHeader } from "@/components/admin/AdminHeader"

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname()

    const sidebarItems = [
        {
            title: "ภาพรวมระบบ", // Overview
            href: "/admin",
            icon: LayoutDashboard,
        },
        {
            title: "จัดการทัวร์", // Tours Management
            href: "/admin/tours",
            icon: MapIcon,
        },
        {
            title: "รายการจอง", // Bookings
            href: "/admin/bookings",
            icon: Ticket,
        },
        {
            title: "คลังรูปภาพ/วิดีโอ", // Media Library
            href: "/admin/gallery",
            icon: ImageIcon,
        },
        {
            title: "ทีมงานเบื้องหน้า", // Public Team
            href: "/admin/teams",
            icon: Briefcase,
        },
        {
            title: "พาร์ทเนอร์", // Our Partners
            href: "/admin/partners",
            icon: Handshake,
        },
        {
            title: "ลูกค้าสมาชิก", // Customers
            href: "/admin/users",
            icon: Users,
        },
        {
            title: "ผู้ดูแลระบบ", // Admin Staffs
            href: "/admin/admins",
            icon: ShieldCheck,
        },
        {
            title: "ตั้งค่าเว็บไซต์", // Settings
            href: "/admin/settings",
            icon: Settings,
        },
    ]

    return (
        <div className="flex h-screen w-full bg-zinc-50/50">
            {/* Premium Dark Sidebar */}
            <aside className="fixed inset-y-0 left-0 z-20 hidden w-64 flex-col border-r bg-zinc-900 text-zinc-100 sm:flex shadow-xl">
                <div className="flex h-16 items-center px-6 border-b border-zinc-800">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                            <span className="font-bold text-white">L</span>
                        </div>
                        <span className="text-lg font-bold tracking-tight">Lens Voyage</span>
                    </Link>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4">
                    <nav className="grid items-start gap-2">
                        <span className="text-xs font-semibold text-zinc-500 mb-2 px-2 uppercase tracking-wider">เมนูหลัก</span>
                        {sidebarItems.map((item) => {
                            const isActive = pathname === item.href
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium transition-all duration-200 group",
                                        isActive
                                            ? "bg-orange-500 text-white shadow-lg shadow-orange-500/20"
                                            : "text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800"
                                    )}
                                >
                                    <item.icon className={cn("h-4 w-4 transition-colors", isActive ? "text-white" : "text-zinc-400 group-hover:text-zinc-100")} />
                                    {item.title}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                <div className="p-4 border-t border-zinc-800 bg-zinc-900/50">
                    <div className="flex items-center gap-3 px-2 mb-4">
                        <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center">
                            <Users className="w-4 h-4 text-zinc-300" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium text-zinc-200">Admin User</span>
                            <span className="text-xs text-zinc-500">admin@lensvoyage.com</span>
                        </div>
                    </div>
                    <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-zinc-400 transition-all hover:text-red-400 hover:bg-red-400/10">
                        <LogOut className="h-4 w-4" />
                        ออกจากระบบ
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <div className="flex flex-col sm:pl-64 w-full h-full">
                {/* Modern Header - Using the robust component */}
                <AdminHeader />

                <main className="flex-1 overflow-y-auto bg-zinc-50/50 p-8">
                    <div className="max-w-7xl mx-auto space-y-8">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    )
}
