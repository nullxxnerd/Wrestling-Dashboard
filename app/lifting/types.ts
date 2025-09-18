// Shared types for lifting metrics

export interface ChartDataPoint {
  x: string | number;
  y: number;
  label?: string;
}

export interface SeriesData {
  name: string;
  data: number[];
  color?: string;
  type?: "line" | "bar" | "area";
}

export interface ChartConfig {
  title: string;
  subtitle?: string;
  xAxisData: string[];
  series: SeriesData[];
  yAxisConfig?: {
    min?: number;
    max?: number;
    name?: string;
  };
}

export interface StrengthMetrics {
  benchPress: number[];
  squat: number[];
  deadlift: number[];
  overheadPress: number[];
  bentRow: number[];
  romanianDeadlift: number[];
  closeGripBench: number[];
}

export interface CardioMetrics {
  vo2Max: number[];
  restingHeartRate: number[];
  maxHeartRate: number;
  twoMileRunTime: number[];
  sprintTimes: number[];
  rowingTimes: number[];
  wrestlingEndurance: number[];
}

export interface BodyComposition {
  bodyWeight: number[];
  leanMass: number[];
  bodyFatPercentage: number[];
  muscleMass: {
    chest: number[];
    back: number[];
    legs: number[];
    arms: number[];
    shoulders: number[];
  };
}

export interface TrainingAnalytics {
  volumeLoad: {
    bench: number[];
    squat: number[];
    deadlift: number[];
  };
  rpeDistribution: {
    rpe6: number;
    rpe7: number;
    rpe8: number;
    rpe9: number;
    rpe10: number;
  };
  setVolume: {
    chest: number[];
    back: number[];
    legs: number[];
    shoulders: number[];
    arms: number[];
  };
  trainingLoad: number[];
  readinessScore: number[];
}

export interface PerformanceScore {
  overall: number;
  strength: number;
  endurance: number;
  bodyComposition: number;
  recovery: number;
  powerOutput: number;
  technique: number;
}

export interface BodybuildingMetrics {
  muscleSymmetry: {
    leftBicep: number[];
    rightBicep: number[];
    leftQuad: number[];
    rightQuad: number[];
    leftCalf: number[];
    rightCalf: number[];
  };
  muscleActivation: {
    chest: number[];
    triceps: number[];
    shoulders: number[];
    back: number[];
    biceps: number[];
    quadriceps: number[];
    hamstrings: number[];
    glutes: number[];
    calves: number[];
  };
  progressiveOverload: {
    exercise: string;
    weeks: string[];
    weight: number[];
    volume: number[];
    intensity: number[];
  }[];
  trainingFrequency: {
    muscleGroup: string;
    sessionsPerWeek: number;
    recoveryTime: number;
  }[];
}

export interface WrestlingSpecificMetrics {
  takedownPower: number[];
  gripStrength: {
    left: number[];
    right: number[];
  };
  coreStability: number[];
  explosiveStrength: number[];
  matchEndurance: number[];
  functionalMovement: {
    shoulderMobility: number[];
    hipMobility: number[];
    ankleStability: number[];
  };
}
