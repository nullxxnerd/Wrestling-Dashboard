"use client";

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactECharts from "echarts-for-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Droplets, Clock, Target, Timer, TrendingUp } from "lucide-react";
import { AIInsightPanel } from './AIInsightPanel';
import { AIInsight } from '../types';
import { CHART_COLORS } from '../utils';

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
    const avgWaterIntake = chartData.reduce((sum, d) => sum + d.waterIntake, 0) / chartData.length;
    const avgSupplementTiming = chartData.reduce((sum, d) => sum + d.supplementTiming, 0) / chartData.length;
    const avgMealSpacing = chartData.reduce((sum, d) => sum + d.mealSpacing, 0) / chartData.length;
    const avgSleepQuality = chartData.reduce((sum, d) => sum + d.sleepQuality, 0) / chartData.length;
    
    const hydrationConsistency = chartData.filter(d => d.waterIntake >= 3.0).length;
    const timingConsistency = chartData.filter(d => d.supplementTiming >= 20 && d.supplementTiming <= 45).length;
    
    return {
      avgWaterIntake: Math.round(avgWaterIntake * 10) / 10,
      avgSupplementTiming: Math.round(avgSupplementTiming),
      avgMealSpacing: Math.round(avgMealSpacing * 10) / 10,
      avgSleepQuality: Math.round(avgSleepQuality * 10) / 10,
      hydrationConsistency,
      timingConsistency,
      overallScore: Math.round(((avgWaterIntake / 4) + (avgSleepQuality / 10) + (timingConsistency / 7) * 100) / 3),
    };
  }, [chartData]);

  // Radar chart data
  const radarData = useMemo(() => ({
    title: {
      text: "Hydration & Timing Optimization",
      textStyle: { fontSize: 16, fontWeight: "normal" },
    },
    tooltip: { trigger: "item" },
    radar: {
      indicator: [
        { name: "Water Intake", max: 5 },
        { name: "Pre-workout Hydration", max: 10 },
        { name: "During Workout", max: 10 },
        { name: "Post-workout Recovery", max: 10 },
        { name: "Supplement Timing", max: 60 },
        { name: "Sleep Quality", max: 10 },
      ],
      radius: "70%",
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: [
              metrics.avgWaterIntake,
              chartData.reduce((sum, d) => sum + d.preWorkoutHydration, 0) / chartData.length,
              chartData.reduce((sum, d) => sum + d.duringWorkoutHydration, 0) / chartData.length,
              chartData.reduce((sum, d) => sum + d.postWorkoutHydration, 0) / chartData.length,
              metrics.avgSupplementTiming,
              metrics.avgSleepQuality,
            ],
            name: "Current Week",
            itemStyle: { color: CHART_COLORS.primaryBlue },
            areaStyle: { color: `${CHART_COLORS.primaryBlue}30` },
          },
          {
            value: [4.0, 8.5, 8.0, 9.0, 30, 8.0], // Optimal targets
            name: "Optimal Targets",
            itemStyle: { color: CHART_COLORS.successGreen },
            areaStyle: { color: `${CHART_COLORS.successGreen}20` },
            lineStyle: { type: 'dashed' },
          },
        ],
      },
    ],
  }), [chartData, metrics]);

  // Timing distribution data
  const timingDistribution = useMemo(() => [
    { name: 'Pre-workout (20-30 min)', value: chartData.filter(d => d.supplementTiming >= 20 && d.supplementTiming <= 30).length },
    { name: 'Pre-workout (30-45 min)', value: chartData.filter(d => d.supplementTiming > 30 && d.supplementTiming <= 45).length },
    { name: 'Too Early (>45 min)', value: chartData.filter(d => d.supplementTiming > 45).length },
    { name: 'Too Late (<20 min)', value: chartData.filter(d => d.supplementTiming < 20).length },
  ], [chartData]);

  const TIMING_COLORS = [CHART_COLORS.successGreen, CHART_COLORS.primaryBlue, CHART_COLORS.warningOrange, CHART_COLORS.dangerRed];

  // Generate AI insights
  const aiInsights: AIInsight[] = useMemo(() => {
    const insights: AIInsight[] = [];
    
    // Hydration insights
    if (metrics.avgWaterIntake < 3.0) {
      insights.push({
        type: 'warning',
        title: 'Hydration Deficit Alert',
        content: `Average water intake of ${metrics.avgWaterIntake}L is below the recommended 3-4L for athletes. Dehydration can significantly impact performance and recovery.`,
        priority: 'high',
        actionable: true,
        relatedMetrics: ['Water Intake', 'Performance', 'Recovery'],
      });
    } else if (metrics.avgWaterIntake > 4.5) {
      insights.push({
        type: 'optimization',
        title: 'Excellent Hydration! 💧',
        content: `Outstanding water intake at ${metrics.avgWaterIntake}L daily. Your hydration supports optimal performance and recovery.`,
        priority: 'low',
        actionable: false,
      });
    }
    
    // Timing insights
    if (metrics.timingConsistency < 5) {
      insights.push({
        type: 'recommendation',
        title: 'Supplement Timing Optimization',
        content: `Only ${metrics.timingConsistency}/7 days had optimal supplement timing. Aim for 20-45 minutes pre-workout for maximum absorption and effectiveness.`,
        priority: 'medium',
        actionable: true,
        relatedMetrics: ['Supplement Timing', 'Absorption', 'Performance'],
      });
    }
    
    // Sleep quality insights
    if (metrics.avgSleepQuality < 7) {
      insights.push({
        type: 'warning',
        title: 'Sleep Quality Impact',
        content: `Sleep quality averaging ${metrics.avgSleepQuality}/10 may be limiting recovery. Poor sleep affects supplement absorption and performance gains.`,
        priority: 'high',
        actionable: true,
        relatedMetrics: ['Sleep Quality', 'Recovery', 'Hormone Balance'],
      });
    }
    
    // Meal spacing insights
    if (metrics.avgMealSpacing > 5) {
      insights.push({
        type: 'recommendation',
        title: 'Meal Timing Adjustment',
        content: `Meal spacing of ${metrics.avgMealSpacing} hours may be too long. Consider 3-4 hour intervals for optimal nutrient absorption and energy stability.`,
        priority: 'medium',
        actionable: true,
      });
    }
    
    // Overall performance insights
    if (metrics.overallScore > 85) {
      insights.push({
        type: 'achievement',
        title: 'Timing Mastery Achieved! 🎯',
        content: `Your hydration and timing score of ${metrics.overallScore}% indicates excellent optimization. This foundation supports peak wrestling performance.`,
        priority: 'low',
        actionable: false,
      });
    }
    
    return insights;
  }, [metrics]);

  return (
    <div className={`space-y-4 ${className}`}>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                <Droplets className="h-5 w-5 text-blue-600" />
                Hydration & Timing Optimization
              </CardTitle>
              <CardDescription>
                Track hydration, supplement timing, and recovery factors
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-200">
                {metrics.avgWaterIntake}L daily
              </Badge>
              <Badge variant="outline" className={`${metrics.overallScore > 80 ? 'bg-green-50 text-green-700 border-green-200' : metrics.overallScore > 60 ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                {metrics.overallScore}% optimized
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Droplets className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Water Intake</span>
              </div>
              <div className="text-xl font-bold text-blue-600">{metrics.avgWaterIntake}L</div>
              <div className="text-xs text-gray-600">{metrics.hydrationConsistency}/7 days optimal</div>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Supplement Timing</span>
              </div>
              <div className="text-xl font-bold text-purple-600">{metrics.avgSupplementTiming}min</div>
              <div className="text-xs text-gray-600">Before workout</div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Timer className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Meal Spacing</span>
              </div>
              <div className="text-xl font-bold text-green-600">{metrics.avgMealSpacing}h</div>
              <div className="text-xs text-gray-600">Between meals</div>
            </div>
            
            <div className="bg-orange-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-orange-600" />
                <span className="text-sm font-medium text-gray-700">Sleep Quality</span>
              </div>
              <div className="text-xl font-bold text-orange-600">{metrics.avgSleepQuality}/10</div>
              <div className="text-xs text-gray-600">Recovery factor</div>
            </div>
          </div>

          {/* Radar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Target className="h-4 w-4" />
                Weekly Performance Radar
              </h4>
              <div className="h-80">
                <ReactECharts
                  option={radarData}
                  style={{ height: "100%" }}
                />
              </div>
            </div>
            
            <div>
              <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Supplement Timing Distribution
              </h4>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={timingDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {timingDistribution.map((_, index) => (
                        <Cell key={`cell-${index}`} fill={TIMING_COLORS[index % TIMING_COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Weekly Hydration Trend */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Weekly Hydration Trend
            </h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={10}
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    fontSize={10}
                    tick={{ fill: '#6b7280' }}
                    domain={[0, 5]}
                  />
                  <Tooltip 
                    formatter={(value: number) => [`${value}L`, 'Water Intake']}
                    labelFormatter={(label) => `Day: ${label}`}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="waterIntake" 
                    stroke={CHART_COLORS.primaryBlue}
                    strokeWidth={3}
                    dot={{ fill: CHART_COLORS.primaryBlue, strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Quick Tips */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
              <div className="flex items-center gap-2 mb-2">
                <Droplets className="h-4 w-4 text-blue-600" />
                <span className="font-medium text-blue-900">Hydration Tips</span>
              </div>
              <p className="text-xs text-blue-700">
                Aim for 3-4L daily, with 500ml 2 hours before training and 150-250ml every 15-20 minutes during exercise.
              </p>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg border border-purple-200">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="font-medium text-purple-900">Timing Tips</span>
              </div>
              <p className="text-xs text-purple-700">
                Take creatine 30 minutes pre-workout for optimal absorption. Post-workout protein within 30 minutes maximizes recovery.
              </p>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg border border-green-200">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-green-600" />
                <span className="font-medium text-green-900">Recovery Tips</span>
              </div>
              <p className="text-xs text-green-700">
                Maintain 7-9 hours sleep, space meals 3-4 hours apart, and stay hydrated for optimal nutrient absorption.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightPanel 
        insights={aiInsights}
        title="Hydration & Timing Insights"
      />
    </div>
  );
};