"use client";

import { Glasses } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function DyorContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="dyor"
      icon={<Glasses size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Glasses className="w-8 h-8 text-slate-900" />}
      xp={130}
      badge={t.badges.dyor}
      content={t.dyor}
      nextModuleLink="/security/escrow"
    />
  );
}
