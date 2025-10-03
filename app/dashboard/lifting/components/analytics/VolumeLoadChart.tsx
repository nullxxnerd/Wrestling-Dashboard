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
      text: "Weekly Volume Load - Big 3",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      textStyle: { fontSize: 12 },
      formatter:
        "{b}<br/>{a0}: {c0} lbs<br/>{a1}: {c1} lbs<br/>{a2}: {c2} lbs<br/>Total: {c3} lbs",
    },
    legend: {
      data: ["Bench", "Squat", "Deadlift"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: weekLabels,
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Volume (lbs)",
      min: 0,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Bench",
        type: "bar",
        stack: "total",
        emphasis: { focus: "series" },
        data: benchVolume,
        itemStyle: { color: COLORS.WRESTLING_BLUE },
      },
      {
        name: "Squat",
        type: "bar",
        stack: "total",
        data: squatVolume,
        itemStyle: { color: COLORS.WRESTLING_RED },
      },
      {
        name: "Deadlift",
        type: "bar",
        stack: "total",
        data: deadliftVolume,
        itemStyle: { color: COLORS.WRESTLING_GREEN },
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
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Training Volume Analysis</CardTitle>
        <CardDescription>
          Weekly tonnage progression - Current:{" "}
          {currentWeekTotal.toLocaleString()} lbs
          {volumeChange !== 0 && (
            <span
              className={`ml-2 ${
                volumeChange > 0 ? "text-green-600" : "text-red-600"
              }`}
            >
              ({volumeChange > 0 ? "+" : ""}
              {volumeChange.toLocaleString()} lbs vs last week)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-blue-600">Bench Volume</div>
            <div>
              {benchVolume[benchVolume.length - 1].toLocaleString()} lbs
            </div>
            <div className="text-xs text-gray-500">
              {Math.round(
                (benchVolume[benchVolume.length - 1] / currentWeekTotal) * 100
              )}
              % of total
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-red-600">Squat Volume</div>
            <div>
              {squatVolume[squatVolume.length - 1].toLocaleString()} lbs
            </div>
            <div className="text-xs text-gray-500">
              {Math.round(
                (squatVolume[squatVolume.length - 1] / currentWeekTotal) * 100
              )}
              % of total
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-600">Deadlift Volume</div>
            <div>
              {deadliftVolume[deadliftVolume.length - 1].toLocaleString()} lbs
            </div>
            <div className="text-xs text-gray-500">
              {Math.round(
                (deadliftVolume[deadliftVolume.length - 1] / currentWeekTotal) *
                  100
              )}
              % of total
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
