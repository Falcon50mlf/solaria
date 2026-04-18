"use client";

import { Landmark } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function DefiContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="defi"
      icon={<Landmark size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Landmark className="w-8 h-8 text-slate-900" />}
      xp={150}
      badge={t.badges.defi}
      content={t.defi}
      nextModuleLink="/finance/staking"
    />
  );
}
