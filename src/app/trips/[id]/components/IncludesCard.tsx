const INCLUDES = [
  "ตั๋วเครื่องบินไป-กลับ พร้อมสัมภาระ 30 กก.",
  "ที่พัก 4-5 ดาว พร้อมอาหารเช้า",
  "รถโค้ชส่วนตัวและคนขับท้องถิ่น",
  "หัวหน้าทัวร์ไทยดูแลเต็มเวลา",
  "ประกันการเดินทางสูงสุด 3 ล้านบาท",
];

const EXCLUDES = [
  "ค่าใช้จ่ายส่วนตัวและทิป",
  "ค่าวีซ่า (ถ้ามี)",
  "ค่าอาหารนอกเหนือโปรแกรม",
];

export function IncludesCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
      <h4 className="font-semibold text-gray-900 mb-4">สิ่งที่รวมในแพ็กเกจ</h4>
      <ul className="space-y-2 text-sm text-gray-600 mb-5">
        {INCLUDES.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-emerald-500 mt-0.5">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-2">ไม่รวม</p>
      <ul className="space-y-2 text-sm text-gray-500">
        {EXCLUDES.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="text-red-400 mt-0.5">✕</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
