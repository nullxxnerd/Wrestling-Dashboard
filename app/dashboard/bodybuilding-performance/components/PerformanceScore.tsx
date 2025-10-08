"use client";

import ReactECharts from "echarts-for-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { calculatePerformanceScore, getPerformanceGrade } from "../utils";

interface PerformanceScoreProps {
  strengthMetrics?: {
    bench: number;
    squat: number;
    deadlift: number;
  };
  bodyweight?: number;
  cardioMetrics?: {
    vo2Max: number;
    restingHR: number;
  };
  bodyComposition?: {
    bodyFat: number;
    leanMass: number;
  };
  recoveryMetrics?: {
    readiness: number;
    hrv: number;
  };
}

export default function PerformanceScore({
  strengthMetrics = { bench: 330, squat: 460, deadlift: 520 },
  bodyweight = 200,
  cardioMetrics = { vo2Max: 53.7, restingHR: 52 },
  bodyComposition = { bodyFat: 13.5, leanMass: 173 },
  recoveryMetrics = { readiness: 79, hrv: 82 },
}: PerformanceScoreProps) {
  const scores = calculatePerformanceScore(
    strengthMetrics,
    bodyweight,
    cardioMetrics,
    bodyComposition,
    recoveryMetrics
  );

  const radarOption = {
    title: {
      text: "تحلیل عملکرد",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "item",
      formatter: "{b}: {c}",
      textStyle: { fontSize: 12 },
    },
    radar: {
      indicator: [
        { name: "قدرت", max: 100 },
        { name: "تحمل", max: 100 },
        { name: "ترکیب بدن", max: 100 },
        { name: "بازیابی", max: 100 },
        { name: "قدرت خروجی", max: 100 },
        { name: "تکنیک", max: 100 },
      ],
      radius: "75%",
      nameGap: 5,
      name: {
        textStyle: { fontSize: 11 },
      },
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: [
              scores.strength,
              scores.endurance,
              scores.bodyComposition,
              scores.recovery,
              scores.powerOutput,
              scores.technique,
            ],
            name: "عملکرد فعلی",
            itemStyle: { color: "#6B7280" },
            areaStyle: { color: "#6B728030" },
            lineStyle: { width: 3 },
          },
        ],
      },
    ],
  };

  const overallGrade = getPerformanceGrade(scores.overall);

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-600";
    if (score >= 75) return "text-blue-600";
    if (score >= 65) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (score: number) => {
    if (score >= 85) return "default";
    if (score >= 75) return "secondary";
    return "outline";
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Overall Score Card */}
      <Card className="rounded-md border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">امتیاز کلی عملکرد</CardTitle>
          <CardDescription>
            ارزیابی جامع آمادگی جسمانی بر اساس متریک‌های متعدد
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className={`text-6xl font-bold ${overallGrade.color} mb-2`}>
              {scores.overall}
            </div>
            <div
              className={`text-2xl font-semibold ${overallGrade.color} mb-4`}
            >
              رتبه: {overallGrade.grade}
            </div>
            <Badge
              variant={getScoreBadgeVariant(scores.overall)}
              className="text-lg px-4 py-2 bg-gray-100 text-gray-700 border-gray-200 rounded-md"
            >
              {scores.overall >= 90
                ? "ورزشکار نخبه"
                : scores.overall >= 80
                ? "پیشرفته"
                : scores.overall >= 70
                ? "متوسط"
                : scores.overall >= 60
                ? "در حال توسعه"
                : "مبتدی"}
            </Badge>
          </div>

          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">قدرت</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${getScoreColor(
                    scores.strength
                  )}`}
                >
                  {scores.strength}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-gray-500 rounded-full"
                    style={{ width: `${scores.strength}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">تحمل</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${getScoreColor(
                    scores.endurance
                  )}`}
                >
                  {scores.endurance}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-gray-500 rounded-full"
                    style={{ width: `${scores.endurance}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">ترکیب بدن</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${getScoreColor(
                    scores.bodyComposition
                  )}`}
                >
                  {scores.bodyComposition}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-gray-500 rounded-full"
                    style={{ width: `${scores.bodyComposition}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">بازیابی</span>
              <div className="flex items-center gap-2">
                <span
                  className={`text-sm font-semibold ${getScoreColor(
                    scores.recovery
                  )}`}
                >
                  {scores.recovery}
                </span>
                <div className="w-20 h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-2 bg-gray-500 rounded-full"
                    style={{ width: `${scores.recovery}%` }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Radar Chart */}
      <Card className="rounded-md border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">رادار عملکرد</CardTitle>
          <CardDescription>تصویرسازی عملکرد چند بعدی</CardDescription>
        </CardHeader>
        <CardContent>
          <ReactECharts option={radarOption} style={{ height: "300px" }} />
        </CardContent>
      </Card>

      {/* Detailed Metrics */}
      <Card className="lg:col-span-2 rounded-md border-gray-200">
        <CardHeader>
          <CardTitle className="text-lg">متریک‌های عملکرد جزئی</CardTitle>
          <CardDescription>تجزیه اجزای عملکرد فردی</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">
                نسبت پرس سینه/وزن بدن
              </div>
              <div className="text-lg font-semibold">
                {(strengthMetrics.bench / bodyweight).toFixed(2)}x
              </div>
              <div className="text-xs text-gray-400">هدف: ۱.۵x+</div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">
                نسبت اسکوات/وزن بدن
              </div>
              <div className="text-lg font-semibold">
                {(strengthMetrics.squat / bodyweight).toFixed(2)}x
              </div>
              <div className="text-xs text-gray-400">هدف: ۲.۰x+</div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">
                نسبت ددلیفت/وزن بدن
              </div>
              <div className="text-lg font-semibold">
                {(strengthMetrics.deadlift / bodyweight).toFixed(2)}x
              </div>
              <div className="text-xs text-gray-400">هدف: ۲.۵x+</div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">حداکثر VO2</div>
              <div className="text-lg font-semibold">
                {cardioMetrics.vo2Max}
              </div>
              <div className="text-xs text-gray-400">
                میلی‌لیتر/کیلوگرم/دقیقه
              </div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">درصد چربی بدن</div>
              <div className="text-lg font-semibold">
                {bodyComposition.bodyFat}%
              </div>
              <div className="text-xs text-gray-400">هدف: ۸-۱۵%</div>
            </div>

            <div className="text-center">
              <div className="text-xs text-gray-500 mb-1">آمادگی</div>
              <div className="text-lg font-semibold">
                {recoveryMetrics.readiness}
              </div>
              <div className="text-xs text-gray-400">/۱۰۰ امتیاز</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
