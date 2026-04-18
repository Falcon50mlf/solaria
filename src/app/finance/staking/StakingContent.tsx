"use client";

import { Coins } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function StakingContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="staking"
      icon={<Coins size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Coins className="w-8 h-8 text-slate-900" />}
      xp={140}
      badge={t.badges.staking}
      content={t.staking}
      nextModuleLink="/finance/liquiditypool"
    />
  );
}
