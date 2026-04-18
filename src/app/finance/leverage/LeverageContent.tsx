"use client";

import { Scale } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function LeverageContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="leverage"
      icon={<Scale size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Scale className="w-8 h-8 text-slate-900" />}
      xp={170}
      badge={t.badges.leverage}
      content={t.leverage}
      nextModuleLink="/finance/perp"
    />
  );
}
