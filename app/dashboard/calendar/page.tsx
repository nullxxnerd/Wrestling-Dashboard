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
        title: "Hypertrophy: Push",
        focus: "Chest, Shoulders, Triceps",
        blocks: [
          { name: "Bench Press", sets: 4, reps: "6-8", load: "RPE 8" },
          { name: "Incline DB Press", sets: 3, reps: "8-10" },
          { name: "Cable Fly", sets: 3, reps: 12 },
          { name: "Lateral Raise", sets: 4, reps: 15 },
          { name: "Triceps Rope Pushdown", sets: 3, reps: 12 },
        ],
        nutrition: "200g protein, +250 kcal surplus, hydrate >3L",
        recovery: "10 min cooldown + 15 min mobility for shoulders",
        aiRecommendations: [
          "Slight elbow tuck on bench for shoulder comfort.",
          "Progress incline DB by 2.5 lb if last set >10 reps.",
          "Add extra set of laterals if no shoulder fatigue.",
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
          <CalendarIcon className="h-5 w-5 text-purple-600" />
          <h1 className="text-xl sm:text-2xl font-semibold">
            Training Calendar
          </h1>
        </div>
        <Button
          variant="outline"
          onClick={() => openForDate(new Date().toISOString().slice(0, 10))}
        >
          Today’s Plan
        </Button>
      </div>

      <Card className="min-h-[70vh]">
        <CardHeader className="pb-2">
          <CardTitle className="text-base sm:text-lg">
            Your Bodybuilding Program
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
