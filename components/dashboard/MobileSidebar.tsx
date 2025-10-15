"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight, Home } from "lucide-react";
import Image from "next/image";
import * as Sheet from "@radix-ui/react-dialog";

// Reuse navItems and its types from the desktop Sidebar so both stay in sync
import { navItems as sharedNavItems } from "./Sidebar";

type NavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
  sections: { label: string }[];
};

const navItems: NavItem[] = sharedNavItems as unknown as NavItem[];

export default function MobileSidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedItem, setExpandedItem] = useState<string | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const pathname = usePathname();
  const router = useRouter();
  const sidebarRef = useRef<HTMLDivElement>(null);

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

    // For RTL sidebar on right side, swipe left to close
    if (isLeftSwipe && isOpen) {
      setIsOpen(false);
    }
  };

  const handleNavItemClick = (item: NavItem) => {
    if (item.sections.length > 0) {
      setExpandedItem(expandedItem === item.href ? null : item.href);
    } else {
      router.push(item.href);
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
      {/* Mobile Menu Button */}
      <div className="lg:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="inline-flex items-center justify-center gap-2 rounded-full px-3 py-1.5 bg-white/90 shadow-sm text-gray-700 hover:shadow-md hover:bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all duration-200 active:scale-95"
          aria-label="Open navigation menu"
        >
          <Image
            src="/icon.png"
            alt="لوگو"
            width={24}
            height={24}
            className="rounded-sm"
          />
          <span className="text-sm font-medium">منو</span>
          <Menu className="h-5 w-5 text-gray-600" />
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
            className="fixed inset-y-0 right-0 z-50 h-full w-80 max-w-[85vw] bg-white shadow-2xl data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right duration-300 ease-out"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onInteractOutside={() => setIsOpen(false)}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between border-b bg-gradient-to-r from-gray-50 to-gray-100/50 px-4 py-4"
              dir="rtl"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-sm">
                  <Home className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    داشبورد
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
                      <button
                        onClick={() => {
                          if (item.sections.length === 0) {
                            router.push(item.href);
                            setIsOpen(false);
                          } else {
                            handleNavItemClick(item);
                          }
                        }}
                        className={cn(
                          "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-right text-sm font-medium transition-all duration-200 active:scale-[0.98]",
                          isActive
                            ? "bg-gradient-to-l from-primary/10 to-primary/5 text-primary shadow-sm ring-1 ring-primary/10"
                            : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                        )}
                      >
                        {item.sections.length > 0 && (
                          <ChevronRight
                            className={cn(
                              "h-4 w-4 transition-all duration-300 ease-out",
                              isExpanded
                                ? "rotate-90 text-primary"
                                : "text-gray-400"
                            )}
                          />
                        )}
                        <span className="flex-1 truncate">{item.label}</span>
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
                      </button>

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
                          <div className="mr-12 space-y-1 pt-1 pb-2">
                            {item.sections.map((section, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleSectionClick(item.href)}
                                className="block w-full rounded-lg px-3 py-2.5 text-right text-xs font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-800 transition-all duration-200 active:scale-[0.98]"
                              >
                                <span className="flex items-center gap-2 justify-end">
                                  {section.label}
                                  <div className="h-1.5 w-1.5 rounded-full bg-gray-300" />
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
            <div className="border-t bg-gradient-to-l from-gray-50 to-gray-100/50 px-4 py-3">
              <div className="text-xs text-gray-500 text-center flex items-center justify-center gap-2">
                <span>بکشید تا ببندید</span>
                <span>←</span>
              </div>
            </div>
          </Sheet.Content>
        </Sheet.Portal>
      </Sheet.Root>
    </>
  );
}
