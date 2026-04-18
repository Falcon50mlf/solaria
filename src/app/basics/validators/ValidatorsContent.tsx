'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Server, CheckCircle2, Trophy, ArrowRight, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { SlideLayout } from '@/components/SlideLayout';
import { useQuizTimer, TimerDisplay, TimerResult } from '@/components/QuizTimer';

interface Validator {
  name: string;
  commission: number;
  uptime: number;
  stake: number;
  apy: number;
  score: number;
}

function generateValidatorSet(): Validator[][] {
  const names = ["SolFlare", "Marinade", "Everstake", "Chorus One", "Figment", "P2P", "Jito", "Helius", "Triton", "mrgn", "Laine", "Solana Beach"];
  const rounds: Validator[][] = [];
  for (let r = 0; r < 5; r++) {
    const shuffled = names.sort(() => Math.random() - 0.5).slice(0, 3);
    const vals = shuffled.map((name) => {
      const commission = [0, 5, 7, 8, 10, 15, 20, 100][Math.floor(Math.random() * 8)];
      const uptime = 90 + Math.random() * 10;
      const stake = Math.floor(100000 + Math.random() * 900000);
      const apy = Math.max(0, 7.5 - commission * 0.06 + (uptime - 95) * 0.3 + (Math.random() - 0.5));
      const score = apy * (uptime / 100) * (commission <= 10 ? 1 : 0.5);
      return { name, commission, uptime: Math.round(uptime * 100) / 100, stake, apy: Math.round(apy * 100) / 100, score };
    });
    rounds.push(vals);
  }
  return rounds;
}

export default function ValidatorsContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const timer = useQuizTimer();
  const [rounds] = useState(() => generateValidatorSet());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);

  useEffect(() => { if (gameOver) timer.stop(); }, [gameOver]);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(idx);
    const bestIdx = rounds[round].reduce((best, v, i, arr) => v.score > arr[best].score ? i : best, 0);
    if (idx === bestIdx) setScore((s) => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) setGameOver(true);
      else { setRound((r) => r + 1); setAnswered(false); setSelected(null); }
    }, 1200);
  };

  const retry = () => {
    setRound(0); setScore(0); setAnswered(false); setSelected(null);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const slide1 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">{t.validators.headerTitle}</h2>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-slate-200 leading-relaxed">{t.validators.storyIntro}</p>
      </div>
      <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4 sm:p-5">
        <p className="text-slate-300 leading-relaxed italic">{t.validators.storyAnalogy}</p>
      </div>
    </div>
  );
  const slide2 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">{t.validators.defValidatorTitle}</h2>
      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-indigo-400 font-bold text-lg mb-2">{t.validators.defValidatorTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.validators.defValidatorText}</p>
      </div>
      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5">
        <p className="text-indigo-400 font-bold text-lg mb-2">{t.validators.stakingTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.validators.stakingText}</p>
      </div>
    </div>
  );
  const slide3 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">{t.validators.keyConceptsTitle}</h2>
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-purple-400 font-bold text-lg mb-2">{t.validators.keyConceptsTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.validators.keyConceptsText}</p>
      </div>
      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 sm:p-5">
        <p className="text-amber-400 font-bold text-lg mb-2">{t.validators.didYouKnowTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.validators.didYouKnowText}</p>
      </div>
    </div>
  );
  const slide4 = (
    <div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5">
        <p className="text-slate-200 leading-relaxed">{t.validators.storySummary}</p>
      </div>
    </div>
  );

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Choisis ton Validateur</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>

      <div className="flex gap-1 mb-4">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"}`} />
        ))}
      </div>

      {!gameOver ? (
        <AnimatePresence mode="wait">
          <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <p className="text-sm text-slate-400 mb-4">Déléguez 1000 SOL au validateur avec le meilleur rendement ajusté au risque.</p>
            <div className="space-y-3">
              {rounds[round].map((v, idx) => {
                const bestIdx = rounds[round].reduce((best, val, i, arr) => val.score > arr[best].score ? i : best, 0);
                let cardClass = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && idx === bestIdx) cardClass = "border-green-500 bg-green-900/30";
                else if (answered && idx === selected) cardClass = "border-red-500 bg-red-900/30";
                else if (answered) cardClass = "border-slate-700 bg-slate-800/30 opacity-50";

                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-4 text-left transition-all ${cardClass}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold">{v.name}</span>
                      <span className="flex items-center gap-1 text-sm">
                        <TrendingUp size={14} className="text-[var(--sol-green)]" />
                        <span className="text-[var(--sol-green)] font-bold">{v.apy}% APY</span>
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div><span className="text-slate-400">Commission: </span><span className={`font-medium ${v.commission > 10 ? "text-red-400" : "text-white"}`}>{v.commission}%</span></div>
                      <div><span className="text-slate-400">Uptime: </span><span className={`font-medium ${v.uptime < 95 ? "text-amber-400" : "text-white"}`}>{v.uptime}%</span></div>
                      <div><span className="text-slate-400">Stake: </span><span className="text-white font-medium">{(v.stake / 1000).toFixed(0)}K</span></div>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>
            {score}/{TOTAL}
          </motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">{t.validators.phase2Success}</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button>
            </div>}
        </motion.div>
      )}
    </div>
  );

  const revealSlide = (
    <div className="text-center">
      <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="inline-block mb-4">
        <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
      </motion.div>
      <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t.common.congratulations}</h2>
      <p className="text-slate-300 mb-6">{t.validators.revealSubtitle}</p>
      <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-6 mb-6 inline-block">
        <div className="inline-block bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-4 mb-4">
          <Server className="w-8 h-8 text-slate-900" />
        </div>
        <h3 className="text-xl font-bold text-yellow-400">{t.badges.validators}</h3>
        <p className="text-slate-300">+170 XP</p>
      </div>
      <div className="text-left bg-purple-900/30 border border-purple-500/50 rounded-xl p-5 mb-6">
        <p className="text-purple-400 font-bold mb-3">{t.validators.keyPointsTitle}</p>
        <ul className="space-y-2">
          {t.validators.keyPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 size={16} className="text-[var(--sol-green)] mt-0.5 shrink-0" /> {p}
            </li>
          ))}
        </ul>
      </div>
      {!gameState?.modules?.find(m => m.id === 'validators')?.completed && (
        <button onClick={() => completeModule('validators', 170)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-8 py-3 rounded-lg font-bold cursor-pointer">
          {t.validators.phase2FinishButton}
        </button>
      )}
      <div className="flex flex-col gap-3 mt-6">
        <Link href="/basics/explorer" className="text-[var(--sol-purple)] hover:text-purple-300 text-sm">{t.common.nextModule} →</Link>
        <Link href="/chapters" className="text-slate-400 hover:text-white text-sm">{t.validators.backToBasics}</Link>
      </div>
    </div>
  );

  const slides = [slide1, slide2, slide3, slide4, gameSlide, revealSlide];
  return (
    <SlideLayout moduleTitle={t.validators.headerTitle} moduleXp={170} backLink="/basics"
      backLabel={t.validators.backToBasics} icon={<Server size={18} className="text-[var(--sol-purple)]" />}
      slides={slides}
      canAdvance={gameState?.modules?.find(m => m.id === 'validators')?.completed
        ? [true, true, true, true, true, true]
        : [true, true, true, true, passed, true]} />
  );
}
