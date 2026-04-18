"use client";

import { CandlestickChart } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function PerpContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="perp"
      icon={<CandlestickChart size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<CandlestickChart className="w-8 h-8 text-slate-900" />}
      xp={180}
      badge={t.badges.perp}
      content={t.perp}
      nextModuleLink="/finance/etfcrypto"
    />
  );
}
