"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  COLORS,
  calculateStrengthToBodyweightRatio,
  generateWeekLabels,
} from "../../utils";

interface StrengthRatiosChartProps {
  benchData?: number[];
  squatData?: number[];
  deadliftData?: number[];
  bodyweightData?: number[];
  weeks?: number;
}

export default function StrengthRatiosChart({
  benchData = [315, 317, 320, 322, 325, 327],
  squatData = [450, 452, 455, 457, 460, 462],
  deadliftData = [505, 507, 510, 512, 515, 517],
  bodyweightData = [198, 198.5, 199, 199.2, 199.5, 200],
  weeks = 6,
}: StrengthRatiosChartProps) {
  const weekLabels = generateWeekLabels(weeks).map(
    (_label, index) => `هفته ${index + 1}`
  );

  const fontFamily = "'Vazirmatn', sans-serif";

  const benchRatios = benchData.map((bench, i) =>
    calculateStrengthToBodyweightRatio(bench, bodyweightData[i])
  );
  const squatRatios = squatData.map((squat, i) =>
    calculateStrengthToBodyweightRatio(squat, bodyweightData[i])
  );
  const deadliftRatios = deadliftData.map((deadlift, i) =>
    calculateStrengthToBodyweightRatio(deadlift, bodyweightData[i])
  );

  const option = {
    title: {
      text: "نسبت قدرت به وزن بدن",
      textStyle: { fontSize: 14, fontWeight: "normal", fontFamily },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12, fontFamily },
      formatter:
        "{b}<br/>{a0}: {c0} برابر<br/>{a1}: {c1} برابر<br/>{a2}: {c2} برابر",
    },
    legend: {
      data: ["پرس سینه به وزن بدن", "اسکات به وزن بدن", "ددلیفت به وزن بدن"],
      textStyle: { fontSize: 11, fontFamily },
    },
    textStyle: { fontFamily },
    xAxis: {
      type: "category",
      data: weekLabels,
      axisLabel: { fontSize: 10, fontFamily },
    },
    yAxis: {
      type: "value",
      name: "نسبت (برابر)",
      min: 1.4,
      max: 2.7,
      nameTextStyle: { fontSize: 10, fontFamily },
      axisLabel: { fontSize: 10, fontFamily },
    },
    series: [
      {
        name: "پرس سینه به وزن بدن",
        type: "line",
        data: benchRatios,
        itemStyle: { color: COLORS.WRESTLING_BLUE },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "اسکات به وزن بدن",
        type: "line",
        data: squatRatios,
        itemStyle: { color: COLORS.WRESTLING_RED },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "ددلیفت به وزن بدن",
        type: "line",
        data: deadliftRatios,
        itemStyle: { color: COLORS.WRESTLING_GREEN },
        lineStyle: { width: 3 },
        smooth: true,
      },
    ],
  };

  return (
    <Card style={{ fontFamily }}>
      <CardHeader>
        <CardTitle className="text-lg">تحلیل قدرت نسبی</CardTitle>
        <CardDescription>
          بررسی روند نسبت قدرت به وزن برای ارزیابی عملکرد
        </CardDescription>
      </CardHeader>
      <CardContent className="px-0">
        <ReactECharts option={option} style={{ height: "300px" }} />
      </CardContent>
    </Card>
  );
}
