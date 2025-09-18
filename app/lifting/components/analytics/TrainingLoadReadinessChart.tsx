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

interface TrainingLoadReadinessChartProps {
  trainingLoad?: number[];
  readiness?: number[];
  days?: number;
}

export default function TrainingLoadReadinessChart({
  trainingLoad = [70, 72, 68, 75, 80, 77, 65, 60, 62, 70, 78, 82, 76, 74],
  readiness = [82, 80, 79, 78, 75, 73, 80, 84, 83, 81, 78, 76, 77, 79],
  days = 14,
}: TrainingLoadReadinessChartProps) {
  const dateLabels = generateDateRange(days);

  const option = {
    title: {
      text: "Training Load vs Readiness",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
    },
    legend: {
      data: ["Training Load", "Readiness Score"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: dateLabels,
      axisLabel: { fontSize: 10, interval: 1, rotate: 45 },
    },
    yAxis: [
      {
        type: "value",
        name: "Load (0-100)",
        min: 0,
        max: 100,
        axisLabel: { fontSize: 10 },
        nameTextStyle: { fontSize: 10 },
      },
      {
        type: "value",
        name: "Readiness (0-100)",
        min: 50,
        max: 100,
        axisLabel: { fontSize: 10 },
        nameTextStyle: { fontSize: 10 },
        position: "right",
      },
    ],
    series: [
      {
        name: "Training Load",
        type: "bar",
        data: trainingLoad,
        itemStyle: { color: COLORS.WRESTLING_BLUE },
        yAxisIndex: 0,
      },
      {
        name: "Readiness Score",
        type: "line",
        yAxisIndex: 1,
        data: readiness,
        itemStyle: { color: COLORS.ORANGE },
        lineStyle: { width: 3 },
        smooth: true,
      },
    ],
  };

  // Calculate correlation and recovery trends
  const avgLoad =
    trainingLoad.reduce((sum, val) => sum + val, 0) / trainingLoad.length;
  const avgReadiness =
    readiness.reduce((sum, val) => sum + val, 0) / readiness.length;
  const currentReadiness = readiness[readiness.length - 1];
  const recentLoadTrend =
    trainingLoad.slice(-3).reduce((sum, val) => sum + val, 0) / 3;

  const getRecoveryStatus = (readinessScore: number, loadTrend: number) => {
    if (readinessScore >= 85 && loadTrend < 70)
      return {
        status: "Excellent Recovery",
        recommendation: "Ready for high intensity training",
        color: "text-green-600",
      };
    if (readinessScore >= 80)
      return {
        status: "Good Recovery",
        recommendation: "Normal training intensity",
        color: "text-blue-600",
      };
    if (readinessScore >= 75)
      return {
        status: "Moderate Recovery",
        recommendation: "Consider reduced volume",
        color: "text-yellow-600",
      };
    return {
      status: "Poor Recovery",
      recommendation: "Active recovery or rest day needed",
      color: "text-red-600",
    };
  };

  const recovery = getRecoveryStatus(currentReadiness, recentLoadTrend);

  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle className="text-lg">Recovery Management</CardTitle>
        <CardDescription>
          Balancing training stress and recovery capacity
          <div className={`text-sm mt-1 ${recovery.color}`}>
            {recovery.status}: {recovery.recommendation}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "320px" }} />
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-blue-600">Avg Training Load</div>
            <div className="text-lg">{avgLoad.toFixed(0)}</div>
            <div className="text-xs text-gray-500">Past {days} days</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-orange-600">Avg Readiness</div>
            <div className="text-lg">{avgReadiness.toFixed(0)}</div>
            <div className="text-xs text-gray-500">Optimal: 80+</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-purple-600">Load:Readiness</div>
            <div className="text-lg">{(avgLoad / avgReadiness).toFixed(2)}</div>
            <div className="text-xs text-gray-500">Target: &lt;0.9</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
