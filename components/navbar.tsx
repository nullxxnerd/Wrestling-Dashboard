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
      <div className="max-8-xl mx-auto px-4" dir="rtl">
        <div className="flex justify-between py-4">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link
                href="/"
                className="flex items-center gap-3 text-xl font-semibold tracking-tight text-gray-900 hover:opacity-90 transition-opacity"
              >
                <Image
                  src="/icon.png"
                  alt="لوگو"
                  width={30}
                  height={30}
                  priority
                  className=""
                />
                تکنواسپورت
              </Link>
            </div>
            <div className="hidden md:mr-4 md:flex md:space-x-1">
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
                        : "text-gray-700 hover:text-gray-900 hover:bg-gray-100"
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
              className="hidden md:inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary to-primary/90 text-white px-4 py-2 text-sm font-medium shadow-lg hover:from-primary/90 hover:to-primary/70 active:scale-95 transition-all"
            >
              <span className="whitespace-nowrap">برو به داشبورد</span>
              <ArrowRight className="h-4 w-4 rotate-180" />
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
