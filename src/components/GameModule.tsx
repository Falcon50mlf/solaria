"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Trophy } from "lucide-react";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { completeModule } from "@/lib/gameState";
import { useGameState } from "@/lib/useGameState";
import { useLocale } from "@/lib/useLocale";
import { SlideLayout } from "./SlideLayout";
import type { QuizModuleContent } from "./QuizModule";
import type { ModuleId } from "@/lib/game/types";

interface GameModuleProps {
  moduleId: ModuleId;
  icon: ReactNode;
  badgeIcon: ReactNode;
  xp: number;
  badge: string;
  content: QuizModuleContent;
  nextModuleLink: string | null;
  nextModuleLabel?: string;
  gameSlide: ReactNode;
  gameCompleted: boolean;
}

export function GameModule({
  moduleId,
  icon,
  badgeIcon,
  xp,
  badge,
  content,
  nextModuleLink,
  nextModuleLabel,
  gameSlide,
  gameCompleted,
}: GameModuleProps) {
  const { t } = useLocale();
  const { authenticated, ready } = usePrivy();
  const gameState = useGameState();

  const moduleCompleted = gameState?.modules?.find((m) => m.id === moduleId)?.completed ?? false;
  const loggedIn = ready && authenticated;
  const exitLink = loggedIn ? "/dashboard" : "/chapters";
  const exitLabel = loggedIn ? t.home.backToDashboard : t.login.backHome;

  const slide1 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {content.headerTitle}
      </h2>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-slate-200 leading-relaxed">{content.storyIntro}</p>
      </div>
      <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4 sm:p-5">
        <p className="text-slate-300 leading-relaxed italic">{content.storyAnalogy}</p>
      </div>
    </div>
  );

  const slide2 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {content.def1Title.replace(/^[^\s]+\s/, "")}
      </h2>
      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-indigo-400 font-bold text-lg mb-2">{content.def1Title}</p>
        <p className="text-slate-300 leading-relaxed">{content.def1Text}</p>
      </div>
      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5">
        <p className="text-indigo-400 font-bold text-lg mb-2">{content.def2Title}</p>
        <p className="text-slate-300 leading-relaxed">{content.def2Text}</p>
      </div>
    </div>
  );

  const slide3 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {content.keyConceptsTitle.replace(/^[^\s]+\s/, "")}
      </h2>
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5">
        <p className="text-purple-400 font-bold text-lg mb-2">{content.keyConceptsTitle}</p>
        <p className="text-slate-300 leading-relaxed">{content.keyConceptsText}</p>
      </div>
    </div>
  );

  const slide4 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {content.didYouKnowTitle.replace(/^[^\s]+\s/, "")}
      </h2>
      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-amber-400 font-bold text-lg mb-2">{content.didYouKnowTitle}</p>
        <p className="text-slate-300 leading-relaxed">{content.didYouKnowText}</p>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5">
        <p className="text-slate-200 leading-relaxed">{content.storySummary}</p>
      </div>
    </div>
  );

  const revealSlide = (
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="inline-block mb-4"
      >
        <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
      </motion.div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t.common.congratulations}</h2>
      <p className="text-slate-300 mb-6">{content.revealSubtitle}</p>

      <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-6 mb-6 inline-block">
        <div className="inline-block bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-4 mb-4">
          {badgeIcon}
        </div>
        <h3 className="text-xl font-bold text-yellow-400">{badge}</h3>
        <p className="text-slate-300">+{xp} XP</p>
      </div>

      <div className="text-left bg-purple-900/30 border border-purple-500/50 rounded-xl p-5 mb-6">
        <p className="text-purple-400 font-bold mb-3">{content.keyPointsTitle}</p>
        <ul className="space-y-2">
          {content.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 size={16} className="text-[var(--sol-green)] mt-0.5 shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {!moduleCompleted && (
        <button
          onClick={() => completeModule(moduleId, xp)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-8 py-3 rounded-lg font-bold cursor-pointer"
        >
          {content.phase2FinishButton}
        </button>
      )}

      <div className="flex flex-col gap-3 mt-6">
        {nextModuleLink && (
          <Link href={nextModuleLink} className="text-[var(--sol-purple)] hover:text-purple-300 text-sm">
            {nextModuleLabel ?? t.common.nextModule} →
          </Link>
        )}
        <Link href={exitLink} className="text-slate-400 hover:text-white text-sm">
          {exitLabel}
        </Link>
      </div>
    </div>
  );

  const slides = [slide1, slide2, slide3, slide4, gameSlide, revealSlide];

  return (
    <SlideLayout
      moduleTitle={content.headerTitle}
      moduleXp={xp}
      backLink="/basics"
      backLabel={content.backToBasics}
      icon={icon}
      slides={slides}
      canAdvance={moduleCompleted
        ? [true, true, true, true, true, true]
        : [true, true, true, true, gameCompleted, true]}
    />
  );
}
