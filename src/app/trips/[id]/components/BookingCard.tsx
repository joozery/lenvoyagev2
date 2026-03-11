"use client";

import type { Trip, GographySchedule } from "@/lib/mockTrips";

function currency(value: number) {
  return `฿${value.toLocaleString("th-TH")}`;
}

const statusLabel = {
  open: "เปิดจอง",
  full: "เต็มแล้ว",
  coming_soon: "เร็วๆ นี้",
} as const;

const statusColor = {
  open: "bg-emerald-100 text-emerald-700",
  full: "bg-red-100 text-red-700",
  coming_soon: "bg-blue-100 text-blue-700",
} as const;

interface BookingCardProps {
  trip: Trip;
  schedules: GographySchedule[];
  selectedScheduleId: string;
  onScheduleChange: (id: string) => void;
  onBook: () => void;
  onShare: () => void;
}

export function BookingCard({ trip, schedules, selectedScheduleId, onScheduleChange, onBook, onShare }: BookingCardProps) {
  const selectedSchedule = schedules.find((s) => s.id === selectedScheduleId) ?? schedules[0];

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-md" id="book">
      <p className="text-sm text-gray-500 mb-1">ราคาเริ่มต้น</p>
      <p className="text-3xl font-bold text-gray-900">
        {trip.formatted_price ?? currency(trip.price)}
      </p>
      <p className="text-sm text-gray-400 mb-6">ต่อท่าน (ไม่รวมภาษีสนามบิน)</p>

      <div className="mb-5">
        <p className="text-sm font-semibold text-gray-700 mb-3">เลือกรอบเดินทาง</p>
        <div className="space-y-2">
          {schedules.map((s) => (
            <button
              key={s.id}
              onClick={() => s.status !== "full" && onScheduleChange(s.id)}
              disabled={s.status === "full"}
              className={`w-full text-left p-4 rounded-2xl border-2 transition ${
                selectedScheduleId === s.id
                  ? "border-[#ff5e00] bg-orange-50"
                  : s.status === "full"
                  ? "border-gray-100 bg-gray-50 opacity-60 cursor-not-allowed"
                  : "border-gray-200 hover:border-[#ff5e00]/50 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{s.dates}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{s.duration}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full font-medium flex-shrink-0 ${statusColor[s.status]}`}>
                  {statusLabel[s.status]}
                </span>
              </div>
              {s.status !== "full" && (
                <p className="text-xs text-gray-400 mt-2">
                  เหลือ {s.seatsAvailable} / {s.totalSeats} ที่นั่ง
                </p>
              )}
            </button>
          ))}
        </div>
      </div>

      {selectedSchedule && (
        <div className="bg-gray-50 rounded-2xl p-4 mb-5 text-sm">
          <div className="flex justify-between text-gray-600 mb-1">
            <span>รอบที่เลือก</span>
            <span className="font-medium text-gray-800">{selectedSchedule.dates}</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>ระยะเวลา</span>
            <span className="font-medium text-gray-800">{selectedSchedule.duration}</span>
          </div>
        </div>
      )}

      <button
        onClick={onBook}
        className="w-full py-3.5 bg-[#06C755] hover:bg-[#05b34c] text-white font-semibold rounded-2xl transition flex items-center justify-center gap-2 mb-3"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.02 2 11c0 2.7 1.24 5.11 3.2 6.79L4 22l4.36-1.28A10.17 10.17 0 0012 21c5.52 0 10-4.02 10-9S17.52 2 12 2z" />
        </svg>
        จองผ่าน Line
      </button>

      <button
        onClick={onShare}
        className="w-full py-3 border border-gray-200 hover:border-gray-300 text-gray-600 font-medium rounded-2xl transition flex items-center justify-center gap-2 text-sm"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="18" cy="5" r="3" /><circle cx="6" cy="12" r="3" /><circle cx="18" cy="19" r="3" />
          <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" /><line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
        </svg>
        แชร์ทริปนี้
      </button>
    </div>
  );
}
