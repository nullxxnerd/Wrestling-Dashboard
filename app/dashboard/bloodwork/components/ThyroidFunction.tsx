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

export function ThyroidFunction() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        عملکرد تیروئید
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="هورمون محرک تیروئید"
          description="هورمون تحریک‌کننده تیروئید"
          option={createLineChartOption(
            "هورمون محرک تیروئید",
            [2.1, 2.3, 2.0, 2.2, 2.4, 2.1],
            "هورمون محرک تیروئید (mIU/L)",
            COLORS.blue,
            months
          )}
        />
        <ChartCard
          title="تری‌یدوتیرونین"
          description="هورمون تیروئید T3"
          option={createLineChartOption(
            "تری‌یدوتیرونین",
            [145, 148, 142, 146, 150, 147],
            "تری‌یدوتیرونین (ng/dL)",
            COLORS.red,
            months
          )}
        />
        <ChartCard
          title="تیروکسین آزاد"
          description="هورمون تیروئید آزاد"
          option={createLineChartOption(
            "تیروکسین آزاد",
            [1.35, 1.38, 1.32, 1.36, 1.4, 1.37],
            "تیروکسین آزاد (ng/dL)",
            COLORS.blue,
            months
          )}
        />
      </div>
    </div>
  );
}