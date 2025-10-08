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

interface SquatChartProps {
  data?: number[];
  timeframe?: number;
  showTrend?: boolean;
}

export default function SquatChart({
  data,
  timeframe = 30,
  showTrend = true,
}: SquatChartProps) {
  const defaultData = [
    425, 428, 430, 432, 428, 435, 437, 435, 440, 438, 442, 445, 443, 448, 446,
    450, 448, 452, 450, 455, 453, 452, 450, 448, 451, 453, 455, 457, 454, 460,
  ];

  const chartData = data || defaultData;
  const dates = generateDateRange(timeframe);

  const option = {
    title: {
      text: `Squat Progression - Last ${timeframe} Days`,
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
        itemStyle: { color: COLORS.WRESTLING_RED },
        lineStyle: { color: COLORS.WRESTLING_RED, width: 3 },
        areaStyle: { color: `${COLORS.WRESTLING_RED}30` },
        smooth: true,
        ...(showTrend && {
          markLine: {
            data: [
              { type: "average", name: "Average" },
              { yAxis: 500, name: "Goal: 500 lbs" },
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
        <CardTitle className="text-lg">Squat Progression</CardTitle>
        <CardDescription>
          Daily squat maximums for lower body power - Current PR: {currentMax}{" "}
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
