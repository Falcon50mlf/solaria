"use client";

import { LineChart } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function EtfcryptoContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="etfcrypto"
      icon={<LineChart size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<LineChart className="w-8 h-8 text-slate-900" />}
      xp={140}
      badge={t.badges.etfcrypto}
      content={t.etfcrypto}
      nextModuleLink="/finance/apyapr"
    />
  );
}
