import React from "react";
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Plug,
  Monitor,
  ShieldCheck,
} from "lucide-react";

const items = [
  {
    title: "چرا تکنواسپرت؟",
    bullets: [
      "ورود آسان داده و تجربه کاربری ساده برای مربیان",
      "رصد لحظه‌ای آمار ورزشکاران برای تصمیم‌گیری سریع",
      "گزارش‌های شخصی‌سازی‌شده و قابل‌تحلیل",
      "توصیه‌های عملی بر اساس داده‌های عملکردی",
    ],
    icon: BarChart3,
  },
  {
    title: "گزارش عملکرد ورزشکار",
    bullets: [
      "نمای کلی آمادگی و ریکاوری برای هر ورزشکار",
      "توصیه‌های روزانه تمرین و ریکاوری بر اساس عملکرد",
      "هشدار خستگی و توصیه کاهش بار هوشمند",
      "هماهنگی برنامه با تقویم رقابت‌ها",
    ],
    icon: ShieldCheck,
  },
  {
    title: "تکواسپرت چجوری کار میکنه؟",
    bullets: [
      "درباره خود بگویید",
      "ورزش، تجربه و هدف را انتخاب کنید",
      "برنامه پویا و شخصی‌سازی‌شده دریافت کنید",
    ],
    icon: Activity,
  },
  {
    title: "با کمک مربی دیجیتال هوشمند تمرین کنید",
    subtitle: "با تکنواسپرت همیشه در اوج",
    desc: "مانیتورینگ، برنامه‌های شخصی و توصیه‌های عملی برای مربیان",
    icon: LayoutDashboard,
  },
  {
    title: "داده‌های خود را همگام‌سازی کنید",
    desc: "همگام‌سازی داده و تطبیق تمرین با هوش مصنوعی",
    extra: "اتصال ساعت و اپلیکیشن‌های ورزشی برای جمع‌آوری آسان داده‌ها",
    icon: Plug,
  },
  {
    title: "تمرین کنید، سازگار شوید، بهبود یابید",
    desc: "برنامه تمرینی با پیشرفت شما تکامل می‌یابد",
    extra: "بازخورد مداوم برای بهینه‌سازی بار تمرینی",
    icon: Monitor,
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-16" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="px-3 py-1 mb-4 text-xs font-medium rounded-full border border-border text-muted-foreground bg-background/40">
            تکنواسپرت
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            با مربی دیجیتال تمرین کنید و همیشه در اوج بمانید
          </h3>
          <p className="max-w-2xl text-sm sm:text-base text-muted-foreground">
            مانیتورینگ وضعیت ورزشکاران، برنامه‌های تمرینی شخصی‌سازی‌شده و
            توصیه‌های عملی برای مربیان تا عملکرد تیم و فرد را به سطح بعدی ببرید.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => {
            const Icon = it.icon as React.ElementType;
            return (
              <article
                key={it.title}
                className="p-6 rounded-2xl border border-border bg-background/50 shadow-sm hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                    <Icon className="w-6 h-6" />
                  </span>
                  <div>
                    <h4 className="text-sm sm:text-base font-semibold">
                      {it.title}
                    </h4>
                    {it.subtitle && (
                      <p className="text-[11px] text-muted-foreground/90 mt-1">
                        {it.subtitle}
                      </p>
                    )}
                  </div>
                </div>

                {it.desc && (
                  <p className="text-[13px] text-muted-foreground leading-6 mb-1">
                    {it.desc}
                  </p>
                )}

                {it.extra && (
                  <p className="text-[12px] text-muted-foreground/90 mb-2">
                    {it.extra}
                  </p>
                )}

                {it.bullets && (
                  <ul className="mt-2 text-[13px] text-muted-foreground list-inside space-y-2">
                    {it.bullets.map((b: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-primary mt-1">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
