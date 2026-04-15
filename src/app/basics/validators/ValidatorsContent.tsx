'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Server,
  CheckCircle2,
  XCircle,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { SlideLayout } from '@/components/SlideLayout';

export default function ValidatorsContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const [moduleComplete, setModuleComplete] = useState(false);

  useEffect(() => {
    const mod = gameState?.modules?.find((m) => m.id === 'validators');
    if (mod?.completed) setModuleComplete(true);
  }, [gameState]);

  const questions = t.validators.quizQuestions;

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === questions[currentQuestion].correctIndex) {
      setCorrectCount((c) => c + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((q) => q + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      setQuizComplete(true);
    }
  };

  const handleFinishQuiz = async () => {
    await completeModule('validators', 170);
    setModuleComplete(true);
  };

  /* ── Slide 1: Story intro + analogy ── */
  const slide1 = (
    <div className="space-y-6">
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8">
        <p className="text-base sm:text-xl md:text-2xl leading-relaxed text-slate-200">
          {t.validators.storyIntro}
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 border border-purple-500/50 rounded-lg p-6"
      >
        <p className="text-lg text-slate-200 leading-relaxed">
          {t.validators.storyAnalogy}
        </p>
      </motion.div>
    </div>
  );

  /* ── Slide 2: Validator definition + staking ── */
  const slide2 = (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5"
      >
        <p className="text-indigo-400 font-bold text-lg mb-2">
          {t.validators.defValidatorTitle}
        </p>
        <p className="text-slate-300">{t.validators.defValidatorText}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-emerald-900/30 border border-emerald-500/50 rounded-lg p-5"
      >
        <p className="text-emerald-400 font-bold text-lg mb-2">
          {t.validators.stakingTitle}
        </p>
        <p className="text-slate-300">{t.validators.stakingText}</p>
      </motion.div>
    </div>
  );

  /* ── Slide 3: Key concepts + Did you know (big stat) ── */
  const slide3 = (
    <div className="space-y-4">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
      >
        <p className="text-purple-400 font-bold text-lg mb-2">
          {t.validators.keyConceptsTitle}
        </p>
        <p className="text-slate-300">{t.validators.keyConceptsText}</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5"
      >
        <p className="text-amber-400 font-bold text-lg mb-2">
          {t.validators.didYouKnowTitle}
        </p>
        <p className="text-slate-300">{t.validators.didYouKnowText}</p>
      </motion.div>

      <div className="text-center my-6">
        <span className="text-5xl sm:text-6xl font-bold text-[var(--sol-green)]">1 900+</span>
        <p className="text-sm text-slate-400 mt-1">validateurs actifs</p>
      </div>
    </div>
  );

  /* ── Slide 4: Summary ── */
  const slide4 = (
    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6">
      <p className="text-lg text-slate-200 leading-relaxed">
        {t.validators.storySummary}
      </p>
    </div>
  );

  /* ── Slide 5: Quiz ── */
  const slide5 = (
    <div>
      <div className="mb-6">
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
          {t.validators.phase2Title}
        </h2>
        <p className="text-slate-400">{t.validators.phase2Subtitle}</p>
      </div>

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
              key={`q-${currentQuestion}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 mb-6">
                <p className="text-sm text-purple-400 font-medium mb-2">
                  {currentQuestion + 1} / {questions.length}
                </p>
                <p className="text-lg sm:text-xl font-semibold text-white mb-6">
                  {questions[currentQuestion].question}
                </p>

                <div className="space-y-3">
                  {questions[currentQuestion].options.map((option, i) => {
                    const isSelected = selectedAnswer === i;
                    const isCorrect =
                      i === questions[currentQuestion].correctIndex;
                    let animClass = '';
                    let borderClass =
                      'border-slate-600 hover:border-purple-500/50';
                    let bgClass = 'bg-slate-700/50 hover:bg-slate-700';

                    if (showExplanation) {
                      if (isCorrect) {
                        borderClass = 'border-green-500';
                        bgClass = 'bg-green-900/30';
                        animClass = 'animate-flash-green';
                      } else if (isSelected && !isCorrect) {
                        borderClass = 'border-red-500';
                        bgClass = 'bg-red-900/30';
                        animClass = 'animate-shake animate-flash-red';
                      } else {
                        borderClass = 'border-slate-700';
                        bgClass = 'bg-slate-800/30 opacity-50';
                      }
                    }

                    return (
                      <motion.button
                        key={i}
                        whileHover={
                          selectedAnswer === null ? { scale: 1.01 } : {}
                        }
                        whileTap={
                          selectedAnswer === null ? { scale: 0.99 } : {}
                        }
                        onClick={() => handleAnswer(i)}
                        className={`w-full text-left border rounded-lg p-4 transition-colors flex items-center gap-3 ${borderClass} ${bgClass} ${animClass} ${
                          selectedAnswer !== null
                            ? 'cursor-default'
                            : 'cursor-pointer'
                        }`}
                      >
                        {showExplanation && isCorrect && (
                          <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0" />
                        )}
                        {showExplanation && isSelected && !isCorrect && (
                          <XCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
                        )}
                        {!showExplanation && (
                          <span className="w-5 h-5 flex-shrink-0 rounded-full border border-slate-500 flex items-center justify-center text-xs text-slate-400">
                            {String.fromCharCode(65 + i)}
                          </span>
                        )}
                        <span
                          className={
                            showExplanation && !isCorrect && !isSelected
                              ? 'text-slate-500'
                              : 'text-slate-200'
                          }
                        >
                          {option}
                        </span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>

              {/* Explanation */}
              <AnimatePresence>
                {showExplanation && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`border rounded-lg p-5 mb-6 ${
                      selectedAnswer ===
                      questions[currentQuestion].correctIndex
                        ? 'bg-green-900/20 border-green-700/50'
                        : 'bg-amber-900/20 border-amber-700/50'
                    }`}
                  >
                    <p className="text-slate-200 leading-relaxed">
                      {questions[currentQuestion].explanation}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Next / Finish button */}
              {showExplanation && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleNext}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg transition-colors"
                  >
                    {currentQuestion + 1 < questions.length ? (
                      <>
                        {t.common.continue}
                        <ArrowRight className="inline ml-2 w-5 h-5" />
                      </>
                    ) : (
                      <>
                        {t.common.finish}
                        <ArrowRight className="inline ml-2 w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      ) : (
        /* Quiz complete -- score display + finish button */
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        >
          <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-6 mb-6 text-center">
            <p className="text-green-400 font-bold text-lg mb-4">
              {t.validators.phase2Narrative}
            </p>
            <motion.span
              className="text-4xl sm:text-5xl font-bold text-[var(--sol-green)] block mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
            >
              {correctCount}/{questions.length}
            </motion.span>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleFinishQuiz}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 py-4 rounded-lg font-bold text-lg transition-colors"
            >
              {t.validators.phase2FinishButton}
              <Trophy className="inline ml-2 w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      )}
    </div>
  );

  /* ── Slide 6: Reveal / completion ── */
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
          {t.validators.revealSubtitle}
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
          <Server className="w-8 h-8 text-slate-900" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
          {t.badges.validators}
        </h3>
        <p className="text-slate-300 mb-2">+170 XP</p>
        <p className="text-sm text-slate-400">
          {t.validators.revealSubtitle}
        </p>
      </motion.div>

      {/* Key points */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5 mb-8"
      >
        <p className="text-purple-400 font-bold text-lg mb-3">
          {t.validators.keyPointsTitle}
        </p>
        <ul className="space-y-2 text-slate-300">
          {t.validators.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Navigation */}
      <div className="flex flex-col gap-3">
        <Link
          href="/basics/explorer"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg text-center transition-colors flex items-center justify-center gap-2"
        >
          {t.common.nextModule} <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          href="/basics"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg text-center transition-colors"
        >
          {t.validators.backToBasics}
        </Link>
      </div>
    </div>
  );

  /* ── Build slides array ── */
  const slides = moduleComplete
    ? [slide1, slide2, slide3, slide4, slide5, slide6]
    : [slide1, slide2, slide3, slide4, slide5];

  return (
    <SlideLayout
      moduleTitle={t.validators.headerTitle}
      moduleXp={170}
      backLink="/basics"
      backLabel={t.validators.backToBasics}
      icon={<Server size={18} className="text-purple-400" />}
      slides={slides}
    />
  );
}
