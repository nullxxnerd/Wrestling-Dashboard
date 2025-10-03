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
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  ComposedChart,
  Bar,
} from "recharts";
import { TrendingUp, Target, Zap, Activity, BarChart3 } from "lucide-react";
import { AIInsightPanel } from "./AIInsightPanel";
import { AIInsight } from "../types";
import { CHART_COLORS } from "../utils";

interface PerformanceDataPoint {
  date: string;
  creatineIntake: number;
  proteinIntake: number;
  overallAdherence: number;
  strengthScore: number; // 1-100
  enduranceScore: number; // 1-100
  powerOutput: number; // watts or relative scale
  recoveryScore: number; // 1-100
  competitionPerformance: number; // 1-100
}

interface PerformanceCorrelationChartProps {
  data?: PerformanceDataPoint[];
  className?: string;
}

export const PerformanceCorrelationChart: React.FC<
  PerformanceCorrelationChartProps
> = ({ data, className = "" }) => {
  // Generate sample data if not provided
  const chartData: PerformanceDataPoint[] = useMemo(() => {
    if (data) return data;

    return Array.from({ length: 12 }, (_, i) => {
      const week = i + 1;
      // Simulate correlation between supplement adherence and performance
      const baseAdherence = 75 + Math.random() * 20;
      const creatineIntake = 3.5 + Math.random() * 2;
      const proteinIntake = 160 + Math.random() * 40;

      // Performance metrics correlated with adherence (with some noise)
      const adherenceEffect = baseAdherence / 100;
      const strengthScore = Math.min(
        100,
        60 + adherenceEffect * 30 + Math.random() * 15
      );
      const enduranceScore = Math.min(
        100,
        55 + adherenceEffect * 35 + Math.random() * 15
      );
      const powerOutput = Math.min(
        100,
        50 + adherenceEffect * 40 + Math.random() * 15
      );
      const recoveryScore = Math.min(
        100,
        65 + adherenceEffect * 25 + Math.random() * 15
      );
      const competitionPerformance = Math.min(
        100,
        60 + adherenceEffect * 30 + Math.random() * 20
      );

      return {
        date: `Week ${week}`,
        creatineIntake: Math.round(creatineIntake * 10) / 10,
        proteinIntake: Math.round(proteinIntake),
        overallAdherence: Math.round(baseAdherence),
        strengthScore: Math.round(strengthScore),
        enduranceScore: Math.round(enduranceScore),
        powerOutput: Math.round(powerOutput),
        recoveryScore: Math.round(recoveryScore),
        competitionPerformance: Math.round(competitionPerformance),
      };
    });
  }, [data]);

  // Calculate correlation metrics
  const correlationMetrics = useMemo(() => {
    const adherenceValues = chartData.map((d) => d.overallAdherence);
    const strengthValues = chartData.map((d) => d.strengthScore);
    const enduranceValues = chartData.map((d) => d.enduranceScore);
    const powerValues = chartData.map((d) => d.powerOutput);
    const recoveryValues = chartData.map((d) => d.recoveryScore);

    // Simple correlation calculation
    const calculateCorrelation = (x: number[], y: number[]) => {
      const n = x.length;
      const sumX = x.reduce((a, b) => a + b, 0);
      const sumY = y.reduce((a, b) => a + b, 0);
      const sumXY = x.reduce((acc, xi, i) => acc + xi * y[i], 0);
      const sumX2 = x.reduce((acc, xi) => acc + xi * xi, 0);
      const sumY2 = y.reduce((acc, yi) => acc + yi * yi, 0);

      const correlation =
        (n * sumXY - sumX * sumY) /
        Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));

      return Math.round(correlation * 100) / 100;
    };

    const strengthCorrelation = calculateCorrelation(
      adherenceValues,
      strengthValues
    );
    const enduranceCorrelation = calculateCorrelation(
      adherenceValues,
      enduranceValues
    );
    const powerCorrelation = calculateCorrelation(adherenceValues, powerValues);
    const recoveryCorrelation = calculateCorrelation(
      adherenceValues,
      recoveryValues
    );

    const avgPerformance =
      chartData.reduce(
        (sum, d) =>
          sum +
          (d.strengthScore +
            d.enduranceScore +
            d.powerOutput +
            d.recoveryScore) /
            4,
        0
      ) / chartData.length;

    const avgAdherence =
      adherenceValues.reduce((a, b) => a + b, 0) / adherenceValues.length;

    return {
      strengthCorrelation,
      enduranceCorrelation,
      powerCorrelation,
      recoveryCorrelation,
      avgPerformance: Math.round(avgPerformance),
      avgAdherence: Math.round(avgAdherence),
      strongestCorrelation: Math.max(
        strengthCorrelation,
        enduranceCorrelation,
        powerCorrelation,
        recoveryCorrelation
      ),
    };
  }, [chartData]);

  // Scatter plot data for adherence vs performance
  const scatterData = chartData.map((d) => ({
    adherence: d.overallAdherence,
    performance:
      (d.strengthScore + d.enduranceScore + d.powerOutput + d.recoveryScore) /
      4,
    week: d.date,
    creatine: d.creatineIntake,
    protein: d.proteinIntake,
  }));

  // Generate AI insights
  const aiInsights: AIInsight[] = useMemo(() => {
    const insights: AIInsight[] = [];

    // Strong correlation insights
    if (correlationMetrics.strongestCorrelation > 0.7) {
      insights.push({
        type: "achievement",
        title: "Strong Performance Correlation! 📊",
        content: `Excellent correlation of ${correlationMetrics.strongestCorrelation} between supplement adherence and performance. Your consistency is directly driving results.`,
        priority: "low",
        actionable: false,
        relatedMetrics: ["Adherence", "Performance Score"],
      });
    } else if (correlationMetrics.strongestCorrelation < 0.4) {
      insights.push({
        type: "warning",
        title: "Weak Performance Link",
        content: `Low correlation of ${correlationMetrics.strongestCorrelation} suggests other factors may be limiting performance. Consider training intensity, sleep, or stress management.`,
        priority: "high",
        actionable: true,
        relatedMetrics: ["Training Load", "Recovery", "Sleep Quality"],
      });
    }

    // Performance trend insights
    const recentPerformance = chartData.slice(-4);
    const earlierPerformance = chartData.slice(0, 4);
    const recentAvg =
      recentPerformance.reduce((sum, d) => sum + d.competitionPerformance, 0) /
      recentPerformance.length;
    const earlierAvg =
      earlierPerformance.reduce((sum, d) => sum + d.competitionPerformance, 0) /
      earlierPerformance.length;

    if (recentAvg > earlierAvg + 5) {
      insights.push({
        type: "optimization",
        title: "Performance Trending Up! 📈",
        content: `Recent performance improved by ${Math.round(
          recentAvg - earlierAvg
        )}% compared to earlier weeks. Your supplement strategy is working.`,
        priority: "medium",
        actionable: false,
      });
    }

    // Specific supplement insights
    const avgCreatine =
      chartData.reduce((sum, d) => sum + d.creatineIntake, 0) /
      chartData.length;
    const avgProtein =
      chartData.reduce((sum, d) => sum + d.proteinIntake, 0) / chartData.length;

    if (avgCreatine < 4 && correlationMetrics.powerCorrelation > 0.6) {
      insights.push({
        type: "recommendation",
        title: "Creatine Optimization Opportunity",
        content: `Strong power correlation suggests increasing creatine from ${
          Math.round(avgCreatine * 10) / 10
        }g to 5g daily could boost performance further.`,
        priority: "medium",
        actionable: true,
        relatedMetrics: ["Creatine Intake", "Power Output"],
      });
    }

    if (avgProtein < 170 && correlationMetrics.recoveryCorrelation > 0.6) {
      insights.push({
        type: "recommendation",
        title: "Protein Intake Enhancement",
        content: `Strong recovery correlation indicates increasing protein from ${Math.round(
          avgProtein
        )}g to 180-200g could improve recovery metrics.`,
        priority: "medium",
        actionable: true,
        relatedMetrics: ["Protein Intake", "Recovery Score"],
      });
    }

    // Peak performance insights
    const bestWeek = chartData.reduce((prev, current) =>
      current.competitionPerformance > prev.competitionPerformance
        ? current
        : prev
    );

    insights.push({
      type: "optimization",
      title: "Peak Performance Analysis",
      content: `Best performance in ${bestWeek.date} with ${bestWeek.overallAdherence}% adherence. Replicate this consistency for sustained peak performance.`,
      priority: "low",
      actionable: true,
      relatedMetrics: ["Best Practices", "Consistency"],
    });

    return insights;
  }, [chartData, correlationMetrics]);

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
      payload?: {
        week?: string;
        adherence?: number;
        performance?: number;
        creatine?: number;
        protein?: number;
        value?: number;
      };
    }>;
    label?: string;
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      if (!data) return null;

      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{data.week || label}</p>
          <div className="space-y-1 text-sm">
            {data.adherence && <p>Adherence: {data.adherence}%</p>}
            {(data.performance || data.value) && (
              <p>
                Performance:{" "}
                {Math.round((data.performance || data.value) as number)}
              </p>
            )}
            {data.creatine && <p>Creatine: {data.creatine}g</p>}
            {data.protein && <p>Protein: {data.protein}g</p>}
          </div>
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
                <Activity className="h-5 w-5 text-orange-600" />
                Performance Correlation Analysis
              </CardTitle>
              <CardDescription>
                Track the relationship between supplement intake and athletic
                performance
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge
                variant="outline"
                className="bg-orange-50 text-orange-700 border-orange-200"
              >
                r = {correlationMetrics.strongestCorrelation}
              </Badge>
              <Badge
                variant="outline"
                className={`${
                  correlationMetrics.avgPerformance > 80
                    ? "bg-green-50 text-green-700 border-green-200"
                    : correlationMetrics.avgPerformance > 60
                    ? "bg-yellow-50 text-yellow-700 border-yellow-200"
                    : "bg-red-50 text-red-700 border-red-200"
                }`}
              >
                {correlationMetrics.avgPerformance}% avg performance
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Correlation Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Zap className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">
                  Strength
                </span>
              </div>
              <div className="text-xl font-bold text-blue-600">
                r = {correlationMetrics.strengthCorrelation}
              </div>
              <div className="text-xs text-gray-600">Adherence correlation</div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Activity className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">
                  Endurance
                </span>
              </div>
              <div className="text-xl font-bold text-green-600">
                r = {correlationMetrics.enduranceCorrelation}
              </div>
              <div className="text-xs text-gray-600">Adherence correlation</div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Power</span>
              </div>
              <div className="text-xl font-bold text-purple-600">
                r = {correlationMetrics.powerCorrelation}
              </div>
              <div className="text-xs text-gray-600">Adherence correlation</div>
            </div>

            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">
                  Recovery
                </span>
              </div>
              <div className="text-xl font-bold text-orange-600">
                r = {correlationMetrics.recoveryCorrelation}
              </div>
              <div className="text-xs text-gray-600">Adherence correlation</div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Scatter Plot */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                Adherence vs Performance Scatter
              </h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart
                    data={scatterData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      type="number"
                      dataKey="adherence"
                      fontSize={11}
                      tick={{ fill: "#6b7280" }}
                      domain={[60, 100]}
                      label={{
                        value: "Adherence %",
                        position: "insideBottom",
                        offset: -5,
                      }}
                    />
                    <YAxis
                      type="number"
                      dataKey="performance"
                      fontSize={11}
                      tick={{ fill: "#6b7280" }}
                      domain={[40, 100]}
                      label={{
                        value: "Performance Score",
                        angle: -90,
                        position: "insideLeft",
                      }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Scatter
                      dataKey="performance"
                      fill={CHART_COLORS.primaryBlue}
                      stroke={CHART_COLORS.primaryBlue}
                      strokeWidth={2}
                    />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Performance Trends */}
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <BarChart3 className="h-4 w-4" />
                Weekly Performance Breakdown
              </h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart
                    data={chartData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      dataKey="date"
                      fontSize={10}
                      tick={{ fill: "#6b7280" }}
                      interval={1}
                    />
                    <YAxis
                      fontSize={10}
                      tick={{ fill: "#6b7280" }}
                      domain={[0, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />

                    <Bar
                      dataKey="strengthScore"
                      fill={CHART_COLORS.primaryBlue}
                      opacity={0.7}
                    />
                    <Bar
                      dataKey="enduranceScore"
                      fill={CHART_COLORS.successGreen}
                      opacity={0.7}
                    />
                    <Bar
                      dataKey="powerOutput"
                      fill={CHART_COLORS.dangerRed}
                      opacity={0.7}
                    />
                    <Bar
                      dataKey="recoveryScore"
                      fill={CHART_COLORS.warningOrange}
                      opacity={0.7}
                    />

                    <Line
                      type="monotone"
                      dataKey="overallAdherence"
                      stroke={CHART_COLORS.purpleAccent}
                      strokeWidth={3}
                      dot={{
                        fill: CHART_COLORS.purpleAccent,
                        strokeWidth: 2,
                        r: 4,
                      }}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Competition Performance Timeline */}
          <div className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Target className="h-4 w-4 text-orange-600" />
              Competition Performance Timeline
            </h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis
                    dataKey="date"
                    fontSize={10}
                    tick={{ fill: "#6b7280" }}
                  />
                  <YAxis
                    fontSize={10}
                    tick={{ fill: "#6b7280" }}
                    domain={[50, 100]}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `${value}%`,
                      "Competition Performance",
                    ]}
                    labelFormatter={(label) => `Period: ${label}`}
                  />
                  <Line
                    type="monotone"
                    dataKey="competitionPerformance"
                    stroke={CHART_COLORS.dangerRed}
                    strokeWidth={3}
                    dot={{ fill: CHART_COLORS.dangerRed, strokeWidth: 2, r: 5 }}
                    activeDot={{
                      r: 7,
                      stroke: CHART_COLORS.dangerRed,
                      strokeWidth: 2,
                    }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Correlation Summary */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">
                  Strongest Link
                </span>
              </div>
              <div className="text-lg font-bold text-blue-600">
                {correlationMetrics.powerCorrelation ===
                correlationMetrics.strongestCorrelation
                  ? "Power Output"
                  : correlationMetrics.enduranceCorrelation ===
                    correlationMetrics.strongestCorrelation
                  ? "Endurance"
                  : correlationMetrics.strengthCorrelation ===
                    correlationMetrics.strongestCorrelation
                  ? "Strength"
                  : "Recovery"}
              </div>
              <div className="text-xs text-blue-700">
                r = {correlationMetrics.strongestCorrelation}
              </div>
            </div>

            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">
                  Performance Trend
                </span>
              </div>
              <div className="text-lg font-bold text-green-600">
                {correlationMetrics.avgPerformance > 80
                  ? "Excellent"
                  : correlationMetrics.avgPerformance > 65
                  ? "Good"
                  : "Improving"}
              </div>
              <div className="text-xs text-green-700">
                {correlationMetrics.avgPerformance}% average
              </div>
            </div>

            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-900">
                  Optimization Score
                </span>
              </div>
              <div className="text-lg font-bold text-purple-600">
                {correlationMetrics.strongestCorrelation > 0.7
                  ? "Optimized"
                  : correlationMetrics.strongestCorrelation > 0.5
                  ? "Good"
                  : "Needs Work"}
              </div>
              <div className="text-xs text-purple-700">
                Based on correlations
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightPanel
        insights={aiInsights}
        title="Performance Correlation Insights"
      />
    </div>
  );
};
