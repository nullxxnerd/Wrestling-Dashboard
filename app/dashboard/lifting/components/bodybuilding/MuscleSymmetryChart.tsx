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

interface MuscleSymmetryChartProps {
  leftBicep?: number[];
  rightBicep?: number[];
  leftQuad?: number[];
  rightQuad?: number[];
  leftCalf?: number[];
  rightCalf?: number[];
  weeks?: number;
}

export default function MuscleSymmetryChart({
  leftBicep = [15.2, 15.3, 15.4, 15.5, 15.6, 15.7],
  rightBicep = [15.4, 15.5, 15.6, 15.7, 15.8, 15.9],
  leftQuad = [24.1, 24.2, 24.4, 24.5, 24.6, 24.8],
  rightQuad = [24.3, 24.4, 24.6, 24.7, 24.8, 25.0],
  leftCalf = [16.8, 16.9, 17.0, 17.1, 17.1, 17.2],
  rightCalf = [16.9, 17.0, 17.1, 17.2, 17.2, 17.3],
  weeks = 6,
}: MuscleSymmetryChartProps) {
  const weekLabels = generateWeekLabels(weeks);

  const option = {
    title: {
      text: "Muscle Symmetry Analysis",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>{a0}: {c0} inches<br/>{a1}: {c1} inches",
    },
    legend: {
      data: [
        "Left Bicep",
        "Right Bicep",
        "Left Quad",
        "Right Quad",
        "Left Calf",
        "Right Calf",
      ],
      textStyle: { fontSize: 11 },
      type: "scroll",
      top: 30,
    },
    xAxis: {
      type: "category",
      data: weekLabels,
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Circumference (inches)",
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Left Bicep",
        type: "line",
        data: leftBicep,
        itemStyle: { color: COLORS.WRESTLING_BLUE },
        lineStyle: { width: 2, type: "dashed" },
        symbol: "circle",
      },
      {
        name: "Right Bicep",
        type: "line",
        data: rightBicep,
        itemStyle: { color: COLORS.WRESTLING_BLUE },
        lineStyle: { width: 2 },
        symbol: "circle",
      },
      {
        name: "Left Quad",
        type: "line",
        data: leftQuad,
        itemStyle: { color: COLORS.WRESTLING_RED },
        lineStyle: { width: 2, type: "dashed" },
        symbol: "triangle",
      },
      {
        name: "Right Quad",
        type: "line",
        data: rightQuad,
        itemStyle: { color: COLORS.WRESTLING_RED },
        lineStyle: { width: 2 },
        symbol: "triangle",
      },
      {
        name: "Left Calf",
        type: "line",
        data: leftCalf,
        itemStyle: { color: COLORS.WRESTLING_GREEN },
        lineStyle: { width: 2, type: "dashed" },
        symbol: "diamond",
      },
      {
        name: "Right Calf",
        type: "line",
        data: rightCalf,
        itemStyle: { color: COLORS.WRESTLING_GREEN },
        lineStyle: { width: 2 },
        symbol: "diamond",
      },
    ],
  };

  // Calculate asymmetry percentages
  const calculateAsymmetry = (left: number[], right: number[]) => {
    const latestLeft = left[left.length - 1];
    const latestRight = right[right.length - 1];
    return Math.abs(((latestRight - latestLeft) / latestLeft) * 100);
  };

  const asymmetries = {
    bicep: calculateAsymmetry(leftBicep, rightBicep),
    quad: calculateAsymmetry(leftQuad, rightQuad),
    calf: calculateAsymmetry(leftCalf, rightCalf),
  };

  const getAsymmetryStatus = (percentage: number) => {
    if (percentage <= 2)
      return { status: "Excellent", color: "text-green-600" };
    if (percentage <= 5) return { status: "Good", color: "text-blue-600" };
    if (percentage <= 8) return { status: "Fair", color: "text-yellow-600" };
    return { status: "Needs Attention", color: "text-red-600" };
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Bilateral Muscle Development</CardTitle>
        <CardDescription>
          Tracking left-right muscle symmetry for balanced development
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-blue-600">Bicep Asymmetry</div>
            <div className="text-lg">{asymmetries.bicep.toFixed(1)}%</div>
            <div
              className={`text-xs ${
                getAsymmetryStatus(asymmetries.bicep).color
              }`}
            >
              {getAsymmetryStatus(asymmetries.bicep).status}
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-red-600">Quad Asymmetry</div>
            <div className="text-lg">{asymmetries.quad.toFixed(1)}%</div>
            <div
              className={`text-xs ${
                getAsymmetryStatus(asymmetries.quad).color
              }`}
            >
              {getAsymmetryStatus(asymmetries.quad).status}
            </div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-green-600">Calf Asymmetry</div>
            <div className="text-lg">{asymmetries.calf.toFixed(1)}%</div>
            <div
              className={`text-xs ${
                getAsymmetryStatus(asymmetries.calf).color
              }`}
            >
              {getAsymmetryStatus(asymmetries.calf).status}
            </div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-600">
          <strong>Guidelines:</strong> &lt;2% excellent, 2-5% good, 5-8% fair,
          &gt;8% needs corrective work
        </div>
      </CardContent>
    </Card>
  );
}
