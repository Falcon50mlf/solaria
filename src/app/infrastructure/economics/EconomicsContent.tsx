"use client";

import { Coins } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function EconomicsContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="economics"
      icon={<Coins size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Coins className="w-8 h-8 text-slate-900" />}
      xp={190}
      badge={t.badges.economics}
      content={t.economics}
      nextModuleLink="/infrastructure/cluster"
    />
  );
}
