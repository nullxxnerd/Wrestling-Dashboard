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

  return (
    <div className="min-h-screen bg-gray-50 px-2 py-4 sm:p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-2">
            <Scale className="h-6 w-6 sm:h-8 sm:w-8 text-gray-700" />
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              Body Composition Analysis
            </h1>
          </div>
          <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
            Comprehensive body composition tracking with InBody metrics and
            advanced analytics for Olympic wrestling performance
          </p>
        </div>

        {/* Goals and Targets Section */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <GoalsTargets
            goals={bodyCompData.goals}
            onUpdateGoals={handleUpdateGoals}
          />
        </div>

        {/* Interactive Body Performance Diagram */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <InteractiveBodyDiagram />
        </div>

        {/* InBody Analysis Section */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <InBodyAnalysis
            inbodyData={latestInBody}
            historicalData={bodyCompData.inbody}
          />
        </div>

        {/* Segmental Muscle Analysis Section */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
          <MuscleMassAnalysis
            segmentalData={latestSegmental}
            historicalData={bodyCompData.segmental}
          />
        </div>

        {/* Advanced Charts and Analytics Section */}
        <div className="mb-6 sm:mb-8 lg:mb-12">
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
