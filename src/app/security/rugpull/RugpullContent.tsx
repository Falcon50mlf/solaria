"use client";

import { AlertTriangle } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function RugpullContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="rugpull"
      icon={<AlertTriangle size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<AlertTriangle className="w-8 h-8 text-slate-900" />}
      xp={140}
      badge={t.badges.rugpull}
      content={t.rugpull}
      nextModuleLink="/security/scamphishing"
    />
  );
}
