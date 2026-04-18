"use client";

import { Zap } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function FlashloanContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="flashloan"
      icon={<Zap size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Zap className="w-8 h-8 text-slate-900" />}
      xp={190}
      badge={t.badges.flashloan}
      content={t.flashloan}
      nextModuleLink="/security/reentrancy"
    />
  );
}
