"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Activity, Users, Zap, Heart, Pill, Target } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface MobileSidebarProps {
  className?: string;
}

const navigationItems = [
  {
    title: "Dashboard",
    href: "/",
    icon: Activity,
    description: "Overview and main dashboard",
  },
  {
    title: "Body Composition",
    href: "/body-composition",
    icon: Users,
    description: "Track body metrics and composition",
  },
  {
    title: "Lifting",
    href: "/lifting",
    icon: Zap,
    description: "Strength training and performance",
  },
  {
    title: "Recovery",
    href: "/recovery",
    icon: Heart,
    description: "Rest and recovery metrics",
  },
  {
    title: "Supplements",
    href: "/supplements",
    icon: Pill,
    description: "Supplement tracking and analysis",
  },
  {
    title: "Bloodwork",
    href: "/bloodwork",
    icon: Target,
    description: "Health biomarkers and lab results",
  },
];

export function MobileSidebar({ className }: MobileSidebarProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href === "/") {
      return pathname === "/";
    }
    return pathname.startsWith(href);
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("md:hidden", className)}
          aria-label="Open mobile menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader className="border-b px-6 py-4">
          <SheetTitle className="text-left">Wrestling Dashboard</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2 p-4">
          {navigationItems.map((item) => {
            const IconComponent = item.icon;
            const active = isActive(item.href);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all duration-200 group",
                    active
                      ? "bg-blue-50 text-blue-900 border-l-4 border-blue-600 shadow-sm dark:bg-blue-950 dark:text-blue-100 dark:border-blue-400"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <IconComponent
                    className={cn(
                      "h-5 w-5 transition-colors",
                      active
                        ? "text-blue-600 dark:text-blue-400"
                        : "text-muted-foreground group-hover:text-accent-foreground"
                    )}
                  />
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "font-medium transition-colors",
                        active ? "text-blue-900 dark:text-blue-100" : ""
                      )}
                    >
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "text-xs transition-colors",
                        active
                          ? "text-blue-700 dark:text-blue-300"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.description}
                    </span>
                  </div>
                </Link>
              </SheetClose>
            );
          })}
        </nav>

        {/* Footer section with branding */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Activity className="h-4 w-4" />
            <span>Wrestling MVP Dashboard</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            Track your wrestling performance
          </p>
        </div>
      </SheetContent>
    </Sheet>
  );
}
