"use client";

import { CircleDollarSign } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function SoltokenContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="soltoken"
      icon={<CircleDollarSign size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<CircleDollarSign className="w-8 h-8 text-slate-900" />}
      xp={140}
      badge={t.badges.soltoken}
      content={t.soltoken}
      nextModuleLink="/finance/yieldfarming"
    />
  );
}
