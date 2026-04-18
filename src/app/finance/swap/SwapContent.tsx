"use client";

import { ArrowLeftRight } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function SwapContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="swap"
      icon={<ArrowLeftRight size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<ArrowLeftRight className="w-8 h-8 text-slate-900" />}
      xp={120}
      badge={t.badges.swap}
      content={t.swap}
      nextModuleLink="/finance/cexdex"
    />
  );
}
