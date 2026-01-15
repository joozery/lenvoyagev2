"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Search, Filter, MoreVertical, Eye, CheckCircle, XCircle, Clock } from "lucide-react"

export default function BookingsPage() {
    const [bookings, setBookings] = useState([
        {
            id: "ORD-001",
            customer: "Alicia Smith",
            tour: "Aurora Hunting in Iceland",
            date: "24 ต.ค. 2024",
            amount: "$2,499.00",
            status: "ชำระแล้ว", // Paid
            paymentMethod: "Credit Card"
        },
        {
            id: "ORD-002",
            customer: "Michael Johnson",
            tour: "Kyoto Cherry Blossom",
            date: "12 พ.ย. 2024",
            amount: "$1,250.00", // Deposit
            status: "รอดำเนินการ", // Pending
            paymentMethod: "Bank Transfer"
        },
        {
            id: "ORD-003",
            customer: "Sarah Williams",
            tour: "New Zealand Landscape",
            date: "05 ธ.ค. 2024",
            amount: "$4,200.00",
            status: "ชำระแล้ว",
            paymentMethod: "PayPal"
        },
        {
            id: "ORD-004",
            customer: "David Brown",
            tour: "Vietnam Photography Tour",
            date: "15 ม.ค. 2025",
            amount: "$950.00",
            status: "ยกเลิก", // Cancelled
            paymentMethod: "Credit Card"
        },
        {
            id: "ORD-005",
            customer: "Emily Davis",
            tour: "Aurora Hunting in Iceland",
            date: "02 ก.พ. 2025",
            amount: "$2,499.00",
            status: "ชำระแล้ว",
            paymentMethod: "Credit Card"
        }
    ])

    // Search State
    const [searchQuery, setSearchQuery] = useState("")

    // Handlers
    const handleStatusChange = (id: string) => {
        // Simple toggle logic for demo: Pending -> Paid -> Cancelled -> Pending
        setBookings(bookings.map(b => {
            if (b.id === id) {
                let newStatus = b.status
                if (b.status === "รอดำเนินการ") newStatus = "ชำระแล้ว" // Pending -> Paid
                else if (b.status === "ชำระแล้ว") newStatus = "ยกเลิก" // Paid -> Cancelled
                else newStatus = "รอดำเนินการ" // Cancelled -> Pending
                return { ...b, status: newStatus }
            }
            return b
        }))
    }

    // Filter
    const filteredBookings = bookings.filter(b =>
        b.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.customer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.tour.toLowerCase().includes(searchQuery.toLowerCase())
    )

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">รายการจอง</h2> {/* Bookings */}
                    <p className="text-zinc-500">จัดการและติดตามสถานะการจองของลูกค้า</p>
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="gap-2">
                        <Filter className="h-4 w-4" /> ตัวกรอง
                    </Button>
                    <Button className="bg-zinc-900 text-white hover:bg-zinc-800">
                        ส่งออก CSV
                    </Button>
                </div>
            </div>

            <div className="flex items-center gap-4 bg-white p-4 rounded-lg border border-zinc-200 shadow-sm">
                <Search className="h-4 w-4 text-zinc-400" />
                <Input
                    placeholder="ค้นหาด้วย เลขที่คำสั่งซื้อ, ชื่อลูกค้า หรือ ชื่อทัวร์..."
                    className="border-none shadow-none focus-visible:ring-0 px-0 bg-transparent"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <Card className="border-zinc-200 shadow-sm">
                <CardContent className="p-0">
                    <table className="w-full caption-bottom text-sm text-left">
                        <thead className="bg-zinc-50 border-b border-zinc-200">
                            <tr>
                                <th className="h-10 px-6 align-middle font-semibold text-zinc-500">เลขที่คำสั่งซื้อ</th>
                                <th className="h-10 px-6 align-middle font-semibold text-zinc-500">ลูกค้า & ทัวร์</th>
                                <th className="h-10 px-6 align-middle font-semibold text-zinc-500">วันที่จอง</th>
                                <th className="h-10 px-6 align-middle font-semibold text-zinc-500">จำนวนเงิน</th>
                                <th className="h-10 px-6 align-middle font-semibold text-zinc-500">สถานะ</th>
                                <th className="h-10 px-6 align-middle font-semibold text-zinc-500 text-right">จัดการ</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white">
                            {filteredBookings.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-zinc-500">
                                        ไม่พบรายการจอง
                                    </td>
                                </tr>
                            ) : (
                                filteredBookings.map((booking) => (
                                    <tr key={booking.id} className="border-b border-zinc-100 hover:bg-zinc-50/50">
                                        <td className="p-6 align-middle font-mono text-zinc-500">{booking.id}</td>
                                        <td className="p-6 align-middle">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-zinc-900">{booking.customer}</span>
                                                <span className="text-xs text-zinc-500">{booking.tour}</span>
                                            </div>
                                        </td>
                                        <td className="p-6 align-middle text-zinc-600">{booking.date}</td>
                                        <td className="p-6 align-middle font-medium text-zinc-900">{booking.amount}</td>
                                        <td className="p-6 align-middle">
                                            {/* Interactive Status Badge */}
                                            <button
                                                onClick={() => handleStatusChange(booking.id)}
                                                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold cursor-pointer transition-all hover:scale-105 active:scale-95 ${booking.status === 'ชำระแล้ว'
                                                        ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                                        : booking.status === 'รอดำเนินการ'
                                                            ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                                                            : 'bg-red-100 text-red-700 hover:bg-red-200'
                                                    }`}
                                                title="คลิกเพื่อเปลี่ยนสถานะ"
                                            >
                                                {booking.status === 'ชำระแล้ว' && <CheckCircle className="h-3 w-3" />}
                                                {booking.status === 'รอดำเนินการ' && <Clock className="h-3 w-3" />}
                                                {booking.status === 'ยกเลิก' && <XCircle className="h-3 w-3" />}
                                                {booking.status}
                                            </button>
                                        </td>
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

            {/* Footer Info */}
            <div className="flex items-center justify-between text-sm text-zinc-500">
                <div>แสดง {filteredBookings.length} จาก {bookings.length} รายการ</div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>ก่อนหน้า</Button>
                    <Button variant="outline" size="sm" disabled>ถัดไป</Button>
                </div>
            </div>
        </div>
    )
}
