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
import RedBloodCellsChart from "./components/RedBloodCellsChart";
import { PlateletCountChart } from "./components/PlateletCountChart";
import { useMemo } from "react";

// Wrestling-themed colors (typical blue and red from wrestling suits)
const WRESTLING_BLUE = "#1e40af"; // Deep blue
const WRESTLING_RED = "#dc2626"; // Classic red
// Additional color constants for future use
// const WRESTLING_GREEN = "#059669";
// const WRESTLING_PURPLE = "#7c3aed";
// const WRESTLING_ORANGE = "#f59e0b";

// Enhanced chart styling for better mobile experience
const chartStyle = {
  height: "clamp(300px, 45vh, 400px)",
  width: "100%",
} as const;

// Mobile-optimized chart style
const mobileChartStyle = {
  height: "280px",
  width: "100%",
} as const;

// Common chart UX extras for better exploration on mobile
const commonChartUX = {
  toolbox: {
    right: 10,
    feature: {
      saveAsImage: { title: "Save Chart" },
      dataZoom: { title: { zoom: "Zoom", back: "Reset Zoom" } },
      restore: { title: "Restore" },
    },
    iconStyle: {
      borderWidth: 0,
      color: "#666",
    },
  },
  dataZoom: [
    {
      type: "inside",
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
      moveOnMouseWheel: false,
    },
    {
      type: "slider",
      height: 12,
      bottom: 0,
      borderColor: "#ddd",
      fillerColor: "rgba(30, 64, 175, 0.2)",
      handleStyle: {
        color: "#1e40af",
      },
    },
  ],
  animation: true,
  animationDuration: 750,
  animationEasing: "cubicOut",
}; // Enhanced mobile-first chart configuration
const getCommonChartConfig = (isMobile = false) => ({
  responsive: true,
  maintainAspectRatio: false,
  toolbox: {
    show: !isMobile,
    right: 10,
    top: 10,
    feature: {
      saveAsImage: { title: "Save" },
      dataZoom: { title: { zoom: "Zoom", back: "Reset" } },
    },
  },
  dataZoom: [
    {
      type: "inside",
      start: 0,
      end: 100,
      zoomOnMouseWheel: true,
      moveOnMouseMove: true,
    },
    {
      type: "slider",
      height: isMobile ? 8 : 12,
      bottom: 0,
      show: !isMobile,
    },
  ],
  grid: {
    left: isMobile ? "10%" : "5%",
    right: isMobile ? "10%" : "5%",
    bottom: isMobile ? "15%" : "10%",
    top: isMobile ? "20%" : "15%",
    containLabel: true,
  },
});

// Section separator component
const SectionSeparator = ({
  title,
  description,
  color = "blue",
}: {
  title: string;
  description?: string;
  color?: "blue" | "red" | "green" | "purple" | "orange";
}) => {
  const colorClasses = {
    blue: "from-blue-500 to-blue-300",
    red: "from-red-500 to-red-300",
    green: "from-green-500 to-green-300",
    purple: "from-purple-500 to-purple-300",
    orange: "from-orange-500 to-orange-300",
  };

  return (
    <div className="mb-8 sm:mb-10">
      <div className="mb-4">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight mb-2">
          {title}
        </h2>
        {description && (
          <p className="text-sm sm:text-base text-gray-600 mb-3">
            {description}
          </p>
        )}
        <div
          className={`h-1 bg-gradient-to-r ${colorClasses[color]} to-transparent w-full rounded-full`}
        ></div>
      </div>
    </div>
  );
};

export default function BloodworkPage() {
  // Individual Blood Cell Count Charts
  const wbcData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
      confine: true,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      borderColor: "#333",
      textStyle: {
        color: "#fff",
        fontSize: 12,
      },
    },
    grid: {
      left: "8%",
      right: "8%",
      bottom: "15%",
      top: "20%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Cells (×10³/μL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "White Blood Cells",
        type: "line",
        data: [6.8, 7.2, 6.9, 7.1, 6.7, 7.0],
        lineStyle: {
          color: WRESTLING_BLUE,
          width: 3,
        },
        itemStyle: {
          color: WRESTLING_BLUE,
        },
        smooth: true,
      },
    ],
    ...commonChartUX,
  };

  const hemoglobinData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Hemoglobin (g/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Hemoglobin",
        type: "line",
        data: [15.2, 15.8, 15.1, 15.5, 15.6, 15.4],
        lineStyle: {
          color: "#059669",
          width: 3,
        },
        itemStyle: {
          color: "#059669",
        },
        smooth: true,
      },
    ],
    ...commonChartUX,
  };

  const hematocritData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Hematocrit (%)",
      axisLabel: {
        formatter: "{value}%",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Hematocrit",
        type: "line",
        data: [44.2, 45.1, 43.8, 44.7, 45.0, 44.5],
        lineStyle: {
          color: "#7c3aed",
          width: 3,
        },
        itemStyle: {
          color: "#7c3aed",
        },
        smooth: true,
      },
    ],
    ...commonChartUX,
  };

  // Individual Metabolic Panel Charts
  const glucoseData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Glucose (mg/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Glucose",
        type: "line",
        data: [89, 92, 87, 91, 88, 90],
        lineStyle: {
          color: "#f59e0b",
          width: 3,
        },
        itemStyle: {
          color: "#f59e0b",
        },
        smooth: true,
      },
    ],
    ...commonChartUX,
  };

  // Lightweight insights from visible series
  const getTrend = (arr: number[]) => arr.at(-1)! - arr[0] || 0;
  const getAvg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;
  const toPct = (delta: number, base: number) =>
    base ? (delta / base) * 100 : 0;

  const insights = useMemo(() => {
    const wbc = wbcData.series[0].data as number[];
    const hgb = hemoglobinData.series[0].data as number[];
    const hct = hematocritData.series[0].data as number[];
    const glu = glucoseData.series[0].data as number[];

    const wbcDelta = getTrend(wbc);
    const hgbDelta = getTrend(hgb);
    const hctDelta = getTrend(hct);
    const gluDelta = getTrend(glu);

    const messages: { label: string; tone: "good" | "warn" | "info" }[] = [];
    if (Math.abs(hgbDelta) < 0.6)
      messages.push({
        label: "Hemoglobin stable (oxygen delivery steady)",
        tone: "good",
      });
    if (gluDelta < 0)
      messages.push({
        label: "Glucose trending down (good glycemic control)",
        tone: "good",
      });
    if (wbcDelta > 0.5)
      messages.push({
        label: "WBC trending up (monitor recovery/inflammation)",
        tone: "warn",
      });
    if (hctDelta > 0.8)
      messages.push({
        label: "Hematocrit slightly rising (watch hydration)",
        tone: "warn",
      });

    return {
      wbc: { last: wbc.at(-1), avg: getAvg(wbc), delta: wbcDelta },
      hgb: { last: hgb.at(-1), avg: getAvg(hgb), delta: hgbDelta },
      hct: { last: hct.at(-1), avg: getAvg(hct), delta: hctDelta },
      glu: { last: glu.at(-1), avg: getAvg(glu), delta: gluDelta },
      messages,
    };
  }, [
    wbcData.series,
    hemoglobinData.series,
    hematocritData.series,
    glucoseData.series,
  ]);

  const bunData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "BUN (mg/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "BUN",
        type: "line",
        data: [18, 19, 17, 18, 19, 18],
        lineStyle: {
          color: "#06b6d4",
          width: 3,
        },
        itemStyle: {
          color: "#06b6d4",
        },
        smooth: true,
      },
    ],
  };

  const creatinineData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Creatinine (mg/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Creatinine",
        type: "line",
        data: [1.1, 1.2, 1.0, 1.1, 1.2, 1.1],
        lineStyle: {
          color: "#8b5cf6",
          width: 3,
        },
        itemStyle: {
          color: "#8b5cf6",
        },
        smooth: true,
      },
    ],
  };

  const egfrData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "eGFR (mL/min/1.73m²)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "eGFR",
        type: "line",
        data: [95, 93, 97, 94, 96, 95],
        lineStyle: {
          color: "#10b981",
          width: 3,
        },
        itemStyle: {
          color: "#10b981",
        },
        smooth: true,
      },
    ],
  };

  // Individual Hormone Charts
  const totalTestosteroneData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Total Testosterone (ng/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Total Testosterone",
        type: "line",
        data: [685, 720, 695, 710, 725, 705],
        lineStyle: {
          color: WRESTLING_BLUE,
          width: 3,
        },
        itemStyle: {
          color: WRESTLING_BLUE,
        },
        smooth: true,
      },
    ],
  };

  const freeTestosteroneData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Free Testosterone (pg/mL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Free Testosterone",
        type: "line",
        data: [18.2, 19.1, 18.5, 18.8, 19.3, 18.9],
        lineStyle: {
          color: WRESTLING_RED,
          width: 3,
        },
        itemStyle: {
          color: WRESTLING_RED,
        },
        smooth: true,
      },
    ],
  };

  const lhData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "LH (mIU/mL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "LH",
        type: "line",
        data: [4.2, 4.5, 4.1, 4.3, 4.6, 4.4],
        lineStyle: {
          color: "#059669",
          width: 3,
        },
        itemStyle: {
          color: "#059669",
        },
        smooth: true,
      },
    ],
  };

  const fshData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "FSH (mIU/mL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "FSH",
        type: "line",
        data: [3.1, 3.3, 2.9, 3.2, 3.4, 3.1],
        lineStyle: {
          color: "#7c3aed",
          width: 3,
        },
        itemStyle: {
          color: "#7c3aed",
        },
        smooth: true,
      },
    ],
  };

  // Individual Lipid Panel Charts
  const totalCholesterolData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Total Cholesterol (mg/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Total Cholesterol",
        type: "line",
        data: [185, 190, 182, 188, 192, 187],
        lineStyle: {
          color: "#f59e0b",
          width: 3,
        },
        itemStyle: {
          color: "#f59e0b",
        },
        smooth: true,
      },
    ],
  };

  const ldlData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "LDL Cholesterol (mg/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "LDL",
        type: "line",
        data: [108, 112, 105, 110, 115, 109],
        lineStyle: {
          color: WRESTLING_RED,
          width: 3,
        },
        itemStyle: {
          color: WRESTLING_RED,
        },
        smooth: true,
      },
    ],
  };

  const hdlData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "HDL Cholesterol (mg/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "HDL",
        type: "line",
        data: [52, 55, 51, 53, 56, 54],
        lineStyle: {
          color: "#10b981",
          width: 3,
        },
        itemStyle: {
          color: "#10b981",
        },
        smooth: true,
      },
    ],
  };

  const triglyceridesData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Triglycerides (mg/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Triglycerides",
        type: "line",
        data: [125, 130, 122, 128, 135, 127],
        lineStyle: {
          color: "#8b5cf6",
          width: 3,
        },
        itemStyle: {
          color: "#8b5cf6",
        },
        smooth: true,
      },
    ],
  };

  // Individual Thyroid Charts
  const t3Data = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "T3 (ng/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "T3",
        type: "line",
        data: [145, 148, 142, 146, 150, 147],
        lineStyle: {
          color: "#06b6d4",
          width: 3,
        },
        itemStyle: {
          color: "#06b6d4",
        },
        smooth: true,
      },
    ],
  };

  const freeT4Data = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Free T4 (ng/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Free T4",
        type: "line",
        data: [1.35, 1.38, 1.32, 1.36, 1.4, 1.37],
        lineStyle: {
          color: "#f59e0b",
          width: 3,
        },
        itemStyle: {
          color: "#f59e0b",
        },
        smooth: true,
      },
    ],
  };

  // Individual Vitamin & Mineral Charts
  const vitaminDData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Vitamin D (ng/mL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Vitamin D",
        type: "line",
        data: [32, 35, 30, 33, 36, 34],
        lineStyle: {
          color: "#f59e0b",
          width: 3,
        },
        itemStyle: {
          color: "#f59e0b",
        },
        smooth: true,
      },
    ],
  };

  const vitaminB12Data = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Vitamin B12 (pg/mL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Vitamin B12",
        type: "line",
        data: [485, 520, 465, 495, 535, 510],
        lineStyle: {
          color: WRESTLING_RED,
          width: 3,
        },
        itemStyle: {
          color: WRESTLING_RED,
        },
        smooth: true,
      },
    ],
  };

  const folateData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Folate (ng/mL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Folate",
        type: "line",
        data: [12.5, 13.2, 11.8, 12.8, 13.5, 12.9],
        lineStyle: {
          color: "#10b981",
          width: 3,
        },
        itemStyle: {
          color: "#10b981",
        },
        smooth: true,
      },
    ],
  };

  const ironData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Iron (μg/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Iron",
        type: "line",
        data: [105, 110, 102, 108, 112, 107],
        lineStyle: {
          color: "#8b5cf6",
          width: 3,
        },
        itemStyle: {
          color: "#8b5cf6",
        },
        smooth: true,
      },
    ],
  };

  const ferritinData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Ferritin (ng/mL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Ferritin",
        type: "line",
        data: [185, 195, 178, 188, 202, 192],
        lineStyle: {
          color: "#f97316",
          width: 3,
        },
        itemStyle: {
          color: "#f97316",
        },
        smooth: true,
      },
    ],
  };

  // Individual Inflammatory Marker Charts
  const crpData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "CRP (mg/L)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "CRP",
        type: "line",
        data: [0.8, 1.2, 0.6, 0.9, 1.1, 0.7],
        lineStyle: {
          color: "#ef4444",
          width: 3,
        },
        itemStyle: {
          color: "#ef4444",
        },
        smooth: true,
      },
    ],
  };

  const esrData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "ESR (mm/hr)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "ESR",
        type: "line",
        data: [8, 12, 6, 9, 11, 7],
        lineStyle: {
          color: "#f97316",
          width: 3,
        },
        itemStyle: {
          color: "#f97316",
        },
        smooth: true,
      },
    ],
  };

  const il6Data = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "IL-6 (pg/mL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "IL-6",
        type: "line",
        data: [2.1, 2.8, 1.9, 2.3, 2.6, 2.2],
        lineStyle: {
          color: "#8b5cf6",
          width: 3,
        },
        itemStyle: {
          color: "#8b5cf6",
        },
        smooth: true,
      },
    ],
  };

  const tnfAlphaData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "TNF-α (pg/mL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "TNF-α",
        type: "line",
        data: [3.2, 3.8, 2.9, 3.4, 3.6, 3.1],
        lineStyle: {
          color: "#06b6d4",
          width: 3,
        },
        itemStyle: {
          color: "#06b6d4",
        },
        smooth: true,
      },
    ],
  };

  // Individual Urine Analysis Charts
  const specificGravityData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Specific Gravity",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Specific Gravity",
        type: "line",
        data: [1.02, 1.025, 1.018, 1.022, 1.027, 1.023],
        lineStyle: {
          color: "#06b6d4",
          width: 3,
        },
        itemStyle: {
          color: "#06b6d4",
        },
        smooth: true,
      },
    ],
  };

  const urineProteinData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Protein (mg/dL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Protein",
        type: "line",
        data: [5, 8, 3, 6, 9, 4],
        lineStyle: {
          color: "#10b981",
          width: 3,
        },
        itemStyle: {
          color: "#10b981",
        },
        smooth: true,
      },
    ],
  };

  const urineCreatinineData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Creatinine (g/24h)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Urine Creatinine",
        type: "line",
        data: [1.8, 1.9, 1.7, 1.8, 2.0, 1.9],
        lineStyle: {
          color: "#8b5cf6",
          width: 3,
        },
        itemStyle: {
          color: "#8b5cf6",
        },
        smooth: true,
      },
    ],
  };

  // Platelet count chart
  const plateletData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "Platelets (×10³/μL)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "Platelets",
        type: "line",
        data: [285, 310, 295, 325, 305, 315],
        lineStyle: {
          color: "#f59e0b",
          width: 3,
        },
        itemStyle: {
          color: "#f59e0b",
        },
        smooth: true,
      },
    ],
  };

  // TSH levels chart
  const tshData = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
      },
    },
    grid: {
      left: "5%",
      right: "5%",
      bottom: "10%",
      top: "15%",
      containLabel: true,
    },
    xAxis: {
      type: "category",
      data: [
        "Jan 2024",
        "Feb 2024",
        "Mar 2024",
        "Apr 2024",
        "May 2024",
        "Jun 2024",
      ],
      axisLabel: {
        fontSize: 11,
        color: "#666",
      },
    },
    yAxis: {
      type: "value",
      name: "TSH (mIU/L)",
      axisLabel: {
        formatter: "{value}",
        fontSize: 11,
        color: "#666",
      },
      nameTextStyle: {
        fontSize: 11,
        color: "#666",
      },
    },
    series: [
      {
        name: "TSH",
        type: "line",
        data: [2.1, 2.3, 2.0, 2.2, 2.4, 2.1],
        lineStyle: {
          color: WRESTLING_BLUE,
          width: 3,
        },
        itemStyle: {
          color: WRESTLING_BLUE,
        },
        smooth: true,
      },
    ],
  };

  return (
    <div className="max-w-screen-2xl mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Enhanced Header Section */}
      <div className="text-center sm:text-left">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-2">
              🩸 Comprehensive Lab Analysis
            </h1>
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              Wrestling Performance Biomarkers & Health Intelligence
            </p>
          </div>
          <div className="flex flex-wrap gap-2 justify-center sm:justify-end">
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200 text-sm font-semibold px-3 py-1"
            >
              📅 Last Updated: June 2024
            </Badge>
            <Badge
              variant="outline"
              className="bg-green-50 text-green-700 border-green-200 text-sm font-semibold px-3 py-1"
            >
              ✅ All Normal Ranges
            </Badge>
          </div>
        </div>
        <div className="h-1 bg-gradient-to-r from-blue-600 via-purple-500 to-green-500 w-full rounded-full mb-2"></div>
        <p className="text-sm text-gray-500 font-medium">
          Real-time biomarker tracking for optimal performance, recovery, and
          health management
        </p>
      </div>

      {/* Quick Navigation */}
      <div className="mb-8">
        <Card className="bg-gradient-to-r from-gray-50 to-white border-2 border-gray-200">
          <CardContent className="p-4">
            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
              <a
                href="#insights"
                className="bg-blue-100 hover:bg-blue-200 text-blue-800 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                📊 Insights
              </a>
              <a
                href="#cbc"
                className="bg-red-100 hover:bg-red-200 text-red-800 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                🩸 Blood Count
              </a>
              <a
                href="#metabolic"
                className="bg-green-100 hover:bg-green-200 text-green-800 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                🧪 Metabolic Panel
              </a>
              <a
                href="#hormones"
                className="bg-purple-100 hover:bg-purple-200 text-purple-800 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                💪 Hormones
              </a>
              <a
                href="#lipids"
                className="bg-indigo-100 hover:bg-indigo-200 text-indigo-800 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                🫀 Lipids
              </a>
              <a
                href="#thyroid"
                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-800 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                ⚡ Thyroid
              </a>
              <a
                href="#vitamins"
                className="bg-orange-100 hover:bg-orange-200 text-orange-800 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                🍊 Vitamins
              </a>
              <a
                href="#inflammation"
                className="bg-pink-100 hover:bg-pink-200 text-pink-800 px-3 py-2 rounded-full text-sm font-medium transition-colors"
              >
                🔥 Inflammation
              </a>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enhanced Insights & AI Coach Section */}
      <div id="insights" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 shadow-lg border-l-4 border-l-blue-500">
          <CardHeader className="pb-4 bg-gradient-to-r from-blue-50 to-transparent">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              🔍 Quick Insights
            </CardTitle>
            <CardDescription className="text-sm font-medium text-gray-600">
              Auto-summarized trends from recent biomarker data
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-4">
            {/* Insight Badges */}
            <div className="overflow-x-auto">
              <div className="flex flex-wrap gap-2 min-w-fit pb-2">
                {insights.messages.map((m, i) => (
                  <Badge
                    key={i}
                    variant="outline"
                    className={`
                      text-xs font-semibold px-3 py-2 whitespace-nowrap
                      ${
                        m.tone === "good"
                          ? "bg-green-50 text-green-700 border-green-300 shadow-sm"
                          : m.tone === "warn"
                          ? "bg-amber-50 text-amber-700 border-amber-300 shadow-sm"
                          : "bg-blue-50 text-blue-700 border-blue-300 shadow-sm"
                      }
                    `}
                  >
                    {m.tone === "good" && "✅ "}
                    {m.tone === "warn" && "⚠️ "}
                    {m.tone === "info" && "ℹ️ "}
                    {m.label}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Key Metrics Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  WBC
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {insights.wbc.last}
                </div>
                <div className="text-xs text-gray-500 font-medium">×10³/µL</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Hemoglobin
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {insights.hgb.last}
                </div>
                <div className="text-xs text-gray-500 font-medium">g/dL</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Hematocrit
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {insights.hct.last}%
                </div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                  Glucose
                </div>
                <div className="text-lg sm:text-xl font-bold text-gray-900">
                  {insights.glu.last}
                </div>
                <div className="text-xs text-gray-500 font-medium">mg/dL</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-lg border-l-4 border-l-green-500">
          <CardHeader className="pb-4 bg-gradient-to-r from-green-50 to-transparent">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
              🤖 AI Coach
            </CardTitle>
            <CardDescription className="text-sm font-medium text-gray-600">
              Personalized recommendations for optimal performance
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <ul className="list-disc pl-5 space-y-2 text-sm">
              <li>
                Prioritize hydration today to stabilize hematocrit; target
                +0.5–1L water with electrolytes across sessions.
              </li>
              <li>
                Keep pre-practice carbs ~25–35g; fasting glucose looks well
                managed.
              </li>
              <li>
                Add vitamin C + omega-3 on high-volume days to moderate WBC
                uptick.
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Complete Blood Count (CBC) Section */}
      <div id="cbc" className="mb-12">
        <SectionSeparator
          title="🩸 Complete Blood Count (CBC)"
          description="Essential blood cell counts and immune system markers for athletic performance"
          color="red"
        />

        {/* CBC Key Insights */}
        <div className="mb-8">
          <Card className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-l-red-500">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg font-bold text-red-800 flex items-center gap-2">
                🔍 CBC Key Insights
              </CardTitle>
              <CardDescription className="text-sm text-red-600 font-medium">
                Current blood cell analysis and performance implications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Current Values Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-white/70 rounded-lg border border-red-200">
                  <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">
                    WBC
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {insights.wbc.last}
                  </div>
                  <div className="text-xs text-gray-600">×10³/µL</div>
                  <div className="text-xs mt-1 font-medium text-green-600">
                    Normal Range
                  </div>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg border border-red-200">
                  <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">
                    RBC
                  </div>
                  <div className="text-lg font-bold text-gray-900">4.8</div>
                  <div className="text-xs text-gray-600">×10⁶/µL</div>
                  <div className="text-xs mt-1 font-medium text-green-600">
                    Optimal
                  </div>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg border border-red-200">
                  <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">
                    Hemoglobin
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {insights.hgb.last}
                  </div>
                  <div className="text-xs text-gray-600">g/dL</div>
                  <div className="text-xs mt-1 font-medium text-green-600">
                    Excellent
                  </div>
                </div>
                <div className="text-center p-3 bg-white/70 rounded-lg border border-red-200">
                  <div className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-1">
                    Hematocrit
                  </div>
                  <div className="text-lg font-bold text-gray-900">
                    {insights.hct.last}%
                  </div>
                  <div className="text-xs mt-1 font-medium text-green-600">
                    Good
                  </div>
                </div>
              </div>

              {/* CBC Insights */}
              <div className="bg-white/50 p-4 rounded-lg border border-red-200">
                <h4 className="font-semibold text-gray-900 mb-2 text-sm">
                  🎯 Performance Analysis:
                </h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>
                      <strong>Oxygen Delivery:</strong> Hemoglobin at{" "}
                      {insights.hgb.last} g/dL indicates excellent
                      oxygen-carrying capacity for endurance performance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">✓</span>
                    <span>
                      <strong>Blood Volume:</strong> Hematocrit at{" "}
                      {insights.hct.last}% suggests optimal blood thickness for
                      circulation and performance.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-500 mt-0.5">ℹ</span>
                    <span>
                      <strong>Immune Status:</strong> WBC count at{" "}
                      {insights.wbc.last}×10³/µL indicates healthy immune
                      function with no signs of overtraining.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-500 mt-0.5">⚠</span>
                    <span>
                      <strong>Recommendation:</strong> Monitor hydration closely
                      during intense training to maintain optimal hematocrit
                      levels.
                    </span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                White Blood Cells
              </CardTitle>
              <CardDescription>Immune system cell count</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={wbcData} style={chartStyle} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Red Blood Cells
              </CardTitle>
              <CardDescription>Oxygen transport cell count</CardDescription>
            </CardHeader>
            <CardContent>
              <RedBloodCellsChart />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Hemoglobin
              </CardTitle>
              <CardDescription>Oxygen-carrying protein</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={hemoglobinData} style={chartStyle} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Hematocrit
              </CardTitle>
              <CardDescription>Blood volume percentage</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={hematocritData} style={chartStyle} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Platelet Count
              </CardTitle>
              <CardDescription>Blood clotting capability</CardDescription>
            </CardHeader>
            <CardContent>
              <PlateletCountChart />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Comprehensive Metabolic Panel (CMP) Section */}
      <div id="metabolic" className="mb-12">
        <SectionSeparator
          title="🧪 Comprehensive Metabolic Panel (CMP)"
          description="Kidney function, blood sugar, and electrolyte balance assessment"
          color="green"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Glucose</CardTitle>
              <CardDescription>Blood sugar levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={glucoseData} style={chartStyle} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                BUN (Blood Urea Nitrogen)
              </CardTitle>
              <CardDescription>Kidney function marker</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={bunData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Creatinine</CardTitle>
              <CardDescription>Muscle breakdown product</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={creatinineData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">eGFR</CardTitle>
              <CardDescription>
                Estimated glomerular filtration rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={egfrData} style={{ height: "280px" }} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hormone Panel Section */}
      <div id="hormones" className="mb-12">
        <SectionSeparator
          title="💪 Hormone Panel"
          description="Testosterone, LH, FSH levels crucial for strength and recovery"
          color="purple"
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Total Testosterone</CardTitle>
              <CardDescription>Primary male hormone levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={totalTestosteroneData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Free Testosterone</CardTitle>
              <CardDescription>Bioavailable testosterone</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={freeTestosteroneData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                LH (Luteinizing Hormone)
              </CardTitle>
              <CardDescription>Reproductive hormone regulation</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={lhData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                FSH (Follicle Stimulating Hormone)
              </CardTitle>
              <CardDescription>Reproductive function marker</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={fshData} style={{ height: "280px" }} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Lipid Panel Section */}
      <div id="lipids" className="mb-12">
        <SectionSeparator
          title="🫀 Lipid Panel"
          description="Cholesterol and cardiovascular health markers for athlete wellness"
          color="purple"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Total Cholesterol
              </CardTitle>
              <CardDescription>Overall cholesterol levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={totalCholesterolData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                LDL Cholesterol
              </CardTitle>
              <CardDescription>
                &ldquo;Bad&rdquo; cholesterol levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={ldlData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                HDL Cholesterol
              </CardTitle>
              <CardDescription>
                &ldquo;Good&rdquo; cholesterol levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={hdlData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Triglycerides
              </CardTitle>
              <CardDescription>Blood fat levels</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={triglyceridesData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Thyroid Function Section */}
      <div id="thyroid" className="mb-12">
        <SectionSeparator
          title="⚡ Thyroid Function Panel"
          description="TSH, T3, T4 levels affecting metabolism and energy regulation"
          color="purple"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">TSH</CardTitle>
              <CardDescription>Thyroid stimulating hormone</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={tshData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                T3 (Triiodothyronine)
              </CardTitle>
              <CardDescription>Active thyroid hormone</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={t3Data} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Free T4</CardTitle>
              <CardDescription>Unbound thyroid hormone</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={freeT4Data} style={{ height: "280px" }} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Vitamins & Minerals Section */}
      <div id="vitamins" className="mb-12">
        <SectionSeparator
          title="🍊 Vitamins & Minerals Panel"
          description="Essential micronutrients for optimal athletic performance and recovery"
          color="orange"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Vitamin D</CardTitle>
              <CardDescription>Bone health and immunity</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={vitaminDData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Vitamin B12
              </CardTitle>
              <CardDescription>Energy metabolism support</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={vitaminB12Data}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Folate</CardTitle>
              <CardDescription>Cell division and DNA synthesis</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={folateData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Iron</CardTitle>
              <CardDescription>Oxygen transport mineral</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={ironData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Ferritin</CardTitle>
              <CardDescription>Iron storage protein</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={ferritinData} style={{ height: "280px" }} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Inflammatory Markers Section */}
      <div id="inflammation" className="mb-12">
        <SectionSeparator
          title="🔥 Inflammatory Markers"
          description="CRP, ESR, IL-6, and TNF-α levels for recovery monitoring"
          color="red"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                CRP (C-Reactive Protein)
              </CardTitle>
              <CardDescription>General inflammation marker</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={crpData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">ESR</CardTitle>
              <CardDescription>Erythrocyte sedimentation rate</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={esrData} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">IL-6</CardTitle>
              <CardDescription>
                Interleukin-6 inflammation marker
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={il6Data} style={{ height: "280px" }} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">TNF-α</CardTitle>
              <CardDescription>Tumor necrosis factor alpha</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts option={tnfAlphaData} style={{ height: "280px" }} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Urine Analysis Section */}
      <div className="mb-12">
        <div className="mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 tracking-tight mb-2">
            Urine Analysis
          </h2>
          <div className="h-0.5 bg-gradient-to-r from-cyan-500 to-transparent w-full"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Specific Gravity
              </CardTitle>
              <CardDescription>Hydration status indicator</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={specificGravityData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">Protein</CardTitle>
              <CardDescription>Kidney function marker</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={urineProteinData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl font-semibold">
                Creatinine (Urine)
              </CardTitle>
              <CardDescription>Muscle metabolism waste product</CardDescription>
            </CardHeader>
            <CardContent>
              <ReactECharts
                option={urineCreatinineData}
                style={{ height: "280px" }}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold tracking-wide">
              Overall Health Score
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">94/100</div>
            <p className="text-xs text-gray-500">Excellent status</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold tracking-wide">
              Testosterone Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">735 ng/dL</div>
            <p className="text-xs text-gray-500">High normal range</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold tracking-wide">
              Recovery Index
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">92%</div>
            <p className="text-xs text-gray-500">Low inflammation</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-semibold tracking-wide">
              Hydration Level
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">Optimal</div>
            <p className="text-xs text-gray-500">SG: 1.020</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
