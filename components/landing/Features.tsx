import React from "react";
import {
  LayoutDashboard,
  Activity,
  BarChart3,
  Plug,
  Monitor,
  ShieldCheck,
  Users2,
  Target,
  Cpu,
} from "lucide-react";

const featureItems = [
  {
    title: "درباره خودتان بگویید",
    desc: "ورزش، تجربه، هدف تمرینی و زمان موجود خود را انتخاب کنید",
    icon: BarChart3,
  },
  {
    title: "برنامه شخصی‌سازی‌شده دریافت کنی",
    desc: "یک برنامه تمرینی پویا که مطابق با داده‌های عملکرد شما تنظیم می‌شود",
    icon: LayoutDashboard,
  },
  {
    title: "داده‌های خود را همگام‌سازی کنید",
    desc: "تکنواسپرت تمرین شما را به کمک هوش مصنوعی و بر اساس داده‌های ورزشی‌تان تطبیق می‌دهد",
    icon: Activity,
  },
  {
    title: "تمرین کنید، سازگار شوید، بهبود یابید",
    desc: "برنامه تمرینی شما به طور هوشمند و بر اساس داده‌های علمی ورزش، با پیشرفت شما تکامل می‌یابد",
    icon: Monitor,
  },
  {
    title: "شبکه ارتباطی امن",
    desc: "ارتباط بین مربیان، ورزشکاران و آنالیزورها را در کانال‌های اختصاصی و محافظت‌شده برقرار کنید.",
    icon: Users2,
  },
  {
    title: "اتصال آسان داده‌ها",
    desc: "سنسورها و پوشیدنی‌ها را به‌سادگی متصل کنید و داده‌ها را در یک نمای واحد ببینید.",
    icon: Plug,
  },
];

const whyItems = [
  {
    title: "تعامل با مربی",
    desc: "مربیان می‌توانند به راحتی داده‌های خود را وارد کنند و طراحی کاربرپسند، این امکان را می‌دهد که بدون پیچیدگی، به راحتی با داده‌ها تعامل کنند",
    icon: Target,
  },
  {
    title: "سرعت و دقت تصمیم‌گیری",
    desc: "آمار ورزشکاران خود را بصورت لحظه‌ای رصد کنید و با سرعت بیشتری تصمیم بگیرید",
    icon: ShieldCheck,
  },
  {
    title: "گزارش های شخصی سازی شده",
    desc: "گزارش‌ها متناسب با نیاز مربیان و مدیران ساخته می‌شود؛ از نمودارهای پویا تا خروجی‌های تحلی",
    icon: Cpu,
  },
  ,
  {
    title: "سرعت و دقت تصمیم‌گیری",
    desc: "آمار ورزشکاران خود را بصورت لحظه‌ای رصد کنید و با سرعت بیشتری تصمیم بگیرید",
    icon: ShieldCheck,
  },
  {
    title: "ارائه توصیه های کاربردی",
    desc: "توصیه‌های کاربردی به مربی براساس داده‌های عملکردی ورزشکاران",
    icon: Cpu,
  },
];

export const Features: React.FC = () => {
  return (
    <>
      <section id="features" className="py-16" dir="rtl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="px-3 py-1 mb-4 text-xs font-medium rounded-full border border-border text-muted-foreground bg-background/40">
              ویژگی‌های کلیدی
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              همه ابزارهای کشتی حرفه‌ای در یک پلتفرم
            </h3>
            <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-7">
              تکنواسپورت زیرساختی یکپارچه برای مدیریت تیم‌ها، تحلیل عملکرد و
              سرعت بخشیدن به تصمیم‌گیری مربیان فراهم می‌کند.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featureItems.map((item) => {
              const Icon = item.icon as React.ElementType;
              return (
                <article
                  key={item.title}
                  className="p-6 rounded-2xl border border-border bg-background/60 shadow-sm hover:-translate-y-1 hover:shadow-lg transition-all duration-200 "
                >
                  <div className="flex flex-row items-center gap-2  ">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-4">
                      <Icon className="w-6 h-6" />
                    </span>
                    <h4 className="text-base font-semibold mb-2">
                      {item.title}
                    </h4>
                  </div>

                  <p className="text-[13px] text-muted-foreground leading-6">
                    {item.desc}
                  </p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section
        id="why-technosport"
        className="pt-16  border-t border-border/60"
        dir="rtl"
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col items-center text-center mb-12">
            <span className="px-3 py-1 mb-4 text-xs font-medium rounded-full border border-border text-muted-foreground">
              چرا تکنواسپورت؟
            </span>
            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-3">
              انتخابی هوشمند برای باشگاه‌های کشتی
            </h3>
            <p className="max-w-2xl text-sm sm:text-base text-muted-foreground leading-7">
              ما تجربه مربیان نخبه را با تکنولوژی روز ترکیب کرده‌ایم تا مسیر
              استعدادیابی، آنالیز و رشد ورزشکاران شما شفاف و قابل سنجش باشد.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-14">
            {whyItems.map((item) => {
              const Icon = item.icon as React.ElementType;
              return (
                <article
                  key={item.title}
                  className="p-6 rounded-2xl border border-border bg-background shadow-sm hover:shadow-md transition-shadow duration-200"
                >
                  <div className="flex items-start gap-4">
                    <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary flex-shrink-0">
                      <Icon className="w-6 h-6" />
                    </span>
                    <div>
                      <h4 className="text-base font-semibold mb-2">
                        {item.title}
                      </h4>
                      <p className="text-[13px] text-muted-foreground leading-6">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};
