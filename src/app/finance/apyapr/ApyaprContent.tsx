"use client";

import { Percent } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function ApyaprContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="apyapr"
      icon={<Percent size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Percent className="w-8 h-8 text-slate-900" />}
      xp={120}
      badge={t.badges.apyapr}
      content={t.apyapr}
      nextModuleLink={null}
    />
  );
}
