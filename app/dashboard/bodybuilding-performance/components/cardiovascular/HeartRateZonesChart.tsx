"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COLORS } from "../../utils";

interface HeartRateZonesChartProps {
  zones?: {
    zone1: number;
    zone2: number;
    zone3: number;
    zone4: number;
    zone5: number;
  };
}

export default function HeartRateZonesChart({
  zones = {
    zone1: 15,
    zone2: 25,
    zone3: 30,
    zone4: 20,
    zone5: 10,
  },
}: HeartRateZonesChartProps) {
  const option = {
    title: {
      text: "مناطق تمرینی ضربان قلب",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a}<br/>{b}: {c}% ({d}%)",
      textStyle: { fontSize: 12 },
    },
    legend: {
      orient: "vertical",
      left: "left",
      textStyle: { fontSize: 11 },
    },
    series: [
      {
        name: "زمان تمرین",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["60%", "50%"],
        data: [
          {
            value: zones.zone1,
            name: "منطقه 1 (بازیابی)",
            itemStyle: { color: COLORS.SECONDARY_GREEN },
          },
          {
            value: zones.zone2,
            name: "منطقه 2 (هوازی)",
            itemStyle: { color: COLORS.SECONDARY_BLUE },
          },
          {
            value: zones.zone3,
            name: "منطقه 3 (تمپو)",
            itemStyle: { color: COLORS.ORANGE },
          },
          {
            value: zones.zone4,
            name: "منطقه 4 (آستانه)",
            itemStyle: { color: COLORS.SECONDARY_RED },
          },
          {
            value: zones.zone5,
            name: "منطقه 5 (بی‌هوازی)",
            itemStyle: { color: COLORS.PURPLE },
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
        label: { fontSize: 11 },
      },
    ],
  };

  const totalTime = Object.values(zones).reduce((sum, value) => sum + value, 0);
  const recommendations = {
    zone1: { min: 10, max: 20, ideal: "10-20%" },
    zone2: { min: 40, max: 60, ideal: "40-60%" },
    zone3: { min: 15, max: 25, ideal: "15-25%" },
    zone4: { min: 5, max: 15, ideal: "5-15%" },
    zone5: { min: 2, max: 8, ideal: "2-8%" },
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">توزیع تمرین ضربان قلب</CardTitle>
        <CardDescription>
          زمان صرف‌شده در مناطق مختلف ضربان قلب این هفته
          <div className="text-xs text-gray-500 mt-1">
            تمرکز منطقه 2 برای ورزشکاران استقامتی توصیه می‌شود
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="grid grid-cols-5 gap-2 mt-4 text-xs">
          {Object.entries(zones).map(([zone, value], index) => {
            const percentage = Math.round((value / totalTime) * 100);
            const zoneKey = zone as keyof typeof recommendations;
            const rec = recommendations[zoneKey];
            const isOptimal = percentage >= rec.min && percentage <= rec.max;

            return (
              <div key={zone} className="text-center">
                <div
                  className={`font-semibold ${
                    isOptimal ? "text-green-600" : "text-yellow-600"
                  }`}
                >
                  منطقه {index + 1}
                </div>
                <div>{percentage}%</div>
                <div className="text-gray-500">{rec.ideal}</div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
