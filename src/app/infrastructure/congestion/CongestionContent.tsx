"use client";

import { Activity } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function CongestionContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="congestion"
      icon={<Activity size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Activity className="w-8 h-8 text-slate-900" />}
      xp={160}
      badge={t.badges.congestion}
      content={t.congestion}
      nextModuleLink="/infrastructure/tower"
    />
  );
}
