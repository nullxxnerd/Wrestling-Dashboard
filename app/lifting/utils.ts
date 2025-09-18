// Utility functions for lifting metrics

import { ChartConfig, PerformanceScore } from "./types";

// Wrestling-themed color palette
export const COLORS = {
  WRESTLING_BLUE: "#1e40af",
  WRESTLING_RED: "#dc2626",
  WRESTLING_GREEN: "#16a34a",
  SECONDARY_BLUE: "#3b82f6",
  SECONDARY_RED: "#ef4444",
  SECONDARY_GREEN: "#10b981",
  PURPLE: "#9333ea",
  ORANGE: "#f59e0b",
  INDIGO: "#6366f1",
  TEAL: "#14b8a6",
  PINK: "#ec4899",
  GRAY: "#6b7280",
} as const;

export const generateDateRange = (days: number): string[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });
};

export const generateWeekLabels = (weeks: number): string[] => {
  return Array.from({ length: weeks }, (_, i) => `W${i + 1}`);
};

export const calculateStrengthToBodyweightRatio = (
  strength: number,
  bodyweight: number
): number => {
  return Math.round((strength / bodyweight) * 100) / 100;
};

export const formatChartOption = (config: ChartConfig) => ({
  title: {
    text: config.title,
    textStyle: { fontSize: 14, fontWeight: "normal" },
  },
  tooltip: {
    trigger: "axis",
    textStyle: { fontSize: 12 },
  },
  legend: {
    data: config.series.map((s) => s.name),
    textStyle: { fontSize: 11 },
  },
  xAxis: {
    type: "category",
    data: config.xAxisData,
    axisLabel: { fontSize: 10 },
  },
  yAxis: {
    type: "value",
    name: config.yAxisConfig?.name || "",
    min: config.yAxisConfig?.min,
    max: config.yAxisConfig?.max,
    nameTextStyle: { fontSize: 10 },
    axisLabel: { fontSize: 10 },
  },
  series: config.series.map((s) => ({
    name: s.name,
    type: s.type || "line",
    data: s.data,
    itemStyle: { color: s.color },
    lineStyle: s.type === "line" ? { color: s.color, width: 3 } : undefined,
    areaStyle: s.type === "area" ? { color: `${s.color}30` } : undefined,
    smooth: s.type === "line",
  })),
});

export const formatPieChartOption = (
  title: string,
  data: { name: string; value: number; color: string }[]
) => ({
  title: {
    text: title,
    textStyle: { fontSize: 14, fontWeight: "normal" },
  },
  tooltip: {
    trigger: "item",
    formatter: "{b}: {c}% ({d}%)",
  },
  series: [
    {
      type: "pie",
      radius: ["40%", "70%"],
      center: ["50%", "60%"],
      data: data.map((d) => ({
        value: d.value,
        name: d.name,
        itemStyle: { color: d.color },
      })),
      label: { fontSize: 11 },
    },
  ],
});

export const calculatePerformanceScore = (
  strengthMetrics: { bench: number; squat: number; deadlift: number },
  bodyweight: number,
  cardioMetrics: { vo2Max: number; restingHR: number },
  bodyComposition: { bodyFat: number; leanMass: number },
  recoveryMetrics: { readiness: number; hrv: number }
): PerformanceScore => {
  // Strength score (40% weight)
  const strengthRatios = {
    bench: strengthMetrics.bench / bodyweight,
    squat: strengthMetrics.squat / bodyweight,
    deadlift: strengthMetrics.deadlift / bodyweight,
  };

  const strengthScore = Math.min(
    100,
    (strengthRatios.bench * 50 +
      strengthRatios.squat * 35 +
      strengthRatios.deadlift * 30) /
      3
  );

  // Endurance score (25% weight)
  const vo2MaxScore = Math.min(100, (cardioMetrics.vo2Max / 60) * 100);
  const hrScore = Math.max(0, 100 - (cardioMetrics.restingHR - 40));
  const enduranceScore = (vo2MaxScore + hrScore) / 2;

  // Body composition score (20% weight)
  const bodyFatScore = Math.max(0, 100 - (bodyComposition.bodyFat - 8) * 5);
  const leanMassScore = Math.min(
    100,
    (bodyComposition.leanMass / bodyweight) * 100
  );
  const bodyCompScore = (bodyFatScore + leanMassScore) / 2;

  // Recovery score (10% weight)
  const recoveryScore = (recoveryMetrics.readiness + recoveryMetrics.hrv) / 2;

  // Power output score (5% weight)
  const powerScore = Math.min(100, strengthRatios.deadlift * 40);

  // Overall score
  const overall = Math.round(
    strengthScore * 0.4 +
      enduranceScore * 0.25 +
      bodyCompScore * 0.2 +
      recoveryScore * 0.1 +
      powerScore * 0.05
  );

  return {
    overall,
    strength: Math.round(strengthScore),
    endurance: Math.round(enduranceScore),
    bodyComposition: Math.round(bodyCompScore),
    recovery: Math.round(recoveryScore),
    powerOutput: Math.round(powerScore),
    technique: 85, // This would be calculated from technique analysis
  };
};

export const getPerformanceGrade = (
  score: number
): { grade: string; color: string } => {
  if (score >= 90) return { grade: "A+", color: COLORS.WRESTLING_GREEN };
  if (score >= 85) return { grade: "A", color: COLORS.WRESTLING_GREEN };
  if (score >= 80) return { grade: "A-", color: COLORS.SECONDARY_GREEN };
  if (score >= 75) return { grade: "B+", color: COLORS.SECONDARY_BLUE };
  if (score >= 70) return { grade: "B", color: COLORS.WRESTLING_BLUE };
  if (score >= 65) return { grade: "B-", color: COLORS.ORANGE };
  if (score >= 60) return { grade: "C+", color: COLORS.ORANGE };
  if (score >= 55) return { grade: "C", color: COLORS.SECONDARY_RED };
  return { grade: "C-", color: COLORS.WRESTLING_RED };
};

export const simulateRealisticData = (
  baseValue: number,
  length: number,
  trend: "increasing" | "decreasing" | "stable" = "increasing",
  variance: number = 0.05
): number[] => {
  const data: number[] = [];
  let current = baseValue;

  for (let i = 0; i < length; i++) {
    const randomVariation = (Math.random() - 0.5) * 2 * variance * baseValue;
    const trendAdjustment =
      trend === "increasing" ? i * 0.5 : trend === "decreasing" ? -i * 0.3 : 0;

    current = baseValue + trendAdjustment + randomVariation;
    data.push(Math.round(current * 100) / 100);
  }

  return data;
};
