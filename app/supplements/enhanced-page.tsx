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

  // Enhanced supplement intake tracking
  const coreSupplementsData = {
    title: {
      text: "Core Supplements Adherence",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>{a0}: {c0}%<br/>{a1}: {c1}%<br/>{a2}: {c2}%",
    },
    legend: {
      data: ["Creatine", "Protein", "Multivitamin"],
      textStyle: { fontSize: 11, color: "#374151" },
    },
    xAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "Adherence %",
      max: 100,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Creatine",
        type: "bar",
        data: [95, 90, 100, 98],
        itemStyle: { color: PRIMARY_BLUE },
      },
      {
        name: "Protein",
        type: "bar",
        data: [88, 92, 95, 90],
        itemStyle: { color: SUCCESS_GREEN },
      },
      {
        name: "Multivitamin",
        type: "bar",
        data: [85, 90, 88, 92],
        itemStyle: { color: SECONDARY_GRAY },
      },
    ],
  };

  // Pre-workout and performance supplements
  const performanceSupplementsData = {
    title: {
      text: "Performance Supplements",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>{a0}: {c0}%<br/>{a1}: {c1}%<br/>{a2}: {c2}%",
    },
    legend: {
      data: ["Beta-Alanine", "Caffeine", "BCAAs"],
      textStyle: { fontSize: 11, color: "#374151" },
    },
    xAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "Usage %",
      max: 100,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Beta-Alanine",
        type: "line",
        data: [75, 80, 85, 90],
        itemStyle: { color: WARNING_ORANGE },
        lineStyle: { color: WARNING_ORANGE, width: 3 },
        symbol: "circle",
        symbolSize: 6,
      },
      {
        name: "Caffeine",
        type: "line",
        data: [60, 65, 70, 75],
        itemStyle: { color: "#dc2626" },
        lineStyle: { color: "#dc2626", width: 3 },
        symbol: "square",
        symbolSize: 6,
      },
      {
        name: "BCAAs",
        type: "line",
        data: [80, 85, 88, 90],
        itemStyle: { color: "#9333ea" },
        lineStyle: { color: "#9333ea", width: 3 },
        symbol: "diamond",
        symbolSize: 6,
      },
    ],
  };

  // Recovery supplements tracking
  const recoverySupplementsData = {
    title: {
      text: "Recovery & Health Supplements",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
    },
    legend: {
      data: ["Glutamine", "Omega-3", "Magnesium", "Vitamin D"],
      textStyle: { fontSize: 11, color: "#374151" },
    },
    xAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "Adherence %",
      max: 100,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Glutamine",
        type: "bar",
        data: [85, 90, 88, 92],
        itemStyle: { color: "#16a34a" },
      },
      {
        name: "Omega-3",
        type: "bar",
        data: [90, 95, 92, 95],
        itemStyle: { color: "#0ea5e9" },
      },
      {
        name: "Magnesium",
        type: "bar",
        data: [80, 85, 90, 88],
        itemStyle: { color: "#8b5cf6" },
      },
      {
        name: "Vitamin D",
        type: "bar",
        data: [95, 98, 95, 100],
        itemStyle: { color: "#f59e0b" },
      },
    ],
  };

  // Hydration and electrolytes
  const hydrationData = {
    title: {
      text: "Daily Hydration & Electrolytes",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>Water: {c0}L<br/>Electrolytes: {c1} servings",
    },
    legend: {
      data: ["Water Intake (L)", "Electrolyte Servings"],
      textStyle: { fontSize: 11, color: "#374151" },
    },
    xAxis: {
      type: "category",
      data: last30Days.slice(-14), // Last 14 days
      axisLabel: { interval: 2, fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: [
      {
        type: "value",
        name: "Liters",
        min: 2,
        max: 5,
        nameTextStyle: { fontSize: 10, color: "#6b7280" },
        axisLabel: { fontSize: 10, color: "#6b7280" },
        axisLine: { lineStyle: { color: "#e5e7eb" } },
      },
      {
        type: "value",
        name: "Servings",
        min: 0,
        max: 4,
        position: "right",
        nameTextStyle: { fontSize: 10, color: "#6b7280" },
        axisLabel: { fontSize: 10, color: "#6b7280" },
        axisLine: { lineStyle: { color: "#e5e7eb" } },
      },
    ],
    series: [
      {
        name: "Water Intake (L)",
        type: "bar",
        yAxisIndex: 0,
        data: [
          3.2, 3.8, 3.5, 4.1, 3.9, 3.7, 4.2, 3.6, 3.8, 4.0, 3.9, 4.1, 3.7, 3.8,
        ],
        itemStyle: { color: "#0ea5e9" },
        barWidth: "40%",
      },
      {
        name: "Electrolyte Servings",
        type: "line",
        yAxisIndex: 1,
        data: [2, 3, 2, 3, 3, 2, 3, 2, 3, 3, 2, 3, 2, 3],
        itemStyle: { color: WARNING_ORANGE },
        lineStyle: { color: WARNING_ORANGE, width: 3 },
        symbol: "circle",
        symbolSize: 6,
      },
    ],
  };

  // Supplement timing optimization
  const timingData = {
    title: {
      text: "Supplement Timing Optimization",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "item",
      textStyle: { fontSize: 12 },
      formatter: "{a}<br/>{b}: {c}%",
    },
    series: [
      {
        name: "Timing Distribution",
        type: "pie",
        radius: ["30%", "70%"],
        center: ["50%", "60%"],
        data: [
          {
            value: 35,
            name: "Pre-Workout",
            itemStyle: { color: "#dc2626" },
          },
          {
            value: 25,
            name: "Post-Workout",
            itemStyle: { color: SUCCESS_GREEN },
          },
          {
            value: 20,
            name: "With Meals",
            itemStyle: { color: PRIMARY_BLUE },
          },
          {
            value: 15,
            name: "Before Bed",
            itemStyle: { color: "#8b5cf6" },
          },
          {
            value: 5,
            name: "Upon Waking",
            itemStyle: { color: WARNING_ORANGE },
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

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Pill className="h-8 w-8 text-blue-900" />
          <h1 className="text-3xl font-bold text-gray-900">
            Athletic Supplements
          </h1>
        </div>
        <p className="text-gray-600">
          Professional supplement tracking and optimization for Olympic
          wrestling
        </p>
      </div>

      {/* Supplement Categories Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 rounded-lg">
                <Zap className="h-6 w-6 text-blue-900" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Core Supplements
                </p>
                <p className="text-2xl font-bold text-gray-900">95%</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <CheckCircle className="h-3 w-3" />
                  Excellent adherence
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-50 rounded-lg">
                <Timer className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Performance</p>
                <p className="text-2xl font-bold text-gray-900">78%</p>
                <p className="text-xs text-orange-600 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  Improving usage
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-50 rounded-lg">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Recovery</p>
                <p className="text-2xl font-bold text-gray-900">91%</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <CheckCircle className="h-3 w-3" />
                  Optimal intake
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-cyan-50 rounded-lg">
                <Droplets className="h-6 w-6 text-cyan-600" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">Hydration</p>
                <p className="text-2xl font-bold text-gray-900">3.8L</p>
                <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                  <Target className="h-3 w-3" />
                  Daily average
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Core Supplements Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Core Supplement Stack
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Foundation Supplements
              </CardTitle>
              <CardDescription className="text-gray-600">
                Essential daily supplements for athletic performance
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts
                option={coreSupplementsData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Supplement Timing
              </CardTitle>
              <CardDescription className="text-gray-600">
                Optimal timing distribution throughout the day
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts option={timingData} style={{ height: "280px" }} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Supplements Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Performance Enhancement
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Pre-Workout Stack
              </CardTitle>
              <CardDescription className="text-gray-600">
                Performance supplements for training optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts
                option={performanceSupplementsData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Recovery Support
              </CardTitle>
              <CardDescription className="text-gray-600">
                Supplements for enhanced recovery and health
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts
                option={recoverySupplementsData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hydration Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Hydration & Electrolytes
        </h2>
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg text-gray-800">
              Daily Hydration Tracking
            </CardTitle>
            <CardDescription className="text-gray-600">
              Water intake and electrolyte supplementation monitoring
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white">
            <ReactECharts option={hydrationData} style={{ height: "280px" }} />
          </CardContent>
        </Card>
      </div>

      {/* Supplement Library */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Olympic Wrestling Supplement Library
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Core Supplements */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-blue-50">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Zap className="h-5 w-5 text-blue-600" />
                Core Performance
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">
                    Creatine Monohydrate
                  </span>
                  <Badge className="bg-green-100 text-green-800">Daily</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Whey Protein</span>
                  <Badge className="bg-green-100 text-green-800">Daily</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Multivitamin</span>
                  <Badge className="bg-green-100 text-green-800">Daily</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Vitamin D3</span>
                  <Badge className="bg-green-100 text-green-800">Daily</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance Supplements */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-orange-50">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Timer className="h-5 w-5 text-orange-600" />
                Pre-Workout
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Beta-Alanine</span>
                  <Badge className="bg-orange-100 text-orange-800">
                    Training
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Caffeine</span>
                  <Badge className="bg-orange-100 text-orange-800">
                    Training
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">
                    Citrulline Malate
                  </span>
                  <Badge className="bg-orange-100 text-orange-800">
                    Training
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Taurine</span>
                  <Badge className="bg-orange-100 text-orange-800">
                    Training
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recovery Supplements */}
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-green-50">
              <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Recovery & Health
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">L-Glutamine</span>
                  <Badge className="bg-purple-100 text-purple-800">
                    Post-Workout
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">BCAAs</span>
                  <Badge className="bg-purple-100 text-purple-800">
                    Intra-Workout
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">
                    Omega-3 Fish Oil
                  </span>
                  <Badge className="bg-green-100 text-green-800">Daily</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Magnesium</span>
                  <Badge className="bg-gray-100 text-gray-800">Evening</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hydration & Electrolyte Library */}
      <div className="mb-8">
        <Card className="border-gray-200 shadow-sm">
          <CardHeader className="bg-cyan-50">
            <CardTitle className="text-lg text-gray-800 flex items-center gap-2">
              <Droplets className="h-5 w-5 text-cyan-600" />
              Hydration & Electrolyte Stack
            </CardTitle>
            <CardDescription className="text-gray-600">
              Essential electrolytes for optimal hydration and performance
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">
                    Sodium (Competition)
                  </span>
                  <Badge className="bg-red-100 text-red-800">
                    Pre-Competition
                  </Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Potassium</span>
                  <Badge className="bg-yellow-100 text-yellow-800">Daily</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">
                    Electrolyte Powder
                  </span>
                  <Badge className="bg-blue-100 text-blue-800">Training</Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Coconut Water</span>
                  <Badge className="bg-green-100 text-green-800">Natural</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">Sea Salt</span>
                  <Badge className="bg-gray-100 text-gray-800">Meals</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-700">
                    Hydration Tablets
                  </span>
                  <Badge className="bg-blue-100 text-blue-800">
                    Convenience
                  </Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
