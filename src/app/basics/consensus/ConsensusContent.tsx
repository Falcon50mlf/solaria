'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, CheckCircle2, Trophy, ArrowRight, ShieldAlert, ThumbsUp, ThumbsDown } from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { SlideLayout } from '@/components/SlideLayout';
import { useQuizTimer, TimerDisplay, TimerResult } from '@/components/QuizTimer';

interface Block {
  id: number;
  hash: string;
  txCount: number;
  valid: boolean;
  flaw?: string;
}

function randomHash() {
  return Array.from({ length: 8 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
}

function generateBlocks(): Block[] {
  const flaws = [
    "Double-spend détecté", "Timestamp invalide", "Signature manquante",
    "Bloc vide (0 tx)", "Hash précédent incorrect", "Validateur non autorisé",
  ];
  const blocks: Block[] = [];
  for (let i = 0; i < 8; i++) {
    const valid = Math.random() > 0.35;
    blocks.push({
      id: 1000 + Math.floor(Math.random() * 9000),
      hash: randomHash(),
      txCount: valid ? 50 + Math.floor(Math.random() * 200) : 0,
      valid,
      flaw: valid ? undefined : flaws[Math.floor(Math.random() * flaws.length)],
    });
  }
  return blocks;
}

const TOTAL = 8;

export default function ConsensusContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const timer = useQuizTimer();
  const [blocks] = useState(() => generateBlocks());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [stake, setStake] = useState(100);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7) && stake > 0;

  useEffect(() => { if (gameOver) timer.stop(); }, [gameOver]);

  const handleVote = (approve: boolean) => {
    if (answered) return;
    setAnswered(true);
    const block = blocks[round];
    const correct = approve === block.valid;
    setLastCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
      setStake((s) => s + 5);
    } else {
      setStake((s) => Math.max(0, s - 20)); // slashing
    }
    setTimeout(() => {
      if (round + 1 >= TOTAL) setGameOver(true);
      else { setRound((r) => r + 1); setAnswered(false); setLastCorrect(null); }
    }, 1000);
  };

  const retry = () => {
    setRound(0); setScore(0); setStake(100); setAnswered(false);
    setLastCorrect(null); setGameOver(false); startedRef.current = false; timer.reset();
  };

  // Story slides
  const slide1 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">{t.consensus.headerTitle}</h2>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-slate-200 leading-relaxed">{t.consensus.storyIntro}</p>
      </div>
      <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4 sm:p-5">
        <p className="text-slate-300 leading-relaxed italic">{t.consensus.storyAnalogy}</p>
      </div>
    </div>
  );
  const slide2 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">{t.consensus.defConsensusTitle}</h2>
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
  const slide3 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">{t.consensus.pohTitle}</h2>
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-purple-400 font-bold text-lg mb-2">{t.consensus.pohTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.consensus.pohText}</p>
      </div>
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5">
        <p className="text-purple-400 font-bold text-lg mb-2">{t.consensus.keyConceptsTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.consensus.keyConceptsText}</p>
      </div>
    </div>
  );
  const slide4 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">{t.consensus.didYouKnowTitle}</h2>
      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-amber-400 font-bold text-lg mb-2">{t.consensus.didYouKnowTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.consensus.didYouKnowText}</p>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5">
        <p className="text-slate-200 leading-relaxed">{t.consensus.storySummary}</p>
      </div>
    </div>
  );

  // Game slide
  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Vote Tower BFT</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>

      {/* Stake meter */}
      <div className="flex items-center justify-between mb-2 text-sm">
        <span className="text-slate-400">Votre Stake</span>
        <span className={`font-bold ${stake > 50 ? "text-[var(--sol-green)]" : stake > 20 ? "text-amber-400" : "text-red-400"}`}>{stake} SOL</span>
      </div>
      <div className="h-2 rounded-full bg-slate-700 overflow-hidden mb-4">
        <motion.div animate={{ width: `${stake}%` }} className={`h-full rounded-full ${stake > 50 ? "bg-green-500" : stake > 20 ? "bg-amber-500" : "bg-red-500"}`} />
      </div>

      <div className="flex gap-1 mb-4">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"}`} />
        ))}
      </div>

      {!gameOver ? (
        <AnimatePresence mode="wait">
          <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-5 mb-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs text-slate-400 uppercase tracking-wider">Bloc #{blocks[round].id}</span>
                <span className="font-mono text-xs text-blue-400">0x{blocks[round].hash}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-400">Transactions :</span>
                <span className={`font-bold ${blocks[round].txCount === 0 ? "text-red-400" : "text-white"}`}>{blocks[round].txCount}</span>
              </div>
            </div>

            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`mb-4 p-3 rounded-lg text-center ${lastCorrect ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {lastCorrect ? (
                  <>✓ Bon vote ! +5 SOL stake</>
                ) : (
                  <><ShieldAlert className="inline w-4 h-4 mr-1" /> Slashing ! -20 SOL. {blocks[round].valid ? "Ce bloc était valide." : `Faille : ${blocks[round].flaw}`}</>
                )}
              </motion.div>
            )}

            {!answered && (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleVote(true)}
                  className="bg-green-900/30 border border-green-500/50 hover:border-green-400 rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-105">
                  <ThumbsUp className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <span className="text-green-400 font-bold">Approuver</span>
                </button>
                <button onClick={() => handleVote(false)}
                  className="bg-red-900/30 border border-red-500/50 hover:border-red-400 rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-105">
                  <ThumbsDown className="w-8 h-8 mx-auto mb-2 text-red-400" />
                  <span className="text-red-400 font-bold">Rejeter</span>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>
            {score}/{TOTAL}
          </motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          <p className="text-sm text-slate-400 mb-4">Stake final : {stake} SOL</p>
          {passed ? <p className="text-slate-300 mb-4">{t.consensus.phase2Success}</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score 70% + stake &gt; 0 requis</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button>
            </div>}
        </motion.div>
      )}
    </div>
  );

  // Reveal slide
  const revealSlide = (
    <div className="text-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block mb-4">
        <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
      </motion.div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t.common.congratulations}</h2>
      <p className="text-slate-300 mb-6">{t.consensus.revealSubtitle}</p>
      <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-6 mb-6 inline-block">
        <div className="inline-block bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-4 mb-4">
          <Brain className="w-8 h-8 text-slate-900" />
        </div>
        <h3 className="text-xl font-bold text-yellow-400">{t.badges.consensus}</h3>
        <p className="text-slate-300">+160 XP</p>
      </div>
      <div className="text-left bg-purple-900/30 border border-purple-500/50 rounded-xl p-5 mb-6">
        <p className="text-purple-400 font-bold mb-3">{t.consensus.keyPointsTitle}</p>
        <ul className="space-y-2">
          {t.consensus.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 size={16} className="text-[var(--sol-green)] mt-0.5 shrink-0" /> {point}
            </li>
          ))}
        </ul>
      </div>
      {!gameState?.modules?.find(m => m.id === 'consensus')?.completed && (
        <button onClick={() => completeModule('consensus', 160)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-8 py-3 rounded-lg font-bold cursor-pointer">
          {t.consensus.phase2FinishButton}
        </button>
      )}
      <div className="flex flex-col gap-3 mt-6">
        <Link href="/basics/validators" className="text-[var(--sol-purple)] hover:text-purple-300 text-sm">{t.common.nextModule} →</Link>
        <Link href="/chapters" className="text-slate-400 hover:text-white text-sm">{t.consensus.backToBasics}</Link>
      </div>
    </div>
  );

  const slides = [slide1, slide2, slide3, slide4, gameSlide, revealSlide];

  return (
    <SlideLayout moduleTitle={t.consensus.headerTitle} moduleXp={160} backLink="/basics"
      backLabel={t.consensus.backToBasics} icon={<Brain size={18} className="text-[var(--sol-purple)]" />}
      slides={slides}
      canAdvance={gameState?.modules?.find(m => m.id === 'consensus')?.completed
        ? [true, true, true, true, true, true]
        : [true, true, true, true, passed, true]} />
  );
}
