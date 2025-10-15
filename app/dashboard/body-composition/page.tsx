"use client";

import React, { useState } from "react";
import { Scale } from "lucide-react";
import { InBodyAnalysis } from "./components/InBodyAnalysis";
import { MuscleMassAnalysis } from "./components/MuscleMassAnalysis";
import { AdvancedCharts } from "./components/AdvancedCharts";
import { GoalsTargets } from "./components/GoalsTargets";
import { InteractiveBodyDiagram } from "./components/InteractiveBodyDiagram";
import { sampleBodyCompositionData } from "./sampleData";
import { BodyCompositionData, GoalsAndTargets } from "./types";
import ReactECharts from "echarts-for-react";

export default function BodyCompositionPage() {
  const [bodyCompData, setBodyCompData] = useState<BodyCompositionData>(
    sampleBodyCompositionData
  );

  const handleUpdateGoals = (newGoals: GoalsAndTargets) => {
    setBodyCompData((prev) => ({
      ...prev,
      goals: newGoals,
    }));
  };

  // Get the latest data for each component
  const latestInBody = bodyCompData.inbody[bodyCompData.inbody.length - 1];
  const latestSegmental =
    bodyCompData.segmental[bodyCompData.segmental.length - 1];
  const latestAdvanced =
    bodyCompData.advanced[bodyCompData.advanced.length - 1];

  // Power-to-Weight ratio chart (top preview)
  const powerToWeightOption = {
    title: {
      text: "نسبت قدرت به وزن",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: { trigger: "axis", formatter: "{b}<br/>P/W: {c}" },
    xAxis: {
      type: "category",
      data: bodyCompData.trends.dates.map((d) =>
        new Date(d).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ),
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      name: "P/W",
      min: 1.6,
      max: 2.0,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "P/W",
        type: "line",
        data: bodyCompData.trends.powerToWeightRatios,
        itemStyle: { color: "#8b5cf6" },
        lineStyle: { color: "#8b5cf6", width: 3 },
        symbol: "diamond",
        symbolSize: 6,
        areaStyle: { color: "rgba(139, 92, 246, 0.1)" },
        markLine: {
          data: [
            {
              yAxis: 1.85,
              name: "الیته",
              lineStyle: { type: "dashed", color: "#10b981" },
            },
            {
              yAxis: 1.75,
              name: "خوب",
              lineStyle: { type: "dashed", color: "#f59e0b" },
            },
          ],
        },
      },
    ],
  } as const;

  return (
    <div className="min-h-screen bg-gray-50 px-2 py-4 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header + Preview */}
        <div className="mb-6 sm:mb-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6 items-start">
            <div id="overview-header">
              <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-2">
                <Scale className="h-6 w-6 sm:h-8 sm:w-8 text-gray-700" />
                <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                  ترکیب بدنی
                </h1>
              </div>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                پیگیری معیارهای InBody، تعادل عضلانی بخش‌بندی‌شده و تحلیل‌های
                مرتبط با عملکرد. پیش‌نمایش روند قدرت به وزن شما در برابر مناطق
                الیته را نشان می‌دهد.
              </p>
            </div>
            <div className="bg-white rounded-lg border border-gray-200 p-3">
              <ReactECharts
                option={powerToWeightOption}
                style={{ height: 220 }}
              />
            </div>
          </div>
        </div>

        {/* Goals and Targets Section */}
        <div id="goals" className="mb-6 sm:mb-8 lg:mb-12">
          <GoalsTargets
            goals={bodyCompData.goals}
            onUpdateGoals={handleUpdateGoals}
          />
        </div>

        {/* Interactive Body Performance Diagram */}
        <div id="interactive-chart" className="mb-6 sm:mb-8 lg:mb-12">
          <InteractiveBodyDiagram />
        </div>

        {/* InBody Analysis Section */}
        <div id="inbody-analysis" className="mb-6 sm:mb-8 lg:mb-12">
          <InBodyAnalysis
            inbodyData={latestInBody}
            historicalData={bodyCompData.inbody}
          />
        </div>

        {/* Segmental Muscle Analysis Section */}
        <div id="trends" className="mb-6 sm:mb-8 lg:mb-12">
          <MuscleMassAnalysis
            segmentalData={latestSegmental}
            historicalData={bodyCompData.segmental}
          />
        </div>

        {/* Advanced Charts and Analytics Section */}
        <div id="advanced-charts" className="mb-6 sm:mb-8 lg:mb-12">
          <AdvancedCharts
            advancedData={latestAdvanced}
            trendData={bodyCompData.trends}
          />
        </div>

        {/* Footer Note */}
        <div className="mt-8 sm:mt-12 lg:mt-16 p-4 sm:p-6 bg-gray-100 rounded-lg border border-gray-200">
          <div className="flex items-start gap-2 sm:gap-3">
            <Scale className="h-4 w-4 sm:h-5 sm:w-5 text-gray-600 mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-gray-900 mb-2">
                Professional Body Composition Analysis
              </h3>
              <p className="text-xs sm:text-sm text-gray-700 leading-relaxed">
                This comprehensive analysis integrates InBody bioelectrical
                impedance data with advanced performance metrics specifically
                designed for Olympic wrestling athletes. All measurements should
                be taken consistently under similar conditions for accurate
                trend analysis.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
