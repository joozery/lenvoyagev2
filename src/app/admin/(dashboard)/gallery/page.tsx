"use client"
import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Image as ImageIcon, Trash2, Film, PlayCircle, X } from "lucide-react"

export default function GalleryPage() {
    // 1. Initial State
    const [images, setImages] = useState([
        { id: 1, name: "gallery-beach.jpg", size: "1.2 MB", src: "/gallery-beach.jpg" },
        { id: 2, name: "gallery-lavender.jpg", size: "2.4 MB", src: "/gallery-lavender.jpg" },
        { id: 3, name: "tour-iceland.jpg", size: "3.1 MB", src: "/tour-iceland.jpg" },
        { id: 4, name: "tour-japan.jpg", size: "1.8 MB", src: "/tour-japan.jpg" },
        { id: 5, name: "header-bg.jpg", size: "4.5 MB", src: "/header-bg.jpg" }
    ])

    const [videos, setVideos] = useState([
        { id: 1, name: "Iceland_Drone_Footage.mp4", duration: "02:45", size: "124 MB" },
        { id: 2, name: "Customer_Testimonial.mp4", duration: "01:10", size: "45 MB" },
        { id: 3, name: "Tour_Highlight_Japan.mp4", duration: "03:20", size: "201 MB" },
    ])

    // Refs
    const fileInputRef = useRef<HTMLInputElement>(null)

    // 2. Handlers
    const handleDeleteImage = (id: number) => {
        if (confirm("คุณแน่ใจหรือไม่ที่จะลบรูปภาพนี้?")) {
            setImages(images.filter(img => img.id !== id))
        }
    }

    const handleDeleteVideo = (id: number) => {
        if (confirm("คุณแน่ใจหรือไม่ที่จะลบวิดีโอนี้?")) {
            setVideos(videos.filter(v => v.id !== id))
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        // Simulate Upload logic
        const isVideo = file.type.startsWith('video/')
        const newId = Date.now() // Simple ID generation

        if (isVideo) {
            setVideos([...videos, {
                id: newId,
                name: file.name,
                duration: "00:00", // Cannot get duration easily without reading file
                size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`
            }])
            // Switch tab to videos if needed (optional)
            alert(`อัปโหลดวิดีโอ "${file.name}" สำเร็จ!`)
        } else {
            // Create object URL for preview
            const objectUrl = URL.createObjectURL(file)
            setImages([...images, {
                id: newId,
                name: file.name,
                size: `${(file.size / (1024 * 1024)).toFixed(2)} MB`,
                src: objectUrl // Use local preview
            }])
        }

        // Reset input
        e.target.value = ""
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">คลังรูปภาพและวิดีโอ</h2> {/* Media Library */}
                    <p className="text-zinc-500">จัดการไฟล์สื่อสำหรับแสดงบนเว็บไซต์ของคุณ</p>
                </div>

                {/* Hidden File Input */}
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                />

                <Button
                    onClick={handleUploadClick}
                    className="bg-orange-500 hover:bg-orange-600 text-white gap-2 shadow-lg shadow-orange-500/20"
                >
                    <Upload className="h-4 w-4" /> อัปโหลดใหม่
                </Button>
            </div>

            <Tabs defaultValue="images" className="w-full">
                <div className="flex items-center justify-between mb-6">
                    <TabsList className="grid w-[400px] grid-cols-2">
                        <TabsTrigger value="images" className="gap-2">
                            <ImageIcon className="h-4 w-4" /> รูปภาพ
                        </TabsTrigger>
                        <TabsTrigger value="videos" className="gap-2">
                            <Film className="h-4 w-4" /> วิดีโอ
                        </TabsTrigger>
                    </TabsList>

                    <div className="text-sm text-zinc-500">
                        ทั้งหมด: <span className="font-medium text-zinc-900">{images.length + videos.length} รายการ</span>
                    </div>
                </div>

                {/* IMAGES TAB */}
                <TabsContent value="images" className="mt-0">
                    {images.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50">
                            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ImageIcon className="h-8 w-8 text-zinc-400" />
                            </div>
                            <p className="text-zinc-500 font-medium">ยังไม่มีรูปภาพ</p>
                            <Button variant="link" onClick={handleUploadClick} className="text-orange-500">คลิกเพื่ออัปโหลด</Button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                            {images.map((img) => (
                                <div key={img.id} className="group relative aspect-square bg-white rounded-lg overflow-hidden border border-zinc-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                                    {/* Image Preview (Use Object URL or fallback) */}
                                    {img.src.startsWith('blob:') ? (
                                        <img src={img.src} alt={img.name} className="w-full h-full object-cover" />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100">
                                            <ImageIcon className="h-10 w-10 text-zinc-300" />
                                        </div>
                                    )}

                                    {/* Delete Button Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-sm z-10">
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="h-9 w-9 rounded-full shadow-lg hover:scale-110 transition-transform"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDeleteImage(img.id)
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* Info Bar */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-xs text-white truncate font-medium">{img.name}</p>
                                        <p className="text-[10px] text-zinc-300">{img.size}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </TabsContent>

                {/* VIDEOS TAB */}
                <TabsContent value="videos" className="mt-0">
                    {videos.length === 0 ? (
                        <div className="text-center py-20 border-2 border-dashed border-zinc-200 rounded-xl bg-zinc-50">
                            <div className="w-16 h-16 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Film className="h-8 w-8 text-zinc-400" />
                            </div>
                            <p className="text-zinc-500 font-medium">ยังไม่มีวิดีโอ</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {videos.map((video) => (
                                <div key={video.id} className="group relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 shadow-sm cursor-pointer hover:shadow-lg transition-all">
                                    {/* Mock Video Thumbnail */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                                        <PlayCircle className="h-12 w-12 text-white/50 group-hover:text-orange-500 transition-colors" />
                                    </div>
                                    <div className="absolute top-2 right-2 bg-black/70 px-2 py-0.5 rounded text-xs text-white font-mono">
                                        {video.duration}
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs z-10">
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="h-9 w-9 rounded-full shadow-lg hover:scale-110 transition-transform"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDeleteVideo(video.id)
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                        <p className="text-sm text-white truncate font-medium mb-0.5">{video.name}</p>
                                        <p className="text-xs text-zinc-400">{video.size}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>
        </div>
    )
}
