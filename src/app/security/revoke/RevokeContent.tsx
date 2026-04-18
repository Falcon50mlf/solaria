"use client";

import { Ban } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function RevokeContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="revoke"
      icon={<Ban size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Ban className="w-8 h-8 text-slate-900" />}
      xp={120}
      badge={t.badges.revoke}
      content={t.revoke}
      nextModuleLink="/security/hardwarewallet"
    />
  );
}
