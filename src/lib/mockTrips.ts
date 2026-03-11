export interface TripSchedule {
  id: string;
  dates: string;
  duration: string;
  startDate: string;
  seatsAvailable: number;
  totalSeats: number;
  status: "open" | "full" | "coming_soon";
}

export interface GalleryImage {
  id: string;
  storage_url: string;
  title: string;
  description: string;
  alt_text: string;
  order_index: number;
}

export interface ActivityItem {
  id: string;
  activity_time: string;
  activity_description: string;
}

export interface DayImage {
  id: string;
  storage_url: string;
  caption: string;
  alt_text: string;
}

export interface DetailedItineraryDay {
  id: string;
  day_number: number;
  day_title: string;
  day_description: string;
  activities?: ActivityItem[];
  images?: DayImage[];
}

export interface TripFAQ {
  id: string;
  question: string;
  answer: string;
  images?: DayImage[];
}

export interface Trip {
  id: string;
  name: string;
  country: string;
  flag: string;
  price: number;
  formatted_price?: string;
  image: string;
  schedules: TripSchedule[];
  pdf?: string;
  gallery?: GalleryImage[];
  detailedItinerary?: DetailedItineraryDay[];
  faqs?: TripFAQ[];
}

export interface TripDetailStat {
  label: string;
  value: string;
  hint?: string;
}

export interface TripItineraryItem {
  day: string;
  title: string;
  description: string;
  details: string[];
  gallery?: string[];
}

export interface TripDetailContent {
  tagline: string;
  overview: string;
  stats: TripDetailStat[];
  highlights: string[];
  itinerary: TripItineraryItem[];
  services: {
    includes: string[];
    excludes: string[];
  };
  reminders: string[];
}

export const MOCK_TRIPS: Trip[] = [
  {
    id: "1",
    name: "ไอซ์แลนด์ แสงเหนือเหนือขอบฟ้า",
    country: "ไอซ์แลนด์",
    flag: "🇮🇸",
    price: 89000,
    formatted_price: "฿89,000",
    image: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=1600&q=80",
    schedules: [
      { id: "s1-1", dates: "15 - 22 ม.ค. 2568", duration: "8 วัน 7 คืน", startDate: "2025-01-15", seatsAvailable: 5, totalSeats: 12, status: "open" },
      { id: "s1-2", dates: "12 - 19 ก.พ. 2568", duration: "8 วัน 7 คืน", startDate: "2025-02-12", seatsAvailable: 9, totalSeats: 12, status: "open" },
    ],
    gallery: [
      {
        id: "g1-1",
        storage_url: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=800&q=80",
        title: "แสงเหนือเหนือทะเลสาบ",
        description: "ปรากฏการณ์ Northern Lights สะท้อนบนทะเลสาบน้ำแข็งในไอซ์แลนด์",
        alt_text: "Northern lights over Iceland lake",
        order_index: 1,
      },
      {
        id: "g1-2",
        storage_url: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=800&q=80",
        title: "ธารน้ำแข็ง Jökulsárlón",
        description: "ทะเลสาบธารน้ำแข็งอันโด่งดัง เต็มไปด้วยก้อนน้ำแข็งสีฟ้าใส",
        alt_text: "Jokulsarlon glacier lagoon Iceland",
        order_index: 2,
      },
      {
        id: "g1-3",
        storage_url: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800&q=80",
        title: "น้ำตก Skógafoss",
        description: "น้ำตกขนาดใหญ่ที่ตกลงมาจากหน้าผาสูง 60 เมตร",
        alt_text: "Skogafoss waterfall Iceland",
        order_index: 3,
      },
      {
        id: "g1-4",
        storage_url: "https://images.unsplash.com/photo-1514036783265-fba9577fc473?w=800&q=80",
        title: "ชายหาดทรายดำ Reynisfjara",
        description: "ชายหาดทรายดำโบซอลต์อันลึกลับริมมหาสมุทรแอตแลนติก",
        alt_text: "Reynisfjara black sand beach Iceland",
        order_index: 4,
      },
      {
        id: "g1-5",
        storage_url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800&q=80",
        title: "ภูเขาและหุบเขา",
        description: "ทิวทัศน์ภูเขาและทุ่งหญ้าสีเขียวอันกว้างใหญ่",
        alt_text: "Iceland mountain landscape",
        order_index: 5,
      },
      {
        id: "g1-6",
        storage_url: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=800&q=80",
        title: "Blue Lagoon สปาธรรมชาติ",
        description: "บ่อน้ำร้อนธรรมชาติสีฟ้าอันโด่งดังกลางทุ่งลาวา",
        alt_text: "Blue Lagoon Iceland",
        order_index: 6,
      },
    ],
    detailedItinerary: [
      {
        id: "d1-1",
        day_number: 1,
        day_title: "ออกเดินทางจากกรุงเทพฯ สู่เรคยาวิก",
        day_description: "รวมพลที่สนามบินสุวรรณภูมิ ทีมงาน Len Voyage คอยต้อนรับและอำนวยความสะดวกตลอดขั้นตอน เดินทางสู่ไอซ์แลนด์ด้วยเที่ยวบิน Full Service",
        activities: [
          { id: "a1-1-1", activity_time: "21:00", activity_description: "นัดพบทีมงาน Len Voyage ที่เคาน์เตอร์เช็กอิน อาคารผู้โดยสารขาออก" },
          { id: "a1-1-2", activity_time: "23:55", activity_description: "ออกเดินทางจากสุวรรณภูมิ มุ่งหน้าสู่กรุงเรคยาวิก ไอซ์แลนด์" },
        ],
      },
      {
        id: "d1-2",
        day_number: 2,
        day_title: "เรคยาวิก — สำรวจเมืองหลวง",
        day_description: "ถึงสนามบิน Keflavík เวลาเช้าตรู่ พร้อมเดินทางเข้าสู่เมืองหลวงเรคยาวิก สำรวจย่านเก่าและจุดถ่ายภาพสำคัญ",
        activities: [
          { id: "a1-2-1", activity_time: "06:00", activity_description: "ถึงสนามบิน Keflavík รับกระเป๋าและขึ้นรถบัสส่วนตัวเข้าเมือง" },
          { id: "a1-2-2", activity_time: "09:00", activity_description: "ชม Hallgrímskirkja โบสถ์สัญลักษณ์ของเรคยาวิก ขึ้นหอคอยชมวิวแบบ 360 องศา" },
          { id: "a1-2-3", activity_time: "12:00", activity_description: "มื้อกลางวันที่ร้านอาหารท้องถิ่นชื่อดัง ลิ้มลอง Fish & Chips แบบฉบับไอซ์แลนด์" },
          { id: "a1-2-4", activity_time: "14:00", activity_description: "เดินเล่นย่าน Laugavegur ถนนช้อปปิ้งสายหลักของเมือง" },
          { id: "a1-2-5", activity_time: "20:00", activity_description: "เช็กอินโรงแรม พักผ่อนเตรียมกำลัง" },
        ],
        images: [
          {
            id: "di1-2-1",
            storage_url: "https://images.unsplash.com/photo-1474690870753-1b92efa1f2d8?w=600&q=80",
            caption: "โบสถ์ Hallgrímskirkja สัญลักษณ์ของเรคยาวิก",
            alt_text: "Hallgrimskirkja church Reykjavik",
          },
        ],
      },
      {
        id: "d1-3",
        day_number: 3,
        day_title: "Golden Circle — น้ำพุร้อน ทะเลสาบ น้ำตก",
        day_description: "เส้นทางท่องเที่ยวชื่อดังที่รวมสถานที่สำคัญ 3 แห่ง ได้แก่ Þingvellir, Geysir และ Gullfoss",
        activities: [
          { id: "a1-3-1", activity_time: "08:00", activity_description: "ออกเดินทางโดยรถบัสส่วนตัว มุ่งหน้า Þingvellir National Park" },
          { id: "a1-3-2", activity_time: "09:30", activity_description: "เดินชม Þingvellir ที่ตั้งของรัฐสภาโลกแห่งแรก และรอยแยกแผ่นเปลือกโลก" },
          { id: "a1-3-3", activity_time: "11:30", activity_description: "ชม Strokkur Geyser น้ำพุร้อนธรรมชาติพุ่งสูง 20-40 เมตร ทุกๆ 5-10 นาที" },
          { id: "a1-3-4", activity_time: "13:00", activity_description: "มื้อกลางวันพร้อมชมวิว" },
          { id: "a1-3-5", activity_time: "14:30", activity_description: "ถ่ายภาพน้ำตก Gullfoss น้ำตกสองชั้นอันยิ่งใหญ่" },
        ],
        images: [
          {
            id: "di1-3-1",
            storage_url: "https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=600&q=80",
            caption: "น้ำตก Gullfoss อันยิ่งใหญ่",
            alt_text: "Gullfoss waterfall Iceland",
          },
          {
            id: "di1-3-2",
            storage_url: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=600&q=80",
            caption: "ทิวทัศน์บนเส้นทาง Golden Circle",
            alt_text: "Golden Circle Iceland landscape",
          },
        ],
      },
      {
        id: "d1-4",
        day_number: 4,
        day_title: "ชายหาดทรายดำ Reynisfjara & น้ำตก Skógafoss",
        day_description: "ออกสำรวจชายฝั่งทางใต้ของไอซ์แลนด์ ชมชายหาดทรายดำและน้ำตกที่สวยงาม",
        activities: [
          { id: "a1-4-1", activity_time: "08:30", activity_description: "ออกเดินทางสู่ชายฝั่งทางใต้" },
          { id: "a1-4-2", activity_time: "10:00", activity_description: "เดินชมชายหาดทรายดำ Reynisfjara และเสาหิน Basalt อายุล้านปี" },
          { id: "a1-4-3", activity_time: "13:00", activity_description: "แวะร้านอาหารท้องถิ่นในเมือง Vík" },
          { id: "a1-4-4", activity_time: "15:00", activity_description: "ถ่ายภาพน้ำตก Skógafoss ที่ตกลงมาจากหน้าผาสูง 60 เมตร ถ้าโชคดีอาจเห็นรุ้งกินน้ำ" },
          { id: "a1-4-5", activity_time: "18:00", activity_description: "เดินทางกลับโรงแรม" },
        ],
        images: [
          {
            id: "di1-4-1",
            storage_url: "https://images.unsplash.com/photo-1514036783265-fba9577fc473?w=600&q=80",
            caption: "ชายหาดทรายดำ Reynisfjara",
            alt_text: "Reynisfjara black sand beach",
          },
        ],
      },
      {
        id: "d1-5",
        day_number: 5,
        day_title: "ธารน้ำแข็ง Jökulsárlón & ล่าแสงเหนือ",
        day_description: "ชมทะเลสาบธารน้ำแข็งอันมหัศจรรย์และออกล่าแสงเหนือในยามค่ำคืน",
        activities: [
          { id: "a1-5-1", activity_time: "07:00", activity_description: "ออกเดินทางตั้งแต่เช้าสู่ Jökulsárlón ระยะทาง 4-5 ชั่วโมง" },
          { id: "a1-5-2", activity_time: "12:00", activity_description: "ถึง Jökulsárlón ชมทะเลสาบและก้อนน้ำแข็งสีฟ้าลอยล่องอยู่ในทะเลสาบ" },
          { id: "a1-5-3", activity_time: "13:30", activity_description: "เดินชมชายหาด Diamond Beach ที่มีน้ำแข็งใสวิ้งเกลื่อนกลาดบนทรายดำ" },
          { id: "a1-5-4", activity_time: "20:00", activity_description: "ออกล่าแสงเหนือกับไกด์ผู้เชี่ยวชาญ พร้อมอุปกรณ์ถ่ายภาพ" },
          { id: "a1-5-5", activity_time: "23:00", activity_description: "กลับโรงแรมพักผ่อน" },
        ],
        images: [
          {
            id: "di1-5-1",
            storage_url: "https://images.unsplash.com/photo-1476610182048-b716b8518aae?w=600&q=80",
            caption: "ทะเลสาบธารน้ำแข็ง Jökulsárlón",
            alt_text: "Jokulsarlon glacier lagoon",
          },
          {
            id: "di1-5-2",
            storage_url: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=600&q=80",
            caption: "แสงเหนือในยามค่ำคืน",
            alt_text: "Northern lights aurora Iceland",
          },
        ],
      },
      {
        id: "d1-6",
        day_number: 6,
        day_title: "Blue Lagoon & เดินทางกลับบ้าน",
        day_description: "แช่บ่อน้ำร้อน Blue Lagoon เพื่อผ่อนคลายก่อนเดินทางกลับ",
        activities: [
          { id: "a1-6-1", activity_time: "09:00", activity_description: "เดินทางสู่ Blue Lagoon สปาธรรมชาติชื่อดังระดับโลก" },
          { id: "a1-6-2", activity_time: "10:00", activity_description: "แช่น้ำแร่ธรรมชาติอุณหภูมิ 37-39 องศาเซลเซียส" },
          { id: "a1-6-3", activity_time: "13:00", activity_description: "มื้อกลางวันพิเศษที่ร้านอาหารภายใน Blue Lagoon" },
          { id: "a1-6-4", activity_time: "15:00", activity_description: "เดินทางสู่สนามบิน Keflavík" },
          { id: "a1-6-5", activity_time: "18:00", activity_description: "เช็กอินและออกเดินทางกลับกรุงเทพฯ" },
        ],
        images: [
          {
            id: "di1-6-1",
            storage_url: "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?w=600&q=80",
            caption: "Blue Lagoon บ่อน้ำร้อนธรรมชาติ",
            alt_text: "Blue Lagoon Iceland geothermal spa",
          },
        ],
      },
    ],
    faqs: [
      {
        id: "f1-1",
        question: "ฤดูกาลที่ดีที่สุดสำหรับดูแสงเหนือในไอซ์แลนด์คือเมื่อไหร่?",
        answer: "ช่วงที่ดีที่สุดคือเดือนกันยายน - มีนาคม เนื่องจากคืนยาวและท้องฟ้ามืด โดยเฉพาะช่วงเดือนตุลาคม - กุมภาพันธ์มีโอกาสเห็นสูงสุด แต่ต้องขึ้นอยู่กับสภาพอากาศที่ท้องฟ้าต้องโล่งและกิจกรรมของดวงอาทิตย์ด้วย",
        images: [
          {
            id: "fi1-1",
            storage_url: "https://images.unsplash.com/photo-1531168556467-80aace0d0144?w=600&q=80",
            caption: "แสงเหนือสวยงามในยามค่ำคืน",
            alt_text: "Northern lights in Iceland night sky",
          },
        ],
      },
      {
        id: "f1-2",
        question: "ต้องเตรียมเสื้อผ้าแบบไหนสำหรับการเดินทางไอซ์แลนด์ฤดูหนาว?",
        answer: "ไอซ์แลนด์ฤดูหนาวอุณหภูมิอยู่ระหว่าง -5 ถึง 5 องศาเซลเซียส ควรเตรียม: เสื้อกันหนาวหนาๆ อย่างน้อย 3 ชั้น, เสื้อกันลม/กันน้ำแบบ Windproof, ถุงมือ หมวก ผ้าพันคอที่หนา, รองเท้าบูทกันน้ำกันหนาว และ Base layer ที่ระบายเหงื่อได้ดี",
      },
      {
        id: "f1-3",
        question: "แพ็กเกจนี้รวมค่าตั๋วเครื่องบินหรือไม่?",
        answer: "ใช่ แพ็กเกจนี้รวมค่าตั๋วเครื่องบินไป-กลับกรุงเทพฯ - เรคยาวิก พร้อมสัมภาระโหลด 30 กก. รวมถึงที่พักทุกคืน อาหารเช้าตลอดทริป รถบัสส่วนตัว และไกด์ไทยดูแลตลอดการเดินทาง",
      },
      {
        id: "f1-4",
        question: "มีการรับประกันว่าจะได้เห็นแสงเหนือหรือไม่?",
        answer: "เราไม่สามารถรับประกัน 100% เนื่องจากแสงเหนือเป็นปรากฏการณ์ธรรมชาติที่ขึ้นอยู่กับสภาพอากาศและกิจกรรมของดวงอาทิตย์ อย่างไรก็ตาม ทีมงานของเราจะใช้ความเชี่ยวชาญในการหาจุดที่ดีที่สุด ติดตาม Aurora Forecast และพาคุณไปยังพื้นที่ที่มีโอกาสเห็นสูงสุดทุกคืน",
        images: [
          {
            id: "fi1-4",
            storage_url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600&q=80",
            caption: "ทิวทัศน์ไอซ์แลนด์ยามค่ำคืน",
            alt_text: "Iceland night landscape",
          },
        ],
      },
    ],
  },
  {
    id: "2",
    name: "ญี่ปุ่น ซากุระบาน ฤดูใบไม้ผลิ",
    country: "ญี่ปุ่น",
    flag: "🇯🇵",
    price: 65000,
    formatted_price: "฿65,000",
    image: "/tour-europe.jpg",
    schedules: [
      { id: "s2-1", dates: "28 มี.ค. - 5 เม.ย. 2568", duration: "9 วัน 8 คืน", startDate: "2025-03-28", seatsAvailable: 3, totalSeats: 15, status: "open" },
      { id: "s2-2", dates: "10 - 18 เม.ย. 2568", duration: "9 วัน 8 คืน", startDate: "2025-04-10", seatsAvailable: 0, totalSeats: 15, status: "full" },
    ],
  },
  {
    id: "3",
    name: "นอร์เวย์ ฟยอร์ดสายน้ำ ยอดเขาสูงชัน",
    country: "นอร์เวย์",
    flag: "🇳🇴",
    price: 95000,
    formatted_price: "฿95,000",
    image: "/aurora-bg.jpg",
    schedules: [
      { id: "s3-1", dates: "10 - 18 มิ.ย. 2568", duration: "9 วัน 8 คืน", startDate: "2025-06-10", seatsAvailable: 8, totalSeats: 12, status: "open" },
      { id: "s3-2", dates: "15 - 23 ก.ค. 2568", duration: "9 วัน 8 คืน", startDate: "2025-07-15", seatsAvailable: 12, totalSeats: 12, status: "open" },
    ],
  },
  {
    id: "4",
    name: "สวิตเซอร์แลนด์ เทือกเขาแอลป์ เหนือกลุ่มเมฆ",
    country: "สวิตเซอร์แลนด์",
    flag: "🇨🇭",
    price: 110000,
    formatted_price: "฿110,000",
    image: "/tour-italy.jpg",
    schedules: [
      { id: "s4-1", dates: "5 - 13 ส.ค. 2568", duration: "9 วัน 8 คืน", startDate: "2025-08-05", seatsAvailable: 6, totalSeats: 10, status: "open" },
    ],
  },
  {
    id: "5",
    name: "โมร็อกโก ทะเลทรายซาฮารา ดาวพราวกลางคืน",
    country: "โมร็อกโก",
    flag: "🇲🇦",
    price: 72000,
    formatted_price: "฿72,000",
    image: "/hero-bg.png",
    schedules: [
      { id: "s5-1", dates: "20 - 28 พ.ย. 2568", duration: "9 วัน 8 คืน", startDate: "2025-11-20", seatsAvailable: 10, totalSeats: 12, status: "open" },
    ],
  },
  {
    id: "6",
    name: "เนปาล หิมาลัย เดินสู่ยอดโลก",
    country: "เนปาล",
    flag: "🇳🇵",
    price: 58000,
    formatted_price: "฿58,000",
    image: "/cover.jpg",
    schedules: [
      { id: "s6-1", dates: "8 - 18 ต.ค. 2568", duration: "11 วัน 10 คืน", startDate: "2025-10-08", seatsAvailable: 0, totalSeats: 10, status: "full" },
      { id: "s6-2", dates: "5 - 15 พ.ย. 2568", duration: "11 วัน 10 คืน", startDate: "2025-11-05", seatsAvailable: 4, totalSeats: 10, status: "open" },
    ],
  },
  {
    id: "7",
    name: "เปรู มาชูปิกชู นครลับแห่งอินคา",
    country: "เปรู",
    flag: "🇵🇪",
    price: 98000,
    formatted_price: "฿98,000",
    image: "/tour-europe.jpg",
    schedules: [
      { id: "s7-1", dates: "2 - 12 พ.ค. 2568", duration: "11 วัน 10 คืน", startDate: "2025-05-02", seatsAvailable: 7, totalSeats: 12, status: "open" },
    ],
  },
  {
    id: "8",
    name: "แทนซาเนีย ซาฟารี แห่งทุ่งเซเรนเกติ",
    country: "แทนซาเนีย",
    flag: "🇹🇿",
    price: 120000,
    formatted_price: "฿120,000",
    image: "/aurora-bg.jpg",
    schedules: [
      { id: "s8-1", dates: "14 - 24 ก.ย. 2568", duration: "11 วัน 10 คืน", startDate: "2025-09-14", seatsAvailable: 4, totalSeats: 8, status: "open" },
      { id: "s8-2", dates: "1 - 11 ต.ค. 2568", duration: "11 วัน 10 คืน", startDate: "2025-10-01", seatsAvailable: 8, totalSeats: 8, status: "open" },
    ],
  },
  {
    id: "9",
    name: "อียิปต์ เส้นทางฟาโรห์ โบราณสถานโลก",
    country: "อียิปต์",
    flag: "🇪🇬",
    price: 68000,
    formatted_price: "฿68,000",
    image: "/tour-italy.jpg",
    schedules: [
      { id: "s9-1", dates: "3 - 12 ก.ย. 2568", duration: "10 วัน 9 คืน", startDate: "2025-09-03", seatsAvailable: 6, totalSeats: 12, status: "open" },
    ],
  },
  {
    id: "10",
    name: "นิวซีแลนด์ เส้นทางธรรมชาติใต้สุดโลก",
    country: "นิวซีแลนด์",
    flag: "🇳🇿",
    price: 105000,
    formatted_price: "฿105,000",
    image: "/tour-europe.jpg",
    schedules: [
      { id: "s10-1", dates: "2 - 12 พ.ย. 2568", duration: "11 วัน 10 คืน", startDate: "2025-11-02", seatsAvailable: 5, totalSeats: 10, status: "open" },
    ],
  },
  {
    id: "11",
    name: "เวียดนาม ฮาลองเบย์ มรกตแห่งทะเลตะวันออก",
    country: "เวียดนาม",
    flag: "🇻🇳",
    price: 42000,
    formatted_price: "฿42,000",
    image: "/tour-europe.jpg",
    schedules: [
      { id: "s11-1", dates: "5 - 11 ธ.ค. 2568", duration: "7 วัน 6 คืน", startDate: "2025-12-05", seatsAvailable: 11, totalSeats: 15, status: "open" },
      { id: "s11-2", dates: "20 - 26 ธ.ค. 2568", duration: "7 วัน 6 คืน", startDate: "2025-12-20", seatsAvailable: 15, totalSeats: 15, status: "coming_soon" },
    ],
  },
  {
    id: "12",
    name: "มัลดีฟส์ ใต้ท้องทะเล วิถีแห่งสวรรค์",
    country: "มัลดีฟส์",
    flag: "🇲🇻",
    price: 75000,
    formatted_price: "฿75,000",
    image: "/cover.jpg",
    schedules: [
      { id: "s12-1", dates: "18 - 24 ธ.ค. 2568", duration: "7 วัน 6 คืน", startDate: "2025-12-18", seatsAvailable: 2, totalSeats: 6, status: "open" },
    ],
  },
];

const DETAIL_OVERVIEWS: Record<string, TripDetailContent> = {};

function buildDetailContent(trip: Trip): TripDetailContent {
  const firstSchedule = trip.schedules[0];

  return {
    tagline: `สัมผัส ${trip.country} แบบเอ็กซ์คลูซีฟกับทีมงานมืออาชีพ`,
    overview: `${trip.name} เน้นประสบการณ์เชิงลึก คัดสรรสถานที่ถ่ายภาพและช่วงเวลาที่ดีที่สุด ให้คุณได้ใช้เวลาช้าๆ กับธรรมชาติและวัฒนธรรม พร้อมบริการดูแลตลอดทริป`,
    stats: [
      { label: "กำหนดการ", value: firstSchedule?.dates ?? "รอประกาศ" },
      { label: "ระยะเวลา", value: firstSchedule?.duration ?? "-" },
      { label: "กลุ่มเดินทาง", value: `${firstSchedule?.totalSeats ?? 12} ที่นั่ง / ไกด์ไทยดูแล` },
      { label: "สถานะ", value: firstSchedule?.status === "full" ? "เต็มแล้ว" : "เปิดจอง" },
    ],
    highlights: [
      `เก็บภาพแลนด์สเคปไฮไลต์ของ ${trip.country}`,
      "ลิ้มลองเมนูพื้นถิ่นและร้านดังที่คัดสรร",
      "โรงแรมระดับพรีเมียมและเดินทางแบบสบาย",
      "ทีมบริการส่วนตัวพร้อมดูแลทุกจังหวะ",
    ],
    itinerary: [
      {
        day: "DAY 01",
        title: "ออกเดินทางจากกรุงเทพฯ",
        description: "รวมพลที่สุวรรณภูมิพร้อมทีมงานอำนวยความสะดวก ก่อนบินตรงสู่จุดหมาย",
        details: [
          "ทีมงานช่วยเช็กอิน จัดสัมภาระ และดูแลเอกสารเดินทาง",
          `บินสู่ ${trip.country} ด้วยสายการบิน Full Service พร้อมเสิร์ฟอาหารร้อนบนเครื่อง`,
        ],
      },
      {
        day: "DAY 02",
        title: "สำรวจเมือง",
        description: `เดินเล่นใจกลางเมือง แวะจุดถ่ายภาพ และชิมเมนูชื่อดังของ ${trip.country}`,
        details: [
          "ถ่ายภาพแลนด์มาร์กสำคัญในช่วงแสงเช้า",
          "รับประทานมื้อกลางวันที่ร้านท้องถิ่นที่คัดสรร",
          "ช่วงบ่ายเดินตลาด ช้อปของที่ระลึก",
        ],
      },
    ],
    services: {
      includes: [
        "ตั๋วเครื่องบินไป-กลับ พร้อมสัมภาระ 30 กก.",
        "ที่พัก 4-5 ดาว พร้อมอาหารเช้า",
        "รถโค้ชส่วนตัวและคนขับท้องถิ่น",
        "หัวหน้าทัวร์และช่างภาพดูแลเต็มเวลา",
        "ประกันการเดินทางคุ้มครองสูงสุด 3 ล้านบาท",
      ],
      excludes: [
        "ค่าใช้จ่ายส่วนตัวและทิปตามความพึงพอใจ",
        "ค่าวีซ่า (ถ้ามี) และค่าหนังสือเดินทาง",
        "ค่าอาหารพิเศษที่อยู่นอกเหนือโปรแกรม",
      ],
    },
    reminders: [
      "หนังสือเดินทางต้องมีอายุไม่น้อยกว่า 6 เดือน",
      "ชำระมัดจำ 50% ภายใน 3 วันหลังจอง",
      "เตรียมเสื้อผ้าตามสภาพอากาศและรองเท้าเดินสบาย",
    ],
  };
}

export function getTripDetailContent(tripId: string): TripDetailContent | undefined {
  const cached = DETAIL_OVERVIEWS[tripId];
  if (cached) return cached;

  const trip = MOCK_TRIPS.find((item) => item.id === tripId);
  if (!trip) return undefined;

  const detail = buildDetailContent(trip);
  DETAIL_OVERVIEWS[tripId] = detail;
  return detail;
}

export interface GographySchedule {
  id: string;
  dates: string;
  duration: string;
  startDate: string;
  seatsAvailable: number;
  totalSeats: number;
  status: "open" | "full" | "coming_soon";
  price: number;
}

export function getMockTripData(tripId: string): {
  trip: Trip;
  schedules: GographySchedule[];
  gallery: GalleryImage[];
  itinerary: DetailedItineraryDay[];
  faqs: TripFAQ[];
} | null {
  const trip = MOCK_TRIPS.find((t) => t.id === tripId);
  if (!trip) return null;

  const schedules: GographySchedule[] = trip.schedules.map((s) => ({
    ...s,
    price: trip.price,
  }));

  return {
    trip,
    schedules,
    gallery: trip.gallery ?? [],
    itinerary: trip.detailedItinerary ?? [],
    faqs: trip.faqs ?? [],
  };
}
