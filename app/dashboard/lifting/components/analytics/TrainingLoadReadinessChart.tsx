"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { generateDateRange } from "../../utils";

interface TrainingLoadReadinessChartProps {
  trainingLoad?: number[];
  readiness?: number[];
  days?: number;
}

export default function TrainingLoadReadinessChart({
  trainingLoad = [70, 72, 68, 75, 80, 77, 65, 60, 62, 70, 78, 82, 76, 74],
  readiness = [82, 80, 79, 78, 75, 73, 80, 84, 83, 81, 78, 76, 77, 79],
  days = 14,
}: TrainingLoadReadinessChartProps) {
  const dateLabels = generateDateRange(days);

  const option = {
    title: {
      text: "بار تمرین در برابر آمادگی",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
    },
    legend: {
      data: ["بار تمرین", "امتیاز آمادگی"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: dateLabels,
      axisLabel: { fontSize: 10, interval: 1, rotate: 45 },
    },
    yAxis: [
      {
        type: "value",
        name: "بار (۰-۱۰۰)",
        min: 0,
        max: 100,
        axisLabel: { fontSize: 10 },
        nameTextStyle: { fontSize: 10 },
      },
      {
        type: "value",
        name: "آمادگی (۰-۱۰۰)",
        min: 50,
        max: 100,
        axisLabel: { fontSize: 10 },
        nameTextStyle: { fontSize: 10 },
        position: "right",
      },
    ],
    series: [
      {
        name: "بار تمرین",
        type: "bar",
        data: trainingLoad,
        itemStyle: { color: "#6B7280" },
        yAxisIndex: 0,
      },
      {
        name: "امتیاز آمادگی",
        type: "line",
        yAxisIndex: 1,
        data: readiness,
        itemStyle: { color: "#9CA3AF" },
        lineStyle: { width: 3 },
        smooth: true,
      },
    ],
  };

  // Calculate correlation and recovery trends
  const avgLoad =
    trainingLoad.reduce((sum, val) => sum + val, 0) / trainingLoad.length;
  const avgReadiness =
    readiness.reduce((sum, val) => sum + val, 0) / readiness.length;
  const currentReadiness = readiness[readiness.length - 1];
  const recentLoadTrend =
    trainingLoad.slice(-3).reduce((sum, val) => sum + val, 0) / 3;

  const getRecoveryStatus = (readinessScore: number, loadTrend: number) => {
    if (readinessScore >= 85 && loadTrend < 70)
      return {
        status: "بازیابی عالی",
        recommendation: "آماده تمرین شدت بالا",
        color: "text-gray-700",
      };
    if (readinessScore >= 80)
      return {
        status: "بازیابی خوب",
        recommendation: "شدت تمرین عادی",
        color: "text-gray-700",
      };
    if (readinessScore >= 75)
      return {
        status: "بازیابی متوسط",
        recommendation: "کاهش حجم در نظر بگیرید",
        color: "text-gray-700",
      };
    return {
      status: "بازیابی ضعیف",
      recommendation: "بازیابی فعال یا روز استراحت مورد نیاز",
      color: "text-gray-700",
    };
  };

  const recovery = getRecoveryStatus(currentReadiness, recentLoadTrend);

  return (
    <Card className="lg:col-span-2 rounded-md border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg">مدیریت بازیابی</CardTitle>
        <CardDescription>
          متعادل کردن استرس تمرین و ظرفیت بازیابی
          <div className={`text-sm mt-1 ${recovery.color}`}>
            {recovery.status}: {recovery.recommendation}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "320px" }} />
        <div className="mt-4 grid grid-cols-3 gap-4 text-sm">
          <div className="text-center">
            <div className="font-semibold text-gray-700">میانگین بار تمرین</div>
            <div className="text-lg">{avgLoad.toFixed(0)}</div>
            <div className="text-xs text-gray-500">{days} روز گذشته</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">میانگین آمادگی</div>
            <div className="text-lg">{avgReadiness.toFixed(0)}</div>
            <div className="text-xs text-gray-500">بهینه: ۸۰+</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">بار:آمادگی</div>
            <div className="text-lg">{(avgLoad / avgReadiness).toFixed(2)}</div>
            <div className="text-xs text-gray-500">هدف: &lt;۰.۹</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
