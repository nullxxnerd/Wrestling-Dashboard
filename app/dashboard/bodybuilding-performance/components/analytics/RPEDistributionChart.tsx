"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface RPEDistributionChartProps {
  rpeData?: {
    rpe6: number;
    rpe7: number;
    rpe8: number;
    rpe9: number;
    rpe10: number;
  };
}

export default function RPEDistributionChart({
  rpeData = {
    rpe6: 5,
    rpe7: 15,
    rpe8: 30,
    rpe9: 35,
    rpe10: 15,
  },
}: RPEDistributionChartProps) {
  const option = {
    title: {
      text: "توزیع RPE (ست‌های برتر)",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "item",
      formatter: "RPE {b}: {c}% ({d}%)",
      textStyle: { fontSize: 12 },
    },
    legend: {
      orient: "horizontal",
      bottom: "bottom",
      textStyle: { fontSize: 11 },
    },
    series: [
      {
        name: "RPE",
        type: "pie",
        radius: ["35%", "65%"],
        center: ["50%", "45%"],
        data: [
          {
            value: rpeData.rpe6,
            name: "RPE 6",
            itemStyle: { color: "#F3F4F6" },
          },
          {
            value: rpeData.rpe7,
            name: "RPE 7",
            itemStyle: { color: "#E5E7EB" },
          },
          {
            value: rpeData.rpe8,
            name: "RPE 8",
            itemStyle: { color: "#D1D5DB" },
          },
          {
            value: rpeData.rpe9,
            name: "RPE 9",
            itemStyle: { color: "#9CA3AF" },
          },
          {
            value: rpeData.rpe10,
            name: "RPE 10",
            itemStyle: { color: "#6B7280" },
          },
        ],
        label: { fontSize: 11 },
        labelLine: { show: false },
      },
    ],
  };

  const totalSets = Object.values(rpeData).reduce(
    (sum, value) => sum + value,
    0
  );
  const averageRPE = (
    (rpeData.rpe6 * 6 +
      rpeData.rpe7 * 7 +
      rpeData.rpe8 * 8 +
      rpeData.rpe9 * 9 +
      rpeData.rpe10 * 10) /
    totalSets
  ).toFixed(1);

  const getIntensityRecommendation = (avgRPE: number) => {
    if (avgRPE >= 9)
      return {
        message: "شدت بسیار بالا - هفته استراحت در نظر بگیرید",
        color: "text-gray-700",
      };
    if (avgRPE >= 8.5)
      return {
        message: "شدت بالا - بازیابی را به دقت نظارت کنید",
        color: "text-gray-700",
      };
    if (avgRPE >= 7.5)
      return {
        message: "شدت بهینه برای افزایش قدرت",
        color: "text-gray-700",
      };
    return {
      message: "شدت متوسط - فضای پیشرفت وجود دارد",
      color: "text-gray-700",
    };
  };

  const { message, color } = getIntensityRecommendation(parseFloat(averageRPE));

  return (
    <Card className="rounded-md border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg">تحلیل شدت تمرین</CardTitle>
        <CardDescription>
          توزیع RPE ست‌های برتر - میانگین RPE: {averageRPE}
          <div className={`text-xs mt-1 ${color}`}>{message}</div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="mt-4 grid grid-cols-2 gap-4 text-xs">
          <div>
            <h4 className="font-semibold mb-2">راهنمای RPE:</h4>
            <ul className="space-y-1">
              <li>
                <span className="font-medium">RPE ۶-۷:</span> کار تکنیک
              </li>
              <li>
                <span className="font-medium">RPE ۸:</span> تمرین حجم
              </li>
              <li>
                <span className="font-medium">RPE ۹:</span> کار قدرت
              </li>
              <li>
                <span className="font-medium">RPE ۱۰:</span> حداکثر تلاش
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-2">توزیع هفتگی:</h4>
            <ul className="space-y-1">
              <li>شدت بالا (۹-۱۰): {rpeData.rpe9 + rpeData.rpe10}%</li>
              <li>متوسط (۷-۸): {rpeData.rpe7 + rpeData.rpe8}%</li>
              <li>شدت پایین (۶): {rpeData.rpe6}%</li>
            </ul>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
