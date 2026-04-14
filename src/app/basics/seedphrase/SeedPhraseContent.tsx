'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  ArrowRight,
  CheckCircle2,
  Trophy,
  ChevronRight,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { TopBar } from '@/components/TopBar';

const BIP39_WORDS = [
  "abandon", "ability", "able", "about", "above", "absent", "absorb", "abstract",
  "abuse", "access", "accident", "account", "acid", "across", "action", "actor",
  "address", "adjust", "admit", "adult", "advice", "afford", "agent", "agree",
  "ahead", "alarm", "album", "alert", "alien", "alpha", "already", "amateur",
  "amazing", "anchor", "ancient", "anger", "animal", "apple", "arena", "armor",
  "army", "artwork", "aspect", "atom", "autumn", "average", "avocado", "bamboo",
  "banana", "banner", "barrel", "basic", "beach", "beauty", "blade", "blanket",
  "bonus", "brave", "bridge", "broken",
];

function pickRandom(arr: string[], count: number): string[] {
  const shuffled = [...arr].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

type Phase = 'story' | 'minigame' | 'reveal';
type GameStep = 'memorize' | 'reorder';

export default function SeedPhraseContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const [phase, setPhase] = useState<Phase>('story');
  const [gameStep, setGameStep] = useState<GameStep>('memorize');
  const [seedWords, setSeedWords] = useState<string[]>([]);
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  // Check if seedphrase module is already completed
  useEffect(() => {
    const mod = gameState?.modules?.find(m => m.id === 'seedphrase');
    if (mod?.completed) setPhase('reveal');
  }, [gameState]);

  const startGame = () => {
    const words = pickRandom(BIP39_WORDS, 12);
    setSeedWords(words);
    setScrambledWords(shuffle(words));
    setAvailableWords(shuffle(words));
    setSelectedWords([]);
    setShowResult(false);
    setIsCorrect(false);
    setGameStep('memorize');
    setPhase('minigame');
  };

  const handleWordClick = (word: string) => {
    if (showResult) return;
    const idx = availableWords.indexOf(word);
    if (idx === -1) return;
    setSelectedWords([...selectedWords, word]);
    setAvailableWords(availableWords.filter((_, i) => i !== idx));
  };

  const handleRemoveWord = (index: number) => {
    if (showResult) return;
    const word = selectedWords[index];
    setAvailableWords([...availableWords, word]);
    setSelectedWords(selectedWords.filter((_, i) => i !== index));
  };

  const handleCheck = () => {
    const correct = seedWords.every((w, i) => selectedWords[i] === w);
    setIsCorrect(correct);
    setShowResult(true);
  };

  const handleReset = () => {
    setAvailableWords(shuffle([...seedWords]));
    setSelectedWords([]);
    setShowResult(false);
    setIsCorrect(false);
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
            {t.seedphrase.backToBasics}
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">{t.seedphrase.headerTitle}</h1>
          </div>
          <p className="text-slate-400">
            {t.seedphrase.headerSubtitle}
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
                  {t.seedphrase.storyIntro}
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
                  {t.seedphrase.storyAnalogy}
                </p>
              </motion.div>

              {/* Educational boxes */}
              <div className="space-y-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5"
                >
                  <p className="text-indigo-400 font-bold text-lg mb-2">
                    {t.seedphrase.defSeedTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.seedphrase.defSeedText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
                >
                  <p className="text-purple-400 font-bold text-lg mb-2">
                    {t.seedphrase.keyConceptsTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.seedphrase.keyConceptsText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5"
                >
                  <p className="text-amber-400 font-bold text-lg mb-2">
                    {t.seedphrase.didYouKnowTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.seedphrase.didYouKnowText}
                  </p>
                </motion.div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
                <p className="text-lg text-slate-200 mb-2">
                  {t.seedphrase.storySummary}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={startGame}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.seedphrase.storyNextButton}
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 2: MINIGAME */}
          {phase === 'minigame' && (
            <motion.div
              key="phase-minigame"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* STEP: MEMORIZE */}
              {gameStep === 'memorize' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                      {t.seedphrase.phase2Title}
                    </h2>
                    <p className="text-slate-400">
                      {t.seedphrase.phase2Subtitle}
                    </p>
                  </div>

                  <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 mb-6">
                    <p className="text-lg text-slate-200 mb-6 leading-relaxed">
                      {t.seedphrase.phase2Narrative}
                    </p>
                    <p className="text-purple-400 font-semibold mb-4">
                      {t.seedphrase.phase2Memorize}
                    </p>
                    <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                      {seedWords.map((word, i) => (
                        <div
                          key={i}
                          className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-3 text-center"
                        >
                          <span className="text-purple-400 text-xs font-mono">{i + 1}.</span>
                          <span className="text-white font-medium ml-1">{word}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setGameStep('reorder')}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg transition-colors"
                  >
                    {t.common.continue}
                    <ArrowRight className="inline ml-2 w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* STEP: REORDER */}
              {gameStep === 'reorder' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                      {t.seedphrase.phase2Scrambled}
                    </h2>
                    <p className="text-slate-400">
                      {t.seedphrase.phase2Instruction}
                    </p>
                  </div>

                  {/* Selected words (drop zone) */}
                  <div className="mb-2">
                    <p className="text-sm text-slate-400 mb-2">
                      {t.seedphrase.phase2Scrambled}
                    </p>
                  </div>
                  <div className="min-h-[60px] bg-slate-900/50 border-2 border-dashed border-slate-600 rounded-lg p-3 flex flex-wrap gap-2 mb-6">
                    {selectedWords.map((word, i) => (
                      <motion.button
                        key={`sel-${i}`}
                        onClick={() => handleRemoveWord(i)}
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="bg-green-900/50 border border-green-500/50 rounded-lg px-3 py-1.5 text-sm font-medium text-green-400 cursor-pointer hover:bg-green-800/50"
                      >
                        <span className="text-green-600 text-xs mr-1">{i + 1}.</span>{word}
                      </motion.button>
                    ))}
                  </div>

                  {/* Available words */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {availableWords.map((word, i) => (
                      <motion.button
                        key={`avail-${i}`}
                        onClick={() => handleWordClick(word)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-slate-700 hover:bg-slate-600 border border-slate-500 rounded-lg px-3 py-1.5 text-sm font-medium text-white cursor-pointer transition-colors"
                      >
                        {word}
                      </motion.button>
                    ))}
                  </div>

                  {/* Action buttons */}
                  <div className="flex gap-3 mb-6">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleReset}
                      className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg font-medium transition-colors"
                    >
                      <RotateCcw className="w-4 h-4" />
                      Reset
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: selectedWords.length === 12 ? 1.02 : 1 }}
                      whileTap={{ scale: selectedWords.length === 12 ? 0.98 : 1 }}
                      disabled={selectedWords.length !== 12}
                      onClick={handleCheck}
                      className={`flex-1 py-3 rounded-lg font-bold text-lg transition-all ${
                        selectedWords.length === 12
                          ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 cursor-pointer'
                          : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                      }`}
                    >
                      <CheckCircle2 className="inline mr-2 w-5 h-5" />
                      {t.seedphrase.phase2FinishButton}
                    </motion.button>
                  </div>

                  {/* Result display */}
                  <AnimatePresence>
                    {showResult && isCorrect && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-green-900/30 border border-green-700/50 rounded-lg p-6 mb-6"
                      >
                        <p className="text-green-400 font-bold text-lg text-center mb-4">
                          {t.seedphrase.phase2Success}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={async () => {
                            await completeModule('seedphrase', 130);
                            setPhase('reveal');
                          }}
                          className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 py-4 rounded-lg font-bold text-lg transition-colors"
                        >
                          {t.seedphrase.phase2FinishButton}
                          <Trophy className="inline ml-2 w-5 h-5" />
                        </motion.button>
                      </motion.div>
                    )}

                    {showResult && !isCorrect && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-red-900/30 border border-red-700/50 rounded-lg p-6 mb-6"
                      >
                        <p className="text-red-400 font-bold text-lg text-center mb-4">
                          {t.seedphrase.phase2Retry}
                        </p>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={handleReset}
                          className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 py-4 rounded-lg font-bold text-lg transition-colors"
                        >
                          <RotateCcw className="inline mr-2 w-5 h-5" />
                          Reset
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
                  {t.seedphrase.revealSubtitle}
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
                  <Shield className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
                  {t.badges.seedphrase}
                </h3>
                <p className="text-slate-300 mb-2">+130 XP</p>
                <p className="text-sm text-slate-400">
                  {t.seedphrase.revealSubtitle}
                </p>
              </motion.div>

              {/* Narrative */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 mb-8">
                <p className="text-lg md:text-xl leading-relaxed text-slate-200 mb-4">
                  {t.seedphrase.revealNarrative1}
                </p>
                <p className="text-slate-300">
                  {t.seedphrase.revealNarrative2}
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
                    {t.seedphrase.didYouKnowRevealTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.seedphrase.didYouKnowRevealText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
                >
                  <p className="text-purple-400 font-bold text-lg mb-3">
                    {t.seedphrase.keyPointsTitle}
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    {t.seedphrase.keyPoints.map((point, i) => (
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
                    {t.seedphrase.allCompletedTitle}
                  </h2>
                  <p className="text-slate-300">
                    {t.seedphrase.allCompletedText}
                  </p>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/basics/transactions"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg text-center transition-colors flex items-center justify-center gap-2"
                >
                  {t.common.nextModule} <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/basics"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg text-center transition-colors"
                >
                  {t.seedphrase.backToBasics}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
