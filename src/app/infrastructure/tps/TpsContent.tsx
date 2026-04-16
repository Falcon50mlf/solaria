"use client";

import { Gauge } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function TpsContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="tps"
      icon={<Gauge size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Gauge className="w-8 h-8 text-slate-900" />}
      xp={140}
      badge={t.badges.tps}
      content={t.tps}
      nextModuleLink="/infrastructure/votetx"
    />
  );
}
