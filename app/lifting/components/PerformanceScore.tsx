"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  COLORS,
  calculatePerformanceScore,
  getPerformanceGrade,
} from "../utils";

interface PerformanceScoreProps {
  strengthMetrics?: {
    bench: number;
    squat: number;
    deadlift: number;
  };
  bodyweight?: number;
  cardioMetrics?: {
    vo2Max: number;
    restingHR: number;
  };
  bodyComposition?: {
    bodyFat: number;
    leanMass: number;
  };
  recoveryMetrics?: {
    readiness: number;
    hrv: number;
  };
}

export default function PerformanceScore({
  strengthMetrics = { bench: 330, squat: 460, deadlift: 520 },
  bodyweight = 200,
  cardioMetrics = { vo2Max: 53.7, restingHR: 52 },
  bodyComposition = { bodyFat: 13.5, leanMass: 173 },
  recoveryMetrics = { readiness: 79, hrv: 82 },
}: PerformanceScoreProps) {
  const scores = calculatePerformanceScore(
    strengthMetrics,
    bodyweight,
    cardioMetrics,
    bodyComposition,
    recoveryMetrics
  );

  const radarOption = {
    title: {
      text: "Performance Analysis",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
      textStyle: { fontSize: 12 },
    },
    radar: {
      indicator: [
        { name: "Strength", max: 100 },
        { name: "Endurance", max: 100 },
        { name: "Body Comp", max: 100 },
        { name: "Recovery", max: 100 },
        { name: "Power", max: 100 },
        { name: "Technique", max: 100 },
      ],
      radius: "75%",
      nameGap: 5,
      name: {
        textStyle: { fontSize: 11 },
      },
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: [
              scores.strength,
              scores.endurance,
              scores.bodyComposition,
              scores.recovery,
              scores.powerOutput,
              scores.technique,
            ],
            name: "Current Performance",
            itemStyle: { color: COLORS.WRESTLING_BLUE },
            areaStyle: { color: `${COLORS.WRESTLING_BLUE}30` },
            lineStyle: { width: 3 },
          },
        ],
      },
    ],
  };

  const overallGrade = getPerformanceGrade(scores.overall);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 65) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 85) return "default";
    if (score >= 75) return "secondary";
    return "outline";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Overall Score Card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Overall Performance Score</CardTitle>
          <CardDescription>
            Comprehensive fitness assessment based on multiple metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${overallGrade.color} mb-2`}>
              {scores.overall}
            </div>
            <div
              className={`text-2xl font-semibold ${overallGrade.color} mb-4`}
            >
              Grade: {overallGrade.grade}
            </div>
            <Badge
              variant={getScoreBadgeVariant(scores.overall)}
              className="text-lg px-4 py-2"
            >
              {scores.overall >= 90
                ? "Elite Athlete"
                : scores.overall >= 80
                ? "Advanced"
                : scores.overall >= 70
                ? "Intermediate"
                : scores.overall >= 60
                ? "Developing"
                : "Beginner"}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Strength</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${getScoreColor(
                    scores.strength
                  )}`}
                >
                  {scores.strength}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-red-500 rounded-full"
                    style={{ width: `${scores.strength}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Endurance</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${getScoreColor(
                    scores.endurance
                  )}`}
                >
                  {scores.endurance}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-blue-500 rounded-full"
                    style={{ width: `${scores.endurance}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Body Composition</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${getScoreColor(
                    scores.bodyComposition
                  )}`}
                >
                  {scores.bodyComposition}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-green-500 rounded-full"
                    style={{ width: `${scores.bodyComposition}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Recovery</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${getScoreColor(
                    scores.recovery
                  )}`}
                >
                  {scores.recovery}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-orange-500 rounded-full"
                    style={{ width: `${scores.recovery}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Performance Radar</CardTitle>
          <CardDescription>
            Multi-dimensional performance visualization
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ReactECharts option={radarOption} style={{ height: "300px" }} />
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="text-lg">
            Detailed Performance Metrics
          </CardTitle>
          <CardDescription>
            Breakdown of individual performance components
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Bench/BW Ratio</div>
              <div className="text-lg font-semibold">
                {(strengthMetrics.bench / bodyweight).toFixed(2)}x
              </div>
              <div className="text-xs text-gray-400">Target: 1.5x+</div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Squat/BW Ratio</div>
              <div className="text-lg font-semibold">
                {(strengthMetrics.squat / bodyweight).toFixed(2)}x
              </div>
              <div className="text-xs text-gray-400">Target: 2.0x+</div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">
                Deadlift/BW Ratio
              </div>
              <div className="text-lg font-semibold">
                {(strengthMetrics.deadlift / bodyweight).toFixed(2)}x
              </div>
              <div className="text-xs text-gray-400">Target: 2.5x+</div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">VO2 Max</div>
              <div className="text-lg font-semibold">
                {cardioMetrics.vo2Max}
              </div>
              <div className="text-xs text-gray-400">mL/kg/min</div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Body Fat %</div>
              <div className="text-lg font-semibold">
                {bodyComposition.bodyFat}%
              </div>
              <div className="text-xs text-gray-400">Target: 8-15%</div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">Readiness</div>
              <div className="text-lg font-semibold">
                {recoveryMetrics.readiness}
              </div>
              <div className="text-xs text-gray-400">/100 score</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
