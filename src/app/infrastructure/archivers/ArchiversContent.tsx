"use client";

import { Archive } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function ArchiversContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="archivers"
      icon={<Archive size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Archive className="w-8 h-8 text-slate-900" />}
      xp={150}
      badge={t.badges.archivers}
      content={t.archivers}
      nextModuleLink="/infrastructure/tps"
    />
  );
}
