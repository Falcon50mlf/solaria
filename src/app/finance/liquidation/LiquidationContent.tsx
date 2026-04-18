"use client";

import { TrendingDown } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function LiquidationContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="liquidation"
      icon={<TrendingDown size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<TrendingDown className="w-8 h-8 text-slate-900" />}
      xp={160}
      badge={t.badges.liquidation}
      content={t.liquidation}
      nextModuleLink="/finance/optionsonchain"
    />
  );
}
