"use client";

import { Wind } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function TurbineContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="turbine"
      icon={<Wind size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Wind className="w-8 h-8 text-slate-900" />}
      xp={170}
      badge={t.badges.turbine}
      content={t.turbine}
      nextModuleLink="/infrastructure/cloudbreak"
    />
  );
}
