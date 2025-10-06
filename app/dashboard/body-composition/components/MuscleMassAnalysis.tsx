import React from "react";
import ReactECharts from "echarts-for-react";
import { ChartCard, MetricCard, SectionHeader } from "./BaseComponents";
import { SegmentalMuscleAnalysis, ChartOptions } from "../types";
import { Activity, Target, TrendingUp, User, Zap } from "lucide-react";

interface MuscleMassAnalysisProps {
  segmentalData: SegmentalMuscleAnalysis;
  historicalData?: SegmentalMuscleAnalysis[];
}

export const MuscleMassAnalysis: React.FC<MuscleMassAnalysisProps> = ({
  segmentalData,
  historicalData = [],
}) => {
  // Generate sample historical data if not provided
  const sampleHistoricalData =
    historicalData.length > 0
      ? historicalData
      : [
          {
            ...segmentalData,
            date: "2024-08-01",
            rightArm: 16.2,
            leftArm: 15.9,
            trunk: 65.8,
            rightLeg: 25.4,
            leftLeg: 25.1,
            rightArmQuality: 92,
            leftArmQuality: 91,
            trunkQuality: 94,
            rightLegQuality: 93,
            leftLegQuality: 92,
          },
          {
            ...segmentalData,
            date: "2024-08-15",
            rightArm: 16.4,
            leftArm: 16.1,
            trunk: 66.2,
            rightLeg: 25.7,
            leftLeg: 25.4,
            rightArmQuality: 93,
            leftArmQuality: 92,
            trunkQuality: 95,
            rightLegQuality: 94,
            leftLegQuality: 93,
          },
          {
            ...segmentalData,
            date: "2024-09-01",
            rightArm: 16.6,
            leftArm: 16.3,
            trunk: 66.5,
            rightLeg: 26.0,
            leftLeg: 25.7,
            rightArmQuality: 94,
            leftArmQuality: 93,
            trunkQuality: 96,
            rightLegQuality: 95,
            leftLegQuality: 94,
          },
          {
            ...segmentalData,
            date: "2024-09-15",
            rightArm: 16.8,
            leftArm: 16.5,
            trunk: 66.8,
            rightLeg: 26.2,
            leftLeg: 25.9,
            rightArmQuality: 95,
            leftArmQuality: 94,
            trunkQuality: 97,
            rightLegQuality: 96,
            leftLegQuality: 95,
          },
        ];

  // Muscle mass distribution radar chart
  const muscleDistributionRadar: ChartOptions = {
    title: {
      text: "Segmental Muscle Mass Distribution",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "item",
    },
    radar: {
      indicator: [
        { name: "Right Arm", max: 20 },
        { name: "Left Arm", max: 20 },
        { name: "Trunk", max: 80 },
        { name: "Right Leg", max: 30 },
        { name: "Left Leg", max: 30 },
      ],
      center: ["50%", "55%"],
      radius: 80,
    },
    series: [
      {
        name: "Muscle Mass",
        type: "radar",
        data: [
          {
            value: [
              segmentalData.rightArm,
              segmentalData.leftArm,
              segmentalData.trunk,
              segmentalData.rightLeg,
              segmentalData.leftLeg,
            ],
            name: "Current (lbs)",
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

  // Muscle quality radar chart
  const muscleQualityRadar: ChartOptions = {
    title: {
      text: "Muscle Quality Scores",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "item",
    },
    radar: {
      indicator: [
        { name: "Right Arm", max: 100 },
        { name: "Left Arm", max: 100 },
        { name: "Trunk", max: 100 },
        { name: "Right Leg", max: 100 },
        { name: "Left Leg", max: 100 },
      ],
      center: ["50%", "55%"],
      radius: 80,
    },
    series: [
      {
        name: "Quality Score",
        type: "radar",
        data: [
          {
            value: [
              segmentalData.rightArmQuality,
              segmentalData.leftArmQuality,
              segmentalData.trunkQuality,
              segmentalData.rightLegQuality,
              segmentalData.leftLegQuality,
            ],
            name: "Quality (0-100)",
            areaStyle: {
              color: "rgba(16, 185, 129, 0.2)",
            },
            lineStyle: {
              color: "#10b981",
              width: 2,
            },
            itemStyle: {
              color: "#10b981",
            },
          },
        ],
      },
    ],
  };

  // Muscle symmetry analysis
  const muscleSymmetryChart: ChartOptions = {
    title: {
      text: "Muscle Symmetry Analysis",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      formatter: (params: unknown[]) => {
        const param = params[0] as { name: string; value: number };
        const ratio = param.value;
        const balance = Math.abs(1 - ratio) * 100;
        return `${param.name}<br/>Ratio: ${ratio.toFixed(
          3
        )}<br/>Imbalance: ${balance.toFixed(1)}%`;
      },
    },
    xAxis: {
      type: "category",
      data: ["Arms", "Legs"],
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      name: "Right/Left Ratio",
      min: 0.95,
      max: 1.05,
      axisLabel: {
        fontSize: 10,
        color: "#6b7280",
        formatter: "{value}",
      },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Symmetry",
        type: "bar",
        data: [segmentalData.armSymmetry, segmentalData.legSymmetry],
        itemStyle: {
          color: (params: { data: number }) => {
            const ratio = params.data;
            const imbalance = Math.abs(1 - ratio);
            if (imbalance <= 0.02) return "#10b981"; // Good balance (≤2%)
            if (imbalance <= 0.05) return "#f59e0b"; // Moderate imbalance (2-5%)
            return "#ef4444"; // High imbalance (>5%)
          },
        },
        barWidth: "50%",
        markLine: {
          data: [
            {
              yAxis: 1.0,
              name: "Perfect Balance",
              lineStyle: { color: "#10b981", type: "dashed" },
            },
            {
              yAxis: 0.98,
              name: "-2%",
              lineStyle: { color: "#f59e0b", type: "dotted" },
            },
            {
              yAxis: 1.02,
              name: "+2%",
              lineStyle: { color: "#f59e0b", type: "dotted" },
            },
          ],
        },
      },
    ],
  };

  // Segmental muscle progression
  const muscleProgressionChart: ChartOptions = {
    title: {
      text: "Muscle Mass Progression by Segment",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
    },
    legend: {
      data: ["Right Arm", "Left Arm", "Trunk", "Right Leg", "Left Leg"],
      textStyle: { fontSize: 11, color: "#374151" },
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
      name: "Muscle Mass (lbs)",
      axisLabel: { fontSize: 10, color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Right Arm",
        type: "line",
        data: sampleHistoricalData.map((d) => d.rightArm),
        itemStyle: { color: "#3b82f6" },
        lineStyle: { color: "#3b82f6", width: 2 },
      },
      {
        name: "Left Arm",
        type: "line",
        data: sampleHistoricalData.map((d) => d.leftArm),
        itemStyle: { color: "#60a5fa" },
        lineStyle: { color: "#60a5fa", width: 2 },
      },
      {
        name: "Trunk",
        type: "line",
        data: sampleHistoricalData.map((d) => d.trunk),
        itemStyle: { color: "#10b981" },
        lineStyle: { color: "#10b981", width: 2 },
      },
      {
        name: "Right Leg",
        type: "line",
        data: sampleHistoricalData.map((d) => d.rightLeg),
        itemStyle: { color: "#f59e0b" },
        lineStyle: { color: "#f59e0b", width: 2 },
      },
      {
        name: "Left Leg",
        type: "line",
        data: sampleHistoricalData.map((d) => d.leftLeg),
        itemStyle: { color: "#fb923c" },
        lineStyle: { color: "#fb923c", width: 2 },
      },
    ],
  };

  // Muscle percentage distribution
  const musclePercentageChart: ChartOptions = {
    title: {
      text: "Muscle Distribution by Percentage",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "item",
      formatter: "{a}<br/>{b}: {c}% ({d}%)",
    },
    series: [
      {
        name: "Muscle Distribution",
        type: "pie",
        radius: ["30%", "70%"],
        center: ["50%", "60%"],
        data: [
          {
            value: segmentalData.rightArmPercentage,
            name: "Right Arm",
            itemStyle: { color: "#3b82f6" },
          },
          {
            value: segmentalData.leftArmPercentage,
            name: "Left Arm",
            itemStyle: { color: "#60a5fa" },
          },
          {
            value: segmentalData.trunkPercentage,
            name: "Trunk",
            itemStyle: { color: "#10b981" },
          },
          {
            value: segmentalData.rightLegPercentage,
            name: "Right Leg",
            itemStyle: { color: "#f59e0b" },
          },
          {
            value: segmentalData.leftLegPercentage,
            name: "Left Leg",
            itemStyle: { color: "#fb923c" },
          },
        ],
        label: {
          fontSize: 11,
          color: "#374151",
        },
      },
    ],
  };

  // Calculate average muscle quality
  const avgMuscleQuality =
    (segmentalData.rightArmQuality +
      segmentalData.leftArmQuality +
      segmentalData.trunkQuality +
      segmentalData.rightLegQuality +
      segmentalData.leftLegQuality) /
    5;

  // Calculate total muscle mass
  const totalMuscleMass =
    segmentalData.rightArm +
    segmentalData.leftArm +
    segmentalData.trunk +
    segmentalData.rightLeg +
    segmentalData.leftLeg;

  return (
    <div className="space-y-8">
      <SectionHeader
        title="تحلیل عضلانی بخش‌بندی‌شده"
        description="تحلیل دقیق جرم عضلانی و کیفیت بر اساس بخش بدن"
        icon={<User className="h-6 w-6 text-gray-700" />}
      />

      {/* Key Muscle Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="کل جرم عضلانی"
          value={totalMuscleMass.toFixed(1)}
          unit="lbs"
          trend="up"
          trendValue="+0.8 lbs این هفته"
          icon={<Activity className="h-6 w-6 text-gray-700" />}
        />

        <MetricCard
          title="کیفیت عضلانی متوسط"
          value={avgMuscleQuality.toFixed(0)}
          unit="/100"
          trend="up"
          trendValue="+1.2 این هفته"
          icon={<Target className="h-6 w-6 text-gray-700" />}
        />

        <MetricCard
          title="تقارن بازو"
          value={(segmentalData.armSymmetry * 100).toFixed(1)}
          unit="%"
          trend="stable"
          trendValue="متعادل"
          icon={<TrendingUp className="h-6 w-6 text-gray-700" />}
        />

        <MetricCard
          title="تقارن پا"
          value={(segmentalData.legSymmetry * 100).toFixed(1)}
          unit="%"
          trend="stable"
          trendValue="متعادل"
          icon={<Zap className="h-6 w-6 text-gray-700" />}
        />
      </div>

      {/* Segmental Mass Breakdown */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
        <MetricCard
          title="بازوی راست"
          value={segmentalData.rightArm.toFixed(1)}
          unit="lbs"
          trend="up"
          trendValue="+0.2 lbs"
          icon={<Activity className="h-5 w-5 text-gray-700" />}
        />

        <MetricCard
          title="بازوی چپ"
          value={segmentalData.leftArm.toFixed(1)}
          unit="lbs"
          trend="up"
          trendValue="+0.2 lbs"
          icon={<Activity className="h-5 w-5 text-gray-700" />}
        />

        <MetricCard
          title="تنه"
          value={segmentalData.trunk.toFixed(1)}
          unit="lbs"
          trend="up"
          trendValue="+0.3 lbs"
          icon={<Activity className="h-5 w-5 text-gray-700" />}
        />

        <MetricCard
          title="پای راست"
          value={segmentalData.rightLeg.toFixed(1)}
          unit="lbs"
          trend="up"
          trendValue="+0.2 lbs"
          icon={<Activity className="h-5 w-5 text-gray-700" />}
        />

        <MetricCard
          title="پای چپ"
          value={segmentalData.leftLeg.toFixed(1)}
          unit="lbs"
          trend="up"
          trendValue="+0.2 lbs"
          icon={<Activity className="h-5 w-5 text-gray-700" />}
        />
      </div>

      {/* Visualization Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ChartCard
          title="توزیع جرم عضلانی"
          description="نمای رادار جرم عضلانی در بخش‌های بدن"
        >
          <ReactECharts
            option={muscleDistributionRadar}
            style={{ height: "350px" }}
          />
        </ChartCard>

        <ChartCard
          title="ارزیابی کیفیت عضلانی"
          description="امتیازات کیفیت برای هر گروه عضلانی (مقیاس 0-100)"
        >
          <ReactECharts
            option={muscleQualityRadar}
            style={{ height: "350px" }}
          />
        </ChartCard>

        <ChartCard
          title="تحلیل تقارن"
          description="تعادل عضلانی راست در برابر چپ (نسبت ایده‌آل: 1.00)"
        >
          <ReactECharts
            option={muscleSymmetryChart}
            style={{ height: "300px" }}
          />
        </ChartCard>

        <ChartCard title="توزیع درصدی" description="مشارکت نسبی هر گروه عضلانی">
          <ReactECharts
            option={musclePercentageChart}
            style={{ height: "300px" }}
          />
        </ChartCard>
      </div>

      <div className="grid grid-cols-1">
        <ChartCard
          title="پیشرفت بخش‌بندی‌شده"
          description="روندهای توسعه جرم عضلانی برای هر بخش بدن"
        >
          <ReactECharts
            option={muscleProgressionChart}
            style={{ height: "400px" }}
          />
        </ChartCard>
      </div>
    </div>
  );
};
