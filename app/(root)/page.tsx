"use client";

import React from "react";
import { motion } from "framer-motion";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { ChartsShowcase } from "@/components/landing/ChartsShowcase";
import ProductShowcase from "@/components/landing/ProductShowcase";
import { Pricing } from "@/components/landing/Pricing";
import { Footer } from "@/components/landing/Footer";

// Reusable animated section wrapper for smooth on-scroll reveal
// Skips Footer (wrapped only around main content sections)
const Section: React.FC<{
  children: React.ReactNode;
  delay?: number;
  id?: string;
}> = ({ children, delay = 0, id }) => (
  <motion.section
    id={id}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, amount: 0.2 }}
    variants={{
      hidden: { opacity: 0, y: 24 },
      show: {
        opacity: 1,
        y: 0,
        transition: {
          duration: 0.6,
          ease: [0.22, 1, 0.36, 1],
          delay,
        },
      },
    }}
  >
    {children}
  </motion.section>
);

export default function Page() {
  return (
    <div className="bg-gradient-to-b from-background/60 via-background/50 to-background/70">
      <main className="max-w-7xl mx-auto px-4" dir="rtl">
        {/* Task: Add clean landing animation to Hero */}
        <Section id="hero" delay={0}>
          <Hero />
        </Section>

        {/* Task: Animate Features section items on reveal */}
        <Section id="features" delay={0.05}>
          <Features />
        </Section>

        {/* Task: Smooth fade-up for ProductShowcase on scroll */}
        <Section id="product" delay={0.08}>
          <ProductShowcase />
        </Section>

        {/* Task: Intro animation for Pricing cards */}
        <Section id="pricing" delay={0.1}>
          <Pricing />
        </Section>
      </main>
      <Footer />
    </div>
  );
}
