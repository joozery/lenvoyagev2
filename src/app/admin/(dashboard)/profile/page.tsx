"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Camera, Mail, User, Shield, Key } from "lucide-react"

export default function ProfilePage() {
    return (
        <div className="space-y-6 max-w-5xl mx-auto pb-10">

            {/* 1. Profile Header with Cover */}
            <div className="relative group">
                {/* Cover Image */}
                <div className="h-48 w-full bg-linear-to-r from-zinc-800 to-zinc-900 rounded-xl overflow-hidden relative">
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                    <Button variant="secondary" size="sm" className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity gap-2">
                        <Camera className="h-4 w-4" /> เปลี่ยนรูปปก
                    </Button>
                </div>

                {/* Profile Info Overlay */}
                <div className="absolute -bottom-16 left-8 flex items-end gap-6">
                    <div className="relative">
                        <div className="h-32 w-32 rounded-full bg-linear-to-br from-orange-400 to-red-500 border-4 border-white shadow-xl flex items-center justify-center text-white text-4xl font-bold">
                            A
                        </div>
                        <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-md text-zinc-600 hover:text-orange-600 transition-colors border border-zinc-100">
                            <Camera className="h-4 w-4" />
                        </button>
                    </div>
                    <div className="mb-4 pt-16">
                        <h1 className="text-3xl font-bold text-zinc-900">Admin Account</h1>
                        <p className="text-zinc-500 font-medium">ผู้ดูแลสูงสุด</p>
                    </div>
                </div>
            </div>

            <div className="h-12" /> {/* Spacer for keeping layout proper */}

            {/* 2. Content Sections */}
            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full md:w-[400px] grid-cols-2 mb-8">
                    <TabsTrigger value="general" className="gap-2">
                        <User className="h-4 w-4" /> ข้อมูลทั่วไป
                    </TabsTrigger>
                    <TabsTrigger value="security" className="gap-2">
                        <Shield className="h-4 w-4" /> ความปลอดภัย
                    </TabsTrigger>
                </TabsList>

                {/* --- General Tab --- */}
                <TabsContent value="general" className="space-y-6">
                    <div className="grid gap-6 md:grid-cols-2">
                        <Card className="border-zinc-200 shadow-sm md:col-span-2">
                            <CardHeader>
                                <CardTitle>ข้อมูลส่วนตัว</CardTitle>
                                <CardDescription>อัปเดตข้อมูลส่วนตัวและรูปภาพของคุณที่นี่</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">ชื่อจริง</label>
                                        <Input defaultValue="Admin" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-sm font-medium">นามสกุล</label>
                                        <Input defaultValue="Account" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">อีเมล</label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                        <Input defaultValue="admin@lensvoyage.com" className="pl-9" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">แนะนำตัว (Bio)</label>
                                    <textarea
                                        className="flex min-h-[100px] w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                                        defaultValue="รับผิดชอบดูแลการดำเนินงานแพลตฟอร์มทั้งหมด จัดการผู้ใช้ และดูแลเนื้อหาเว็บไซต์"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="bg-zinc-50 border-t border-zinc-100 flex justify-end gap-2 px-6 py-4">
                                <Button variant="outline">ยกเลิก</Button>
                                <Button className="bg-orange-500 hover:bg-orange-600 text-white">บันทึกการเปลี่ยนแปลง</Button>
                            </CardFooter>
                        </Card>
                    </div>
                </TabsContent>

                {/* --- Security Tab --- */}
                <TabsContent value="security" className="space-y-6">
                    <Card className="border-zinc-200 shadow-sm">
                        <CardHeader>
                            <CardTitle>เปลี่ยนรหัสผ่าน</CardTitle>
                            <CardDescription>ใช้รหัสผ่านที่รัดกุมเพื่อความปลอดภัยของบัญชี</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 max-w-lg">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">รหัสผ่านปัจจุบัน</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                    <Input type="password" placeholder="••••••••" className="pl-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">รหัสผ่านใหม่</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                    <Input type="password" placeholder="••••••••" className="pl-9" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">ยืนยันรหัสผ่านใหม่</label>
                                <div className="relative">
                                    <Key className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
                                    <Input type="password" placeholder="••••••••" className="pl-9" />
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-zinc-50 border-t border-zinc-100 flex justify-end gap-2 px-6 py-4">
                            <Button className="bg-zinc-900 hover:bg-zinc-800 text-white">อัปเดตรหัสผ่าน</Button>
                        </CardFooter>
                    </Card>

                    <Card className="border-red-100 shadow-sm bg-red-50/10">
                        <CardHeader>
                            <CardTitle className="text-red-600">พื้นที่อันตราย</CardTitle> {/* Danger Zone */}
                            <CardDescription>การดำเนินการนี้ไม่สามารถย้อนกลับได้</CardDescription>
                        </CardHeader>
                        <CardContent className="flex items-center justify-between">
                            <div>
                                <h4 className="font-medium text-zinc-900">ลบบัญชีผู้ใช้</h4>
                                <p className="text-sm text-zinc-500">ลบบัญชีและข้อมูลทั้งหมดของคุณอย่างถาวร</p>
                            </div>
                            <Button variant="destructive">ลบบัญชี</Button>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
