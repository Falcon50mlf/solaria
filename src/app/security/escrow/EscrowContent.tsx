"use client";

import { ShieldCheck } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function EscrowContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="escrow"
      icon={<ShieldCheck size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<ShieldCheck className="w-8 h-8 text-slate-900" />}
      xp={150}
      badge={t.badges.escrow}
      content={t.escrow}
      nextModuleLink={null}
    />
  );
}
