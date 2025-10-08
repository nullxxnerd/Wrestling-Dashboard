"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { navItems } from "@/components/dashboard/Sidebar";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const activeItem = navItems.find(
    (i) =>
      pathname === i.href ||
      (pathname?.startsWith(i.href) && i.href !== "/dashboard")
  );
  const currentLabel = activeItem?.label ?? "صفحه کنون";

  return (
    <nav aria-label="breadcrumbs" className="">
      <ol className="flex items-center gap-2 text-sm text-gray-600">
        <li>
          <Link href="/" className="hover:text-gray-900">
            صفحه اصلی
          </Link>
        </li>
        <li className="text-gray-400">›</li>
        <li>
          <Link href="/dashboard" className="hover:text-gray-900">
            داشبورد
          </Link>
        </li>
        <li className="text-gray-400">›</li>
        <li className="text-gray-900" aria-current="page">
          {currentLabel}
        </li>
      </ol>
    </nav>
  );
}
