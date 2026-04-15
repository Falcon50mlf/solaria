"use client";

import { useState, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ArrowRight, Lock } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/useLocale";
import { LanguageToggle } from "./LanguageToggle";

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
    enter: (dir: number) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({ x: dir < 0 ? 80 : -80, opacity: 0 }),
  };

  return (
    <div className="min-h-screen bg-[#111] text-white font-poppins flex flex-col relative overflow-hidden">
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-[420px] w-[667px] h-[667px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(153,69,255,0.18) 0%, rgba(153,69,255,0.04) 40%, rgba(17,17,17,0) 70%)",
        }}
      />

      <nav className="relative z-30 flex items-center justify-between px-6 sm:px-12 py-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-md bg-gradient-to-br from-[#9945ff] to-[#14f195]" />
          <span className="font-semibold text-xl">SolQuest</span>
        </Link>
        <LanguageToggle />
      </nav>

      {/* Module header */}
      <div className="sticky top-0 z-20 bg-[#111]/80 backdrop-blur-md border-b border-white/5">
        <div className="max-w-[720px] mx-auto px-4 py-3">
          <div className="flex items-center justify-between mb-2">
            <Link
              href={backLink}
              className="flex items-center gap-1.5 text-sm text-[#919191] hover:text-white transition-colors"
            >
              <ChevronLeft size={16} />
              {backLabel}
            </Link>
            <div className="flex items-center gap-2 text-sm">
              {icon}
              <span className="font-semibold">{moduleTitle}</span>
            </div>
            <span className="text-sm font-medium text-[#14f195]">{moduleXp} XP</span>
          </div>

          <div className="flex gap-1">
            {slides.map((_, i) => (
              <div
                key={i}
                className={`h-1 flex-1 rounded-full transition-colors duration-300 ${
                  i < currentSlide
                    ? "bg-[#14f195]"
                    : i === currentSlide
                      ? "bg-[#9945ff]"
                      : "bg-white/10"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Slide content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-4 py-6 sm:py-10">
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

              <div className="flex items-center justify-between gap-3 mt-10">
                <motion.button
                  onClick={goPrev}
                  disabled={currentSlide === 0}
                  whileHover={currentSlide === 0 ? {} : { x: -2 }}
                  whileTap={currentSlide === 0 ? {} : { scale: 0.97 }}
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-colors disabled:opacity-0 disabled:pointer-events-none text-[#919191] hover:text-white hover:bg-white/5 border border-white/10 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                  <span className="hidden sm:inline">{t.common.back}</span>
                </motion.button>

                <span className="text-xs font-mono tracking-wider text-white/40">
                  {currentSlide + 1}<span className="mx-1 text-white/30">/</span>{total}
                </span>

                {currentSlide < total - 1 &&
                  (isNextBlocked ? (
                    <div className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold bg-amber-500/10 text-amber-300/90 border border-amber-500/30">
                      <Lock size={14} />
                      <span className="hidden sm:inline">{t.common.completePrevious}</span>
                    </div>
                  ) : (
                    <motion.button
                      onClick={goNext}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="pill-purple inline-flex items-center gap-2 cursor-pointer"
                    >
                      <span>{t.common.continue}</span>
                      <motion.span
                        animate={{ x: [0, 3, 0] }}
                        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                      >
                        <ArrowRight size={16} />
                      </motion.span>
                    </motion.button>
                  ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
