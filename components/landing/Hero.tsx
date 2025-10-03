import React from "react";
import { Button } from "@/components/ui/button";

export const Hero: React.FC = () => {
  return (
    <section className="py-24" dir="rtl">
      <div className="max-w-4xl mx-auto text-center px-4">
        <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full border border-border text-muted-foreground">
          پلتفرم هوشمند مدیریت کشتی
        </span>
        <h1 className="text-5xl  font-extrabold leading-tight tracking-tight">
          <span className="bg-gradient-to-l from-blue-600 to-red-700 bg-clip-text text-transparent">
            تکنواسپورت
          </span>
          <span className="mx-2">—</span>
          داشبورد
          <span className="mx-2 bg-gradient-to-l from-blue-700 to-red-700 bg-clip-text text-transparent">
            تحلیل عملکرد
          </span>
          برای باشگاه‌ها و تیم‌های کشتی
        </h1>
        <p className="mt-5 text-base sm:text-lg  text-muted-foreground leading-8">
          همه چیزِ مدیریت کشتی در یک‌جا: برنامه‌ریزی تمرین و دوره‌بندی، رصد وزن
          و وزن‌کشی، نتایج مسابقات روی تشک، خون‌نگاری و مکمل‌ها، و گزارش‌های
          تحلیلی برای تصمیم‌گیری سریع‌تر. با{" "}
          <span className="font-semibold bg-gradient-to-l from-blue-600 to-red-600 bg-clip-text text-transparent w-full">
            تکنواسپورت
          </span>{" "}
          تمرکزتان را روی رشد ورزشکاران بگذارید.
        </p>

        <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild size="lg">
            <a href="#pricing">شروع کنید با تکنواسپورت</a>
          </Button>
          <Button asChild size="lg">
            <a href="#features">مشاهده قابلیت‌ها</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
