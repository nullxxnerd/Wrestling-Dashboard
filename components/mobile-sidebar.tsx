"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Activity, ArrowRight } from "lucide-react";
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
    title: "Home",
    href: "/",
    description: "Landing page",
  },
  {
    title: "Features",
    href: "/#features",
    description: "What you get",
  },
  {
    title: "Pricing",
    href: "/#pricing",
    description: "Plans and billing",
  },
];

export function MobileSidebar({ className }: MobileSidebarProps) {
  const [open, setOpen] = React.useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    if (href.includes("#")) return false; // don't mark hash links as active
    const basePath = href.split("#")[0] || href;
    return pathname === basePath;
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
          <SheetTitle className="text-left">Wrestling MVP</SheetTitle>
        </SheetHeader>

        <nav className="flex flex-col gap-2 p-4">
          {navigationItems.map((item) => {
            const active = isActive(item.href);
            return (
              <SheetClose asChild key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-3 text-sm transition-all duration-200 group",
                    active
                      ? "text-brand-blue"
                      : "hover:bg-accent hover:text-accent-foreground"
                  )}
                  onClick={() => setOpen(false)}
                >
                  <div className="flex flex-col">
                    <span
                      className={cn(
                        "font-medium transition-colors",
                        active ? "text-brand-blue" : ""
                      )}
                    >
                      {item.title}
                    </span>
                    <span
                      className={cn(
                        "text-xs transition-colors",
                        active ? "text-brand-blue/80" : "text-muted-foreground"
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

        {/* Footer with action */}
        <div className="absolute bottom-0 left-0 right-0 border-t p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Activity className="h-4 w-4" />
              <span>Wrestling MVP</span>
            </div>
            <SheetClose asChild>
              <Link
                href="/dashboard"
                className="inline-flex items-center gap-2 rounded-md bg-black text-white px-3 py-2 text-sm font-medium shadow-sm hover:bg-black/90 active:bg-black/80"
                onClick={() => setOpen(false)}
              >
                Go To Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
