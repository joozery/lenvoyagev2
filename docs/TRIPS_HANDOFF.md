# Developer Handoff: Trips Detail Page + Admin CRUD

## Overview

หน้า `/trips/[id]` ทำเสร็จแล้วโดยใช้ **mock data** ใน `src/lib/mockTrips.ts`
ถัดไปคือ: สร้าง DB schema → สร้าง API → swap mock ออก

---

## Tech Stack

| Layer | Tech |
|-------|------|
| Framework | Next.js 15 + React 19 + TypeScript |
| Database | MongoDB Atlas via Mongoose — `src/lib/mongodb.ts` |
| Images | Cloudinary (thumbnail, gallery) |
| PDFs | Cloudflare R2 |
| Auth | JWT — `src/app/api/auth/` |
| Styles | Tailwind CSS v4 |

---

## Current State: Mock → Real

```
src/lib/mockTrips.ts          ← source of truth ของ data shape (interfaces + mock data)
src/app/trips/[id]/page.tsx   ← server component, เรียก getMockTripData(id)
src/app/trips/[id]/TripDetailsClient.tsx  ← client UI ทุก section
src/models/Tour.ts            ← existing Tour model (ต้อง extend)
src/app/api/tours/            ← API pattern ที่ต้องทำตาม
```

ตอนนี้ `page.tsx:38` เรียก `getMockTripData(tripId)` → ต้องแทนด้วย `fetch('/api/trips/[id]')`

---

## Section 1: MongoDB Schemas ที่ต้องสร้าง

### Design Decision

ใช้ **mixed approach**:
- `trips` collection — extend `Tour.ts` ที่มีอยู่, เพิ่ม fields ที่ขาด
- `trip_schedules` — **แยก collection** เพราะ 1 trip มีหลาย schedules และ admin ต้องแก้แต่ละรอบได้อิสระ
- `trip_gallery`, `trip_itinerary_days`, `trip_faqs` — **แยก collection** เพื่อให้ CRUD แต่ละส่วนไม่กระทบกัน

---

### 1.1 trips collection (extend Tour.ts)

`src/models/Tour.ts` มีอยู่แล้ว แต่ขาด fields ต่อไปนี้:

```typescript
// src/models/Trip.ts  (สร้างใหม่ หรือ extend Tour.ts)
import mongoose, { Schema, Document, Model } from 'mongoose';

export interface ITrip extends Document {
  name: string;
  country: string;       // เพิ่มจาก Tour (Tour ใช้ "location")
  flag: string;          // emoji flag เช่น "🇮🇸"
  price: number;
  formatted_price?: string;  // เช่น "฿89,000"
  image: {
    url: string;
    publicId: string;    // Cloudinary public ID
  };
  pdf?: {
    url: string;
    publicId: string;    // R2 key
  };
  tagline?: string;
  overview?: string;
  highlights?: string[];
  services?: {
    includes: string[];
    excludes: string[];
  };
  reminders?: string[];
  status: 'เปิดขาย' | 'เร็วๆนี้' | 'ร่าง';
  createdAt: Date;
  updatedAt: Date;
}

const TripSchema: Schema = new Schema({
  name: { type: String, required: true, trim: true },
  country: { type: String, required: true, trim: true },
  flag: { type: String, default: '' },
  price: { type: Number, required: true, min: 0 },
  formatted_price: { type: String },
  image: {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  pdf: {
    url: String,
    publicId: String,
  },
  tagline: { type: String },
  overview: { type: String },
  highlights: [{ type: String }],
  services: {
    includes: [{ type: String }],
    excludes: [{ type: String }],
  },
  reminders: [{ type: String }],
  status: {
    type: String,
    enum: ['เปิดขาย', 'เร็วๆนี้', 'ร่าง'],
    default: 'ร่าง',
  },
}, { timestamps: true });

TripSchema.index({ status: 1, createdAt: -1 });
TripSchema.index({ country: 1 });

const Trip: Model<ITrip> = mongoose.models.Trip || mongoose.model<ITrip>('Trip', TripSchema);
export default Trip;
```

---

### 1.2 trip_schedules collection

```typescript
// src/models/TripSchedule.ts
export interface ITripSchedule extends Document {
  trip_id: mongoose.Types.ObjectId;  // ref: 'Trip'
  dates: string;          // "15 - 22 ม.ค. 2568"
  duration: string;       // "8 วัน 7 คืน"
  startDate: Date;        // ISO date สำหรับ sort/filter
  seatsAvailable: number;
  totalSeats: number;
  price?: number;         // override trip.price ได้ (optional)
  status: 'open' | 'full' | 'coming_soon';
}

const TripScheduleSchema: Schema = new Schema({
  trip_id: { type: Schema.Types.ObjectId, ref: 'Trip', required: true, index: true },
  dates: { type: String, required: true },
  duration: { type: String, required: true },
  startDate: { type: Date, required: true },
  seatsAvailable: { type: Number, required: true, min: 0, default: 0 },
  totalSeats: { type: Number, required: true, min: 1 },
  price: { type: Number },
  status: { type: String, enum: ['open', 'full', 'coming_soon'], default: 'open' },
}, { timestamps: true });

TripScheduleSchema.index({ trip_id: 1, startDate: 1 });
```

---

### 1.3 trip_gallery collection

```typescript
// src/models/TripGallery.ts
export interface ITripGallery extends Document {
  trip_id: mongoose.Types.ObjectId;
  storage_url: string;    // Cloudinary URL
  publicId: string;       // Cloudinary public ID (สำหรับลบ)
  title: string;
  description: string;
  alt_text: string;
  order_index: number;    // เรียงลำดับรูป
}

const TripGallerySchema: Schema = new Schema({
  trip_id: { type: Schema.Types.ObjectId, ref: 'Trip', required: true, index: true },
  storage_url: { type: String, required: true },
  publicId: { type: String, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  alt_text: { type: String, default: '' },
  order_index: { type: Number, default: 0 },
}, { timestamps: true });

TripGallerySchema.index({ trip_id: 1, order_index: 1 });
```

---

### 1.4 trip_itinerary_days collection

```typescript
// src/models/TripItineraryDay.ts
const ActivityItemSchema = new Schema({
  activity_time: { type: String },   // "09:00"
  activity_description: { type: String },
}, { _id: true });

const DayImageSchema = new Schema({
  storage_url: { type: String },
  publicId: { type: String },
  caption: { type: String },
  alt_text: { type: String },
}, { _id: true });

export interface ITripItineraryDay extends Document {
  trip_id: mongoose.Types.ObjectId;
  day_number: number;
  day_title: string;
  day_description: string;
  activities?: { activity_time: string; activity_description: string }[];
  images?: { storage_url: string; publicId: string; caption: string; alt_text: string }[];
}

const TripItineraryDaySchema: Schema = new Schema({
  trip_id: { type: Schema.Types.ObjectId, ref: 'Trip', required: true, index: true },
  day_number: { type: Number, required: true },
  day_title: { type: String, required: true },
  day_description: { type: String, default: '' },
  activities: [ActivityItemSchema],
  images: [DayImageSchema],
}, { timestamps: true });

TripItineraryDaySchema.index({ trip_id: 1, day_number: 1 });
```

---

### 1.5 trip_faqs collection

```typescript
// src/models/TripFAQ.ts
export interface ITripFAQ extends Document {
  trip_id: mongoose.Types.ObjectId;
  question: string;
  answer: string;
  images?: { storage_url: string; publicId: string; caption: string; alt_text: string }[];
  order_index: number;
}

const TripFAQSchema: Schema = new Schema({
  trip_id: { type: Schema.Types.ObjectId, ref: 'Trip', required: true, index: true },
  question: { type: String, required: true },
  answer: { type: String, required: true },
  images: [DayImageSchema],  // reuse DayImageSchema จาก itinerary
  order_index: { type: Number, default: 0 },
}, { timestamps: true });

TripFAQSchema.index({ trip_id: 1, order_index: 1 });
```

---

## Section 2: API Routes ที่ต้องสร้าง

ทำตาม pattern ของ `src/app/api/tours/` — connectDB → query → return `{ success: true, data }`

### Public Routes (ไม่ต้อง auth)

```
GET  /api/trips               → list trips (status = 'เปิดขาย' | 'เร็วๆนี้')
GET  /api/trips/[id]          → trip detail + schedules + gallery + itinerary + faqs
```

### Admin Routes (ต้อง JWT auth via verifyRequest)

```
POST   /api/trips             → create trip
PUT    /api/trips/[id]        → update trip core fields
DELETE /api/trips/[id]        → delete trip + cascade delete schedules/gallery/itinerary/faqs

GET    /api/trips/[id]/schedules      → list schedules
POST   /api/trips/[id]/schedules      → add schedule
PUT    /api/trips/[id]/schedules/[sid] → update schedule
DELETE /api/trips/[id]/schedules/[sid] → delete schedule

GET    /api/trips/[id]/gallery        → list gallery images
POST   /api/trips/[id]/gallery        → upload image (multipart → Cloudinary)
PUT    /api/trips/[id]/gallery/[gid]  → update metadata (title/description/order)
DELETE /api/trips/[id]/gallery/[gid]  → delete + remove from Cloudinary

GET    /api/trips/[id]/itinerary      → list days sorted by day_number
POST   /api/trips/[id]/itinerary      → add day
PUT    /api/trips/[id]/itinerary/[did] → update day (including activities/images arrays)
DELETE /api/trips/[id]/itinerary/[did] → delete day

GET    /api/trips/[id]/faqs           → list faqs sorted by order_index
POST   /api/trips/[id]/faqs           → add faq
PUT    /api/trips/[id]/faqs/[fid]     → update faq
DELETE /api/trips/[id]/faqs/[fid]     → delete faq
```

### Response Shape สำหรับ GET /api/trips/[id]

```typescript
// response ที่ TripDetailsClient ต้องการ
{
  success: true,
  data: {
    trip: ITrip,
    schedules: (ITripSchedule & { price: number })[],
    gallery: ITripGallery[],
    itinerary: ITripItineraryDay[],
    faqs: ITripFAQ[],
  }
}
```

---

## Section 3: Admin CRUD UI

### Admin Pages ที่ต้องสร้าง (ทำตาม pattern ใน `/admin/tours/`)

```
/admin/trips                  → list all trips
/admin/trips/new              → create trip form
/admin/trips/[id]             → edit trip core (name, country, price, overview, ...)
/admin/trips/[id]/schedules   → manage schedules (list + add/edit/delete)
/admin/trips/[id]/gallery     → manage gallery (drag-to-reorder, upload, delete)
/admin/trips/[id]/itinerary   → manage itinerary days (accordion per day)
/admin/trips/[id]/faqs        → manage FAQs (reorderable list)
```

### Admin Flow แนะนำ

1. **สร้าง trip** → กรอก `name`, `country`, `flag`, `price`, `overview`, `highlights`, `services`, `reminders`, อัปโหลด thumbnail
2. **เพิ่ม schedules** → สร้างหลายรอบ แต่ละรอบมี dates/duration/startDate/seats/status
3. **อัปโหลด gallery** → drag-drop รูป → Cloudinary → บันทึก `storage_url` + `publicId` + metadata
4. **สร้าง itinerary** → สร้างทีละวัน → เพิ่ม activities (time + description) + อัปโหลดรูปประจำวัน
5. **สร้าง FAQs** → เพิ่ม Q&A พร้อมรูปประกอบ (optional)

---

## Section 4: Swap Mock Data → Real API

### page.tsx ปัจจุบัน (src/app/trips/[id]/page.tsx)

```typescript
// บรรทัด 38: เรียก mock
const data = getMockTripData(tripId);
```

### page.tsx หลัง swap

```typescript
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import TripDetailsClient from "./TripDetailsClient";

interface TripDetailPageProps {
  params: Promise<{ id: string }>;
}

// ลบ generateStaticParams ออก หรือ fetch จาก DB แทน
// export async function generateStaticParams() { ... }

export async function generateMetadata({ params }: TripDetailPageProps): Promise<Metadata> {
  const { id: tripId } = await params;
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trips/${tripId}`, {
    cache: 'no-store',
  });
  if (!res.ok) return { title: "ทริปไม่พบ" };
  const { data } = await res.json();
  return {
    title: `${data.trip.name} | Len Voyage`,
    description: `รายละเอียดแพ็กเกจ ${data.trip.name} เดินทางไป ${data.trip.country}`,
    openGraph: { images: [data.trip.image.url] },
  };
}

export default async function TripDetailPage({ params }: TripDetailPageProps) {
  const { id: tripId } = await params;

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/trips/${tripId}`, {
    cache: 'no-store',
  });

  if (!res.ok) notFound();

  const { data } = await res.json();

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
```

> `TripDetailsClient.tsx` **ไม่ต้องแก้** — props types ตรงกับ interface ใน `mockTrips.ts`
> แค่ย้าย interfaces ไปไฟล์ใหม่ `src/types/trips.ts` เมื่อลบ mockTrips.ts ออก

---

## Section 5: Implementation Checklist

### Phase 1 — Database
- [ ] สร้าง `src/models/Trip.ts`
- [ ] สร้าง `src/models/TripSchedule.ts`
- [ ] สร้าง `src/models/TripGallery.ts`
- [ ] สร้าง `src/models/TripItineraryDay.ts`
- [ ] สร้าง `src/models/TripFAQ.ts`

### Phase 2 — API
- [ ] `src/app/api/trips/route.ts` (GET list, POST create)
- [ ] `src/app/api/trips/[id]/route.ts` (GET detail, PUT update, DELETE)
- [ ] `src/app/api/trips/[id]/schedules/route.ts`
- [ ] `src/app/api/trips/[id]/schedules/[sid]/route.ts`
- [ ] `src/app/api/trips/[id]/gallery/route.ts`
- [ ] `src/app/api/trips/[id]/gallery/[gid]/route.ts`
- [ ] `src/app/api/trips/[id]/itinerary/route.ts`
- [ ] `src/app/api/trips/[id]/itinerary/[did]/route.ts`
- [ ] `src/app/api/trips/[id]/faqs/route.ts`
- [ ] `src/app/api/trips/[id]/faqs/[fid]/route.ts`

### Phase 3 — Admin UI
- [ ] `/admin/trips` — list page
- [ ] `/admin/trips/new` — create form
- [ ] `/admin/trips/[id]` — edit core fields
- [ ] `/admin/trips/[id]/schedules` — schedule management
- [ ] `/admin/trips/[id]/gallery` — gallery management + drag reorder
- [ ] `/admin/trips/[id]/itinerary` — day-by-day editor
- [ ] `/admin/trips/[id]/faqs` — FAQ editor

### Phase 4 — Connect Frontend
- [ ] แก้ `src/app/trips/[id]/page.tsx` ตาม snippet ใน Section 4
- [ ] ย้าย interfaces จาก `src/lib/mockTrips.ts` → `src/types/trips.ts`
- [ ] อัปเดต imports ใน `TripDetailsClient.tsx`
- [ ] ลบ `src/lib/mockTrips.ts` (หรือ keep ไว้เป็น seed data)
- [ ] เพิ่ม `NEXT_PUBLIC_API_URL` ใน `.env.local`

---

## Critical File Paths

| ไฟล์ | หน้าที่ |
|------|---------|
| `src/lib/mockTrips.ts` | interfaces ทั้งหมด + mock data (source of truth ของ shape) |
| `src/app/trips/[id]/page.tsx` | server wrapper — ต้องแก้ไขเพื่อ fetch จาก API |
| `src/app/trips/[id]/TripDetailsClient.tsx` | client UI ทุก section (ไม่ต้องแก้) |
| `src/models/Tour.ts` | existing Tour model — ดู pattern ก่อนสร้าง Trip model |
| `src/lib/mongodb.ts` | DB connection pattern — `connectDB()` |
| `src/lib/auth.ts` | `verifyRequest(request)` สำหรับ protect admin routes |
| `src/app/api/tours/route.ts` | API pattern ที่ต้องทำตาม |
| `src/lib/cloudinary.ts` | upload/delete helpers |

---
