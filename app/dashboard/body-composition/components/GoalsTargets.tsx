import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartCard, MetricCard, SectionHeader } from "./BaseComponents";
import ReactECharts from "echarts-for-react";
import { GoalsAndTargets, ChartOptions } from "../types";
import {
  Target,
  Calendar,
  TrendingDown,
  Scale,
  Trophy,
  Clock,
} from "lucide-react";

interface GoalsTargetsProps {
  goals: GoalsAndTargets;
  onUpdateGoals?: (newGoals: GoalsAndTargets) => void;
}

export const GoalsTargets: React.FC<GoalsTargetsProps> = ({
  goals,
  onUpdateGoals,
}) => {
  const [localGoals, setLocalGoals] = useState(goals);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateGoals) {
      onUpdateGoals(localGoals);
    }
  };

  // Calculate progress metrics
  const weightToLose = Math.max(0, goals.currentWeight - goals.targetWeight);
  const weeklyTargetRate = goals.weeklyWeightLossTarget;
  const estimatedWeeksToGoal =
    weeklyTargetRate > 0 ? Math.ceil(weightToLose / weeklyTargetRate) : 0;
  const progressPercentage = Math.min(
    100,
    ((goals.currentWeight - goals.targetWeight) / weightToLose) * 100
  );

  // Weight loss projection chart
  const projectionChart: ChartOptions = {
    title: {
      text: "Weight Loss Projection",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      trigger: "axis",
      formatter: "{b}<br/>{a}: {c} lbs",
    },
    legend: {
      data: ["Current Trajectory", "Target Weight", "Competition Date"],
      textStyle: { fontSize: 11, color: "#374151" },
    },
    xAxis: {
      type: "category",
      data: Array.from(
        { length: Math.min(goals.daysToCompetition, 84) },
        (_, i) => {
          const date = new Date();
          date.setDate(date.getDate() + i);
          return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
          });
        }
      ).filter((_, i) => i % 7 === 0), // Show weekly points
      axisLabel: { fontSize: 10, color: "#6b7280" },
    },
    yAxis: {
      type: "value",
      name: "Weight (lbs)",
      min: Math.min(goals.targetWeight - 5, goals.currentWeight - 10),
      max: goals.currentWeight + 2,
      axisLabel: { fontSize: 10, color: "#6b7280" },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        name: "Current Trajectory",
        type: "line",
        data: Array.from(
          { length: Math.min(goals.daysToCompetition, 84) },
          (_, i) => {
            const weeksPassed = i / 7;
            return goals.currentWeight - weeksPassed * weeklyTargetRate;
          }
        ).filter((_, i) => i % 7 === 0),
        itemStyle: { color: "#3b82f6" },
        lineStyle: { color: "#3b82f6", width: 3 },
        symbol: "circle",
        symbolSize: 6,
      },
      {
        name: "Target Weight",
        type: "line",
        data: Array(Math.ceil(Math.min(goals.daysToCompetition, 84) / 7)).fill(
          goals.targetWeight
        ),
        itemStyle: { color: "#10b981" },
        lineStyle: { color: "#10b981", width: 2, type: "dashed" },
        symbol: "none",
      },
    ],
  };

  // Competition readiness gauge
  const readinessGauge: ChartOptions = {
    title: {
      text: "Competition Readiness",
      textStyle: { fontSize: 14, fontWeight: "normal", color: "#1f2937" },
    },
    tooltip: {
      formatter: "Readiness: {c}%",
    },
    series: [
      {
        name: "Readiness",
        type: "gauge",
        startAngle: 180,
        endAngle: 0,
        min: 0,
        max: 100,
        splitNumber: 10,
        itemStyle: {
          color:
            progressPercentage >= 80
              ? "#10b981"
              : progressPercentage >= 60
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
          formatter: "{value}%",
          color: "#1f2937",
        },
        data: [
          {
            value: parseFloat(
              Math.max(
                0,
                100 -
                  (Math.abs(goals.currentWeight - goals.targetWeight) /
                    goals.targetWeight) *
                    100
              ).toFixed(2)
            ),
            name: "Readiness",
          },
        ],
      },
    ],
  };

  return (
    <div className="space-y-8">
      <SectionHeader
        title="Goals & Targets"
        description="Set and track your competition weight and performance goals"
        icon={<Target className="h-6 w-6" />}
      />

      {/* Key Goal Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <MetricCard
          title="Weight to Lose"
          value={weightToLose.toFixed(1)}
          unit="lbs"
          trend="down"
          trendValue={`${estimatedWeeksToGoal} weeks estimated`}
          icon={<Scale className="h-6 w-6" />}
        />

        <MetricCard
          title="Days to Competition"
          value={goals.daysToCompetition}
          unit="days"
          trend="down"
          trendValue={`${Math.ceil(goals.daysToCompetition / 7)} weeks`}
          icon={<Calendar className="h-6 w-6" />}
        />

        <MetricCard
          title="Weekly Target"
          value={weeklyTargetRate.toFixed(1)}
          unit="lbs/week"
          trend="stable"
          trendValue="Safe rate"
          icon={<TrendingDown className="h-6 w-6" />}
        />

        <MetricCard
          title="Weight Class"
          value={goals.weightClass}
          trend="stable"
          trendValue="Target division"
          icon={<Trophy className="h-6 w-6" />}
        />
      </div>

      {/* Goal Setting Form */}
      <Card className="border-gray-200 shadow-sm">
        <CardHeader className="bg-gray-50">
          <CardTitle className="text-lg flex items-center gap-2 text-gray-800">
            <Target className="h-5 w-5" />
            Update Goals & Targets
          </CardTitle>
          <CardDescription className="text-gray-600">
            Adjust your competition weight targets and timeline
          </CardDescription>
        </CardHeader>
        <CardContent className="bg-white">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <div className="space-y-2">
                <Label
                  htmlFor="current-weight"
                  className="text-sm font-medium text-gray-700"
                >
                  Current Weight (lbs)
                </Label>
                <Input
                  id="current-weight"
                  type="number"
                  step="0.1"
                  value={localGoals.currentWeight}
                  onChange={(e) =>
                    setLocalGoals({
                      ...localGoals,
                      currentWeight: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="target-weight"
                  className="text-sm font-medium text-gray-700"
                >
                  Target Weight (lbs)
                </Label>
                <Input
                  id="target-weight"
                  type="number"
                  step="0.1"
                  value={localGoals.targetWeight}
                  onChange={(e) =>
                    setLocalGoals({
                      ...localGoals,
                      targetWeight: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="target-body-fat"
                  className="text-sm font-medium text-gray-700"
                >
                  Target Body Fat (%)
                </Label>
                <Input
                  id="target-body-fat"
                  type="number"
                  step="0.1"
                  value={localGoals.targetBodyFat}
                  onChange={(e) =>
                    setLocalGoals({
                      ...localGoals,
                      targetBodyFat: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="competition-date"
                  className="text-sm font-medium text-gray-700"
                >
                  Competition Date
                </Label>
                <Input
                  id="competition-date"
                  type="date"
                  value={localGoals.competitionDate}
                  onChange={(e) =>
                    setLocalGoals({
                      ...localGoals,
                      competitionDate: e.target.value,
                    })
                  }
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="weight-class"
                  className="text-sm font-medium text-gray-700"
                >
                  Weight Class
                </Label>
                <Input
                  id="weight-class"
                  type="text"
                  value={localGoals.weightClass}
                  onChange={(e) =>
                    setLocalGoals({
                      ...localGoals,
                      weightClass: e.target.value,
                    })
                  }
                  placeholder="e.g., 79kg, 174lbs"
                  className="w-full"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor="weekly-target"
                  className="text-sm font-medium text-gray-700"
                >
                  Weekly Weight Loss (lbs)
                </Label>
                <Input
                  id="weekly-target"
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="2.0"
                  value={localGoals.weeklyWeightLossTarget}
                  onChange={(e) =>
                    setLocalGoals({
                      ...localGoals,
                      weeklyWeightLossTarget: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-900 hover:bg-blue-800 text-white px-6 py-2"
              >
                Update Goals
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Progress Visualization */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <ChartCard
          title="Weight Loss Timeline"
          description="Projected weight loss trajectory to competition date"
        >
          <ReactECharts option={projectionChart} style={{ height: "350px" }} />
        </ChartCard>

        <ChartCard
          title="Competition Readiness"
          description="Overall readiness score based on progress toward goals"
        >
          <ReactECharts option={readinessGauge} style={{ height: "350px" }} />
        </ChartCard>
      </div>

      {/* Additional Progress Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <MetricCard
          title="Progress to Goal"
          value={Math.max(
            0,
            100 -
              (weightToLose / (goals.currentWeight - goals.targetWeight)) * 100
          ).toFixed(1)}
          unit="%"
          trend="up"
          trendValue="On track"
          icon={<TrendingDown className="h-5 w-5" />}
        />

        <MetricCard
          title="Target Lean Mass"
          value={goals.targetLeanMass.toFixed(1)}
          unit="lbs"
          trend="stable"
          trendValue="Maintain muscle"
          icon={<Target className="h-5 w-5" />}
        />

        <MetricCard
          title="Time Remaining"
          value={`${Math.floor(goals.daysToCompetition / 7)}w ${
            goals.daysToCompetition % 7
          }d`}
          trend="down"
          trendValue="Until competition"
          icon={<Clock className="h-5 w-5" />}
        />
      </div>
    </div>
  );
};
