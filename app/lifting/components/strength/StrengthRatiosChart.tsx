"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  COLORS,
  calculateStrengthToBodyweightRatio,
  generateWeekLabels,
} from "../../utils";

interface StrengthRatiosChartProps {
  benchData?: number[];
  squatData?: number[];
  deadliftData?: number[];
  bodyweightData?: number[];
  weeks?: number;
}

export default function StrengthRatiosChart({
  benchData = [315, 317, 320, 322, 325, 327],
  squatData = [450, 452, 455, 457, 460, 462],
  deadliftData = [505, 507, 510, 512, 515, 517],
  bodyweightData = [198, 198.5, 199, 199.2, 199.5, 200],
  weeks = 6,
}: StrengthRatiosChartProps) {
  const weekLabels = generateWeekLabels(weeks);

  const benchRatios = benchData.map((bench, i) =>
    calculateStrengthToBodyweightRatio(bench, bodyweightData[i])
  );
  const squatRatios = squatData.map((squat, i) =>
    calculateStrengthToBodyweightRatio(squat, bodyweightData[i])
  );
  const deadliftRatios = deadliftData.map((deadlift, i) =>
    calculateStrengthToBodyweightRatio(deadlift, bodyweightData[i])
  );

  const option = {
    title: {
      text: "Strength to Bodyweight Ratios",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>{a0}: {c0}x<br/>{a1}: {c1}x<br/>{a2}: {c2}x",
    },
    legend: {
      data: ["Bench/BW", "Squat/BW", "Deadlift/BW"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: weekLabels,
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Ratio (x)",
      min: 1.4,
      max: 2.7,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Bench/BW",
        type: "line",
        data: benchRatios,
        itemStyle: { color: COLORS.WRESTLING_BLUE },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "Squat/BW",
        type: "line",
        data: squatRatios,
        itemStyle: { color: COLORS.WRESTLING_RED },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "Deadlift/BW",
        type: "line",
        data: deadliftRatios,
        itemStyle: { color: COLORS.WRESTLING_GREEN },
        lineStyle: { width: 3 },
        smooth: true,
      },
    ],
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Relative Strength Analysis</CardTitle>
        <CardDescription>
          Strength-to-bodyweight ratios for power assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
      </CardContent>
    </Card>
  );
}
