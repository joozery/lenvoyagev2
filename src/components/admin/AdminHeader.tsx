"use client"
import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
    Bell,
    Search,
    LogOut,
    User,
    Settings,
    Check,
    X
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { authAPI } from "@/services/api"

export function AdminHeader() {
    const router = useRouter()
    // State for Dropdowns
    const [isNotiOpen, setIsNotiOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)

    // Refs for click outside
    const notiRef = useRef<HTMLDivElement>(null)
    const profileRef = useRef<HTMLDivElement>(null)

    // Mock Notifications Data
    const [notifications, setNotifications] = useState([
        { id: 1, title: "มีรายการจองใหม่จาก Sarah", time: "5 นาทีที่แล้ว", unread: true, type: "booking" },
        { id: 2, title: "ได้รับชำระเงิน: $2,499", time: "1 ชั่วโมงที่แล้ว", unread: true, type: "payment" },
        { id: 3, title: "แจ้งเตือนการใช้งาน Server (90%)", time: "4 ชั่วโมงที่แล้ว", unread: false, type: "system" },
        { id: 4, title: "มีสมาชิกใหม่ลงทะเบียน", time: "1 วันที่แล้ว", unread: false, type: "user" },
    ])

    // Click Outside Handler
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (notiRef.current && !notiRef.current.contains(event.target as Node)) {
                setIsNotiOpen(false)
            }
            if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
                setIsProfileOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Actions
    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, unread: false })))
    }

    const clearNotification = (id: number) => {
        setNotifications(notifications.filter(n => n.id !== id))
    }

    const handleLogout = async () => {
        try {
            await authAPI.logout();
            // Clear cookie
            document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
            router.push("/admin/login");
        } catch (error) {
            console.error("Logout error:", error);
            // Force logout even if API fails
            document.cookie = "admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
            localStorage.removeItem('admin_token');
            router.push("/admin/login");
        }
    }

    const unreadCount = notifications.filter(n => n.unread).length

    return (
        <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white/80 backdrop-blur-md px-6 shadow-sm">
            <div className="flex-1">
                <div className="relative w-64 hidden md:block">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-zinc-400" />
                    <input
                        type="text"
                        placeholder="ค้นหา..."
                        className="w-full bg-zinc-100/50 border border-transparent focus:border-orange-500/50 focus:bg-white rounded-full pl-9 pr-4 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-orange-500/20"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* NOTIFICATIONS DROPDOWN */}
                <div className="relative" ref={notiRef}>
                    <button
                        onClick={() => setIsNotiOpen(!isNotiOpen)}
                        className={cn(
                            "relative p-2 rounded-full transition-all duration-200 outline-none",
                            isNotiOpen ? "bg-orange-50 text-orange-600" : "hover:bg-zinc-100 text-zinc-500 hover:text-zinc-700"
                        )}
                    >
                        <Bell className="h-5 w-5" />
                        {unreadCount > 0 && (
                            <span className="absolute top-2 right-2 w-2 h-2 bg-orange-500 rounded-full ring-2 ring-white animate-pulse"></span>
                        )}
                    </button>

                    {isNotiOpen && (
                        <div className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                            <div className="p-4 border-b border-zinc-50 flex items-center justify-center relative">
                                <h3 className="font-semibold text-sm">การแจ้งเตือน</h3>
                                {unreadCount > 0 && (
                                    <button onClick={markAllAsRead} className="absolute right-4 text-xs text-orange-600 hover:text-orange-700 font-medium">
                                        อ่านทั้งหมด
                                    </button>
                                )}
                            </div>
                            <div className="max-h-[350px] overflow-y-auto">
                                {notifications.length === 0 ? (
                                    <div className="p-8 text-center text-zinc-400 text-sm">
                                        ไม่มีรายการแจ้งเตือน
                                    </div>
                                ) : (
                                    notifications.map((noti) => (
                                        <div key={noti.id} className={cn("p-4 border-b border-zinc-50 hover:bg-zinc-50/50 transition-colors flex gap-3 group relative", noti.unread && "bg-orange-50/30")}>
                                            <div className={cn("w-2 h-2 rounded-full mt-1.5 shrink-0", noti.unread ? "bg-orange-500" : "bg-transparent")} />
                                            <div className="flex-1">
                                                <p className={cn("text-sm leading-tight mb-1", noti.unread ? "font-medium text-zinc-900" : "text-zinc-600")}>
                                                    {noti.title}
                                                </p>
                                                <p className="text-xs text-zinc-400">{noti.time}</p>
                                            </div>
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation()
                                                    clearNotification(noti.id)
                                                }}
                                                className="opacity-0 group-hover:opacity-100 absolute right-2 top-2 p-1 text-zinc-300 hover:text-zinc-500 transition-opacity"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>
                            <div className="p-2 border-t border-zinc-50 text-center">
                                <Link href="#" className="text-xs text-zinc-500 hover:text-zinc-800 block py-1">
                                    ดูทั้งหมด
                                </Link>
                            </div>
                        </div>
                    )}
                </div>

                <div className="h-8 w-px bg-zinc-200 mx-1"></div>

                {/* PROFILE DROPDOWN */}
                <div className="relative" ref={profileRef}>
                    <div
                        onClick={() => setIsProfileOpen(!isProfileOpen)}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="text-right hidden sm:block">
                            <p className="text-sm font-medium text-zinc-900 group-hover:text-orange-600 transition-colors">Admin Account</p>
                            <p className="text-xs text-zinc-500">ผู้ดูแลสูงสุด</p>
                        </div>
                        <div className={cn(
                            "h-10 w-10 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center text-white font-bold shadow-md ring-2 ring-white transition-transform duration-200",
                            isProfileOpen ? "scale-105 ring-orange-100" : "group-hover:scale-105"
                        )}>
                            A
                        </div>
                    </div>

                    {isProfileOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-zinc-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right">
                            <div className="p-4 border-b border-zinc-50">
                                <p className="text-sm font-medium text-zinc-900">Admin Account</p>
                                <p className="text-xs text-zinc-500 truncate">admin@lensvoyage.com</p>
                            </div>
                            <div className="p-2">
                                <Link
                                    href="/admin/profile"
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-md transition-colors"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <User className="h-4 w-4" /> โปรไฟล์ของฉัน
                                </Link>
                                <Link
                                    href="/admin/settings"
                                    className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-600 hover:text-zinc-900 hover:bg-zinc-50 rounded-md transition-colors"
                                    onClick={() => setIsProfileOpen(false)}
                                >
                                    <Settings className="h-4 w-4" /> ตั้งค่า
                                </Link>
                            </div>
                            <div className="p-2 border-t border-zinc-50">
                                <button
                                    className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors"
                                    onClick={handleLogout}
                                >
                                    <LogOut className="h-4 w-4" /> ออกจากระบบ
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    )
}
