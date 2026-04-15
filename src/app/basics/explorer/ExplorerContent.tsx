'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  CheckCircle2,
  XCircle,
  Trophy,
  ExternalLink,
  Copy,
  Check,
} from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { useUser } from '@/hooks/useUser';
import { SlideLayout } from '@/components/SlideLayout';

export default function ExplorerContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const { walletAddress } = useUser();

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showReveal, setShowReveal] = useState(false);

  // Check if explorer module is already completed
  useEffect(() => {
    const mod = gameState?.modules?.find((m) => m.id === 'explorer');
    if (mod?.completed) setShowReveal(true);
  }, [gameState]);

  const questions = t.explorer.quizQuestions;
  const passed = quizComplete && correctAnswers / questions.length >= 0.7;

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setQuizComplete(false);
  };

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

  const handleCopy = () => {
    if (walletAddress) {
      navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  // ── Slide 1: Story intro + analogy ──
  const slide1 = (
    <div>
      <h2 className="text-2xl font-bold text-[var(--sol-green)] mb-6">
        {t.explorer.headerTitle}
      </h2>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-5 mb-6">
        <p className="text-base sm:text-lg leading-relaxed text-slate-200">
          {t.explorer.storyIntro}
        </p>
      </div>

      <div className="bg-slate-800/50 border border-purple-500/50 rounded-xl p-5">
        <p className="text-base sm:text-lg text-slate-200 leading-relaxed">
          {t.explorer.storyAnalogy}
        </p>
      </div>
    </div>
  );

  // ── Slide 2: Definition explorer + Solscan/Explorer presentation ──
  const slide2 = (
    <div>
      <h2 className="text-2xl font-bold text-[var(--sol-green)] mb-6">
        {t.explorer.defExplorerTitle}
      </h2>

      <div className="space-y-4">
        <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-5">
          <p className="text-indigo-400 font-bold text-lg mb-2">
            {t.explorer.defExplorerTitle}
          </p>
          <p className="text-slate-300">{t.explorer.defExplorerText}</p>
        </div>

        <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-5">
          <p className="text-purple-400 font-bold text-lg mb-2">
            {t.explorer.solscanTitle}
          </p>
          <p className="text-slate-300">{t.explorer.solscanText}</p>
        </div>
      </div>
    </div>
  );

  // ── Slide 3: Reading a transaction + key concepts ──
  const slide3 = (
    <div>
      <h2 className="text-2xl font-bold text-[var(--sol-green)] mb-6">
        {t.explorer.readTxTitle}
      </h2>

      <div className="space-y-4">
        <div className="bg-green-900/30 border border-green-500/50 rounded-xl p-5">
          <p className="text-green-400 font-bold text-lg mb-2">
            {t.explorer.readTxTitle}
          </p>
          <p className="text-slate-300">{t.explorer.readTxText}</p>
        </div>

        <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-5">
          <p className="text-purple-400 font-bold text-lg mb-2">
            {t.explorer.keyConceptsTitle}
          </p>
          <p className="text-slate-300">{t.explorer.keyConceptsText}</p>
        </div>
      </div>
    </div>
  );

  // ── Slide 4: Did you know + summary ──
  const slide4 = (
    <div>
      <h2 className="text-2xl font-bold text-[var(--sol-green)] mb-6">
        {t.explorer.didYouKnowTitle}
      </h2>

      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-5 mb-6">
        <p className="text-amber-400 font-bold text-lg mb-2">
          {t.explorer.didYouKnowTitle}
        </p>
        <p className="text-slate-300">{t.explorer.didYouKnowText}</p>
      </div>

      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-5">
        <p className="text-base sm:text-lg text-slate-200">
          {t.explorer.storySummary}
        </p>
      </div>
    </div>
  );

  // ── Slide 5: Wallet address + Quiz ──
  const slide5 = (
    <div>
      <h2 className="text-2xl font-bold text-[var(--sol-green)] mb-6">
        {t.explorer.phase2Title}
      </h2>

      {/* Wallet address section */}
      {walletAddress && (
        <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5 mb-6">
          <h3 className="text-base font-bold text-purple-400 mb-2">
            {t.explorer.yourWalletTitle}
          </h3>
          <p className="text-sm text-slate-300 mb-3">
            {t.explorer.yourWalletText}
          </p>
          <div className="bg-slate-900/50 rounded-lg p-3 flex items-center justify-between gap-2 mb-2">
            <span className="font-mono text-green-400 text-xs break-all">
              {walletAddress}
            </span>
            <button
              onClick={handleCopy}
              className="shrink-0 text-slate-400 hover:text-white cursor-pointer"
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
            </button>
          </div>
          <a
            href={`https://solscan.io/account/${walletAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-sm text-purple-400 hover:text-purple-300"
          >
            Voir sur Solscan <ExternalLink size={14} />
          </a>
        </div>
      )}

      {/* Quiz section */}
      {!quizComplete ? (
        <div>
          {/* Progress bar */}
          <div className="flex gap-1 mb-6">
            {questions.map((_, i) => (
              <motion.div
                key={i}
                className={`h-1.5 flex-1 rounded-full ${
                  i < currentQuestion
                    ? 'bg-[var(--sol-green)]'
                    : i === currentQuestion
                      ? 'bg-[var(--sol-purple)]'
                      : 'bg-slate-700'
                }`}
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: i * 0.05, duration: 0.3 }}
                style={{ transformOrigin: 'left' }}
              />
            ))}
          </div>

          {/* Question */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuestion}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 sm:p-6 mb-6">
                <h3 className="text-lg sm:text-xl font-bold mb-6">
                  {questions[currentQuestion].question}
                </h3>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, idx) => {
                    const isCorrect =
                      idx === questions[currentQuestion].correctIndex;
                    const isSelected = selectedAnswer === idx;
                    let borderColor = 'border-slate-600';
                    let bgColor = 'bg-slate-700/50';
                    let textColor = 'text-slate-200';
                    let animClass = '';

                    if (showExplanation) {
                      if (isCorrect) {
                        borderColor = 'border-green-500';
                        bgColor = 'bg-green-900/30';
                        textColor = 'text-green-300';
                        animClass = 'animate-flash-green';
                      } else if (isSelected && !isCorrect) {
                        borderColor = 'border-red-500';
                        bgColor = 'bg-red-900/30';
                        textColor = 'text-red-300';
                        animClass = 'animate-shake animate-flash-red';
                      } else {
                        borderColor = 'border-slate-700';
                        bgColor = 'bg-slate-800/30 opacity-50';
                      }
                    }

                    return (
                      <motion.button
                        key={idx}
                        whileHover={!showExplanation ? { scale: 1.01 } : {}}
                        whileTap={!showExplanation ? { scale: 0.99 } : {}}
                        onClick={() => handleAnswer(idx)}
                        className={`w-full text-left p-4 rounded-lg border ${borderColor} ${bgColor} ${textColor} ${animClass} transition-all ${
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
                          {showExplanation && isSelected && !isCorrect && (
                            <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                          )}
                        </div>
                      </motion.button>
                    );
                  })}
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
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-6 text-center mb-6">
            <motion.span
              className={`text-4xl sm:text-5xl font-bold block mb-4 animate-count-up ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              {correctAnswers}/{questions.length}
            </motion.span>
            {passed ? (
              <>
                <h3 className="text-2xl font-bold mb-2">
                  {t.explorer.phase2Success}
                </h3>
                <p className="text-slate-300 mb-2">correct answers</p>
                <p className="text-purple-400 font-semibold">+180 XP</p>
              </>
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
          </div>

          {passed && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                await completeModule('explorer', 180);
                setShowReveal(true);
              }}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              {t.explorer.phase2FinishButton}
              <Trophy className="inline ml-2 w-5 h-5" />
            </motion.button>
          )}
        </motion.div>
      )}
    </div>
  );

  // ── Slide 6: Reveal / completion ──
  const slide6 = (
    <div>
      {/* Congratulations */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="text-center mb-8"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="inline-block mb-4"
        >
          <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">
          {t.common.congratulations}
        </h2>
        <p className="text-xl text-slate-300">{t.explorer.revealSubtitle}</p>
      </motion.div>

      {/* Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-700/50 rounded-xl p-6 mb-6 text-center"
      >
        <div className="inline-block bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-4 mb-4">
          <Search className="w-8 h-8 text-slate-900" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
          {t.badges.explorer}
        </h3>
        <p className="text-slate-300 mb-2">+180 XP</p>
        <p className="text-sm text-slate-400">{t.explorer.revealSubtitle}</p>
      </motion.div>

      {/* All modules completed check */}
      {gameState?.modules?.every((m) => m.completed) && (
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-xl p-6 mb-6 text-center">
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            {t.explorer.allCompletedTitle}
          </h3>
          <p className="text-slate-300">{t.explorer.allCompletedText}</p>
        </div>
      )}

      {/* Key points */}
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-5 mb-6">
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
      </div>

      {/* Navigation -- last module, only back to basics */}
      <Link
        href="/basics"
        className="block w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg text-center transition-colors"
      >
        {t.explorer.backToBasics}
      </Link>
    </div>
  );

  // Build slides array: if already completed, jump to reveal
  const slides = showReveal
    ? [slide1, slide2, slide3, slide4, slide5, slide6]
    : [slide1, slide2, slide3, slide4, slide5];

  return (
    <SlideLayout
      moduleTitle={t.explorer.headerTitle}
      moduleXp={180}
      backLink="/basics"
      backLabel={t.explorer.backToBasics}
      slides={slides}
      canAdvance={showReveal
        ? [true, true, true, true, true, true]
        : [true, true, true, true, passed]}
      icon={<Search size={18} className="text-purple-400" />}
    />
  );
}
