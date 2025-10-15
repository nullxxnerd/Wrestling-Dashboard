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

export function HormonePanel() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        پانل هورمونی
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="تستوسترون کل"
          description="هورمون اصلی مردانه"
          option={createLineChartOption(
            "تستوسترون کل",
            [685, 720, 695, 710, 725, 705],
            "تستوسترون کل (ng/dL)",
            COLORS.blue,
            months
          )}
        />
        <ChartCard
          title="تستوسترون آزاد"
          description="تستوسترون زیست‌فعال"
          option={createLineChartOption(
            "تستوسترون آزاد",
            [18.2, 19.1, 18.5, 18.8, 19.3, 18.9],
            "تستوسترون آزاد (pg/mL)",
            COLORS.red,
            months
          )}
        />
        <ChartCard
          title="هورمون لوتئینه"
          description="هورمون لوتئینه‌کننده"
          option={createLineChartOption(
            "هورمون لوتئینه",
            [4.2, 4.5, 4.1, 4.3, 4.6, 4.4],
            "هورمون لوتئینه (mIU/mL)",
            COLORS.blue,
            months
          )}
        />
        <ChartCard
          title="هورمون محرک فولیکول"
          description="هورمون تحریک‌کننده فولیکول"
          option={createLineChartOption(
            "هورمون محرک فولیکول",
            [3.1, 3.3, 2.9, 3.2, 3.4, 3.1],
            "هورمون محرک فولیکول (mIU/mL)",
            COLORS.red,
            months
          )}
        />
      </div>
    </div>
  );
}