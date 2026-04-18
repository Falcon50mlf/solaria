"use client";

import { Lock } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function TvlContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="tvl"
      icon={<Lock size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Lock className="w-8 h-8 text-slate-900" />}
      xp={130}
      badge={t.badges.tvl}
      content={t.tvl}
      nextModuleLink="/finance/soltoken"
    />
  );
}
