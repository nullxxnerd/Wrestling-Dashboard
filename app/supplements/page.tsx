"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactECharts from "echarts-for-react";
import {
  Pill,
  Droplets,
  Zap,
  Shield,
  Timer,
  Target,
  TrendingUp,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

// Wrestling-themed colors
const WRESTLING_BLUE = "#1e40af";
const WRESTLING_RED = "#dc2626";

// Professional color palette
const PRIMARY_BLUE = "#1e3a8a";
const SECONDARY_GRAY = "#64748b";
const SUCCESS_GREEN = "#059669";
const WARNING_ORANGE = "#d97706";

export default function SupplementsPage() {
  // Generate last 30 days of data
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  // Daily creatine intake (target: 5g)
  const creatineIntakeData = {
    title: {
      text: "Daily Creatine Intake (Last 30 Days)",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>Creatine: {c}g",
      textStyle: { fontSize: 12 },
    },
    xAxis: {
      type: "category",
      data: last30Days,
      axisLabel: { interval: 4, fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Grams",
      max: 8,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Creatine Intake",
        type: "bar",
        data: [
          5, 5, 4, 5, 5, 3, 5, 5, 5, 4, 5, 5, 5, 2, 5, 5, 5, 5, 4, 5, 5, 5, 5,
          5, 3, 5, 5, 5, 5, 5,
        ],
        itemStyle: { color: PRIMARY_BLUE },
        markLine: {
          data: [{ type: "average", name: "Target: 5g", yAxis: 5 }],
          lineStyle: { color: WARNING_ORANGE, type: "dashed" },
        },
      },
    ],
  };

  // Daily protein intake (target: 180g for 180lb wrestler)
  const proteinIntakeData = {
    title: {
      text: "Daily Protein Intake (Last 30 Days)",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>Protein: {c}g",
      textStyle: { fontSize: 12 },
    },
    xAxis: {
      type: "category",
      data: last30Days,
      axisLabel: { interval: 4, fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Grams",
      min: 120,
      max: 220,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Protein Intake",
        type: "line",
        data: [
          175, 180, 185, 178, 182, 165, 188, 190, 185, 172, 180, 195, 188, 160,
          185, 190, 192, 188, 175, 180, 185, 188, 190, 185, 170, 182, 188, 190,
          185, 192,
        ],
        itemStyle: { color: WRESTLING_RED },
        lineStyle: { color: WRESTLING_RED, width: 3 },
        areaStyle: { color: `${WRESTLING_RED}20` },
        smooth: true,
        markLine: {
          data: [{ type: "average", name: "Target: 180g", yAxis: 180 }],
          lineStyle: { color: WRESTLING_BLUE, type: "dashed" },
        },
      },
    ],
  };

  // Core supplement adherence (most important)
  const coreSupplementData = {
    title: {
      text: "Core Supplement Adherence",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{a}<br/>{b}: {c}%",
      textStyle: { fontSize: 12 },
    },
    legend: {
      data: ["Creatine", "Protein"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Adherence %",
      max: 100,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Creatine",
        type: "bar",
        data: [95, 90, 85, 100],
        itemStyle: { color: WRESTLING_BLUE },
      },
      {
        name: "Protein",
        type: "bar",
        data: [88, 92, 85, 95],
        itemStyle: { color: WRESTLING_RED },
      },
    ],
  };

  // Supplementary supplements adherence
  const supplementaryData = {
    title: {
      text: "Supplementary Support Adherence",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{a}<br/>{b}: {c}%",
      textStyle: { fontSize: 12 },
    },
    legend: {
      data: ["Vitamins", "Pre-workout"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Adherence %",
      max: 100,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Vitamins",
        type: "bar",
        data: [75, 80, 90, 85],
        itemStyle: { color: "#16a34a" },
      },
      {
        name: "Pre-workout",
        type: "bar",
        data: [60, 65, 70, 80],
        itemStyle: { color: "#9333ea" },
      },
    ],
  };

  // Hydration and timing
  const hydrationTimingData = {
    title: {
      text: "Supplement Timing & Hydration",
      textStyle: { fontSize: 16 },
    },
    tooltip: { trigger: "item" },
    radar: {
      indicator: [
        { name: "Pre-workout Timing", max: 10 },
        { name: "Post-workout Protein", max: 10 },
        { name: "Daily Water (L)", max: 5 },
        { name: "Creatine Consistency", max: 10 },
        { name: "Meal Timing", max: 10 },
        { name: "Sleep Quality", max: 10 },
      ],
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: [8, 9, 3.5, 9, 8, 7],
            name: "This Week",
            itemStyle: { color: WRESTLING_BLUE },
            areaStyle: { color: `${WRESTLING_BLUE}30` },
          },
          {
            value: [7, 8, 3.2, 8, 7, 6],
            name: "Last Week",
            itemStyle: { color: WRESTLING_RED },
            areaStyle: { color: `${WRESTLING_RED}20` },
          },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Supplement Intake</h1>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            92% Adherence This Week
          </Badge>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Competition Prep
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Creatine Intake Tracking</CardTitle>
            <CardDescription>
              Daily creatine monohydrate intake (Target: 5g/day)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts
              option={creatineIntakeData}
              style={{ height: "280px" }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Protein Intake Tracking</CardTitle>
            <CardDescription>
              Daily protein consumption (Target: 1g per lb bodyweight)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts
              option={proteinIntakeData}
              style={{ height: "280px" }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Core Supplements</CardTitle>
            <CardDescription>
              Essential creatine and protein adherence rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts
              option={coreSupplementData}
              style={{ height: "280px" }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Supplementary Support</CardTitle>
            <CardDescription>
              Vitamins and pre-workout compliance rates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts
              option={supplementaryData}
              style={{ height: "280px" }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Timing & Recovery Metrics</CardTitle>
            <CardDescription>
              Supplement timing, hydration, and recovery factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts
              option={hydrationTimingData}
              style={{ height: "280px" }}
            />
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              Daily Creatine
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">4.8g</div>
            <p className="text-xs text-gray-500">Average this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Daily Protein</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">183g</div>
            <p className="text-xs text-gray-500">Average this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Hydration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">3.5L</div>
            <p className="text-xs text-gray-500">Daily water intake</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Cost/Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">$127</div>
            <p className="text-xs text-gray-500">Supplement budget</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Current Supplement Stack</CardTitle>
            <CardDescription>
              Daily supplement regimen for wrestling performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-blue-600">Morning</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Multivitamin</li>
                  <li>• Vitamin D3 (2000 IU)</li>
                  <li>• Fish Oil (1g)</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-red-600">Pre-Workout</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Creatine (2.5g)</li>
                  <li>• Caffeine (200mg)</li>
                  <li>• Beta-Alanine (3g)</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-green-600">Post-Workout</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Whey Protein (25g)</li>
                  <li>• Creatine (2.5g)</li>
                  <li>• Glutamine (5g)</li>
                </ul>
              </div>
              <div className="p-4 border rounded-lg">
                <h4 className="font-semibold text-purple-600">Evening</h4>
                <ul className="text-sm text-gray-600 mt-2 space-y-1">
                  <li>• Casein Protein (30g)</li>
                  <li>• Magnesium (400mg)</li>
                  <li>• ZMA Complex</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
