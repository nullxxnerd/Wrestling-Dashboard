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

interface DeadliftChartProps {
  data?: number[];
  timeframe?: number;
  showTrend?: boolean;
}

export default function DeadliftChart({
  data,
  timeframe = 30,
  showTrend = true,
}: DeadliftChartProps) {
  const defaultData = [
    485, 488, 490, 492, 488, 495, 497, 495, 500, 498, 502, 505, 503, 508, 506,
    510, 508, 512, 510, 515, 513, 512, 510, 508, 511, 513, 515, 517, 514, 520,
  ];

  const chartData = data || defaultData;
  const dates = generateDateRange(timeframe);

  const option = {
    title: {
      text: `Deadlift Progression - Last ${timeframe} Days`,
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
      min: Math.min(...chartData) - 15,
      max: Math.max(...chartData) + 15,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        data: chartData,
        type: "line",
        itemStyle: { color: COLORS.WRESTLING_GREEN },
        lineStyle: { color: COLORS.WRESTLING_GREEN, width: 3 },
        areaStyle: { color: `${COLORS.WRESTLING_GREEN}30` },
        smooth: true,
        ...(showTrend && {
          markLine: {
            data: [
              { type: "average", name: "Average" },
              { yAxis: 550, name: "Goal: 550 lbs" },
            ],
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
        <CardTitle className="text-lg">Deadlift Progression</CardTitle>
        <CardDescription>
          Daily deadlift maximums for posterior chain - Current PR: {currentMax}{" "}
          lbs
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
