"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COLORS, generateDateRange } from "../../utils";

interface BenchPressChartProps {
  data?: number[];
  timeframe?: number;
  showTrend?: boolean;
}

export default function BenchPressChart({
  data,
  timeframe = 30,
  showTrend = true,
}: BenchPressChartProps) {
  const defaultData = [
    295, 298, 300, 302, 298, 305, 307, 305, 310, 308, 312, 315, 313, 318, 316,
    320, 318, 322, 320, 325, 323, 322, 320, 318, 321, 323, 325, 327, 324, 330,
  ];

  const chartData = data || defaultData;
  const dates = generateDateRange(timeframe);

  const option = {
    title: {
      text: `Bench Press Max - Last ${timeframe} Days`,
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>Max: {c} lbs",
      textStyle: { fontSize: 12 },
    },
    xAxis: {
      type: "category",
      data: dates,
      axisLabel: { interval: Math.floor(timeframe / 6), fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Weight (lbs)",
      min: Math.min(...chartData) - 10,
      max: Math.max(...chartData) + 10,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        data: chartData,
        type: "line",
        itemStyle: { color: COLORS.WRESTLING_BLUE },
        lineStyle: { color: COLORS.WRESTLING_BLUE, width: 3 },
        areaStyle: { color: `${COLORS.WRESTLING_BLUE}30` },
        smooth: true,
        ...(showTrend && {
          markLine: {
            data: [{ type: "average", name: "Average" }],
            lineStyle: { color: COLORS.ORANGE, type: "dashed" },
          },
        }),
      },
    ],
  };

  const currentMax = Math.max(...chartData);
  const previousMax = chartData[chartData.length - 7] || chartData[0];
  const improvement = currentMax - previousMax;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Bench Press Progression</CardTitle>
        <CardDescription>
          Daily maximum lifts - Current PR: {currentMax} lbs
          {improvement > 0 && (
            <span className="text-green-600 ml-2">
              (+{improvement} lbs this week)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
      </CardContent>
    </Card>
  );
}
