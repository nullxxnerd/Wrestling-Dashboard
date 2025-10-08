"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface IntensityDistributionChartProps {
  repRangeData?: {
    strength: number;
    hypertrophy: number;
    endurance: number;
  };
}

export default function IntensityDistributionChart({
  repRangeData = {
    strength: 22,
    hypertrophy: 58,
    endurance: 20,
  },
}: IntensityDistributionChartProps) {
  const option = {
    title: {
      text: "توزیع شدت تمرین",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}% ({d}%)",
      textStyle: { fontSize: 12 },
    },
    legend: {
      orient: "horizontal",
      bottom: "bottom",
      textStyle: { fontSize: 11 },
    },
    series: [
      {
        name: "محدوده تکرار",
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "45%"],
        data: [
          {
            value: repRangeData.strength,
            name: "قدرت (۱-۵ تکرار)",
            itemStyle: { color: "#6B7280" },
          },
          {
            value: repRangeData.hypertrophy,
            name: "هیپرتروفی (۶-۱۲ تکرار)",
            itemStyle: { color: "#9CA3AF" },
          },
          {
            value: repRangeData.endurance,
            name: "تحمل (۱۳+ تکرار)",
            itemStyle: { color: "#D1D5DB" },
          },
        ],
        label: { fontSize: 11 },
        labelLine: { show: false },
      },
    ],
  };

  const getDominantAdaptation = (data: typeof repRangeData) => {
    if (data.hypertrophy >= 50)
      return {
        adaptation: "متمرکز بر هیپرتروفی",
        description: "بهینه برای توسعه توده عضلانی",
        color: "text-gray-700",
      };
    if (data.strength >= 40)
      return {
        adaptation: "متمرکز بر قدرت",
        description: "اولویت‌بندی افزایش قدرت حداکثری",
        color: "text-gray-700",
      };
    return {
      adaptation: "رویکرد متعادل",
      description: "تطابق‌های مختلط در محدوده تکرار",
      color: "text-gray-700",
    };
  };

  const adaptation = getDominantAdaptation(repRangeData);

  return (
    <Card className="rounded-md border-gray-200">
      <CardHeader>
        <CardTitle className="text-lg">تحلیل محدوده تکرار</CardTitle>
        <CardDescription>
          توزیع تأکید تمرین
          <div className={`text-sm mt-1 ${adaptation.color}`}>
            {adaptation.adaptation}: {adaptation.description}
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height: "300px" }} />
        <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
          <div className="text-center">
            <div className="font-semibold text-gray-700">قدرت</div>
            <div className="text-lg">{repRangeData.strength}%</div>
            <div className="text-gray-500">۱-۵ تکرار</div>
            <div className="text-gray-500">قدرت حداکثری</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">هیپرتروفی</div>
            <div className="text-lg">{repRangeData.hypertrophy}%</div>
            <div className="text-gray-500">۶-۱۲ تکرار</div>
            <div className="text-gray-500">رشد عضلانی</div>
          </div>
          <div className="text-center">
            <div className="font-semibold text-gray-700">تحمل</div>
            <div className="text-lg">{repRangeData.endurance}%</div>
            <div className="text-gray-500">۱۳+ تکرار</div>
            <div className="text-gray-500">ظرفیت کاری</div>
          </div>
        </div>
        <div className="mt-3 text-xs text-gray-600">
          <strong>توصیه‌ها:</strong> برای کشتی، هدف ۳۰% قدرت، ۵۰% هیپرتروفی، ۲۰%
          تحمل
        </div>
      </CardContent>
    </Card>
  );
}
