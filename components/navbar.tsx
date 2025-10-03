"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import { MobileSidebar } from "@/components/mobile-sidebar";

const navigation = [
  { name: "خانه", href: "/" },
  { name: "امکانات", href: "/#features" },
  { name: "قیمت‌گذاری", href: "/#pricing" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4" dir="rtl">
        <div className="flex justify-between py-4">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center gap-2 text-xl font-semibold tracking-tight text-gray-900 hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/icon.png"
                  alt="لوگو"
                  width={60}
                  height={60}
                  priority
                />
                تکنواسپورت
              </Link>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-1">
              {navigation.map((item) => {
                const hasHash = item.href.includes("#");
                const basePath = item.href.split("#")[0] || item.href;
                const isActive = !hasHash && pathname === basePath;
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors",
                      isActive
                        ? "text-brand-blue"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    )}
                  >
                    {item.name}
                  </Link>
                );
              })}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/dashboard"
              className="hidden md:inline-flex items-center gap-2 rounded-md bg-black text-white px-4 py-2 text-sm font-medium shadow-sm hover:bg-black/90 active:bg-black/80 transition-colors"
            >
              برو به داشبورد
              <ArrowRight className="h-5 w-5 rotate-180" />
            </Link>
            {/* Mobile sidebar */}
            <div className="md:hidden flex items-center">
              <MobileSidebar />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
