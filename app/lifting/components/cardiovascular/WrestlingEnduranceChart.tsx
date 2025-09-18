"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { COLORS, generateWeekLabels } from "../../utils";

interface WrestlingEnduranceChartProps {
  beepTestData?: number[];
  weeks?: number;
}

export default function WrestlingEnduranceChart({
  beepTestData = [14.2, 14.8, 15.1, 15.5],
  weeks = 4,
}: WrestlingEnduranceChartProps) {
  const weekLabels = generateWeekLabels(weeks);

  const option = {
    title: {
      text: "Wrestling Endurance Test",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>Beep Test Level: {c}",
    },
    xAxis: {
      type: "category",
      data: weekLabels,
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Beep Test Level",
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
      min: 12,
      max: 18,
    },
    series: [
      {
        name: "Wrestler's Beep Test",
        type: "bar",
        data: beepTestData,
        itemStyle: { color: COLORS.WRESTLING_RED },
        markLine: {
          data: [{ yAxis: 16, name: "Elite Level" }],
          lineStyle: { color: COLORS.WRESTLING_GREEN, type: "dashed" },
        },
      },
    ],
  };

  const currentLevel = beepTestData[beepTestData.length - 1];
  const improvement = currentLevel - beepTestData[0];

  const getEnduranceRating = (level: number) => {
    if (level >= 16) return { rating: "Elite", color: "text-green-600" };
    if (level >= 15) return { rating: "Excellent", color: "text-blue-600" };
    if (level >= 14) return { rating: "Good", color: "text-yellow-600" };
    return { rating: "Needs Work", color: "text-red-600" };
  };

  const { rating, color } = getEnduranceRating(currentLevel);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Wrestling Endurance Test</CardTitle>
        <CardDescription>
          Sport-specific fitness benchmark - Current Level: {currentLevel}
          <span className={`ml-2 font-semibold ${color}`}>({rating})</span>
          {improvement > 0 && (
            <span className="text-green-600 ml-2">
              (+{improvement.toFixed(1)} levels improved)
            </span>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="mt-4 text-xs text-gray-600">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <strong>Scoring Guide:</strong>
              <ul className="ml-2">
                <li>16+: Elite wrestler endurance</li>
                <li>15-16: Excellent conditioning</li>
                <li>14-15: Good fitness level</li>
                <li>&lt;14: Needs improvement</li>
              </ul>
            </div>
            <div>
              <strong>Test Protocol:</strong>
              <ul className="ml-2">
                <li>20m shuttle run</li>
                <li>Progressive beep intervals</li>
                <li>Wrestling-specific movements</li>
                <li>Performed weekly</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
