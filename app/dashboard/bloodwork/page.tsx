"use client";

import { Badge } from "@/components/ui/badge";
import { CompleteBloodCount } from "./components/CompleteBloodCount";
import { MetabolicPanel } from "./components/MetabolicPanel";
import { HormonePanel } from "./components/HormonePanel";
import { LipidPanel } from "./components/LipidPanel";
import { ThyroidFunction } from "./components/ThyroidFunction";
import { VitaminsMinerals } from "./components/VitaminsMinerals";
import { InflammatoryMarkers } from "./components/InflammatoryMarkers";

export default function BloodworkPage() {
  return (
    <div className="container mx-auto px-3 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            تحلیل آزمایش خون
          </h1>
          <p className="text-sm sm:text-base text-gray-600 mt-1">
            پیگیری نشانگرهای زیستی برای عملکرد بهینه
          </p>
        </div>
        <Badge
          variant="outline"
          className="text-xs sm:text-sm shrink-0 border border-gray-200 rounded-md px-3 py-1 text-gray-700 bg-transparent"
        >
          آخرین بروزرسانی: ژوئن ۲۰۲۴
        </Badge>
      </div>

      {/* Sections */}
      <div id="cbc">
        <CompleteBloodCount />
      </div>

      <div id="hemoglobin-hematocrit">
        <MetabolicPanel />
        <HormonePanel />
      </div>

      <div id="trends-and-zones">
        <LipidPanel />
        <ThyroidFunction />
        <VitaminsMinerals />
        <InflammatoryMarkers />
      </div>
    </div>
  );
}
