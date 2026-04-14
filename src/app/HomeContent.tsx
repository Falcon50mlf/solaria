"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Zap, Trophy, BookOpen } from "lucide-react";
import { useLocale } from "@/lib/useLocale";
import { LanguageToggle } from "@/components/LanguageToggle";
import { AuthButton } from "@/components/AuthButton";

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
    className="game-card p-6 flex flex-col items-center gap-3 min-w-[140px]"
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
      <LanguageToggle />
      <AuthButton />
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
      <div className="absolute top-0 right-0 w-96 h-96 bg-[var(--sol-purple)] rounded-full blur-3xl opacity-10 -z-10" />

      {/* Main content */}
      <main className="relative z-10 px-4 sm:px-6 lg:px-8 py-12 sm:py-20 max-w-6xl mx-auto w-full flex flex-col">
        {/* Hero title */}
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl sm:text-7xl font-bold mb-6 tracking-tight">
            <span className="bg-gradient-to-r from-[var(--sol-purple)] via-[var(--sol-blue)] to-[var(--sol-green)] bg-clip-text text-transparent drop-shadow-lg">
              SolQuest
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-[var(--sol-text-muted)] font-light">
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
          <StatCard value="3" label={t.home.statModules} icon={BookOpen} delay={0.5} />
          <StatCard value="370 XP" label={t.home.statXpToEarn} icon={Zap} delay={0.6} />
          <StatCard value="3" label={t.home.statBadges} icon={Trophy} delay={0.7} />
        </motion.div>

        {/* CTA Button */}
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <Link href="/basics">
            <button className="btn-primary text-lg px-10 py-4 shadow-lg hover:shadow-2xl transition-all duration-300">
              {t.home.startAdventure}
            </button>
          </Link>
        </motion.div>

        {/* Floating accent shapes */}
        <div className="absolute top-1/4 left-10 w-32 h-32 bg-[var(--sol-purple)] rounded-full blur-3xl opacity-5" />
        <div className="absolute bottom-1/4 right-10 w-40 h-40 bg-[var(--sol-green)] rounded-full blur-3xl opacity-5" />
      </main>
    </div>
  );
}
