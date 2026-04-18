"use client";

import { BookOpen } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function OrderbookContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="orderbook"
      icon={<BookOpen size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<BookOpen className="w-8 h-8 text-slate-900" />}
      xp={150}
      badge={t.badges.orderbook}
      content={t.orderbook}
      nextModuleLink="/finance/leverage"
    />
  );
}
