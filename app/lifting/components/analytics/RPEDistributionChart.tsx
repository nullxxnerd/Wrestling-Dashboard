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

interface RPEDistributionChartProps {
  rpeData?: {
    rpe6: number;
    rpe7: number;
    rpe8: number;
    rpe9: number;
    rpe10: number;
  };
}

export default function RPEDistributionChart({
  rpeData = {
    rpe6: 5,
    rpe7: 15,
    rpe8: 30,
    rpe9: 35,
    rpe10: 15,
  },
}: RPEDistributionChartProps) {
  const option = {
    title: {
      text: "RPE Distribution (Top Sets)",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "item",
      formatter: "RPE {b}: {c}% ({d}%)",
      textStyle: { fontSize: 12 },
    },
    legend: {
      orient: "horizontal",
      bottom: "bottom",
      textStyle: { fontSize: 11 },
    },
    series: [
      {
        name: "RPE",
        type: "pie",
        radius: ["35%", "65%"],
        center: ["50%", "45%"],
        data: [
          {
            value: rpeData.rpe6,
            name: "RPE 6",
            itemStyle: { color: "#93c5fd" },
          },
          {
            value: rpeData.rpe7,
            name: "RPE 7",
            itemStyle: { color: COLORS.SECONDARY_BLUE },
          },
          {
            value: rpeData.rpe8,
            name: "RPE 8",
            itemStyle: { color: COLORS.WRESTLING_BLUE },
          },
          {
            value: rpeData.rpe9,
            name: "RPE 9",
            itemStyle: { color: COLORS.WRESTLING_RED },
          },
          {
            value: rpeData.rpe10,
            name: "RPE 10",
            itemStyle: { color: "#111827" },
          },
        ],
        label: { fontSize: 11 },
        labelLine: { show: false },
      },
    ],
  };

  const totalSets = Object.values(rpeData).reduce(
    (sum, value) => sum + value,
    0
  );
  const averageRPE = (
    (rpeData.rpe6 * 6 +
      rpeData.rpe7 * 7 +
      rpeData.rpe8 * 8 +
      rpeData.rpe9 * 9 +
      rpeData.rpe10 * 10) /
    totalSets
  ).toFixed(1);

  const getIntensityRecommendation = (avgRPE: number) => {
    if (avgRPE >= 9)
      return {
        message: "Very high intensity - consider deload week",
        color: "text-red-600",
      };
    if (avgRPE >= 8.5)
      return {
        message: "High intensity - monitor recovery closely",
        color: "text-orange-600",
      };
    if (avgRPE >= 7.5)
      return {
        message: "Optimal intensity for strength gains",
        color: "text-green-600",
      };
    return {
      message: "Moderate intensity - room for progression",
      color: "text-blue-600",
    };
  };

  const { message, color } = getIntensityRecommendation(parseFloat(averageRPE));

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Training Intensity Analysis</CardTitle>
        <CardDescription>
          RPE distribution of top sets - Average RPE: {averageRPE}
          <div className={`text-xs mt-1 ${color}`}>{message}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
          <div>
            <h4 className="font-semibold mb-2">RPE Guidelines:</h4>
            <ul className="space-y-1">
              <li>
                <span className="font-medium">RPE 6-7:</span> Technique work
              </li>
              <li>
                <span className="font-medium">RPE 8:</span> Volume training
              </li>
              <li>
                <span className="font-medium">RPE 9:</span> Strength work
              </li>
              <li>
                <span className="font-medium">RPE 10:</span> Max effort
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">Weekly Distribution:</h4>
            <ul className="space-y-1">
              <li>High intensity (9-10): {rpeData.rpe9 + rpeData.rpe10}%</li>
              <li>Moderate (7-8): {rpeData.rpe7 + rpeData.rpe8}%</li>
              <li>Low intensity (6): {rpeData.rpe6}%</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
