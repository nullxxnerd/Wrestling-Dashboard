"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Import all modular components
import {
  // Strength Components
  BenchPressChart,
  SquatChart,
  DeadliftChart,
  AccessoryLiftsChart,
  StrengthRatiosChart,

  // Cardiovascular Components
  VO2MaxChart,
  HeartRateZonesChart,
  EnduranceTestsChart,
  WrestlingEnduranceChart,

  // Analytics Components
  VolumeLoadChart,
  RPEDistributionChart,
  TrainingLoadReadinessChart,
  IntensityDistributionChart,

  // Bodybuilding Components
  MuscleSymmetryChart,
  MuscleActivationChart,
  ProgressiveOverloadChart,
  TrainingFrequencyChart,

  // Performance Score
  PerformanceScore,
} from "./components";

export default function LiftingPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div
        id="overview-header"
        className="flex items-start justify-between mb-8"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            آمار وزنه‌برداری و عملکرد
          </h1>
          <p className="text-gray-600 mt-2">
            متریک‌های قدرت، آمادگی جسمانی و بار تمرینی با روندهای عملی.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 rounded-md"
          >
            دوره فعلی: هفته ۴
          </Badge>
          <Badge
            variant="outline"
            className="bg-gray-50 text-gray-700 border-gray-200 rounded-md"
          >
            عملکرد اوج
          </Badge>
        </div>
      </div>

      {/* Performance Overview Section */}
      <div id="overview-performance" className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          نمای کلی عملکرد
        </h2>
        <PerformanceScore />
      </div>

      {/* Strength Training Section */}
      <div id="strength" className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          متریک‌های تمرین قدرتی
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BenchPressChart />
          <SquatChart />
          <DeadliftChart />
          <AccessoryLiftsChart />
          <StrengthRatiosChart />
        </div>
      </div>

      {/* Cardiovascular Section */}
      <div id="cardio" className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          عملکرد قلبی عروقی
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VO2MaxChart />
          <HeartRateZonesChart />
          <EnduranceTestsChart />
          <WrestlingEnduranceChart />
        </div>
      </div>

      {/* Advanced Analytics Section */}
      <div id="analytics" className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          آمار تمرینی
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VolumeLoadChart />
          <RPEDistributionChart />
          <IntensityDistributionChart />
          <TrainingLoadReadinessChart />
        </div>
      </div>

      {/* Bodybuilding Metrics Section */}
      <div id="bodybuilding" className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          متریک‌های بدنسازی و توسعه
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MuscleSymmetryChart />
          <MuscleActivationChart />
          <ProgressiveOverloadChart />
          <TrainingFrequencyChart />
        </div>
      </div>

      {/* Performance Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="rounded-md border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">
              رکورد پرس سینه
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">۳۳۰ پوند</div>
            <p className="text-xs text-gray-500">+۱۵ پوند این ماه</p>
          </CardContent>
        </Card>

        <Card className="rounded-md border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">رکورد اسکوات</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">۴۶۰ پوند</div>
            <p className="text-xs text-gray-500">+۲۰ پوند این ماه</p>
          </CardContent>
        </Card>

        <Card className="rounded-md border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">رکورد ددلیفت</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">۵۲۰ پوند</div>
            <p className="text-xs text-gray-500">+۱۵ پوند این ماه</p>
          </CardContent>
        </Card>

        <Card className="rounded-md border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">حداکثر VO2</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">۵۳.۷</div>
            <p className="text-xs text-gray-500">میلی‌لیتر/کیلوگرم/دقیقه</p>
          </CardContent>
        </Card>

        <Card className="rounded-md border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">چربی بدن</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">۱۳.۵%</div>
            <p className="text-xs text-gray-500">آماده رقابت</p>
          </CardContent>
        </Card>

        <Card className="rounded-md border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">عملکرد</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-700">۸۷/۱۰۰</div>
            <p className="text-xs text-gray-500">امتیاز کلی</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
