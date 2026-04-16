"use client";

import { Boxes } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function ClusterContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="cluster"
      icon={<Boxes size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Boxes className="w-8 h-8 text-slate-900" />}
      xp={150}
      badge={t.badges.cluster}
      content={t.cluster}
      nextModuleLink="/infrastructure/jito"
    />
  );
}
