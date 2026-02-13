import type { Metadata } from "next";
import { Montserrat, Noto_Sans_Thai } from "next/font/google";
import "./globals.css";
import { GoogleTagManager, GoogleTagManagerNoscript } from "@/components/GoogleTagManager";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Lens Voyage - ชวนคุณออกเดินทางผ่านเลนส์",
  description: "เพื่อมองเห็นโลกในมุมของคุณและมีความหมาย ทุกการเดินทางถูกออกแบบมาเพื่อคุณโดยเฉพาะ",
};
import { FloatingContact } from "@/components/ui/FloatingContact";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th" className={`${montserrat.variable} ${notoSansThai.variable}`}>
      <head>
        <GoogleTagManager />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <GoogleTagManagerNoscript />
        {children}
        <FloatingContact />
      </body>
    </html>
  );
}
