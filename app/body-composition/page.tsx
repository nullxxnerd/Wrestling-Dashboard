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
  Weight,
  Target,
  TrendingUp,
  TrendingDown,
  Activity,
  Scale,
} from "lucide-react";

// Professional color palette
const PRIMARY_BLUE = "#1e3a8a";
const SECONDARY_GRAY = "#64748b";
const SUCCESS_GREEN = "#059669";
const WARNING_ORANGE = "#d97706";

export default function BodyCompositionPage() {
  // Assumptions for calculations
  // Athlete height used for BMI/FFMI estimations: 1.78m (~5'10")
  const HEIGHT_M = 1.78;

  // Generate last 90 days of data for weight tracking
  const last90Days = Array.from({ length: 90 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (89 - i));
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  // Weight tracking with goal line
  const weightTrackingData = {
    title: {
      text: "Weight Monitoring (90 Days)",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>Current: {c} lbs",
    },
    legend: {
      data: ["Current Weight", "Goal Weight"],
      textStyle: { fontSize: 11, color: "#374151" },
    },
    xAxis: {
      type: "category",
      data: last90Days,
      axisLabel: { interval: 14, fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "Weight (lbs)",
      min: 170,
      max: 190,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Current Weight",
        type: "line",
        data: Array.from({ length: 90 }, (_, i) => {
          const baseWeight = 182;
          const variation = Math.sin(i / 10) * 2 + Math.random() * 1.5 - 0.75;
          const trend = -0.02 * i; // Gradual weight loss
          return Math.round((baseWeight + variation + trend) * 10) / 10;
        }),
        itemStyle: { color: PRIMARY_BLUE },
        lineStyle: { color: PRIMARY_BLUE, width: 2 },
        symbol: "circle",
        symbolSize: 4,
        smooth: false,
      },
      {
        name: "Goal Weight",
        type: "line",
        data: Array(90).fill(178),
        itemStyle: { color: SUCCESS_GREEN },
        lineStyle: { color: SUCCESS_GREEN, width: 2, type: "dashed" },
        symbol: "none",
      },
    ],
  };

  // Body weight distribution
  const bodyWeightData = {
    title: {
      text: "Current Weight Breakdown",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a}<br/>{b}: {c} lbs ({d}%)",
      textStyle: { fontSize: 12 },
    },
    series: [
      {
        name: "Body Composition",
        type: "pie",
        radius: ["30%", "70%"],
        center: ["50%", "60%"],
        data: [
          {
            value: 145,
            name: "Lean Body Mass",
            itemStyle: { color: PRIMARY_BLUE },
          },
          {
            value: 25,
            name: "Fat Mass",
            itemStyle: { color: SECONDARY_GRAY },
          },
          {
            value: 12,
            name: "Bone & Other",
            itemStyle: { color: "#9ca3af" },
          },
        ],
        label: {
          fontSize: 11,
          color: "#374151",
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.3)",
          },
        },
      },
    ],
  };

  // Weekly reference arrays (6-week mesocycle) ensuring internal consistency across charts
  const weeklyLabels = [
    "Week 1",
    "Week 2",
    "Week 3",
    "Week 4",
    "Week 5",
    "Week 6",
  ];
  const weeklyWeight = [182.3, 181.8, 181.2, 180.7, 180.2, 179.8];
  const weeklyBodyFatPct = [15.2, 14.8, 14.3, 13.9, 13.5, 13.2];
  const weeklyLeanMass = weeklyWeight.map((w, i) => {
    const lean = w * (1 - weeklyBodyFatPct[i] / 100);
    return Math.round(lean * 10) / 10; // 0.1 lb precision
  });
  const weeklyFatMass = weeklyWeight.map((w, i) => {
    const fat = w - weeklyLeanMass[i];
    return Math.round(fat * 10) / 10;
  });
  // Bench 1RM estimates (for power-to-weight ratio context)
  const weeklyBench1RM = [300, 301, 303, 304, 305, 307];
  const weeklyPowerToWeight = weeklyBench1RM.map(
    (val, i) => Math.round((val / weeklyWeight[i]) * 100) / 100
  );
  // FFMI (Fat-Free Mass Index) = (LeanMassKg)/(height^2), LeanMassKg = leanMass(lbs)*0.453592
  const weeklyFFMI = weeklyLeanMass.map((lm) => {
    const lmKg = lm * 0.453592;
    return Math.round((lmKg / (HEIGHT_M * HEIGHT_M)) * 100) / 100;
  });
  // BMI = weightKg / height^2
  const weeklyBMI = weeklyWeight.map((w) => {
    const wKg = w * 0.453592;
    return Math.round((wKg / (HEIGHT_M * HEIGHT_M)) * 100) / 100;
  });

  // Lean body mass progression (updated with consistent data)
  const leanMassData = {
    title: {
      text: "Lean Body Mass Progression",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>Lean Mass: {c} lbs",
    },
    xAxis: {
      type: "category",
      data: weeklyLabels,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "Lean Mass (lbs)",
      min: Math.min(...weeklyLeanMass) - 2,
      max: Math.max(...weeklyLeanMass) + 2,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Lean Body Mass",
        type: "bar",
        data: weeklyLeanMass,
        itemStyle: { color: PRIMARY_BLUE },
        barWidth: "60%",
      },
    ],
  };

  // Body fat percentage over time
  const bodyFatData = {
    title: {
      text: "Body Fat Percentage",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>Body Fat: {c}%",
    },
    xAxis: {
      type: "category",
      data: weeklyLabels,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "Body Fat %",
      min: Math.min(...weeklyBodyFatPct) - 1,
      max: Math.max(...weeklyBodyFatPct) + 1,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Body Fat %",
        type: "line",
        data: weeklyBodyFatPct,
        itemStyle: { color: WARNING_ORANGE },
        lineStyle: { color: WARNING_ORANGE, width: 3 },
        symbol: "circle",
        symbolSize: 6,
        markLine: {
          data: [
            {
              yAxis: 12,
              name: "Target: 12%",
              lineStyle: { color: SUCCESS_GREEN, type: "dashed" },
              label: { color: SUCCESS_GREEN, fontSize: 10 },
            },
          ],
        },
      },
    ],
  };

  // Power-to-weight ratio tracking (bench 1RM / body weight)
  const powerToWeightData = {
    title: {
      text: "Power-to-Weight Ratio",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>P/W Ratio: {c}",
    },
    xAxis: {
      type: "category",
      data: weeklyLabels,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "Power/Weight",
      min: Math.min(...weeklyPowerToWeight) - 0.05,
      max: Math.max(...weeklyPowerToWeight) + 0.05,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "P/W Ratio",
        type: "line",
        data: weeklyPowerToWeight,
        itemStyle: { color: SUCCESS_GREEN },
        lineStyle: { color: SUCCESS_GREEN, width: 3 },
        symbol: "diamond",
        symbolSize: 8,
        areaStyle: { color: `${SUCCESS_GREEN}15` },
      },
    ],
  };

  // Fat mass progression (derived)
  const fatMassData = {
    title: {
      text: "Fat Mass Progression",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>Fat Mass: {c} lbs",
    },
    xAxis: {
      type: "category",
      data: weeklyLabels,
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      name: "Fat Mass (lbs)",
      min: Math.min(...weeklyFatMass) - 1,
      max: Math.max(...weeklyFatMass) + 1,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Fat Mass",
        type: "line",
        data: weeklyFatMass,
        itemStyle: { color: SECONDARY_GRAY },
        lineStyle: { color: SECONDARY_GRAY, width: 3 },
        symbol: "circle",
        symbolSize: 6,
        areaStyle: { color: `${SECONDARY_GRAY}15` },
      },
    ],
  };

  // FFMI progression
  const ffmiData = {
    title: {
      text: "FFMI Progression",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: { trigger: "axis", formatter: "{b}<br/>FFMI: {c}" },
    xAxis: {
      type: "category",
      data: weeklyLabels,
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      name: "FFMI",
      min: Math.min(...weeklyFFMI) - 0.2,
      max: Math.max(...weeklyFFMI) + 0.2,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "FFMI",
        type: "line",
        data: weeklyFFMI,
        itemStyle: { color: PRIMARY_BLUE },
        lineStyle: { color: PRIMARY_BLUE, width: 3 },
        symbol: "rect",
        symbolSize: 8,
        areaStyle: { color: `${PRIMARY_BLUE}15` },
        markLine: {
          data: [
            {
              yAxis: 25,
              name: "Upper Nat. Benchmark",
              lineStyle: { color: WARNING_ORANGE, type: "dashed" },
              label: { color: WARNING_ORANGE, fontSize: 10 },
            },
          ],
        },
      },
    ],
  };

  // BMI progression
  const bmiData = {
    title: {
      text: "BMI Trend",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: { trigger: "axis", formatter: "{b}<br/>BMI: {c}" },
    xAxis: {
      type: "category",
      data: weeklyLabels,
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      name: "BMI",
      min: Math.min(...weeklyBMI) - 0.5,
      max: Math.max(...weeklyBMI) + 0.5,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "BMI",
        type: "line",
        data: weeklyBMI,
        itemStyle: { color: SUCCESS_GREEN },
        lineStyle: { color: SUCCESS_GREEN, width: 3 },
        symbol: "triangle",
        symbolSize: 8,
        areaStyle: { color: `${SUCCESS_GREEN}10` },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Scale className="h-8 w-8 text-blue-900" />
          <h1 className="text-3xl font-bold text-gray-900">
            Body Composition Analysis
          </h1>
        </div>
        <p className="text-gray-600">
          Professional body composition tracking for Olympic wrestling
          performance
        </p>
      </div>

      {/* Goal Setting Card */}
      <Card className="mb-8 border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
            <Target className="h-5 w-5" />
            Weight Goals & Targets
          </CardTitle>
          <CardDescription className="text-gray-600">
            Set and track your competition weight targets
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            <div className="space-y-2">
              <label
                htmlFor="current-weight"
                className="text-sm font-medium text-gray-700"
              >
                Current Weight (lbs)
              </label>
              <input
                id="current-weight"
                type="number"
                placeholder="182"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="goal-weight"
                className="text-sm font-medium text-gray-700"
              >
                Goal Weight (lbs)
              </label>
              <input
                id="goal-weight"
                type="number"
                placeholder="178"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="competition-date"
                className="text-sm font-medium text-gray-700"
              >
                Competition Date
              </label>
              <input
                id="competition-date"
                type="date"
                className="flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none"
              />
            </div>
          </div>
          <Button className="mt-4 bg-blue-900 hover:bg-blue-800 text-white">
            Update Goals
          </Button>
        </CardContent>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Weight className="h-6 w-6 text-blue-900" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Current Weight
                </p>
                <p className="text-2xl font-bold text-gray-900">182.3 lbs</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  -0.8 lbs this week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Activity className="h-6 w-6 text-green-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Lean Mass</p>
                <p className="text-2xl font-bold text-gray-900">145.0 lbs</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.3 lbs this week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Target className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Body Fat</p>
                <p className="text-2xl font-bold text-gray-900">13.2%</p>
                <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                  <TrendingDown className="h-3 w-3" />
                  -0.3% this week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">P/W Ratio</p>
                <p className="text-2xl font-bold text-gray-900">1.87</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +0.03 this week
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Weight Tracking Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Weight Monitoring
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                90-Day Weight Trend
              </CardTitle>
              <CardDescription className="text-gray-600">
                Daily weight tracking with goal progression
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts
                option={weightTrackingData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Weight Distribution
              </CardTitle>
              <CardDescription className="text-gray-600">
                Current body composition breakdown
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts
                option={bodyWeightData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Body Composition Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Body Composition Metrics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Lean Body Mass
              </CardTitle>
              <CardDescription className="text-gray-600">
                Muscle mass development over time
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts option={leanMassData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Body Fat Percentage
              </CardTitle>
              <CardDescription className="text-gray-600">
                Fat mass reduction progression
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts option={bodyFatData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Fat Mass Trend
              </CardTitle>
              <CardDescription className="text-gray-600">
                Derived fat mass from weight & body fat %
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts option={fatMassData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                FFMI Progression
              </CardTitle>
              <CardDescription className="text-gray-600">
                Fat-free mass index relative to height
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts option={ffmiData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">BMI Trend</CardTitle>
              <CardDescription className="text-gray-600">
                Body mass index changes (contextual metric)
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts option={bmiData} style={{ height: "280px" }} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Metrics */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Performance Analysis
        </h2>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg text-gray-800">
              Power-to-Weight Ratio
            </CardTitle>
            <CardDescription className="text-gray-600">
              Strength relative to body weight - key metric for wrestling
              performance
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white">
            <ReactECharts
              option={powerToWeightData}
              style={{ height: "280px" }}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
