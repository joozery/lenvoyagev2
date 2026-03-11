import Image from "next/image";
import Link from "next/link";
import type { Trip, GographySchedule } from "@/lib/mockTrips";

function currency(value: number) {
  return `฿${value.toLocaleString("th-TH")}`;
}

interface TripHeroProps {
  trip: Trip;
  firstSchedule: GographySchedule | undefined;
}

export function TripHero({ trip, firstSchedule }: TripHeroProps) {
  return (
    <section className="relative h-[55vh] min-h-[380px] w-full">
      <Image src={trip.image} alt={trip.name} fill className="object-cover" priority />
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/40 to-black/70" />

      <div className="absolute top-0 left-0 right-0 pt-24 px-6">
        <div className="max-w-7xl mx-auto">
          <nav className="flex items-center gap-2 text-sm text-white/80">
            <Link href="/" className="hover:text-white transition">หน้าแรก</Link>
            <span>/</span>
            <Link href="/trips" className="hover:text-white transition">ทริปทั้งหมด</Link>
            <span>/</span>
            <span className="text-white">{trip.name}</span>
          </nav>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 pb-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-2xl">{trip.flag}</span>
            <span className="text-white/80 text-sm uppercase tracking-widest">{trip.country}</span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight max-w-3xl">
            {trip.name}
          </h1>
          <div className="flex flex-wrap gap-3">
            <span className="px-4 py-2 bg-white/20 backdrop-blur rounded-full text-white text-sm font-medium border border-white/30">
              {firstSchedule?.duration ?? ""}
            </span>
            <span className="px-4 py-2 bg-[#ff5e00] rounded-full text-white text-sm font-semibold">
              ตั้งแต่ {trip.formatted_price ?? currency(trip.price)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
