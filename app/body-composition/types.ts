// Body Composition Data Types and Interfaces

export interface BasicBodyMetrics {
  weight: number; // lbs
  height: number; // meters
  bodyFatPercentage: number; // %
  leanBodyMass: number; // lbs
  fatMass: number; // lbs
  bmi: number;
  ffmi: number; // Fat-Free Mass Index
  date: string;
}

export interface InBodyMetrics {
  // Core composition
  totalBodyWater: number; // liters
  extracellularWater: number; // liters
  intracellularWater: number; // liters
  proteinMass: number; // lbs
  mineralMass: number; // lbs

  // Fat analysis
  visceralFatLevel: number; // 1-30 scale
  subcutaneousFat: number; // lbs
  visceralFatArea: number; // cm²

  // Metabolic data
  basalMetabolicRate: number; // calories/day
  totalEnergyExpenditure: number; // calories/day

  // Body composition ratios
  ecwIcwRatio: number; // Extracellular/Intracellular water ratio
  proteinFatRatio: number;

  // Phase angle (cellular health indicator)
  phaseAngle: number; // degrees

  // Body water percentages
  tbwPercentage: number; // Total body water %
  ecwPercentage: number; // ECW %
  icwPercentage: number; // ICW %

  date: string;
}

export interface SegmentalMuscleAnalysis {
  // Muscle mass by segment (lbs)
  rightArm: number;
  leftArm: number;
  trunk: number;
  rightLeg: number;
  leftLeg: number;

  // Muscle symmetry ratios
  armSymmetry: number; // Right/Left ratio
  legSymmetry: number; // Right/Left ratio

  // Muscle quality scores (0-100)
  rightArmQuality: number;
  leftArmQuality: number;
  trunkQuality: number;
  rightLegQuality: number;
  leftLegQuality: number;

  // Muscle percentage by segment
  rightArmPercentage: number;
  leftArmPercentage: number;
  trunkPercentage: number;
  rightLegPercentage: number;
  leftLegPercentage: number;

  date: string;
}

export interface AdvancedMetrics {
  // Hydration analysis
  hydrationStatus: "Dehydrated" | "Normal" | "Overhydrated";
  hydrationScore: number; // 0-100

  // Muscle development
  muscleBalance: number; // 0-100 score
  muscleDevelopmentScore: number; // 0-100

  // Performance indicators
  powerToWeightRatio: number;
  strengthIndex: number; // Relative strength score

  // Body shape analysis
  waistHipRatio: number;
  waistHeightRatio: number;

  // Metabolic health
  metabolicAge: number; // years
  bodyAge: number; // years vs chronological age

  date: string;
}

export interface GoalsAndTargets {
  currentWeight: number;
  targetWeight: number;
  targetBodyFat: number;
  targetLeanMass: number;
  competitionDate: string;
  weightClass: string;
  daysToCompetition: number;
  weeklyWeightLossTarget: number;
}

export interface TrendData {
  dates: string[];
  weights: number[];
  bodyFatPercentages: number[];
  leanMasses: number[];
  fatMasses: number[];
  ffmiValues: number[];
  bmiValues: number[];
  powerToWeightRatios: number[];
}

export interface BodyCompositionData {
  basic: BasicBodyMetrics[];
  inbody: InBodyMetrics[];
  segmental: SegmentalMuscleAnalysis[];
  advanced: AdvancedMetrics[];
  goals: GoalsAndTargets;
  trends: TrendData;
}

// Chart configuration types
export interface ChartColors {
  primary: string;
  secondary: string;
  success: string;
  warning: string;
  danger: string;
  info: string;
}

export interface ChartOptions {
  title: {
    text: string;
    textStyle: {
      fontSize: number;
      fontWeight: string;
      color: string;
    };
  };
  tooltip: Record<string, unknown>;
  legend?: Record<string, unknown>;
  xAxis?: Record<string, unknown>;
  yAxis?: Record<string, unknown> | Record<string, unknown>[];
  series: Record<string, unknown>[];
  grid?: Record<string, unknown>;
  radar?: Record<string, unknown>;
}

// Component props interfaces
export interface MetricCardProps {
  title: string;
  value: string | number;
  unit?: string;
  trend?: "up" | "down" | "stable";
  trendValue?: string;
  icon: React.ReactNode;
}

export interface ChartCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  className?: string;
}

export interface SectionHeaderProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
}
