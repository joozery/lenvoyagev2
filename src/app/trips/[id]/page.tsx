import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { MOCK_TRIPS, getMockTripData } from "@/lib/mockTrips";
import TripDetailsClient from "./TripDetailsClient";

interface TripDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return MOCK_TRIPS.map((trip) => ({ id: trip.id }));
}

export async function generateMetadata({ params }: TripDetailPageProps): Promise<Metadata> {
  const { id: tripId } = await params;
  const trip = MOCK_TRIPS.find((item) => item.id === tripId);

  if (!trip) {
    return { title: "ทริปไม่พบ" };
  }

  return {
    title: `${trip.name} | Len Voyage`,
    description: `รายละเอียดแพ็กเกจ ${trip.name} เดินทางไป ${trip.country}`,
    openGraph: {
      images: [trip.image],
    },
  };
}

export default async function TripDetailPage({ params }: TripDetailPageProps) {
  const { id: tripId } = await params;
  if (!tripId) notFound();

  const data = getMockTripData(tripId);
  if (!data) notFound();

  return (
    <TripDetailsClient
      trip={data.trip}
      schedules={data.schedules}
      gallery={data.gallery}
      itinerary={data.itinerary}
      faqs={data.faqs}
    />
  );
}
