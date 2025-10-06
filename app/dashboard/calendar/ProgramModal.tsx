"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  FiX as X,
  FiCalendar as Calendar,
  FiHeart as Heart,
  FiBarChart2 as BarChart,
} from "react-icons/fi";

type ProgramDetail = {
  title: string;
  focus: string;
  blocks: Array<{
    name: string;
    sets: number;
    reps: string | number;
    load?: string;
    notes?: string;
  }>;
  nutrition: string;
  recovery: string;
  aiRecommendations: string[];
};

export default function ProgramModal({
  open,
  onOpenChange,
  selectedDate,
  selectedProgram,
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  selectedDate: string | null;
  selectedProgram: ProgramDetail | null;
}) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay asChild>
          <motion.div
            initial={{ opacity: 0.3 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-xs"
          />
        </Dialog.Overlay>

        <Dialog.Content asChild>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.8 }}
                transition={{ duration: 0.18, ease: "circOut" }}
                className="fixed left-1/2 top-1/2 z-[110] w-[95vw] max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-xl border bg-white p-0 shadow-2xl outline-none"
              >
                <div className="flex items-start justify-between gap-4 px-5 py-4 border-b bg-gray-50 rounded-t-xl">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-gray-700" />
                    <div>
                      <Dialog.Title className="text-lg font-semibold">
                        {selectedProgram?.title ?? "استراحت / بازیابی"}
                      </Dialog.Title>
                      <p className="text-sm text-muted-foreground">
                        {selectedDate}
                        {selectedProgram?.focus
                          ? ` • تمرکز: ${selectedProgram.focus}`
                          : ""}
                      </p>
                    </div>
                  </div>
                  <Dialog.Close asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-md border-gray-200"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </Dialog.Close>
                </div>

                <div className="p-5 space-y-4">
                  {selectedProgram ? (
                    <>
                      <section>
                        <h3 className="font-medium mb-2 flex items-center gap-2">
                          <BarChart className="w-4 h-4 text-gray-600" />{" "}
                          بلوک‌های تمرین
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedProgram.blocks.map((b, idx) => (
                            <li key={idx}>
                              <span className="font-medium">{b.name}</span> —{" "}
                              {b.sets} x {b.reps}
                              {b.load ? ` @ ${b.load}` : ""}
                              {b.notes ? ` (${b.notes})` : ""}
                            </li>
                          ))}
                        </ul>
                      </section>

                      <section className="grid sm:grid-cols-2 gap-3">
                        <div className="rounded-md border border-gray-200 p-3 bg-gray-50">
                          <h4 className="font-medium mb-1 flex items-center gap-2">
                            <Heart className="w-4 h-4 text-gray-700" /> تغذیه
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedProgram.nutrition}
                          </p>
                        </div>
                        <div className="rounded-md border border-gray-200 p-3 bg-gray-50">
                          <h4 className="font-medium mb-1 flex items-center gap-2">
                            <Heart className="w-4 h-4 text-gray-700" /> بازیابی
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {selectedProgram.recovery}
                          </p>
                        </div>
                      </section>

                      <section>
                        <h3 className="font-medium mb-2">
                          توصیه‌های هوش مصنوعی
                        </h3>
                        <ul className="list-disc pl-5 space-y-1">
                          {selectedProgram.aiRecommendations.map((r, i) => (
                            <li key={i} className="text-sm">
                              {r}
                            </li>
                          ))}
                        </ul>
                      </section>
                    </>
                  ) : (
                    <div className="rounded-md border border-gray-200 p-4">
                      <p className="text-sm">
                        هیچ برنامه‌ای برنامه‌ریزی نشده. پیشنهاد: کاردیو سبک
                        ۲۰-۳۰ دقیقه، تحرک کامل بدن، و ۷-۹ ساعت خواب. هیدراته
                        بمانید و مصرف پروتئین را حفظ کنید.
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
