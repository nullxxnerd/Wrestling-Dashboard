"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateWeekLabels } from "../../utils";

interface VolumeLoadChartProps {
  benchVolume?: number[];
  squatVolume?: number[];
  deadliftVolume?: number[];
  weeks?: number;
}

export default function VolumeLoadChart({
  benchVolume = [16800, 17250, 17520, 17640, 17900, 18050],
  squatVolume = [21000, 21400, 21650, 22000, 22250, 22500],
  deadliftVolume = [15200, 15500, 15750, 15800, 16050, 16200],
  weeks = 6,
}: VolumeLoadChartProps) {
  const weekLabels = generateWeekLabels(weeks);

  const option = {
    title: {
      text: "بار حجم هفتگی - سه حرکت بزرگ",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      textStyle: { fontSize: 12 },
      formatter:
        "{b}<br/>{a0}: {c0} پوند<br/>{a1}: {c1} پوند<br/>{a2}: {c2} پوند<br/>مجموع: {c3} پوند",
    },
    legend: {
      data: ["پرس سینه", "اسکوات", "ددلیفت"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: weekLabels,
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "حجم (پوند)",
      min: 0,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "پرس سینه",
        type: "bar",
        stack: "total",
        emphasis: { focus: "series" },
        data: benchVolume,
        itemStyle: { color: "#6B7280" },
      },
      {
        name: "اسکوات",
        type: "bar",
        stack: "total",
        data: squatVolume,
        itemStyle: { color: "#9CA3AF" },
      },
      {
        name: "ددلیفت",
        type: "bar",
        stack: "total",
        data: deadliftVolume,
        itemStyle: { color: "#D1D5DB" },
      },
    ],
  };

  const totalVolume = weekLabels.map(
    (_, i) => benchVolume[i] + squatVolume[i] + deadliftVolume[i]
  );

  const currentWeekTotal = totalVolume[totalVolume.length - 1];
  const previousWeekTotal =
    totalVolume[totalVolume.length - 2] || totalVolume[0];
  const volumeChange = currentWeekTotal - previousWeekTotal;

  return (
    <Card className="rounded-md border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg">تحلیل حجم تمرین</CardTitle>
        <CardDescription>
          پیشرفت تناژ هفتگی - فعلی: {currentWeekTotal.toLocaleString()} پوند
          {volumeChange !== 0 && (
            <span className={`ml-2 text-gray-700`}>
              ({volumeChange > 0 ? "+" : ""}
              {volumeChange.toLocaleString()} پوند در مقایسه با هفته گذشته)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-700">حجم پرس سینه</div>
            <div>
              {benchVolume[benchVolume.length - 1].toLocaleString()} پوند
            </div>
            <div className="text-xs text-gray-500">
              {Math.round(
                (benchVolume[benchVolume.length - 1] / currentWeekTotal) * 100
              )}
              % از مجموع
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">حجم اسکوات</div>
            <div>
              {squatVolume[squatVolume.length - 1].toLocaleString()} پوند
            </div>
            <div className="text-xs text-gray-500">
              {Math.round(
                (squatVolume[squatVolume.length - 1] / currentWeekTotal) * 100
              )}
              % از مجموع
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">حجم ددلیفت</div>
            <div>
              {deadliftVolume[deadliftVolume.length - 1].toLocaleString()} پوند
            </div>
            <div className="text-xs text-gray-500">
              {Math.round(
                (deadliftVolume[deadliftVolume.length - 1] / currentWeekTotal) *
                  100
              )}
              % از مجموع
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
