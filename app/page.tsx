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
  // Quick overview chart
  const overviewData = {
    title: {
      text: "Performance Overview - Last 7 Days",
      textStyle: { fontSize: 16 },
    },
    tooltip: { trigger: "axis" },
    legend: { data: ["Strength", "Endurance", "Recovery"] },
    radar: {
      indicator: [
        { name: "Monday", max: 100 },
        { name: "Tuesday", max: 100 },
        { name: "Wednesday", max: 100 },
        { name: "Thursday", max: 100 },
        { name: "Friday", max: 100 },
        { name: "Saturday", max: 100 },
        { name: "Sunday", max: 100 },
      ],
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
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Wrestling MVP Dashboard
          </h1>
          <p className="text-gray-600 mt-2">
            Track your performance, nutrition, and recovery metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Competition Ready
          </Badge>
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Week 4 of 8
          </Badge>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-blue-600" />
              Bench PR
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">330 lbs</div>
            <p className="text-xs text-gray-500">+5 lbs this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Activity className="h-4 w-4 text-red-600" />
              Recovery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">87%</div>
            <p className="text-xs text-gray-500">Good recovery</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Droplets className="h-4 w-4 text-blue-600" />
              Protein
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">185g</div>
            <p className="text-xs text-gray-500">Daily average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Target className="h-4 w-4 text-green-600" />
              Body Fat
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12.5%</div>
            <p className="text-xs text-gray-500">Competition ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-red-600" />
              Total Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">47k</div>
            <p className="text-xs text-gray-500">lbs this week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-2">
              <Calendar className="h-4 w-4 text-purple-600" />
              Next Meet
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">28</div>
            <p className="text-xs text-gray-500">days away</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Body Performance Section */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Body Performance Analysis</CardTitle>
            <CardDescription>
              Interactive muscle group analysis for wrestling performance
              optimization
            </CardDescription>
          </CardHeader>
          <CardContent>
            <InteractiveBodyDiagram />
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Weekly Performance Radar</CardTitle>
            <CardDescription>
              Overall performance metrics for the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ReactECharts option={overviewData} style={{ height: "350px" }} />
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
            <CardDescription>Navigate to detailed analytics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Link href="/bloodwork" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Activity className="mr-2 h-4 w-4" />
                Blood Work Analysis
              </Button>
            </Link>
            <Link href="/lifting" className="block">
              <Button variant="outline" className="w-full justify-start">
                <BarChart3 className="mr-2 h-4 w-4" />
                Lifting Metrics
              </Button>
            </Link>
            <Link href="/supplements" className="block">
              <Button variant="outline" className="w-full justify-start">
                <Droplets className="mr-2 h-4 w-4" />
                Supplement Tracking
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* Recent Highlights */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Recent Highlights</CardTitle>
            <CardDescription>Notable achievements this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">New Bench Press PR</p>
                <p className="text-xs text-gray-500">330 lbs - 5 lb increase</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Perfect Supplement Week</p>
                <p className="text-xs text-gray-500">100% adherence to stack</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-red-600 rounded-full mt-2"></div>
              <div>
                <p className="text-sm font-medium">Optimal Blood Markers</p>
                <p className="text-xs text-gray-500">All values in range</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Competition Prep Status */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Competition Prep</CardTitle>
            <CardDescription>Next competition readiness</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Weight Cut Progress</span>
                  <span>85%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: "85%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Strength Maintenance</span>
                  <span>92%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: "92%" }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Technical Skills</span>
                  <span>78%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-600 h-2 rounded-full"
                    style={{ width: "78%" }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Schedule */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">This Week&apos;s Schedule</CardTitle>
            <CardDescription>Training and testing schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">Heavy Bench Day</p>
                  <p className="text-xs text-gray-500">Monday 6:00 PM</p>
                </div>
                <Badge variant="outline">Today</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">Wrestling Practice</p>
                  <p className="text-xs text-gray-500">Tuesday 7:00 PM</p>
                </div>
                <Badge variant="outline">Tomorrow</Badge>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium text-sm">Blood Work</p>
                  <p className="text-xs text-gray-500">Friday 9:00 AM</p>
                </div>
                <Badge variant="outline">Scheduled</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
