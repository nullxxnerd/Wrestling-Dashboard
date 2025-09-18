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
import { SAMPLE_SUPPLEMENTS, formatCurrency, CHART_COLORS } from "../utils";

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
      SAMPLE_SUPPLEMENTS.creatine,
      SAMPLE_SUPPLEMENTS.protein,
      SAMPLE_SUPPLEMENTS.betaAlanine,
      SAMPLE_SUPPLEMENTS.vitaminD,
      {
        id: "multivitamin",
        name: "Multivitamin Complex",
        category: "health",
        targetAmount: 1,
        unit: "tablet",
        cost: 30,
        timing: ["morning"],
        benefits: [
          "Micronutrient support",
          "Immune function",
          "Energy metabolism",
        ],
      },
      {
        id: "fish-oil",
        name: "Omega-3 Fish Oil",
        category: "health",
        targetAmount: 1000,
        unit: "mg",
        cost: 25,
        timing: ["morning", "evening"],
        benefits: ["Joint health", "Inflammation reduction", "Brain function"],
      },
      {
        id: "magnesium",
        name: "Magnesium Glycinate",
        category: "recovery",
        targetAmount: 400,
        unit: "mg",
        cost: 20,
        timing: ["evening"],
        benefits: [
          "Sleep quality",
          "Muscle relaxation",
          "Recovery enhancement",
        ],
      },
      {
        id: "caffeine",
        name: "Caffeine Anhydrous",
        category: "performance",
        targetAmount: 200,
        unit: "mg",
        cost: 15,
        timing: ["pre-workout"],
        benefits: ["Energy boost", "Focus enhancement", "Fat oxidation"],
      },
    ] as SupplementData[];
  }, [supplements]);

  // Organize supplements by timing
  const stackByTiming: StackTiming[] = useMemo(
    () => [
      {
        time: "Morning",
        supplements: supplementData.filter((s) => s.timing.includes("morning")),
        totalCost: supplementData
          .filter((s) => s.timing.includes("morning"))
          .reduce((sum, s) => sum + (s.cost || 0), 0),
        icon: <Calendar className="h-4 w-4" />,
        color: "bg-yellow-50 border-yellow-200 text-yellow-700",
      },
      {
        time: "Pre-Workout",
        supplements: supplementData.filter((s) =>
          s.timing.includes("pre-workout")
        ),
        totalCost: supplementData
          .filter((s) => s.timing.includes("pre-workout"))
          .reduce((sum, s) => sum + (s.cost || 0), 0),
        icon: <Zap className="h-4 w-4" />,
        color: "bg-red-50 border-red-200 text-red-700",
      },
      {
        time: "Post-Workout",
        supplements: supplementData.filter((s) =>
          s.timing.includes("post-workout")
        ),
        totalCost: supplementData
          .filter((s) => s.timing.includes("post-workout"))
          .reduce((sum, s) => sum + (s.cost || 0), 0),
        icon: <Target className="h-4 w-4" />,
        color: "bg-green-50 border-green-200 text-green-700",
      },
      {
        time: "Evening",
        supplements: supplementData.filter((s) => s.timing.includes("evening")),
        totalCost: supplementData
          .filter((s) => s.timing.includes("evening"))
          .reduce((sum, s) => sum + (s.cost || 0), 0),
        icon: <Shield className="h-4 w-4" />,
        color: "bg-purple-50 border-purple-200 text-purple-700",
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
        category: category.charAt(0).toUpperCase() + category.slice(1),
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
    name: item.category,
    value: item.cost,
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
        title: "High Supplement Costs",
        content: `Monthly cost of ${formatCurrency(
          metrics.totalMonthlyCost
        )} is above typical athlete budgets. Consider prioritizing core supplements and bulk purchasing.`,
        priority: "medium",
        actionable: true,
        relatedMetrics: ["Monthly Cost", "Core Supplements"],
      });
    } else if (metrics.totalMonthlyCost < 80) {
      insights.push({
        type: "recommendation",
        title: "Budget Optimization Opportunity",
        content: `Your current spend of ${formatCurrency(
          metrics.totalMonthlyCost
        )} allows room for additional performance supplements like beta-alanine or HMB.`,
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
          <p className="text-blue-600">Cost: {formatCurrency(data.value)}</p>
          <p className="text-gray-600 text-sm">
            {data.count} supplement{data.count !== 1 ? "s" : ""}
          </p>
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
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Pill className="h-5 w-5 text-purple-600" />
                Supplement Stack Overview
              </CardTitle>
              <CardDescription>
                Complete supplement regimen with cost analysis and timing
                optimization
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                {formatCurrency(metrics.dailyCost)}/day
              </Badge>
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 border-purple-200"
              >
                {metrics.totalSupplements} supplements
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Cost Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Monthly Cost
                </span>
              </div>
              <div className="text-xl font-bold text-green-600">
                {formatCurrency(metrics.totalMonthlyCost)}
              </div>
              <div className="text-xs text-gray-600">
                {formatCurrency(metrics.dailyCost)} per day
              </div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Pill className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  Total Supplements
                </span>
              </div>
              <div className="text-xl font-bold text-purple-600">
                {metrics.totalSupplements}
              </div>
              <div className="text-xs text-gray-600">
                {formatCurrency(metrics.avgCostPerSupplement)} average
              </div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <ShoppingCart className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Most Expensive
                </span>
              </div>
              <div className="text-xl font-bold text-blue-600">
                {formatCurrency(metrics.mostExpensive.cost || 0)}
              </div>
              <div className="text-xs text-gray-600">
                {metrics.mostExpensive.name}
              </div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">
                  Core Supplements
                </span>
              </div>
              <div className="text-xl font-bold text-orange-600">
                {
                  supplementData.filter(
                    (s) => s.category === "core" || s.category === "performance"
                  ).length
                }
              </div>
              <div className="text-xs text-gray-600">Performance focus</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Cost Breakdown Pie Chart */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <DollarSign className="h-4 w-4" />
                Cost Breakdown by Category
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={costBreakdownData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
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
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Category Investment Analysis
              </h4>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={costBreakdownData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="category" fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip
                      formatter={(value: number) => [
                        formatCurrency(value),
                        "Monthly Cost",
                      ]}
                      labelFormatter={(label) => `Category: ${label}`}
                    />
                    <Bar
                      dataKey="cost"
                      fill={CHART_COLORS.primaryBlue}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Timing Filter */}
          <div className="mb-4">
            <div className="flex gap-2 mb-3">
              <Button
                variant={selectedTiming === "all" ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTiming("all")}
              >
                All Supplements
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSupplements.map((supplement) => (
              <div
                key={supplement.id}
                className="bg-gray-50 p-4 rounded-lg border"
              >
                <div className="flex items-start justify-between mb-2">
                  <h5 className="font-medium text-gray-900">
                    {supplement.name}
                  </h5>
                  <Badge
                    variant="outline"
                    className={`text-xs ${
                      supplement.category === "core"
                        ? "bg-red-50 text-red-700 border-red-200"
                        : supplement.category === "performance"
                        ? "bg-blue-50 text-blue-700 border-blue-200"
                        : supplement.category === "health"
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-purple-50 text-purple-700 border-purple-200"
                    }`}
                  >
                    {supplement.category}
                  </Badge>
                </div>

                <div className="space-y-2 mb-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Target:</span>
                    <span className="font-medium">
                      {supplement.targetAmount}
                      {supplement.unit}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Cost:</span>
                    <span className="font-medium text-green-600">
                      {formatCurrency(supplement.cost || 0)}/month
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Clock className="h-3 w-3 text-gray-400" />
                    <span className="text-gray-600">
                      {supplement.timing.join(", ")}
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  {supplement.benefits.map((benefit, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-1 text-xs text-gray-600"
                    >
                      <CheckCircle className="h-3 w-3 text-green-500" />
                      <span>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Cost-Effectiveness Analysis */}
          <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              Cost-Effectiveness Analysis
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border border-green-200">
                <div className="text-sm text-gray-600 mb-1">
                  Cost per Performance Benefit
                </div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(
                    metrics.totalMonthlyCost /
                      supplementData.filter(
                        (s) =>
                          s.category === "performance" || s.category === "core"
                      ).length
                  )}
                </div>
                <div className="text-xs text-gray-500">Per core supplement</div>
              </div>
              <div className="bg-white p-3 rounded border border-blue-200">
                <div className="text-sm text-gray-600 mb-1">
                  Annual Investment
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {formatCurrency(metrics.totalMonthlyCost * 12)}
                </div>
                <div className="text-xs text-gray-500">Full year cost</div>
              </div>
              <div className="bg-white p-3 rounded border border-purple-200">
                <div className="text-sm text-gray-600 mb-1">
                  Performance ROI
                </div>
                <div className="text-lg font-bold text-purple-600">High</div>
                <div className="text-xs text-gray-500">
                  Evidence-based stack
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightPanel
        insights={aiInsights}
        title="Stack Optimization Insights"
      />
    </div>
  );
};
