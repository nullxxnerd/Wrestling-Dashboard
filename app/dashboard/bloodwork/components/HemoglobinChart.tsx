"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

export interface HemoglobinChartProps {
  months?: string[];
  values?: number[];
  height?: number | string;
}
export const HemoglobinChart: React.FC<HemoglobinChartProps> = ({
  months = [
    "Jan 2024",
    "Feb 2024",
    "Mar 2024",
    "Apr 2024",
    "May 2024",
    "Jun 2024",
  ],
  values = [15.2, 15.8, 15.1, 15.5, 15.6, 15.4],
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
      name: "Hemoglobin (g/dL)",
      axisLabel: { formatter: "{value}", fontSize: 11, color: "#666" },
      nameTextStyle: { fontSize: 11, color: "#666" },
    },
    series: [
      {
        name: "Hemoglobin",
        type: "line",
        data: values,
        lineStyle: { color: "#059669", width: 3 },
        itemStyle: { color: "#059669" },
        smooth: true,
      },
    ],
  };
  return <ReactECharts option={option} style={{ height }} />;
};
export default HemoglobinChart;
