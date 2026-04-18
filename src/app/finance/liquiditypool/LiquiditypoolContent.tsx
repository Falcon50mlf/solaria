"use client";

import { Droplets } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function LiquiditypoolContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="liquiditypool"
      icon={<Droplets size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Droplets className="w-8 h-8 text-slate-900" />}
      xp={170}
      badge={t.badges.liquiditypool}
      content={t.liquiditypool}
      nextModuleLink="/finance/swap"
    />
  );
}
