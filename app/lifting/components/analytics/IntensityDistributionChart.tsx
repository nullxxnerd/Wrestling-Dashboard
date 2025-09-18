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

interface IntensityDistributionChartProps {
  repRangeData?: {
    strength: number;
    hypertrophy: number;
    endurance: number;
  };
}

export default function IntensityDistributionChart({
  repRangeData = {
    strength: 22,
    hypertrophy: 58,
    endurance: 20,
  },
}: IntensityDistributionChartProps) {
  const option = {
    title: {
      text: "Training Intensity Distribution",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}% ({d}%)",
      textStyle: { fontSize: 12 },
    },
    legend: {
      orient: "horizontal",
      bottom: "bottom",
      textStyle: { fontSize: 11 },
    },
    series: [
      {
        name: "Rep Range",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "45%"],
        data: [
          {
            value: repRangeData.strength,
            name: "Strength (1-5 reps)",
            itemStyle: { color: COLORS.WRESTLING_RED },
          },
          {
            value: repRangeData.hypertrophy,
            name: "Hypertrophy (6-12 reps)",
            itemStyle: { color: COLORS.WRESTLING_BLUE },
          },
          {
            value: repRangeData.endurance,
            name: "Endurance (13+ reps)",
            itemStyle: { color: COLORS.WRESTLING_GREEN },
          },
        ],
        label: { fontSize: 11 },
        labelLine: { show: false },
      },
    ],
  };

  const getDominantAdaptation = (data: typeof repRangeData) => {
    if (data.hypertrophy >= 50)
      return {
        adaptation: "Hypertrophy-focused",
        description: "Optimal for muscle mass development",
        color: "text-blue-600",
      };
    if (data.strength >= 40)
      return {
        adaptation: "Strength-focused",
        description: "Prioritizing maximal strength gains",
        color: "text-red-600",
      };
    return {
      adaptation: "Balanced approach",
      description: "Mixed adaptations across rep ranges",
      color: "text-green-600",
    };
  };

  const adaptation = getDominantAdaptation(repRangeData);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Rep Range Analysis</CardTitle>
        <CardDescription>
          Training emphasis distribution
          <div className={`text-sm mt-1 ${adaptation.color}`}>
            {adaptation.adaptation}: {adaptation.description}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
          <div className="text-center">
            <div className="font-semibold text-red-600">Strength</div>
            <div className="text-lg">{repRangeData.strength}%</div>
            <div className="text-gray-500">1-5 reps</div>
            <div className="text-gray-500">Max strength</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-blue-600">Hypertrophy</div>
            <div className="text-lg">{repRangeData.hypertrophy}%</div>
            <div className="text-gray-500">6-12 reps</div>
            <div className="text-gray-500">Muscle growth</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-600">Endurance</div>
            <div className="text-lg">{repRangeData.endurance}%</div>
            <div className="text-gray-500">13+ reps</div>
            <div className="text-gray-500">Work capacity</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-600">
          <strong>Recommendations:</strong> For wrestling, aim for 30% strength,
          50% hypertrophy, 20% endurance
        </div>
      </CardContent>
    </Card>
  );
}
