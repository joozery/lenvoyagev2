"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Search, MessageCircle } from "lucide-react"

interface SettingsData {
    facebookUrl: string;
    lineUrl: string;
    phoneNumber: string;
    email: string;
}

export default function SettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [settings, setSettings] = useState<SettingsData>({
        facebookUrl: '',
        lineUrl: '',
        phoneNumber: '',
        email: ''
    });

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const res = await fetch('/api/settings');
                const data = await res.json();
                if (data.success) {
                    setSettings({
                        facebookUrl: data.data.facebookUrl || '',
                        lineUrl: data.data.lineUrl || '',
                        phoneNumber: data.data.phoneNumber || '',
                        email: data.data.email || ''
                    });
                }
            } catch (error) {
                console.error('Failed to fetch settings:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchSettings();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setSettings(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            const res = await fetch('/api/settings', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(settings),
            });
            const data = await res.json();
            if (data.success) {
                alert('บันทึกการตั้งค่าเรียบร้อยแล้ว');
            } else {
                alert('เกิดข้อผิดพลาดในการบันทึก');
            }
        } catch (error) {
            console.error('Failed to save settings:', error);
            alert('เกิดข้อผิดพลาดในการบันทึก');
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return <div className="p-8 text-center text-zinc-500">กำลังโหลดข้อมูล...</div>;
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto">
            <div>
                <h2 className="text-3xl font-bold tracking-tight text-zinc-900">ตั้งค่าเว็บไซต์</h2>
                <p className="text-zinc-500">จัดการการตั้งค่าทั่วไป ข้อมูลการติดต่อ และ Social Media</p>
            </div>

            <Tabs defaultValue="general" className="w-full">
                <TabsList className="grid w-full grid-cols-2 lg:w-[400px]">
                    <TabsTrigger value="general" className="gap-2">
                        <Globe className="h-4 w-4" /> ทั่วไป & ติดต่อ
                    </TabsTrigger>
                    <TabsTrigger value="seo" className="gap-2">
                        <Search className="h-4 w-4" /> SEO
                    </TabsTrigger>
                </TabsList>

                {/* General Settings */}
                <TabsContent value="general" className="space-y-6 mt-6">
                    <Card className="border-zinc-200 shadow-sm">
                        <CardHeader>
                            <CardTitle>ข้อมูลการติดต่อ & Social Media</CardTitle>
                            <CardDescription>ช่องทางการติดต่อที่แสดงบนหน้าเว็บไซต์และปุ่ม Floating Chat</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Facebook Link</label>
                                <div className="relative">
                                    <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                                    <Input
                                        name="facebookUrl"
                                        value={settings.facebookUrl}
                                        onChange={handleChange}
                                        placeholder="https://facebook.com/page..."
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">Line ID / Link</label>
                                <div className="relative">
                                    <MessageCircle className="absolute left-3 top-3 h-4 w-4 text-zinc-400" />
                                    <Input
                                        name="lineUrl"
                                        value={settings.lineUrl}
                                        onChange={handleChange}
                                        placeholder="https://line.me/ti/p/..."
                                        className="pl-9"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">อีเมลติดต่อ</label>
                                <Input
                                    name="email"
                                    value={settings.email}
                                    onChange={handleChange}
                                    placeholder="contact@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium">เบอร์โทรศัพท์</label>
                                <Input
                                    name="phoneNumber"
                                    value={settings.phoneNumber}
                                    onChange={handleChange}
                                    placeholder="02-xxx-xxxx"
                                />
                            </div>
                        </CardContent>
                        <CardFooter className="bg-zinc-50 border-t border-zinc-100 px-6 py-4 flex justify-end">
                            <Button
                                onClick={handleSave}
                                disabled={saving}
                                className="bg-zinc-900 text-white hover:bg-zinc-800"
                            >
                                {saving ? "กำลังบันทึก..." : "บันทึกการเปลี่ยนแปลง"}
                            </Button>
                        </CardFooter>
                    </Card>
                </TabsContent>

                {/* SEO Settings (Static for now as requested focus is on Contact) */}
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
