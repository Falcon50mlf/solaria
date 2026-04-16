"use client";

import { Globe2 } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function NetworksContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="networks"
      icon={<Globe2 size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Globe2 className="w-8 h-8 text-slate-900" />}
      xp={120}
      badge={t.badges.networks}
      content={t.networks}
      nextModuleLink="/basics/signature"
    />
  );
}
