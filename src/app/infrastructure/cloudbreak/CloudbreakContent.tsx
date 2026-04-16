"use client";

import { Database } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function CloudbreakContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="cloudbreak"
      icon={<Database size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Database className="w-8 h-8 text-slate-900" />}
      xp={180}
      badge={t.badges.cloudbreak}
      content={t.cloudbreak}
      nextModuleLink="/infrastructure/slot"
    />
  );
}
