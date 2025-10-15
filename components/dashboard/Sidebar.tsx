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
  MessageCircle,
} from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

type Section = { label: string; id: string };
type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  sections: Section[];
};

export const navItems: NavItem[] = [
  {
    label: "نمای کلی",
    href: "/dashboard",
    icon: <Activity className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "آمار سریع", id: "overview-quick-stats" },
      { label: "نمای عملکرد", id: "overview-performance" },
      { label: "آمادگی و بازیابی", id: "overview-recovery" },
    ],
  },
  {
    label: "ترکیب بدنی",
    href: "/dashboard/body-composition",
    icon: <HeartPulse className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "نمودار تعاملی", id: "interactive-chart" },
      { label: "روندها", id: "trends" },
      { label: "اهداف", id: "goals" },
    ],
  },
  {
    label: "عملکرد بدنسازی",
    href: "/dashboard/bodybuilding-performance",
    icon: <Dumbbell className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "قدرت", id: "strength" },
      { label: "بدنسازی", id: "bodybuilding" },
      { label: "قلبی عروقی", id: "cardio" },
      { label: "تحلیل‌ها", id: "analytics" },
    ],
  },
  {
    label: "تقویم",
    href: "/dashboard/calendar",
    icon: <CalendarDays className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "برنامه من", id: "my-program" },
      { label: "برنامه‌ها", id: "programs" },
      { label: "رویدادها", id: "events" },
    ],
  },
  {
    label: "آزمایش خون",
    href: "/dashboard/bloodwork",
    icon: <TestTube className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "شمارش سلول‌ها", id: "cbc" },
      { label: "Hemoglobin & Hematocrit", id: "hemoglobin-hematocrit" },
      { label: "روندها و مناطق", id: "trends-and-zones" },
    ],
  },
  // {
  //   label: "بازیابی",
  //   href: "/dashboard/recovery",
  //   icon: <Droplets className="h-4 w-4 text-gray-700" />,
  //   sections: [{ label: "خواب" }, { label: "HRV" }, { label: "آب‌رسانی" }],
  // },
  // {
  //   label: "مکمل‌ها",
  //   href: "/dashboard/supplements",
  //   icon: <Pill className="h-4 w-4 text-gray-700" />,
  //   sections: [
  //     { label: "نمای کلی پشته" },
  //     { label: "پیروی" },
  //     { label: "همبستگی عملکرد" },
  //   ],
  // },
  {
    label: "چت هوش مصنوعی",
    href: "/dashboard/chat",
    icon: <MessageCircle className="h-4 w-4 text-gray-700" />,
    sections: [
      { label: "مشاوره تمرین", id: "training-advice" },
      { label: "راهنمای تغذیه", id: "nutrition-guidance" },
      { label: "تحلیل عملکرد", id: "performance-analysis" },
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
      <div className="border border-gray-300 bg-white text-gray-900 rounded-lg ">
        <div className="px-4 py-4 border-b border-gray-200">
          <div className="text-sm font-semibold text-gray-700">داشبورد</div>
        </div>

        <nav className="p-3 space-y-3">
          <Accordion.Root
            type="single"
            collapsible
            className="space-y-3"
            value={activeItem}
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
                  className="rounded-md  bg-white "
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 text-right text-sm transition-colors",
                        active
                          ? "bg-gray-100 text-gray-900 font-bold rounded-t-md"
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
                      <span
                        className={cn(
                          "flex-1 min-w-0 truncate",
                          active && "font-bold"
                        )}
                      >
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
                          <button
                            key={idx}
                            onClick={async () => {
                              const hash = `#${s.id}`;
                              // navigate to route + hash
                              await router.push(`${item.href}${hash}`);
                              // if already on the page, try to scroll to the element
                              try {
                                const el = document.getElementById(s.id);
                                if (el)
                                  el.scrollIntoView({ behavior: "smooth" });
                              } catch {
                                // noop
                              }
                            }}
                            className="w-full text-right rounded-md text-sm text-gray-700 px-2 py-2 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                          >
                            {s.label}
                          </button>
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
