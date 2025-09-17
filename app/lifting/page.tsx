"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ReactECharts from "echarts-for-react";

// Wrestling-themed colors
const WRESTLING_BLUE = "#1e40af";
const WRESTLING_RED = "#dc2626";

export default function LiftingPage() {
  // Generate last 30 days of data
  const last30Days = Array.from({ length: 30 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (29 - i));
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });

  // Bench press max data for last 30 days
  const benchPressData = {
    title: {
      text: "Bench Press Max - Last 30 Days",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>Max: {c} lbs",
      textStyle: { fontSize: 12 },
    },
    xAxis: {
      type: "category",
      data: last30Days,
      axisLabel: { interval: 4, fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Weight (lbs)",
      min: 275,
      max: 335,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        data: [
          295, 298, 300, 302, 298, 305, 307, 305, 310, 308, 312, 315, 313, 318,
          316, 320, 318, 322, 320, 325, 323, 322, 320, 318, 321, 323, 325, 327,
          324, 330,
        ],
        type: "line",
        itemStyle: { color: WRESTLING_BLUE },
        lineStyle: { color: WRESTLING_BLUE, width: 3 },
        areaStyle: { color: `${WRESTLING_BLUE}30` },
        smooth: true,
      },
    ],
  };

  // Squat progression
  const squatProgressData = {
    title: {
      text: "Squat Progression - Last 30 Days",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>Max: {c} lbs",
      textStyle: { fontSize: 12 },
    },
    xAxis: {
      type: "category",
      data: last30Days,
      axisLabel: { interval: 4, fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Weight (lbs)",
      min: 400,
      max: 460,
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        data: [
          425, 428, 430, 432, 428, 435, 437, 435, 440, 438, 442, 445, 443, 448,
          446, 450, 448, 452, 450, 455, 453, 452, 450, 448, 451, 453, 455, 457,
          454, 460,
        ],
        type: "line",
        itemStyle: { color: WRESTLING_RED },
        lineStyle: { color: WRESTLING_RED, width: 3 },
        areaStyle: { color: `${WRESTLING_RED}30` },
        smooth: true,
      },
    ],
  };

  // Deadlift progression
  const deadliftProgressData = {
    title: {
      text: "Deadlift Progression - Last 30 Days",
      textStyle: { fontSize: 16 },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>Max: {c} lbs",
    },
    xAxis: {
      type: "category",
      data: last30Days,
      axiosLabel: { interval: 4 },
    },
    yAxis: {
      type: "value",
      name: "Weight (lbs)",
      min: 480,
      max: 520,
    },
    series: [
      {
        data: [
          485, 488, 490, 492, 488, 495, 497, 495, 500, 498, 502, 505, 503, 508,
          506, 510, 508, 512, 510, 515, 513, 512, 510, 508, 511, 513, 515, 517,
          514, 520,
        ],
        type: "line",
        itemStyle: { color: "#16a34a" },
        lineStyle: { color: "#16a34a", width: 3 },
        areaStyle: { color: "#16a34a30" },
        smooth: true,
      },
    ],
  };

  // Lower body powerlifts
  const lowerBodyLiftsData = {
    title: {
      text: "Lower Body Powerlifts",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: { trigger: "axis", textStyle: { fontSize: 12 } },
    legend: { data: ["Squat", "Deadlift"], textStyle: { fontSize: 11 } },
    xAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "1RM (lbs)",
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Squat",
        type: "bar",
        data: [440, 445, 450, 460],
        itemStyle: { color: WRESTLING_RED },
      },
      {
        name: "Deadlift",
        type: "bar",
        data: [505, 510, 515, 520],
        itemStyle: { color: "#16a34a" },
      },
    ],
  };

  // Bench press progression
  const benchProgressData = {
    title: {
      text: "Bench Press Progress",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: { trigger: "axis", textStyle: { fontSize: 12 } },
    xAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "1RM (lbs)",
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Bench Press",
        type: "bar",
        data: [315, 320, 325, 330],
        itemStyle: { color: WRESTLING_BLUE },
      },
    ],
  };

  // Upper body accessory lifts
  const upperAccessoryData = {
    title: {
      text: "Upper Body Accessories",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: { trigger: "axis", textStyle: { fontSize: 12 } },
    legend: {
      data: ["Overhead Press", "Close-Grip Bench"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Weight (lbs)",
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Overhead Press",
        type: "line",
        data: [185, 188, 190, 195],
        itemStyle: { color: WRESTLING_BLUE },
        lineStyle: { width: 3 },
      },
      {
        name: "Close-Grip Bench",
        type: "line",
        data: [275, 280, 285, 290],
        itemStyle: { color: WRESTLING_RED },
        lineStyle: { width: 3 },
      },
    ],
  };

  // Back and posterior chain accessories
  const backAccessoryData = {
    title: {
      text: "Back & Posterior Chain",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: { trigger: "axis", textStyle: { fontSize: 12 } },
    legend: { data: ["Bent Row", "Romanian DL"], textStyle: { fontSize: 11 } },
    xAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Weight (lbs)",
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Bent Row",
        type: "line",
        data: [225, 230, 235, 240],
        itemStyle: { color: "#16a34a" },
        lineStyle: { width: 3 },
      },
      {
        name: "Romanian DL",
        type: "line",
        data: [355, 360, 365, 370],
        itemStyle: { color: "#9333ea" },
        lineStyle: { width: 3 },
      },
    ],
  };

  // VO2 Max progression
  const vo2MaxData = {
    title: {
      text: "VO2 Max Progression",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yAxis: { type: "value", name: "mL/kg/min", min: 45, max: 60 },
    series: [
      {
        data: [48.2, 49.1, 50.5, 51.8, 52.4, 53.7],
        type: "line",
        itemStyle: { color: WRESTLING_BLUE },
        lineStyle: { color: WRESTLING_BLUE, width: 3 },
        areaStyle: { color: `${WRESTLING_BLUE}30` },
        smooth: true,
        markLine: {
          data: [{ type: "average", name: "Elite Level: 55+", yAxis: 55 }],
          lineStyle: { color: WRESTLING_RED, type: "dashed" },
        },
      },
    ],
  };

  // Heart rate zones during cardio
  const heartRateZonesData = {
    title: {
      text: "Heart Rate Training Zones",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: { trigger: "item", formatter: "{a}<br/>{b}: {c}% ({d}%)" },
    series: [
      {
        type: "pie",
        radius: ["40%", "70%"],
        center: ["50%", "60%"],
        data: [
          {
            value: 15,
            name: "Zone 1 (Recovery)",
            itemStyle: { color: "#10b981" },
          },
          {
            value: 25,
            name: "Zone 2 (Aerobic)",
            itemStyle: { color: "#3b82f6" },
          },
          {
            value: 30,
            name: "Zone 3 (Tempo)",
            itemStyle: { color: "#f59e0b" },
          },
          {
            value: 20,
            name: "Zone 4 (Threshold)",
            itemStyle: { color: "#ef4444" },
          },
          {
            value: 10,
            name: "Zone 5 (Anaerobic)",
            itemStyle: { color: "#8b5cf6" },
          },
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: "rgba(0, 0, 0, 0.5)",
          },
        },
      },
    ],
  };

  // Running and rowing tests (time-based)
  const runningTestsData = {
    title: {
      text: "Running & Rowing Tests",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: { trigger: "axis", textStyle: { fontSize: 12 } },
    legend: {
      data: ["2-Mile Run (min)", "5x5 Sprint (sec)", "Rowing 2K (min)"],
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Time (min/sec)",
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "2-Mile Run (min)",
        type: "line",
        data: [13.2, 12.8, 12.5, 12.1],
        itemStyle: { color: WRESTLING_BLUE },
        lineStyle: { width: 3 },
      },
      {
        name: "5x5 Sprint (sec)",
        type: "line",
        data: [6.8, 6.6, 6.4, 6.2],
        itemStyle: { color: WRESTLING_RED },
        lineStyle: { width: 3 },
      },
      {
        name: "Rowing 2K (min)",
        type: "line",
        data: [7.2, 7.0, 6.8, 6.6],
        itemStyle: { color: "#16a34a" },
        lineStyle: { width: 3 },
      },
    ],
  };

  // Wrestling-specific endurance test
  const wrestlingEnduranceData = {
    title: {
      text: "Wrestling Endurance Test",
      textStyle: { fontSize: 14, fontWeight: "normal" },
    },
    tooltip: { trigger: "axis", textStyle: { fontSize: 12 } },
    xAxis: {
      type: "category",
      data: ["Week 1", "Week 2", "Week 3", "Week 4"],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      name: "Beep Test Level",
      nameTextStyle: { fontSize: 10 },
      axisLabel: { fontSize: 10 },
    },
    series: [
      {
        name: "Wrestler's Beep Test",
        type: "bar",
        data: [14.2, 14.8, 15.1, 15.5],
        itemStyle: { color: WRESTLING_RED },
      },
    ],
  };

  // Body composition with performance metrics
  const bodyCompositionData = {
    title: {
      text: "Body Composition & Performance",
      textStyle: { fontSize: 16 },
    },
    tooltip: { trigger: "axis" },
    legend: {
      data: ["Body Weight", "Lean Mass", "Body Fat %", "Power-to-Weight"],
    },
    xAxis: {
      type: "category",
      data: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    },
    yAxis: [
      { type: "value", name: "Weight (lbs)" },
      { type: "value", name: "% & Ratio", position: "right", max: 20 },
    ],
    series: [
      {
        name: "Body Weight",
        type: "line",
        data: [195, 197, 196, 198, 199, 200],
        itemStyle: { color: WRESTLING_RED },
        lineStyle: { color: WRESTLING_RED, width: 3 },
        yAxisIndex: 0,
      },
      {
        name: "Lean Mass",
        type: "line",
        data: [165, 167, 168, 170, 171, 173],
        itemStyle: { color: WRESTLING_BLUE },
        lineStyle: { color: WRESTLING_BLUE, width: 3 },
        yAxisIndex: 0,
      },
      {
        name: "Body Fat %",
        type: "bar",
        data: [15.4, 15.2, 14.3, 14.1, 14.0, 13.5],
        itemStyle: { color: "#f59e0b" },
        yAxisIndex: 1,
      },
      {
        name: "Power-to-Weight",
        type: "line",
        data: [1.61, 1.63, 1.66, 1.67, 1.65, 1.65],
        itemStyle: { color: "#16a34a" },
        lineStyle: { width: 3 },
        yAxisIndex: 1,
      },
    ],
  };

  // ================= Additional Advanced Lifting Metrics =================
  // 6-week mesocycle labels
  const weeks6 = ["W1", "W2", "W3", "W4", "W5", "W6"];
  // Bodyweight trend for ratios (stable slight increase)
  const bw6 = [198, 198.5, 199, 199.2, 199.5, 200];
  // Estimated 1RMs across 6 weeks (slight progression)
  const bench1RM6 = [315, 317, 320, 322, 325, 327];
  const squat1RM6 = [450, 452, 455, 457, 460, 462];
  const dead1RM6 = [505, 507, 510, 512, 515, 517];

  const strengthRatiosData = {
    title: {
      text: "Strength to Bodyweight Ratios (6 Weeks)",
      textStyle: { fontSize: 14 },
    },
    tooltip: { trigger: "axis" },
    legend: {
      data: ["Bench/BW", "Squat/BW", "Deadlift/BW"],
      textStyle: { fontSize: 11 },
    },
    xAxis: { type: "category", data: weeks6 },
    yAxis: { type: "value", name: "Ratio (x)", min: 1.4, max: 2.7 },
    series: [
      {
        name: "Bench/BW",
        type: "line",
        data: bench1RM6.map((v, i) => +(v / bw6[i]).toFixed(2)),
        itemStyle: { color: WRESTLING_BLUE },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "Squat/BW",
        type: "line",
        data: squat1RM6.map((v, i) => +(v / bw6[i]).toFixed(2)),
        itemStyle: { color: WRESTLING_RED },
        lineStyle: { width: 3 },
        smooth: true,
      },
      {
        name: "Deadlift/BW",
        type: "line",
        data: dead1RM6.map((v, i) => +(v / bw6[i]).toFixed(2)),
        itemStyle: { color: "#16a34a" },
        lineStyle: { width: 3 },
        smooth: true,
      },
    ],
  };

  // Weekly tonnage (volume load) for big 3 (weight * reps summed)
  const volumeLoadData = {
    title: { text: "Weekly Volume Load - Big 3", textStyle: { fontSize: 14 } },
    tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
    legend: {
      data: ["Bench", "Squat", "Deadlift"],
      textStyle: { fontSize: 11 },
    },
    xAxis: { type: "category", data: weeks6 },
    yAxis: { type: "value", name: "Volume (lbs)", min: 0 },
    series: [
      {
        name: "Bench",
        type: "bar",
        stack: "total",
        emphasis: { focus: "series" },
        data: [16800, 17250, 17520, 17640, 17900, 18050],
        itemStyle: { color: WRESTLING_BLUE },
      },
      {
        name: "Squat",
        type: "bar",
        stack: "total",
        data: [21000, 21400, 21650, 22000, 22250, 22500],
        itemStyle: { color: WRESTLING_RED },
      },
      {
        name: "Deadlift",
        type: "bar",
        stack: "total",
        data: [15200, 15500, 15750, 15800, 16050, 16200],
        itemStyle: { color: "#16a34a" },
      },
    ],
  };

  // Hypertrophy set volume per muscle group (weekly average working sets)
  const hypertrophySetsData = {
    title: {
      text: "Weekly Hypertrophy Set Volume",
      textStyle: { fontSize: 14 },
    },
    tooltip: { trigger: "axis" },
    legend: {
      data: ["Chest", "Back", "Legs", "Shoulders", "Arms"],
      textStyle: { fontSize: 11 },
    },
    xAxis: { type: "category", data: weeks6 },
    yAxis: { type: "value", name: "Sets", min: 0, max: 28 },
    series: [
      {
        name: "Chest",
        type: "line",
        data: [18, 19, 19, 20, 20, 21],
        itemStyle: { color: WRESTLING_BLUE },
        smooth: true,
      },
      {
        name: "Back",
        type: "line",
        data: [20, 21, 21, 22, 22, 23],
        itemStyle: { color: "#6366f1" },
        smooth: true,
      },
      {
        name: "Legs",
        type: "line",
        data: [22, 22, 23, 24, 25, 25],
        itemStyle: { color: WRESTLING_RED },
        smooth: true,
      },
      {
        name: "Shoulders",
        type: "line",
        data: [14, 15, 15, 16, 16, 17],
        itemStyle: { color: "#f59e0b" },
        smooth: true,
      },
      {
        name: "Arms",
        type: "line",
        data: [16, 16, 17, 18, 18, 19],
        itemStyle: { color: "#16a34a" },
        smooth: true,
      },
    ],
  };

  // Intensity distribution of sets by rep range (mesocycle)
  const intensityDistributionData = {
    title: {
      text: "Intensity Distribution (Rep Ranges)",
      textStyle: { fontSize: 14 },
    },
    tooltip: { trigger: "item", formatter: "{b}: {c}%" },
    series: [
      {
        name: "Rep Range",
        type: "pie",
        radius: ["40%", "70%"],
        data: [
          {
            value: 22,
            name: "1-5 Strength",
            itemStyle: { color: WRESTLING_RED },
          },
          {
            value: 58,
            name: "6-12 Hypertrophy",
            itemStyle: { color: WRESTLING_BLUE },
          },
          { value: 20, name: "13+ Endurance", itemStyle: { color: "#16a34a" } },
        ],
        label: { fontSize: 11 },
      },
    ],
  };

  // RPE distribution (percentage of top sets at each RPE)
  const rpeDistributionData = {
    title: { text: "Top Set RPE Distribution", textStyle: { fontSize: 14 } },
    tooltip: { trigger: "item", formatter: "RPE {b}: {c}%" },
    series: [
      {
        type: "pie",
        radius: ["35%", "65%"],
        data: [
          { value: 5, name: "6", itemStyle: { color: "#93c5fd" } },
          { value: 15, name: "7", itemStyle: { color: "#3b82f6" } },
          { value: 30, name: "8", itemStyle: { color: "#2563eb" } },
          { value: 35, name: "9", itemStyle: { color: WRESTLING_RED } },
          { value: 15, name: "10", itemStyle: { color: "#111827" } },
        ],
        label: { fontSize: 11 },
      },
    ],
  };

  // 14-day training load vs recovery readiness (mock HRV / subjective score 0-100)
  const last14Days = Array.from({ length: 14 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (13 - i));
    return d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  });
  const readinessData = {
    title: {
      text: "Training Load vs Readiness (14 Days)",
      textStyle: { fontSize: 14 },
    },
    tooltip: { trigger: "axis" },
    legend: { data: ["Load (TLR)", "Readiness"], textStyle: { fontSize: 11 } },
    xAxis: { type: "category", data: last14Days, axisLabel: { fontSize: 10 } },
    yAxis: [
      {
        type: "value",
        name: "Load",
        min: 0,
        max: 100,
        axisLabel: { fontSize: 10 },
      },
      {
        type: "value",
        name: "Readiness",
        min: 50,
        max: 100,
        axisLabel: { fontSize: 10 },
        position: "right",
      },
    ],
    series: [
      {
        name: "Load (TLR)",
        type: "bar",
        data: [70, 72, 68, 75, 80, 77, 65, 60, 62, 70, 78, 82, 76, 74],
        itemStyle: { color: WRESTLING_BLUE },
      },
      {
        name: "Readiness",
        type: "line",
        yAxisIndex: 1,
        data: [82, 80, 79, 78, 75, 73, 80, 84, 83, 81, 78, 76, 77, 79],
        itemStyle: { color: "#f59e0b" },
        lineStyle: { width: 3 },
        smooth: true,
      },
    ],
  };

  // Explosive lower body power (estimated jump peak power W)
  const powerWeeks = ["W1", "W2", "W3", "W4", "W5", "W6"]; // reuse weeks concept
  const explosivePowerData = {
    title: {
      text: "Explosive Power (CMJ Peak W)",
      textStyle: { fontSize: 14 },
    },
    tooltip: { trigger: "axis", formatter: "{b}<br/>Power: {c} W" },
    xAxis: { type: "category", data: powerWeeks },
    yAxis: { type: "value", name: "Watts", min: 4400, max: 5050 },
    series: [
      {
        name: "Peak Power",
        type: "line",
        data: [4550, 4625, 4700, 4800, 4920, 4980],
        itemStyle: { color: "#9333ea" },
        lineStyle: { color: "#9333ea", width: 3 },
        areaStyle: { color: "#9333ea30" },
        smooth: true,
        markLine: { data: [{ yAxis: 5000, name: "Target" }] },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          Comprehensive Lifting & Cardio Metrics
        </h1>
        <div className="flex gap-2">
          <Badge
            variant="outline"
            className="bg-blue-50 text-blue-700 border-blue-200"
          >
            Current Cycle: Week 4
          </Badge>
          <Badge
            variant="outline"
            className="bg-green-50 text-green-700 border-green-200"
          >
            Peak Performance
          </Badge>
        </div>
      </div>

      {/* Strength Training Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Strength Training Metrics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">
                Bench Press Daily Max Progression
              </CardTitle>
              <CardDescription>
                Daily maximum lifts over the past 30 days
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={benchPressData}
                style={{ height: "300px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Squat Progression</CardTitle>
              <CardDescription>
                Daily squat maximums for lower body power
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={squatProgressData}
                style={{ height: "300px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Deadlift Progression</CardTitle>
              <CardDescription>
                Daily deadlift maximums for posterior chain strength
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={deadliftProgressData}
                style={{ height: "300px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Lower Body Powerlifts</CardTitle>
              <CardDescription>Squat and deadlift progression</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={lowerBodyLiftsData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Bench Press Progress</CardTitle>
              <CardDescription>
                Upper body pressing strength development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={benchProgressData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Upper Body Accessories</CardTitle>
              <CardDescription>
                Overhead press and close-grip bench progression
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={upperAccessoryData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Back & Posterior Chain</CardTitle>
              <CardDescription>
                Rowing and Romanian deadlift development
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={backAccessoryData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Cardiovascular Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Cardiovascular Performance
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">VO2 Max Development</CardTitle>
              <CardDescription>
                Aerobic capacity progression over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={vo2MaxData} style={{ height: "300px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Heart Rate Training Distribution
              </CardTitle>
              <CardDescription>
                Time spent in different heart rate zones
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={heartRateZonesData}
                style={{ height: "300px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Running & Rowing Tests</CardTitle>
              <CardDescription>
                Time-based endurance and speed tests
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={runningTestsData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Wrestling Endurance Test
              </CardTitle>
              <CardDescription>
                Sport-specific fitness benchmark progression
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={wrestlingEnduranceData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Body Composition Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Body Composition & Power
        </h2>
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                Body Composition Analysis
              </CardTitle>
              <CardDescription>
                Weight, lean mass, body fat, and power-to-weight ratio tracking
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={bodyCompositionData}
                style={{ height: "350px" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Advanced Lifting Analytics */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6">
          Advanced Lifting Analytics
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Strength Ratios</CardTitle>
              <CardDescription>
                1RM to bodyweight ratios across mesocycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={strengthRatiosData}
                style={{ height: "300px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Volume Load (Big 3)</CardTitle>
              <CardDescription>
                Stacked weekly tonnage progression
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={volumeLoadData}
                style={{ height: "300px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Hypertrophy Set Volume</CardTitle>
              <CardDescription>Working sets per muscle group</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={hypertrophySetsData}
                style={{ height: "300px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Rep Range Distribution</CardTitle>
              <CardDescription>
                Training emphasis across mesocycle
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={intensityDistributionData}
                style={{ height: "300px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">RPE Distribution</CardTitle>
              <CardDescription>Effort levels of top sets</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={rpeDistributionData}
                style={{ height: "300px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Explosive Power</CardTitle>
              <CardDescription>Countermovement jump peak power</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={explosivePowerData}
                style={{ height: "300px" }}
              />
            </CardContent>
          </Card>

          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="text-lg">Load vs Readiness</CardTitle>
              <CardDescription>Balancing stress and recovery</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={readinessData}
                style={{ height: "320px" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Performance Summary */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Bench PR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">330 lbs</div>
            <p className="text-xs text-gray-500">+15 lbs this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Squat PR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">460 lbs</div>
            <p className="text-xs text-gray-500">+20 lbs this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Deadlift PR</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">520 lbs</div>
            <p className="text-xs text-gray-500">+15 lbs this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">VO2 Max</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">53.7</div>
            <p className="text-xs text-gray-500">mL/kg/min</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Body Fat</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">13.5%</div>
            <p className="text-xs text-gray-500">Competition ready</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Power Ratio</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">1.65x</div>
            <p className="text-xs text-gray-500">Bench to bodyweight</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
