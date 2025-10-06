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
    <div className="min-h-screen bg-white text-gray-900">
      <div className="container mx-auto px-2 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-4">
                <Pill className="h-10 w-10 text-gray-700" />
                مکمل‌های ورزشی
              </h1>
              <p className="text-gray-600 mt-3 text-lg">
                ردیابی و تحلیل مکمل‌ها
              </p>
            </div>
            <div className="flex gap-3">
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300 px-3 py-1"
              >
                <TrendingUp className="h-4 w-4 mr-2" />
                {overallMetrics.adherenceRate}% پایبندی
              </Badge>
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300 px-3 py-1"
              >
                <Activity className="h-4 w-4 mr-2" />
                آماده
              </Badge>
            </div>
          </div>

          {/* Quick Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-gray-300 bg-gray-50 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 p-3 rounded-md">
                    <Pill className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {overallMetrics.totalSupplements}
                    </div>
                    <div className="text-sm text-gray-600">مکمل فعال</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-300 bg-gray-50 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 p-3 rounded-md">
                    <Target className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {overallMetrics.adherenceRate}%
                    </div>
                    <div className="text-sm text-gray-600">پایبندی</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-300 bg-gray-50 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 p-3 rounded-md">
                    <Activity className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {overallMetrics.performanceCorrelation}
                    </div>
                    <div className="text-sm text-gray-600">عملکرد</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-gray-300 bg-gray-50 rounded-lg">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="bg-gray-200 p-3 rounded-md">
                    <TrendingUp className="h-6 w-6 text-gray-700" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold text-gray-900">
                      {overallMetrics.monthlyProgress}
                    </div>
                    <div className="text-sm text-gray-600">پیشرفت</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Core Supplement Tracking */}
        <div className="space-y-12">
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Zap className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-semibold text-gray-900">
                مکمل‌های اصلی
              </h2>
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300"
              >
                ضروری
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-2">
                <CreatineIntakeChart className="w-full" />
              </div>
              <div className="space-y-2">
                <ProteinIntakeChart className="w-full" />
              </div>
            </div>
          </section>

          {/* Adherence & Performance Analysis */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Award className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-semibold text-gray-900">
                تحلیل عملکرد
              </h2>
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300"
              >
                پیشرفته
              </Badge>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-2">
                <SupplementAdherenceChart className="w-full" />
              </div>
              <div className="space-y-2">
                <PerformanceCorrelationChart className="w-full" />
              </div>
            </div>
          </section>

          {/* Hydration & Timing Optimization */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Target className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-semibold text-gray-900">
                هیدراتاسیون و زمان‌بندی
              </h2>
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300"
              >
                بازیابی
              </Badge>
            </div>
            <div className="space-y-2">
              <HydrationTimingChart className="w-full" />
            </div>
          </section>

          {/* Supplement Stack Overview */}
          <section>
            <div className="flex items-center gap-3 mb-8">
              <Calendar className="h-6 w-6 text-gray-700" />
              <h2 className="text-2xl font-semibold text-gray-900">
                پشته مکمل‌ها
              </h2>
              <Badge
                variant="outline"
                className="bg-gray-100 text-gray-700 border-gray-300"
              >
                کامل
              </Badge>
            </div>
            <div className="space-y-2">
              <SupplementStackOverview className="w-full" />
            </div>
          </section>
        </div>

        {/* Footer Insights */}
        <div className="mt-16 bg-gray-100 border border-gray-300 p-8 rounded-lg">
          <div className="text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center justify-center gap-3">
              <Activity className="h-6 w-6 text-gray-700" />
              عملکرد حرفه‌ای
            </h3>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
              رژیم مکمل شما برای کشتی طراحی شده است. تحلیل‌ها هر جنبه از مصرف و
              زمان‌بندی را ردیابی می‌کنند.
            </p>
            <div className="flex items-center justify-center gap-8 mt-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-gray-600" />
                <span>علمی</span>
              </div>
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-600" />
                <span>ردیابی شده</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-gray-600" />
                <span>بهینه</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
