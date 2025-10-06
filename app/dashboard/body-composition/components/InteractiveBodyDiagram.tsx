"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BodyComponent } from "reactjs-human-body";

interface MuscleGroupData {
  id: string;
  name: string;
  mass: number; // in kg or lbs
  score: number; // 0-100 performance score
  fatPercentage: number;
  strength: number; // relative strength score
  color: string;
  description: string;
}

interface BodyPerformanceMetrics {
  muscleGroups: MuscleGroupData[];
  overallScore: number;
  balanceScore: number;
}

const muscleGroupsData: MuscleGroupData[] = [
  {
    id: "chest",
    name: "سینه و عضلات سینه‌ای",
    mass: 8.5,
    score: 85,
    fatPercentage: 12,
    strength: 90,
    color: "#FF6B6B",
    description: "ضروری برای حرکات grappling و هل دادن در کشتی",
  },
  {
    id: "shoulders",
    name: "شانه‌ها و دلتوئید",
    mass: 3.2,
    score: 78,
    fatPercentage: 10,
    strength: 82,
    color: "#4ECDC4",
    description: "حیاتی برای کنترل سر بالا و موقعیت‌های دفاعی",
  },
  {
    id: "arms",
    name: "بازوها و دوسر بازو",
    mass: 5.8,
    score: 82,
    fatPercentage: 9,
    strength: 85,
    color: "#45B7D1",
    description: "کلیدی برای گرفتن، کشیدن و حفظ کنترل",
  },
  {
    id: "forearms",
    name: "ساعد",
    mass: 2.1,
    score: 88,
    fatPercentage: 8,
    strength: 92,
    color: "#96CEB4",
    description: "حیاتی برای قدرت گرفتن و کنترل مچ دست",
  },
  {
    id: "core",
    name: "تنه و شکم",
    mass: 12.3,
    score: 91,
    fatPercentage: 6,
    strength: 95,
    color: "#FFEAA7",
    description: "پایه همه حرکات کشتی و ثبات",
  },
  {
    id: "back",
    name: "پشت و لات",
    mass: 15.7,
    score: 86,
    fatPercentage: 11,
    strength: 88,
    color: "#DDA0DD",
    description: "ضروری برای کشیدن، بلند کردن و کنترل وضعیت بدن",
  },
  {
    id: "legs",
    name: "پاها و چهارسر ران",
    mass: 22.4,
    score: 89,
    fatPercentage: 13,
    strength: 93,
    color: "#98D8C8",
    description: "منبع اصلی قدرت برای گرفتن زمین و وضعیت دفاعی",
  },
  {
    id: "calves",
    name: "ساق پا",
    mass: 4.2,
    score: 75,
    fatPercentage: 14,
    strength: 78,
    color: "#F7DC6F",
    description: "مهم برای تعادل، چابکی و حرکات انفجاری",
  },
];

export function InteractiveBodyDiagram() {
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);

  const getScoreColor = (score: number) => {
    if (score >= 90) return "#4CAF50"; // Excellent - Green
    if (score >= 80) return "#FFC107"; // Good - Yellow
    if (score >= 70) return "#FF9800"; // Fair - Orange
    return "#F44336"; // Needs Improvement - Red
  };

  const bodyPerformanceMetrics: BodyPerformanceMetrics = {
    muscleGroups: muscleGroupsData,
    overallScore: 84,
    balanceScore: 88,
  };

  const selectedMuscleData = selectedMuscle
    ? muscleGroupsData.find((m) => m.id === selectedMuscle)
    : null;

  // Get performance scores for body parts
  const getBodyPartColors = () => {
    const chestScore =
      muscleGroupsData.find((m) => m.id === "chest")?.score || 0;
    const shouldersScore =
      muscleGroupsData.find((m) => m.id === "shoulders")?.score || 0;
    const armsScore = muscleGroupsData.find((m) => m.id === "arms")?.score || 0;
    const forearmsScore =
      muscleGroupsData.find((m) => m.id === "forearms")?.score || 0;
    const coreScore = muscleGroupsData.find((m) => m.id === "core")?.score || 0;
    const legsScore = muscleGroupsData.find((m) => m.id === "legs")?.score || 0;
    const calvesScore =
      muscleGroupsData.find((m) => m.id === "calves")?.score || 0;

    return {
      chest: getScoreColor(chestScore),
      shoulders: getScoreColor(shouldersScore),
      arms: getScoreColor(armsScore),
      forearms: getScoreColor(forearmsScore),
      core: getScoreColor(coreScore),
      legs: getScoreColor(legsScore),
      calves: getScoreColor(calvesScore),
    };
  };

  const bodyColors = getBodyPartColors();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Body Diagram */}
      <div className="lg:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <span>نقشه عملکرد بدنی تعاملی</span>
              <div className="text-sm text-gray-500 ml-auto">
                امتیاز کلی: {bodyPerformanceMetrics.overallScore}/100
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="mb-6 relative">
                <BodyComponent
                  partsInput={{
                    head: { show: true },
                    leftShoulder: { show: true },
                    rightShoulder: { show: true },
                    leftArm: { show: true },
                    rightArm: { show: true },
                    chest: { show: true },
                    stomach: { show: true },
                    leftLeg: { show: true },
                    rightLeg: { show: true },
                    leftHand: { show: true },
                    rightHand: { show: true },
                    leftFoot: { show: true },
                    rightFoot: { show: true },
                  }}
                />

                {/* Performance indicators overlaid on body */}
                <div className="absolute inset-0 pointer-events-none">
                  {/* Chest indicator */}
                  <div
                    className="absolute w-8 h-8 rounded-full border-4 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      borderColor: bodyColors.chest,
                      backgroundColor: bodyColors.chest,
                      top: "25%",
                      left: "45%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {muscleGroupsData.find((m) => m.id === "chest")?.score}
                  </div>

                  {/* Shoulders indicators */}
                  <div
                    className="absolute w-6 h-6 rounded-full border-3 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      borderColor: bodyColors.shoulders,
                      backgroundColor: bodyColors.shoulders,
                      top: "18%",
                      left: "25%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {muscleGroupsData.find((m) => m.id === "shoulders")?.score}
                  </div>
                  <div
                    className="absolute w-6 h-6 rounded-full border-3 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      borderColor: bodyColors.shoulders,
                      backgroundColor: bodyColors.shoulders,
                      top: "18%",
                      right: "25%",
                      transform: "translate(50%, -50%)",
                    }}
                  >
                    {muscleGroupsData.find((m) => m.id === "shoulders")?.score}
                  </div>

                  {/* Core indicator */}
                  <div
                    className="absolute w-8 h-8 rounded-full border-4 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      borderColor: bodyColors.core,
                      backgroundColor: bodyColors.core,
                      top: "38%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {muscleGroupsData.find((m) => m.id === "core")?.score}
                  </div>

                  {/* Arms indicators */}
                  <div
                    className="absolute w-6 h-6 rounded-full border-3 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      borderColor: bodyColors.arms,
                      backgroundColor: bodyColors.arms,
                      top: "32%",
                      left: "15%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {muscleGroupsData.find((m) => m.id === "arms")?.score}
                  </div>
                  <div
                    className="absolute w-6 h-6 rounded-full border-3 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      borderColor: bodyColors.arms,
                      backgroundColor: bodyColors.arms,
                      top: "32%",
                      right: "15%",
                      transform: "translate(50%, -50%)",
                    }}
                  >
                    {muscleGroupsData.find((m) => m.id === "arms")?.score}
                  </div>

                  {/* Legs indicators */}
                  <div
                    className="absolute w-6 h-6 rounded-full border-3 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      borderColor: bodyColors.legs,
                      backgroundColor: bodyColors.legs,
                      top: "62%",
                      left: "40%",
                      transform: "translate(-50%, -50%)",
                    }}
                  >
                    {muscleGroupsData.find((m) => m.id === "legs")?.score}
                  </div>
                  <div
                    className="absolute w-6 h-6 rounded-full border-3 flex items-center justify-center text-xs font-bold text-white"
                    style={{
                      borderColor: bodyColors.legs,
                      backgroundColor: bodyColors.legs,
                      top: "62%",
                      right: "40%",
                      transform: "translate(50%, -50%)",
                    }}
                  >
                    {muscleGroupsData.find((m) => m.id === "legs")?.score}
                  </div>
                </div>
              </div>

              {/* Enhanced muscle group selection buttons */}
              <div className="grid grid-cols-2 gap-3 mb-4 w-full max-w-md">
                {muscleGroupsData.map((muscle) => (
                  <motion.button
                    key={muscle.id}
                    onClick={() => setSelectedMuscle(muscle.id)}
                    className={`p-3 rounded-lg text-sm transition-all duration-200 ${
                      selectedMuscle === muscle.id
                        ? "bg-blue-500 text-white shadow-lg transform scale-105"
                        : "bg-white hover:bg-gray-50 shadow-md hover:shadow-lg"
                    }`}
                    style={{
                      borderLeft: `6px solid ${getScoreColor(muscle.score)}`,
                    }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-semibold text-xs">
                          {muscle.name}
                        </div>
                        <div className="text-xs opacity-75">
                          {muscle.mass}kg
                        </div>
                      </div>
                      <div
                        className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white"
                        style={{ backgroundColor: getScoreColor(muscle.score) }}
                      >
                        {muscle.score}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              {/* Legend */}
              <div className="p-3 bg-gray-50 rounded-lg w-full max-w-md">
                <h4 className="text-sm font-semibold mb-2">
                  راهنمای امتیاز عملکرد:
                </h4>
                <div className="flex flex-wrap gap-4 text-xs">
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-green-500 rounded"></div>
                    <span>عالی (۹۰-۱۰۰)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-yellow-500 rounded"></div>
                    <span>خوب (۸۰-۸۹)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-orange-500 rounded"></div>
                    <span>متوسط (۷۰-۷۹)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="w-3 h-3 bg-red-500 rounded"></div>
                    <span>نیاز به بهبود (&lt;۷۰)</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Metrics Panel */}
      <div className="space-y-4">
        {/* Overall Performance */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">عملکرد کلی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm">
                  <span>امتیاز کلی</span>
                  <span className="font-semibold">
                    {bodyPerformanceMetrics.overallScore}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${bodyPerformanceMetrics.overallScore}%` }}
                  ></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm">
                  <span>امتیاز تعادل</span>
                  <span className="font-semibold">
                    {bodyPerformanceMetrics.balanceScore}/100
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                  <div
                    className="bg-green-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${bodyPerformanceMetrics.balanceScore}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Selected Muscle Group Details */}
        {selectedMuscleData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <div
                    className="w-4 h-4 rounded"
                    style={{ backgroundColor: selectedMuscleData.color }}
                  ></div>
                  {selectedMuscleData.name}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <p className="text-sm text-gray-600">
                    {selectedMuscleData.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">جرم:</span>
                      <div className="font-semibold">
                        {selectedMuscleData.mass} kg
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">امتیاز:</span>
                      <div
                        className="font-semibold"
                        style={{
                          color: getScoreColor(selectedMuscleData.score),
                        }}
                      >
                        {selectedMuscleData.score}/100
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">چربی بدن:</span>
                      <div className="font-semibold">
                        {selectedMuscleData.fatPercentage}%
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">قدرت:</span>
                      <div className="font-semibold">
                        {selectedMuscleData.strength}/100
                      </div>
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>عملکرد</span>
                      <span>{selectedMuscleData.score}/100</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full transition-all duration-500"
                        style={{
                          width: `${selectedMuscleData.score}%`,
                          backgroundColor: getScoreColor(
                            selectedMuscleData.score
                          ),
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">رتبه‌بندی گروه‌های عضلانی</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {muscleGroupsData
                .sort((a, b) => b.score - a.score)
                .slice(0, 5)
                .map((muscle, index) => (
                  <div
                    key={muscle.id}
                    className="flex items-center justify-between p-2 rounded cursor-pointer hover:bg-gray-50"
                    onClick={() => setSelectedMuscle(muscle.id)}
                  >
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">
                        #{index + 1}
                      </span>
                      <div
                        className="w-3 h-3 rounded"
                        style={{ backgroundColor: muscle.color }}
                      ></div>
                      <span className="text-sm">{muscle.name}</span>
                    </div>
                    <span
                      className="text-sm font-semibold"
                      style={{ color: getScoreColor(muscle.score) }}
                    >
                      {muscle.score}
                    </span>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
