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
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { Zap, TrendingUp, Target, Calendar } from "lucide-react";
import { AIInsightPanel } from "./AIInsightPanel";
import { ChartDataPoint, AIInsight } from "../types";
import {
  generateSampleData,
  generateAIInsights,
  CHART_COLORS,
  calculateAdherence,
} from "../utils";

interface CreatineIntakeChartProps {
  data?: ChartDataPoint[];
  target?: number;
  className?: string;
}

export const CreatineIntakeChart: React.FC<CreatineIntakeChartProps> = ({
  data,
  target = 5,
  className = "",
}) => {
  // Generate sample data if not provided
  const chartData = useMemo(() => {
    if (data) return data;
    return generateSampleData(30, target, 0.3);
  }, [data, target]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const recent7Days = chartData.slice(-7);
    const recent30Days = chartData.slice(-30);

    const avgDaily =
      recent30Days.reduce((sum, d) => sum + d.value, 0) / recent30Days.length;
    const avgWeekly =
      recent7Days.reduce((sum, d) => sum + d.value, 0) / recent7Days.length;
    const adherenceRate = calculateAdherence(
      recent30Days.map((d) => d.value),
      target
    );
    const trend =
      avgWeekly > avgDaily ? "up" : avgWeekly < avgDaily ? "down" : "stable";
    const consistency = recent30Days.filter(
      (d) => Math.abs(d.value - target) <= 0.5
    ).length;

    return {
      avgDaily: Math.round(avgDaily * 10) / 10,
      avgWeekly: Math.round(avgWeekly * 10) / 10,
      adherenceRate,
      trend,
      consistency,
      totalIntake: recent30Days.reduce((sum, d) => sum + d.value, 0),
    };
  }, [chartData, target]);

  // Generate AI insights
  const aiInsights: AIInsight[] = useMemo(() => {
    const baseInsights = generateAIInsights(chartData, target, "Creatine");

    // Add creatine-specific insights
    const specificInsights: AIInsight[] = [];

    if (metrics.consistency >= 25) {
      specificInsights.push({
        type: "achievement",
        title: "فاز بارگذاری بهینه! 💪",
        content: `شما مصرف مداوم کراتین را برای ${metrics.consistency} روز این ماه حفظ کرده‌اید. عضلات شما کاملاً اشباع شده‌اند و پتانسیل خروجی قدرت حداکثر است.`,
        priority: "low",
        actionable: false,
        relatedMetrics: ["ثبات", "خروجی قدرت"],
      });
    }

    if (metrics.avgDaily < 3) {
      specificInsights.push({
        type: "warning",
        title: "دوز زیر بهینه",
        content: `میانگین مصرف روزانه شما ${metrics.avgDaily}g زیر محدوده توصیه‌شده ۳-۵g است. در نظر بگیرید دوزها را در طول روز تقسیم کنید تا جذب بهتری داشته باشید.`,
        priority: "high",
        actionable: true,
        relatedMetrics: ["مصرف روزانه", "نرخ جذب"],
      });
    }

    if (metrics.trend === "up" && metrics.avgWeekly > target) {
      specificInsights.push({
        type: "optimization",
        title: "استراتژی زمان‌بندی عالی",
        content:
          "افزایش اخیر شما با آماده‌سازی مسابقات همخوانی دارد. این مصرف را برای عملکرد اوج حفظ کنید، اما هر گونه ناراحتی گوارشی را پایش کنید.",
        priority: "medium",
        actionable: false,
      });
    }

    return [...baseInsights, ...specificInsights];
  }, [chartData, target, metrics]);

  // Format data for the chart
  const formattedData = chartData.map((point) => ({
    ...point,
    date: point.date,
    intake: point.value,
    target: target,
    status:
      point.value >= target * 0.8
        ? "optimal"
        : point.value >= target * 0.6
        ? "adequate"
        : "low",
  }));

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: { intake: number; target: number; status: string };
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{label}</p>
          <p className="text-blue-600">
            <span className="font-medium">Intake: {data.intake}g</span>
          </p>
          <p className="text-gray-600">Target: {target}g</p>
          <p
            className={`text-xs ${
              data.status === "optimal"
                ? "text-green-600"
                : data.status === "adequate"
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            Status: {data.status.charAt(0).toUpperCase() + data.status.slice(1)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-gray-700" />
                مصرف کراتین مونوهیدرات
              </CardTitle>
              <CardDescription>
                ردیابی روزانه کراتین برای بهینه‌سازی قدرت و استقامت
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="bg-gray-50 text-gray-700 border-gray-200"
              >
                {metrics.trend === "up"
                  ? "↗"
                  : metrics.trend === "down"
                  ? "↘"
                  : "→"}{" "}
                {metrics.trend === "up"
                  ? "افزایشی"
                  : metrics.trend === "down"
                  ? "کاهشی"
                  : "پایدار"}
              </Badge>
              <Badge
                variant="outline"
                className="bg-gray-50 text-gray-700 border-gray-200"
              >
                {metrics.adherenceRate}% پایبندی
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  میانگین روزانه
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {metrics.avgDaily}g
              </div>
              <div className="text-xs text-gray-600">۳۰ روز گذشته</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  میانگین هفتگی
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {metrics.avgWeekly}g
              </div>
              <div className="text-xs text-gray-600">۷ روز گذشته</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">ثبات</span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {metrics.consistency}/۳۰
              </div>
              <div className="text-xs text-gray-600">روزهای هدف</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-gray-700" />
                <span className="text-sm font-medium text-gray-700">
                  مصرف کل
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {Math.round(metrics.totalIntake)}g
              </div>
              <div className="text-xs text-gray-600">این ماه</div>
            </div>
          </div>

          {/* Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={formattedData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="date"
                  fontSize={11}
                  tick={{ fill: "#6b7280" }}
                  interval="preserveStartEnd"
                />
                <YAxis
                  fontSize={11}
                  tick={{ fill: "#6b7280" }}
                  domain={[0, Math.max(8, target * 1.5)]}
                />
                <Tooltip content={<CustomTooltip />} />

                {/* Target line */}
                <ReferenceLine
                  y={target}
                  stroke={CHART_COLORS.warningOrange}
                  strokeDasharray="5 5"
                  label={{
                    value: `Target: ${target}g`,
                    position: "insideTopRight",
                  }}
                />

                {/* Optimal range */}
                <ReferenceLine
                  y={target * 0.8}
                  stroke={CHART_COLORS.successGreen}
                  strokeDasharray="2 2"
                  strokeOpacity={0.5}
                />

                {/* Bar chart for daily intake */}
                <Bar
                  dataKey="intake"
                  fill={CHART_COLORS.primaryBlue}
                  radius={[2, 2, 0, 0]}
                  opacity={0.8}
                />

                {/* Trend line */}
                <Line
                  type="monotone"
                  dataKey="intake"
                  stroke={CHART_COLORS.dangerRed}
                  strokeWidth={2}
                  dot={false}
                  connectNulls
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightPanel
        insights={aiInsights}
        title="بینش‌های بهینه‌سازی کراتین"
      />
    </div>
  );
};
