"use client";

import { Building } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function CexdexContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="cexdex"
      icon={<Building size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Building className="w-8 h-8 text-slate-900" />}
      xp={140}
      badge={t.badges.cexdex}
      content={t.cexdex}
      nextModuleLink="/finance/spread"
    />
  );
}
