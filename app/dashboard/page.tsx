"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  Activity,
  BarChart3,
  Droplets,
  TrendingUp,
  Target,
  Calendar,
} from "lucide-react";
import ReactECharts from "echarts-for-react";

// Wrestling-themed colors
const WRESTLING_BLUE = "#1e40af";

export default function Home() {
  // Quick overview chart - responsive configuration
  const overviewData = {
    title: {
      text: "نمای کلی عملکرد - 7 روز اخیر",
      textStyle: {
        fontSize: 14,
      },
      left: "center",
      top: 10,
    },
    tooltip: {
      trigger: "axis",
      textStyle: { fontSize: 12 },
    },
    legend: {
      data: ["این هفته"],
      textStyle: { fontSize: 11 },
      bottom: 5,
    },
    radar: {
      center: ["50%", "55%"],
      radius: "60%",
      indicator: [
        { name: "دوشنبه", max: 100, nameGap: 10 },
        { name: "سه‌شنبه", max: 100, nameGap: 10 },
        { name: "چهارشنبه", max: 100, nameGap: 10 },
        { name: "پنج‌شنبه", max: 100, nameGap: 10 },
        { name: "جمعه", max: 100, nameGap: 10 },
        { name: "شنبه", max: 100, nameGap: 10 },
        { name: "یک‌شنبه", max: 100, nameGap: 10 },
      ],
      nameTextStyle: {
        fontSize: 10,
      },
      axisLabel: {
        fontSize: 9,
      },
    },
    series: [
      {
        type: "radar",
        data: [
          {
            value: [90, 85, 88, 92, 87, 85, 75],
            name: "این هفته",
            itemStyle: { color: WRESTLING_BLUE },
            areaStyle: { color: `${WRESTLING_BLUE}30` },
          },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-1 sm:px-4 py-4 sm:py-6 lg:py-8 max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
            نمای کلی معیارها
          </h1>
          <p className="text-sm sm:text-base text-gray-700 mt-1 sm:mt-2">
            عملکرد، تغذیه و بازیابی را بصورت خلاصه ببینید
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          <Badge
            variant="outline"
            className="text-xs sm:text-sm shrink-0 border border-gray-200 rounded-md px-2 py-0.5 text-gray-700 bg-transparent"
          >
            آماده مسابقه
          </Badge>
          <Badge
            variant="outline"
            className="text-xs sm:text-sm shrink-0 border border-gray-200 rounded-md px-2 py-0.5 text-gray-700 bg-transparent"
          >
            Week 4 of 8
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-6 lg:mb-8">
        <Card className="min-w-0 rounded-md border border-gray-200">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700 shrink-0" />
              <span className="truncate">Bench PR</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              330 lbs
            </div>
            <p className="text-xs text-gray-700 truncate">+5 lbs این هفته</p>
          </CardContent>
        </Card>

        <Card className="min-w-0 rounded-md border border-gray-200">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700 shrink-0" />
              <span className="truncate">بازیابی</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              87%
            </div>
            <p className="text-xs text-gray-700 truncate">بازیابی مناسب</p>
          </CardContent>
        </Card>

        <Card className="min-w-0 rounded-md border border-gray-200">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700 shrink-0" />
              <span className="truncate">پروتئین</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              185g
            </div>
            <p className="text-xs text-gray-700 truncate">میانگین روزانه</p>
          </CardContent>
        </Card>

        <Card className="min-w-0 rounded-md border border-gray-200">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <Target className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700 shrink-0" />
              <span className="truncate">درصد چربی بدن</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              12.5%
            </div>
            <p className="text-xs text-gray-700 truncate">آمادگی مسابقه</p>
          </CardContent>
        </Card>

        <Card className="min-w-0 rounded-md border border-gray-200">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700 shrink-0" />
              <span className="truncate">حجم</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              47k
            </div>
            <p className="text-xs text-gray-700 truncate">lbs این هفته</p>
          </CardContent>
        </Card>

        <Card className="min-w-0 rounded-md border border-gray-200">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-gray-700 shrink-0" />
              <span className="truncate">مسابقه بعدی</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">
              28
            </div>
            <p className="text-xs text-gray-700 truncate">روز مانده</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Body Performance Section removed for a more compact layout */}

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {/* Performance Overview */}
        <Card className="lg:col-span-2 min-w-0 rounded-md border border-gray-200">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">
              نمودار عملکرد هفتگی
            </CardTitle>
            <CardDescription className="text-sm">
              خلاصهٔ عملکرد هفته
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="w-full overflow-hidden">
              <ReactECharts
                option={overviewData}
                style={{
                  height: "250px",
                  width: "100%",
                }}
                opts={{ renderer: "canvas" }}
              />
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="min-w-0 rounded-md border border-gray-200">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">میانبرها</CardTitle>
            <CardDescription className="text-sm">
              رفتن به تحلیل‌ها
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <Link href="/bloodwork" className="block">
              <Button
                variant="outline"
                className="w-full justify-start text-sm p-2 sm:p-3"
              >
                <Activity className="ml-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">Blood Work — آنالیز</span>
              </Button>
            </Link>
            <Link href="/bodybuilding-performance" className="block">
              <Button
                variant="outline"
                className="w-full justify-start text-sm p-2 sm:p-3"
              >
                <BarChart3 className="ml-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">Lifting — معیارها</span>
              </Button>
            </Link>
            <Link href="/supplements" className="block">
              <Button
                variant="outline"
                className="w-full justify-start text-sm p-2 sm:p-3"
              >
                <Droplets className="ml-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">پیگیری مکمل‌ها</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Highlights */}
        <Card className="min-w-0 rounded-md border border-gray-200">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">نکات مهم</CardTitle>
            <CardDescription className="text-sm">
              دستاوردهای این هفته
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-start gap-2 sm:gap-3 min-w-0">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">Bench PR جدید</p>
                <p className="text-xs text-gray-500">330 lbs — +5</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 min-w-0">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  هفتهٔ کامل مکمل‌ها
                </p>
                <p className="text-xs text-gray-500">100% پیروی</p>
              </div>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 min-w-0">
              <div className="w-2 h-2 bg-gray-400 rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  Blood Markers مطلوب
                </p>
                <p className="text-xs text-gray-500">All values in range</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competition Prep Status */}
        <Card className="min-w-0 rounded-md border border-gray-200">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">
              آماده‌سازی مسابقه
            </CardTitle>
            <CardDescription className="text-sm">
              وضعیت آماده‌سازی
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 sm:space-y-4">
              <div className="min-w-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="truncate mr-2">Weight Cut Progress</span>
                  <span className="shrink-0">85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="truncate mr-2">Strength Maintenance</span>
                  <span className="shrink-0">92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
              <div className="min-w-0">
                <div className="flex justify-between text-sm mb-1">
                  <span className="truncate mr-2">Technical Skills</span>
                  <span className="shrink-0">78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-gray-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card className="min-w-0 rounded-md border border-gray-200">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">
              برنامهٔ این هفته
            </CardTitle>
            <CardDescription className="text-sm">
              جلسات تمرین و تست
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center gap-2 min-w-0">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">
                    Heavy Bench Day
                  </p>
                  <p className="text-xs text-gray-500">Monday 6:00 PM</p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">
                  امروز
                </Badge>
              </div>
              <div className="flex justify-between items-center gap-2 min-w-0">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">
                    Wrestling Practice
                  </p>
                  <p className="text-xs text-gray-500">Tuesday 7:00 PM</p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">
                  فردا
                </Badge>
              </div>
              <div className="flex justify-between items-center gap-2 min-w-0">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">Blood Work</p>
                  <p className="text-xs text-gray-500">Friday 9:00 AM</p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">
                  زمان‌بندی‌شده
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
