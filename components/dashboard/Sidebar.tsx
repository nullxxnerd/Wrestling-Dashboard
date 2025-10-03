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
    label: "Overview",
    href: "/dashboard",
    icon: <Activity className="h-4 w-4" />,
    sections: [
      { label: "Quick Stats" },
      { label: "Performance Overview" },
      { label: "Readiness & Recovery" },
    ],
  },
  {
    label: "Body Composition",
    href: "/dashboard/body-composition",
    icon: <HeartPulse className="h-4 w-4" />,
    sections: [
      { label: "Interactive Diagram" },
      { label: "Trends" },
      { label: "Targets" },
    ],
  },
  {
    label: "Lifting",
    href: "/dashboard/lifting",
    icon: <Dumbbell className="h-4 w-4" />,
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
    icon: <CalendarDays className="h-4 w-4" />,
    sections: [
      { label: "My Schedule" },
      { label: "Programs" },
      { label: "Events" },
    ],
  },
  {
    label: "Bloodwork",
    href: "/dashboard/bloodwork",
    icon: <TestTube className="h-4 w-4" />,
    sections: [
      { label: "Cell Counts" },
      { label: "Hemoglobin & Hematocrit" },
      { label: "Trends & Zones" },
    ],
  },
  {
    label: "Recovery",
    href: "/dashboard/recovery",
    icon: <Droplets className="h-4 w-4" />,
    sections: [{ label: "Sleep" }, { label: "HRV" }, { label: "Hydration" }],
  },
  {
    label: "Supplements",
    href: "/dashboard/supplements",
    icon: <Pill className="h-4 w-4" />,
    sections: [
      { label: "Stack Overview" },
      { label: "Adherence" },
      { label: "Performance Correlation" },
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
      <div className="border bg-white text-sidebar-foreground rounded-lg shadow-sm">
        <div className="px-4 py-4 border-b">
          <div className="text-sm font-semibold text-muted-foreground">
            Dashboard
          </div>
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
                  className="rounded-lg border bg-background shadow-sm"
                >
                  <Accordion.Header>
                    <Accordion.Trigger
                      className={cn(
                        "flex w-full items-center gap-3 px-3 py-2 text-left text-sm transition-colors",
                        active
                          ? "bg-accent text-accent-foreground rounded-t-lg"
                          : "hover:bg-accent hover:text-accent-foreground rounded-t-lg"
                      )}
                      onClick={() => router.push(item.href)}
                    >
                      <span
                        className={cn(
                          "inline-flex h-6 w-6 items-center justify-center rounded-md border",
                          active
                            ? "border-transparent bg-primary text-primary-foreground"
                            : "border-border bg-background"
                        )}
                      >
                        {item.icon}
                      </span>
                      <span className="flex-1 min-w-0 truncate">
                        {item.label}
                      </span>
                      <ChevronDown
                        className="h-4 w-4 text-muted-foreground transition-transform data-[state=open]:rotate-180"
                        aria-hidden
                      />
                    </Accordion.Trigger>
                  </Accordion.Header>
                  {item.sections?.length ? (
                    <Accordion.Content className="overflow-hidden data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up">
                      <div className="px-3 pb-3 pt-2 grid grid-cols-1 gap-1.5">
                        {item.sections.map((s, idx) => (
                          <div
                            key={idx}
                            className="rounded-md text-xs text-muted-foreground px-2 py-1 hover:bg-accent hover:text-accent-foreground transition-colors"
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
