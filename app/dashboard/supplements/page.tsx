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
              <Pill className="h-8 w-8 text-gray-700" />
              مکمل‌های ورزشی حرفه‌ای
            </h1>
            <p className="text-gray-600 mt-2">
              ردیابی و بهینه‌سازی جامع مکمل‌ها برای عملکرد کشتی حرفه‌ای
            </p>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-700 border-gray-200"
            >
              <TrendingUp className="h-3 w-3 mr-1" />
              {overallMetrics.adherenceRate}% پایبندی
            </Badge>
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-700 border-gray-200"
            >
              <Activity className="h-3 w-3 mr-1" />
              آماده رقابت
            </Badge>
          </div>
        </div>

        {/* Quick Stats Overview */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-gray-200 shadow-sm rounded-md">
            <CardContent className="p-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Pill className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {overallMetrics.totalSupplements}
                  </div>
                  <div className="text-sm text-gray-600">مکمل‌های فعال</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm rounded-md">
            <CardContent className="p-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Target className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {overallMetrics.adherenceRate}%
                  </div>
                  <div className="text-sm text-gray-600">پایبندی هفتگی</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm rounded-md">
            <CardContent className="p-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <Activity className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {overallMetrics.performanceCorrelation}
                  </div>
                  <div className="text-sm text-gray-600">ارتباط عملکرد</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm rounded-md">
            <CardContent className="p-4 bg-white">
              <div className="flex items-center gap-3">
                <div className="bg-gray-100 p-2 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-gray-700" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {overallMetrics.monthlyProgress}
                  </div>
                  <div className="text-sm text-gray-600">پیشرفت ماهانه</div>
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
            <Zap className="h-5 w-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">
              ردیابی مکمل‌های اصلی
            </h2>
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-700 border-gray-200"
            >
              عملکرد ضروری
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
            <Award className="h-5 w-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">
              تحلیل عملکرد و پایبندی
            </h2>
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-700 border-gray-200"
            >
              تحلیل پیشرفته
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
            <Target className="h-5 w-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">
              بهینه‌سازی هیدراتاسیون و زمان‌بندی
            </h2>
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-700 border-gray-200"
            >
              تمرکز بازیابی
            </Badge>
          </div>
          <HydrationTimingChart className="w-full" />
        </section>

        {/* Supplement Stack Overview */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Calendar className="h-5 w-5 text-gray-700" />
            <h2 className="text-xl font-semibold text-gray-900">
              پشته کامل مکمل‌ها
            </h2>
            <Badge
              variant="outline"
              className="bg-gray-50 text-gray-700 border-gray-200"
            >
              بهینه‌سازی هزینه
            </Badge>
          </div>
          <SupplementStackOverview className="w-full" />
        </section>
      </div>

      {/* Footer Insights */}
      <div className="mt-12 bg-gray-50 p-6 rounded-xl border border-gray-200">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 flex items-center justify-center gap-2">
            <Activity className="h-5 w-5 text-gray-700" />
            برتری ورزشی حرفه‌ای
          </h3>
          <p className="text-gray-700 max-w-3xl mx-auto">
            رژیم مکمل شما برای عملکرد کشتی اوج طراحی شده است. تحلیل پیشرفته بالا
            هر جنبه‌ای از مصرف، زمان‌بندی و ارتباط با معیارهای عملکرد شما را
            ردیابی می‌کند. از بینش‌های هوش مصنوعی برای بهینه‌سازی مداوم پشته خود
            برای مزیت رقابتی استفاده کنید.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Target className="h-4 w-4 text-gray-700" />
              <span>بر پایه شواهد</span>
            </div>
            <div className="flex items-center gap-1">
              <Activity className="h-4 w-4 text-gray-700" />
              <span>عملکرد ردیابی‌شده</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-4 w-4 text-gray-700" />
              <span>بهینه‌سازی هوش مصنوعی</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
