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

interface TrainingFrequencyChartProps {
  frequencyData?: {
    muscleGroup: string;
    sessionsPerWeek: number;
    recoveryTime: number;
    optimalFrequency: number;
  }[];
}

export default function TrainingFrequencyChart({
  frequencyData = [
    {
      muscleGroup: "Chest",
      sessionsPerWeek: 2.5,
      recoveryTime: 48,
      optimalFrequency: 2.5,
    },
    {
      muscleGroup: "Back",
      sessionsPerWeek: 3.0,
      recoveryTime: 36,
      optimalFrequency: 3.0,
    },
    {
      muscleGroup: "Legs",
      sessionsPerWeek: 2.0,
      recoveryTime: 72,
      optimalFrequency: 2.5,
    },
    {
      muscleGroup: "Shoulders",
      sessionsPerWeek: 2.5,
      recoveryTime: 48,
      optimalFrequency: 3.0,
    },
    {
      muscleGroup: "Arms",
      sessionsPerWeek: 2.0,
      recoveryTime: 48,
      optimalFrequency: 2.5,
    },
    {
      muscleGroup: "Core",
      sessionsPerWeek: 4.0,
      recoveryTime: 24,
      optimalFrequency: 4.0,
    },
  ],
}: TrainingFrequencyChartProps) {
  const muscleGroups = frequencyData.map((d) => d.muscleGroup);
  const currentFrequency = frequencyData.map((d) => d.sessionsPerWeek);
  const optimalFrequency = frequencyData.map((d) => d.optimalFrequency);

  const option = {
    title: {
      text: "Training Frequency Analysis",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>Current: {c0}x/week<br/>Optimal: {c1}x/week",
    },
    legend: {
      data: ["Current Frequency", "Optimal Frequency"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: muscleGroups,
      axisLabel: { fontSize: 10, rotate: 45 },
    },
    yAxis: {
      type: "value",
      name: "Sessions/Week",
      min: 0,
      max: 5,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Current Frequency",
        type: "bar",
        data: currentFrequency.map((freq, index) => ({
          value: freq,
          itemStyle: {
            color:
              freq >= optimalFrequency[index]
                ? COLORS.WRESTLING_GREEN
                : freq >= optimalFrequency[index] * 0.8
                ? COLORS.ORANGE
                : COLORS.WRESTLING_RED,
          },
        })),
        barGap: 0,
      },
      {
        name: "Optimal Frequency",
        type: "bar",
        data: optimalFrequency,
        itemStyle: {
          color: COLORS.WRESTLING_BLUE,
          opacity: 0.6,
        },
      },
    ],
  };

  // Calculate frequency efficiency
  const efficiencyScores = frequencyData.map((d) =>
    Math.min(100, (d.sessionsPerWeek / d.optimalFrequency) * 100)
  );
  const averageEfficiency =
    efficiencyScores.reduce((sum, score) => sum + score, 0) /
    efficiencyScores.length;

  const getEfficiencyGrade = (score: number) => {
    if (score >= 90) return { grade: "A", color: "text-green-600" };
    if (score >= 80) return { grade: "B", color: "text-blue-600" };
    if (score >= 70) return { grade: "C", color: "text-yellow-600" };
    return { grade: "D", color: "text-red-600" };
  };

  const overallGrade = getEfficiencyGrade(averageEfficiency);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">
          Training Frequency Optimization
        </CardTitle>
        <CardDescription>
          Current vs optimal training frequency by muscle group
          <div className={`text-sm mt-1 ${overallGrade.color}`}>
            Frequency Efficiency: {overallGrade.grade} (
            {averageEfficiency.toFixed(0)}%)
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-green-600 mb-2">Well Trained:</h4>
            <ul className="text-xs space-y-1">
              {frequencyData
                .filter((d) => d.sessionsPerWeek >= d.optimalFrequency)
                .map((d) => (
                  <li key={d.muscleGroup}>
                    {d.muscleGroup}: {d.sessionsPerWeek}x/week
                  </li>
                ))}
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-red-600 mb-2">
              Needs More Volume:
            </h4>
            <ul className="text-xs space-y-1">
              {frequencyData
                .filter((d) => d.sessionsPerWeek < d.optimalFrequency)
                .map((d) => (
                  <li key={d.muscleGroup}>
                    {d.muscleGroup}: +
                    {(d.optimalFrequency - d.sessionsPerWeek).toFixed(1)}x
                    needed
                  </li>
                ))}
            </ul>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-600">
          <strong>Recovery Guidelines:</strong> Allow 24-48h for small muscles,
          48-72h for large muscle groups
        </div>
      </CardContent>
    </Card>
  );
}
