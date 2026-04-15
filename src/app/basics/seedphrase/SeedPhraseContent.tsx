'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Shield,
  CheckCircle2,
  Trophy,
  ArrowRight,
  RotateCcw,
} from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { SlideLayout } from '@/components/SlideLayout';

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

export default function SeedPhraseContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const [seedWords, setSeedWords] = useState<string[]>([]);
  const [scrambledWords, setScrambledWords] = useState<string[]>([]);
  const [selectedWords, setSelectedWords] = useState<string[]>([]);
  const [availableWords, setAvailableWords] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [moduleComplete, setModuleComplete] = useState(false);

  // Generate seed words on mount
  useEffect(() => {
    const words = pickRandom(BIP39_WORDS, 12);
    setSeedWords(words);
    setScrambledWords(shuffle(words));
    setAvailableWords(shuffle(words));
    setSelectedWords([]);
    setShowResult(false);
    setIsCorrect(false);
  }, []);

  // Check if seedphrase module is already completed
  useEffect(() => {
    const mod = gameState?.modules?.find(m => m.id === 'seedphrase');
    if (mod?.completed) setModuleComplete(true);
  }, [gameState]);

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

  // Slide 1: Story intro + analogy
  const slide1 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.seedphrase.headerTitle}
      </h2>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-slate-200 leading-relaxed">{t.seedphrase.storyIntro}</p>
      </div>
      <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4 sm:p-5">
        <p className="text-slate-300 leading-relaxed italic">{t.seedphrase.storyAnalogy}</p>
      </div>
    </div>
  );

  // Slide 2: Definition seed phrase + key concepts
  const slide2 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.seedphrase.defSeedTitle}
      </h2>
      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-indigo-400 font-bold text-lg mb-2">{t.seedphrase.defSeedTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.seedphrase.defSeedText}</p>
      </div>
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5">
        <p className="text-purple-400 font-bold text-lg mb-2">{t.seedphrase.keyConceptsTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.seedphrase.keyConceptsText}</p>
      </div>
    </div>
  );

  // Slide 3: Did you know + summary
  const slide3 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.seedphrase.didYouKnowTitle}
      </h2>
      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-amber-400 font-bold text-lg mb-2">{t.seedphrase.didYouKnowTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.seedphrase.didYouKnowText}</p>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5">
        <p className="text-slate-200 leading-relaxed">{t.seedphrase.storySummary}</p>
      </div>
    </div>
  );

  // Slide 4: Mini-game (memorize step)
  const slide4 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-2">
        {t.seedphrase.phase2Title}
      </h2>
      <p className="text-slate-400 mb-4">{t.seedphrase.phase2Subtitle}</p>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-slate-200 leading-relaxed mb-4">{t.seedphrase.phase2Narrative}</p>
        <p className="text-purple-400 font-semibold mb-4">{t.seedphrase.phase2Memorize}</p>
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
    </div>
  );

  // Slide 5: Mini-game (reorder step)
  const slide5 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-2">
        {t.seedphrase.phase2Scrambled}
      </h2>
      <p className="text-slate-400 mb-4">{t.seedphrase.phase2Instruction}</p>

      {/* Selected words (drop zone) */}
      <div className="mb-2">
        <p className="text-sm text-slate-400 mb-2">{t.seedphrase.phase2Scrambled}</p>
      </div>
      <div className="min-h-[60px] bg-slate-900/50 border-2 border-dashed border-slate-600 rounded-lg p-3 flex flex-wrap gap-2 mb-4">
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
      <div className="flex flex-wrap gap-2 mb-4">
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
      <div className="flex gap-3 mb-4">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleReset}
          className="flex items-center gap-2 bg-slate-700 hover:bg-slate-600 px-4 py-3 rounded-lg font-medium transition-colors cursor-pointer"
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
            className="bg-green-900/30 border border-green-700/50 rounded-lg p-6 mb-4"
          >
            <p className="text-green-400 font-bold text-lg text-center mb-4">
              {t.seedphrase.phase2Success}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={async () => {
                await completeModule('seedphrase', 130);
                setModuleComplete(true);
              }}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 py-4 rounded-lg font-bold text-lg transition-colors cursor-pointer"
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
            className="bg-red-900/30 border border-red-700/50 rounded-lg p-6 mb-4"
          >
            <p className="text-red-400 font-bold text-lg text-center mb-4">
              {t.seedphrase.phase2Retry}
            </p>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleReset}
              className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 py-4 rounded-lg font-bold text-lg transition-colors cursor-pointer"
            >
              <RotateCcw className="inline mr-2 w-5 h-5" />
              Reset
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  // Slide 6: Reveal / completion (badge + recap)
  const slide6 = (
    <div className="text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="inline-block mb-4"
      >
        <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
      </motion.div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t.common.congratulations}</h2>
      <p className="text-slate-300 mb-6">{t.seedphrase.revealSubtitle}</p>

      {/* Badge */}
      <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-6 mb-6 inline-block">
        <div className="inline-block bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-4 mb-4">
          <Shield className="w-8 h-8 text-slate-900" />
        </div>
        <h3 className="text-xl font-bold text-yellow-400">{t.badges.seedphrase}</h3>
        <p className="text-slate-300">+130 XP</p>
      </div>

      {/* Narrative recap */}
      <div className="text-left bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 mb-6">
        <p className="text-slate-200 leading-relaxed mb-4">{t.seedphrase.revealNarrative1}</p>
        <p className="text-slate-300">{t.seedphrase.revealNarrative2}</p>
      </div>

      {/* Key points */}
      <div className="text-left bg-purple-900/30 border border-purple-500/50 rounded-xl p-5 mb-6">
        <p className="text-purple-400 font-bold mb-3">{t.seedphrase.keyPointsTitle}</p>
        <ul className="space-y-2">
          {t.seedphrase.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 size={16} className="text-[var(--sol-green)] mt-0.5 shrink-0" />
              {point}
            </li>
          ))}
        </ul>
      </div>

      {/* Did you know (reveal) */}
      <div className="text-left bg-amber-900/30 border border-amber-500/50 rounded-xl p-5 mb-6">
        <p className="text-amber-400 font-bold text-lg mb-2">{t.seedphrase.didYouKnowRevealTitle}</p>
        <p className="text-slate-300">{t.seedphrase.didYouKnowRevealText}</p>
      </div>

      {/* All modules completed */}
      {gameState?.modules?.every((m) => m.completed) && (
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-xl p-4 sm:p-5 mb-6">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4"
          >
            <Trophy className="w-12 h-12 text-yellow-400 mx-auto" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            {t.seedphrase.allCompletedTitle}
          </h2>
          <p className="text-slate-300">{t.seedphrase.allCompletedText}</p>
        </div>
      )}

      <div className="flex flex-col gap-3">
        <Link
          href="/basics/transactions"
          className="text-[var(--sol-purple)] hover:text-purple-300 text-sm"
        >
          {t.common.nextModule} <ArrowRight className="inline w-4 h-4" />
        </Link>
        <Link href="/basics" className="text-slate-400 hover:text-white text-sm">
          {t.seedphrase.backToBasics}
        </Link>
      </div>
    </div>
  );

  // Build slides array; slide 6 only accessible after module completion
  const slides = moduleComplete
    ? [slide1, slide2, slide3, slide4, slide5, slide6]
    : [slide1, slide2, slide3, slide4, slide5];

  return (
    <SlideLayout
      moduleTitle={t.seedphrase.headerTitle}
      moduleXp={130}
      backLink="/basics"
      backLabel={t.seedphrase.backToBasics}
      icon={<Shield size={18} className="text-[var(--sol-purple)]" />}
      slides={slides}
      canAdvance={moduleComplete
        ? [true, true, true, true, true, true]
        : [true, true, true, true, false]}
    />
  );
}
