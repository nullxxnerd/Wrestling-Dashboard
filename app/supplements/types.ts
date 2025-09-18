export interface SupplementData {
  id: string;
  name: string;
  category: 'core' | 'performance' | 'recovery' | 'health';
  targetAmount: number;
  unit: string;
  currentAmount?: number;
  adherenceRate?: number;
  cost?: number;
  timing: string[];
  benefits: string[];
}

export interface SupplementIntakeRecord {
  date: string;
  supplementId: string;
  amount: number;
  timing: string;
}

export interface PerformanceMetric {
  date: string;
  metric: string;
  value: number;
  unit: string;
}

export interface AIInsight {
  type: 'recommendation' | 'warning' | 'optimization' | 'achievement';
  title: string;
  content: string;
  priority: 'low' | 'medium' | 'high';
  actionable: boolean;
  relatedMetrics?: string[];
}

export interface ChartDataPoint {
  date: string;
  value: number;
  target?: number;
  label?: string;
}

export interface SupplementStack {
  morning: SupplementData[];
  preWorkout: SupplementData[];
  postWorkout: SupplementData[];
  evening: SupplementData[];
  totalMonthlyCost: number;
}

export interface HydrationData {
  date: string;
  waterIntake: number; // in liters
  electrolyteBalance: number; // 1-10 scale
  timing: {
    preWorkout: number;
    duringWorkout: number;
    postWorkout: number;
  };
}

export interface TimingMetrics {
  preWorkoutTiming: number; // minutes before workout
  postWorkoutWindow: number; // minutes after workout
  consistency: number; // 1-10 scale
  mealSpacing: number; // hours between meals
}