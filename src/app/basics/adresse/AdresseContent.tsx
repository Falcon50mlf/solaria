"use client";

import { MapPin } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function AdresseContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="adresse"
      icon={<MapPin size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<MapPin className="w-8 h-8 text-slate-900" />}
      xp={110}
      badge={t.badges.adresse}
      content={t.adresse}
      nextModuleLink="/basics/networks"
    />
  );
}
