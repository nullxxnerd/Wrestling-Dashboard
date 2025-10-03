import React from "react";
import { Button } from "@/components/ui/button";

export const Hero: React.FC = () => {
  return (
    <section className="py-20">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
          Wrestling MVP — نقشه‌ها و نمودارهای عملکرد برای کشتی
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          عملکرد ورزشکاران را با نقشه‌های فضایی، نمودارهای روند و بینش‌های متنی
          ببینید — طراحی‌شده برای مربیان و ورزشکاران کشتی. سریع، پاسخگو و
          محافظت‌شده از حریم خصوصی.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild>
            <a href="#pricing">شروع کنید — آزمایشی رایگان</a>
          </Button>
          <Button variant="ghost" asChild>
            <a href="#features">مشاهده امکانات</a>
          </Button>
        </div>
      </div>
    </section>
  );
};
