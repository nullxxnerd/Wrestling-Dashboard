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
import { InteractiveBodyDiagram } from "./body-composition/components/InteractiveBodyDiagram";

// Wrestling-themed colors
const WRESTLING_BLUE = "#1e40af";

export default function Home() {
  // Quick overview chart - responsive configuration
  const overviewData = {
    title: {
      text: "Performance Overview - Last 7 Days",
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
      data: ["This Week"],
      textStyle: { fontSize: 11 },
      bottom: 5,
    },
    radar: {
      center: ["50%", "55%"],
      radius: "60%",
      indicator: [
        { name: "Mon", max: 100, nameGap: 10 },
        { name: "Tue", max: 100, nameGap: 10 },
        { name: "Wed", max: 100, nameGap: 10 },
        { name: "Thu", max: 100, nameGap: 10 },
        { name: "Fri", max: 100, nameGap: 10 },
        { name: "Sat", max: 100, nameGap: 10 },
        { name: "Sun", max: 100, nameGap: 10 },
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
            name: "This Week",
            itemStyle: { color: WRESTLING_BLUE },
            areaStyle: { color: `${WRESTLING_BLUE}30` },
          },
        ],
      },
    ],
  };

  return (
    <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-6 lg:py-8 max-w-full overflow-x-hidden">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
        <div className="min-w-0 flex-1">
          <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 truncate">
            Metrics Overview
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1 sm:mt-2">
            Track your performance, nutrition, and recovery metrics
          </p>
        </div>
        <div className="flex flex-wrap gap-2 sm:flex-nowrap">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200 text-xs sm:text-sm shrink-0"
          >
            Competition Ready
          </Badge>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200 text-xs sm:text-sm shrink-0"
          >
            Week 4 of 8
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2 sm:gap-3 lg:gap-4 mb-6 lg:mb-8">
        <Card className="min-w-0">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <TrendingUp className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
              <span className="truncate">Bench PR</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-blue-600">
              330 lbs
            </div>
            <p className="text-xs text-gray-500 truncate">+5 lbs this week</p>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <Activity className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 shrink-0" />
              <span className="truncate">Recovery</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
              87%
            </div>
            <p className="text-xs text-gray-500 truncate">Good recovery</p>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <Droplets className="h-3 w-3 sm:h-4 sm:w-4 text-blue-600 shrink-0" />
              <span className="truncate">Protein</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
              185g
            </div>
            <p className="text-xs text-gray-500 truncate">Daily average</p>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <Target className="h-3 w-3 sm:h-4 sm:w-4 text-green-600 shrink-0" />
              <span className="truncate">Body Fat</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-green-600">
              12.5%
            </div>
            <p className="text-xs text-gray-500 truncate">Competition ready</p>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <BarChart3 className="h-3 w-3 sm:h-4 sm:w-4 text-red-600 shrink-0" />
              <span className="truncate">Volume</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-red-600">
              47k
            </div>
            <p className="text-xs text-gray-500 truncate">lbs this week</p>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader className="pb-1 sm:pb-2">
            <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1 sm:gap-2 truncate">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-purple-600 shrink-0" />
              <span className="truncate">Next Meet</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="text-lg sm:text-xl lg:text-2xl font-bold text-purple-600">
              28
            </div>
            <p className="text-xs text-gray-500 truncate">days away</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Body Performance Section */}
      <div className="mb-6 lg:mb-8">
        <Card>
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg lg:text-xl">
              Body Performance Analysis
            </CardTitle>
            <CardDescription className="text-sm">
              Interactive muscle group analysis for wrestling performance
              optimization
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2 sm:px-6">
            <div className="w-full overflow-hidden">
              <InteractiveBodyDiagram />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        {/* Performance Overview */}
        <Card className="lg:col-span-2 min-w-0">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">
              Weekly Performance Radar
            </CardTitle>
            <CardDescription className="text-sm">
              Overall performance metrics for the past week
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
        <Card className="min-w-0">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">
              Quick Actions
            </CardTitle>
            <CardDescription className="text-sm">
              Navigate to detailed analytics
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2 sm:space-y-3">
            <Link href="/bloodwork" className="block">
              <Button
                variant="outline"
                className="w-full justify-start text-sm p-2 sm:p-3"
              >
                <Activity className="mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">Blood Work Analysis</span>
              </Button>
            </Link>
            <Link href="/lifting" className="block">
              <Button
                variant="outline"
                className="w-full justify-start text-sm p-2 sm:p-3"
              >
                <BarChart3 className="mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">Lifting Metrics</span>
              </Button>
            </Link>
            <Link href="/supplements" className="block">
              <Button
                variant="outline"
                className="w-full justify-start text-sm p-2 sm:p-3"
              >
                <Droplets className="mr-2 h-3 w-3 sm:h-4 sm:w-4 shrink-0" />
                <span className="truncate">Supplement Tracking</span>
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Highlights */}
        <Card className="min-w-0">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">
              Recent Highlights
            </CardTitle>
            <CardDescription className="text-sm">
              Notable achievements this week
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4">
            <div className="flex items-start space-x-2 sm:space-x-3 min-w-0">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  New Bench Press PR
                </p>
                <p className="text-xs text-gray-500">330 lbs - 5 lb increase</p>
              </div>
            </div>
            <div className="flex items-start space-x-2 sm:space-x-3 min-w-0">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  Perfect Supplement Week
                </p>
                <p className="text-xs text-gray-500">100% adherence to stack</p>
              </div>
            </div>
            <div className="flex items-start space-x-2 sm:space-x-3 min-w-0">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-1.5 sm:mt-2 shrink-0"></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium truncate">
                  Optimal Blood Markers
                </p>
                <p className="text-xs text-gray-500">All values in range</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competition Prep Status */}
        <Card className="min-w-0">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">
              Competition Prep
            </CardTitle>
            <CardDescription className="text-sm">
              Next competition readiness
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
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
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
                    className="bg-green-600 h-2 rounded-full transition-all duration-300"
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
                    className="bg-red-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card className="min-w-0">
          <CardHeader className="pb-3 sm:pb-6">
            <CardTitle className="text-base sm:text-lg">
              This Week&apos;s Schedule
            </CardTitle>
            <CardDescription className="text-sm">
              Training and testing schedule
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
                  Today
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
                  Tomorrow
                </Badge>
              </div>
              <div className="flex justify-between items-center gap-2 min-w-0">
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-sm truncate">Blood Work</p>
                  <p className="text-xs text-gray-500">Friday 9:00 AM</p>
                </div>
                <Badge variant="outline" className="text-xs shrink-0">
                  Scheduled
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
