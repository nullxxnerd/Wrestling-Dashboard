"use client";

// Link removed — navigation is handled via next/navigation router
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  Dumbbell,
  Droplets,
  HeartPulse,
  Pill,
  TestTube,
  ChevronDown,
  CalendarDays,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

type Section = { label: string };
type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  sections: Section[];
};

const navItems: NavItem[] = [
  {
    label: "نمای کلی",
    href: "/dashboard",
    icon: <Activity className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "آمار سریع" },
      { label: "نمای عملکرد" },
      { label: "آمادگی و بازیابی" },
    ],
  },
  {
    label: "ترکیب بدنی",
    href: "/dashboard/body-composition",
    icon: <HeartPulse className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "نمودار تعاملی" },
      { label: "روندها" },
      { label: "اهداف" },
    ],
  },
  {
    label: "وزنه‌برداری",
    href: "/dashboard/lifting",
    icon: <Dumbbell className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "قدرت" },
      { label: "بدنسازی" },
      { label: "قلبی عروقی" },
      { label: "تحلیل‌ها" },
    ],
  },
  {
    label: "تقویم",
    href: "/dashboard/calendar",
    icon: <CalendarDays className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "برنامه من" },
      { label: "برنامه‌ها" },
      { label: "رویدادها" },
    ],
  },
  {
    label: "Bloodwork",
    href: "/dashboard/bloodwork",
    icon: <TestTube className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "شمارش سلول‌ها" },
      { label: "Hemoglobin & Hematocrit" },
      { label: "روندها و مناطق" },
    ],
  },
  {
    label: "بازیابی",
    href: "/dashboard/recovery",
    icon: <Droplets className="h-4 w-4 text-gray-700" />,
    sections: [{ label: "خواب" }, { label: "HRV" }, { label: "آب‌رسانی" }],
  },
  {
    label: "مکمل‌ها",
    href: "/dashboard/supplements",
    icon: <Pill className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "نمای کلی پشته" },
      { label: "پیروی" },
      { label: "همبستگی عملکرد" },
    ],
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  // Determine which accordion should be open by default based on route
  const activeItem = navItems.find(
    (i) =>
      pathname === i.href ||
      (pathname?.startsWith(i.href) && i.href !== "/dashboard")
  )?.href;

  return (
    <aside className="hidden lg:block w-64 shrink-0">
      <div className="border border-gray-200 bg-white text-gray-900 rounded-md shadow-sm">
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="text-sm font-semibold text-gray-700">داشبورد</div>
        </div>

        <nav className="p-3 space-y-3">
          <Accordion.Root
            type="single"
            collapsible
            className="space-y-3"
            defaultValue={activeItem}
          >
            {navItems.map((item) => {
              const active =
                pathname === item.href ||
                (pathname?.startsWith(item.href) && item.href !== "/dashboard");
              const value = item.href;
              return (
                <Accordion.Item
                  key={item.href}
                  value={value}
                  className="rounded-md border border-gray-200 bg-white shadow-sm"
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 text-right text-sm transition-colors flex-row-reverse",
                        active
                          ? "bg-gray-100 text-gray-900 rounded-t-md"
                          : "hover:bg-gray-100 hover:text-gray-900 rounded-t-md"
                      )}
                      onClick={() => router.push(item.href)}
                    >
                      <span
                        className={cn(
                          "inline-flex h-6 w-6 items-center justify-center rounded-md border",
                          active
                            ? "border-gray-300 bg-gray-100"
                            : "border-gray-200 bg-white"
                        )}
                      >
                        {/* Keep icon color constant regardless of active */}
                        {item.icon}
                      </span>
                      <span className="flex-1 min-w-0 truncate">
                        {item.label}
                      </span>
                      <ChevronDown
                        className="h-4 w-4 text-gray-700 transition-transform data-[state=open]:rotate-180"
                        aria-hidden
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  {item.sections?.length ? (
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-3 pb-3 pt-2 grid grid-cols-1 gap-1.5 text-right">
                        {item.sections.map((s, idx) => (
                          <div
                            key={idx}
                            className="rounded-md text-xs text-gray-700 px-2 py-1 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                          >
                            {s.label}
                          </div>
                        ))}
                      </div>
                    </Accordion.Content>
                  ) : null}
                </Accordion.Item>
              );
            })}
          </Accordion.Root>
        </nav>
      </div>
    </aside>
  );
}
