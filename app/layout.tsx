import type { Metadata } from "next";
import { Geist, Geist_Mono, Vazirmatn } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const vazirmatn = Vazirmatn({
  variable: "--font-vazirmatn-body",
  weight: "400",
  subsets: ["latin", "arabic"],
});

export const metadata: Metadata = {
  title: "Wrestling MVP Dashboard",
  description: "Performance analytics dashboard for wrestling athletes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${vazirmatn.variable} vazirmatn-body antialiased bg-gray-50`}
      >
        <Navbar />
        <main className="min-h-screen   mx-auto">{children}</main>
      </body>
    </html>
  );
}
