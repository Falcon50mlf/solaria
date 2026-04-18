"use client";

import { FileCheck2 } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function ApprovetxContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="approvetx"
      icon={<FileCheck2 size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<FileCheck2 className="w-8 h-8 text-slate-900" />}
      xp={130}
      badge={t.badges.approvetx}
      content={t.approvetx}
      nextModuleLink="/security/revoke"
    />
  );
}
