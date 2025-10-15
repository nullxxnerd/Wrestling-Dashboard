"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COLORS } from "../../utils";

interface VO2MaxChartProps {
  data?: number[];
  months?: string[];
  targetVO2?: number;
}

export default function VO2MaxChart({
  data = [48.2, 49.1, 50.5, 51.8, 52.4, 53.7],
  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
  targetVO2 = 55,
}: VO2MaxChartProps) {
  const option = {
    title: {
      text: "روند VO2 Max",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>VO2 Max: {c} mL/kg/min",
      textStyle: { fontSize: 12 },
    },
    xAxis: {
      type: "category",
      data: months,
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "mL/kg/min",
      min: 45,
      max: 60,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        data: data,
        type: "line",
        itemStyle: { color: COLORS.WRESTLING_BLUE },
        lineStyle: { color: COLORS.WRESTLING_BLUE, width: 3 },
        areaStyle: { color: `${COLORS.WRESTLING_BLUE}30` },
        smooth: true,
        markLine: {
          data: [
            { type: "average", name: "Average" },
            { yAxis: targetVO2, name: `Elite Level: ${targetVO2}+` },
          ],
          lineStyle: { color: COLORS.WRESTLING_RED, type: "dashed" },
        },
      },
    ],
  };

  const currentVO2 = data[data.length - 1];
  const previousVO2 = data[data.length - 2] || data[0];
  const improvement = currentVO2 - previousVO2;

  const getVO2Category = (vo2: number) => {
    if (vo2 >= 55) return { category: "Elite", color: "text-green-600" };
    if (vo2 >= 50) return { category: "Excellent", color: "text-blue-600" };
    if (vo2 >= 45) return { category: "Good", color: "text-yellow-600" };
    return { category: "Fair", color: "text-orange-600" };
  };

  const { category, color } = getVO2Category(currentVO2);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">پیشرفت VO2 Max</CardTitle>
        <CardDescription>
          پیشرفت ظرفیت هوازی - فعلی: {currentVO2} mL/kg/min
          <span className={`ml-2 font-semibold ${color}`}>({category})</span>
          {improvement > 0 && (
            <span className="text-green-600 ml-2">
              (+{improvement.toFixed(1)} این ماه)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
      </CardContent>
    </Card>
  );
}
