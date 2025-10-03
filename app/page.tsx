import React from "react";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { ChartsShowcase } from "@/components/landing/ChartsShowcase";
import ProductShowcase from "@/components/landing/ProductShowcase";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-background/60 via-background/50 to-background/70">
      <main className="max-w-7xl mx-auto px-4" dir="rtl">
        <Hero />
        <Features />
        <ProductShowcase />

        <Pricing />
      </main>
      <Footer />
    </div>
  );
}
