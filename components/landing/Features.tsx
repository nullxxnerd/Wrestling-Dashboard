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
    title: "داشبورد یکپارچه",
    desc: "همه داده‌های باشگاه، تیم‌ها، مسابقات و ورزشکاران را در یک پنل یکپارچه ببینید و بدون جابه‌جایی بین ابزارها مدیریت کنید.",
    icon: LayoutDashboard,
  },
  {
    title: "تحلیل لحظه‌ای",
    desc: "آمار وزن‌کشی، نتایج روی تشک و روند عملکرد را لحظه‌به‌لحظه رصد کنید و سریع‌تر تصمیم بگیرید.",
    icon: Activity,
  },
  {
    title: "گزارش‌های قابل‌سفارشی‌سازی",
    desc: "گزارش‌ها را متناسب با نیاز مربیان و مدیران بسازید؛ از نمودارهای پویا تا خروجی‌های تحلیلی.",
    icon: BarChart3,
  },
  {
    title: "سازگاری با یکپارچه‌سازی",
    desc: "به‌سادگی با ابزارهای فعلی‌تان همگام شوید؛ وارد کردن Excel/CSV و خروجی‌های مناسب فدراسیون.",
    icon: Plug,
  },
  {
    title: "رابط کاربری بهینه",
    desc: "طراحی روان و واکنش‌گرا برای مدیران، مربیان و ورزشکاران؛ کاربری ساده روی موبایل و دسکتاپ.",
    icon: Monitor,
  },
  {
    title: "امنیت در سطح سازمانی",
    desc: "حفظ محرمانگی داده‌ها با پروتکل‌های رمزنگاری و استانداردهای روز؛ کنترل دسترسی در همه سطوح.",
    icon: ShieldCheck,
  },
];

export const Features: React.FC = () => {
  return (
    <section id="features" className="py-16" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center text-center mb-10">
          <span className="px-3 py-1 mb-4 text-xs font-medium rounded-full border border-border text-muted-foreground bg-background/40">
            ویژگی‌ها
          </span>
          <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
            مدیریت داشبورد کشتی را ساده کنید
          </h3>
          <p className="max-w-2xl text-sm sm:text-base text-muted-foreground">
            با دسترسی لحظه‌ای به تحلیل‌ها، عملکرد را بسنجید، روندها را شناسایی کنید و
            تصمیم‌های دقیق‌تری برای تیم‌ها و مسابقات بگیرید.
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
                <div className="flex items-center gap-4 mb-3">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10 text-primary">
                    <Icon className="w-5 h-5" />
                  </span>
                  <h4 className="text-base sm:text-lg font-semibold">{it.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground leading-6">{it.desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

