"use client";

import { PenTool } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function SignatureContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="signature"
      icon={<PenTool size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<PenTool className="w-8 h-8 text-slate-900" />}
      xp={140}
      badge={t.badges.signature}
      content={t.signature}
      nextModuleLink="/basics/fees"
    />
  );
}
