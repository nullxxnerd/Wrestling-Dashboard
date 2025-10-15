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

export function InflammatoryMarkers() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        نشانگرهای التهابی
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="پروتئین واکنشی C"
          description="پروتئین واکنشی سی"
          option={createLineChartOption(
            "پروتئین واکنشی C",
            [0.8, 1.2, 0.6, 0.9, 1.1, 0.7],
            "پروتئین واکنشی C (mg/L)",
            COLORS.blue,
            months
          )}
        />
        <ChartCard
          title="سرعت رسوب گلبول قرمز"
          description="نرخ رسوب گلبول قرمز"
          option={createLineChartOption(
            "سرعت رسوب",
            [8, 12, 6, 9, 11, 7],
            "سرعت رسوب (mm/hr)",
            COLORS.red,
            months
          )}
        />
        <ChartCard
          title="اینترلوکین-۶"
          description="اینترلوکین شش"
          option={createLineChartOption(
            "اینترلوکین-۶",
            [2.1, 2.8, 1.9, 2.3, 2.6, 2.2],
            "اینترلوکین-۶ (pg/mL)",
            COLORS.blue,
            months
          )}
        />
        <ChartCard
          title="فاکتور نکروز تومور"
          description="فاکتور نکروز تومور آلفا"
          option={createLineChartOption(
            "فاکتور نکروز تومور",
            [3.2, 3.8, 2.9, 3.4, 3.6, 3.1],
            "فاکتور نکروز تومور (pg/mL)",
            COLORS.red,
            months
          )}
        />
      </div>
    </div>
  );
}