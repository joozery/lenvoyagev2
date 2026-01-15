"use client" // Ensure this is a client component if it uses hooks, though strictly not needed for static layout it's safer for future interactive enhancements
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    DollarSign,
    Users,
    CreditCard,
    Activity,
    ArrowUpRight,
    ArrowDownRight,
    MoreHorizontal,
    MapPin,
    TrendingUp
} from "lucide-react"

export default function AdminDashboard() {
    return (
        <div className="space-y-8">

            {/* 1. Stats Grid (Colored & Premium) */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {/* Total Revenue - Dark/Premium Style */}
                <Card className="bg-zinc-900 text-white border-zinc-800 shadow-lg relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                        <DollarSign className="w-24 h-24" />
                    </div>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
                        <CardTitle className="text-sm font-medium text-zinc-400">รายได้รวม</CardTitle>  {/* Total Revenue */}
                        <DollarSign className="h-4 w-4 text-emerald-400" />
                    </CardHeader>
                    <CardContent className="relative z-10">
                        <div className="text-3xl font-bold">$45,231.89</div>
                        <p className="text-xs text-zinc-400 mt-1 flex items-center gap-1">
                            <span className="text-emerald-400 flex items-center">+20.1%</span> จากเดือนที่แล้ว
                        </p>
                    </CardContent>
                </Card>

                {/* New Bookings - Orange Gradient Accent */}
                <Card className="bg-white border-zinc-200 shadow-sm relative overflow-hidden group hover:border-orange-200 transition-colors">
                    <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-orange-400 to-red-500" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">การจองใหม่</CardTitle> {/* New Bookings */}
                        <Users className="h-4 w-4 text-orange-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-zinc-900">+2350</div>
                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                            <span className="text-emerald-600 flex items-center bg-emerald-50 px-1 rounded">+180.1%</span> จากเดือนที่แล้ว
                        </p>
                    </CardContent>
                </Card>

                {/* Total Sales - Blue Style */}
                <Card className="bg-white border-zinc-200 shadow-sm relative overflow-hidden group hover:border-blue-200 transition-colors">
                    <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-blue-400 to-indigo-500" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">ยอดขายทั้งหมด</CardTitle>  {/* Total Sales */}
                        <CreditCard className="h-4 w-4 text-blue-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-zinc-900">+12,234</div>
                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                            <span className="text-emerald-600 flex items-center bg-emerald-50 px-1 rounded">+19%</span> จากเดือนที่แล้ว
                        </p>
                    </CardContent>
                </Card>

                {/* Active Now - Purple Style */}
                <Card className="bg-white border-zinc-200 shadow-sm relative overflow-hidden group hover:border-purple-200 transition-colors">
                    <div className="absolute right-0 top-0 h-full w-1 bg-gradient-to-b from-purple-400 to-pink-500" />
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-zinc-600">ใช้งานอยู่ขณะนี้</CardTitle> {/* Active Now */}
                        <Activity className="h-4 w-4 text-purple-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-zinc-900">+573</div>
                        <p className="text-xs text-zinc-500 mt-1 flex items-center gap-1">
                            <span className="text-emerald-600 flex items-center bg-emerald-50 px-1 rounded">+201</span> ตั้งแต่ชั่วโมงที่แล้ว
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:gap-8 lg:grid-cols-7">
                {/* 2. Recent Transactions (Premium Table) */}
                <Card className="lg:col-span-4 shadow-sm border-zinc-200 overflow-hidden">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <div className="flex items-center justify-between">
                            <div>
                                <CardTitle className="text-lg font-bold text-zinc-900">รายการล่าสุด</CardTitle> {/* Recent Transactions */}
                                <CardDescription>มีการจองเข้ามา 23 รายการในเดือนนี้</CardDescription> {/* You made 265 sales this month. */}
                            </div>
                            <button className="text-sm font-medium text-orange-600 hover:text-orange-700">ดูทั้งหมด</button> {/* View All */}
                        </div>
                    </CardHeader>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left">
                                <thead className="bg-zinc-50 text-zinc-500 font-medium border-b border-zinc-100">
                                    <tr>
                                        <th className="px-6 py-3">ลูกค้า</th> {/* Customer */}
                                        <th className="px-6 py-3">แพ็คเกจ</th> {/* Package */}
                                        <th className="px-6 py-3">สถานะ</th> {/* Status */}
                                        <th className="px-6 py-3 text-right">ยอดเงิน</th> {/* Amount */}
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-50">
                                    {[
                                        { name: "Olivia Martin", email: "olivia.martin@email.com", amount: "$1,999.00", status: "สำเร็จ", tour: "Iceland Aurora" },
                                        { name: "Jackson Lee", email: "jackson.lee@email.com", amount: "$39.00", status: "รอดำเนินการ", tour: "Kyoto Day Trip" },
                                        { name: "Isabella Nguyen", email: "isabella.nguyen@email.com", amount: "$299.00", status: "ไม่สำเร็จ", tour: "Vietnam Ha Long" },
                                        { name: "William Kim", email: "will@email.com", amount: "$99.00", status: "สำเร็จ", tour: "City Photo Walk" },
                                        { name: "Sofia Davis", email: "sofia.davis@email.com", amount: "$39.00", status: "สำเร็จ", tour: "Portrait Session" }
                                    ].map((item, i) => (
                                        <tr key={i} className="group hover:bg-zinc-50/50 transition-colors">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-zinc-100 to-zinc-200 flex items-center justify-center font-bold text-xs text-zinc-600">
                                                        {item.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-zinc-900">{item.name}</p>
                                                        <p className="text-xs text-zinc-500">{item.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 text-zinc-600">{item.tour}</td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                                        ${item.status === 'สำเร็จ' ? 'bg-green-50 text-green-700 ring-1 ring-green-600/20' :
                                                        item.status === 'รอดำเนินการ' ? 'bg-yellow-50 text-yellow-700 ring-1 ring-yellow-600/20' :
                                                            'bg-red-50 text-red-700 ring-1 ring-red-600/20'}`}>
                                                    {item.status}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-right font-medium text-zinc-900">{item.amount}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>

                {/* 3. Top Destinations (Visualized) */}
                <Card className="lg:col-span-3 shadow-sm border-zinc-200">
                    <CardHeader className="border-b border-zinc-100 bg-zinc-50/50 py-4">
                        <CardTitle className="text-lg font-bold text-zinc-900">จุดหมายยอดนิยม</CardTitle> {/* Top Destinations */}
                        <CardDescription>ประเทศที่มีการจองมากที่สุดในเดือนนี้</CardDescription> {/* Most booked countries this month. */}
                    </CardHeader>
                    <CardContent className="p-6 space-y-6">
                        {[
                            { country: "Iceland", percentage: 75, color: "bg-blue-500", icon: "🇮🇸" },
                            { country: "Japan", percentage: 60, color: "bg-rose-400", icon: "🇯🇵" },
                            { country: "New Zealand", percentage: 45, color: "bg-emerald-500", icon: "🇳🇿" },
                            { country: "Norway", percentage: 30, color: "bg-indigo-500", icon: "🇳🇴" },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex items-center justify-between text-sm font-medium">
                                    <span className="flex items-center gap-2 text-zinc-700"><span className="text-lg">{item.icon}</span> {item.country}</span>
                                    <span className="text-zinc-500">{item.percentage}%</span>
                                </div>
                                <div className="h-2 w-full bg-zinc-100 rounded-full overflow-hidden">
                                    <div className={`h-full ${item.color} rounded-full`} style={{ width: `${item.percentage}%` }} />
                                </div>
                            </div>
                        ))}

                        {/* Insight Card */}
                        <div className="mt-8 p-4 bg-orange-50 rounded-lg border border-orange-100 flex gap-3 items-start">
                            <TrendingUp className="w-5 h-5 text-orange-600 mt-0.5 shrink-0" />
                            <div>
                                <h4 className="text-sm font-semibold text-orange-800">แนะนำ: โปรโมททัวร์กลุ่มนอร์ดิก</h4> {/* Pro Tip: Promote Nordic Tours */}
                                <p className="text-xs text-orange-600/80 mt-1 leading-relaxed">
                                    ยอดจอง Iceland และ Norway รวมกันสูงกว่า 65% ในช่วงนี้ ควรเพิ่มงบโฆษณาในกลุ่มนี้
                                </p>
                            </div>
                        </div>

                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
