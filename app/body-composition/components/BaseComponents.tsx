import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { MetricCardProps, ChartCardProps, SectionHeaderProps } from "../types";

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  unit = "",
  trend = "stable",
  trendValue,
  icon,
  colorScheme = "blue",
}) => {
  const colorClasses = {
    blue: "bg-blue-50 text-blue-900",
    green: "bg-green-50 text-green-700",
    orange: "bg-orange-50 text-orange-600",
    purple: "bg-purple-50 text-purple-600",
    red: "bg-red-50 text-red-600",
  };

  const trendColorClasses = {
    up: "text-green-600",
    down: "text-red-600",
    stable: "text-gray-600",
  };

  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  }[trend];

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-6 bg-white">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${colorClasses[colorScheme]}`}>
            {icon}
          </div>
          <div>
            <p className="text-sm font-medium text-gray-600">{title}</p>
            <p className="text-2xl font-bold text-gray-900">
              {value}
              {unit && ` ${unit}`}
            </p>
            {trendValue && (
              <p
                className={`text-xs flex items-center gap-1 mt-1 ${trendColorClasses[trend]}`}
              >
                <TrendIcon className="h-3 w-3" />
                {trendValue}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export const ChartCard: React.FC<ChartCardProps> = ({
  title,
  description,
  children,
  className = "",
}) => {
  return (
    <Card className={`border-gray-200 shadow-sm ${className}`}>
      <CardHeader className="bg-gray-50">
        <CardTitle className="text-lg text-gray-800">{title}</CardTitle>
        <CardDescription className="text-gray-600">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent className="bg-white">{children}</CardContent>
    </Card>
  );
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-3 mb-2">
        {icon && <div className="text-blue-900">{icon}</div>}
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
      </div>
      {description && <p className="text-gray-600">{description}</p>}
    </div>
  );
};
