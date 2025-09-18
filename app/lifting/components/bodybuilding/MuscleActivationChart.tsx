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

interface MuscleActivationChartProps {
  activationData?: {
    chest: number;
    triceps: number;
    shoulders: number;
    back: number;
    biceps: number;
    quadriceps: number;
    hamstrings: number;
    glutes: number;
    calves: number;
  };
}

export default function MuscleActivationChart({
  activationData = {
    chest: 85,
    triceps: 78,
    shoulders: 82,
    back: 88,
    biceps: 75,
    quadriceps: 92,
    hamstrings: 86,
    glutes: 89,
    calves: 71,
  },
}: MuscleActivationChartProps) {
  const muscleGroups = Object.keys(activationData);
  const activationValues = Object.values(activationData);

  const option = {
    title: {
      text: "Muscle Activation Efficiency",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" },
      formatter: "{b}<br/>Activation: {c}%",
      textStyle: { fontSize: 12 },
    },
    xAxis: {
      type: "category",
      data: muscleGroups.map(
        (muscle) => muscle.charAt(0).toUpperCase() + muscle.slice(1)
      ),
      axisLabel: { fontSize: 10, rotate: 45 },
    },
    yAxis: {
      type: "value",
      name: "Activation (%)",
      min: 60,
      max: 100,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Muscle Activation",
        type: "bar",
        data: activationValues.map((value) => ({
          value,
          itemStyle: {
            color:
              value >= 85
                ? COLORS.WRESTLING_GREEN
                : value >= 80
                ? COLORS.WRESTLING_BLUE
                : value >= 75
                ? COLORS.ORANGE
                : COLORS.WRESTLING_RED,
          },
        })),
        markLine: {
          data: [{ yAxis: 85, name: "Optimal Threshold" }],
          lineStyle: { color: COLORS.WRESTLING_GREEN, type: "dashed" },
        },
      },
    ],
  };

  const averageActivation =
    activationValues.reduce((sum, val) => sum + val, 0) /
    activationValues.length;
  const weakestMuscle =
    muscleGroups[activationValues.indexOf(Math.min(...activationValues))];
  const strongestMuscle =
    muscleGroups[activationValues.indexOf(Math.max(...activationValues))];

  const getActivationGrade = (score: number) => {
    if (score >= 90) return { grade: "A+", color: "text-green-600" };
    if (score >= 85) return { grade: "A", color: "text-green-600" };
    if (score >= 80) return { grade: "B+", color: "text-blue-600" };
    if (score >= 75) return { grade: "B", color: "text-yellow-600" };
    return { grade: "C", color: "text-red-600" };
  };

  const overallGrade = getActivationGrade(averageActivation);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Neuromuscular Efficiency</CardTitle>
        <CardDescription>
          Muscle activation scores during compound movements
          <div className={`text-sm mt-1 ${overallGrade.color}`}>
            Overall Grade: {overallGrade.grade} ({averageActivation.toFixed(1)}%
            average)
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-green-600 mb-2">
              Strongest Activation:
            </h4>
            <div className="capitalize">
              {strongestMuscle}:{" "}
              {activationData[strongestMuscle as keyof typeof activationData]}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Excellent mind-muscle connection
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-red-600 mb-2">
              Needs Improvement:
            </h4>
            <div className="capitalize">
              {weakestMuscle}:{" "}
              {activationData[weakestMuscle as keyof typeof activationData]}%
            </div>
            <div className="text-xs text-gray-500 mt-1">
              Focus on activation drills
            </div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-600">
          <strong>Improvement Tips:</strong> Use slow eccentrics, pause reps,
          and pre-exhaustion for weak muscle groups
        </div>
      </CardContent>
    </Card>
  );
}
