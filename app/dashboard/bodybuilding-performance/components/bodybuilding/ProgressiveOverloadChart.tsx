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

interface ProgressiveOverloadChartProps {
  exerciseData?: {
    exercise: string;
    weeks: string[];
    weight: number[];
    volume: number[];
    intensity: number[];
  }[];
}

export default function ProgressiveOverloadChart({
  exerciseData = [
    {
      exercise: "Bench Press",
      weeks: ["W1", "W2", "W3", "W4", "W5", "W6"],
      weight: [315, 317, 320, 322, 325, 327],
      volume: [16800, 17250, 17520, 17640, 17900, 18050],
      intensity: [85, 86, 87, 87, 88, 89],
    },
    {
      exercise: "Squat",
      weeks: ["W1", "W2", "W3", "W4", "W5", "W6"],
      weight: [450, 452, 455, 457, 460, 462],
      volume: [21000, 21400, 21650, 22000, 22250, 22500],
      intensity: [87, 88, 88, 89, 89, 90],
    },
  ],
}: ProgressiveOverloadChartProps) {
  const selectedExercise = exerciseData[0]; // Show first exercise by default

  const option = {
    title: {
      text: `افزایش تدریجی بار: ${selectedExercise.exercise}`,
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
    },
    legend: {
      data: ["حداکثر وزن (lbs)", "حجم تمرین", "میانگین شدت (%)"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: selectedExercise.weeks,
      axisLabel: { fontSize: 10 },
    },
    yAxis: [
      {
        type: "value",
        name: "Weight (lbs)",
        position: "left",
        nameTextStyle: { fontSize: 10 },
        axisLabel: { fontSize: 10 },
      },
      {
        type: "value",
        name: "Volume / Intensity",
        position: "right",
        nameTextStyle: { fontSize: 10 },
        axisLabel: { fontSize: 10 },
      },
    ],
    series: [
      {
        name: "حداکثر وزن (lbs)",
        type: "line",
        yAxisIndex: 0,
        data: selectedExercise.weight,
        itemStyle: { color: COLORS.WRESTLING_RED },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "حجم تمرین",
        type: "bar",
        yAxisIndex: 1,
        data: selectedExercise.volume.map((v) => v / 100), // Scale down for display
        itemStyle: { color: COLORS.WRESTLING_BLUE, opacity: 0.7 },
      },
      {
        name: "میانگین شدت (%)",
        type: "line",
        yAxisIndex: 1,
        data: selectedExercise.intensity,
        itemStyle: { color: COLORS.WRESTLING_GREEN },
        lineStyle: { width: 3 },
        smooth: true,
      },
    ],
  };

  // Calculate progression rates
  const weightProgression = (
    ((selectedExercise.weight[selectedExercise.weight.length - 1] -
      selectedExercise.weight[0]) /
      selectedExercise.weight[0]) *
    100
  ).toFixed(1);

  const volumeProgression = (
    ((selectedExercise.volume[selectedExercise.volume.length - 1] -
      selectedExercise.volume[0]) /
      selectedExercise.volume[0]) *
    100
  ).toFixed(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">ردیابی افزایش تدریجی بار</CardTitle>
        <CardDescription>
          تحلیل چند‌بعدی پیشرفت برای {selectedExercise.exercise}
          <div className="text-sm text-green-600 mt-1">
            وزن: +{weightProgression}% | حجم: +{volumeProgression}%
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-red-600">روند وزن</div>
            <div className="text-lg">+{weightProgression}%</div>
            <div className="text-xs text-gray-500">
              {selectedExercise.weight[0]} →{" "}
              {selectedExercise.weight[selectedExercise.weight.length - 1]} lbs
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-600">افزایش حجم</div>
            <div className="text-lg">+{volumeProgression}%</div>
            <div className="text-xs text-gray-500">
              {(selectedExercise.volume[0] / 1000).toFixed(1)}K →{" "}
              {(
                selectedExercise.volume[selectedExercise.volume.length - 1] /
                1000
              ).toFixed(1)}
              K lbs
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-600">روند شدت</div>
            <div className="text-lg">
              {
                selectedExercise.intensity[
                  selectedExercise.intensity.length - 1
                ]
              }
              %
            </div>
            <div className="text-xs text-gray-500">Avg training intensity</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-600">
          <strong>نکته:</strong> حجم به‌صورت صدگان برای مقیاس‌بندی نمایش داده
          شده است. افزایش تدریجی بار از طریق افزایش وزن، حجم و شدت حاصل می‌شود.
        </div>
      </CardContent>
    </Card>
  );
}
