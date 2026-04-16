"use client";

import { Building2 } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function TowerContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="tower"
      icon={<Building2 size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Building2 className="w-8 h-8 text-slate-900" />}
      xp={180}
      badge={t.badges.tower}
      content={t.tower}
      nextModuleLink="/infrastructure/turbine"
    />
  );
}
