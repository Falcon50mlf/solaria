"use client";

import { HardDrive } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function HardwarewalletContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="hardwarewallet"
      icon={<HardDrive size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<HardDrive className="w-8 h-8 text-slate-900" />}
      xp={160}
      badge={t.badges.hardwarewallet}
      content={t.hardwarewallet}
      nextModuleLink="/security/hotvscold"
    />
  );
}
