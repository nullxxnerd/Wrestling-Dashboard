import type { EChartsOption } from "echarts";

// Project color scheme - using brand colors from globals.css
export const COLORS = {
  blue: "#1646ff", // brand-blue
  red: "#e11d48", // brand-red
  gray: "#6B7280", // gray-500
} as const;

// Common chart configuration
export const commonChartConfig = {
  tooltip: {
    trigger: "axis" as const,
    axisPointer: { type: "cross" as const },
    confine: true,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    borderColor: "#333",
    textStyle: { color: "#fff", fontSize: 12 },
  },
  grid: {
    left: "8%",
    right: "8%",
    bottom: "15%",
    top: "15%",
    containLabel: true,
  },
  xAxis: {
    type: "category" as const,
    axisLabel: { fontSize: 11, color: "#666" },
  },
  yAxis: {
    type: "value" as const,
    axisLabel: { fontSize: 11, color: "#666" },
    nameTextStyle: { fontSize: 11, color: "#666" },
  },
};

// Generate chart option
export function createLineChartOption(
  name: string,
  data: number[],
  yAxisName: string,
  color: string = COLORS.blue,
  xAxisData: string[] = [
    "Jan 2024",
    "Feb 2024",
    "Mar 2024",
    "Apr 2024",
    "May 2024",
    "Jun 2024",
  ]
): EChartsOption {
  return {
    ...commonChartConfig,
    xAxis: {
      ...commonChartConfig.xAxis,
      data: xAxisData,
    },
    yAxis: {
      ...commonChartConfig.yAxis,
      name: yAxisName,
    },
    series: [
      {
        name,
        type: "line",
        data,
        lineStyle: { color, width: 3 },
        itemStyle: { color },
        smooth: true,
      },
    ],
  };
}