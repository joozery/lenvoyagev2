"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "@/components/ui/rich-text-editor"

export interface ItineraryItemData {
  day: number
  title: string
  details: string
}

interface ItineraryDayModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: ItineraryItemData) => void
  initialData?: ItineraryItemData | null
  nextDayNumber?: number
}

export function ItineraryDayModal({
  isOpen,
  onClose,
  onSave,
  initialData,
  nextDayNumber = 1,
}: ItineraryDayModalProps) {
  const [day, setDay] = useState<number>(nextDayNumber)
  const [title, setTitle] = useState("")
  const [details, setDetails] = useState("")

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setDay(initialData.day)
        setTitle(initialData.title)
        setDetails(initialData.details)
      } else {
        setDay(nextDayNumber)
        setTitle("")
        setDetails("")
      }
    }
  }, [isOpen, initialData, nextDayNumber])

  const handleSave = () => {
    onSave({
      day,
      title,
      details,
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            {initialData ? 'แก้ไขวันเดินทาง' : 'เพิ่มวันเดินทาง'}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 flex items-center gap-1">
              วันที่ <span className="text-red-500">*</span>
            </label>
            <Input
              type="number"
              value={day}
              onChange={(e) => setDay(parseInt(e.target.value) || 0)}
              className="h-11"
            />
            <p className="text-xs text-zinc-500">ระบุเป็นตัวเลข เช่น 1, 2, 3</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700 flex items-center gap-1">
              ชื่อวัน <span className="text-red-500">*</span>
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="เช่น Bangkok -> Oslo -> Bodø -> Leknes"
              className="h-11"
            />
            <p className="text-xs text-zinc-500">{title.length}/255 ตัวอักษร</p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-zinc-700">รายละเอียด</label>
            <RichTextEditor
              content={details}
              onChange={setDetails}
              placeholder="รายละเอียดของวันเดินทาง..."
            />
          </div>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose} className="border-zinc-200">
            ยกเลิก
          </Button>
          <Button onClick={handleSave} className="bg-orange-600 hover:bg-orange-700 text-white">
            {initialData ? 'บันทึก' : 'เพิ่มวัน'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
