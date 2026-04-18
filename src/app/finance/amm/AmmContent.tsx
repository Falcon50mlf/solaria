"use client";

import { Repeat2 } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function AmmContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="amm"
      icon={<Repeat2 size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Repeat2 className="w-8 h-8 text-slate-900" />}
      xp={180}
      badge={t.badges.amm}
      content={t.amm}
      nextModuleLink="/finance/slippage"
    />
  );
}
