"use client";

import { useState, useEffect, useRef, type ReactNode } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle, Trophy, ArrowRight, Timer } from "lucide-react";
import Link from "next/link";
import { usePrivy } from "@privy-io/react-auth";
import { completeModule } from "@/lib/gameState";
import { useGameState } from "@/lib/useGameState";
import { useLocale } from "@/lib/useLocale";
import { SlideLayout } from "./SlideLayout";
import type { ModuleId } from "@/lib/game/types";

export interface QuizModuleContent {
  headerTitle: string;
  backToBasics: string;
  storyIntro: string;
  storyAnalogy: string;
  def1Title: string;
  def1Text: string;
  def2Title: string;
  def2Text: string;
  keyConceptsTitle: string;
  keyConceptsText: string;
  didYouKnowTitle: string;
  didYouKnowText: string;
  storySummary: string;
  phase2Title: string;
  phase2Subtitle: string;
  phase2Narrative: string;
  quizQuestions: {
    question: string;
    options: string[];
    correctIndex: number;
    explanation: string;
  }[];
  phase2Success: string;
  phase2FinishButton: string;
  revealSubtitle: string;
  keyPointsTitle: string;
  keyPoints: string[];
}

interface QuizModuleProps {
  moduleId: ModuleId;
  icon: ReactNode;
  badgeIcon: ReactNode;
  xp: number;
  badge: string;
  content: QuizModuleContent;
  nextModuleLink: string | null;
  nextModuleLabel?: string;
}

export function QuizModule({
  moduleId,
  icon,
  badgeIcon,
  xp,
  badge,
  content,
  nextModuleLink,
  nextModuleLabel,
}: QuizModuleProps) {
  const { t } = useLocale();
  const { authenticated, ready } = usePrivy();
  const gameState = useGameState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number | null>(null);

  const questions = content.quizQuestions;
  const current = questions[currentQuestion];
  const passed = quizComplete && correctAnswers / questions.length >= 0.7;
  const moduleCompleted = gameState?.modules?.find((m) => m.id === moduleId)?.completed ?? false;
  const loggedIn = ready && authenticated;
  const exitLink = loggedIn ? "/dashboard" : "/chapters";
  const exitLabel = loggedIn ? t.home.backToDashboard : t.login.backHome;

  // Start timer on first render of quiz, stop on complete
  useEffect(() => {
    if (quizComplete) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }
    if (!startTimeRef.current) {
      startTimeRef.current = Date.now();
    }
    timerRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - (startTimeRef.current ?? Date.now())) / 1000));
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [quizComplete]);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  const timerColor = elapsed < 30 ? "text-[var(--sol-green)]" : elapsed < 60 ? "text-amber-400" : "text-[var(--sol-accent)]";

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setQuizComplete(false);
    setElapsed(0);
    startTimeRef.current = Date.now();
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === current.correctIndex) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

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

  const quizSlide = (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[var(--sol-green)]">{content.phase2Title}</h2>
        <div className={`flex items-center gap-2 font-mono text-lg font-bold ${timerColor} transition-colors`}>
          <Timer size={18} />
          <span>{formatTime(elapsed)}</span>
        </div>
      </div>
      <div className="flex gap-1 mb-6">
        {questions.map((_, i) => (
          <div
            key={i}
            className={`h-1.5 flex-1 rounded-full ${
              i < currentQuestion
                ? "bg-[var(--sol-green)]"
                : i === currentQuestion
                  ? "bg-[var(--sol-purple)]"
                  : "bg-slate-700"
            }`}
          />
        ))}
      </div>

      {!quizComplete ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <p className="text-lg font-semibold mb-6 text-slate-200">{current.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.options.map((option, index) => {
                let btnClass = "";
                if (showExplanation) {
                  if (index === current.correctIndex) {
                    btnClass = "bg-green-900/30 border-green-500 animate-flash-green";
                  } else if (index === selectedAnswer) {
                    btnClass = "bg-red-900/30 border-red-500 animate-shake animate-flash-red";
                  } else {
                    btnClass = "bg-slate-800/30 border-slate-700 opacity-50";
                  }
                } else {
                  btnClass =
                    "bg-slate-800/50 border-slate-600 hover:border-purple-500/50 cursor-pointer";
                }
                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(index)}
                    disabled={selectedAnswer !== null}
                    className={`text-left p-4 rounded-lg border transition-all ${btnClass}`}
                  >
                    <span className="text-slate-200">{option}</span>
                  </button>
                );
              })}
            </div>
            {showExplanation && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 p-4 bg-slate-800/50 border border-slate-600 rounded-lg"
              >
                <div className="flex items-start gap-3">
                  {selectedAnswer === current.correctIndex ? (
                    <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                  )}
                  <p className="text-sm text-slate-300">{current.explanation}</p>
                </div>
              </motion.div>
            )}
            {showExplanation && (
              <button
                onClick={handleNext}
                className="mt-4 px-6 py-2 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer"
              >
                {currentQuestion + 1 < questions.length ? (
                  <>
                    {t.common.next}
                    <ArrowRight className="inline ml-2 w-4 h-4" />
                  </>
                ) : (
                  <>
                    {t.common.finish}
                    <ArrowRight className="inline ml-2 w-4 h-4" />
                  </>
                )}
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 animate-count-up ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}
          >
            {correctAnswers}/{questions.length}
          </motion.span>
          <p className="text-sm font-mono text-slate-400 mb-4 flex items-center justify-center gap-1.5">
            <Timer size={14} /> {formatTime(elapsed)}
            {passed && elapsed < 30 && <span className="ml-2 text-[var(--sol-green)] font-bold uppercase text-xs">Speed bonus!</span>}
          </p>
          {passed ? (
            <p className="text-slate-300 mb-6">{content.phase2Success}</p>
          ) : (
            <div>
              <p className="text-[var(--sol-accent)] mb-2">{t.common.quizMinScore}</p>
              <button
                onClick={handleRetryQuiz}
                className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer"
              >
                {t.common.quizRetry}
              </button>
            </div>
          )}
        </motion.div>
      )}
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

  const slides = [slide1, slide2, slide3, slide4, quizSlide, revealSlide];

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
        : [true, true, true, true, passed, true]}
    />
  );
}
