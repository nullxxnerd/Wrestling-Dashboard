"use client";

import { ChartCard } from "./ChartCard";
import { createLineChartOption, COLORS } from "../utils/chartConfig";

const months = [
  "Jan 2024",
  "Feb 2024",
  "Mar 2024",
  "Apr 2024",
  "May 2024",
  "Jun 2024",
];

export function CompleteBloodCount() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        شمارش کامل خون
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="گلبول‌های سفید خون"
          description="سلول‌های سیستم ایمنی"
          option={createLineChartOption(
            "گلبول‌های سفید",
            [6.8, 7.2, 6.9, 7.1, 6.7, 7.0],
            "سلول (×۱۰³/μL)",
            COLORS.blue,
            months
          )}
        />
        <ChartCard
          title="گلبول‌های قرمز خون"
          description="سلول‌های حمل اکسیژن"
          option={createLineChartOption(
            "گلبول‌های قرمز",
            [4.8, 4.9, 4.7, 4.8, 4.9, 4.8],
            "سلول (×۱۰⁶/μL)",
            COLORS.red,
            months
          )}
        />
        <ChartCard
          title="هموگلوبین"
          description="پروتئین حامل اکسیژن"
          option={createLineChartOption(
            "هموگلوبین",
            [15.2, 15.8, 15.1, 15.5, 15.6, 15.4],
            "هموگلوبین (g/dL)",
            COLORS.blue,
            months
          )}
        />
        <ChartCard
          title="هماتوکریت"
          description="درصد حجم خون"
          option={createLineChartOption(
            "هماتوکریت",
            [44.2, 45.1, 43.8, 44.7, 45.0, 44.5],
            "هماتوکریت (%)",
            COLORS.red,
            months
          )}
        />
        <ChartCard
          title="شمارش پلاکت"
          description="قابلیت انعقاد خون"
          option={createLineChartOption(
            "پلاکت",
            [245, 258, 238, 252, 265, 250],
            "پلاکت (×۱۰³/μL)",
            COLORS.blue,
            months
          )}
        />
      </div>
    </div>
  );
}