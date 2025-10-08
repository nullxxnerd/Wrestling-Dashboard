"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronDown, FiCheck } from "react-icons/fi";
import { FaChevronUp, FaChevronDown } from "react-icons/fa";

type Wrestler = {
  id: string;
  nameFa: string;
  currentWeightKg: number;
  targetWeightKg: number;
  imageUrl?: string;
};

const wrestlers: Wrestler[] = [
  { id: "1", nameFa: "حسن یزدانی", currentWeightKg: 86, targetWeightKg: 86 },
  { id: "2", nameFa: "علیرضا دبیر", currentWeightKg: 74, targetWeightKg: 74 },
  { id: "3", nameFa: "پرویز هادی", currentWeightKg: 125, targetWeightKg: 125 },
  { id: "4", nameFa: "امیرحسین زارع", currentWeightKg: 97, targetWeightKg: 97 },
];

export default function WrestlerSelect() {
  const [isOpen, setIsOpen] = useState(false);
  const [value, setValue] = useState<string | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(
    () => wrestlers.find((w) => w.id === value),
    [value]
  );

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return (
    <div ref={containerRef} className="w-72 relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        dir="rtl"
        className="inline-flex w-full items-center gap-3 rounded-md border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 transition"
        aria-label="انتخاب کشتی‌گیر"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
          <span className="text-sm text-gray-700">
            {(selected?.nameFa ?? "ان").at(0)}
          </span>
        </span>
        <span className="flex min-w-0 flex-col items-start text-right">
          <span className="truncate font-medium">
            {selected?.nameFa ?? "انتخاب کشتی‌گیر"}
          </span>
          <span className="truncate text-xs text-gray-500">
            {selected
              ? `وزن فعلی: ${selected.currentWeightKg} کیلو • هدف: ${selected.targetWeightKg} کیلو`
              : "یک کشتی‌گیر را انتخاب کنید"}
          </span>
        </span>
        <motion.div
          className="ms-auto"
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <FiChevronDown className="h-4 w-4 text-gray-600" />
        </motion.div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            ref={dropdownRef}
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15, ease: "easeOut" }}
            className="absolute z-[9999] mt-2 w-full overflow-hidden rounded-md border border-gray-200 bg-white shadow-lg"
            role="listbox"
          >
            <div className="max-h-72 overflow-y-auto p-1">
              {wrestlers.map((w) => (
                <motion.button
                  key={w.id}
                  onClick={() => {
                    setValue(w.id);
                    setIsOpen(false);
                  }}
                  className={`group relative flex w-full cursor-pointer select-none items-center gap-3 rounded-md px-2 py-2 text-sm text-gray-800 hover:bg-gray-100 ${
                    value === w.id ? "bg-gray-50" : ""
                  }`}
                  role="option"
                  aria-selected={value === w.id}
                >
                  <span className="inline-flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-gray-200 bg-gray-50">
                    <span className="text-sm text-gray-700">
                      {w.nameFa.at(0)}
                    </span>
                  </span>
                  <span className="flex min-w-0 flex-col items-start text-right">
                    <span className="font-medium">{w.nameFa}</span>
                    <span className="text-xs text-gray-500">
                      {`وزن فعلی: ${w.currentWeightKg} کیلو • هدف: ${w.targetWeightKg} کیلو`}
                    </span>
                  </span>
                  {value === w.id && (
                    <FiCheck className="ml-auto h-4 w-4 text-gray-700" />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
