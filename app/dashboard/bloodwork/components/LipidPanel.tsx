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

export function LipidPanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">پانل چربی خون</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="کلسترول کل"
          description="کلسترول کلی"
          option={createLineChartOption(
            "کلسترول کل",
            [185, 190, 182, 188, 192, 187],
            "کلسترول کل (mg/dL)",
            COLORS.red,
            months
          )}
        />
        <ChartCard
          title="کلسترول LDL"
          description="لیپوپروتئین با چگالی پایین"
          option={createLineChartOption(
            "کلسترول LDL",
            [108, 112, 105, 110, 115, 109],
            "کلسترول LDL (mg/dL)",
            COLORS.blue,
            months
          )}
        />
        <ChartCard
          title="کلسترول HDL"
          description="لیپوپروتئین با چگالی بالا"
          option={createLineChartOption(
            "کلسترول HDL",
            [52, 55, 51, 53, 56, 54],
            "کلسترول HDL (mg/dL)",
            COLORS.red,
            months
          )}
        />
        <ChartCard
          title="تری‌گلیسیرید"
          description="سطح چربی خون"
          option={createLineChartOption(
            "تری‌گلیسیرید",
            [125, 130, 122, 128, 135, 127],
            "تری‌گلیسیرید (mg/dL)",
            COLORS.blue,
            months
          )}
        />
      </div>
    </div>
  );
}