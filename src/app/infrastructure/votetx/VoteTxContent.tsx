"use client";

import { Vote } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function VoteTxContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="votetx"
      icon={<Vote size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Vote className="w-8 h-8 text-slate-900" />}
      xp={160}
      badge={t.badges.votetx}
      content={t.votetx}
      nextModuleLink="/infrastructure/restart"
    />
  );
}
