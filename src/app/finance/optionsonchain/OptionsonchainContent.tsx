"use client";

import { Target } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function OptionsonchainContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="optionsonchain"
      icon={<Target size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Target className="w-8 h-8 text-slate-900" />}
      xp={180}
      badge={t.badges.optionsonchain}
      content={t.optionsonchain}
      nextModuleLink="/finance/indextokens"
    />
  );
}
