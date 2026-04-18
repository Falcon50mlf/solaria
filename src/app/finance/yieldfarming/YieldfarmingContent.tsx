"use client";

import { Sprout } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function YieldfarmingContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="yieldfarming"
      icon={<Sprout size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Sprout className="w-8 h-8 text-slate-900" />}
      xp={170}
      badge={t.badges.yieldfarming}
      content={t.yieldfarming}
      nextModuleLink="/finance/amm"
    />
  );
}
