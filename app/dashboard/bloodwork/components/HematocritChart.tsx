"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

export interface HematocritChartProps {
  months?: string[];
  values?: number[];
  height?: number | string;
}
export const HematocritChart: React.FC<HematocritChartProps> = ({
  months = [
    "Jan 2024",
    "Feb 2024",
    "Mar 2024",
    "Apr 2024",
    "May 2024",
    "Jun 2024",
  ],
  values = [44.2, 45.1, 43.8, 44.7, 45.0, 44.5],
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
      name: "Hematocrit (%)",
      axisLabel: { formatter: "{value}%", fontSize: 11, color: "#666" },
      nameTextStyle: { fontSize: 11, color: "#666" },
    },
    series: [
      {
        name: "Hematocrit",
        type: "line",
        data: values,
        lineStyle: { color: "#7c3aed", width: 3 },
        itemStyle: { color: "#7c3aed" },
        smooth: true,
      },
    ],
  };
  return <ReactECharts option={option} style={{ height }} />;
};
export default HematocritChart;
