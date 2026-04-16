"use client";

import { Cpu } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function NodeContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="node"
      icon={<Cpu size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Cpu className="w-8 h-8 text-slate-900" />}
      xp={160}
      badge={t.badges.node}
      content={t.node}
      nextModuleLink={null}
    />
  );
}
