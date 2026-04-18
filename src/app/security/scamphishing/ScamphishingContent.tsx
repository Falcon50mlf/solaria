"use client";

import { ShieldAlert } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function ScamphishingContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="scamphishing"
      icon={<ShieldAlert size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<ShieldAlert className="w-8 h-8 text-slate-900" />}
      xp={150}
      badge={t.badges.scamphishing}
      content={t.scamphishing}
      nextModuleLink="/security/approvetx"
    />
  );
}
