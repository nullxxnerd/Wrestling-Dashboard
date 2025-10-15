"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COLORS, generateWeekLabels } from "../../utils";

interface EnduranceTestsChartProps {
  twoMileRunData?: number[];
  sprintData?: number[];
  rowingData?: number[];
  weeks?: number;
}

export default function EnduranceTestsChart({
  twoMileRunData = [13.2, 12.8, 12.5, 12.1],
  sprintData = [6.8, 6.6, 6.4, 6.2],
  rowingData = [7.2, 7.0, 6.8, 6.6],
  weeks = 4,
}: EnduranceTestsChartProps) {
  const weekLabels = generateWeekLabels(weeks);

  const option = {
    title: {
      text: "آزمون‌های عملکرد استقامتی",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter:
        "{b}<br/>{a0}: {c0} دقیقه<br/>{a1}: {c1} ثانیه<br/>{a2}: {c2} دقیقه",
    },
    legend: {
      data: ["دو 2 مایلی (دقیقه)", "اسپرینت 40yd (ثانیه)", "روئینگ 2K (دقیقه)"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: weekLabels,
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Time (min/sec)",
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "2-Mile Run (min)",
        type: "line",
        data: twoMileRunData,
        itemStyle: { color: COLORS.WRESTLING_BLUE },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "Sprint 40yd (sec)",
        type: "line",
        data: sprintData,
        itemStyle: { color: COLORS.WRESTLING_RED },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "Rowing 2K (min)",
        type: "line",
        data: rowingData,
        itemStyle: { color: COLORS.WRESTLING_GREEN },
        lineStyle: { width: 3 },
        smooth: true,
      },
    ],
  };

  const improvements = {
    run: twoMileRunData[0] - twoMileRunData[twoMileRunData.length - 1],
    sprint: sprintData[0] - sprintData[sprintData.length - 1],
    rowing: rowingData[0] - rowingData[rowingData.length - 1],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">آزمون‌های استقامتی</CardTitle>
        <CardDescription>
          پیشرفت استقامت و سرعت بر اساس زمان
          <div className="text-xs text-green-600 mt-1">
            دو: -{improvements.run.toFixed(1)} دقیقه | اسپرینت: -
            {improvements.sprint.toFixed(1)} ثانیه | روئینگ: -
            {improvements.rowing.toFixed(1)} دقیقه
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
      </CardContent>
    </Card>
  );
}
