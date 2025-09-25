"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { BarChart3, Home, Scale, Heart, Pill, Target } from "lucide-react";
import { MobileSidebar } from "@/components/mobile-sidebar";

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Blood Work", href: "/bloodwork", icon: Target },
  { name: "Body Composition", href: "/body-composition", icon: Scale },
  { name: "Lifting Metrics", href: "/lifting", icon: BarChart3 },
  { name: "Recovery", href: "/recovery", icon: Heart },
  { name: "Supplements", href: "/supplements", icon: Pill },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">
                Wrestling MVP Dashboard
              </h1>
            </div>
            <div className="hidden md:ml-6 md:flex md:space-x-2">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive =
                  pathname === item.href ||
                  (item.href !== "/" && pathname.startsWith(item.href));
                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "inline-flex items-center px-3 py-2 rounded-t-lg text-sm font-medium gap-2 transition-all duration-200 relative",
                      isActive
                        ? "bg-blue-50 text-blue-700 shadow-sm border-b-2 border-blue-600 dark:bg-blue-950 dark:text-blue-100 dark:border-blue-400"
                        : "text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-gray-100"
                    )}
                  >
                    <Icon
                      className={cn(
                        "h-4 w-4 transition-colors",
                        isActive ? "text-blue-600 dark:text-blue-400" : ""
                      )}
                    />
                    <span
                      className={cn(
                        "transition-colors",
                        isActive ? "font-semibold" : ""
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Mobile sidebar */}
          <div className="md:hidden flex items-center">
            <MobileSidebar />
          </div>
        </div>
      </div>
    </nav>
  );
}
