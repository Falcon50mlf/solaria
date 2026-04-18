"use client";

import { BarChart3 } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function SpreadContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="spread"
      icon={<BarChart3 size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<BarChart3 className="w-8 h-8 text-slate-900" />}
      xp={130}
      badge={t.badges.spread}
      content={t.spread}
      nextModuleLink="/finance/liquidation"
    />
  );
}
