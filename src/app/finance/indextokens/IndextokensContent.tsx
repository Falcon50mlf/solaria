"use client";

import { PieChart } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function IndextokensContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="indextokens"
      icon={<PieChart size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<PieChart className="w-8 h-8 text-slate-900" />}
      xp={150}
      badge={t.badges.indextokens}
      content={t.indextokens}
      nextModuleLink="/finance/tvl"
    />
  );
}
