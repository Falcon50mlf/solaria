"use client";

import { useGameState } from "@/lib/useGameState";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Clock,
  Waves,
  GitBranch,
  Archive,
  Gauge,
  Vote,
  RotateCw,
  Activity,
  Building2,
  Wind,
  Database,
  Hourglass,
  Coins,
  Boxes,
  Zap,
  Lock,
  CheckCircle2,
  Trophy,
  ChevronLeft,
  ArrowRight,
} from "lucide-react";
import { useLocale } from "@/lib/useLocale";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SolariaLogo } from "@/components/SolariaLogo";

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.05, duration: 0.4, ease: "easeOut" as const },
  }),
};

export default function InfrastructureContent() {
  const { t } = useLocale();
  usePrivy();
  const { totalXp, level, modules, badges } = useGameState();

  const MODULES = [
    { id: "poh", title: t.infrastructure.modules.poh.title, subtitle: t.infrastructure.modules.poh.subtitle, icon: Clock, maxXp: 180, link: "/infrastructure/poh", step: 1 },
    { id: "gulfstream", title: t.infrastructure.modules.gulfstream.title, subtitle: t.infrastructure.modules.gulfstream.subtitle, icon: Waves, maxXp: 170, link: "/infrastructure/gulfstream", step: 2 },
    { id: "sealevel", title: t.infrastructure.modules.sealevel.title, subtitle: t.infrastructure.modules.sealevel.subtitle, icon: GitBranch, maxXp: 190, link: "/infrastructure/sealevel", step: 3 },
    { id: "archivers", title: t.infrastructure.modules.archivers.title, subtitle: t.infrastructure.modules.archivers.subtitle, icon: Archive, maxXp: 150, link: "/infrastructure/archivers", step: 4 },
    { id: "tps", title: t.infrastructure.modules.tps.title, subtitle: t.infrastructure.modules.tps.subtitle, icon: Gauge, maxXp: 140, link: "/infrastructure/tps", step: 5 },
    { id: "votetx", title: t.infrastructure.modules.votetx.title, subtitle: t.infrastructure.modules.votetx.subtitle, icon: Vote, maxXp: 160, link: "/infrastructure/votetx", step: 6 },
    { id: "restart", title: t.infrastructure.modules.restart.title, subtitle: t.infrastructure.modules.restart.subtitle, icon: RotateCw, maxXp: 170, link: "/infrastructure/restart", step: 7 },
    { id: "congestion", title: t.infrastructure.modules.congestion.title, subtitle: t.infrastructure.modules.congestion.subtitle, icon: Activity, maxXp: 160, link: "/infrastructure/congestion", step: 8 },
    { id: "tower", title: t.infrastructure.modules.tower.title, subtitle: t.infrastructure.modules.tower.subtitle, icon: Building2, maxXp: 180, link: "/infrastructure/tower", step: 9 },
    { id: "turbine", title: t.infrastructure.modules.turbine.title, subtitle: t.infrastructure.modules.turbine.subtitle, icon: Wind, maxXp: 170, link: "/infrastructure/turbine", step: 10 },
    { id: "cloudbreak", title: t.infrastructure.modules.cloudbreak.title, subtitle: t.infrastructure.modules.cloudbreak.subtitle, icon: Database, maxXp: 180, link: "/infrastructure/cloudbreak", step: 11 },
    { id: "slot", title: t.infrastructure.modules.slot.title, subtitle: t.infrastructure.modules.slot.subtitle, icon: Hourglass, maxXp: 150, link: "/infrastructure/slot", step: 12 },
    { id: "economics", title: t.infrastructure.modules.economics.title, subtitle: t.infrastructure.modules.economics.subtitle, icon: Coins, maxXp: 190, link: "/infrastructure/economics", step: 13 },
    { id: "cluster", title: t.infrastructure.modules.cluster.title, subtitle: t.infrastructure.modules.cluster.subtitle, icon: Boxes, maxXp: 150, link: "/infrastructure/cluster", step: 14 },
    { id: "jito", title: t.infrastructure.modules.jito.title, subtitle: t.infrastructure.modules.jito.subtitle, icon: Zap, maxXp: 200, link: "/infrastructure/jito", step: 15 },
  ];

  const moduleStates = new Map(modules.map((m) => [m.id, m]));
  const xpForNextLevel = level * 100;
  const xpProgress = Math.max(0, Math.min(100, ((totalXp - (level - 1) * 100) / 100) * 100));

  return (
    <div className="relative min-h-screen bg-[#111] text-white font-poppins overflow-hidden">
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-[420px] w-[667px] h-[667px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(20,241,149,0.2) 0%, rgba(20,241,149,0.05) 40%, rgba(17,17,17,0) 70%)",
        }}
      />

      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-4">
        <Link href="/" className="flex items-center gap-2">
          <SolariaLogo size={26} fill="white" />
          <span className="font-semibold text-xl">Solaria</span>
        </Link>
        <LanguageToggle />
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-4 sm:px-8 pt-4 pb-16">
        <Link
          href="/chapters"
          className="inline-flex items-center gap-1 text-[#919191] hover:text-white transition-colors mb-6 text-sm"
        >
          <ChevronLeft size={16} />
          {t.login.backHome}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="fg-card-green relative rounded-[28px] p-6 sm:p-8 mb-8 flex flex-wrap items-center justify-between gap-6 overflow-hidden"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#9945ff] to-[#14f195] flex flex-col items-center justify-center">
              <span className="text-2xl font-bold leading-none">{level}</span>
              <span className="text-[9px] uppercase tracking-wider text-white/80">{t.common.lvl}</span>
            </div>
            <div className="min-w-[180px]">
              <div className="flex justify-between text-sm mb-1.5">
                <span className="text-[#919191]">{t.common.xp}</span>
                <span className="font-medium text-white">{totalXp} / {xpForNextLevel}</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden w-60">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${xpProgress}%` }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  className="h-full rounded-full bg-gradient-to-r from-[#9945ff] to-[#14f195]"
                />
              </div>
            </div>
          </div>
          {badges.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {badges.map((b, i) => (
                <span key={i} className="badge-blue inline-flex items-center gap-1.5">
                  <Trophy size={12} /> {b}
                </span>
              ))}
            </div>
          )}
        </motion.div>

        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[#14f195] to-[#00d4ff] bg-clip-text text-transparent">
              {t.infrastructure.pageTitle}
            </span>
          </h1>
          <p className="text-[#919191] text-base sm:text-lg">{t.infrastructure.pageSubtitle}</p>
        </motion.header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((m, idx) => {
            const state = moduleStates.get(m.id) || { completed: false, unlocked: false, xpEarned: 0 };
            const Icon = m.icon;
            const isLocked = !state.unlocked;
            const isCompleted = state.completed;

            const variantClass = isCompleted ? "fg-card-green" : isLocked ? "fg-card-blue" : "fg-card-purple";

            const card = (
              <motion.div
                custom={idx}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={isLocked ? {} : { y: -4 }}
                className={`${variantClass} relative rounded-[32px] p-6 sm:p-8 h-full min-h-[320px] flex flex-col gap-4 overflow-hidden ${
                  isLocked ? "opacity-70" : "cursor-pointer"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="text-[11px] uppercase tracking-wider text-white/60">
                    {t.common.step} {m.step}
                  </div>
                  {isCompleted && <CheckCircle2 size={20} className="text-[#14f195]" />}
                  {isLocked && <Lock size={18} className="text-white/50" />}
                </div>

                <div className="w-14 h-14 rounded-xl bg-white/10 flex items-center justify-center">
                  <Icon size={28} className={isCompleted ? "text-[#14f195]" : "text-white"} />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold mb-1.5">{m.title}</h3>
                  <p className="text-sm text-[#919191]">{m.subtitle}</p>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <span className="inline-flex items-center gap-1.5 text-sm">
                    <Zap size={14} className={isCompleted ? "text-[#14f195]" : "text-[#9945ff]"} />
                    {isCompleted ? `+${state.xpEarned}` : m.maxXp} XP
                  </span>
                  {isLocked ? (
                    <span className="text-xs text-white/40 uppercase tracking-wider">{t.common.locked}</span>
                  ) : (
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium ${
                        isCompleted ? "text-[#14f195]" : "text-[#9945ff]"
                      }`}
                    >
                      {isCompleted ? t.common.completed : t.common.start}
                      <ArrowRight size={14} />
                    </span>
                  )}
                </div>
              </motion.div>
            );

            return isLocked ? (
              <div key={m.id}>{card}</div>
            ) : (
              <Link key={m.id} href={m.link} className="block">
                {card}
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
}
