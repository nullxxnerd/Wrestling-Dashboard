"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

export interface GlucoseChartProps {
  months?: string[];
  values?: number[];
  height?: number | string;
}
export const GlucoseChart: React.FC<GlucoseChartProps> = ({
  months = [
    "Jan 2024",
    "Feb 2024",
    "Mar 2024",
    "Apr 2024",
    "May 2024",
    "Jun 2024",
  ],
  values = [89, 92, 87, 91, 88, 90],
  height = 280,
}) => {
  const option = {
    tooltip: { trigger: "axis", axisPointer: { type: "cross" } },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: months,
      axisLabel: { fontSize: 11, color: "#666" },
    },
    yAxis: {
      type: "value",
      name: "Glucose (mg/dL)",
      axisLabel: { formatter: "{value}", fontSize: 11, color: "#666" },
      nameTextStyle: { fontSize: 11, color: "#666" },
    },
    series: [
      {
        name: "Glucose",
        type: "line",
        data: values,
        lineStyle: { color: "#f59e0b", width: 3 },
        itemStyle: { color: "#f59e0b" },
        smooth: true,
      },
    ],
  };
  return <ReactECharts option={option} style={{ height }} />;
};
export default GlucoseChart;
