import React from "react";
import ReactECharts from "echarts-for-react";
import { ChartCard, MetricCard, SectionHeader } from "./BaseComponents";
import { AdvancedMetrics, TrendData, ChartOptions } from "../types";
import {
  TrendingUp,
  Droplets,
  Heart,
  Gauge,
  Target,
  Activity,
  BarChart3,
} from "lucide-react";

interface AdvancedChartsProps {
  advancedData: AdvancedMetrics;
  trendData: TrendData;
}

export const AdvancedCharts: React.FC<AdvancedChartsProps> = ({
  advancedData,
  trendData,
}) => {
  // Comprehensive body composition trends
  const bodyCompositionTrends: ChartOptions = {
    title: {
      text: "Multi-Metric Body Composition Trends",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "cross" },
    },
    legend: {
      data: ["Weight", "Body Fat %", "Lean Mass", "FFMI"],
      textStyle: { fontSize: 11, color: "#374151" },
    },
    xAxis: {
      type: "category",
      data: trendData.dates.map((date) =>
        new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ),
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: [
      {
        type: "value",
        name: "Weight/Lean Mass (lbs)",
        position: "left",
        axisLabel: { fontSize: 10, color: "#6b7280" },
        splitLine: { lineStyle: { color: "#f3f4f6" } },
      },
      {
        type: "value",
        name: "Body Fat % / FFMI",
        position: "right",
        axisLabel: { fontSize: 10, color: "#6b7280" },
      },
    ],
    series: [
      {
        name: "Weight",
        type: "line",
        yAxisIndex: 0,
        data: trendData.weights,
        itemStyle: { color: "#3b82f6" },
        lineStyle: { color: "#3b82f6", width: 2 },
      },
      {
        name: "Lean Mass",
        type: "line",
        yAxisIndex: 0,
        data: trendData.leanMasses,
        itemStyle: { color: "#10b981" },
        lineStyle: { color: "#10b981", width: 2 },
      },
      {
        name: "Body Fat %",
        type: "line",
        yAxisIndex: 1,
        data: trendData.bodyFatPercentages,
        itemStyle: { color: "#f59e0b" },
        lineStyle: { color: "#f59e0b", width: 2 },
      },
      {
        name: "FFMI",
        type: "line",
        yAxisIndex: 1,
        data: trendData.ffmiValues,
        itemStyle: { color: "#8b5cf6" },
        lineStyle: { color: "#8b5cf6", width: 2 },
      },
    ],
  };

  // Hydration and health indicators radar
  const healthIndicatorsRadar: ChartOptions = {
    title: {
      text: "Health & Performance Indicators",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "item",
    },
    radar: {
      indicator: [
        { name: "Hydration", max: 100 },
        { name: "Muscle Balance", max: 100 },
        { name: "Muscle Development", max: 100 },
        { name: "Metabolic Health", max: 100 },
        { name: "Body Composition", max: 100 },
      ],
      center: ["50%", "55%"],
      radius: 80,
    },
    series: [
      {
        name: "Health Scores",
        type: "radar",
        data: [
          {
            value: [
              advancedData.hydrationScore,
              advancedData.muscleBalance,
              advancedData.muscleDevelopmentScore,
              100 - Math.abs(advancedData.metabolicAge - 25) * 2, // Metabolic health score
              Math.max(0, 100 - Math.abs(advancedData.bodyAge - 25) * 3), // Body composition score
            ],
            name: "Current Scores",
            areaStyle: {
              color: "rgba(59, 130, 246, 0.2)",
            },
            lineStyle: {
              color: "#3b82f6",
              width: 2,
            },
            itemStyle: {
              color: "#3b82f6",
            },
          },
        ],
      },
    ],
  };

  // Metabolic age vs chronological age gauge
  const ageComparisonGauge: ChartOptions = {
    title: {
      text: "Metabolic vs Chronological Age",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      formatter: "Body Age: {c} years",
    },
    series: [
      {
        name: "Body Age",
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 18,
        max: 40,
        splitNumber: 11,
        itemStyle: {
          color:
            advancedData.bodyAge <= 25
              ? "#10b981"
              : advancedData.bodyAge <= 30
              ? "#f59e0b"
              : "#ef4444",
        },
        progress: {
          show: true,
          width: 15,
        },
        pointer: {
          show: false,
        },
        axisLine: {
          lineStyle: {
            width: 15,
            color: [[1, "#e5e7eb"]],
          },
        },
        axisTick: {
          distance: -20,
          splitNumber: 2,
          lineStyle: {
            width: 2,
            color: "#6b7280",
          },
        },
        splitLine: {
          distance: -25,
          length: 8,
          lineStyle: {
            width: 2,
            color: "#6b7280",
          },
        },
        axisLabel: {
          distance: -35,
          color: "#6b7280",
          fontSize: 10,
        },
        anchor: {
          show: false,
        },
        title: {
          show: false,
        },
        detail: {
          valueAnimation: true,
          fontSize: 20,
          offsetCenter: [0, "70%"],
          formatter: "{value} years",
          color: "#1f2937",
        },
        data: [
          {
            value: advancedData.bodyAge,
            name: "Body Age",
          },
        ],
      },
    ],
  };

  // Power to weight ratio trend with performance zones
  const powerToWeightTrend: ChartOptions = {
    title: {
      text: "Power-to-Weight Performance Analysis",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>P/W Ratio: {c}",
    },
    xAxis: {
      type: "category",
      data: trendData.dates.map((date) =>
        new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ),
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      name: "Power/Weight Ratio",
      min: 1.6,
      max: 2.0,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "P/W Ratio",
        type: "line",
        data: trendData.powerToWeightRatios,
        itemStyle: { color: "#8b5cf6" },
        lineStyle: { color: "#8b5cf6", width: 3 },
        symbol: "diamond",
        symbolSize: 8,
        areaStyle: { color: "rgba(139, 92, 246, 0.1)" },
        markArea: {
          itemStyle: {
            color: "rgba(16, 185, 129, 0.1)",
          },
          data: [
            [
              {
                name: "Elite Zone",
                yAxis: 1.85,
              },
              {
                yAxis: 2.0,
              },
            ],
          ],
        },
        markLine: {
          data: [
            {
              yAxis: 1.85,
              name: "Elite Performance",
              lineStyle: { color: "#10b981", type: "dashed" },
              label: { color: "#10b981", fontSize: 10 },
            },
            {
              yAxis: 1.75,
              name: "Good Performance",
              lineStyle: { color: "#f59e0b", type: "dashed" },
              label: { color: "#f59e0b", fontSize: 10 },
            },
          ],
        },
      },
    ],
  };

  // Body shape analysis (WHR, WHtR)
  const bodyShapeAnalysis: ChartOptions = {
    title: {
      text: "Body Shape Health Indicators",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: unknown[]) => {
        const param = params[0] as { name: string; value: number };
        return `${param.name}: ${param.value.toFixed(3)}`;
      },
    },
    xAxis: {
      type: "category",
      data: ["Waist-Hip Ratio", "Waist-Height Ratio"],
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      name: "Ratio",
      min: 0.4,
      max: 0.6,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Ratios",
        type: "bar",
        data: [advancedData.waistHipRatio, advancedData.waistHeightRatio],
        itemStyle: {
          color: (params: { dataIndex: number; data: number }) => {
            if (params.dataIndex === 0) {
              // WHR
              return params.data <= 0.9 ? "#10b981" : "#f59e0b";
            } else {
              // WHtR
              return params.data <= 0.5 ? "#10b981" : "#f59e0b";
            }
          },
        },
        barWidth: "50%",
        markLine: {
          data: [
            {
              yAxis: 0.9,
              name: "WHR Threshold",
              lineStyle: { color: "#f59e0b", type: "dashed" },
            },
            {
              yAxis: 0.5,
              name: "WHtR Threshold",
              lineStyle: { color: "#f59e0b", type: "dashed" },
            },
          ],
        },
      },
    ],
  };

  // Hydration status indicator
  const getHydrationColor = ():
    | "green"
    | "orange"
    | "blue"
    | "purple"
    | "red" => {
    switch (advancedData.hydrationStatus) {
      case "Normal":
        return "green";
      case "Dehydrated":
        return "orange";
      case "Overhydrated":
        return "blue";
      default:
        return "purple";
    }
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Advanced Analytics"
        description="Comprehensive health indicators and performance metrics"
        icon={<BarChart3 className="h-6 w-6" />}
      />

      {/* Advanced Health Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Hydration Status"
          value={advancedData.hydrationStatus}
          trend="stable"
          trendValue={`Score: ${advancedData.hydrationScore}/100`}
          icon={<Droplets className="h-6 w-6" />}
          colorScheme={getHydrationColor()}
        />

        <MetricCard
          title="Metabolic Age"
          value={advancedData.metabolicAge}
          unit="years"
          trend={advancedData.metabolicAge <= 25 ? "down" : "up"}
          trendValue={advancedData.metabolicAge <= 25 ? "Excellent" : "Monitor"}
          icon={<Heart className="h-6 w-6" />}
          colorScheme={advancedData.metabolicAge <= 25 ? "green" : "orange"}
        />

        <MetricCard
          title="Muscle Balance"
          value={advancedData.muscleBalance}
          unit="/100"
          trend="up"
          trendValue="+2.3 this week"
          icon={<Activity className="h-6 w-6" />}
          colorScheme="blue"
        />

        <MetricCard
          title="Strength Index"
          value={advancedData.strengthIndex.toFixed(1)}
          trend="up"
          trendValue="+1.5 this week"
          icon={<TrendingUp className="h-6 w-6" />}
          colorScheme="purple"
        />
      </div>

      {/* Body Shape Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard
          title="Waist-Hip Ratio"
          value={advancedData.waistHipRatio.toFixed(3)}
          trend={advancedData.waistHipRatio <= 0.9 ? "down" : "stable"}
          trendValue={advancedData.waistHipRatio <= 0.9 ? "Optimal" : "Monitor"}
          icon={<Target className="h-6 w-6" />}
          colorScheme={advancedData.waistHipRatio <= 0.9 ? "green" : "orange"}
        />

        <MetricCard
          title="Waist-Height Ratio"
          value={advancedData.waistHeightRatio.toFixed(3)}
          trend={advancedData.waistHeightRatio <= 0.5 ? "down" : "stable"}
          trendValue={
            advancedData.waistHeightRatio <= 0.5 ? "Optimal" : "Monitor"
          }
          icon={<Gauge className="h-6 w-6" />}
          colorScheme={
            advancedData.waistHeightRatio <= 0.5 ? "green" : "orange"
          }
        />
      </div>

      {/* Advanced Visualization Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Multi-Metric Trends"
          description="Comprehensive view of all body composition metrics over time"
        >
          <ReactECharts
            option={bodyCompositionTrends}
            style={{ height: "400px" }}
          />
        </ChartCard>

        <ChartCard
          title="Health Performance Radar"
          description="Overall health and performance indicators (0-100 scale)"
        >
          <ReactECharts
            option={healthIndicatorsRadar}
            style={{ height: "400px" }}
          />
        </ChartCard>

        <ChartCard
          title="Body Age Assessment"
          description="Metabolic age vs chronological age comparison"
        >
          <ReactECharts
            option={ageComparisonGauge}
            style={{ height: "350px" }}
          />
        </ChartCard>

        <ChartCard
          title="Body Shape Analysis"
          description="Waist ratios for cardiovascular health assessment"
        >
          <ReactECharts
            option={bodyShapeAnalysis}
            style={{ height: "350px" }}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1">
        <ChartCard
          title="Power-to-Weight Performance"
          description="Strength relative to body weight with performance zones"
        >
          <ReactECharts
            option={powerToWeightTrend}
            style={{ height: "350px" }}
          />
        </ChartCard>
      </div>
    </div>
  );
};
