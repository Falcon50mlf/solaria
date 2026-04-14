'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  CheckCircle2,
  XCircle,
  Trophy,
  ChevronRight,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { useUser } from '@/hooks/useUser';
import { TopBar } from '@/components/TopBar';

type Phase = 'story' | 'minigame' | 'reveal';

export default function ExplorerContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const { walletAddress } = useUser();

  const [phase, setPhase] = useState<Phase>('story');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [copied, setCopied] = useState(false);

  // Check if explorer module is already completed
  useEffect(() => {
    const mod = gameState?.modules?.find((m) => m.id === 'explorer');
    if (mod?.completed) setPhase('reveal');
  }, [gameState]);

  const questions = t.explorer.quizQuestions;

  const handleAnswer = (index: number) => {
    if (showExplanation) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentQuestion].correctIndex) {
      setCorrectAnswers((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      <TopBar />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/basics"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            {t.explorer.backToBasics}
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Search className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">
              {t.explorer.headerTitle}
            </h1>
          </div>
          <p className="text-slate-400">{t.explorer.headerSubtitle}</p>
        </div>

        <AnimatePresence mode="wait">
          {/* ── PHASE 1: STORY ── */}
          {phase === 'story' && (
            <motion.div
              key="phase-story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Intro */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 mb-8">
                <p className="text-base sm:text-xl md:text-2xl mb-8 leading-relaxed text-slate-200">
                  {t.explorer.storyIntro}
                </p>
              </div>

              {/* Analogy */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 border border-purple-500/50 rounded-lg p-6 mb-8"
              >
                <p className="text-lg text-slate-200 leading-relaxed">
                  {t.explorer.storyAnalogy}
                </p>
              </motion.div>

              {/* Educational boxes */}
              <div className="space-y-4 mb-8">
                {/* Definition: Explorer */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5"
                >
                  <p className="text-indigo-400 font-bold text-lg mb-2">
                    {t.explorer.defExplorerTitle}
                  </p>
                  <p className="text-slate-300">{t.explorer.defExplorerText}</p>
                </motion.div>

                {/* Solscan */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
                >
                  <p className="text-purple-400 font-bold text-lg mb-2">
                    {t.explorer.solscanTitle}
                  </p>
                  <p className="text-slate-300">{t.explorer.solscanText}</p>
                </motion.div>

                {/* Reading a transaction */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-green-900/30 border border-green-500/50 rounded-lg p-5"
                >
                  <p className="text-green-400 font-bold text-lg mb-2">
                    {t.explorer.readTxTitle}
                  </p>
                  <p className="text-slate-300">{t.explorer.readTxText}</p>
                </motion.div>

                {/* Key Concepts */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.1 }}
                  className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
                >
                  <p className="text-purple-400 font-bold text-lg mb-2">
                    {t.explorer.keyConceptsTitle}
                  </p>
                  <p className="text-slate-300">{t.explorer.keyConceptsText}</p>
                </motion.div>

                {/* Did you know */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.3 }}
                  className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5"
                >
                  <p className="text-amber-400 font-bold text-lg mb-2">
                    {t.explorer.didYouKnowTitle}
                  </p>
                  <p className="text-slate-300">{t.explorer.didYouKnowText}</p>
                </motion.div>
              </div>

              {/* Summary */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
                <p className="text-lg text-slate-200 mb-2">
                  {t.explorer.storySummary}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPhase('minigame')}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.explorer.storyNextButton}
                <Search className="inline ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* ── PHASE 2: MINIGAME ── */}
          {phase === 'minigame' && (
            <motion.div
              key="phase-minigame"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                  {t.explorer.phase2Title}
                </h2>
                <p className="text-slate-400">{t.explorer.phase2Subtitle}</p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 mb-8">
                <p className="text-lg text-slate-200 leading-relaxed">
                  {t.explorer.phase2Narrative}
                </p>
              </div>

              {/* Section 1: Your Wallet Address */}
              {walletAddress && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-6 mb-8"
                >
                  <h3 className="text-lg font-bold text-purple-400 mb-2">
                    {t.explorer.yourWalletTitle}
                  </h3>
                  <p className="text-sm text-slate-300 mb-4">
                    {t.explorer.yourWalletText}
                  </p>
                  <div className="bg-slate-900/50 rounded-lg p-3 flex items-center justify-between gap-2">
                    <span className="font-mono text-green-400 text-xs sm:text-sm break-all">
                      {walletAddress}
                    </span>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(walletAddress);
                        setCopied(true);
                        setTimeout(() => setCopied(false), 2000);
                      }}
                      className="shrink-0 text-slate-400 hover:text-white cursor-pointer"
                    >
                      {copied ? <Check size={16} /> : <Copy size={16} />}
                    </button>
                  </div>
                  <a
                    href={`https://solscan.io/account/${walletAddress}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300 mt-3"
                  >
                    Voir sur Solscan <ExternalLink size={14} />
                  </a>
                </motion.div>
              )}

              {/* Section 2: Quiz */}
              {!quizComplete ? (
                <div>
                  {/* Progress */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-sm text-slate-400">
                      Question {currentQuestion + 1}/{questions.length}
                    </span>
                    <span className="text-sm text-purple-400">
                      {correctAnswers} correct
                    </span>
                  </div>
                  <div className="w-full bg-slate-700 rounded-full h-2 mb-6">
                    <div
                      className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                      style={{
                        width: `${((currentQuestion + (showExplanation ? 1 : 0)) / questions.length) * 100}%`,
                      }}
                    />
                  </div>

                  {/* Question */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-6 mb-6">
                        <h3 className="text-lg sm:text-xl font-bold mb-6">
                          {questions[currentQuestion].question}
                        </h3>

                        <div className="space-y-3">
                          {questions[currentQuestion].options.map(
                            (option, idx) => {
                              const isCorrect =
                                idx ===
                                questions[currentQuestion].correctIndex;
                              const isSelected = selectedAnswer === idx;
                              let borderColor = 'border-slate-600';
                              let bgColor = 'bg-slate-700/50';
                              let textColor = 'text-slate-200';

                              if (showExplanation) {
                                if (isCorrect) {
                                  borderColor = 'border-green-500';
                                  bgColor = 'bg-green-900/30';
                                  textColor = 'text-green-300';
                                } else if (isSelected && !isCorrect) {
                                  borderColor = 'border-red-500';
                                  bgColor = 'bg-red-900/30';
                                  textColor = 'text-red-300';
                                }
                              }

                              return (
                                <motion.button
                                  key={idx}
                                  whileHover={
                                    !showExplanation ? { scale: 1.01 } : {}
                                  }
                                  whileTap={
                                    !showExplanation ? { scale: 0.99 } : {}
                                  }
                                  onClick={() => handleAnswer(idx)}
                                  className={`w-full text-left p-4 rounded-lg border ${borderColor} ${bgColor} ${textColor} transition-all ${
                                    !showExplanation
                                      ? 'hover:border-purple-500 cursor-pointer'
                                      : 'cursor-default'
                                  }`}
                                >
                                  <div className="flex items-center justify-between">
                                    <span>{option}</span>
                                    {showExplanation && isCorrect && (
                                      <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    )}
                                    {showExplanation &&
                                      isSelected &&
                                      !isCorrect && (
                                        <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                                      )}
                                  </div>
                                </motion.button>
                              );
                            }
                          )}
                        </div>

                        {/* Explanation */}
                        <AnimatePresence>
                          {showExplanation && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mt-4 bg-slate-900/50 border border-slate-600 rounded-lg p-4"
                            >
                              <p className="text-slate-300 text-sm">
                                {questions[currentQuestion].explanation}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Next button */}
                      {showExplanation && (
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleNext}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg transition-colors"
                        >
                          {currentQuestion < questions.length - 1
                            ? 'Next Question'
                            : 'See Results'}
                        </motion.button>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                /* Quiz Complete */
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 text-center mb-6">
                    <Trophy className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">
                      {t.explorer.phase2Success}
                    </h3>
                    <p className="text-slate-300 mb-2">
                      {correctAnswers}/{questions.length} correct answers
                    </p>
                    <p className="text-purple-400 font-semibold">+180 XP</p>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={async () => {
                      await completeModule('explorer', 180);
                      setPhase('reveal');
                    }}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 py-4 rounded-lg font-bold text-lg transition-colors"
                  >
                    {t.explorer.phase2FinishButton}
                    <Trophy className="inline ml-2 w-5 h-5" />
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ── PHASE 3: REVEAL ── */}
          {phase === 'reveal' && (
            <motion.div
              key="phase-reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Congratulations */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="inline-block mb-4"
                >
                  <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  {t.common.congratulations}
                </h2>
                <p className="text-xl text-slate-300">
                  {t.explorer.revealSubtitle}
                </p>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-700/50 rounded-lg p-6 mb-8 text-center"
              >
                <div className="inline-block bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-4 mb-4">
                  <Search className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
                  {t.badges.explorer}
                </h3>
                <p className="text-slate-300 mb-2">+180 XP</p>
                <p className="text-sm text-slate-400">
                  {t.explorer.revealSubtitle}
                </p>
              </motion.div>

              {/* Narrative */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 mb-8">
                <p className="text-lg md:text-xl leading-relaxed text-slate-200 mb-4">
                  {t.explorer.revealNarrative1}
                </p>
                <p className="text-slate-300">
                  {t.explorer.revealNarrative2}
                </p>
              </div>

              {/* Educational boxes */}
              <div className="space-y-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5"
                >
                  <p className="text-amber-400 font-bold text-lg mb-2">
                    {t.explorer.didYouKnowRevealTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.explorer.didYouKnowRevealText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
                >
                  <p className="text-purple-400 font-bold text-lg mb-3">
                    {t.explorer.keyPointsTitle}
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    {t.explorer.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* All modules completed check */}
              {gameState?.modules?.every((m) => m.completed) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-lg p-4 sm:p-8 mb-8 text-center"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <Trophy className="w-12 h-12 text-yellow-400 mx-auto" />
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                    {t.explorer.allCompletedTitle}
                  </h2>
                  <p className="text-slate-300">
                    {t.explorer.allCompletedText}
                  </p>
                </motion.div>
              )}

              {/* Navigation — last module, only back to basics */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/basics"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg text-center transition-colors"
                >
                  {t.explorer.backToBasics}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
