"use client";

import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, LineChart, Line } from 'recharts';
import { Beef, TrendingUp, Target, Calendar, Clock } from "lucide-react";
import { AIInsightPanel } from './AIInsightPanel';
import { ChartDataPoint, AIInsight } from '../types';
import { generateSampleData, generateAIInsights, CHART_COLORS, calculateAdherence } from '../utils';

interface ProteinDataPoint extends ChartDataPoint {
  breakfast?: number;
  lunch?: number;
  dinner?: number;
  snacks?: number;
}

interface ProteinIntakeChartProps {
  data?: ProteinDataPoint[];
  target?: number;
  bodyWeight?: number;
  className?: string;
}

export const ProteinIntakeChart: React.FC<ProteinIntakeChartProps> = ({
  data,
  target = 180,
  bodyWeight = 180, // Default 180lbs wrestler
  className = "",
}) => {
  // Generate sample data if not provided - protein data with more variance
  const chartData: ProteinDataPoint[] = useMemo(() => {
    if (data) return data;
    return generateSampleData(30, target, 0.15).map(point => ({
      ...point,
      // Add meal distribution data
      breakfast: Math.round((point.value * 0.25) + (Math.random() - 0.5) * 10),
      lunch: Math.round((point.value * 0.30) + (Math.random() - 0.5) * 10),
      dinner: Math.round((point.value * 0.35) + (Math.random() - 0.5) * 10),
      snacks: Math.round((point.value * 0.10) + (Math.random() - 0.5) * 5),
    }));
  }, [data, target]);

  // Calculate advanced metrics
  const metrics = useMemo(() => {
    const recent7Days = chartData.slice(-7);
    const recent30Days = chartData.slice(-30);
    
    const avgDaily = recent30Days.reduce((sum, d) => sum + d.value, 0) / recent30Days.length;
    const avgWeekly = recent7Days.reduce((sum, d) => sum + d.value, 0) / recent7Days.length;
    const adherenceRate = calculateAdherence(recent30Days.map(d => d.value), target);
    const trend = avgWeekly > avgDaily ? 'up' : avgWeekly < avgDaily ? 'down' : 'stable';
    
    // Calculate protein per kg body weight (assuming bodyWeight is in lbs)
    const proteinPerKg = avgDaily / (bodyWeight * 0.453592); // Convert lbs to kg
    
    // Calculate consistency (days within 10% of target)
    const consistency = recent30Days.filter(d => Math.abs(d.value - target) <= target * 0.1).length;
    
    // Calculate distribution quality (how well spread across meals)
    const avgBreakfast = recent7Days.reduce((sum, d) => sum + (d.breakfast || 0), 0) / recent7Days.length;
    const avgLunch = recent7Days.reduce((sum, d) => sum + (d.lunch || 0), 0) / recent7Days.length;
    const avgDinner = recent7Days.reduce((sum, d) => sum + (d.dinner || 0), 0) / recent7Days.length;
    
    return {
      avgDaily: Math.round(avgDaily * 10) / 10,
      avgWeekly: Math.round(avgWeekly * 10) / 10,
      adherenceRate,
      trend,
      consistency,
      proteinPerKg: Math.round(proteinPerKg * 100) / 100,
      totalIntake: recent30Days.reduce((sum, d) => sum + d.value, 0),
      mealDistribution: {
        breakfast: Math.round(avgBreakfast),
        lunch: Math.round(avgLunch),
        dinner: Math.round(avgDinner),
      }
    };
  }, [chartData, target, bodyWeight]);

  // Generate AI insights with protein-specific recommendations
  const aiInsights: AIInsight[] = useMemo(() => {
    const baseInsights = generateAIInsights(chartData, target, 'Protein');
    
    const specificInsights: AIInsight[] = [];
    
    // Protein per kg body weight insights
    if (metrics.proteinPerKg < 1.6) {
      specificInsights.push({
        type: 'warning',
        title: 'Sub-Optimal Protein Intake',
        content: `At ${metrics.proteinPerKg}g/kg body weight, you're below the recommended 1.6-2.2g/kg for athletes. Consider increasing intake for optimal muscle protein synthesis.`,
        priority: 'high',
        actionable: true,
        relatedMetrics: ['Protein per kg', 'Muscle Recovery'],
      });
    } else if (metrics.proteinPerKg > 2.2) {
      specificInsights.push({
        type: 'optimization',
        title: 'High Protein Intake',
        content: `Your intake of ${metrics.proteinPerKg}g/kg is above typical athletic recommendations. Monitor kidney health and consider redistribution if experiencing digestive issues.`,
        priority: 'medium',
        actionable: true,
      });
    }
    
    // Meal distribution insights
    if (metrics.mealDistribution.breakfast < 25) {
      specificInsights.push({
        type: 'recommendation',
        title: 'Breakfast Protein Boost',
        content: `Your breakfast averages only ${metrics.mealDistribution.breakfast}g protein. Aim for 25-30g to kickstart muscle protein synthesis after overnight fasting.`,
        priority: 'medium',
        actionable: true,
        relatedMetrics: ['Meal Timing', 'Recovery'],
      });
    }
    
    // Post-workout timing
    if (metrics.avgWeekly >= target && metrics.consistency > 20) {
      specificInsights.push({
        type: 'achievement',
        title: 'Protein Timing Mastery! 🥇',
        content: `Excellent consistency at ${metrics.avgDaily}g daily. Your protein intake supports optimal recovery and strength gains for wrestling performance.`,
        priority: 'low',
        actionable: false,
      });
    }
    
    return [...baseInsights, ...specificInsights];
  }, [chartData, target, metrics]);

  // Format data for the chart
  const formattedData = chartData.map(point => ({
    ...point,
    intake: point.value,
    target: target,
    minimum: bodyWeight * 0.453592 * 1.6, // 1.6g/kg minimum
    optimal: bodyWeight * 0.453592 * 2.0,  // 2.0g/kg optimal
  }));

  const CustomTooltip = ({ active, payload, label }: { 
    active?: boolean; 
    payload?: Array<{ payload: { intake: number; target: number; breakfast: number; lunch: number; dinner: number } }>; 
    label?: string 
  }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-2">{label}</p>
          <p className="text-red-600 font-medium mb-2">
            Total Protein: {data.intake}g
          </p>
          <div className="space-y-1 text-xs">
            <p>🌅 Breakfast: {data.breakfast}g</p>
            <p>🌞 Lunch: {data.lunch}g</p>
            <p>🌆 Dinner: {data.dinner}g</p>
          </div>
          <p className="text-gray-600 text-xs mt-2">Target: {target}g</p>
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
                <Beef className="h-5 w-5 text-red-600" />
                Protein Intake Analysis
              </CardTitle>
              <CardDescription>
                Daily protein tracking for muscle recovery and performance
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Badge variant="outline" className={`${metrics.trend === 'up' ? 'bg-green-50 text-green-700 border-green-200' : metrics.trend === 'down' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-gray-50 text-gray-700 border-gray-200'}`}>
                {metrics.trend === 'up' ? '↗' : metrics.trend === 'down' ? '↘' : '→'} {metrics.trend}
              </Badge>
              <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200">
                {metrics.proteinPerKg}g/kg
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Metrics Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-red-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Calendar className="h-4 w-4 text-red-600" />
                <span className="text-sm font-medium text-gray-700">Daily Avg</span>
              </div>
              <div className="text-xl font-bold text-red-600">{metrics.avgDaily}g</div>
              <div className="text-xs text-gray-600">{metrics.proteinPerKg}g/kg body weight</div>
            </div>
            
            <div className="bg-green-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-gray-700">Weekly Avg</span>
              </div>
              <div className="text-xl font-bold text-green-600">{metrics.avgWeekly}g</div>
              <div className="text-xs text-gray-600">Last 7 days</div>
            </div>
            
            <div className="bg-blue-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-gray-700">Adherence</span>
              </div>
              <div className="text-xl font-bold text-blue-600">{metrics.adherenceRate}%</div>
              <div className="text-xs text-gray-600">{metrics.consistency}/30 days</div>
            </div>
            
            <div className="bg-purple-50 p-3 rounded-lg">
              <div className="flex items-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-purple-600" />
                <span className="text-sm font-medium text-gray-700">Breakfast</span>
              </div>
              <div className="text-xl font-bold text-purple-600">{metrics.mealDistribution.breakfast}g</div>
              <div className="text-xs text-gray-600">Morning protein</div>
            </div>
          </div>

          {/* Main Chart */}
          <div className="h-80 mb-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={formattedData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="date" 
                  fontSize={11}
                  tick={{ fill: '#6b7280' }}
                  interval="preserveStartEnd"
                />
                <YAxis 
                  fontSize={11}
                  tick={{ fill: '#6b7280' }}
                  domain={['dataMin - 20', 'dataMax + 20']}
                />
                <Tooltip content={<CustomTooltip />} />
                
                {/* Reference lines */}
                <ReferenceLine 
                  y={target} 
                  stroke={CHART_COLORS.dangerRed} 
                  strokeDasharray="5 5"
                  label={{ value: `Target: ${target}g`, position: "insideTopRight" }}
                />
                
                <ReferenceLine 
                  y={bodyWeight * 0.453592 * 1.6} 
                  stroke={CHART_COLORS.warningOrange} 
                  strokeDasharray="2 2"
                  strokeOpacity={0.5}
                  label={{ value: "Minimum", position: "insideTopLeft" }}
                />
                
                {/* Area chart for protein intake */}
                <Area 
                  type="monotone" 
                  dataKey="intake" 
                  stroke={CHART_COLORS.dangerRed}
                  strokeWidth={2}
                  fill={`${CHART_COLORS.dangerRed}20`}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Meal Distribution Chart */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Weekly Protein Distribution by Meal
            </h4>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData.slice(-7)} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
                  <XAxis 
                    dataKey="date" 
                    fontSize={10}
                    tick={{ fill: '#6b7280' }}
                  />
                  <YAxis 
                    fontSize={10}
                    tick={{ fill: '#6b7280' }}
                  />
                  <Tooltip />
                  <Line type="monotone" dataKey="breakfast" stroke="#f59e0b" name="Breakfast" strokeWidth={2} />
                  <Line type="monotone" dataKey="lunch" stroke="#10b981" name="Lunch" strokeWidth={2} />
                  <Line type="monotone" dataKey="dinner" stroke="#3b82f6" name="Dinner" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* AI Insights */}
      <AIInsightPanel 
        insights={aiInsights}
        title="Protein Optimization Insights"
      />
    </div>
  );
};