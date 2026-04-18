"use client";

import { useGameState } from "@/lib/useGameState";
import { usePrivy } from "@privy-io/react-auth";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Landmark,
  Coins,
  Droplets,
  ArrowLeftRight,
  Building,
  BarChart3,
  TrendingDown,
  Target,
  PieChart,
  Lock as LockIcon,
  CircleDollarSign,
  Sprout,
  Repeat2,
  AlertTriangle,
  BookOpen,
  Scale,
  CandlestickChart,
  LineChart,
  Percent,
  CheckCircle2,
  Trophy,
  Zap,
  Lock,
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

export default function FinanceContent() {
  const { t } = useLocale();
  usePrivy();
  const { totalXp, level, modules, badges } = useGameState();

  const MODULES = [
    { id: "defi", title: t.finance.modules.defi.title, subtitle: t.finance.modules.defi.subtitle, icon: Landmark, maxXp: 150, link: "/finance/defi", step: 1 },
    { id: "staking", title: t.finance.modules.staking.title, subtitle: t.finance.modules.staking.subtitle, icon: Coins, maxXp: 140, link: "/finance/staking", step: 2 },
    { id: "liquiditypool", title: t.finance.modules.liquiditypool.title, subtitle: t.finance.modules.liquiditypool.subtitle, icon: Droplets, maxXp: 170, link: "/finance/liquiditypool", step: 3 },
    { id: "swap", title: t.finance.modules.swap.title, subtitle: t.finance.modules.swap.subtitle, icon: ArrowLeftRight, maxXp: 120, link: "/finance/swap", step: 4 },
    { id: "cexdex", title: t.finance.modules.cexdex.title, subtitle: t.finance.modules.cexdex.subtitle, icon: Building, maxXp: 140, link: "/finance/cexdex", step: 5 },
    { id: "spread", title: t.finance.modules.spread.title, subtitle: t.finance.modules.spread.subtitle, icon: BarChart3, maxXp: 130, link: "/finance/spread", step: 6 },
    { id: "liquidation", title: t.finance.modules.liquidation.title, subtitle: t.finance.modules.liquidation.subtitle, icon: TrendingDown, maxXp: 160, link: "/finance/liquidation", step: 7 },
    { id: "optionsonchain", title: t.finance.modules.optionsonchain.title, subtitle: t.finance.modules.optionsonchain.subtitle, icon: Target, maxXp: 180, link: "/finance/optionsonchain", step: 8 },
    { id: "indextokens", title: t.finance.modules.indextokens.title, subtitle: t.finance.modules.indextokens.subtitle, icon: PieChart, maxXp: 150, link: "/finance/indextokens", step: 9 },
    { id: "tvl", title: t.finance.modules.tvl.title, subtitle: t.finance.modules.tvl.subtitle, icon: LockIcon, maxXp: 130, link: "/finance/tvl", step: 10 },
    { id: "soltoken", title: t.finance.modules.soltoken.title, subtitle: t.finance.modules.soltoken.subtitle, icon: CircleDollarSign, maxXp: 140, link: "/finance/soltoken", step: 11 },
    { id: "yieldfarming", title: t.finance.modules.yieldfarming.title, subtitle: t.finance.modules.yieldfarming.subtitle, icon: Sprout, maxXp: 170, link: "/finance/yieldfarming", step: 12 },
    { id: "amm", title: t.finance.modules.amm.title, subtitle: t.finance.modules.amm.subtitle, icon: Repeat2, maxXp: 180, link: "/finance/amm", step: 13 },
    { id: "slippage", title: t.finance.modules.slippage.title, subtitle: t.finance.modules.slippage.subtitle, icon: AlertTriangle, maxXp: 130, link: "/finance/slippage", step: 14 },
    { id: "orderbook", title: t.finance.modules.orderbook.title, subtitle: t.finance.modules.orderbook.subtitle, icon: BookOpen, maxXp: 150, link: "/finance/orderbook", step: 15 },
    { id: "leverage", title: t.finance.modules.leverage.title, subtitle: t.finance.modules.leverage.subtitle, icon: Scale, maxXp: 170, link: "/finance/leverage", step: 16 },
    { id: "perp", title: t.finance.modules.perp.title, subtitle: t.finance.modules.perp.subtitle, icon: CandlestickChart, maxXp: 180, link: "/finance/perp", step: 17 },
    { id: "etfcrypto", title: t.finance.modules.etfcrypto.title, subtitle: t.finance.modules.etfcrypto.subtitle, icon: LineChart, maxXp: 140, link: "/finance/etfcrypto", step: 18 },
    { id: "apyapr", title: t.finance.modules.apyapr.title, subtitle: t.finance.modules.apyapr.subtitle, icon: Percent, maxXp: 120, link: "/finance/apyapr", step: 19 },
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
            "radial-gradient(circle, rgba(45,212,191,0.2) 0%, rgba(45,212,191,0.05) 40%, rgba(17,17,17,0) 70%)",
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
          className="fg-card-teal relative rounded-[28px] p-6 sm:p-8 mb-8 flex flex-wrap items-center justify-between gap-6 overflow-hidden"
        >
          <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2dd4bf] to-[#06b6d4] flex flex-col items-center justify-center">
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
                  className="h-full rounded-full bg-gradient-to-r from-[#2dd4bf] to-[#06b6d4]"
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
            <span className="bg-gradient-to-r from-[#2dd4bf] to-[#06b6d4] bg-clip-text text-transparent">
              {t.finance.pageTitle}
            </span>
          </h1>
          <p className="text-[#919191] text-base sm:text-lg">{t.finance.pageSubtitle}</p>
        </motion.header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((m, idx) => {
            const state = moduleStates.get(m.id) || { completed: false, unlocked: false, xpEarned: 0 };
            const Icon = m.icon;
            const isLocked = !state.unlocked;
            const isCompleted = state.completed;

            const variantClass = isCompleted ? "fg-card-green" : isLocked ? "fg-card-blue" : "fg-card-teal";

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
                    <Zap size={14} className={isCompleted ? "text-[#14f195]" : "text-[#2dd4bf]"} />
                    {isCompleted ? `+${state.xpEarned}` : m.maxXp} XP
                  </span>
                  {isLocked ? (
                    <span className="text-xs text-white/40 uppercase tracking-wider">{t.common.locked}</span>
                  ) : (
                    <span
                      className={`inline-flex items-center gap-1 text-sm font-medium ${
                        isCompleted ? "text-[#14f195]" : "text-[#2dd4bf]"
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
