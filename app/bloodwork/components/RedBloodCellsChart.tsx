"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

const WRESTLING_RED = "#dc2626";

export interface RedBloodCellsChartProps {
  months?: string[];
  values?: number[];
  height?: number | string;
}

export const RedBloodCellsChart: React.FC<RedBloodCellsChartProps> = ({
  months = [
    "Jan 2024",
    "Feb 2024",
    "Mar 2024",
    "Apr 2024",
    "May 2024",
    "Jun 2024",
  ],
  values = [4.8, 4.9, 4.7, 4.8, 4.9, 4.8],
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
      name: "Cells (×10⁶/μL)",
      axisLabel: { formatter: "{value}", fontSize: 11, color: "#666" },
      nameTextStyle: { fontSize: 11, color: "#666" },
    },
    series: [
      {
        name: "Red Blood Cells",
        type: "line",
        data: values,
        lineStyle: { color: WRESTLING_RED, width: 3 },
        itemStyle: { color: WRESTLING_RED },
        smooth: true,
      },
    ],
  };
  return <ReactECharts option={option} style={{ height }} />;
};

export default RedBloodCellsChart;
