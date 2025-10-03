"use client";

import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FiCheck } from "react-icons/fi";

type Plan = {
  name: string;
  description: string;
  monthlyPrice: number; // قیمت پایه ماهانه بدون تخفیف
  cta: string;
  features: string[];
  highlight?: boolean;
};

const PLANS: Plan[] = [
  {
    name: "شروع",
    description: "داشبورد شخصی با پایش اصلی، بینش‌های پایه و تقویم تمرین.",
    monthlyPrice: 9,
    cta: "شروع کنید",
    features: [
      "داشبورد یکپارچه ورزشکار",
      "گزارش تمرین و تقویم",
      "بینش‌ها و روندهای پایه",
      "پیگیری وزن و ترکیب بدن",
      "تا ۳ هدف سفارشی",
    ],
  },
  {
    name: "حرفه‌ای",
    description: "تحلیل‌های پیشرفته، توصیه‌های هوش مصنوعی و پایش ریکاوری.",
    monthlyPrice: 29,
    cta: "ارتقا به حرفه‌ای",
    highlight: true,
    features: [
      "همه امکانات پلن شروع",
      "بینش‌های هوش مصنوعی و کارهای روزانه",
      "هوش مکمل‌ها و پایبندی",
      "نمودار خون و شاخص‌های سلامت",
      "شاخص ریکاوری و پیش‌بینی آمادگی",
      "تقویم پیشرفته با دوره‌بندی",
    ],
  },
  {
    name: "تیم/مربی",
    description: "مدیریت چند ورزشکار با تحلیل‌های مقایسه‌ای و ابزار مربی.",
    monthlyPrice: 99,
    cta: "تماس با فروش",
    features: [
      "همه امکانات حرفه‌ای",
      "داشبورد مربی و تیم",
      "تحلیل‌های مقایسه‌ای بین ورزشکاران",
      "برنامه‌ریزی و پیش‌بینی اردو/کمپ",
      "پشتیبانی اولویت‌دار",
    ],
  },
];

export const Pricing: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"monthly" | "annual">("monthly");

  const discount = 0.15; // ۱۵٪ تخفیف برای پرداخت سالانه

  const pricing = useMemo(
    () =>
      PLANS.map((p) => ({
        ...p,
        displayPrice:
          activeTab === "annual"
            ? Math.round(p.monthlyPrice * (1 - discount))
            : p.monthlyPrice,
        billingNote:
          activeTab === "annual" ? "ماهیانه، با پرداخت سالانه" : "ماهیانه",
      })),
    [activeTab]
  );

  return (
    <section id="pricing" className="py-16" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <h3 className="text-3xl font-bold mb-3 text-center">قیمت‌گذاری</h3>
        <p className="text-center text-muted-foreground mb-8">
          داشبورد عملکرد کشتی‌گیر برای پایش، بینش‌های هوشمند و برنامه‌ریزی مبتنی
          بر تقویم.
        </p>

        {/* Tabs */}
        <div className="flex items-center justify-center mb-8">
          <div className="inline-flex p-1 rounded-lg border bg-muted/30">
            <button
              type="button"
              onClick={() => setActiveTab("monthly")}
              className={`px-4 py-2 rounded-md text-sm transition-colors ${
                activeTab === "monthly"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              ماهیانه
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("annual")}
              className={`px-4 py-2 rounded-md text-sm transition-colors inline-flex items-center gap-2 ${
                activeTab === "annual"
                  ? "bg-background text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              سالانه{" "}
              <span className="text-[11px] rounded-full px-2 py-0.5 bg-emerald-600/10 text-emerald-700 dark:text-emerald-300 border border-emerald-600/20">
                ۱۵٪ تخفیف
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-6">
          {pricing.map((plan) => (
            <div
              key={plan.name}
              className={`p-6 rounded-xl border bg-card text-card-foreground flex flex-col ${
                plan.highlight ? "border-primary shadow-sm" : "border-border"
              }`}
            >
              <div className="mb-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xl font-semibold">{plan.name}</h4>
                  {plan.highlight && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20">
                      پرطرفدارترین
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold">
                  ${"" + plan.displayPrice}
                </span>
                <span className="text-sm text-muted-foreground mr-2">
                  {plan.billingNote}
                </span>
              </div>

              <ul className="space-y-2 text-sm mb-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2">
                    <FiCheck className="mt-0.5 shrink-0 text-emerald-600" />
                    <span>{f}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-auto">
                <Button
                  className="w-full"
                  variant={plan.highlight ? "default" : "secondary"}
                >
                  {plan.cta}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
