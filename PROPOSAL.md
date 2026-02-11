# ใบเสนอราคา - Lens Voyage V2
## ระบบจัดการทัวร์ท่องเที่ยว (Tour Management System)

---

## 📋 ข้อมูลโปรเจค

**ชื่อโปรเจค:** Lens Voyage V2  
**ประเภท:** เว็บแอปพลิเคชันจัดการทัวร์ท่องเที่ยว  
**เทคโนโลยี:** Next.js 16, React 19, TypeScript, MongoDB, Cloudflare R2  
**Domain:** https://lensvoyage.net  
**Repository:** https://github.com/joozery/lenvoyagev2

---

## 🎯 ภาพรวมโปรเจค

ระบบจัดการทัวร์ท่องเที่ยวแบบครบวงจร ที่ออกแบบมาเพื่อให้ธุรกิจทัวร์สามารถจัดการข้อมูลทัวร์ แกลเลอรี่ ทีมงาน และลูกค้าได้อย่างมีประสิทธิภาพ พร้อมระบบจองออนไลน์และการจัดเก็บไฟล์ PDF ขนาดใหญ่

---

## ✨ ฟีเจอร์หลัก

### 1. ระบบหน้าบ้าน (Frontend)
- **หน้าแรก (Home Page)**
  - Hero section พร้อมภาพพื้นหลังแบบ full-screen
  - แสดงทัวร์แนะนำและทัวร์ยอดนิยม
  - ดีไซน์ทันสมัยด้วย Framer Motion animations
  
- **หน้าทัวร์ (Tours Page)**
  - แสดงรายการทัวร์ทั้งหมดพร้อมรูปภาพ
  - ระบบกรองตามประเทศ เดือน และปี
  - แสดงรายละเอียดทัวร์: ราคา, ระยะเวลา, วันที่เดินทาง
  - ดาวน์โหลด/ดู PDF รายละเอียดทัวร์
  
- **หน้าแกลเลอรี่ (Gallery Page)**
  - แสดงภาพถ่ายจากทริปต่างๆ
  - Lightbox สำหรับดูภาพขนาดใหญ่
  - จัดกลุ่มตามทัวร์
  
- **หน้าติดต่อ (Contact Page)**
  - ฟอร์มค้นหาทัวร์ตามความต้องการ
  - ข้อมูลติดต่อบริษัท
  - ระบบส่งข้อความสอบถาม

### 2. ระบบหลังบ้าน (Admin Dashboard)
- **การจัดการทัวร์**
  - เพิ่ม/แก้ไข/ลบข้อมูลทัวร์
  - อัพโหลดรูปภาพทัวร์ (Cloudinary)
  - อัพโหลด PDF รายละเอียดทัวร์ (Cloudflare R2 - รองรับไฟล์ขนาดใหญ่ถึง 100MB)
  - จัดการสถานะทัวร์: ร่าง, เปิดจอง, เต็ม, ปิดจอง
  
- **การจัดการแกลเลอรี่**
  - อัพโหลดรูปภาพหลายรูปพร้อมกัน
  - จัดหมวดหมู่ตามทัวร์
  - ลบและแก้ไขรูปภาพ
  
- **การจัดการทีมงาน**
  - เพิ่มข้อมูลสมาชิกทีม
  - อัพโหลดรูปโปรไฟล์
  - จัดการตำแหน่งและรายละเอียด
  
- **การจัดการพาร์ทเนอร์**
  - เพิ่มข้อมูลพาร์ทเนอร์ธุรกิจ
  - อัพโหลดโลโก้พาร์ทเนอร์
  
- **ระบบผู้ดูแลระบบ (Admin Management)**
  - เพิ่ม/ลบผู้ดูแลระบบ
  - จัดการสิทธิ์การเข้าถึง
  - ระบบ Authentication ด้วย JWT

### 3. ระบบจัดเก็บไฟล์
- **Cloudinary Integration**
  - จัดเก็บรูปภาพทัวร์และแกลเลอรี่
  - Automatic image optimization
  - CDN สำหรับโหลดเร็ว
  
- **Cloudflare R2 Integration**
  - จัดเก็บไฟล์ PDF ขนาดใหญ่ (รองรับถึง 100MB)
  - ไม่มีค่า bandwidth
  - Proxy route สำหรับแสดง PDF แบบ inline

### 4. ฐานข้อมูล
- **MongoDB Atlas**
  - Tour Schema: ข้อมูลทัวร์ทั้งหมด
  - Gallery Schema: รูปภาพแกลเลอรี่
  - Team Schema: ข้อมูลทีมงาน
  - Contact Schema: ข้อความติดต่อจากลูกค้า
  - Admin Schema: ข้อมูลผู้ดูแลระบบ

---

## 🛠️ เทคโนโลジีที่ใช้

### Frontend
- **Framework:** Next.js 16.1.1 (App Router)
- **UI Library:** React 19.2.3
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS v4
- **Components:** Radix UI (Dialog, Tabs, Slot)
- **Animation:** Framer Motion 12.26.2
- **Icons:** Lucide React
- **HTTP Client:** Axios

### Backend
- **Runtime:** Node.js
- **Database:** MongoDB (Mongoose ODM)
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **File Upload:** Multer
- **Cloud Storage:** 
  - Cloudinary (Images)
  - Cloudflare R2 via AWS SDK S3 (PDFs)

### DevOps & Deployment
- **Process Manager:** PM2
- **Web Server:** Nginx
- **SSL:** Let's Encrypt (Certbot)
- **Server:** VPS (Hostinger)
- **Port:** 3010
- **Environment:** Production

---

## 📊 ขอบเขตการทำงาน (Scope of Work)

### Phase 1: พัฒนาระบบหลัก ✅
- [x] ออกแบบและพัฒนา UI/UX ทั้งหมด
- [x] สร้างระบบ Admin Dashboard
- [x] พัฒนา API Routes ทั้งหมด
- [x] เชื่อมต่อฐานข้อมูล MongoDB
- [x] ระบบ Authentication และ Authorization

### Phase 2: ระบบจัดการไฟล์ ✅
- [x] Integration กับ Cloudinary
- [x] Integration กับ Cloudflare R2
- [x] ระบบอัพโหลดรูปภาพ
- [x] ระบบอัพโหลด PDF (รองรับไฟล์ขนาดใหญ่)
- [x] PDF Viewer Proxy

### Phase 3: Deployment ✅
- [x] ตั้งค่า VPS และ Nginx
- [x] ติดตั้ง SSL Certificate
- [x] ตั้งค่า PM2 สำหรับ Production
- [x] ตั้งค่า Environment Variables
- [x] Deploy และทดสอบระบบ

### Phase 4: การปรับปรุงและเพิ่มฟีเจอร์ ✅
- [x] ปรับปรุงระบบอัพโหลด PDF ให้รองรับไฟล์ขนาดใหญ่
- [x] เพิ่มระบบกรองทัวร์ในหน้า Contact
- [x] ดึงข้อมูลประเทศจากทัวร์จริงแทนข้อมูลสมมติ
- [x] เพิ่มการจัดการ Body Size Limit (100MB)
- [x] Version Control ด้วย Git/GitHub

---

## 💰 รายละเอียดค่าใช้จ่าย

### 1. ค่าพัฒนาระบบ
| รายการ | รายละเอียด | จำนวนชั่วโมง | ราคา/ชม | รวม |
|--------|-----------|--------------|---------|-----|
| Frontend Development | UI/UX Design + React/Next.js | 40 ชม. | 800 บาท | 32,000 บาท |
| Backend Development | API + Database + Authentication | 30 ชม. | 800 บาท | 24,000 บาท |
| Admin Dashboard | ระบบจัดการหลังบ้านทั้งหมด | 25 ชม. | 800 บาท | 20,000 บาท |
| File Management System | Cloudinary + R2 Integration | 15 ชม. | 800 บาท | 12,000 บาท |
| Deployment & DevOps | Server Setup + SSL + PM2 | 10 ชม. | 800 บาท | 8,000 บาท |
| Testing & Bug Fixes | ทดสอบและแก้ไขปัญหา | 15 ชม. | 800 บาท | 12,000 บาท |
| **รวมค่าพัฒนา** | | **135 ชม.** | | **108,000 บาท** |

### 2. ค่าบริการรายเดือน (ประมาณการ)
| รายการ | รายละเอียด | ราคา/เดือน |
|--------|-----------|-----------|
| VPS Hosting | Hostinger VPS | 500-1,000 บาท |
| MongoDB Atlas | Shared Cluster (Free - 512MB) | 0 บาท |
| Cloudinary | Free Tier (25 GB storage, 25 GB bandwidth) | 0 บาท |
| Cloudflare R2 | 10GB storage (Free tier) | 0 บาท |
| Domain | .space domain | 300-500 บาท/ปี |
| **รวมค่าบริการ/เดือน** | | **500-1,000 บาท** |

### 3. ค่าบำรุงรักษา (Optional)
| รายการ | รายละเอียด | ราคา |
|--------|-----------|------|
| Monthly Maintenance | อัพเดท + แก้ไขบัค + Support | 3,000 บาท/เดือน |
| Feature Updates | เพิ่มฟีเจอร์ใหม่ตามต้องการ | ตามใบเสนอราคา |

---

## 📈 สรุปราคา

### แบบ One-time Payment
- **ค่าพัฒนาระบบทั้งหมด:** 108,000 บาท
- **ค่าบริการรายเดือน:** 500-1,000 บาท (ชำระเองกับผู้ให้บริการ)

### แบบแบ่งชำระ
- **งวดที่ 1 (30%):** 32,400 บาท - เมื่อเริ่มโปรเจค
- **งวดที่ 2 (40%):** 43,200 บาท - เมื่อพัฒนาเสร็จ 70%
- **งวดที่ 3 (30%):** 32,400 บาท - เมื่อส่งมอบงานและ Deploy เรียบร้อย

---

## 🎁 สิ่งที่ได้รับ

1. ✅ **Source Code** ทั้งหมด (GitHub Repository)
2. ✅ **Documentation** ครบถ้วน
3. ✅ **Deployment Guide** สำหรับติดตั้งเอง
4. ✅ **Admin Training** การใช้งานระบบหลังบ้าน
5. ✅ **1 เดือนแรก Support ฟรี** (Bug fixes)
6. ✅ **SSL Certificate** ติดตั้งและตั้งค่าเรียบร้อย
7. ✅ **Production Ready** พร้อมใช้งานจริง

---

## ⏱️ Timeline

| Phase | ระยะเวลา | สถานะ |
|-------|---------|-------|
| Phase 1: พัฒนาระบบหลัก | 3 สัปดาห์ | ✅ เสร็จสมบูรณ์ |
| Phase 2: ระบบจัดการไฟล์ | 1 สัปดาห์ | ✅ เสร็จสมบูรณ์ |
| Phase 3: Deployment | 3 วัน | ✅ เสร็จสมบูรณ์ |
| Phase 4: การปรับปรุง | 1 สัปดาห์ | ✅ เสร็จสมบูรณ์ |
| **รวมทั้งหมด** | **5-6 สัปดาห์** | **✅ ส่งมอบแล้ว** |

---

## 📞 ข้อมูลติดต่อ

**ผู้พัฒนา:** DevWooYou Team  
**Email:** devwooyouteam@gmail.com  
**Website:** https://lensvoyage.net  
**GitHub:** https://github.com/joozery/lenvoyagev2

---

## 📝 เงื่อนไขการให้บริการ

1. ราคาข้างต้นไม่รวมค่าบริการ Hosting, Domain และ Cloud Services
2. การแก้ไขหรือเพิ่มฟีเจอร์นอกเหนือจาก Scope ที่ระบุจะคิดค่าใช้จ่ายแยกต่างหาก
3. Source code เป็นกсобственность ของลูกค้าหลังชำระเงินครบถ้วน
4. การ Support หลังส่งมอบงาน 1 เดือนแรกฟรี (Bug fixes เท่านั้น)
5. การบำรุงรักษาระยะยาวเป็น Optional ตามความต้องการ

---

## ✍️ การยอมรับข้อเสนอ

ข้าพเจ้ายอมรับข้อเสนอและเงื่อนไขข้างต้น

ลงชื่อ: ________________________  
วันที่: ________________________

---

**หมายเหตุ:** ใบเสนอราคานี้มีผลใช้ได้ 30 วัน นับจากวันที่ออกเอกสาร

**วันที่ออกเอกสาร:** 9 กุมภาพันธ์ 2026
