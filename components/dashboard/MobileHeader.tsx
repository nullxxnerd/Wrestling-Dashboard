"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Activity,
  Dumbbell,
  Droplets,
  HeartPulse,
  Pill,
  TestTube,
  CalendarDays,
  ChevronDown,
  X,
  ChevronRight,
  Home,
} from "lucide-react";
import * as Sheet from "@radix-ui/react-dialog";

type Section = { label: string };
type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  sections: Section[];
};

const navItems: NavItem[] = [
  {
    label: "Overview",
    href: "/dashboard",
    icon: <Activity className="h-5 w-5" />,
    sections: [
      { label: "Quick Stats" },
      { label: "Performance Overview" },
      { label: "Readiness & Recovery" },
    ],
  },
  {
    label: "Body Composition",
    href: "/dashboard/body-composition",
    icon: <HeartPulse className="h-5 w-5" />,
    sections: [
      { label: "Interactive Diagram" },
      { label: "Trends" },
      { label: "Targets" },
    ],
  },
  {
    label: "Lifting",
    href: "/dashboard/lifting",
    icon: <Dumbbell className="h-5 w-5" />,
    sections: [
      { label: "Strength" },
      { label: "Bodybuilding" },
      { label: "Cardiovascular" },
      { label: "Analytics" },
    ],
  },
  {
    label: "Calendar",
    href: "/dashboard/calendar",
    icon: <CalendarDays className="h-5 w-5" />,
    sections: [
      { label: "My Schedule" },
      { label: "Programs" },
      { label: "Events" },
    ],
  },
  {
    label: "Bloodwork",
    href: "/dashboard/bloodwork",
    icon: <TestTube className="h-5 w-5" />,
    sections: [
      { label: "Cell Counts" },
      { label: "Hemoglobin & Hematocrit" },
      { label: "Trends & Zones" },
    ],
  },
  {
    label: "Recovery",
    href: "/dashboard/recovery",
    icon: <Droplets className="h-5 w-5" />,
    sections: [{ label: "Sleep" }, { label: "HRV" }, { label: "Hydration" }],
  },
  {
    label: "Supplements",
    href: "/dashboard/supplements",
    icon: <Pill className="h-5 w-5" />,
    sections: [
      { label: "Stack Overview" },
      { label: "Adherence" },
      { label: "Performance Correlation" },
    ],
  },
];

type PageInfo = {
  title: string;
  subtitle?: string;
  icon: React.ReactNode;
};

const pageMap: Record<string, PageInfo> = {
  "/dashboard": {
    title: "Overview",
    subtitle: "Dashboard home",
    icon: <Activity className="h-5 w-5" />,
  },
  "/dashboard/body-composition": {
    title: "Body Composition",
    subtitle: "Track your physique",
    icon: <HeartPulse className="h-5 w-5" />,
  },
  "/dashboard/lifting": {
    title: "Lifting",
    subtitle: "Training analytics",
    icon: <Dumbbell className="h-5 w-5" />,
  },
  "/dashboard/calendar": {
    title: "Calendar",
    subtitle: "Schedule & programs",
    icon: <CalendarDays className="h-5 w-5" />,
  },
  "/dashboard/bloodwork": {
    title: "Bloodwork",
    subtitle: "Health metrics",
    icon: <TestTube className="h-5 w-5" />,
  },
  "/dashboard/recovery": {
    title: "Recovery",
    subtitle: "Rest & wellness",
    icon: <Droplets className="h-5 w-5" />,
  },
  "/dashboard/supplements": {
    title: "Supplements",
    subtitle: "Stack optimization",
    icon: <Pill className="h-5 w-5" />,
  },
};

export default function MobileHeader() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Get current page info or default to Overview
  const currentPage = pageMap[pathname] || pageMap["/dashboard"];

  // Minimum distance for swipe gesture
  const minSwipeDistance = 50;

  // Close sidebar when route changes
  useEffect(() => {
    setIsOpen(false);
    setExpandedItem(null);
  }, [pathname]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // Touch gesture handlers
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;

    if (isLeftSwipe && isOpen) {
      setIsOpen(false);
    }
  };

  const handleSectionClick = (href: string) => {
    router.push(href);
    setIsOpen(false);
  };

  // Auto-expand current section
  useEffect(() => {
    const currentItem = navItems.find(
      (item) =>
        pathname === item.href ||
        (pathname?.startsWith(item.href) && item.href !== "/dashboard")
    );
    if (currentItem && currentItem.sections.length > 0) {
      setExpandedItem(currentItem.href);
    }
  }, [pathname]);

  return (
    <>
      {/* Mobile Navigation Button */}
      <div className="flex items-center justify-between w-full">
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-3 w-full px-4 py-3 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200 group active:scale-[0.98]"
          aria-label="Open navigation menu"
        >
          {/* Page Icon */}
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary group-hover:bg-primary/15 transition-colors">
            {currentPage.icon}
          </div>

          {/* Page Info */}
          <div className="flex-1 text-left min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">
              {currentPage.title}
            </div>
            {currentPage.subtitle && (
              <div className="text-xs text-gray-500 truncate">
                {currentPage.subtitle}
              </div>
            )}
          </div>

          {/* Dropdown Arrow */}
          <ChevronDown className="h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors" />
        </button>
      </div>

      {/* Mobile Sidebar Sheet */}
      <Sheet.Root open={isOpen} onOpenChange={setIsOpen}>
        <Sheet.Portal>
          {/* Backdrop */}
          <Sheet.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 duration-300" />

          {/* Sidebar Content */}
          <Sheet.Content
            ref={sidebarRef}
            className="fixed inset-y-0 left-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left duration-300 ease-out"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onInteractOutside={() => setIsOpen(false)}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b bg-gradient-to-r from-gray-50 to-gray-100/50 px-4 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
                  <Home className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Dashboard
                  </h2>
                  <p className="text-xs text-gray-500">Wrestling MVP</p>
                </div>
              </div>
              <Sheet.Close asChild>
                <button
                  className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-200 active:scale-95"
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </Sheet.Close>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-3 py-4">
              <div className="space-y-2">
                {navItems.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (pathname?.startsWith(item.href) &&
                      item.href !== "/dashboard");
                  const isExpanded = expandedItem === item.href;

                  return (
                    <div key={item.href} className="space-y-1">
                      {/* Main Navigation Item */}
                      <div className="relative">
                        <button
                          onClick={() => {
                            // Always navigate to the page and close sidebar
                            router.push(item.href);
                            setIsOpen(false);
                          }}
                          className={cn(
                            "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                            isActive
                              ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary shadow-sm ring-1 ring-primary/10"
                              : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                          )}
                        >
                          <span
                            className={cn(
                              "flex h-9 w-9 items-center justify-center rounded-lg transition-all duration-200",
                              isActive
                                ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm"
                                : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                            )}
                          >
                            {item.icon}
                          </span>
                          <span className="flex-1 truncate">{item.label}</span>
                          {item.sections.length > 0 && (
                            <button
                              onClick={(e) => {
                                e.stopPropagation(); // Prevent navigation
                                setExpandedItem(
                                  expandedItem === item.href ? null : item.href
                                );
                              }}
                              className="p-1 rounded-md hover:bg-gray-100/50 transition-colors"
                              aria-label={`${
                                isExpanded ? "Collapse" : "Expand"
                              } ${item.label} sections`}
                            >
                              <ChevronRight
                                className={cn(
                                  "h-4 w-4 transition-all duration-300 ease-out",
                                  isExpanded
                                    ? "rotate-90 text-primary"
                                    : "text-gray-400"
                                )}
                              />
                            </button>
                          )}
                        </button>
                      </div>

                      {/* Sections (Expandable) */}
                      {item.sections.length > 0 && (
                        <div
                          className={cn(
                            "overflow-hidden transition-all duration-300 ease-out",
                            isExpanded
                              ? "max-h-96 opacity-100"
                              : "max-h-0 opacity-0"
                          )}
                        >
                          <div className="ml-12 space-y-1 pt-1 pb-2">
                            {item.sections.map((section, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSectionClick(item.href)}
                                className="block w-full rounded-lg px-3 py-2.5 text-left text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-all duration-200 active:scale-[0.98]"
                              >
                                <span className="flex items-center gap-2">
                                  <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
                                  {section.label}
                                </span>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </nav>

            {/* Footer */}
            <div className="border-t bg-gradient-to-r from-gray-50 to-gray-100/50 px-4 py-3">
              <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                <span>←</span>
                <span>Swipe left to close</span>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Portal>
      </Sheet.Root>
    </>
  );
}
