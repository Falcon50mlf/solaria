"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { TopBar } from "./TopBar";

interface SlideLayoutProps {
  moduleTitle: string;
  moduleXp: number;
  backLink: string;
  backLabel: string;
  slides: ReactNode[];
  onComplete?: () => void;
  icon: ReactNode;
  canAdvance?: boolean[];
}

export function SlideLayout({
  moduleTitle,
  moduleXp,
  backLink,
  backLabel,
  slides,
  icon,
  canAdvance,
}: SlideLayoutProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [direction, setDirection] = useState(0);
  const total = slides.length;

  const isNextBlocked = canAdvance ? canAdvance[currentSlide] === false : false;

  const goNext = () => {
    if (currentSlide < total - 1 && !isNextBlocked) {
      setDirection(1);
      setCurrentSlide((s) => s + 1);
    }
  };

  const goPrev = () => {
    if (currentSlide > 0) {
      setDirection(-1);
      setCurrentSlide((s) => s - 1);
    }
  };

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 80 : -80,
      opacity: 0,
    }),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white flex flex-col">
      <TopBar />

      {/* Fixed Header */}
      <div className="sticky top-0 z-40 bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50">
        <div className="max-w-[720px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link
              href={backLink}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />
              {backLabel}
            </Link>
            <div className="flex items-center gap-2 text-sm">
              {icon}
              <span className="font-semibold text-white">{moduleTitle}</span>
            </div>
            <span className="text-sm font-mono text-[var(--sol-green)]">
              {moduleXp} XP
            </span>
          </div>

          {/* Progress dots */}
          <div className="flex gap-1">
            {slides.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i < currentSlide
                    ? "bg-[var(--sol-green)]"
                    : i === currentSlide
                      ? "bg-[var(--sol-purple)]"
                      : "bg-slate-700"
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.03, duration: 0.2 }}
                style={{ transformOrigin: "left" }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center px-4 py-6 sm:py-10">
        <div className="max-w-[680px] w-full mx-auto flex-1 flex items-center">
          <AnimatePresence mode="wait" custom={direction}>
            <motion.div
              key={currentSlide}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              {slides[currentSlide]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="sticky bottom-0 z-40 bg-slate-900/80 backdrop-blur-md border-t border-slate-700/50">
        <div className="max-w-[680px] mx-auto px-4 py-3 flex items-center justify-between">
          <button
            onClick={goPrev}
            disabled={currentSlide === 0}
            className="flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:opacity-20 disabled:cursor-default text-slate-300 hover:text-white hover:bg-slate-800 cursor-pointer"
          >
            <ChevronLeft size={18} />
          </button>

          <span className="text-sm font-mono text-slate-400">
            {currentSlide + 1} / {total}
          </span>

          <button
            onClick={goNext}
            disabled={currentSlide === total - 1 || isNextBlocked}
            className={`flex items-center gap-1 px-4 py-2 rounded-lg text-sm font-medium transition-all disabled:cursor-default cursor-pointer ${
              isNextBlocked
                ? "disabled:opacity-30 text-slate-500"
                : "disabled:opacity-20 text-[var(--sol-green)] hover:bg-[var(--sol-green)]/10 hover:shadow-[0_0_15px_rgba(20,241,149,0.2)]"
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
