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
      <div className="flex items-start justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Lifting & Performance Analytics
          </h1>
          <p className="text-gray-600 mt-2">
            Strength, conditioning, and training load metrics with actionable trends.
          </p>
        </div>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Current Cycle: Week 4
          </Badge>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Peak Performance
          </Badge>
        </div>
      </div>

      {/* Performance Overview Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Performance Overview
        </h2>
        <PerformanceScore />
      </div>

      {/* Strength Training Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Strength Training Metrics
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
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Cardiovascular Performance
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VO2MaxChart />
          <HeartRateZonesChart />
          <EnduranceTestsChart />
          <WrestlingEnduranceChart />
        </div>
      </div>

      {/* Advanced Analytics Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Training Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <VolumeLoadChart />
          <RPEDistributionChart />
          <IntensityDistributionChart />
          <TrainingLoadReadinessChart />
        </div>
      </div>

      {/* Bodybuilding Metrics Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Bodybuilding & Development Metrics
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
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Bench PR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">330 lbs</div>
            <p className="text-xs text-gray-500">+15 lbs this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Squat PR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">460 lbs</div>
            <p className="text-xs text-gray-500">+20 lbs this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Deadlift PR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">520 lbs</div>
            <p className="text-xs text-gray-500">+15 lbs this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">VO2 Max</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">53.7</div>
            <p className="text-xs text-gray-500">mL/kg/min</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Body Fat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">13.5%</div>
            <p className="text-xs text-gray-500">Competition ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">87/100</div>
            <p className="text-xs text-gray-500">Overall score</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
