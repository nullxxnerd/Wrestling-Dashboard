import React from "react";
import { BarChart3, Target, Heart } from "lucide-react";

const items = [
  {
    title: "نقشه‌های کشتی",
    desc: "هیتمپ‌ها و نقشه‌های فضایی که محل رخداد حرکات در مسابقات را نشان می‌دهد.",
    icon: Target,
  },
  {
    title: "نمودارهای عملکرد",
    desc: "روندهای زمانی برای قدرت، آمادگی و بازیابی.",
    icon: BarChart3,
  },
  {
    title: "بینش‌های بازیابی",
    desc: "پایش میزان آماده‌باش و بازیابی برای بهینه‌سازی بار تمرینی.",
    icon: Heart,
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-12">
      <div className="max-w-5xl mx-auto">
        <h3 className="text-2xl font-bold mb-6 text-center">ویژگی‌های کلیدی</h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {items.map((it) => {
            const Icon = it.icon;
            return (
              <article
                key={it.title}
                className="p-6 bg-transparent border border-border rounded-lg"
              >
                <div className="flex items-center gap-4 mb-4">
                  <Icon className="w-6 h-6 text-primary" />
                  <h4 className="text-lg font-semibold">{it.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">{it.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
