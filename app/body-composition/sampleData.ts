// Sample data for body composition analysis
import {
  BasicBodyMetrics,
  InBodyMetrics,
  SegmentalMuscleAnalysis,
  AdvancedMetrics,
  GoalsAndTargets,
  TrendData,
  BodyCompositionData,
} from "./types";

// Generate sample basic metrics
export const sampleBasicMetrics: BasicBodyMetrics[] = [
  {
    weight: 182.3,
    height: 1.78,
    bodyFatPercentage: 13.2,
    leanBodyMass: 158.3,
    fatMass: 24.0,
    bmi: 57.5,
    ffmi: 24.8,
    date: "2024-09-17",
  },
];

// Generate sample InBody metrics
export const sampleInBodyMetrics: InBodyMetrics[] = [
  {
    totalBodyWater: 44.3,
    extracellularWater: 16.8,
    intracellularWater: 27.5,
    proteinMass: 31.2,
    mineralMass: 8.9,
    visceralFatLevel: 7.5,
    subcutaneousFat: 16.5,
    visceralFatArea: 85.2,
    basalMetabolicRate: 1865,
    totalEnergyExpenditure: 2598,
    ecwIcwRatio: 0.378,
    proteinFatRatio: 1.3,
    phaseAngle: 7.4,
    tbwPercentage: 60.2,
    ecwPercentage: 22.8,
    icwPercentage: 37.4,
    date: "2024-09-17",
  },
];

// Generate sample segmental muscle analysis
export const sampleSegmentalData: SegmentalMuscleAnalysis[] = [
  {
    rightArm: 16.8,
    leftArm: 16.5,
    trunk: 66.8,
    rightLeg: 26.2,
    leftLeg: 25.9,
    armSymmetry: 1.018,
    legSymmetry: 1.012,
    rightArmQuality: 95,
    leftArmQuality: 94,
    trunkQuality: 97,
    rightLegQuality: 96,
    leftLegQuality: 95,
    rightArmPercentage: 11.2,
    leftArmPercentage: 11.0,
    trunkPercentage: 44.5,
    rightLegPercentage: 17.4,
    leftLegPercentage: 17.3,
    date: "2024-09-17",
  },
];

// Generate sample advanced metrics
export const sampleAdvancedMetrics: AdvancedMetrics[] = [
  {
    hydrationStatus: "Normal",
    hydrationScore: 92,
    muscleBalance: 94,
    muscleDevelopmentScore: 96,
    powerToWeightRatio: 1.87,
    strengthIndex: 94.2,
    waistHipRatio: 0.85,
    waistHeightRatio: 0.48,
    metabolicAge: 23,
    bodyAge: 24,
    date: "2024-09-17",
  },
];

// Generate sample goals and targets
export const sampleGoals: GoalsAndTargets = {
  currentWeight: 182.3,
  targetWeight: 178.0,
  targetBodyFat: 10.5,
  targetLeanMass: 160.0,
  competitionDate: "2024-12-15",
  weightClass: "79kg",
  daysToCompetition: 89,
  weeklyWeightLossTarget: 0.8,
};

// Generate sample trend data
export const sampleTrendData: TrendData = {
  dates: [
    "2024-08-01",
    "2024-08-08",
    "2024-08-15",
    "2024-08-22",
    "2024-08-29",
    "2024-09-05",
    "2024-09-12",
    "2024-09-17",
  ],
  weights: [186.2, 185.1, 184.3, 183.6, 182.8, 182.1, 181.7, 182.3],
  bodyFatPercentages: [15.8, 15.2, 14.6, 14.1, 13.7, 13.4, 13.0, 13.2],
  leanMasses: [156.8, 157.2, 157.5, 157.8, 158.0, 158.1, 158.2, 158.3],
  fatMasses: [29.4, 27.9, 26.8, 25.8, 24.8, 24.0, 23.5, 24.0],
  ffmiValues: [24.2, 24.3, 24.4, 24.5, 24.6, 24.7, 24.8, 24.8],
  bmiValues: [58.7, 58.3, 58.0, 57.8, 57.5, 57.3, 57.2, 57.5],
  powerToWeightRatios: [1.72, 1.75, 1.78, 1.81, 1.83, 1.85, 1.86, 1.87],
};

// Complete sample data object
export const sampleBodyCompositionData: BodyCompositionData = {
  basic: sampleBasicMetrics,
  inbody: sampleInBodyMetrics,
  segmental: sampleSegmentalData,
  advanced: sampleAdvancedMetrics,
  goals: sampleGoals,
  trends: sampleTrendData,
};
