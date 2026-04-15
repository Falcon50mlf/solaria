"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { TopBar } from "./TopBar";
import { useLocale } from "@/lib/useLocale";

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
  const { t } = useLocale();
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

              {/* Navigation buttons inline */}
              <div className="flex items-center justify-between gap-3 mt-10">
                <motion.button
                  onClick={goPrev}
                  disabled={currentSlide === 0}
                  whileHover={currentSlide === 0 ? {} : { x: -2 }}
                  whileTap={currentSlide === 0 ? {} : { scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors disabled:opacity-0 disabled:pointer-events-none text-slate-300 hover:text-white hover:bg-white/5 border border-white/10 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">{t.common.back}</span>
                </motion.button>

                <span className="text-xs font-mono tracking-wider text-slate-500">
                  {currentSlide + 1}<span className="mx-1 text-slate-600">/</span>{total}
                </span>

                {currentSlide < total - 1 && (
                  isNextBlocked ? (
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-amber-500/10 text-amber-300/90 border border-amber-500/30">
                      <Lock size={14} />
                      <span className="hidden sm:inline">{t.common.completePrevious}</span>
                    </div>
                  ) : (
                    <motion.button
                      onClick={goNext}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="group relative flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold text-white overflow-hidden cursor-pointer bg-gradient-to-r from-[var(--sol-purple)] to-[var(--sol-green)] shadow-[0_0_20px_rgba(153,69,255,0.35)] hover:shadow-[0_0_28px_rgba(20,241,149,0.45)] transition-shadow"
                    >
                      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                      <span className="relative">{t.common.continue}</span>
                      <motion.span
                        className="relative"
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight size={16} />
                      </motion.span>
                    </motion.button>
                  )
                )}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
}
