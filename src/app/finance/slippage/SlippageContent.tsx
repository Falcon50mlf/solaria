"use client";

import { AlertTriangle } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function SlippageContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="slippage"
      icon={<AlertTriangle size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<AlertTriangle className="w-8 h-8 text-slate-900" />}
      xp={130}
      badge={t.badges.slippage}
      content={t.slippage}
      nextModuleLink="/finance/orderbook"
    />
  );
}
