import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export const Hero: React.FC = () => {
  return (
    <section className="py-24" dir="rtl">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col-reverse items-center gap-8 sm:flex-row-reverse sm:items-center">
          {/* Text column */}
          <div className="w-full text-center sm:w-1/2 sm:text-right">
            <span className="inline-block mb-4 px-3 py-1 text-xs font-semibold rounded-full border border-border text-muted-foreground">
              پلتفرم هوشمند مدیریت کشتی
            </span>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight">
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
            <p className="mt-5 text-base sm:text-lg text-muted-foreground leading-8">
              همه چیزِ مدیریت کشتی در یک‌جا: برنامه‌ریزی تمرین و دوره‌بندی، رصد
              وزن و وزن‌کشی، نتایج مسابقات روی تشک، خون‌نگاری و مکمل‌ها، و
              گزارش‌های تحلیلی برای تصمیم‌گیری سریع‌تر. با{" "}
              <span className="font-semibold bg-gradient-to-l from-blue-600 to-red-600 bg-clip-text text-transparent w-full">
                تکنواسپورت
              </span>{" "}
              تمرکزتان را روی رشد ورزشکاران بگذارید.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
              <Button asChild size="lg">
                <a href="#pricing">شروع کنید با تکنواسپورت</a>
              </Button>
              <Button asChild size="lg">
                <a href="#features">مشاهده قابلیت‌ها</a>
              </Button>
            </div>
          </div>

          {/* Image column */}
          <div className="w-full sm:w-1/3 flex justify-center sm:justify-end">
            <div className="relative w-full max-w-xs sm:max-w-md">
              <Image
                src="/landing.png"
                alt="تصویر معرفی تکنواسپورت — داشبورد مدیریت کشتی"
                width={360}
                height={200}
                className="rounded-lg "
                priority={false}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
