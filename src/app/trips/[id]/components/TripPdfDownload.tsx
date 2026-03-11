interface TripPdfDownloadProps {
  url: string;
}

export function TripPdfDownload({ url }: TripPdfDownloadProps) {
  return (
    <div className="bg-orange-50 border border-orange-200 rounded-3xl p-6 flex items-center justify-between gap-4">
      <div>
        <p className="font-semibold text-gray-900">รายละเอียดโปรแกรมฉบับเต็ม</p>
        <p className="text-sm text-gray-500 mt-1">ดาวน์โหลด PDF เพื่ออ่านโปรแกรมและเงื่อนไขทั้งหมด</p>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-shrink-0 px-6 py-3 bg-[#ff5e00] text-white font-semibold rounded-full hover:bg-[#e05400] transition text-sm"
      >
        ดาวน์โหลด PDF
      </a>
    </div>
  );
}
