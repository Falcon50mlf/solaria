"use client";

import { Waves } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function GulfstreamContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="gulfstream"
      icon={<Waves size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Waves className="w-8 h-8 text-slate-900" />}
      xp={170}
      badge={t.badges.gulfstream}
      content={t.gulfstream}
      nextModuleLink="/infrastructure/sealevel"
    />
  );
}
