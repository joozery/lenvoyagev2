"use client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Lock, Palette, Search } from "lucide-react"

export default function SettingsPage() {
    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">ตั้งค่าเว็บไซต์</h2> {/* Website Settings */}
                <p className="text-zinc-500">จัดการการตั้งค่าทั่วไป การแสดงผล และ SEO ของเว็บไซต์</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="general" className="gap-2">
                        <Globe className="h-4 w-4" /> ทั่วไป
                    </TabsTrigger>
                    <TabsTrigger value="seo" className="gap-2">
                        <Search className="h-4 w-4" /> SEO
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6 mt-6">
                    <Card className="border-zinc-200 shadow-sm">
                        <CardHeader>
                            <CardTitle>ข้อมูลทั่วไป</CardTitle>
                            <CardDescription>รายละเอียดพื้นฐานของเว็บไซต์ที่แสดงให้ลูกค้าเห็น</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">ชื่อเว็บไซต์</label>
                                <Input defaultValue="Lens Voyage" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">คำอธิบาย</label>
                                <Input defaultValue="ทัวร์ถ่ายภาพระดับพรีเมียมและเวิร์คช็อปการถ่ายภาพ" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">อีเมลติดต่อ</label>
                                <Input defaultValue="contact@lensvoyage.com" />
                            </div>
                        </CardContent>
                        <CardFooter className="bg-zinc-50 border-t border-zinc-100 px-6 py-4 flex justify-end">
                            <Button className="bg-zinc-900 text-white hover:bg-zinc-800">บันทึกการเปลี่ยนแปลง</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* SEO Settings */}
                <TabsContent value="seo" className="space-y-6 mt-6">
                    <Card className="border-zinc-200 shadow-sm">
                        <CardHeader>
                            <CardTitle>การตั้งค่า SEO</CardTitle>
                            <CardDescription>เพิ่มประสิทธิภาพเว็บไซต์ของคุณสำหรับการค้นหาบน Search Engine</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Meta Title (หน้าแรก)</label>
                                <Input defaultValue="Lens Voyage - ทัวร์ถ่ายภาพพรีเมียม" />
                                <p className="text-xs text-zinc-500">แนะนำความยาวไม่เกิน 60 ตัวอักษร</p>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Meta Keywords</label>
                                <Input defaultValue="ทัวร์ถ่ายภาพ, เวิร์คช็อปถ่ายภาพ, ท่องเที่ยว, กล้อง" />
                                <p className="text-xs text-zinc-500">คั่นแต่ละคำด้วยเครื่องหมายจุลภาค (,)</p>
                            </div>
                        </CardContent>
                        <CardFooter className="bg-zinc-50 border-t border-zinc-100 px-6 py-4 flex justify-end">
                            <Button className="bg-zinc-900 text-white hover:bg-zinc-800">บันทึกการเปลี่ยนแปลง</Button>
                        </CardFooter>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
