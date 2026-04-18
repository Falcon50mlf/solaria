'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle2, XCircle, Trophy, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { SlideLayout } from '@/components/SlideLayout';
import { useQuizTimer, TimerDisplay, TimerResult } from '@/components/QuizTimer';

export default function ConsensusContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [quizComplete, setQuizComplete] = useState(false);
  const timer = useQuizTimer();

  const questions = t.consensus.quizQuestions;
  const current = questions[currentQuestion];
  const passed = quizComplete && correctAnswers / questions.length >= 0.7;

  useEffect(() => { if (quizComplete) timer.stop(); }, [quizComplete]);

  const handleRetryQuiz = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowExplanation(false);
    setCorrectAnswers(0);
    setQuizComplete(false);
    timer.reset();
  };

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

  // Slide 1: Story intro + analogy
  const slide1 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.consensus.headerTitle}
      </h2>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-slate-200 leading-relaxed">{t.consensus.storyIntro}</p>
      </div>
      <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4 sm:p-5">
        <p className="text-slate-300 leading-relaxed italic">{t.consensus.storyAnalogy}</p>
      </div>
    </div>
  );

  // Slide 2: Definition of consensus + PoW vs PoS
  const slide2 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.consensus.defConsensusTitle}
      </h2>
      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-indigo-400 font-bold text-lg mb-2">{t.consensus.defConsensusTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.consensus.defConsensusText}</p>
      </div>
      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5">
        <p className="text-indigo-400 font-bold text-lg mb-2">{t.consensus.powVsPosTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.consensus.powVsPosText}</p>
      </div>
    </div>
  );

  // Slide 3: Proof of History + key concepts
  const slide3 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.consensus.pohTitle}
      </h2>
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-purple-400 font-bold text-lg mb-2">{t.consensus.pohTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.consensus.pohText}</p>
      </div>
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5">
        <p className="text-purple-400 font-bold text-lg mb-2">{t.consensus.keyConceptsTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.consensus.keyConceptsText}</p>
      </div>
      <div className="text-center my-6">
        <span className="text-5xl sm:text-6xl font-bold text-[var(--sol-green)]">65 000</span>
        <p className="text-sm text-slate-400 mt-1">transactions / seconde</p>
      </div>
    </div>
  );

  // Slide 4: Did you know + summary
  const slide4 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.consensus.didYouKnowTitle}
      </h2>
      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-amber-400 font-bold text-lg mb-2">{t.consensus.didYouKnowTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.consensus.didYouKnowText}</p>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5">
        <p className="text-slate-200 leading-relaxed">{t.consensus.storySummary}</p>
      </div>
    </div>
  );

  // Slide 5: Quiz
  const quizSlide = (
    <div onAnimationStart={() => timer.start()} ref={(el) => { if (el && !timer.running) timer.start(); }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-[var(--sol-green)]">{t.consensus.phase2Title}</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>
      {/* Progress dots */}
      <div className="flex gap-1 mb-6">
        {questions.map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${
            i < currentQuestion ? "bg-[var(--sol-green)]" :
            i === currentQuestion ? "bg-[var(--sol-purple)]" :
            "bg-slate-700"
          }`} />
        ))}
      </div>

      {!quizComplete ? (
        <AnimatePresence mode="wait">
          <motion.div key={currentQuestion} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <p className="text-lg font-semibold mb-6 text-slate-200">{current.question}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {current.options.map((option, index) => {
                let btnClass = '';
                if (showExplanation) {
                  if (index === current.correctIndex) {
                    btnClass = 'bg-green-900/30 border-green-500 animate-flash-green';
                  } else if (index === selectedAnswer) {
                    btnClass = 'bg-red-900/30 border-red-500 animate-shake animate-flash-red';
                  } else {
                    btnClass = 'bg-slate-800/30 border-slate-700 opacity-50';
                  }
                } else {
                  btnClass = 'bg-slate-800/50 border-slate-600 hover:border-purple-500/50 cursor-pointer';
                }

                return (
                  <button key={index} onClick={() => handleAnswer(index)} disabled={selectedAnswer !== null}
                    className={`text-left p-4 rounded-lg border transition-all ${btnClass}`}>
                    <span className="text-slate-200">{option}</span>
                  </button>
                );
              })}
            </div>
            {showExplanation && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-4 p-4 bg-slate-800/50 border border-slate-600 rounded-lg">
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
              <button onClick={handleNext} className="mt-4 px-6 py-2 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">
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
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 animate-count-up ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>
            {correctAnswers}/{questions.length}
          </motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? (
            <p className="text-slate-300 mb-6">{t.consensus.phase2Success}</p>
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

  // Slide 6: Reveal / completion
  const revealSlide = (
    <div className="text-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block mb-4">
        <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
      </motion.div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t.common.congratulations}</h2>
      <p className="text-slate-300 mb-6">{t.consensus.revealSubtitle}</p>

      {/* Badge */}
      <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-6 mb-6 inline-block">
        <div className="inline-block bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-4 mb-4">
          <Brain className="w-8 h-8 text-slate-900" />
        </div>
        <h3 className="text-xl font-bold text-yellow-400">{t.badges.consensus}</h3>
        <p className="text-slate-300">+160 XP</p>
      </div>

      {/* Key points */}
      <div className="text-left bg-purple-900/30 border border-purple-500/50 rounded-xl p-5 mb-6">
        <p className="text-purple-400 font-bold mb-3">{t.consensus.keyPointsTitle}</p>
        <ul className="space-y-2">
          {t.consensus.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 size={16} className="text-[var(--sol-green)] mt-0.5 shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Complete button */}
      {!gameState?.modules?.find(m => m.id === 'consensus')?.completed && (
        <button onClick={() => { completeModule('consensus', 160); }}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-8 py-3 rounded-lg font-bold cursor-pointer">
          {t.consensus.phase2FinishButton}
        </button>
      )}

      <div className="flex flex-col gap-3 mt-6">
        <Link href="/basics/validators" className="text-[var(--sol-purple)] hover:text-purple-300 text-sm">
          {t.common.nextModule} →
        </Link>
        <Link href="/basics" className="text-slate-400 hover:text-white text-sm">
          {t.consensus.backToBasics}
        </Link>
      </div>
    </div>
  );

  const slides = [slide1, slide2, slide3, slide4, quizSlide, revealSlide];

  return (
    <SlideLayout
      moduleTitle={t.consensus.headerTitle}
      moduleXp={160}
      backLink="/basics"
      backLabel={t.consensus.backToBasics}
      icon={<Brain size={18} className="text-[var(--sol-purple)]" />}
      slides={slides}
      canAdvance={gameState?.modules?.find(m => m.id === 'consensus')?.completed
        ? [true, true, true, true, true, true]
        : [true, true, true, true, passed, true]}
    />
  );
}
