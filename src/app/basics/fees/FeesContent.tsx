"use client";

import { Fuel } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function FeesContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="fees"
      icon={<Fuel size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Fuel className="w-8 h-8 text-slate-900" />}
      xp={130}
      badge={t.badges.fees}
      content={t.fees}
      nextModuleLink="/basics/solscan"
    />
  );
}
