"use client";
import React from "react";
import ReactECharts from "echarts-for-react";

const WRESTLING_BLUE = "#1e40af";
export interface WhiteBloodCellsChartProps {
  months?: string[];
  values?: number[];
  height?: number | string;
}
export const WhiteBloodCellsChart: React.FC<WhiteBloodCellsChartProps> = ({
  months = [
    "Jan 2024",
    "Feb 2024",
    "Mar 2024",
    "Apr 2024",
    "May 2024",
    "Jun 2024",
  ],
  values = [6.8, 7.2, 6.9, 7.1, 6.7, 7.0],
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
      name: "Cells (×10³/μL)",
      axisLabel: { formatter: "{value}", fontSize: 11, color: "#666" },
      nameTextStyle: { fontSize: 11, color: "#666" },
    },
    series: [
      {
        name: "گلبول‌های سفید خون",
        type: "line",
        data: values,
        lineStyle: { color: WRESTLING_BLUE, width: 3 },
        itemStyle: { color: WRESTLING_BLUE },
        smooth: true,
      },
    ],
  };
  return <ReactECharts option={option} style={{ height }} />;
};
export default WhiteBloodCellsChart;
