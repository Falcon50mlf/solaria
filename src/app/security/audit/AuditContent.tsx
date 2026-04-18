"use client";

import { ClipboardCheck } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function AuditContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="audit"
      icon={<ClipboardCheck size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<ClipboardCheck className="w-8 h-8 text-slate-900" />}
      xp={180}
      badge={t.badges.audit}
      content={t.audit}
      nextModuleLink="/security/exploit"
    />
  );
}
