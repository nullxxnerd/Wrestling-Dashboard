"use client";

import React from "react";
import ReactECharts from "echarts-for-react";

// Import charts directly from dashboard to showcase real features
import GlucoseChart from "@/app/dashboard/bloodwork/components/GlucoseChart";
import PerformanceScore from "@/app/dashboard/bodybuilding-performance/components/PerformanceScore";
import { StrengthRatiosChart } from "@/app/dashboard/bodybuilding-performance/components/strength";
import { SupplementStackOverview } from "@/app/dashboard/supplements/components/SupplementStackOverview";

const WRESTLING_BLUE = "#1e40af"; // Deep wrestling blue
const WRESTLING_RED = "#dc2626"; // Classic wrestling red

export const ProductShowcase: React.FC = () => {
  // نمای کلی عملکرد - نمودار ترکیبی برای یک نگاه سریع
  const overallOverviewOption = {
    title: { text: "نمای کلی عملکرد (هفتگی)", left: "center" },
    tooltip: { trigger: "axis" },
    legend: { data: ["قدرت", "استقامت", "ریکاوری"], bottom: 0 },
    grid: { left: 40, right: 20, top: 40, bottom: 50 },
    xAxis: {
      type: "category",
      data: ["دوش", "سه‌", "چهار", "پنج", "جمع", "شنب", "یکش"],
    },
    yAxis: {
      type: "value",
      min: 0,
      max: 100,
      splitLine: { lineStyle: { color: "#e5e7eb" } },
    },
    series: [
      {
        name: "قدرت",
        type: "line",
        data: [78, 81, 79, 83, 86, 88, 90],
        areaStyle: { color: "rgba(30,64,175,0.12)" },
        lineStyle: { color: WRESTLING_BLUE, width: 3 },
      },
      {
        name: "استقامت",
        type: "line",
        data: [70, 72, 73, 74, 75, 77, 79],
        areaStyle: { color: "rgba(220,38,38,0.10)" },
        lineStyle: { color: WRESTLING_RED, width: 2 },
      },
      {
        name: "ریکاوری",
        type: "bar",
        data: [82, 84, 80, 86, 87, 85, 88],
        itemStyle: { color: "#10b981" },
        barWidth: "40%",
      },
    ],
  } as const;
  // پیش‌نمایش سبک نسبت توان به وزن
  const powerToWeightPreview = {
    title: { text: "نسبت توان به وزن", textStyle: { fontSize: 12 } },
    tooltip: { trigger: "axis" },
    grid: { left: 36, right: 12, top: 40, bottom: 24 },
    xAxis: {
      type: "category",
      data: [
        "دوشنبه",
        "سه‌شنبه",
        "چهارشنبه",
        "پنجشنبه",
        "جمعه",
        "شنبه",
        "یکشنبه",
      ],
      axisLabel: { fontSize: 10 },
    },
    yAxis: {
      type: "value",
      min: 1.6,
      max: 2.0,
      axisLabel: { fontSize: 10 },
      splitLine: { lineStyle: { color: "#f3f4f6" } },
    },
    series: [
      {
        type: "line",
        data: [1.72, 1.74, 1.76, 1.75, 1.78, 1.81, 1.82],
        lineStyle: { width: 3, color: WRESTLING_BLUE },
        symbol: "diamond",
        symbolSize: 6,
        areaStyle: { color: "rgba(30, 64, 175, 0.12)" },
        markLine: {
          data: [
            {
              yAxis: 1.85,
              name: "نخبه",
              lineStyle: { type: "dashed", color: "#10b981" },
            },
          ],
        },
      },
    ],
  } as const;

  // پیش‌نمایش سبک ریکاوری
  const recoveryPreview = {
    title: { text: "امتیاز ریکاوری", textStyle: { fontSize: 12 } },
    tooltip: { trigger: "axis" },
    grid: { left: 36, right: 12, top: 40, bottom: 24 },
    xAxis: {
      type: "category",
      data: ["دوشنبه", "سه‌شنبه", "چهارشنبه", "پنجشنبه", "جمعه"],
    },
    yAxis: { type: "value", min: 0, max: 100 },
    series: [
      { data: [78, 82, 85, 80, 87], type: "line", smooth: true, areaStyle: {} },
    ],
  } as const;

  // نمودار کوچک پایبندی مکمل + عملکرد (نمایش فشرده)
  const miniAdherenceOption = {
    title: { text: "پایبندی مکمل‌ها و عملکرد", textStyle: { fontSize: 12 } },
    tooltip: { trigger: "axis" },
    grid: { left: 40, right: 20, top: 40, bottom: 28 },
    legend: {
      data: ["پایبندی", "امتیاز عملکرد"],
      bottom: 0,
      textStyle: { fontSize: 11 },
    },
    xAxis: {
      type: "category",
      data: ["هفته ۱", "هفته ۲", "هفته ۳", "هفته ۴", "هفته ۵", "هفته ۶"],
      axisLabel: { fontSize: 10 },
    },
    yAxis: { type: "value", min: 0, max: 100, axisLabel: { fontSize: 10 } },
    series: [
      {
        name: "پایبندی",
        type: "bar",
        data: [88, 90, 86, 94, 92, 95],
        itemStyle: { color: WRESTLING_BLUE },
        barWidth: "45%",
      },
      {
        name: "امتیاز عملکرد",
        type: "line",
        data: [82, 85, 78, 92, 89, 94],
        lineStyle: { color: WRESTLING_RED, width: 3 },
        symbol: "circle",
        symbolSize: 6,
      },
    ],
  } as const;

  const Kicker = ({ children }: { children: React.ReactNode }) => (
    <p
      className="uppercase tracking-wider text-xs font-semibold text-gray-500 mb-2"
      dir="rtl"
    >
      {children}
    </p>
  );
  const Title = ({ blue, black }: { blue: string; black: string }) => (
    <h3
      className="text-2xl sm:text-3xl font-extrabold leading-tight mt-2"
      dir="rtl"
    >
      <span className="text-[#1e40af]">{blue}</span> {black}
    </h3>
  );

  const Bullets = ({ items }: { items: string[] }) => (
    <ul className="mt-3 space-y-2 text-sm text-gray-600" dir="rtl">
      {items.map((t, i) => (
        <li key={i} className="flex gap-2">
          <span className="mt-1 h-2 w-2 rounded-full bg-[#dc2626]" />
          <span>{t}</span>
        </li>
      ))}
    </ul>
  );

  return (
    <section className="py-12">
      {" "}
      <div className="flex justify-center py-4">
        {" "}
        <span className="px-3 py-1 mb-4 text-xs font-medium rounded-full border border-border text-muted-foreground bg-background/40">
          معرفی محصول
        </span>
      </div>
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Overview - move to top */}

        <div className="grid lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-xl p-6 lg:py-8 border border-slate-200">
          <div className="order-2 lg:order-1 text-right" dir="rtl">
            <Kicker>نمای کلی عملکرد</Kicker>
            <Title blue="آمادگی مسابقه" black="در یک نگاه" />
            <p className="text-sm sm:text-base text-gray-700 mt-3 leading-7">
              ترکیب شاخص‌های کلیدی (قدرت، استقامت و ریکاوری) تصویری شفاف از روند
              هفتگی می‌دهد. هر روز «توصیه‌ی روزانه» شخصی‌سازی‌شده دریافت
              می‌کنید؛ شامل پیشنهاد تمرین/ریکاوری و تمرکز تغذیه‌ای متناسب با
              وضعیت شما.
            </p>
            <Bullets
              items={[
                "پیشنهاد روزانه برای تمرین/ریکاوری بر مبنای داده‌های همان روز",
                "هشدار خستگی و توصیه کاهش بار به‌صورت هوشمند",
                "هم‌راستاسازی دوره‌بندی تمرین با تقویم رقابت‌ها",
              ]}
            />
          </div>
          <div className="order-1 lg:order-2 p-4 border border-border rounded-lg bg-white">
            <ReactECharts
              option={overallOverviewOption}
              style={{ height: 240 }}
            />
          </div>
        </div>
        {/* Bloodwork (Chart left, Description right) */}
        <div className="grid lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-xl p-6 lg:py-8 border border-slate-200">
          <div className="order-1 lg:order-2 text-right" dir="rtl">
            <Kicker>برای کشتی‌گیران و مربیان</Kicker>
            <Title blue="خون‌سنجی دقیق" black="برای سلامت پایدار" />
            <p className="text-sm sm:text-base text-gray-700 mt-3 leading-7">
              پایش قند خون ناشتا و روندهای دوره‌ای کمک می‌کند تغذیه و بار تمرینی
              با وضعیت متابولیک هماهنگ شوند؛ کاهش ریسک افت عملکرد و افزایش کیفیت
              ریکاوری نتیجه این هم‌راستایی است.
            </p>
            <Bullets
              items={[
                "تشخیص زودهنگام روندهای غیرطبیعی برای پیشگیری از اُفت تمرین",
                "راهنمایی مربی برای تنظیم بار تمرین در هفته‌های پرفشار",
                "پشتیبانی تصمیمات تغذیه‌ای قبل/بعد از تمرین",
              ]}
            />
            <div className="mt-4 flex items-center gap-6 " dir="rtl">
              <div>
                <p className="text-2xl font-extrabold text-[#dc2626]">15+</p>
                <p className="text-xs text-gray-500">
                  شاخص آزمایشگاهی پوشش‌داده‌شده
                </p>
              </div>
              <div>
                <p className="text-2xl font-extrabold text-[#1e40af]">10+</p>
                <p className="text-xs text-gray-500">
                  بینش عملی برای تصمیم‌گیری
                </p>
              </div>
            </div>
          </div>
          <div className="order-2 lg:order-1 p-4 border border-border rounded-lg bg-white">
            <GlucoseChart height={220} />
          </div>
        </div>

        {/* Body Composition (Description left, Chart right) */}
        <div className="grid lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-xl p-6 lg:py-8 border border-slate-200">
          <div className="order-2 lg:order-2 p-4 border border-border rounded-lg bg-white">
            <ReactECharts
              option={powerToWeightPreview}
              style={{ height: 220 }}
            />
          </div>
          <div className="order-1 lg:order-1 text-right" dir="rtl">
            <Kicker>آنالیز ترکیب بدنی</Kicker>
            <Title blue="نسبت توان به وزن" black="برای ارزیابی مهارت کشتی" />
            <p className="text-sm sm:text-base text-gray-700 mt-3 leading-7">
              نسبت توان به وزن معیار کلیدی در کشتی است؛ توان بیشتر با وزن مؤثرتر
              یعنی جابه‌جایی سریع‌تر، اجرای تکنیک‌های انفجاری و کنترل بهتر در
              کشتی. این نمودار به مربیان کمک می‌کند آستانه‌های «خوب» و «نخبه» را
              هدف بگیرند.
            </p>
            <Bullets
              items={[
                "بهینه‌سازی وزن مسابقه با حفظ توان خروجی",
                "پایش روند نزدیک‌شدن به محدوده نخبه (۱.۸۵+)",
                "تنظیم تمرینات قدرتی/پلایومتریک بر اساس پیشرفت واقعی",
              ]}
            />
          </div>
        </div>

        {/* Lifting (Chart left, Description right) */}
        <div className="grid lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-xl p-6 lg:py-8 border border-slate-200">
          <div className="order-1 lg:order-2 text-right" dir="rtl">
            <Kicker>قدرت و اجرای تمرین</Kicker>
            <Title blue="نسبت‌های قدرتی" black="برای تعادل اسکات/بنچ/ددلیفت" />
            <p className="text-sm sm:text-base text-gray-700 mt-3 leading-7">
              هم‌ترازی نسبت‌های قدرتی احتمال آسیب را کاهش می‌دهد و انتقال قدرت
              به مهارت‌های روی تشک را بهبود می‌بخشد. مربیان می‌توانند بر اساس
              نقاط ضعف، نسخه‌ی تمرین را دقیق‌تر تنظیم کنند.
            </p>
            <Bullets
              items={[
                "شناسایی عدم‌تعادل‌ها و تمرکز بر عضلات کم‌کار",
                "طراحی میکروسیکل‌های ویژه برای افزایش نسبت‌ها",
                "پیگیری پیشرفت واقعی به‌جای رکوردهای لحظه‌ای",
              ]}
            />
          </div>
          <div className="order-2 lg:order-1 p-4 border border-border rounded-lg bg-white">
            <StrengthRatiosChart />
          </div>
        </div>

        {/* Supplements (Description left, Chart right) */}
        <div className="grid lg:grid-cols-2 gap-8 items-center bg-gray-50 rounded-xl p-6 lg:py-8 border border-slate-200">
          <div className="order-2 lg:order-2 p-4 border border-border rounded-lg bg-white">
            {/* نسخه کوچک برای شوکیس */}
            <ReactECharts
              option={miniAdherenceOption}
              style={{ height: 200 }}
            />
          </div>
          <div className="order-1 lg:order-1 text-right" dir="rtl">
            <Kicker>تغذیه و مکمل‌ها</Kicker>
            <Title blue="پروتکل هوشمند" black="برای پایبندی و اثرگذاری" />
            <p className="text-sm sm:text-base text-gray-700 mt-3 leading-7">
              پایش پایبندی به مکمل‌ها به همراه ارتباط آن با عملکرد، از هدررفت
              هزینه جلوگیری می‌کند و نشان می‌دهد کدام مکمل واقعاً برای کشتی‌گیر
              مفید است.
            </p>
            <Bullets
              items={[
                "نمایش همبستگی پایبندی با امتیاز عملکرد",
                "یادآورها و زمان‌بندی مصرف برای رقابت",
                "مقایسه پشته‌های مکمل در طول فصل",
              ]}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
