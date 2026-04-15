'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle2, XCircle, Trophy, ChevronRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { TopBar } from '@/components/TopBar';

type Phase = 'story' | 'minigame' | 'reveal';

export default function ConsensusContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const [phase, setPhase] = useState<Phase>('story');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);

  // Check if consensus module is already completed
  useEffect(() => {
    const mod = gameState?.modules?.find(m => m.id === 'consensus');
    if (mod?.completed) setPhase('reveal');
  }, [gameState]);

  const questions = t.consensus.quizQuestions;
  const current = questions[currentQuestion];

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(index);
    setShowExplanation(true);
    if (index === current.correctIndex) {
      setCorrectAnswers(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(prev => prev + 1);
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
            {t.consensus.backToBasics}
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Brain className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">{t.consensus.headerTitle}</h1>
          </div>
          <p className="text-slate-400">
            {t.consensus.headerSubtitle}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* PHASE 1: STORY */}
          {phase === 'story' && (
            <motion.div
              key="phase-story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 mb-8">
                <p className="text-base sm:text-xl md:text-2xl mb-8 leading-relaxed text-slate-200">
                  {t.consensus.storyIntro}
                </p>
              </div>

              {/* Analogy box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 border border-purple-500/50 rounded-lg p-6 mb-8"
              >
                <p className="text-lg text-slate-200 leading-relaxed">
                  {t.consensus.storyAnalogy}
                </p>
              </motion.div>

              {/* Educational boxes */}
              <div className="space-y-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5"
                >
                  <p className="text-indigo-400 font-bold text-lg mb-2">
                    {t.consensus.defConsensusTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.consensus.defConsensusText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5"
                >
                  <p className="text-indigo-400 font-bold text-lg mb-2">
                    {t.consensus.powVsPosTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.consensus.powVsPosText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
                >
                  <p className="text-purple-400 font-bold text-lg mb-2">
                    {t.consensus.pohTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.consensus.pohText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.0 }}
                  className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
                >
                  <p className="text-purple-400 font-bold text-lg mb-2">
                    {t.consensus.keyConceptsTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.consensus.keyConceptsText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 }}
                  className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5"
                >
                  <p className="text-amber-400 font-bold text-lg mb-2">
                    {t.consensus.didYouKnowTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.consensus.didYouKnowText}
                  </p>
                </motion.div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
                <p className="text-lg text-slate-200 mb-2">
                  {t.consensus.storySummary}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPhase('minigame')}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.consensus.storyNextButton}
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 2: QUIZ MINI-GAME */}
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
                  {t.consensus.phase2Title}
                </h2>
                <p className="text-slate-400">
                  {t.consensus.phase2Subtitle}
                </p>
              </div>

              {!quizComplete ? (
                <div>
                  {/* Progress bar */}
                  <div className="flex gap-1 mb-6">
                    {questions.map((_, i) => (
                      <motion.div
                        key={i}
                        className={`h-1.5 flex-1 rounded-full ${
                          i < currentQuestion ? "bg-[var(--sol-green)]" :
                          i === currentQuestion ? "bg-[var(--sol-purple)]" :
                          "bg-slate-700"
                        }`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.3 }}
                        style={{ transformOrigin: "left" }}
                      />
                    ))}
                  </div>

                  {/* Question card */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentQuestion}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 mb-6">
                        <p className="text-lg sm:text-xl md:text-2xl font-semibold text-slate-200 leading-relaxed">
                          {current.question}
                        </p>
                      </div>

                      {/* Answer buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                        {current.options.map((option, index) => {
                          let btnClass = '';

                          if (showExplanation) {
                            if (index === current.correctIndex) {
                              btnClass = 'bg-green-900/30 border border-green-500 animate-flash-green';
                            } else if (index === selectedAnswer) {
                              btnClass = 'bg-red-900/30 border border-red-500 animate-shake animate-flash-red';
                            } else {
                              btnClass = 'bg-slate-800/30 border border-slate-700 opacity-50';
                            }
                          } else if (selectedAnswer !== null) {
                            btnClass = 'bg-slate-800/30 border border-slate-700 opacity-50 cursor-default';
                          } else {
                            btnClass = 'bg-slate-800/50 border border-slate-600 hover:border-purple-500/50 cursor-pointer';
                          }

                          return (
                            <motion.button
                              key={index}
                              whileHover={selectedAnswer === null ? { scale: 1.02 } : {}}
                              whileTap={selectedAnswer === null ? { scale: 0.98 } : {}}
                              onClick={() => handleAnswer(index)}
                              className={`${btnClass} rounded-lg p-4 text-left transition-all`}
                              disabled={selectedAnswer !== null}
                            >
                              <span className="text-slate-200">{option}</span>
                            </motion.button>
                          );
                        })}
                      </div>

                      {/* Explanation box */}
                      <AnimatePresence>
                        {showExplanation && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-slate-800/50 border border-slate-600 rounded-lg p-4 mb-6"
                          >
                            <div className="flex items-start gap-3">
                              {selectedAnswer === current.correctIndex ? (
                                <CheckCircle2 className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                              ) : (
                                <XCircle className="w-6 h-6 text-red-400 flex-shrink-0 mt-0.5" />
                              )}
                              <p className="text-slate-300 leading-relaxed">
                                {current.explanation}
                              </p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Next button */}
                      {showExplanation && (
                        <motion.button
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleNext}
                          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg transition-colors"
                        >
                          {currentQuestion + 1 < questions.length ? (
                            <>
                              {t.common.next}
                              <ArrowRight className="inline ml-2 w-5 h-5" />
                            </>
                          ) : (
                            <>
                              {t.common.finish}
                              <ArrowRight className="inline ml-2 w-5 h-5" />
                            </>
                          )}
                        </motion.button>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </div>
              ) : (
                /* Quiz complete */
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <div className="bg-green-900/30 border border-green-700/50 rounded-lg p-6 mb-6 text-center">
                    <p className="text-green-400 font-bold text-lg mb-4">
                      {t.consensus.phase2Success}
                    </p>
                    <motion.span
                      className="text-4xl sm:text-5xl font-bold text-[var(--sol-green)] animate-count-up block mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    >
                      {correctAnswers}/{questions.length}
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={async () => {
                        await completeModule('consensus', 160);
                        setPhase('reveal');
                      }}
                      className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 py-4 rounded-lg font-bold text-lg transition-colors"
                    >
                      {t.consensus.phase2FinishButton}
                      <Trophy className="inline ml-2 w-5 h-5" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* PHASE 3: REVEAL */}
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
                  {t.consensus.revealSubtitle}
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
                  <Brain className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
                  {t.badges.consensus}
                </h3>
                <p className="text-slate-300 mb-2">+160 XP</p>
                <p className="text-sm text-slate-400">
                  {t.consensus.revealSubtitle}
                </p>
              </motion.div>

              {/* Narrative */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 mb-8">
                <p className="text-lg md:text-xl leading-relaxed text-slate-200 mb-4">
                  {t.consensus.revealNarrative1}
                </p>
                <p className="text-slate-300">
                  {t.consensus.revealNarrative2}
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
                    {t.consensus.didYouKnowRevealTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.consensus.didYouKnowRevealText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
                >
                  <p className="text-purple-400 font-bold text-lg mb-3">
                    {t.consensus.keyPointsTitle}
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    {t.consensus.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Check if all modules completed */}
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
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                    {t.consensus.revealTitle}
                  </h2>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/basics/validators"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg text-center transition-colors flex items-center justify-center gap-2"
                >
                  {t.common.nextModule} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/basics"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg text-center transition-colors"
                >
                  {t.consensus.backToBasics}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
