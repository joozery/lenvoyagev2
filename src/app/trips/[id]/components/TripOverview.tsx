import type { Trip } from "@/lib/mockTrips";

interface TripOverviewProps {
  trip: Trip;
}

export function TripOverview({ trip }: TripOverviewProps) {
  const highlights = [
    `เก็บภาพแลนด์สเคปไฮไลต์ของ ${trip.country}`,
    "ลิ้มลองเมนูพื้นถิ่นและร้านดังที่คัดสรร",
    "โรงแรมระดับพรีเมียมและเดินทางแบบสบาย",
    "ทีมบริการส่วนตัวพร้อมดูแลทุกจังหวะ",
  ];

  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-8 shadow-sm">
      <span className="inline-block text-xs uppercase tracking-widest text-[#ff5e00] bg-orange-50 px-4 py-2 rounded-full mb-4">
        Trip Overview
      </span>
      <h2 className="text-2xl font-bold text-gray-900 mb-3">
        สัมผัส {trip.country} แบบเอ็กซ์คลูซีฟกับทีมงานมืออาชีพ
      </h2>
      <p className="text-gray-600 leading-relaxed mb-6">
        {trip.name} เน้นประสบการณ์เชิงลึก คัดสรรสถานที่ถ่ายภาพและช่วงเวลาที่ดีที่สุด
        ให้คุณได้ใช้เวลาช้าๆ กับธรรมชาติและวัฒนธรรม พร้อมบริการดูแลตลอดทริปโดยทีมงานที่มีประสบการณ์
      </p>
      <div className="grid grid-cols-2 gap-4">
        {highlights.map((h) => (
          <div key={h} className="flex gap-3 text-sm text-gray-700">
            <span className="mt-1.5 h-2 w-2 rounded-full bg-[#ff5e00] flex-shrink-0" />
            <span>{h}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
