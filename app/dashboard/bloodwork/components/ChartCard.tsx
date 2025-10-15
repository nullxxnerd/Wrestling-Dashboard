"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ReactECharts from "echarts-for-react";
import type { EChartsOption } from "echarts";

interface ChartCardProps {
  title: string;
  description?: string;
  option: EChartsOption;
  height?: string;
}

export function ChartCard({
  title,
  description,
  option,
  height = "280px",
}: ChartCardProps) {
  return (
    <Card className="rounded-md border border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm text-gray-600">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent>
        <ReactECharts option={option} style={{ height }} />
      </CardContent>
    </Card>
  );
}