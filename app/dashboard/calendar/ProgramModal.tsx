"use client";

import * as React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  FiX as X,
  FiCalendar as Calendar,
  FiHeart as Heart,
  FiBarChart2 as BarChart,
  FiEdit2 as Edit,
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
          />
        </Dialog.Overlay>

        <Dialog.Content asChild onPointerDownOutside={(e) => e.preventDefault()}>
          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.95 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="fixed left-1/2 top-1/2 z-[110] w-[95vw] max-w-3xl -translate-x-1/2 -translate-y-1/2 rounded-lg border border-gray-200 bg-white shadow-2xl outline-none"
                dir="rtl"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-gray-200 bg-gradient-to-l from-blue-50 to-white rounded-t-lg">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <Calendar className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <Dialog.Title className="text-lg font-bold text-gray-900">
                        {selectedProgram?.title ?? "استراحت / بازیابی"}
                      </Dialog.Title>
                      <p className="text-sm text-gray-600 mt-0.5">
                        {selectedDate && new Date(selectedDate).toLocaleDateString('fa-IR')}
                        {selectedProgram?.focus && (
                          <span className="mr-2">• تمرکز: {selectedProgram.focus}</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <Dialog.Close asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="rounded-md border-gray-300 hover:bg-gray-100"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </Dialog.Close>
                </div>

                {/* Content */}
                <div className="p-6 space-y-4">
                  {selectedProgram ? (
                    <>
                      {/* Compact Summary */}
                      <div className="bg-gradient-to-l from-blue-50 to-white rounded-lg p-4 border border-blue-200">
                        <div className="flex items-center gap-2 mb-3">
                          <BarChart className="w-5 h-5 text-blue-600" />
                          <h3 className="font-semibold text-gray-900">
                            خلاصه تمرین
                          </h3>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {selectedProgram.blocks.length}
                            </div>
                            <div className="text-xs text-gray-600">حرکت</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              {selectedProgram.blocks.reduce((sum, b) => sum + b.sets, 0)}
                            </div>
                            <div className="text-xs text-gray-600">ست</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600">
                              ~{Math.round(selectedProgram.blocks.reduce((sum, b) => sum + b.sets, 0) * 1.5)}
                            </div>
                            <div className="text-xs text-gray-600">دقیقه</div>
                          </div>
                        </div>
                        <div className="space-y-2">
                          {selectedProgram.blocks.slice(0, 3).map((b, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 bg-white rounded-md p-2.5 border border-gray-200"
                            >
                              <div className="w-7 h-7 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-xs">
                                {idx + 1}
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-gray-900 text-sm truncate">{b.name}</p>
                                <p className="text-xs text-gray-600">
                                  {b.sets} ست × {b.reps} تکرار
                                </p>
                              </div>
                            </div>
                          ))}
                          {selectedProgram.blocks.length > 3 && (
                            <div className="text-center text-sm text-gray-500 py-1">
                              و {selectedProgram.blocks.length - 3} حرکت دیگر...
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Quick Info */}
                      <div className="grid grid-cols-2 gap-3">
                        <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">
                          <div className="flex items-center gap-2 mb-1">
                            <Heart className="w-4 h-4 text-green-600" />
                            <h4 className="font-semibold text-gray-900 text-sm">تغذیه</h4>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {selectedProgram.nutrition}
                          </p>
                        </div>
                        <div className="rounded-lg border border-gray-200 p-3 bg-gray-50">
                          <div className="flex items-center gap-2 mb-1">
                            <Heart className="w-4 h-4 text-purple-600" />
                            <h4 className="font-semibold text-gray-900 text-sm">بازیابی</h4>
                          </div>
                          <p className="text-xs text-gray-600 line-clamp-2">
                            {selectedProgram.recovery}
                          </p>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="rounded-lg border border-gray-200 p-6 bg-gray-50 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                        <Calendar className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">
                        روز استراحت
                      </h3>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        هیچ برنامه‌ای برنامه‌ریزی نشده. پیشنهاد: کاردیو سبک
                        ۲۰-۳۰ دقیقه، تحرک کامل بدن، و ۷-۹ ساعت خواب. هیدراته
                        بمانید و مصرف پروتئین را حفظ کنید.
                      </p>
                    </div>
                  )}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 border-t border-gray-200 bg-gray-50 rounded-b-lg flex justify-between gap-3">
                  <Dialog.Close asChild>
                    <Button
                      variant="outline"
                      className="rounded-md border-gray-300"
                    >
                      بستن
                    </Button>
                  </Dialog.Close>
                  {selectedProgram && (
                    <Link 
                      href={`/dashboard/training-program?date=${selectedDate}`}
                      onClick={() => onOpenChange(false)}
                    >
                      <Button className="rounded-md bg-blue-600 hover:bg-blue-700 text-white">
                        مشاهده جزئیات و شروع تمرین
                      </Button>
                    </Link>
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