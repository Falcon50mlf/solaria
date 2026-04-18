"use client";

import { RefreshCw } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function ReentrancyContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="reentrancy"
      icon={<RefreshCw size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<RefreshCw className="w-8 h-8 text-slate-900" />}
      xp={180}
      badge={t.badges.reentrancy}
      content={t.reentrancy}
      nextModuleLink="/security/socialeng"
    />
  );
}
