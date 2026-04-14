"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Zap, Trophy, BookOpen, ChevronRight } from "lucide-react";
import { useLocale } from "@/lib/useLocale";
import { TopBar } from "@/components/TopBar";

const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute w-1 h-1 bg-[var(--sol-purple)] rounded-full opacity-40"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 0.5,
          }}
        />
      ))}
    </div>
  );
};

const StatCard = ({
  value,
  label,
  icon: Icon,
  delay,
}: {
  value: string;
  label: string;
  icon: typeof Zap;
  delay: number;
}) => (
  <motion.div
    className="game-card p-6 flex flex-col items-center gap-3 min-w-[100px] sm:min-w-[140px]"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6 }}
  >
    <Icon size={28} className="text-[var(--sol-green)]" />
    <div className="text-3xl font-bold bg-gradient-to-r from-[var(--sol-purple)] to-[var(--sol-green)] bg-clip-text text-transparent">
      {value}
    </div>
    <div className="text-sm text-[var(--sol-text-muted)] text-center">{label}</div>
  </motion.div>
);

export default function HomeContent() {
  const { t } = useLocale();

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      <TopBar />
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--sol-dark)] via-[var(--sol-darker)] to-[var(--sol-dark)] -z-10" />

      {/* Particles effect */}
      <Particles />

      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-5 -z-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(153, 69, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(153, 69, 255, 0.1) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      {/* Glow effect top right */}
      <div className="absolute top-0 right-0 w-48 h-48 sm:w-96 sm:h-96 bg-[var(--sol-purple)] rounded-full blur-3xl opacity-10 -z-10" />

      {/* Main content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-20 max-w-6xl mx-auto w-full flex flex-col">
        {/* Hero title */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-5xl md:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-[var(--sol-purple)] via-[var(--sol-blue)] to-[var(--sol-green)] bg-clip-text text-transparent drop-shadow-lg">
              SolQuest
            </span>
          </h1>
          <p className="text-base sm:text-xl md:text-2xl text-[var(--sol-text-muted)] font-light">
            {t.home.subtitle}
          </p>
        </motion.div>

        {/* Narrative intro box */}
        <motion.div
          className="narrative-box mb-12"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <span className="narrator">{t.home.narratorLabel}</span>
          <p>
            {t.home.narratorText}
          </p>
        </motion.div>

        {/* Stats section */}
        <motion.div
          className="flex justify-center gap-4 sm:gap-6 mb-12 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <StatCard value="5" label={t.home.statModules} icon={BookOpen} delay={0.5} />
          <StatCard value="640 XP" label={t.home.statXpToEarn} icon={Zap} delay={0.6} />
          <StatCard value="5" label={t.home.statBadges} icon={Trophy} delay={0.7} />
        </motion.div>

        {/* Chapters Section */}
        <motion.div
          className="w-full max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-text)] text-center mb-6">
            {t.home.chaptersTitle}
          </h2>

          <Link href="/basics">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-[var(--sol-card)] border border-[var(--sol-card-hover)] hover:border-[var(--sol-purple)]/40 rounded-xl p-5 sm:p-6 transition-colors cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--sol-purple)]/20 to-[var(--sol-green)]/20 flex items-center justify-center">
                    <BookOpen size={24} className="text-[var(--sol-purple)]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[var(--sol-text)] text-base sm:text-lg">
                      {t.basics.pageTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-[var(--sol-text-muted)]">
                      5 {t.home.chapterModules} — 640 XP
                    </p>
                  </div>
                </div>
                <ChevronRight size={20} className="text-[var(--sol-text-muted)]" />
              </div>
            </motion.div>
          </Link>

          <motion.div
            className="mt-4 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
          >
            <Link href="/basics">
              <button className="btn-primary text-base px-6 py-3 sm:text-lg sm:px-10 sm:py-4 transition-all duration-300">
                {t.home.exploreWithoutAccount}
              </button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Floating accent shapes */}
        <div className="absolute top-1/4 left-10 w-16 h-16 sm:w-32 sm:h-32 bg-[var(--sol-purple)] rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-1/4 right-10 w-20 h-20 sm:w-40 sm:h-40 bg-[var(--sol-green)] rounded-full blur-3xl opacity-5" />
      </main>
    </div>
  );
}
