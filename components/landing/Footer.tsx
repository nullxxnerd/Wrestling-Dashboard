"use client";
import React from "react";
import Image from "next/image";
import {
  FaTwitter,
  FaFacebookF,
  FaTelegramPlane,
  FaInstagram,
} from "react-icons/fa";

export const Footer: React.FC = () => {
  return (
    <footer
      className="mt-16 border-t border-border py-10 bg-background"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Website Links */}
          <div className="md:col-span-3 order-none">
            <div className="text-sm font-semibold mb-3">وب‌سایت</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  ویژگی‌ها
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  به ما اعتماد کنید
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  چرا تکنواسپورت؟
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  پلن‌ها
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  سیاست حفظ حریم خصوصی
                </a>
              </li>
            </ul>
          </div>

          {/* User Pages */}
          <div className="md:col-span-4 order-none">
            <div className="text-sm font-semibold mb-3">صفحات کاربر</div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  ورود
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  ثبت‌نام
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  بازیابی رمز عبور
                </a>
              </li>
            </ul>
          </div>

          {/* Brand + Newsletter (last column) */}
          <div className="md:col-span-5 space-y-4 order-last md:order-last">
            <div className="flex items-center gap-3">
              {/* Logo */}
              <Image
                src="/icon.png"
                alt="لوگوی بیزینس اینسایت"
                width={30}
                height={30}
                className="rounded-md border border-primary/20"
                priority
              />
              <div className="text-lg font-semibold text-foreground">
                تکنواسپورت
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              به خبرنامه ما بپیوندید تا از ویژگی‌ها و انتشارهای جدید باخبر شوید.
            </p>

            <form
              className="flex w-full max-w-md items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
              }}
            >
              <input
                type="email"
                placeholder="ایمیل خود را وارد کنید..."
                className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-primary"
                aria-label="ایمیل"
                required
              />
              <button
                type="submit"
                className="h-10 px-4 rounded-md bg-primary text-primary-foreground text-sm hover:opacity-90"
              >
                ارسال
              </button>
            </form>

            <div className="pt-2">
              <div className="text-sm font-medium mb-2">ما را دنبال کنید</div>
              <div className="flex items-center gap-2.5">
                <a
                  href="#"
                  aria-label="توئیتر"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-accent/50"
                >
                  <FaTwitter className="h-4 w-4" style={{ color: "#1DA1F2" }} />
                </a>
                <a
                  href="#"
                  aria-label="فیس‌بوک"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-accent/50"
                >
                  <FaFacebookF
                    className="h-4 w-4"
                    style={{ color: "#1877F2" }}
                  />
                </a>
                <a
                  href="#"
                  aria-label="تلگرام"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-accent/50"
                >
                  <FaTelegramPlane
                    className="h-4 w-4"
                    style={{ color: "#229ED9" }}
                  />
                </a>
                <a
                  href="#"
                  aria-label="اینستاگرام"
                  className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border hover:bg-accent/50"
                >
                  <FaInstagram
                    className="h-4 w-4"
                    style={{ color: "#E4405F" }}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-border pt-4 text-xs text-muted-foreground flex flex-col md:flex-row items-center justify-between gap-2">
          <div>© {new Date().getFullYear()} تکنواسپورت</div>
          <div className="flex gap-4">
            <a href="#" className="hover:text-foreground">
              قوانین و شرایط
            </a>
            <a href="#" className="hover:text-foreground">
              حریم خصوصی
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
