"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Button intentionally removed — not used in this page
import ReactECharts from "echarts-for-react";
import {
  Moon,
  Heart,
  Zap,
  BrainCircuit,
  Activity,
  Timer,
  TrendingUp,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

// Professional color palette
const PRIMARY_BLUE = "#1e3a8a";
const SECONDARY_GRAY = "#64748b";
const SUCCESS_GREEN = "#059669";
const WARNING_ORANGE = "#d97706";
const ERROR_RED = "#dc2626";

export default function RecoveryPage() {
  // Generate last 14 days of data for recovery tracking
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (13 - i));
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  // Sleep quality tracking
  const sleepQualityData = {
    title: {
      text: "کیفیت خواب و مدت",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>خواب: {c0} ساعت<br/>کیفیت: {c1}/۱۰",
    },
    legend: {
      data: ["مدت خواب", "کیفیت خواب"],
      textStyle: { fontSize: 11, color: "#374151" },
    },
    xAxis: {
      type: "category",
      data: last14Days,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: [
      {
        type: "value",
        name: "ساعت",
        min: 6,
        max: 10,
        nameTextStyle: { fontSize: 10, color: "#6b7280" },
        axisLabel: { fontSize: 10, color: "#6b7280" },
        axisLine: { lineStyle: { color: "#e5e7eb" } },
      },
      {
        type: "value",
        name: "کیفیت (۱-۱۰)",
        min: 1,
        max: 10,
        position: "right",
        nameTextStyle: { fontSize: 10, color: "#6b7280" },
        axisLabel: { fontSize: 10, color: "#6b7280" },
        axisLine: { lineStyle: { color: "#e5e7eb" } },
      },
    ],
    series: [
      {
        name: "مدت خواب",
        type: "bar",
        yAxisIndex: 0,
        data: [
          7.5, 8.2, 7.8, 6.9, 8.5, 8.1, 7.2, 8.0, 7.9, 8.3, 7.6, 8.4, 7.8, 8.2,
        ],
        itemStyle: { color: "#6B7280" },
        barWidth: "40%",
      },
      {
        name: "کیفیت خواب",
        type: "line",
        yAxisIndex: 1,
        data: [7, 8, 6, 5, 9, 8, 6, 7, 8, 9, 7, 8, 7, 8],
        itemStyle: { color: "#9CA3AF" },
        lineStyle: { color: "#9CA3AF", width: 3 },
        symbol: "circle",
        symbolSize: 6,
      },
    ],
  };

  // Heart Rate Variability (HRV) tracking
  const hrvData = {
    title: {
      text: "تغییرپذیری ضربان قلب (HRV)",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>HRV: {c} میلی‌ثانیه",
    },
    xAxis: {
      type: "category",
      data: last14Days,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "HRV (میلی‌ثانیه)",
      min: 30,
      max: 60,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "HRV",
        type: "line",
        data: [45, 48, 42, 38, 52, 49, 41, 46, 47, 51, 44, 50, 46, 49],
        itemStyle: { color: "#6B7280" },
        lineStyle: { color: "#6B7280", width: 3 },
        areaStyle: { color: "#6B728030" },
        symbol: "diamond",
        symbolSize: 6,
        markLine: {
          data: [
            {
              yAxis: 45,
              name: "خط پایه",
              lineStyle: { color: "#9CA3AF", type: "dashed" },
              label: { color: "#9CA3AF", fontSize: 10 },
            },
          ],
        },
      },
    ],
  };

  // Stress level tracking
  const stressLevelData = {
    title: {
      text: "سطوح استرس روزانه",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
      formatter: "{b}<br/>استرس: {c}/۱۰",
    },
    xAxis: {
      type: "category",
      data: last14Days,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "سطح استرس (۱-۱۰)",
      min: 1,
      max: 10,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "سطح استرس",
        type: "bar",
        data: [4, 3, 6, 7, 2, 3, 5, 4, 3, 2, 5, 3, 4, 3],
        itemStyle: {
          color: "#6B7280", // Default gray color
        },
        barWidth: "60%",
      },
    ],
  };

  // Muscle soreness tracking
  const muscleSorenessData = {
    title: {
      text: "ارزیابی درد عضلانی",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
    },
    legend: {
      data: ["بدن بالایی", "تنه", "بدن پایینی"],
      textStyle: { fontSize: 11, color: "#374151" },
    },
    xAxis: {
      type: "category",
      data: last14Days,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
    },
    yAxis: {
      type: "value",
      name: "درد (۱-۱۰)",
      min: 0,
      max: 10,
      nameTextStyle: { fontSize: 10, color: "#6b7280" },
      axisLabel: { fontSize: 10, color: "#6b7280" },
      axisLine: { lineStyle: { color: "#e5e7eb" } },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "بدن بالایی",
        type: "line",
        data: [3, 2, 5, 6, 1, 2, 4, 3, 2, 1, 4, 2, 3, 2],
        itemStyle: { color: "#6B7280" },
        lineStyle: { color: "#6B7280", width: 2 },
        symbol: "circle",
        symbolSize: 4,
      },
      {
        name: "تنه",
        type: "line",
        data: [2, 1, 3, 4, 0, 1, 3, 2, 1, 0, 3, 1, 2, 1],
        itemStyle: { color: "#9CA3AF" },
        lineStyle: { color: "#9CA3AF", width: 2 },
        symbol: "square",
        symbolSize: 4,
      },
      {
        name: "بدن پایینی",
        type: "line",
        data: [4, 3, 6, 7, 2, 3, 5, 4, 3, 2, 5, 3, 4, 3],
        itemStyle: { color: "#D1D5DB" },
        lineStyle: { color: "#D1D5DB", width: 2 },
        symbol: "triangle",
        symbolSize: 5,
      },
    ],
  };

  // Recovery score radar chart
  const recoveryScoreData = {
    title: {
      text: "تجزیه امتیاز بازیابی",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "item",
      textStyle: { fontSize: 12 },
    },
    radar: {
      indicator: [
        { name: "کیفیت خواب", max: 10 },
        { name: "HRV", max: 10 },
        {
          name: "سطح استرس",
          max: 10,
          axisLabel: { show: true, formatter: (value: number) => 10 - value },
        },
        { name: "سطح انرژی", max: 10 },
        { name: "بازیابی عضلانی", max: 10 },
        { name: "وضعیت ذهنی", max: 10 },
      ],
      radius: "70%",
      axisName: {
        fontSize: 11,
        color: "#374151",
      },
      splitLine: {
        lineStyle: { color: "#e5e7eb" },
      },
      axisLine: {
        lineStyle: { color: "#d1d5db" },
      },
    },
    series: [
      {
        name: "متریک‌های بازیابی",
        type: "radar",
        data: [
          {
            value: [8, 7, 8, 7, 6, 8], // Inverted stress level (10-3=7)
            name: "امروز",
            itemStyle: { color: "#6B7280" },
            areaStyle: { color: "#6B728030" },
          },
          {
            value: [7, 6, 7, 6, 5, 7],
            name: "میانگین ۷ روزه",
            itemStyle: { color: "#9CA3AF" },
            areaStyle: { color: "#9CA3AF10" },
          },
        ],
      },
    ],
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <Activity className="h-8 w-8 text-gray-700" />
          <h1 className="text-3xl font-bold text-gray-900">ردیابی بازیابی</h1>
        </div>
        <p className="text-gray-600">
          پایش جامع بازیابی برای عملکرد ورزشی بهینه
        </p>
      </div>

      {/* Key Recovery Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="border-gray-200 shadow-sm rounded-md">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Moon className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">کیفیت خواب</p>
                <p className="text-2xl font-bold text-gray-900">۸.۲/۱۰</p>
                <p className="text-xs text-gray-700 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +۰.۵ در مقایسه با هفته گذشته
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm rounded-md">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Heart className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">HRV</p>
                <p className="text-2xl font-bold text-gray-900">
                  ۴۹ میلی‌ثانیه
                </p>
                <p className="text-xs text-gray-700 flex items-center gap-1 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  +۳ میلی‌ثانیه در مقایسه با خط پایه
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm rounded-md">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <BrainCircuit className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">سطح استرس</p>
                <p className="text-2xl font-bold text-gray-900">۳/۱۰</p>
                <p className="text-xs text-gray-700 flex items-center gap-1 mt-1">
                  <CheckCircle className="h-3 w-3" />
                  محدوده بهینه
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200 shadow-sm rounded-md">
          <CardContent className="p-6 bg-white">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-100 rounded-lg">
                <Zap className="h-6 w-6 text-gray-700" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-600">
                  امتیاز بازیابی
                </p>
                <p className="text-2xl font-bold text-gray-900">۸۷%</p>
                <p className="text-xs text-gray-700 flex items-center gap-1 mt-1">
                  <CheckCircle className="h-3 w-3" />
                  عالی
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sleep & HRV Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Sleep & Physiological Recovery
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Sleep Analysis
              </CardTitle>
              <CardDescription className="text-gray-600">
                Sleep duration and quality assessment
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts
                option={sleepQualityData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                Heart Rate Variability
              </CardTitle>
              <CardDescription className="text-gray-600">
                Autonomic nervous system recovery indicator
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts option={hrvData} style={{ height: "280px" }} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stress & Soreness Section */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          استرس و بازیابی جسمی
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-gray-200 shadow-sm rounded-md">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                پایش استرس
              </CardTitle>
              <CardDescription className="text-gray-600">
                سطوح استرس درک‌شده روزانه
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts
                option={stressLevelData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card className="border-gray-200 shadow-sm rounded-md">
            <CardHeader className="bg-gray-50">
              <CardTitle className="text-lg text-gray-800">
                درد عضلانی
              </CardTitle>
              <CardDescription className="text-gray-600">
                ارزیابی درد مناطق بدن
              </CardDescription>
            </CardHeader>
            <CardContent className="bg-white">
              <ReactECharts
                option={muscleSorenessData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Recovery Score Overview */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          ارزیابی کلی بازیابی
        </h2>
        <Card className="border-gray-200 shadow-sm rounded-md">
          <CardHeader className="bg-gray-50">
            <CardTitle className="text-lg text-gray-800">
              تجزیه امتیاز بازیابی
            </CardTitle>
            <CardDescription className="text-gray-600">
              مقایسه جامع معیارهای بازیابی
            </CardDescription>
          </CardHeader>
          <CardContent className="bg-white">
            <ReactECharts
              option={recoveryScoreData}
              style={{ height: "320px" }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Recovery Recommendations */}
      <Card className="mb-8 border-gray-200 shadow-sm rounded-md">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
            <Timer className="h-5 w-5 text-gray-700" />
            توصیه‌های بازیابی
          </CardTitle>
          <CardDescription className="text-gray-600">
            استراتژی‌های بازیابی شخصی‌سازی‌شده بر اساس معیارهای فعلی
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <CheckCircle className="h-5 w-5 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">کیفیت خواب عالی</p>
                  <p className="text-sm text-gray-700">
                    روال خواب فعلی را ادامه دهید. برای آماده‌سازی مسابقات، ۳۰
                    دقیقه زودتر به رختخواب بروید.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Heart className="h-5 w-5 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    HRV بالاتر از خط پایه
                  </p>
                  <p className="text-sm text-gray-700">
                    بازیابی خودکار خوب. آماده تمرینات با شدت متوسط تا بالا.
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">
                    درد بدن پایینی را پایش کنید
                  </p>
                  <p className="text-sm text-gray-700">
                    کشش اضافی، رولینگ فوم یا ماساژ درمانی برای پاها و باسن در
                    نظر بگیرید.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <BrainCircuit className="h-5 w-5 text-gray-700 mt-0.5" />
                <div>
                  <p className="font-medium text-gray-900">مدیریت استرس</p>
                  <p className="text-sm text-gray-700">
                    تکنیک‌های مدیریت استرس فعلی را حفظ کنید. مدیتیشن قبل از
                    مسابقات را در نظر بگیرید.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
