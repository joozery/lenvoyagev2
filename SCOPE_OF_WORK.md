# ขอบเขตงาน (Scope of Work)
## โปรเจค Lens Voyage V2 - ระบบจัดการทัวร์ท่องเที่ยว

---

## 📌 ภาพรวมโปรเจค

พัฒนาเว็บแอปพลิเคชันระบบจัดการทัวร์ท่องเที่ยวแบบครบวงจร ประกอบด้วยหน้าเว็บไซต์สำหรับลูกค้าและระบบจัดการหลังบ้านสำหรับผู้ดูแลระบบ โดยใช้เทคโนโลยีสมัยใหม่ที่รองรับการขยายตัวในอนาคต

---

## 🎯 วัตถุประสงค์

1. สร้างเว็บไซต์แสดงข้อมูลทัวร์ที่สวยงาม ทันสมัย และใช้งานง่าย
2. พัฒนาระบบจัดการหลังบ้านที่มีประสิทธิภาพ
3. รองรับการจัดเก็บไฟล์ PDF ขนาดใหญ่ (รายละเอียดทัวร์)
4. เพิ่มประสิทธิภาพการทำงานและลดเวลาในการจัดการข้อมูล

---

## 📋 รายละเอียดขอบเขตงาน

### 1. ระบบหน้าเว็บไซต์ (Frontend - Public Pages)

#### 1.1 หน้าแรก (Home Page)
**ฟีเจอร์:**
- Hero Section แบบ Full-screen พร้อมภาพพื้นหลังคุณภาพสูง
- แสดงทัวร์แนะนำ (Featured Tours) พร้อมรูปภาพและข้อมูลสำคัญ
- แสดงทัวร์ยอดนิยม (Popular Tours)
- Section แสดงข้อมูลบริษัท/ทีมงาน
- Responsive Design รองรับทุกอุปกรณ์ (Desktop, Tablet, Mobile)
- Animation เคลื่อนไหวด้วย Framer Motion

**Deliverables:**
- ✅ หน้า Home Page ที่ออกแบบสวยงาม
- ✅ ระบบดึงข้อมูลทัวร์จาก API
- ✅ Responsive Layout ทุกขนาดหน้าจอ
- ✅ Loading States และ Error Handling

#### 1.2 หน้าทัวร์ทั้งหมด (Tours Page)
**ฟีเจอร์:**
- แสดงรายการทัวร์ทั้งหมดในรูปแบบ Grid/Card
- ข้อมูลแต่ละทัวร์:
  - รูปภาพหลัก
  - ชื่อทัวร์
  - สถานที่
  - ราคา
  - ระยะเวลา (จำนวนวัน)
  - วันที่เดินทาง
  - จำนวนที่นั่งว่าง
  - สถานะ (เปิดจอง/เต็ม/ปิดจอง)
- ระบบกรอง (Filter):
  - กรองตามประเทศ/สถานที่
  - กรองตามช่วงราคา
  - กรองตามเดือน/ปี
- ระบบค้นหา (Search)
- ปุ่มดาวน์โหลด/ดู PDF รายละเอียดทัวร์
- Pagination หรือ Infinite Scroll

**Deliverables:**
- ✅ หน้า Tours Listing พร้อมระบบกรองและค้นหา
- ✅ Card Component สำหรับแสดงข้อมูลทัวร์
- ✅ ระบบดู PDF แบบ Inline (ไม่ต้องดาวน์โหลด)
- ✅ Responsive Design

#### 1.3 หน้ารายละเอียดทัวร์ (Tour Detail Page)
**ฟีเจอร์:**
- แสดงข้อมูลทัวร์แบบละเอียด
- Gallery รูปภาพทัวร์
- รายละเอียดโปรแกรมการเดินทาง
- ราคาและเงื่อนไข
- ปุ่มดาวน์โหลด PDF รายละเอียดเต็ม
- ฟอร์มสอบถามข้อมูล/จองทัวร์
- แสดงทัวร์ที่เกี่ยวข้อง (Related Tours)

**Deliverables:**
- ✅ หน้า Tour Detail แบบละเอียด
- ✅ Image Gallery Component
- ✅ PDF Viewer Integration
- ✅ Contact Form

#### 1.4 หน้าแกลเลอรี่ (Gallery Page)
**ฟีเจอร์:**
- แสดงรูปภาพจากทริปต่างๆ
- จัดกลุ่มตามทัวร์/ประเทศ
- Lightbox สำหรับดูภาพขนาดใหญ่
- ระบบกรองตามหมวดหมู่
- Masonry Layout หรือ Grid Layout

**Deliverables:**
- ✅ หน้า Gallery พร้อม Lightbox
- ✅ ระบบจัดกลุ่มรูปภาพ
- ✅ Responsive Image Grid
- ✅ Lazy Loading สำหรับรูปภาพ

#### 1.5 หน้าติดต่อ (Contact Page)
**ฟีเจอร์:**
- ฟอร์มค้นหาทัวร์ตามความต้องการ:
  - เลือกประเทศ (ดึงจากข้อมูลจริง)
  - เลือกเดือน
  - เลือกปี
  - ปุ่มค้นหา (นำไปหน้า Tours พร้อม Filter)
- ข้อมูลติดต่อบริษัท:
  - ที่อยู่
  - เบอร์โทรศัพท์
  - อีเมล
  - Social Media Links
- Google Maps (Optional)
- ฟอร์มส่งข้อความ

**Deliverables:**
- ✅ หน้า Contact พร้อมฟอร์มค้นหา
- ✅ ระบบดึงข้อมูลประเทศจากทัวร์จริง
- ✅ Contact Form พร้อมบันทึกลงฐานข้อมูล
- ✅ Form Validation

#### 1.6 หน้าเกี่ยวกับเรา (About Page)
**ฟีเจอร์:**
- ข้อมูลบริษัท/ประวัติ
- Vision & Mission
- แสดงทีมงาน
- ความเชี่ยวชาญ/จุดเด่น
- พาร์ทเนอร์ธุรกิจ

**Deliverables:**
- ✅ หน้า About Us
- ✅ Team Section
- ✅ Partner Logos Section

#### 1.7 Navigation & Layout
**ฟีเจอร์:**
- Navigation Bar (Sticky/Fixed)
- Footer พร้อมข้อมูลติดต่อและ Links
- Breadcrumb Navigation
- Mobile Menu (Hamburger)
- Smooth Scrolling
- Back to Top Button

**Deliverables:**
- ✅ Navbar Component
- ✅ Footer Component
- ✅ Mobile Responsive Menu
- ✅ Consistent Layout ทุกหน้า

---

### 2. ระบบจัดการหลังบ้าน (Admin Dashboard)

#### 2.1 ระบบ Authentication
**ฟีเจอร์:**
- หน้า Login สำหรับผู้ดูแลระบบ
- ระบบ JWT Authentication
- Session Management
- Auto Logout เมื่อ Token หมดอายุ
- Protected Routes (ป้องกันการเข้าถึงโดยไม่มีสิทธิ์)

**Deliverables:**
- ✅ Login Page
- ✅ JWT Token System
- ✅ Middleware สำหรับตรวจสอบสิทธิ์
- ✅ Secure Password Hashing (bcrypt)

#### 2.2 Dashboard หลัก
**ฟีเจอร์:**
- สรุปข้อมูลสำคัญ (Dashboard Overview):
  - จำนวนทัวร์ทั้งหมด
  - จำนวนทัวร์ที่เปิดจอง
  - จำนวนรูปภาพในแกลเลอรี่
  - จำนวนข้อความติดต่อใหม่
- Quick Actions Menu
- Recent Activities

**Deliverables:**
- ✅ Dashboard Overview Page
- ✅ Statistics Cards
- ✅ Quick Navigation

#### 2.3 จัดการทัวร์ (Tour Management)
**ฟีเจอร์:**
- **แสดงรายการทัวร์:**
  - ตารางแสดงทัวร์ทั้งหมด
  - ค้นหาทัวร์
  - กรองตามสถานะ
  - เรียงลำดับ (วันที่สร้าง, ชื่อ, ราคา)

- **เพิ่มทัวร์ใหม่:**
  - ฟอร์มกรอกข้อมูล:
    - ชื่อทัวร์ (required)
    - สถานที่/ประเทศ (required)
    - ราคา (required)
    - ระยะเวลา (จำนวนวัน) (required)
    - วันที่เดินทาง (required)
    - จำนวนที่นั่ง (required)
    - สถานะ (ร่าง/เปิดจอง/เต็ม/ปิดจอง)
    - รายละเอียด (Rich Text Editor - Optional)
  - อัพโหลดรูปภาพหลัก (Cloudinary)
  - อัพโหลด PDF รายละเอียด (Cloudflare R2)
    - รองรับไฟล์ขนาดใหญ่ถึง 100MB
    - แสดง Progress Bar ขณะอัพโหลด
    - Preview PDF หลังอัพโหลด

- **แก้ไขทัวร์:**
  - แก้ไขข้อมูลทั้งหมด
  - เปลี่ยนรูปภาพ
  - เปลี่ยน PDF
  - ลบรูปภาพ/PDF เดิม

- **ลบทัวร์:**
  - ยืนยันก่อนลบ
  - ลบข้อมูลจากฐานข้อมูล
  - ลบไฟล์จาก Cloudinary และ R2

**Deliverables:**
- ✅ Tours Management Page
- ✅ Create Tour Form พร้อม Validation
- ✅ Edit Tour Functionality
- ✅ Delete Tour พร้อม Confirmation
- ✅ Image Upload (Cloudinary Integration)
- ✅ PDF Upload (Cloudflare R2 Integration)
- ✅ File Size Limit: 100MB
- ✅ Upload Progress Indicator

#### 2.4 จัดการแกลเลอรี่ (Gallery Management)
**ฟีเจอร์:**
- **แสดงรายการรูปภาพ:**
  - Grid View ของรูปภาพทั้งหมด
  - กรองตามทัวร์/หมวดหมู่
  - ค้นหา

- **เพิ่มรูปภาพ:**
  - อัพโหลดหลายรูปพร้อมกัน (Multiple Upload)
  - ระบุหมวดหมู่/ทัวร์
  - ใส่คำอธิบาย (Caption)
  - Preview ก่อนบันทึก

- **แก้ไข/ลบรูปภาพ:**
  - แก้ไขคำอธิบาย
  - เปลี่ยนหมวดหมู่
  - ลบรูปภาพ (พร้อมลบจาก Cloudinary)

**Deliverables:**
- ✅ Gallery Management Page
- ✅ Multiple Image Upload
- ✅ Image Preview
- ✅ Edit/Delete Functionality
- ✅ Category Management

#### 2.5 จัดการทีมงาน (Team Management)
**ฟีเจอร์:**
- **แสดงรายการทีมงาน:**
  - Card View หรือ Table View
  - ค้นหาตามชื่อ

- **เพิ่มสมาชิกทีม:**
  - ชื่อ-นามสกุล
  - ตำแหน่ง
  - รูปโปรไฟล์
  - ข้อมูลติดต่อ
  - Bio/รายละเอียด

- **แก้ไข/ลบสมาชิก:**
  - แก้ไขข้อมูลทั้งหมด
  - เปลี่ยนรูปโปรไฟล์
  - ลบสมาชิก

**Deliverables:**
- ✅ Team Management Page
- ✅ Add/Edit/Delete Team Members
- ✅ Profile Image Upload
- ✅ Form Validation

#### 2.6 จัดการพาร์ทเนอร์ (Partner Management)
**ฟีเจอร์:**
- แสดงรายการพาร์ทเนอร์
- เพิ่มพาร์ทเนอร์ใหม่:
  - ชื่อบริษัท
  - โลโก้
  - ลิงก์เว็บไซต์
  - คำอธิบาย
- แก้ไข/ลบพาร์ทเนอร์

**Deliverables:**
- ✅ Partner Management Page
- ✅ Logo Upload
- ✅ Add/Edit/Delete Partners

#### 2.7 จัดการข้อความติดต่อ (Contact Messages)
**ฟีเจอร์:**
- แสดงรายการข้อความจากลูกค้า
- ดูรายละเอียดข้อความ
- ทำเครื่องหมายว่าอ่านแล้ว/ยังไม่อ่าน
- ลบข้อความ
- กรองตามสถานะ (อ่านแล้ว/ยังไม่อ่าน)

**Deliverables:**
- ✅ Contact Messages Page
- ✅ Message Detail View
- ✅ Mark as Read/Unread
- ✅ Delete Messages

#### 2.8 จัดการผู้ดูแลระบบ (Admin Management)
**ฟีเจอร์:**
- แสดงรายการ Admin ทั้งหมด
- เพิ่ม Admin ใหม่:
  - Username
  - Password (Hashed)
  - ชื่อ-นามสกุล
  - อีเมล
- แก้ไขข้อมูล Admin
- ลบ Admin
- เปลี่ยนรหัสผ่าน

**Deliverables:**
- ✅ Admin Management Page
- ✅ Add/Edit/Delete Admins
- ✅ Password Hashing
- ✅ Change Password Functionality

#### 2.9 ตั้งค่าระบบ (Settings)
**ฟีเจอร์:**
- ข้อมูลบริษัท (ชื่อ, ที่อยู่, เบอร์โทร, อีเมล)
- Social Media Links
- SEO Settings (Meta Tags)
- Email Configuration (Optional)

**Deliverables:**
- ✅ Settings Page
- ✅ Company Information Form
- ✅ Save/Update Settings

---

### 3. Backend API Development

#### 3.1 Tours API
**Endpoints:**
- `GET /api/tours` - ดึงรายการทัวร์ทั้งหมด
- `GET /api/tours/:id` - ดึงข้อมูลทัวร์ตาม ID
- `POST /api/tours` - สร้างทัวร์ใหม่ (Protected)
- `PUT /api/tours/:id` - แก้ไขทัวร์ (Protected)
- `DELETE /api/tours/:id` - ลบทัวร์ (Protected)

**Features:**
- Pagination
- Filtering (ตามประเทศ, เดือน, ปี, สถานะ)
- Sorting
- Search
- Input Validation
- Error Handling

**Deliverables:**
- ✅ Tours API Routes
- ✅ CRUD Operations
- ✅ Query Parameters Support
- ✅ Authentication Middleware

#### 3.2 Gallery API
**Endpoints:**
- `GET /api/gallery` - ดึงรูปภาพทั้งหมด
- `GET /api/gallery/:id` - ดึงรูปภาพตาม ID
- `POST /api/gallery` - เพิ่มรูปภาพ (Protected)
- `PUT /api/gallery/:id` - แก้ไขรูปภาพ (Protected)
- `DELETE /api/gallery/:id` - ลบรูปภาพ (Protected)

**Deliverables:**
- ✅ Gallery API Routes
- ✅ CRUD Operations
- ✅ Category Filtering

#### 3.3 Team API
**Endpoints:**
- `GET /api/teams` - ดึงรายการทีมงาน
- `GET /api/teams/:id` - ดึงข้อมูลทีมตาม ID
- `POST /api/teams` - เพิ่มสมาชิกทีม (Protected)
- `PUT /api/teams/:id` - แก้ไขสมาชิกทีม (Protected)
- `DELETE /api/teams/:id` - ลบสมาชิกทีม (Protected)

**Deliverables:**
- ✅ Team API Routes
- ✅ CRUD Operations

#### 3.4 Contact API
**Endpoints:**
- `GET /api/contacts` - ดึงข้อความทั้งหมด (Protected)
- `GET /api/contacts/:id` - ดึงข้อความตาม ID (Protected)
- `POST /api/contacts` - ส่งข้อความใหม่ (Public)
- `PUT /api/contacts/:id` - อัพเดทสถานะ (Protected)
- `DELETE /api/contacts/:id` - ลบข้อความ (Protected)

**Deliverables:**
- ✅ Contact API Routes
- ✅ CRUD Operations
- ✅ Email Notification (Optional)

#### 3.5 Admin API
**Endpoints:**
- `POST /api/admin/login` - เข้าสู่ระบบ
- `GET /api/admins` - ดึงรายการ Admin (Protected)
- `POST /api/admins` - เพิ่ม Admin (Protected)
- `PUT /api/admins/:id` - แก้ไข Admin (Protected)
- `DELETE /api/admins/:id` - ลบ Admin (Protected)

**Deliverables:**
- ✅ Admin API Routes
- ✅ Login Endpoint
- ✅ JWT Token Generation
- ✅ Password Hashing

#### 3.6 Upload API
**Endpoints:**
- `POST /api/upload` - อัพโหลดไฟล์ (รูปภาพ/PDF)
- `POST /api/upload-signature` - สร้าง Signature สำหรับ Cloudinary
- `GET /api/view-pdf` - Proxy สำหรับดู PDF

**Features:**
- รองรับไฟล์ขนาดใหญ่ (100MB)
- Cloudinary Integration (รูปภาพ)
- Cloudflare R2 Integration (PDF)
- File Type Validation
- File Size Validation

**Deliverables:**
- ✅ Upload API Routes
- ✅ Cloudinary Integration
- ✅ Cloudflare R2 Integration
- ✅ PDF Viewer Proxy
- ✅ File Validation

---

### 4. Database Design

#### 4.1 MongoDB Schemas

**Tour Schema:**
```javascript
{
  name: String (required),
  location: String (required),
  price: Number (required),
  duration: String (required),
  tourDate: String (required),
  seatsAvailable: Number (required),
  status: String (enum: ['ร่าง', 'เปิดจอง', 'เต็ม', 'ปิดจอง']),
  image: {
    url: String,
    publicId: String
  },
  pdf: {
    url: String,
    publicId: String
  },
  description: String,
  createdAt: Date,
  updatedAt: Date
}
```

**Gallery Schema:**
```javascript
{
  title: String,
  category: String,
  tourId: ObjectId (ref: 'Tour'),
  image: {
    url: String,
    publicId: String
  },
  caption: String,
  createdAt: Date
}
```

**Team Schema:**
```javascript
{
  name: String (required),
  position: String (required),
  image: {
    url: String,
    publicId: String
  },
  bio: String,
  email: String,
  phone: String,
  createdAt: Date
}
```

**Contact Schema:**
```javascript
{
  name: String (required),
  email: String (required),
  phone: String,
  message: String (required),
  isRead: Boolean (default: false),
  createdAt: Date
}
```

**Admin Schema:**
```javascript
{
  username: String (required, unique),
  password: String (required, hashed),
  name: String,
  email: String,
  createdAt: Date,
  lastLogin: Date
}
```

**Deliverables:**
- ✅ ทุก Schema ถูกสร้างและทดสอบแล้ว
- ✅ Indexes สำหรับ Performance
- ✅ Validation Rules
- ✅ Relationships (References)

---

### 5. File Storage Integration

#### 5.1 Cloudinary (สำหรับรูปภาพ)
**Features:**
- อัพโหลดรูปภาพ
- Automatic Image Optimization
- Responsive Images
- CDN Delivery
- Delete Images

**Deliverables:**
- ✅ Cloudinary SDK Integration
- ✅ Upload Function
- ✅ Delete Function
- ✅ Signed Upload (Secure)

#### 5.2 Cloudflare R2 (สำหรับ PDF)
**Features:**
- อัพโหลด PDF ขนาดใหญ่ (ถึง 100MB)
- S3-Compatible API
- No Egress Fees
- Secure Access

**Deliverables:**
- ✅ AWS S3 SDK Integration
- ✅ R2 Client Configuration
- ✅ Upload to R2
- ✅ Download from R2
- ✅ PDF Viewer Proxy

---

### 6. Deployment & DevOps

#### 6.1 Server Setup
**Tasks:**
- ติดตั้ง Node.js
- ติดตั้ง PM2 Process Manager
- ติดตั้ง Nginx Web Server
- ตั้งค่า Firewall
- ตั้งค่า Environment Variables

**Deliverables:**
- ✅ VPS Server พร้อมใช้งาน
- ✅ PM2 Configuration
- ✅ Nginx Configuration
- ✅ Security Setup

#### 6.2 SSL Certificate
**Tasks:**
- ติดตั้ง Certbot
- สร้าง SSL Certificate (Let's Encrypt)
- ตั้งค่า Auto-renewal
- Force HTTPS Redirect

**Deliverables:**
- ✅ SSL Certificate ติดตั้งแล้ว
- ✅ HTTPS เปิดใช้งาน
- ✅ Auto-renewal ตั้งค่าแล้ว

#### 6.3 Production Build
**Tasks:**
- Build Next.js Application
- Optimize Assets
- Configure PM2 Ecosystem
- Setup Logging
- Setup Monitoring

**Deliverables:**
- ✅ Production Build
- ✅ PM2 Running
- ✅ Logs Configuration
- ✅ Auto-restart on Crash

#### 6.4 Domain & DNS
**Tasks:**
- ตั้งค่า DNS Records
- Point Domain to Server
- Verify Domain

**Deliverables:**
- ✅ Domain Active
- ✅ DNS Configured
- ✅ Website Accessible

---

### 7. Testing & Quality Assurance

#### 7.1 Functionality Testing
**Areas:**
- ทดสอบทุกหน้าเว็บไซต์
- ทดสอบทุก API Endpoint
- ทดสอบ CRUD Operations
- ทดสอบ File Upload/Download
- ทดสอบ Authentication

**Deliverables:**
- ✅ Test Report
- ✅ Bug Fixes

#### 7.2 Responsive Testing
**Devices:**
- Desktop (1920px, 1366px)
- Tablet (768px, 1024px)
- Mobile (375px, 414px)

**Deliverables:**
- ✅ Responsive Design ทุกหน้า
- ✅ Mobile-friendly Navigation

#### 7.3 Browser Testing
**Browsers:**
- Chrome
- Firefox
- Safari
- Edge

**Deliverables:**
- ✅ Cross-browser Compatibility

#### 7.4 Performance Testing
**Metrics:**
- Page Load Speed
- API Response Time
- Image Loading
- PDF Loading

**Deliverables:**
- ✅ Performance Optimization
- ✅ Lazy Loading
- ✅ Caching Strategy

---

### 8. Documentation

#### 8.1 Technical Documentation
**Content:**
- System Architecture
- Database Schema
- API Documentation
- Environment Variables
- Deployment Guide

**Deliverables:**
- ✅ README.md
- ✅ DEPLOYMENT_SUMMARY.md
- ✅ API Documentation

#### 8.2 User Manual
**Content:**
- Admin Dashboard Guide
- How to Add/Edit Tours
- How to Upload Images/PDFs
- How to Manage Content
- Troubleshooting

**Deliverables:**
- ✅ Admin User Guide
- ✅ Video Tutorial (Optional)

---

### 9. Training & Handover

#### 9.1 Admin Training
**Topics:**
- การเข้าสู่ระบบ
- การจัดการทัวร์
- การอัพโหลดรูปภาพและ PDF
- การจัดการแกลเลอรี่
- การจัดการทีมงานและพาร์ทเนอร์
- การดูข้อความติดต่อ

**Deliverables:**
- ✅ Training Session (1-2 ชั่วโมง)
- ✅ Training Materials

#### 9.2 Source Code Handover
**Deliverables:**
- ✅ GitHub Repository Access
- ✅ Complete Source Code
- ✅ Environment Configuration
- ✅ Database Backup

---

### 10. Support & Maintenance

#### 10.1 Initial Support (1 เดือนแรก - ฟรี)
**Coverage:**
- Bug Fixes
- Minor Adjustments
- Technical Support
- Q&A

**Deliverables:**
- ✅ 1 Month Free Support

#### 10.2 Extended Support (Optional)
**Services:**
- Monthly Maintenance
- Feature Updates
- Security Updates
- Performance Optimization
- Priority Support

**Pricing:**
- 3,000 บาท/เดือน

---

## 🚫 สิ่งที่ไม่รวมในขอบเขตงาน (Out of Scope)

1. ❌ ระบบจองออนไลน์แบบเต็มรูปแบบ (Booking System with Payment)
2. ❌ Payment Gateway Integration
3. ❌ Email Marketing Integration
4. ❌ Multi-language Support
5. ❌ Mobile Application (iOS/Android)
6. ❌ Live Chat System
7. ❌ Customer Review/Rating System
8. ❌ Blog/News Section
9. ❌ SEO Optimization Service
10. ❌ Content Writing/Photography

*หมายเหตุ: ฟีเจอร์เหล่านี้สามารถเพิ่มได้ในภายหลังตามใบเสนอราคาแยกต่างหาก*

---

## 📅 Timeline & Milestones

| Milestone | ระยะเวลา | สถานะ |
|-----------|---------|-------|
| **Phase 1: Frontend Development** | 2 สัปดาห์ | ✅ เสร็จสมบูรณ์ |
| - Home Page | 2 วัน | ✅ |
| - Tours Page | 3 วัน | ✅ |
| - Gallery Page | 2 วัน | ✅ |
| - Contact Page | 2 วัน | ✅ |
| - About Page | 1 วัน | ✅ |
| - Layout Components | 2 วัน | ✅ |
| **Phase 2: Admin Dashboard** | 2 สัปดาห์ | ✅ เสร็จสมบูรณ์ |
| - Authentication | 2 วัน | ✅ |
| - Tour Management | 4 วัน | ✅ |
| - Gallery Management | 2 วัน | ✅ |
| - Team/Partner Management | 2 วัน | ✅ |
| - Admin Management | 2 วัน | ✅ |
| **Phase 3: Backend API** | 1 สัปดาห์ | ✅ เสร็จสมบูรณ์ |
| - Database Design | 1 วัน | ✅ |
| - API Development | 4 วัน | ✅ |
| - File Upload Integration | 2 วัน | ✅ |
| **Phase 4: Integration & Testing** | 1 สัปดาห์ | ✅ เสร็จสมบูรณ์ |
| - Frontend-Backend Integration | 2 วัน | ✅ |
| - Testing & Bug Fixes | 3 วัน | ✅ |
| - Performance Optimization | 2 วัน | ✅ |
| **Phase 5: Deployment** | 3 วัน | ✅ เสร็จสมบูรณ์ |
| - Server Setup | 1 วัน | ✅ |
| - SSL Configuration | 0.5 วัน | ✅ |
| - Production Deployment | 1 วัน | ✅ |
| - Final Testing | 0.5 วัน | ✅ |
| **Phase 6: Training & Handover** | 1 วัน | ✅ เสร็จสมบูรณ์ |
| **รวมทั้งหมด** | **5-6 สัปดาห์** | **✅ ส่งมอบแล้ว** |

---

## ✅ Acceptance Criteria

โปรเจคจะถือว่าเสร็จสมบูรณ์เมื่อ:

1. ✅ เว็บไซต์ทำงานได้ปกติบนทุก Browser หลัก
2. ✅ Responsive Design ทำงานได้ดีบนทุกอุปกรณ์
3. ✅ ระบบ Admin สามารถจัดการข้อมูลได้ครบถ้วน
4. ✅ สามารถอัพโหลดไฟล์ PDF ขนาดใหญ่ได้ (100MB)
5. ✅ ระบบ Authentication ทำงานถูกต้อง
6. ✅ Deploy บน Production Server พร้อม SSL
7. ✅ ผ่านการทดสอบทุกฟีเจอร์
8. ✅ มี Documentation ครบถ้วน
9. ✅ ผู้ดูแลระบบได้รับการ Training
10. ✅ Source Code ถูกส่งมอบพร้อม Repository Access

---

## 📞 ข้อมูลติดต่อ

**ผู้พัฒนา:** DevWooYou Team  
**Email:** devwooyouteam@gmail.com  
**Domain:** https://lensvoyage.net  
**GitHub:** https://github.com/joozery/lenvoyagev2

---

**วันที่จัดทำเอกสาร:** 9 กุมภาพันธ์ 2026  
**เวอร์ชัน:** 1.0
