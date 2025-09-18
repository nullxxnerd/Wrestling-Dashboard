"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Brain,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Lightbulb,
  Target,
  ArrowRight,
} from "lucide-react";
import { AIInsight } from "../types";

interface AIInsightPanelProps {
  insights: AIInsight[];
  title?: string;
  className?: string;
}

const getInsightIcon = (type: AIInsight["type"]) => {
  switch (type) {
    case "recommendation":
      return <Lightbulb className="h-4 w-4" />;
    case "warning":
      return <AlertCircle className="h-4 w-4" />;
    case "optimization":
      return <TrendingUp className="h-4 w-4" />;
    case "achievement":
      return <CheckCircle className="h-4 w-4" />;
    default:
      return <Brain className="h-4 w-4" />;
  }
};

const getInsightColor = (type: AIInsight["type"]) => {
  switch (type) {
    case "recommendation":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "warning":
      return "bg-red-50 text-red-700 border-red-200";
    case "optimization":
      return "bg-green-50 text-green-700 border-green-200";
    case "achievement":
      return "bg-purple-50 text-purple-700 border-purple-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getPriorityColor = (priority: AIInsight["priority"]) => {
  switch (priority) {
    case "high":
      return "bg-red-100 text-red-800";
    case "medium":
      return "bg-yellow-100 text-yellow-800";
    case "low":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const AIInsightPanel: React.FC<AIInsightPanelProps> = ({
  insights,
  title = "AI Insights & Recommendations",
  className = "",
}) => {
  if (!insights || insights.length === 0) {
    return (
      <Card
        className={`bg-gradient-to-br from-blue-50 to-indigo-50 ${className}`}
      >
        <CardHeader className="pb-3">
          <CardTitle className="text-sm font-medium flex items-center gap-2">
            <Brain className="h-4 w-4 text-blue-600" />
            {title}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-600">
            No insights available at the moment. Keep tracking your supplements
            for personalized recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card
      className={`bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 ${className}`}
    >
      <CardHeader className="pb-3">
        <CardTitle className="text-sm font-medium flex items-center gap-2">
          <Brain className="h-4 w-4 text-blue-600" />
          {title}
          <Badge
            variant="outline"
            className="bg-blue-100 text-blue-700 border-blue-300"
          >
            {insights.length} insight{insights.length !== 1 ? "s" : ""}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {insights.map((insight, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${getInsightColor(
              insight.type
            )} transition-all hover:shadow-sm`}
          >
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex items-center gap-2">
                {getInsightIcon(insight.type)}
                <h4 className="font-medium text-sm">{insight.title}</h4>
              </div>
              <Badge
                variant="outline"
                className={`text-xs px-2 py-0.5 ${getPriorityColor(
                  insight.priority
                )}`}
              >
                {insight.priority}
              </Badge>
            </div>

            <p className="text-sm mb-2 leading-relaxed">{insight.content}</p>

            {insight.relatedMetrics && insight.relatedMetrics.length > 0 && (
              <div className="flex items-center gap-1 mb-2">
                <Target className="h-3 w-3 opacity-60" />
                <span className="text-xs opacity-80">
                  Related: {insight.relatedMetrics.join(", ")}
                </span>
              </div>
            )}

            {insight.actionable && (
              <div className="flex items-center gap-1 text-xs font-medium opacity-80">
                <ArrowRight className="h-3 w-3" />
                <span>Action recommended</span>
              </div>
            )}
          </div>
        ))}

        <div className="mt-4 pt-3 border-t border-blue-200">
          <p className="text-xs text-blue-600 flex items-center gap-1">
            <Brain className="h-3 w-3" />
            <span>
              Powered by AI analysis of your supplement patterns and performance
              data
            </span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
