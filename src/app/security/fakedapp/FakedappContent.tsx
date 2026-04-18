"use client";

import { AlertOctagon } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function FakedappContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="fakedapp"
      icon={<AlertOctagon size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<AlertOctagon className="w-8 h-8 text-slate-900" />}
      xp={140}
      badge={t.badges.fakedapp}
      content={t.fakedapp}
      nextModuleLink="/security/malware"
    />
  );
}
