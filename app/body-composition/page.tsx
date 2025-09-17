"use client";

import React, { useState } from 'react';
import { Scale } from 'lucide-react';
import { InBodyAnalysis } from './components/InBodyAnalysis';
import { MuscleMassAnalysis } from './components/MuscleMassAnalysis';
import { AdvancedCharts } from './components/AdvancedCharts';
import { GoalsTargets } from './components/GoalsTargets';
import { sampleBodyCompositionData } from './sampleData';
import { BodyCompositionData, GoalsAndTargets } from './types';

export default function BodyCompositionPage() {
  const [bodyCompData, setBodyCompData] = useState<BodyCompositionData>(sampleBodyCompositionData);

  const handleUpdateGoals = (newGoals: GoalsAndTargets) => {
    setBodyCompData(prev => ({
      ...prev,
      goals: newGoals
    }));
  };

  // Get the latest data for each component
  const latestInBody = bodyCompData.inbody[bodyCompData.inbody.length - 1];
  const latestSegmental = bodyCompData.segmental[bodyCompData.segmental.length - 1];
  const latestAdvanced = bodyCompData.advanced[bodyCompData.advanced.length - 1];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Scale className="h-8 w-8 text-blue-900" />
            <h1 className="text-3xl font-bold text-gray-900">
              Body Composition Analysis
            </h1>
          </div>
          <p className="text-gray-600">
            Comprehensive body composition tracking with InBody metrics and advanced analytics for Olympic wrestling performance
          </p>
        </div>

      {/* Goals and Targets Section */}
      <div className="mb-12">
        <GoalsTargets 
          goals={bodyCompData.goals}
          onUpdateGoals={handleUpdateGoals}
        />
      </div>

      {/* InBody Analysis Section */}
      <div className="mb-12">
        <InBodyAnalysis 
          inbodyData={latestInBody}
          historicalData={bodyCompData.inbody}
        />
      </div>

      {/* Segmental Muscle Analysis Section */}
      <div className="mb-12">
        <MuscleMassAnalysis 
          segmentalData={latestSegmental}
          historicalData={bodyCompData.segmental}
        />
      </div>

      {/* Advanced Charts and Analytics Section */}
      <div className="mb-12">
        <AdvancedCharts 
          advancedData={latestAdvanced}
          trendData={bodyCompData.trends}
        />
      </div>

      {/* Footer Note */}
      <div className="mt-16 p-6 bg-blue-50 rounded-lg border border-blue-200">
        <div className="flex items-start gap-3">
          <Scale className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h3 className="text-sm font-medium text-blue-900 mb-1">
              Professional Body Composition Analysis
            </h3>
            <p className="text-sm text-blue-700">
              This comprehensive analysis integrates InBody bioelectrical impedance data with advanced 
              performance metrics specifically designed for Olympic wrestling athletes. All measurements 
              should be taken consistently under similar conditions for accurate trend analysis.
            </p>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
