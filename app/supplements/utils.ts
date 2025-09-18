import { SupplementData, ChartDataPoint, AIInsight } from './types';

// Wrestling-themed colors
export const WRESTLING_COLORS = {
  primary: '#1e40af',
  secondary: '#dc2626',
  success: '#059669',
  warning: '#d97706',
  info: '#0891b2',
  purple: '#9333ea',
  gray: '#64748b',
} as const;

// Professional color palette
export const CHART_COLORS = {
  primaryBlue: '#1e3a8a',
  secondaryGray: '#64748b',
  successGreen: '#059669',
  warningOrange: '#d97706',
  dangerRed: '#dc2626',
  infoCyan: '#0891b2',
  purpleAccent: '#9333ea',
} as const;

// Generate sample dates for charts
export const generateDateRange = (days: number): string[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });
};

// Format currency
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
};

// Calculate adherence percentage
export const calculateAdherence = (actual: number[], target: number): number => {
  const adherenceCount = actual.filter(value => value >= target * 0.8).length;
  return Math.round((adherenceCount / actual.length) * 100);
};

// Generate AI insights based on data patterns
export const generateAIInsights = (
  data: ChartDataPoint[],
  target: number,
  supplementName: string
): AIInsight[] => {
  const insights: AIInsight[] = [];
  const recent7Days = data.slice(-7);
  const recent30Days = data.slice(-30);
  
  const avgRecent = recent7Days.reduce((sum, d) => sum + d.value, 0) / recent7Days.length;
  const avgMonth = recent30Days.reduce((sum, d) => sum + d.value, 0) / recent30Days.length;
  const adherenceRate = calculateAdherence(recent30Days.map(d => d.value), target);
  
  // Achievement insights
  if (adherenceRate >= 90) {
    insights.push({
      type: 'achievement',
      title: 'Excellent Consistency! 🏆',
      content: `You've maintained excellent ${supplementName} consistency with ${adherenceRate}% adherence. This level of consistency is optimal for performance gains.`,
      priority: 'low',
      actionable: false,
    });
  }
  
  // Warning insights
  if (adherenceRate < 70) {
    insights.push({
      type: 'warning',
      title: 'Consistency Alert',
      content: `Your ${supplementName} adherence is below optimal levels at ${adherenceRate}%. Consider setting daily reminders or adjusting your routine.`,
      priority: 'high',
      actionable: true,
      relatedMetrics: ['Adherence Rate', 'Performance Impact'],
    });
  }
  
  // Trend insights
  if (avgRecent > avgMonth * 1.1) {
    insights.push({
      type: 'optimization',
      title: 'Positive Trend Detected',
      content: `Your recent ${supplementName} intake has improved by ${Math.round(((avgRecent - avgMonth) / avgMonth) * 100)}% compared to your monthly average. Keep up the momentum!`,
      priority: 'medium',
      actionable: false,
    });
  }
  
  // Recommendation insights
  if (avgRecent < target * 0.9) {
    insights.push({
      type: 'recommendation',
      title: 'Intake Optimization',
      content: `Consider increasing your ${supplementName} intake by ${Math.round((target - avgRecent) * 10) / 10}${supplementName === 'Protein' ? 'g' : 'g'} to reach optimal levels for wrestling performance.`,
      priority: 'medium',
      actionable: true,
      relatedMetrics: ['Daily Intake', 'Performance Correlation'],
    });
  }
  
  return insights;
};

// Sample supplement data
export const SAMPLE_SUPPLEMENTS: Record<string, SupplementData> = {
  creatine: {
    id: 'creatine',
    name: 'Creatine Monohydrate',
    category: 'performance',
    targetAmount: 5,
    unit: 'g',
    cost: 25,
    timing: ['pre-workout', 'post-workout'],
    benefits: ['Increased power output', 'Enhanced muscle recovery', 'Improved anaerobic performance'],
  },
  protein: {
    id: 'protein',
    name: 'Whey Protein',
    category: 'core',
    targetAmount: 180,
    unit: 'g',
    cost: 60,
    timing: ['post-workout', 'evening'],
    benefits: ['Muscle protein synthesis', 'Recovery enhancement', 'Lean mass maintenance'],
  },
  betaAlanine: {
    id: 'beta-alanine',
    name: 'Beta-Alanine',
    category: 'performance',
    targetAmount: 3,
    unit: 'g',
    cost: 20,
    timing: ['pre-workout'],
    benefits: ['Muscular endurance', 'Reduced fatigue', 'Enhanced anaerobic capacity'],
  },
  vitaminD: {
    id: 'vitamin-d',
    name: 'Vitamin D3',
    category: 'health',
    targetAmount: 2000,
    unit: 'IU',
    cost: 15,
    timing: ['morning'],
    benefits: ['Bone health', 'Immune function', 'Testosterone support'],
  },
};

// Generate realistic sample data with some variation
export const generateSampleData = (days: number, target: number, variance: number = 0.2): ChartDataPoint[] => {
  const dates = generateDateRange(days);
  
  return dates.map(date => {
    const randomVariation = (Math.random() - 0.5) * variance * target;
    const baseValue = target + randomVariation;
    const finalValue = Math.max(0, baseValue);
    
    return {
      date,
      value: Math.round(finalValue * 10) / 10,
      target,
    };
  });
};