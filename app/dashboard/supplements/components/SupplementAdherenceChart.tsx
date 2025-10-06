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
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ComposedChart,
  Line,
} from "recharts";
import { Shield, TrendingUp, CheckCircle, Award } from "lucide-react";
import { AIInsightPanel } from "./AIInsightPanel";
import { AIInsight } from "../types";
import { CHART_COLORS } from "../utils";

interface SupplementAdherenceData {
  period: string;
  creatine: number;
  protein: number;
  vitamins: number;
  preWorkout: number;
  betaAlanine: number;
  performance: number; // Performance correlation score
}

interface SupplementAdherenceChartProps {
  data?: SupplementAdherenceData[];
  className?: string;
}

export const SupplementAdherenceChart: React.FC<
  SupplementAdherenceChartProps
> = ({ data, className = "" }) => {
  // Generate sample data if not provided
  const chartData: SupplementAdherenceData[] = useMemo(() => {
    if (data) return data;

    return [
      {
        period: "Week 1",
        creatine: 95,
        protein: 88,
        vitamins: 75,
        preWorkout: 60,
        betaAlanine: 85,
        performance: 82,
      },
      {
        period: "Week 2",
        creatine: 90,
        protein: 92,
        vitamins: 80,
        preWorkout: 65,
        betaAlanine: 88,
        performance: 85,
      },
      {
        period: "Week 3",
        creatine: 85,
        protein: 85,
        vitamins: 90,
        preWorkout: 70,
        betaAlanine: 90,
        performance: 78,
      },
      {
        period: "Week 4",
        creatine: 100,
        protein: 95,
        vitamins: 85,
        preWorkout: 80,
        betaAlanine: 92,
        performance: 92,
      },
      {
        period: "Week 5",
        creatine: 95,
        protein: 90,
        vitamins: 88,
        preWorkout: 85,
        betaAlanine: 95,
        performance: 89,
      },
      {
        period: "Week 6",
        creatine: 98,
        protein: 93,
        vitamins: 92,
        preWorkout: 88,
        betaAlanine: 98,
        performance: 94,
      },
    ];
  }, [data]);

  // Calculate metrics
  const metrics = useMemo(() => {
    const latest = chartData[chartData.length - 1];
    const previous = chartData[chartData.length - 2];

    const coreAdherence = (latest.creatine + latest.protein) / 2;
    const supplementaryAdherence =
      (latest.vitamins + latest.preWorkout + latest.betaAlanine) / 3;
    const overallAdherence =
      (latest.creatine +
        latest.protein +
        latest.vitamins +
        latest.preWorkout +
        latest.betaAlanine) /
      5;

    const performanceCorrelation =
      chartData.reduce((sum, week) => {
        const weeklyAdherence =
          (week.creatine +
            week.protein +
            week.vitamins +
            week.preWorkout +
            week.betaAlanine) /
          5;
        return sum + (weeklyAdherence * week.performance) / 10000; // Simple correlation
      }, 0) / chartData.length;

    const trend =
      latest.performance > previous.performance
        ? "improving"
        : latest.performance < previous.performance
        ? "declining"
        : "stable";

    return {
      coreAdherence: Math.round(coreAdherence),
      supplementaryAdherence: Math.round(supplementaryAdherence),
      overallAdherence: Math.round(overallAdherence),
      performanceScore: latest.performance,
      performanceCorrelation: Math.round(performanceCorrelation * 100) / 100,
      trend,
      improvementPotential: 100 - overallAdherence,
    };
  }, [chartData]);

  // Generate AI insights
  const aiInsights: AIInsight[] = useMemo(() => {
    const insights: AIInsight[] = [];

    // Core supplements analysis
    if (metrics.coreAdherence >= 90) {
      insights.push({
        type: "achievement",
        title: "پایه محکم! 🏆",
        content: `پایبندی عالی به مکمل‌های اصلی (${metrics.coreAdherence}%). ثبات کراتین و پروتئین شما از عملکرد بهینه حمایت می‌کند.`,
        priority: "low",
        actionable: false,
        relatedMetrics: ["پایبندی اصلی", "امتیاز عملکرد"],
      });
    } else if (metrics.coreAdherence < 80) {
      insights.push({
        type: "warning",
        title: "کمبود مکمل‌های اصلی",
        content: `پایبندی مکمل‌های اصلی در ${metrics.coreAdherence}% نیاز به توجه دارد. روی ثبات کراتین و پروتئین تمرکز کنید.`,
        priority: "high",
        actionable: true,
        relatedMetrics: ["کراتین", "پروتئین", "عملکرد"],
      });
    }

    // Performance correlation insights
    if (metrics.performanceCorrelation > 0.8) {
      insights.push({
        type: "optimization",
        title: "ارتباط قوی عملکرد",
        content: `پایبندی مکمل شما ارتباط قوی با عملکرد نشان می‌دهد (${metrics.performanceCorrelation}). حفظ ثبات به ادامه نتایج کمک می‌کند.`,
        priority: "medium",
        actionable: false,
      });
    }

    // Trend analysis
    if (metrics.trend === "improving" && metrics.overallAdherence > 85) {
      insights.push({
        type: "achievement",
        title: "حرکت رو به جلو! 📈",
        content: `عملکرد با ${metrics.overallAdherence}% پایبندی رو به بهبود است. در ناحیه بهینه برای پیشرفت کشتی قرار دارید.`,
        priority: "low",
        actionable: false,
      });
    }

    // Improvement potential
    if (metrics.improvementPotential > 15) {
      insights.push({
        type: "recommendation",
        title: "فرصت بهبود عملکرد",
        content: `${metrics.improvementPotential}% پتانسیل بهبود موجود است. روی ثبات در ضعیف‌ترین دسته‌های مکمل تمرکز کنید.`,
        priority: "medium",
        actionable: true,
        relatedMetrics: ["پایبندی کلی", "پتانسیل عملکرد"],
      });
    }

    // Specific supplement recommendations
    const latest = chartData[chartData.length - 1];
    const lowestAdherence = Math.min(
      latest.vitamins,
      latest.preWorkout,
      latest.betaAlanine
    );
    if (lowestAdherence < 75) {
      const lowestSupplement =
        latest.vitamins === lowestAdherence
          ? "ویتامین‌ها"
          : latest.preWorkout === lowestAdherence
          ? "پیش‌تمرین"
          : "بتا آلانین";

      insights.push({
        type: "recommendation",
        title: `نیاز به تمرکز روی ${lowestSupplement}`,
        content: `پایبندی ${lowestSupplement} شما در ${lowestAdherence}% است. تنظیم یادآوری یا تغییر زمان‌بندی را در نظر بگیرید.`,
        priority: "medium",
        actionable: true,
      });
    }

    return insights;
  }, [chartData, metrics]);

  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: Array<{
      dataKey: string;
      value: number;
      color: string;
      name: string;
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          {payload.map((entry, index) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.value}%
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <Shield className="h-5 w-5 text-gray-700" />
                پایبندی مکمل‌ها
              </CardTitle>
              <CardDescription className="text-gray-600">
                ردیابی پایبندی و ارتباط با عملکرد
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className={`${
                  metrics.trend === "improving"
                    ? "bg-gray-100 text-gray-700 border-gray-300"
                    : metrics.trend === "declining"
                    ? "bg-gray-100 text-gray-700 border-gray-300"
                    : "bg-gray-100 text-gray-700 border-gray-300"
                }`}
              >
                {metrics.trend === "improving"
                  ? "↗"
                  : metrics.trend === "declining"
                  ? "↘"
                  : "→"}{" "}
                {metrics.trend === "improving"
                  ? "بهبود"
                  : metrics.trend === "declining"
                  ? "کاهش"
                  : "ثابت"}
              </Badge>
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300"
              >
                {metrics.overallAdherence}% کلی
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  پایبندی اصلی
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {metrics.coreAdherence}%
              </div>
              <div className="text-xs text-gray-600">کراتین + پروتئین</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  پشتیبان
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {metrics.supplementaryAdherence}%
              </div>
              <div className="text-xs text-gray-600">ویتامین‌ها + سایر</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  عملکرد
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {metrics.performanceScore}
              </div>
              <div className="text-xs text-gray-600">امتیاز هفتگی</div>
            </div>

            <div className="bg-gray-50 p-3 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  ارتباط
                </span>
              </div>
              <div className="text-xl font-bold text-gray-900">
                {metrics.performanceCorrelation}
              </div>
              <div className="text-xs text-gray-600">تأثیر پایبندی</div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis
                  dataKey="period"
                  fontSize={11}
                  tick={{ fill: "#6b7280" }}
                />
                <YAxis
                  fontSize={11}
                  tick={{ fill: "#6b7280" }}
                  domain={[0, 100]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend />

                {/* Core supplements */}
                <Bar
                  dataKey="creatine"
                  fill={CHART_COLORS.primaryBlue}
                  name="کراتین"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="protein"
                  fill={CHART_COLORS.dangerRed}
                  name="پروتئین"
                  radius={[2, 2, 0, 0]}
                />

                {/* Support supplements */}
                <Bar
                  dataKey="vitamins"
                  fill={CHART_COLORS.successGreen}
                  name="ویتامین‌ها"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="preWorkout"
                  fill={CHART_COLORS.purpleAccent}
                  name="پیش‌تمرین"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="betaAlanine"
                  fill={CHART_COLORS.infoCyan}
                  name="بتا آلانین"
                  radius={[2, 2, 0, 0]}
                />

                {/* Performance line */}
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke={CHART_COLORS.warningOrange}
                  strokeWidth={3}
                  name="امتیاز عملکرد"
                  dot={{
                    fill: CHART_COLORS.warningOrange,
                    strokeWidth: 2,
                    r: 4,
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Indicators */}
          <div className="mt-6 bg-gray-50 border border-gray-200 p-4 rounded-md">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-700" />
              تحلیل تأثیر عملکرد
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">
                  ارتباط پایبندی-عملکرد
                </div>
                <div className="text-lg font-bold text-gray-900">
                  {metrics.performanceCorrelation}
                </div>
                <div className="text-xs text-gray-500">
                  ارتباط قوی = نتایج بهتر
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">پتانسیل بهبود</div>
                <div className="text-lg font-bold text-gray-900">
                  {metrics.improvementPotential.toFixed(2)}%
                </div>
                <div className="text-xs text-gray-500">فضای بهبود عملکرد</div>
              </div>
              <div className="bg-white p-3 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">رتبه‌بندی ثبات</div>
                <div className="text-lg font-bold text-gray-900">
                  {metrics.overallAdherence > 90
                    ? "عالی"
                    : metrics.overallAdherence > 80
                    ? "خوب"
                    : metrics.overallAdherence > 70
                    ? "متوسط"
                    : "نیاز به بهبود"}
                </div>
                <div className="text-xs text-gray-500">بر اساس پایبندی کلی</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightPanel insights={aiInsights} title="بینش‌های پایبندی و عملکرد" />
    </div>
  );
};
