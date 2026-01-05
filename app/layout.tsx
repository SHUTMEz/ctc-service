import type { Metadata } from "next";
import { Mitr } from "next/font/google";
import "./globals.css";

const mitr = Mitr({
  subsets: ["latin"],
  weight: "400"
});

export const metadata: Metadata = {
  title: "ระบบแจ้งซ่อมวิทยาลัยเทคนิคชัยภูมิ | CTC Service",
  description: "ระบบแจ้งซ่อมวิทยาลัยเทคนิคชัยภูมิ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mitr.className}`}
      >
        {children}
      </body>
    </html>
  );
}
