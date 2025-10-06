"use client";

import React, { useMemo } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactECharts from "echarts-for-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Droplets, Clock, Target, Timer, TrendingUp } from "lucide-react";
import { AIInsightPanel } from "./AIInsightPanel";
import { AIInsight } from "../types";

interface HydrationTimingData {
  date: string;
  waterIntake: number; // liters
  preWorkoutHydration: number; // 1-10 scale
  duringWorkoutHydration: number;
  postWorkoutHydration: number;
  supplementTiming: number; // minutes before workout
  mealSpacing: number; // hours between meals
  sleepQuality: number; // 1-10 scale
}

interface HydrationTimingChartProps {
  data?: HydrationTimingData[];
  className?: string;
}

export const HydrationTimingChart: React.FC<HydrationTimingChartProps> = ({
  data,
  className = "",
}) => {
  // Generate sample data if not provided
  const chartData: HydrationTimingData[] = useMemo(() => {
    if (data) return data;

    return Array.from({ length: 7 }, (_, i) => {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      return {
        date: date.toLocaleDateString("en-US", { weekday: "short" }),
        waterIntake: 3.0 + Math.random() * 1.5,
        preWorkoutHydration: 7 + Math.random() * 2,
        duringWorkoutHydration: 6 + Math.random() * 3,
        postWorkoutHydration: 8 + Math.random() * 1.5,
        supplementTiming: 25 + Math.random() * 20, // 25-45 minutes
        mealSpacing: 3.5 + Math.random() * 1.0, // 3.5-4.5 hours
        sleepQuality: 6 + Math.random() * 3,
      };
    });
  }, [data]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const avgWaterIntake =
      chartData.reduce((sum, d) => sum + d.waterIntake, 0) / chartData.length;
    const avgSupplementTiming =
      chartData.reduce((sum, d) => sum + d.supplementTiming, 0) /
      chartData.length;
    const avgMealSpacing =
      chartData.reduce((sum, d) => sum + d.mealSpacing, 0) / chartData.length;
    const avgSleepQuality =
      chartData.reduce((sum, d) => sum + d.sleepQuality, 0) / chartData.length;

    const hydrationConsistency = chartData.filter(
      (d) => d.waterIntake >= 3.0
    ).length;
    const timingConsistency = chartData.filter(
      (d) => d.supplementTiming >= 20 && d.supplementTiming <= 45
    ).length;

    return {
      avgWaterIntake: Math.round(avgWaterIntake * 10) / 10,
      avgSupplementTiming: Math.round(avgSupplementTiming),
      avgMealSpacing: Math.round(avgMealSpacing * 10) / 10,
      avgSleepQuality: Math.round(avgSleepQuality * 10) / 10,
      hydrationConsistency,
      timingConsistency,
      overallScore: Math.round(
        (avgWaterIntake / 4 +
          avgSleepQuality / 10 +
          (timingConsistency / 7) * 100) /
          3
      ),
    };
  }, [chartData]);

  // Radar chart data
  const radarData = useMemo(
    () => ({
      title: {
        text: "بهینه‌سازی آب‌رسانی و زمان‌بندی",
        textStyle: { fontSize: 14, fontWeight: "normal", color: "#374151" },
      },
      tooltip: { trigger: "item" },
      radar: {
        indicator: [
          { name: "مصرف آب", max: 5 },
          { name: "پیش‌تمرین", max: 10 },
          { name: "حین تمرین", max: 10 },
          { name: "پس‌تمرین", max: 10 },
          { name: "زمان مکمل", max: 60 },
          { name: "خواب", max: 10 },
        ],
        radius: "65%",
      },
      series: [
        {
          type: "radar",
          data: [
            {
              value: [
                metrics.avgWaterIntake,
                chartData.reduce((sum, d) => sum + d.preWorkoutHydration, 0) /
                  chartData.length,
                chartData.reduce(
                  (sum, d) => sum + d.duringWorkoutHydration,
                  0
                ) / chartData.length,
                chartData.reduce((sum, d) => sum + d.postWorkoutHydration, 0) /
                  chartData.length,
                metrics.avgSupplementTiming,
                metrics.avgSleepQuality,
              ],
              name: "هفته فعلی",
              itemStyle: { color: "#3b82f6" },
              areaStyle: { color: "#3b82f630" },
            },
            {
              value: [4.0, 8.5, 8.0, 9.0, 30, 8.0], // Optimal targets
              name: "اهداف بهینه",
              itemStyle: { color: "#60a5fa" },
              areaStyle: { color: "#60a5fa20" },
              lineStyle: { type: "dashed" },
            },
          ],
        },
      ],
    }),
    [chartData, metrics]
  );

  // Timing distribution data
  const timingDistribution = useMemo(
    () => [
      {
        name: "پیش‌تمرین (20-30 دق)",
        value: chartData.filter(
          (d) => d.supplementTiming >= 20 && d.supplementTiming <= 30
        ).length,
      },
      {
        name: "پیش‌تمرین (30-45 دق)",
        value: chartData.filter(
          (d) => d.supplementTiming > 30 && d.supplementTiming <= 45
        ).length,
      },
      {
        name: "خیلی زود (>45 دق)",
        value: chartData.filter((d) => d.supplementTiming > 45).length,
      },
      {
        name: "خیلی دیر (<20 دق)",
        value: chartData.filter((d) => d.supplementTiming < 20).length,
      },
    ],
    [chartData]
  );

  // Generate AI insights
  const aiInsights: AIInsight[] = useMemo(() => {
    const insights: AIInsight[] = [];

    // Hydration insights
    if (metrics.avgWaterIntake < 3.0) {
      insights.push({
        type: "warning",
        title: "کمبود آب‌رسانی",
        content: `میانگین مصرف آب ${metrics.avgWaterIntake}L زیر حد توصیه‌شده 3-4L برای ورزشکاران است.`,
        priority: "high",
        actionable: true,
        relatedMetrics: ["مصرف آب", "عملکرد", "بازیابی"],
      });
    } else if (metrics.avgWaterIntake > 4.5) {
      insights.push({
        type: "optimization",
        title: "آب‌رسانی عالی! 💧",
        content: `مصرف آب فوق‌العاده در ${metrics.avgWaterIntake}L روزانه. آب‌رسانی شما از عملکرد بهینه حمایت می‌کند.`,
        priority: "low",
        actionable: false,
      });
    }

    // Timing insights
    if (metrics.timingConsistency < 5) {
      insights.push({
        type: "recommendation",
        title: "بهینه‌سازی زمان‌بندی مکمل",
        content: `تنها ${metrics.timingConsistency}/7 روز زمان‌بندی بهینه داشتید. هدف 20-45 دقیقه قبل تمرین.`,
        priority: "medium",
        actionable: true,
        relatedMetrics: ["زمان‌بندی مکمل", "جذب", "عملکرد"],
      });
    }

    // Sleep quality insights
    if (metrics.avgSleepQuality < 7) {
      insights.push({
        type: "warning",
        title: "تأثیر کیفیت خواب",
        content: `میانگین کیفیت خواب ${metrics.avgSleepQuality}/10 ممکن است بازیابی را محدود کند.`,
        priority: "high",
        actionable: true,
        relatedMetrics: ["کیفیت خواب", "بازیابی", "تعادل هورمونی"],
      });
    }

    // Meal spacing insights
    if (metrics.avgMealSpacing > 5) {
      insights.push({
        type: "recommendation",
        title: "Meal Timing Adjustment",
        content: `Meal spacing of ${metrics.avgMealSpacing} hours may be too long. Consider 3-4 hour intervals for optimal nutrient absorption and energy stability.`,
        priority: "medium",
        actionable: true,
      });
    }

    // Overall performance insights
    if (metrics.overallScore > 85) {
      insights.push({
        type: "achievement",
        title: "Timing Mastery Achieved! 🎯",
        content: `Your hydration and timing score of ${metrics.overallScore}% indicates excellent optimization. This foundation supports peak wrestling performance.`,
        priority: "low",
        actionable: false,
      });
    }

    return insights;
  }, [metrics]);

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <Droplets className="h-5 w-5 text-gray-700" />
                هیدراتاسیون و زمان‌بندی
              </CardTitle>
              <CardDescription className="text-gray-600">
                ردیابی آب‌رسانی، زمان‌بندی مکمل و عوامل بازیابی
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300"
              >
                {metrics.avgWaterIntake}L روزانه
              </Badge>
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300"
              >
                {metrics.overallScore}% بهینه
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  مصرف آب
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {metrics.avgWaterIntake}L
              </div>
              <div className="text-xs text-gray-600">
                {metrics.hydrationConsistency}/7 روز بهینه
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  زمان‌بندی مکمل
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {metrics.avgSupplementTiming} دقیقه
              </div>
              <div className="text-xs text-gray-600">قبل تمرین</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Timer className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  فاصله غذا
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {metrics.avgMealSpacing}h
              </div>
              <div className="text-xs text-gray-600">بین وعده‌ها</div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  کیفیت خواب
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {metrics.avgSleepQuality}/10
              </div>
              <div className="text-xs text-gray-600">عامل بازیابی</div>
            </div>
          </div>

          {/* Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Target className="h-4 w-4 text-gray-700" />
                رادار عملکرد هفتگی
              </h4>
              <div className="h-80 bg-gray-50 rounded-md border border-gray-200 p-4">
                <ReactECharts option={radarData} style={{ height: "100%" }} />
              </div>
            </div>

            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-700" />
                توزیع زمان‌بندی مکمل
              </h4>
              <div className="h-80 bg-gray-50 rounded-md border border-gray-200 p-4">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timingDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={70}
                      dataKey="value"
                      label={({ value }) =>
                        (value as number) > 0 ? `${value}` : ""
                      }
                    >
                      {timingDistribution.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            index === 0
                              ? "#3b82f6"
                              : index === 1
                              ? "#60a5fa"
                              : index === 2
                              ? "#93c5fd"
                              : "#dbeafe"
                          }
                        />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(value: number, name: string) => [
                        `${value} روز`,
                        name,
                      ]}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Weekly Hydration Trend */}
          <div className="bg-gray-50 border border-gray-200 p-6 rounded-md">
            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-700" />
              روند آب‌رسانی هفتگی
            </h4>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    fontSize={11}
                    tick={{ fill: "#6b7280" }}
                  />
                  <YAxis
                    fontSize={11}
                    tick={{ fill: "#6b7280" }}
                    domain={[0, 5]}
                  />
                  <Tooltip
                    formatter={(value: number) => [`${value}L`, "مصرف آب"]}
                    labelFormatter={(label) => `روز: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="waterIntake"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={{
                      fill: "#3b82f6",
                      strokeWidth: 2,
                      r: 4,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">نکات آب‌رسانی</span>
              </div>
              <p className="text-sm text-blue-800">
                هدف 3-4 لیتر روزانه، 500ml دو ساعت قبل تمرین و 150-250ml هر
                15-20 دقیقه حین ورزش.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">
                  نکات زمان‌بندی
                </span>
              </div>
              <p className="text-sm text-blue-800">
                کراتین 30 دقیقه قبل تمرین برای جذب بهینه. پروتئین تا 30 دقیقه پس
                از تمرین.
              </p>
            </div>

            <div className="bg-blue-50 p-4 rounded-md border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">نکات بازیابی</span>
              </div>
              <p className="text-sm text-blue-800">
                7-9 ساعت خواب، فاصله 3-4 ساعته وعده‌ها و آب‌رسانی مناسب برای جذب
                بهینه مواد مغذی.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightPanel
        insights={aiInsights}
        title="بینش‌های آب‌رسانی و زمان‌بندی"
      />
    </div>
  );
};
