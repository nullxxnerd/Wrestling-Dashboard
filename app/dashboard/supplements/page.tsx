"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Pill,
  TrendingUp,
  Target,
  Activity,
  Calendar,
  Award,
  Zap,
} from "lucide-react";
import {
  CreatineIntakeChart,
  ProteinIntakeChart,
  SupplementAdherenceChart,
  HydrationTimingChart,
  SupplementStackOverview,
  PerformanceCorrelationChart,
} from "./components";

export default function SupplementsPage() {
  // Calculate overall metrics for the header
  const overallMetrics = {
    adherenceRate: 92,
    monthlyProgress: "+8%",
    performanceCorrelation: 0.85,
    totalSupplements: 8,
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Pill className="h-8 w-8 text-purple-600" />
              Professional Athletic Supplements
            </h1>
            <p className="text-gray-600 mt-2">
              Comprehensive supplement tracking and optimization for elite
              wrestling performance
            </p>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              {overallMetrics.adherenceRate}% Adherence
            </Badge>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              <Activity className="h-3 w-3 mr-1" />
              Competition Ready
            </Badge>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-purple-50 to-indigo-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-purple-100 p-2 rounded-lg">
                  <Pill className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-purple-700">
                    {overallMetrics.totalSupplements}
                  </div>
                  <div className="text-sm text-purple-600">
                    Active Supplements
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-green-50 to-emerald-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-green-100 p-2 rounded-lg">
                  <Target className="h-5 w-5 text-green-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-green-700">
                    {overallMetrics.adherenceRate}%
                  </div>
                  <div className="text-sm text-green-600">Weekly Adherence</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-50 to-cyan-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-blue-100 p-2 rounded-lg">
                  <Activity className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-blue-700">
                    {overallMetrics.performanceCorrelation}
                  </div>
                  <div className="text-sm text-blue-600">Performance Link</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="bg-orange-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-orange-700">
                    {overallMetrics.monthlyProgress}
                  </div>
                  <div className="text-sm text-orange-600">
                    Monthly Progress
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Core Supplement Tracking */}
      <div className="space-y-8">
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-5 w-5 text-blue-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Core Supplement Tracking
            </h2>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              Essential Performance
            </Badge>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <CreatineIntakeChart className="w-full" />
            <ProteinIntakeChart className="w-full" />
          </div>
        </section>

        {/* Adherence & Performance Analysis */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Award className="h-5 w-5 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Performance & Adherence Analysis
            </h2>
            <Badge
              variant="outline"
              className="bg-purple-50 text-purple-700 border-purple-200"
            >
              Advanced Analytics
            </Badge>
          </div>
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            <SupplementAdherenceChart className="w-full" />
            <PerformanceCorrelationChart className="w-full" />
          </div>
        </section>

        {/* Hydration & Timing Optimization */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Target className="h-5 w-5 text-cyan-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Hydration & Timing Optimization
            </h2>
            <Badge
              variant="outline"
              className="bg-cyan-50 text-cyan-700 border-cyan-200"
            >
              Recovery Focus
            </Badge>
          </div>
          <HydrationTimingChart className="w-full" />
        </section>

        {/* Supplement Stack Overview */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-green-600" />
            <h2 className="text-xl font-semibold text-gray-900">
              Complete Supplement Stack
            </h2>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200"
            >
              Cost Optimized
            </Badge>
          </div>
          <SupplementStackOverview className="w-full" />
        </section>
      </div>

      {/* Footer Insights */}
      <div className="mt-12 bg-gradient-to-r from-purple-50 via-blue-50 to-cyan-50 p-6 rounded-xl border border-purple-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Activity className="h-5 w-5 text-purple-600" />
            Professional Athletic Excellence
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Your supplement regimen is designed for peak wrestling performance.
            The advanced analytics above track every aspect of your intake,
            timing, and correlation with performance metrics. Use the AI
            insights to continuously optimize your stack for competitive
            advantage.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-green-600" />
              <span>Evidence-Based</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="h-4 w-4 text-blue-600" />
              <span>Performance Tracked</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-purple-600" />
              <span>AI Optimized</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
