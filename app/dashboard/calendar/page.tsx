"use client";

import React, { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import ProgramModal from "./ProgramModal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar as CalendarIcon } from "lucide-react";

// FullCalendar must render on client only
const FullCalendar = dynamic(() => import("@fullcalendar/react"), {
  ssr: false,
});
// Calendar plugins
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";

// Styles for FullCalendar
// React imports are handled by JSX runtime; hooks used below are imported where needed.

// FullCalendar CSS is imported globally via `app/globals.css`.

type ProgramDetail = {
  title: string;
  focus: string;
  blocks: Array<{
    name: string;
    sets: number;
    reps: string | number;
    load?: string;
    notes?: string;
  }>;
  nutrition: string;
  recovery: string;
  aiRecommendations: string[];
};

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<ProgramDetail | null>(
    null
  );
  const [open, setOpen] = useState(false);

  // Mock training programs keyed by ISO date (YYYY-MM-DD)
  const programsByDate = useMemo<Record<string, ProgramDetail>>(
    () => ({
      // Example entries for the current month
      // Adjust or expand as needed
      [new Date().toISOString().slice(0, 10)]: {
        title: "هایپرتروفی: پوش",
        focus: "سینه، شانه‌ها، سه سر بازو",
        blocks: [
          { name: "پرس سینه", sets: 4, reps: "۶-۸", load: "RPE ۸" },
          { name: "پرس دمبل شیبدار", sets: 3, reps: "۸-۱۰" },
          { name: "فلای کابل", sets: 3, reps: 12 },
          { name: "بالا بردن جانبی", sets: 4, reps: 15 },
          { name: "پوشداون طناب سه سر", sets: 3, reps: 12 },
        ],
        nutrition: "۲۰۰ گرم پروتئین، +۲۵۰ کالری مازاد، هیدراته >۳ لیتر",
        recovery: "۱۰ دقیقه سرد کردن + ۱۵ دقیقه تحرک برای شانه‌ها",
        aiRecommendations: [
          "کمی آرنج را جمع کنید در پرس برای راحتی شانه.",
          "پرس دمبل شیبدار را ۲.۵ پوند پیشرفت دهید اگر ست آخر >۱۰ تکرار.",
          "ست اضافی جانبی اضافه کنید اگر خستگی شانه وجود ندارد.",
        ],
      },
    }),
    []
  );

  const events = useMemo(
    () =>
      Object.entries(programsByDate).map(([date, detail]) => ({
        title: detail.title,
        start: date,
        allDay: true,
        extendedProps: detail,
      })),
    [programsByDate]
  );

  function openForDate(dateStr: string) {
    setSelectedDate(dateStr);
    setSelectedProgram(programsByDate[dateStr] ?? null);
    setOpen(true);
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-5 w-5 text-gray-700" />
          <h1 className="text-xl sm:text-2xl font-semibold">تقویم تمرین</h1>
        </div>
        <Button
          variant="outline"
          className="rounded-md border-gray-200"
          onClick={() => openForDate(new Date().toISOString().slice(0, 10))}
        >
          برنامه امروز
        </Button>
      </div>

      <Card className="min-h-[70vh] rounded-md border-gray-200">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg">
            برنامه بدنسازی شما
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[65vh] sm:h-[75vh]">
            <FullCalendar
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
              initialView="dayGridMonth"
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay",
              }}
              height="100%"
              events={events}
              dateClick={(arg) => openForDate(arg.dateStr)}
              eventClick={(info) => {
                const dateStr = info.event.startStr.slice(0, 10);
                openForDate(dateStr);
              }}
              dayMaxEvents={2}
            />
          </div>
        </CardContent>
      </Card>

      <ProgramModal
        open={open}
        onOpenChange={setOpen}
        selectedDate={selectedDate}
        selectedProgram={selectedProgram}
      />
    </div>
  );
}
