"use client"
import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Upload, Image as ImageIcon, Trash2, Film, PlayCircle, X } from "lucide-react"
import { galleryAPI, uploadAPI, GalleryItem } from "@/services/api"

export default function GalleryPage() {
    const [images, setImages] = useState<GalleryItem[]>([])
    const [videos, setVideos] = useState<GalleryItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [isUploading, setIsUploading] = useState(false)
    const [selectedVideo, setSelectedVideo] = useState<GalleryItem | null>(null)

    const fileInputRef = useRef<HTMLInputElement>(null)

    // Fetch gallery items on mount
    useEffect(() => {
        fetchGallery()
    }, [])

    const fetchGallery = async () => {
        try {
            setIsLoading(true)
            setError("")

            // Fetch all gallery items (admin can see invisible ones)
            const allItems = await galleryAPI.getAll(undefined, true)
            const imageItems = allItems.filter(item => item.type === 'image')
            const videoItems = allItems.filter(item => item.type === 'video')

            setImages(imageItems)
            setVideos(videoItems)
        } catch (err: any) {
            console.error("Failed to fetch gallery:", err)
            setError("ไม่สามารถโหลดข้อมูลคลังรูปภาพและวิดีโอได้")
        } finally {
            setIsLoading(false)
        }
    }

    const handleUploadClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]
        if (!file) return

        setIsUploading(true)
        setError("")

        try {
            const isVideo = file.type.startsWith('video/')
            const fileType = isVideo ? 'video' : 'image'

            // Upload directly to Cloudinary (bypasses Next.js body size limit)
            const uploadData = await uploadAPI.uploadFile(file, fileType)

            // Create gallery item
            const galleryItem: Partial<GalleryItem> = {
                title: file.name.replace(/\.[^/.]+$/, ""), // Remove extension
                imageUrl: uploadData.url,
                publicId: uploadData.publicId,
                type: isVideo ? 'video' : 'image',
                isVisible: true,
                order: isVideo ? videos.length : images.length,
            }

            await galleryAPI.create(galleryItem)

            // Refresh gallery
            await fetchGallery()
        } catch (err: any) {
            console.error("Failed to upload file:", err)
            // Extract error message from various possible error formats
            const errorMessage = err?.message || err?.response?.data?.error || err?.response?.data?.message || "ไม่สามารถอัปโหลดไฟล์ได้"
            setError(errorMessage)
            alert(`อัปโหลดไม่สำเร็จ: ${errorMessage}`)
        } finally {
            setIsUploading(false)
            // Reset input
            e.target.value = ""
        }
    }

    const handleDelete = async (id: string, type: 'image' | 'video') => {
        if (!confirm(`คุณแน่ใจหรือไม่ที่จะลบ${type === 'image' ? 'รูปภาพ' : 'วิดีโอ'}นี้?`)) return

        try {
            await galleryAPI.delete(id)
            await fetchGallery()
        } catch (err: any) {
            console.error("Failed to delete:", err)
            setError("ไม่สามารถลบไฟล์ได้")
        }
    }

    if (isLoading) {
        return (
            <div className="flex items-center justify-center py-20">
                <p className="text-zinc-500">กำลังโหลด...</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-900">คลังรูปภาพและวิดีโอ</h2>
                    <p className="text-zinc-500">จัดการไฟล์สื่อสำหรับแสดงบนเว็บไซต์ของคุณ</p>
                </div>

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*,video/*"
                    onChange={handleFileChange}
                    disabled={isUploading}
                />

                <Button
                    onClick={handleUploadClick}
                    disabled={isUploading}
                    className="bg-orange-500 hover:bg-orange-600 text-white gap-2 shadow-lg shadow-orange-500/20 disabled:opacity-50"
                >
                    <Upload className="h-4 w-4" /> {isUploading ? 'กำลังอัปโหลด...' : 'อัปโหลดใหม่'}
                </Button>
            </div>

            {error && (
                <div className="bg-red-50 border border-red-200 text-red-800 rounded-lg px-4 py-3">
                    {error}
                </div>
            )}

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
                                <div key={img._id} className="group relative aspect-square bg-white rounded-lg overflow-hidden border border-zinc-200 shadow-sm cursor-pointer hover:shadow-md transition-shadow">
                                    <img 
                                        src={img.imageUrl} 
                                        alt={img.title || 'Gallery image'} 
                                        className="w-full h-full object-cover" 
                                    />

                                    {/* Visibility Badge */}
                                    {!img.isVisible && (
                                        <div className="absolute top-2 left-2 bg-zinc-600 text-white text-xs px-2 py-1 rounded">
                                            ซ่อน
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
                                                handleDelete(img._id!, 'image')
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {/* Info Bar */}
                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/80 to-transparent">
                                        <p className="text-xs text-white truncate font-medium">{img.title || 'ไม่มีชื่อ'}</p>
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
                                <div 
                                    key={video._id} 
                                    className="group relative aspect-video bg-zinc-900 rounded-lg overflow-hidden border border-zinc-200 shadow-sm cursor-pointer hover:shadow-lg transition-all"
                                    onClick={() => setSelectedVideo(video)}
                                >
                                    {/* Video Thumbnail - Using imageUrl if available, otherwise placeholder */}
                                    {video.imageUrl ? (
                                        <img 
                                            src={video.imageUrl} 
                                            alt={video.title || 'Video'} 
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800">
                                            <PlayCircle className="h-12 w-12 text-white/50 group-hover:text-orange-500 transition-colors" />
                                        </div>
                                    )}

                                    {/* Visibility Badge */}
                                    {!video.isVisible && (
                                        <div className="absolute top-2 left-2 bg-zinc-600 text-white text-xs px-2 py-1 rounded z-20">
                                            ซ่อน
                                        </div>
                                    )}

                                    {/* Play Icon Overlay */}
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/30 transition-colors">
                                        <PlayCircle className="h-16 w-16 text-white/70 group-hover:text-orange-500 transition-colors" />
                                    </div>

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 backdrop-blur-xs z-10">
                                        <Button
                                            size="icon"
                                            variant="destructive"
                                            className="h-9 w-9 rounded-full shadow-lg hover:scale-110 transition-transform"
                                            onClick={(e) => {
                                                e.stopPropagation()
                                                handleDelete(video._id!, 'video')
                                            }}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black/90 via-black/60 to-transparent">
                                        <p className="text-sm text-white truncate font-medium mb-0.5">{video.title || 'ไม่มีชื่อ'}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </TabsContent>
            </Tabs>

            {/* Video Preview Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm" onClick={() => setSelectedVideo(null)}>
                    <div className="relative w-full max-w-4xl mx-4" onClick={(e) => e.stopPropagation()}>
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute -top-12 right-0 text-white hover:text-orange-500 transition-colors z-10"
                        >
                            <X className="w-8 h-8" />
                        </button>
                        <div className="bg-zinc-900 rounded-lg overflow-hidden">
                            <video
                                src={selectedVideo.imageUrl}
                                controls
                                autoPlay
                                className="w-full aspect-video"
                            >
                                Your browser does not support the video tag.
                            </video>
                            <div className="p-4">
                                <h3 className="text-white text-lg font-semibold">{selectedVideo.title || 'Video'}</h3>
                                {selectedVideo.description && (
                                    <p className="text-zinc-400 text-sm mt-2">{selectedVideo.description}</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
