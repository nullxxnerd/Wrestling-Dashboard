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

export function MetabolicPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        پانل متابولیک
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="گلوکز"
          description="سطح قند خون"
          option={createLineChartOption(
            "گلوکز",
            [89, 92, 87, 91, 88, 90],
            "گلوکز (mg/dL)",
            COLORS.red,
            months
          )}
        />
        <ChartCard
          title="نیتروژن اوره خون"
          description="نشانگر عملکرد کلیه"
          option={createLineChartOption(
            "نیتروژن اوره",
            [18, 19, 17, 18, 19, 18],
            "نیتروژن اوره (mg/dL)",
            COLORS.blue,
            months
          )}
        />
        <ChartCard
          title="کراتینین"
          description="محصول تجزیه عضلانی"
          option={createLineChartOption(
            "کراتینین",
            [1.1, 1.2, 1.0, 1.1, 1.2, 1.1],
            "کراتینین (mg/dL)",
            COLORS.red,
            months
          )}
        />
        <ChartCard
          title="نرخ فیلتراسیون گلومرولی"
          description="نرخ فیلتراسیون کلیه"
          option={createLineChartOption(
            "نرخ فیلتراسیون",
            [95, 93, 97, 94, 96, 95],
            "نرخ فیلتراسیون (mL/min/1.73m²)",
            COLORS.blue,
            months
          )}
        />
      </div>
    </div>
  );
}