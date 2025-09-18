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
        title: "Core Foundation Solid! 🏆",
        content: `Excellent adherence to core supplements (${metrics.coreAdherence}%). Your creatine and protein consistency is supporting optimal performance.`,
        priority: "low",
        actionable: false,
        relatedMetrics: ["Core Adherence", "Performance Score"],
      });
    } else if (metrics.coreAdherence < 80) {
      insights.push({
        type: "warning",
        title: "Core Supplement Gaps",
        content: `Core supplement adherence at ${metrics.coreAdherence}% needs attention. Focus on creatine and protein consistency for maximum performance gains.`,
        priority: "high",
        actionable: true,
        relatedMetrics: ["Creatine", "Protein", "Performance"],
      });
    }

    // Performance correlation insights
    if (metrics.performanceCorrelation > 0.8) {
      insights.push({
        type: "optimization",
        title: "Strong Performance Link",
        content: `Your supplement adherence shows strong correlation with performance (${metrics.performanceCorrelation}). Maintaining consistency will continue driving results.`,
        priority: "medium",
        actionable: false,
      });
    }

    // Trend analysis
    if (metrics.trend === "improving" && metrics.overallAdherence > 85) {
      insights.push({
        type: "achievement",
        title: "Momentum Building! 📈",
        content: `Performance trending upward with ${metrics.overallAdherence}% adherence. You're in the optimal zone for wrestling performance gains.`,
        priority: "low",
        actionable: false,
      });
    }

    // Improvement potential
    if (metrics.improvementPotential > 15) {
      insights.push({
        type: "recommendation",
        title: "Performance Opportunity",
        content: `${metrics.improvementPotential}% improvement potential available. Focus on consistency in your weakest supplement categories for maximum gains.`,
        priority: "medium",
        actionable: true,
        relatedMetrics: ["Overall Adherence", "Performance Potential"],
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
          ? "vitamins"
          : latest.preWorkout === lowestAdherence
          ? "pre-workout"
          : "beta-alanine";

      insights.push({
        type: "recommendation",
        title: `${
          lowestSupplement.charAt(0).toUpperCase() + lowestSupplement.slice(1)
        } Focus Needed`,
        content: `Your ${lowestSupplement} adherence is at ${lowestAdherence}%. Consider setting reminders or adjusting timing to improve consistency.`,
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
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Shield className="h-5 w-5 text-purple-600" />
                Supplement Adherence & Performance
              </CardTitle>
              <CardDescription>
                Track supplement consistency and correlation with performance
                metrics
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className={`${
                  metrics.trend === "improving"
                    ? "bg-green-50 text-green-700 border-green-200"
                    : metrics.trend === "declining"
                    ? "bg-red-50 text-red-700 border-red-200"
                    : "bg-gray-50 text-gray-700 border-gray-200"
                }`}
              >
                {metrics.trend === "improving"
                  ? "↗"
                  : metrics.trend === "declining"
                  ? "↘"
                  : "→"}{" "}
                {metrics.trend}
              </Badge>
              <Badge
                variant="outline"
                className="bg-purple-50 text-purple-700 border-purple-200"
              >
                {metrics.overallAdherence}% overall
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <CheckCircle className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">
                  Core Adherence
                </span>
              </div>
              <div className="text-xl font-bold text-purple-600">
                {metrics.coreAdherence}%
              </div>
              <div className="text-xs text-gray-600">Creatine + Protein</div>
            </div>

            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Shield className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Support Stack
                </span>
              </div>
              <div className="text-xl font-bold text-blue-600">
                {metrics.supplementaryAdherence}%
              </div>
              <div className="text-xs text-gray-600">Vitamins + Extras</div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Award className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Performance
                </span>
              </div>
              <div className="text-xl font-bold text-green-600">
                {metrics.performanceScore}
              </div>
              <div className="text-xs text-gray-600">Weekly score</div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">
                  Correlation
                </span>
              </div>
              <div className="text-xl font-bold text-orange-600">
                {metrics.performanceCorrelation}
              </div>
              <div className="text-xs text-gray-600">Adherence impact</div>
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
                  name="Creatine"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="protein"
                  fill={CHART_COLORS.dangerRed}
                  name="Protein"
                  radius={[2, 2, 0, 0]}
                />

                {/* Support supplements */}
                <Bar
                  dataKey="vitamins"
                  fill={CHART_COLORS.successGreen}
                  name="Vitamins"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="preWorkout"
                  fill={CHART_COLORS.purpleAccent}
                  name="Pre-workout"
                  radius={[2, 2, 0, 0]}
                />
                <Bar
                  dataKey="betaAlanine"
                  fill={CHART_COLORS.infoCyan}
                  name="Beta-Alanine"
                  radius={[2, 2, 0, 0]}
                />

                {/* Performance line */}
                <Line
                  type="monotone"
                  dataKey="performance"
                  stroke={CHART_COLORS.warningOrange}
                  strokeWidth={3}
                  dot={{
                    fill: CHART_COLORS.warningOrange,
                    strokeWidth: 2,
                    r: 4,
                  }}
                  name="Performance Score"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          {/* Performance Indicators */}
          <div className="mt-6 bg-gradient-to-r from-purple-50 to-blue-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              Performance Impact Analysis
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white p-3 rounded border border-purple-200">
                <div className="text-sm text-gray-600 mb-1">
                  Adherence-Performance Correlation
                </div>
                <div className="text-lg font-bold text-purple-600">
                  {metrics.performanceCorrelation}
                </div>
                <div className="text-xs text-gray-500">
                  Strong correlation = better results
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-blue-200">
                <div className="text-sm text-gray-600 mb-1">
                  Improvement Potential
                </div>
                <div className="text-lg font-bold text-blue-600">
                  {metrics.improvementPotential}%
                </div>
                <div className="text-xs text-gray-500">
                  Room for performance gains
                </div>
              </div>
              <div className="bg-white p-3 rounded border border-green-200">
                <div className="text-sm text-gray-600 mb-1">
                  Consistency Rating
                </div>
                <div className="text-lg font-bold text-green-600">
                  {metrics.overallAdherence > 90
                    ? "Excellent"
                    : metrics.overallAdherence > 80
                    ? "Good"
                    : metrics.overallAdherence > 70
                    ? "Fair"
                    : "Needs Work"}
                </div>
                <div className="text-xs text-gray-500">
                  Based on overall adherence
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightPanel
        insights={aiInsights}
        title="Adherence & Performance Insights"
      />
    </div>
  );
};
