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

interface AccessoryLiftsChartProps {
  overheadPressData?: number[];
  closeGripBenchData?: number[];
  bentRowData?: number[];
  romanianDLData?: number[];
  weeks?: number;
}

export default function AccessoryLiftsChart({
  overheadPressData = [185, 188, 190, 195],
  closeGripBenchData = [275, 280, 285, 290],
  bentRowData = [225, 230, 235, 240],
  romanianDLData = [355, 360, 365, 370],
  weeks = 4,
}: AccessoryLiftsChartProps) {
  const weekLabels = generateWeekLabels(weeks);

  const option = {
    title: {
      text: "Accessory Lift Progression",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter:
        "{b}<br/>{a0}: {c0} lbs<br/>{a1}: {c1} lbs<br/>{a2}: {c2} lbs<br/>{a3}: {c3} lbs",
    },
    legend: {
      data: ["Overhead Press", "Close-Grip Bench", "Bent Row", "Romanian DL"],
      textStyle: { fontSize: 11 },
      top: 30,
    },
    xAxis: {
      type: "category",
      data: weekLabels,
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Weight (lbs)",
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Overhead Press",
        type: "line",
        data: overheadPressData,
        itemStyle: { color: COLORS.WRESTLING_BLUE },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "Close-Grip Bench",
        type: "line",
        data: closeGripBenchData,
        itemStyle: { color: COLORS.WRESTLING_RED },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "Bent Row",
        type: "line",
        data: bentRowData,
        itemStyle: { color: COLORS.WRESTLING_GREEN },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "Romanian DL",
        type: "line",
        data: romanianDLData,
        itemStyle: { color: COLORS.PURPLE },
        lineStyle: { width: 3 },
        smooth: true,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Accessory Movements</CardTitle>
        <CardDescription>
          Supporting lift progression for balanced development
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
      </CardContent>
    </Card>
  );
}
