"use client";

import { Clock } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function PohContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="poh"
      icon={<Clock size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Clock className="w-8 h-8 text-slate-900" />}
      xp={180}
      badge={t.badges.poh}
      content={t.poh}
      nextModuleLink="/infrastructure/gulfstream"
    />
  );
}
