export function RemindersCard() {
  return (
    <div className="bg-amber-50 border border-amber-200 rounded-3xl p-5 text-sm text-amber-800">
      <p className="font-semibold mb-2">ข้อควรทราบ</p>
      <ul className="space-y-1.5 text-amber-700">
        <li>• หนังสือเดินทางต้องมีอายุ &gt; 6 เดือน</li>
        <li>• ชำระมัดจำ 50% ภายใน 3 วันหลังจอง</li>
        <li>• เตรียมเสื้อผ้าตามสภาพอากาศ</li>
      </ul>
    </div>
  );
}
