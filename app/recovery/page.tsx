"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ReactECharts from "echarts-for-react";
import {
  Moon,
  Heart,
  Zap,
  BrainCircuit,
  Activity,
  Timer,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// Professional color palette
const PRIMARY_BLUE = "#1e3a8a";
const SECONDARY_GRAY = "#64748b";
const SUCCESS_GREEN = "#059669";
const WARNING_ORANGE = "#d97706";
const ERROR_RED = "#dc2626";

export default function RecoveryPage() {
  // Generate last 14 days of data for recovery tracking
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  // Sleep quality tracking
  const sleepQualityData = {
    title: {
      text: "Sleep Quality & Duration",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>Sleep: {c0} hours<br/>Quality: {c1}/10",
    },
    legend: {
      data: ["Sleep Duration", "Sleep Quality"],
      textStyle: { fontSize: 11, color: "#374151" },
    },
    xAxis: {
      type: "category",
      data: last14Days,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: [
      {
        type: "value",
        name: "Hours",
        min: 6,
        max: 10,
        nameTextStyle: { fontSize: 10, color: "#6b7280" },
        axisLabel: { fontSize: 10, color: "#6b7280" },
        axisLine: { lineStyle: { color: "#e5e7eb" } },
      },
      {
        type: "value",
        name: "Quality (1-10)",
        min: 1,
        max: 10,
        position: "right",
        nameTextStyle: { fontSize: 10, color: "#6b7280" },
        axisLabel: { fontSize: 10, color: "#6b7280" },
        axisLine: { lineStyle: { color: "#e5e7eb" } },
      },
    ],
    series: [
      {
        name: "Sleep Duration",
        type: "bar",
        yAxisIndex: 0,
        data: [
          7.5, 8.2, 7.8, 6.9, 8.5, 8.1, 7.2, 8.0, 7.9, 8.3, 7.6, 8.4, 7.8, 8.2,
        ],
        itemStyle: { color: PRIMARY_BLUE },
        barWidth: "40%",
      },
      {
        name: "Sleep Quality",
        type: "line",
        yAxisIndex: 1,
        data: [7, 8, 6, 5, 9, 8, 6, 7, 8, 9, 7, 8, 7, 8],
        itemStyle: { color: SUCCESS_GREEN },
        lineStyle: { color: SUCCESS_GREEN, width: 3 },
        symbol: "circle",
        symbolSize: 6,
      },
    ],
  };

  // Heart Rate Variability (HRV) tracking
  const hrvData = {
    title: {
      text: "Heart Rate Variability (HRV)",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>HRV: {c} ms",
    },
    xAxis: {
      type: "category",
      data: last14Days,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "HRV (ms)",
      min: 30,
      max: 60,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "HRV",
        type: "line",
        data: [45, 48, 42, 38, 52, 49, 41, 46, 47, 51, 44, 50, 46, 49],
        itemStyle: { color: ERROR_RED },
        lineStyle: { color: ERROR_RED, width: 3 },
        areaStyle: { color: `${ERROR_RED}15` },
        symbol: "diamond",
        symbolSize: 6,
        markLine: {
          data: [
            {
              yAxis: 45,
              name: "Baseline",
              lineStyle: { color: SECONDARY_GRAY, type: "dashed" },
              label: { color: SECONDARY_GRAY, fontSize: 10 },
            },
          ],
        },
      },
    ],
  };

  // Stress level tracking
  const stressLevelData = {
    title: {
      text: "Daily Stress Levels",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>Stress: {c}/10",
    },
    xAxis: {
      type: "category",
      data: last14Days,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "Stress Level (1-10)",
      min: 1,
      max: 10,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Stress Level",
        type: "bar",
        data: [4, 3, 6, 7, 2, 3, 5, 4, 3, 2, 5, 3, 4, 3],
        itemStyle: {
          color: "#059669", // Default green color
        },
        barWidth: "60%",
      },
    ],
  };

  // Muscle soreness tracking
  const muscleSorenessData = {
    title: {
      text: "Muscle Soreness Assessment",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
    },
    legend: {
      data: ["Upper Body", "Core", "Lower Body"],
      textStyle: { fontSize: 11, color: "#374151" },
    },
    xAxis: {
      type: "category",
      data: last14Days,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "Soreness (1-10)",
      min: 0,
      max: 10,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Upper Body",
        type: "line",
        data: [3, 2, 5, 6, 1, 2, 4, 3, 2, 1, 4, 2, 3, 2],
        itemStyle: { color: PRIMARY_BLUE },
        lineStyle: { color: PRIMARY_BLUE, width: 2 },
        symbol: "circle",
        symbolSize: 4,
      },
      {
        name: "Core",
        type: "line",
        data: [2, 1, 3, 4, 0, 1, 3, 2, 1, 0, 3, 1, 2, 1],
        itemStyle: { color: SUCCESS_GREEN },
        lineStyle: { color: SUCCESS_GREEN, width: 2 },
        symbol: "square",
        symbolSize: 4,
      },
      {
        name: "Lower Body",
        type: "line",
        data: [4, 3, 6, 7, 2, 3, 5, 4, 3, 2, 5, 3, 4, 3],
        itemStyle: { color: WARNING_ORANGE },
        lineStyle: { color: WARNING_ORANGE, width: 2 },
        symbol: "triangle",
        symbolSize: 5,
      },
    ],
  };

  // Recovery score radar chart
  const recoveryScoreData = {
    title: {
      text: "Recovery Score Breakdown",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "item",
      textStyle: { fontSize: 12 },
    },
    radar: {
      indicator: [
        { name: "Sleep Quality", max: 10 },
        { name: "HRV", max: 10 },
        {
          name: "Stress Level",
          max: 10,
          axisLabel: { show: true, formatter: (value: number) => 10 - value },
        },
        { name: "Energy Level", max: 10 },
        { name: "Muscle Recovery", max: 10 },
        { name: "Mental State", max: 10 },
      ],
      radius: "70%",
      axisName: {
        fontSize: 11,
        color: "#374151",
      },
      splitLine: {
        lineStyle: { color: "#e5e7eb" },
      },
      axisLine: {
        lineStyle: { color: "#d1d5db" },
      },
    },
    series: [
      {
        name: "Recovery Metrics",
        type: "radar",
        data: [
          {
            value: [8, 7, 8, 7, 6, 8], // Inverted stress level (10-3=7)
            name: "Today",
            itemStyle: { color: PRIMARY_BLUE },
            areaStyle: { color: `${PRIMARY_BLUE}20` },
          },
          {
            value: [7, 6, 7, 6, 5, 7],
            name: "7-Day Average",
            itemStyle: { color: SECONDARY_GRAY },
            areaStyle: { color: `${SECONDARY_GRAY}10` },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="h-8 w-8 text-blue-900" />
          <h1 className="text-3xl font-bold text-gray-900">
            Recovery Tracking
          </h1>
        </div>
        <p className="text-gray-600">
          Comprehensive recovery monitoring for optimal athletic performance
        </p>
      </div>

      {/* Key Recovery Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Moon className="h-6 w-6 text-blue-900" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Sleep Quality
                </p>
                <p className="text-2xl font-bold text-gray-900">8.2/10</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.5 vs last week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-50 rounded-lg">
                <Heart className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">HRV</p>
                <p className="text-2xl font-bold text-gray-900">49 ms</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +3 ms vs baseline
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <BrainCircuit className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Stress Level
                </p>
                <p className="text-2xl font-bold text-gray-900">3/10</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <CheckCircle className="h-3 w-3" />
                  Optimal range
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Zap className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Recovery Score
                </p>
                <p className="text-2xl font-bold text-gray-900">87%</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <CheckCircle className="h-3 w-3" />
                  Excellent
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sleep & HRV Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Sleep & Physiological Recovery
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Sleep Analysis
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sleep duration and quality assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts
                option={sleepQualityData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Heart Rate Variability
              </CardTitle>
              <CardDescription className="text-gray-600">
                Autonomic nervous system recovery indicator
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts option={hrvData} style={{ height: "280px" }} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stress & Soreness Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Stress & Physical Recovery
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Stress Monitoring
              </CardTitle>
              <CardDescription className="text-gray-600">
                Daily perceived stress levels
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts
                option={stressLevelData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Muscle Soreness
              </CardTitle>
              <CardDescription className="text-gray-600">
                Body region soreness assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts
                option={muscleSorenessData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recovery Score Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Overall Recovery Assessment
        </h2>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg text-gray-800">
              Recovery Score Breakdown
            </CardTitle>
            <CardDescription className="text-gray-600">
              Comprehensive recovery metrics comparison
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white">
            <ReactECharts
              option={recoveryScoreData}
              style={{ height: "320px" }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Recovery Recommendations */}
      <Card className="mb-8 border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
            <Timer className="h-5 w-5" />
            Recovery Recommendations
          </CardTitle>
          <CardDescription className="text-gray-600">
            Personalized recovery strategies based on current metrics
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                <div>
                  <p className="font-medium text-green-800">
                    Excellent Sleep Quality
                  </p>
                  <p className="text-sm text-green-600">
                    Continue current sleep routine. Consider going to bed 30
                    minutes earlier for competition preparation.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                <Heart className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="font-medium text-blue-800">
                    HRV Above Baseline
                  </p>
                  <p className="text-sm text-blue-600">
                    Good autonomic recovery. Ready for moderate to high
                    intensity training.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-orange-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-orange-600 mt-0.5" />
                <div>
                  <p className="font-medium text-orange-800">
                    Monitor Lower Body Soreness
                  </p>
                  <p className="text-sm text-orange-600">
                    Consider additional stretching, foam rolling, or massage
                    therapy for legs and glutes.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <BrainCircuit className="h-5 w-5 text-gray-600 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-800">Stress Management</p>
                  <p className="text-sm text-gray-600">
                    Maintain current stress management techniques. Consider
                    meditation before competitions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
