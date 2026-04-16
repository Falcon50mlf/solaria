"use client";

import { Zap } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function JitoContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="jito"
      icon={<Zap size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Zap className="w-8 h-8 text-slate-900" />}
      xp={200}
      badge={t.badges.jito}
      content={t.jito}
      nextModuleLink={null}
    />
  );
}
