"use client";

import { RotateCw } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function RestartContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="restart"
      icon={<RotateCw size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<RotateCw className="w-8 h-8 text-slate-900" />}
      xp={170}
      badge={t.badges.restart}
      content={t.restart}
      nextModuleLink="/infrastructure/congestion"
    />
  );
}
