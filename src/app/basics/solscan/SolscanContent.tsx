"use client";

import { ScanSearch } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function SolscanContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="solscan"
      icon={<ScanSearch size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<ScanSearch className="w-8 h-8 text-slate-900" />}
      xp={150}
      badge={t.badges.solscan}
      content={t.solscan}
      nextModuleLink="/basics/node"
    />
  );
}
