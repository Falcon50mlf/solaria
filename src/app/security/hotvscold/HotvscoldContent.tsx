"use client";

import { Thermometer } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function HotvscoldContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="hotvscold"
      icon={<Thermometer size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Thermometer className="w-8 h-8 text-slate-900" />}
      xp={140}
      badge={t.badges.hotvscold}
      content={t.hotvscold}
      nextModuleLink="/security/audit"
    />
  );
}
