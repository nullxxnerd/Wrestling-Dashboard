import React from "react";
import ReactECharts from "echarts-for-react";
import { ChartCard, MetricCard, SectionHeader } from "./BaseComponents";
import { InBodyMetrics, ChartOptions } from "../types";
import { Droplets, Activity, Zap, Heart, BarChart3 } from "lucide-react";

interface InBodyAnalysisProps {
  inbodyData: InBodyMetrics;
  historicalData?: InBodyMetrics[];
}

export const InBodyAnalysis: React.FC<InBodyAnalysisProps> = ({
  inbodyData,
  historicalData = [],
}) => {
  // Generate sample historical data if not provided
  const sampleHistoricalData =
    historicalData.length > 0
      ? historicalData
      : [
          {
            ...inbodyData,
            date: "2024-08-01",
            totalBodyWater: 43.2,
            visceralFatLevel: 8.5,
            basalMetabolicRate: 1845,
            phaseAngle: 6.8,
          },
          {
            ...inbodyData,
            date: "2024-08-15",
            totalBodyWater: 43.5,
            visceralFatLevel: 8.2,
            basalMetabolicRate: 1850,
            phaseAngle: 7.0,
          },
          {
            ...inbodyData,
            date: "2024-09-01",
            totalBodyWater: 44.1,
            visceralFatLevel: 7.8,
            basalMetabolicRate: 1860,
            phaseAngle: 7.2,
          },
          {
            ...inbodyData,
            date: "2024-09-15",
            totalBodyWater: 44.3,
            visceralFatLevel: 7.5,
            basalMetabolicRate: 1865,
            phaseAngle: 7.4,
          },
        ];

  // Body water composition chart
  const bodyWaterChart: ChartOptions = {
    title: {
      text: "Body Water Distribution",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a}<br/>{b}: {c}L ({d}%)",
    },
    series: [
      {
        name: "Water Distribution",
        type: "pie",
        radius: ["40%", "70%"],
        avoidLabelOverlap: false,
        data: [
          {
            value: inbodyData.intracellularWater,
            name: "Intracellular Water",
            itemStyle: { color: "#3b82f6" },
          },
          {
            value: inbodyData.extracellularWater,
            name: "Extracellular Water",
            itemStyle: { color: "#60a5fa" },
          },
        ],
        label: {
          show: true,
          position: "outside",
          fontSize: 11,
          formatter: "{b}\n{c}L",
        },
        labelLine: {
          show: true,
        },
      },
    ],
  };

  // Phase angle trend chart
  const phaseAngleTrend: ChartOptions = {
    title: {
      text: "Phase Angle Trend (Cellular Health)",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>Phase Angle: {c}°",
    },
    xAxis: {
      type: "category",
      data: sampleHistoricalData.map((d) =>
        new Date(d.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ),
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      name: "Phase Angle (°)",
      min: 5,
      max: 9,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Phase Angle",
        type: "line",
        data: sampleHistoricalData.map((d) => d.phaseAngle),
        itemStyle: { color: "#10b981" },
        lineStyle: { color: "#10b981", width: 3 },
        symbol: "circle",
        symbolSize: 6,
        areaStyle: { color: "rgba(16, 185, 129, 0.1)" },
        markLine: {
          data: [
            {
              yAxis: 6.5,
              name: "Good Health Threshold",
              lineStyle: { color: "#059669", type: "dashed" },
              label: { color: "#059669", fontSize: 10 },
            },
          ],
        },
      },
    ],
  };

  // Visceral fat trend
  const visceralFatTrend: ChartOptions = {
    title: {
      text: "Visceral Fat Level Trend",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>Visceral Fat: Level {c}",
    },
    xAxis: {
      type: "category",
      data: sampleHistoricalData.map((d) =>
        new Date(d.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ),
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      name: "Visceral Fat Level",
      min: 1,
      max: 20,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Visceral Fat",
        type: "bar",
        data: sampleHistoricalData.map((d) => d.visceralFatLevel),
        itemStyle: {
          color: (params: { data: number }) => {
            const value = params.data;
            if (value <= 9) return "#10b981"; // Good
            if (value <= 14) return "#f59e0b"; // Moderate
            return "#ef4444"; // High
          },
        },
        barWidth: "60%",
        markLine: {
          data: [
            {
              yAxis: 9,
              name: "Normal Range",
              lineStyle: { color: "#10b981", type: "dashed" },
            },
            {
              yAxis: 14,
              name: "High Risk",
              lineStyle: { color: "#ef4444", type: "dashed" },
            },
          ],
        },
      },
    ],
  };

  // BMR trend
  const bmrTrend: ChartOptions = {
    title: {
      text: "Basal Metabolic Rate Progression",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>BMR: {c} cal/day",
    },
    xAxis: {
      type: "category",
      data: sampleHistoricalData.map((d) =>
        new Date(d.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        })
      ),
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      name: "BMR (cal/day)",
      min: 1800,
      max: 1900,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "BMR",
        type: "line",
        data: sampleHistoricalData.map((d) => d.basalMetabolicRate),
        itemStyle: { color: "#8b5cf6" },
        lineStyle: { color: "#8b5cf6", width: 3 },
        symbol: "diamond",
        symbolSize: 8,
        areaStyle: { color: "rgba(139, 92, 246, 0.1)" },
      },
    ],
  };

  // ECW/ICW ratio gauge
  const ecwIcwGauge: ChartOptions = {
    title: {
      text: "ECW/ICW Ratio",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      formatter: "ECW/ICW Ratio: {c}",
    },
    series: [
      {
        name: "ECW/ICW",
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0.35,
        max: 0.45,
        splitNumber: 10,
        itemStyle: {
          color: "#3b82f6",
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
          formatter: "{value}",
          color: "#1f2937",
        },
        data: [
          {
            value: inbodyData.ecwIcwRatio,
            name: "Ratio",
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="InBody Analysis"
        description="Comprehensive body composition analysis using bioelectrical impedance"
        icon={<BarChart3 className="h-6 w-6" />}
      />

      {/* Key InBody Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Body Water"
          value={inbodyData.totalBodyWater.toFixed(1)}
          unit="L"
          trend="up"
          trendValue="+0.2L this week"
          icon={<Droplets className="h-6 w-6" />}
          colorScheme="blue"
        />

        <MetricCard
          title="Visceral Fat Level"
          value={inbodyData.visceralFatLevel}
          trend="down"
          trendValue="-0.3 this week"
          icon={<Activity className="h-6 w-6" />}
          colorScheme={inbodyData.visceralFatLevel <= 9 ? "green" : "orange"}
        />

        <MetricCard
          title="Phase Angle"
          value={inbodyData.phaseAngle.toFixed(1)}
          unit="°"
          trend="up"
          trendValue="+0.2° this week"
          icon={<Zap className="h-6 w-6" />}
          colorScheme="green"
        />

        <MetricCard
          title="BMR"
          value={inbodyData.basalMetabolicRate}
          unit="cal/day"
          trend="up"
          trendValue="+15 cal this week"
          icon={<Heart className="h-6 w-6" />}
          colorScheme="purple"
        />
      </div>

      {/* Advanced InBody Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCard
          title="Protein Mass"
          value={inbodyData.proteinMass.toFixed(1)}
          unit="lbs"
          trend="up"
          trendValue="+0.1 lbs"
          icon={<Activity className="h-5 w-5" />}
          colorScheme="blue"
        />

        <MetricCard
          title="Mineral Mass"
          value={inbodyData.mineralMass.toFixed(1)}
          unit="lbs"
          trend="stable"
          icon={<Activity className="h-5 w-5" />}
          colorScheme="green"
        />

        <MetricCard
          title="ECW/ICW Ratio"
          value={inbodyData.ecwIcwRatio.toFixed(3)}
          trend={inbodyData.ecwIcwRatio <= 0.38 ? "down" : "up"}
          trendValue={inbodyData.ecwIcwRatio <= 0.38 ? "Optimal" : "Monitor"}
          icon={<Droplets className="h-5 w-5" />}
          colorScheme={inbodyData.ecwIcwRatio <= 0.38 ? "green" : "orange"}
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ChartCard
          title="Body Water Distribution"
          description="Breakdown of intracellular vs extracellular water"
        >
          <ReactECharts option={bodyWaterChart} style={{ height: "300px" }} />
        </ChartCard>

        <ChartCard
          title="ECW/ICW Balance"
          description="Optimal ratio indicates good cellular health (0.35-0.39)"
        >
          <ReactECharts option={ecwIcwGauge} style={{ height: "300px" }} />
        </ChartCard>

        <ChartCard
          title="Cellular Health Progression"
          description="Phase angle indicates cellular membrane integrity"
        >
          <ReactECharts option={phaseAngleTrend} style={{ height: "300px" }} />
        </ChartCard>

        <ChartCard
          title="Visceral Fat Monitoring"
          description="Visceral fat level trend (target: ≤9)"
        >
          <ReactECharts option={visceralFatTrend} style={{ height: "300px" }} />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1">
        <ChartCard
          title="Metabolic Rate Progression"
          description="Basal metabolic rate changes over time"
        >
          <ReactECharts option={bmrTrend} style={{ height: "300px" }} />
        </ChartCard>
      </div>
    </div>
  );
};
