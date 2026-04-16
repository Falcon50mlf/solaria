"use client";

import { GitBranch } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function SealevelContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="sealevel"
      icon={<GitBranch size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<GitBranch className="w-8 h-8 text-slate-900" />}
      xp={190}
      badge={t.badges.sealevel}
      content={t.sealevel}
      nextModuleLink="/infrastructure/archivers"
    />
  );
}
