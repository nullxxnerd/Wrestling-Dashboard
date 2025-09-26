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
  const TrendIcon = {
    up: TrendingUp,
    down: TrendingDown,
    stable: Minus,
  }[trend];

  return (
    <Card className="border-gray-200 shadow-sm">
      <CardContent className="p-3 sm:p-4 lg:p-6 bg-white">
        <div className="flex items-start sm:items-center gap-2 sm:gap-3">
          <div
            className={
              "p-1.5 sm:p-2 rounded-lg flex-shrink-0 " +
              (colorScheme === "green"
                ? "bg-green-100"
                : colorScheme === "orange"
                ? "bg-orange-100"
                : colorScheme === "purple"
                ? "bg-purple-100"
                : colorScheme === "red"
                ? "bg-red-100"
                : "bg-blue-100")
            }
          >
            <div
              className={
                "h-4 w-4 sm:h-5 sm:w-5 " +
                (colorScheme === "green"
                  ? "text-green-700"
                  : colorScheme === "orange"
                  ? "text-orange-700"
                  : colorScheme === "purple"
                  ? "text-purple-700"
                  : colorScheme === "red"
                  ? "text-red-700"
                  : "text-blue-700")
              }
            >
              {icon}
            </div>
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs sm:text-sm font-medium text-gray-600 mb-1">
              {title}
            </p>
            <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 break-words">
              {value}
              {unit && (
                <span className="text-sm sm:text-base font-normal">
                  {" "}
                  {unit}
                </span>
              )}
            </p>
            {trendValue && (
              <p className="text-xs flex items-center gap-1 mt-1 text-gray-600">
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
      <CardHeader className="bg-gray-50 p-4 sm:p-6">
        <CardTitle className="text-base sm:text-lg lg:text-xl font-semibold text-gray-900 leading-tight">
          {title}
        </CardTitle>
        {description && (
          <CardDescription className="text-sm sm:text-base text-gray-600 mt-1 leading-relaxed">
            {description}
          </CardDescription>
        )}
      </CardHeader>
      <CardContent className="bg-white p-4 sm:p-6">{children}</CardContent>
    </Card>
  );
};

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  description,
  icon,
}) => {
  return (
    <div className="mb-4 sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
        {icon && (
          <div className="text-gray-700 flex-shrink-0">
            <div className="h-5 w-5 sm:h-6 sm:w-6">{icon}</div>
          </div>
        )}
        <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 leading-tight">
          {title}
        </h2>
      </div>
      {description && (
        <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
};
