"use client";

import { UserX } from "lucide-react";
import { QuizModule } from "@/components/QuizModule";
import { useLocale } from "@/lib/useLocale";

export default function SocialengContent() {
  const { t } = useLocale();
  return (
    <QuizModule
      moduleId="socialeng"
      icon={<UserX size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<UserX className="w-8 h-8 text-slate-900" />}
      xp={150}
      badge={t.badges.socialeng}
      content={t.socialeng}
      nextModuleLink="/security/fakedapp"
    />
  );
}
