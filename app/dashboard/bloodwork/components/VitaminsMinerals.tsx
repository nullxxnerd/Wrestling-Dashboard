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

export function VitaminsMinerals() {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 mb-4">
        ویتامین‌ها و مواد معدنی
      </h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title="ویتامین D"
          description="سلامت استخوان و ایمنی"
          option={createLineChartOption(
            "ویتامین D",
            [32, 35, 30, 33, 36, 34],
            "ویتامین D (ng/mL)",
            COLORS.red,
            months
          )}
        />
        <ChartCard
          title="ویتامین B12"
          description="متابولیسم انرژی"
          option={createLineChartOption(
            "ویتامین B12",
            [485, 520, 465, 495, 535, 510],
            "ویتامین B12 (pg/mL)",
            COLORS.blue,
            months
          )}
        />
        <ChartCard
          title="فولات"
          description="پشتیبانی تقسیم سلولی"
          option={createLineChartOption(
            "فولات",
            [12.5, 13.2, 11.8, 12.8, 13.5, 12.9],
            "فولات (ng/mL)",
            COLORS.red,
            months
          )}
        />
        <ChartCard
          title="آهن"
          description="ماده معدنی حمل اکسیژن"
          option={createLineChartOption(
            "آهن",
            [105, 110, 102, 108, 112, 107],
            "آهن (μg/dL)",
            COLORS.blue,
            months
          )}
        />
        <ChartCard
          title="فریتین"
          description="پروتئین ذخیره آهن"
          option={createLineChartOption(
            "فریتین",
            [185, 195, 178, 188, 202, 192],
            "فریتین (ng/mL)",
            COLORS.red,
            months
          )}
        />
      </div>
    </div>
  );
}