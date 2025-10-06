"use client";

import React, { useMemo, useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import {
  Pill,
  DollarSign,
  Clock,
  Target,
  TrendingUp,
  Calendar,
  ShoppingCart,
  Zap,
  Shield,
  CheckCircle,
} from "lucide-react";
import { AIInsightPanel } from "./AIInsightPanel";
import { SupplementData, AIInsight } from "../types";
import { formatCurrency, CHART_COLORS } from "../utils";

interface SupplementStackOverviewProps {
  supplements?: SupplementData[];
  className?: string;
}

interface StackTiming {
  time: string;
  supplements: SupplementData[];
  totalCost: number;
  icon: React.ReactNode;
  color: string;
}

export const SupplementStackOverview: React.FC<
  SupplementStackOverviewProps
> = ({ supplements, className = "" }) => {
  const [selectedTiming, setSelectedTiming] = useState<string>("all");

  // Use sample data if not provided, with additional supplements
  const supplementData = useMemo(() => {
    if (supplements) return supplements;

    return [
      {
        id: "creatine",
        name: "کراتین مونوهیدرات",
        category: "performance",
        targetAmount: 5,
        unit: "g",
        cost: 25,
        timing: ["pre-workout", "post-workout"],
        benefits: ["افزایش قدرت", "بهبود بازیابی", "عملکرد بهتر"],
      },
      {
        id: "protein",
        name: "پروتئین وی",
        category: "core",
        targetAmount: 180,
        unit: "g",
        cost: 60,
        timing: ["post-workout", "evening"],
        benefits: ["ساخت عضله", "بازیابی", "حفظ توده عضلانی"],
      },
      {
        id: "beta-alanine",
        name: "بتا آلانین",
        category: "performance",
        targetAmount: 3,
        unit: "g",
        cost: 20,
        timing: ["pre-workout"],
        benefits: ["افزایش استقامت", "کاهش خستگی", "بهبود عملکرد"],
      },
      {
        id: "vitamin-d",
        name: "ویتامین D3",
        category: "health",
        targetAmount: 4000,
        unit: "IU",
        cost: 18,
        timing: ["morning"],
        benefits: ["سلامت استخوان", "سیستم ایمنی", "بهبود خلق"],
      },
      {
        id: "multivitamin",
        name: "مولتی ویتامین",
        category: "health",
        targetAmount: 1,
        unit: "قرص",
        cost: 30,
        timing: ["morning"],
        benefits: ["پشتیبانی کلی", "سیستم ایمنی", "متابولیسم انرژی"],
      },
      {
        id: "fish-oil",
        name: "امگا 3",
        category: "health",
        targetAmount: 1000,
        unit: "mg",
        cost: 25,
        timing: ["morning", "evening"],
        benefits: ["سلامت مفاصل", "کاهش التهاب", "عملکرد مغز"],
      },
      {
        id: "magnesium",
        name: "منیزیم گلایسینات",
        category: "recovery",
        targetAmount: 400,
        unit: "mg",
        cost: 20,
        timing: ["evening"],
        benefits: ["کیفیت خواب", "آرامش عضلانی", "بهبود بازیابی"],
      },
      {
        id: "caffeine",
        name: "کافئین",
        category: "performance",
        targetAmount: 200,
        unit: "mg",
        cost: 15,
        timing: ["pre-workout"],
        benefits: ["افزایش انرژی", "تمرکز بهتر", "سوزاندن چربی"],
      },
      {
        id: "zinc",
        name: "زینک",
        category: "recovery",
        targetAmount: 15,
        unit: "mg",
        cost: 12,
        timing: ["evening"],
        benefits: ["بازیابی بافت", "سیستم ایمنی", "تستوستron"],
      },
      {
        id: "bcaa",
        name: "آمینواسید شاخه‌ای",
        category: "performance",
        targetAmount: 10,
        unit: "g",
        cost: 35,
        timing: ["pre-workout", "post-workout"],
        benefits: ["کاهش خستگی", "بازیابی عضله", "پروتئین‌سازی"],
      },
    ] as SupplementData[];
  }, [supplements]);

  // Organize supplements by timing
  const stackByTiming: StackTiming[] = useMemo(
    () => [
      {
        time: "صبح",
        supplements: supplementData.filter((s) => s.timing.includes("morning")),
        totalCost: supplementData
          .filter((s) => s.timing.includes("morning"))
          .reduce((sum, s) => sum + (s.cost || 0), 0),
        icon: <Calendar className="h-4 w-4" />,
        color: "bg-gray-100 border-gray-300 text-gray-700",
      },
      {
        time: "پیش‌تمرین",
        supplements: supplementData.filter((s) =>
          s.timing.includes("pre-workout")
        ),
        totalCost: supplementData
          .filter((s) => s.timing.includes("pre-workout"))
          .reduce((sum, s) => sum + (s.cost || 0), 0),
        icon: <Zap className="h-4 w-4" />,
        color: "bg-gray-100 border-gray-300 text-gray-700",
      },
      {
        time: "پس‌تمرین",
        supplements: supplementData.filter((s) =>
          s.timing.includes("post-workout")
        ),
        totalCost: supplementData
          .filter((s) => s.timing.includes("post-workout"))
          .reduce((sum, s) => sum + (s.cost || 0), 0),
        icon: <Target className="h-4 w-4" />,
        color: "bg-gray-100 border-gray-300 text-gray-700",
      },
      {
        time: "عصر",
        supplements: supplementData.filter((s) => s.timing.includes("evening")),
        totalCost: supplementData
          .filter((s) => s.timing.includes("evening"))
          .reduce((sum, s) => sum + (s.cost || 0), 0),
        icon: <Shield className="h-4 w-4" />,
        color: "bg-gray-100 border-gray-300 text-gray-700",
      },
    ],
    [supplementData]
  );

  // Calculate metrics
  const metrics = useMemo(() => {
    const totalMonthlyCost = supplementData.reduce(
      (sum, s) => sum + (s.cost || 0),
      0
    );
    const categoryBreakdown = supplementData.reduce((acc, s) => {
      acc[s.category] = (acc[s.category] || 0) + (s.cost || 0);
      return acc;
    }, {} as Record<string, number>);

    const costPerCategory = Object.entries(categoryBreakdown).map(
      ([category, cost]) => ({
        category:
          category === "core"
            ? "اصلی"
            : category === "performance"
            ? "عملکرد"
            : category === "health"
            ? "سلامت"
            : category === "recovery"
            ? "بازیابی"
            : category,
        cost,
        count: supplementData.filter((s) => s.category === category).length,
      })
    );

    return {
      totalMonthlyCost,
      dailyCost: Math.round((totalMonthlyCost / 30) * 100) / 100,
      totalSupplements: supplementData.length,
      costPerCategory,
      mostExpensive: supplementData.reduce((prev, current) =>
        (prev.cost || 0) > (current.cost || 0) ? prev : current
      ),
      avgCostPerSupplement:
        Math.round((totalMonthlyCost / supplementData.length) * 100) / 100,
    };
  }, [supplementData]);

  // Cost breakdown pie chart data
  const costBreakdownData = metrics.costPerCategory.map((item) => ({
    category: item.category,
    cost: item.cost,
    count: item.count,
  }));

  const COST_COLORS = [
    CHART_COLORS.primaryBlue,
    CHART_COLORS.dangerRed,
    CHART_COLORS.successGreen,
    CHART_COLORS.warningOrange,
  ];

  // Generate AI insights
  const aiInsights: AIInsight[] = useMemo(() => {
    const insights: AIInsight[] = [];

    // Cost optimization insights
    if (metrics.totalMonthlyCost > 150) {
      insights.push({
        type: "warning",
        title: "هزینه بالای مکمل‌ها",
        content: `هزینه ماهانه $${metrics.totalMonthlyCost} بالاتر از بودجه معمول ورزشکاران است. روی مکمل‌های اصلی تمرکز کنید.`,
        priority: "medium",
        actionable: true,
        relatedMetrics: ["هزینه ماهانه", "مکمل‌های اصلی"],
      });
    } else if (metrics.totalMonthlyCost < 80) {
      insights.push({
        type: "recommendation",
        title: "فرصت بهینه‌سازی بودجه",
        content: `بودجه فعلی $${metrics.totalMonthlyCost} فضایی برای افزودن مکمل‌های عملکرد دارد.`,
        priority: "low",
        actionable: true,
      });
    }

    // Stack composition insights
    const coreSupplements = supplementData.filter(
      (s) => s.category === "core" || s.category === "performance"
    ).length;
    const totalSupplements = supplementData.length;

    if (coreSupplements / totalSupplements < 0.4) {
      insights.push({
        type: "recommendation",
        title: "Core Supplement Focus",
        content: `Only ${Math.round(
          (coreSupplements / totalSupplements) * 100
        )}% of your stack is core performance supplements. Prioritize creatine and protein for maximum ROI.`,
        priority: "medium",
        actionable: true,
        relatedMetrics: ["Stack Composition", "Performance Impact"],
      });
    }

    // Timing optimization
    const morningCount =
      stackByTiming.find((t) => t.time === "Morning")?.supplements.length || 0;
    if (morningCount < 2) {
      insights.push({
        type: "optimization",
        title: "Morning Stack Enhancement",
        content: `Consider adding vitamin D3 and omega-3 to your morning routine for foundational health support and better absorption.`,
        priority: "low",
        actionable: true,
      });
    }

    // Achievement insights
    if (metrics.totalSupplements >= 6 && metrics.totalMonthlyCost <= 120) {
      insights.push({
        type: "achievement",
        title: "Well-Balanced Stack! 🏆",
        content: `Excellent balance of ${
          metrics.totalSupplements
        } supplements at ${formatCurrency(
          metrics.totalMonthlyCost
        )}/month. Your stack covers all key areas efficiently.`,
        priority: "low",
        actionable: false,
      });
    }

    return insights;
  }, [supplementData, metrics, stackByTiming]);

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: { name: string; value: number; count: number };
    }>;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900">{data.name}</p>
          <p className="text-gray-900">هزینه: ${data.value}</p>
          <p className="text-gray-600 text-sm">{data.count} مکمل</p>
        </div>
      );
    }
    return null;
  };

  const filteredSupplements =
    selectedTiming === "all"
      ? supplementData
      : stackByTiming.find(
          (t) => t.time.toLowerCase().replace("-", "") === selectedTiming
        )?.supplements || [];

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2 text-gray-900">
                <Pill className="h-5 w-5 text-gray-700" />
                پشته کامل مکمل‌ها
              </CardTitle>
              <CardDescription className="text-gray-600">
                رژیم کامل با تحلیل هزینه و زمان‌بندی
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300"
              >
                ${metrics.dailyCost}/روز
              </Badge>
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300"
              >
                {metrics.totalSupplements} مکمل
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Cost Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  هزینه ماهانه
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${metrics.totalMonthlyCost}
              </div>
              <div className="text-xs text-gray-600">
                ${metrics.dailyCost} روزانه
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Pill className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  کل مکمل‌ها
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {metrics.totalSupplements}
              </div>
              <div className="text-xs text-gray-600">
                ${metrics.avgCostPerSupplement} میانگین
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <ShoppingCart className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  گران‌ترین
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                ${metrics.mostExpensive.cost || 0}
              </div>
              <div className="text-xs text-gray-600">
                {metrics.mostExpensive.name}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-md border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">
                  مکمل‌های اصلی
                </span>
              </div>
              <div className="text-2xl font-bold text-gray-900">
                {
                  supplementData.filter(
                    (s) => s.category === "core" || s.category === "performance"
                  ).length
                }
              </div>
              <div className="text-xs text-gray-600">تمرکز عملکرد</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            {/* Cost Breakdown Pie Chart */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-gray-700" />
                تقسیم‌بندی هزینه بر اساس دسته
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="cost"
                      nameKey="category"
                      label
                    >
                      {costBreakdownData.map((_, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COST_COLORS[index % COST_COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip content={<CustomTooltip />} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Category Analysis */}
            <div>
              <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-700" />
                تحلیل سرمایه‌گذاری دسته‌ها
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={costBreakdownData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="category"
                      fontSize={11}
                      tick={{ fill: "#6b7280" }}
                    />
                    <YAxis fontSize={11} tick={{ fill: "#6b7280" }} />
                    <Tooltip
                      formatter={(value: number) => [
                        `$${value}`,
                        "هزینه ماهانه",
                      ]}
                      labelFormatter={(label) => `دسته: ${label}`}
                    />
                    <Bar dataKey="cost" fill="#6b7280" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Timing Filter */}
          <div className="mb-6">
            <div className="flex gap-2 mb-4">
              <Button
                variant={selectedTiming === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTiming("all")}
                className="text-sm"
              >
                همه مکمل‌ها
              </Button>
              {stackByTiming.map((timing) => (
                <Button
                  key={timing.time}
                  variant={
                    selectedTiming ===
                    timing.time.toLowerCase().replace("-", "")
                      ? "default"
                      : "outline"
                  }
                  size="sm"
                  onClick={() =>
                    setSelectedTiming(
                      timing.time.toLowerCase().replace("-", "")
                    )
                  }
                  className="flex items-center gap-1"
                >
                  {timing.icon}
                  {timing.time}
                </Button>
              ))}
            </div>
          </div>

          {/* Supplement Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {filteredSupplements.map((supplement) => (
              <div
                key={supplement.id}
                className="bg-white p-4 rounded-md border border-gray-200"
              >
                <div className="flex items-start justify-between mb-3">
                  <h5 className="font-medium text-gray-900 text-sm">
                    {supplement.name}
                  </h5>
                  <Badge
                    variant="outline"
                    className="text-xs bg-gray-100 text-gray-700 border-gray-300"
                  >
                    {supplement.category === "core"
                      ? "اصلی"
                      : supplement.category === "performance"
                      ? "عملکرد"
                      : supplement.category === "health"
                      ? "سلامت"
                      : "بازیابی"}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">مقدار:</span>
                    <span className="font-medium text-gray-900">
                      {supplement.targetAmount}
                      {supplement.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">هزینه:</span>
                    <span className="font-medium text-gray-900">
                      ${supplement.cost || 0}
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3 text-gray-500" />
                    <span className="text-gray-600">
                      {supplement.timing
                        .map((t) =>
                          t === "morning"
                            ? "صبح"
                            : t === "pre-workout"
                            ? "پیش‌تمرین"
                            : t === "post-workout"
                            ? "پس‌تمرین"
                            : t === "evening"
                            ? "عصر"
                            : t
                        )
                        .join("، ")}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  {supplement.benefits.slice(0, 2).map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 text-xs text-gray-600"
                    >
                      <CheckCircle className="h-3 w-3 text-gray-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cost-Effectiveness Analysis */}
          <div className="mt-8 bg-gray-100 border border-gray-300 p-6 rounded-md">
            <h4 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-gray-700" />
              تحلیل اثربخشی هزینه
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-4 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">
                  هزینه به ازای مکمل اصلی
                </div>
                <div className="text-xl font-bold text-gray-900">
                  $
                  {Math.round(
                    metrics.totalMonthlyCost /
                      supplementData.filter(
                        (s) =>
                          s.category === "performance" || s.category === "core"
                      ).length
                  )}
                </div>
                <div className="text-xs text-gray-500">در ماه</div>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">
                  سرمایه‌گذاری سالانه
                </div>
                <div className="text-xl font-bold text-gray-900">
                  ${metrics.totalMonthlyCost * 12}
                </div>
                <div className="text-xs text-gray-500">هزینه کل سال</div>
              </div>
              <div className="bg-white p-4 rounded border border-gray-200">
                <div className="text-sm text-gray-600 mb-1">بازده سرمایه</div>
                <div className="text-xl font-bold text-gray-900">بالا</div>
                <div className="text-xs text-gray-500">پشته علمی</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightPanel insights={aiInsights} title="بینش‌های بهینه‌سازی پشته" />
    </div>
  );
};
