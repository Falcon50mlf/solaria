'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, CheckCircle2, Trophy, ArrowRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { SlideLayout } from '@/components/SlideLayout';
import { useQuizTimer, TimerDisplay, TimerResult } from '@/components/QuizTimer';

function randomAddr() {
  const c = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
  return Array.from({ length: 44 }, () => c[Math.floor(Math.random() * 58)]).join("");
}

function shortAddr(a: string) { return a.slice(0, 4) + "..." + a.slice(-4); }

interface TrailCase {
  startAddr: string;
  hops: { from: string; to: string; amount: string }[];
  finalAddr: string;
  decoys: string[];
}

function generateTrails(): TrailCase[] {
  const cases: TrailCase[] = [];
  for (let c = 0; c < 4; c++) {
    const addrs = [randomAddr(), randomAddr(), randomAddr(), randomAddr()];
    const hops = [
      { from: addrs[0], to: addrs[1], amount: (Math.random() * 50 + 1).toFixed(2) + " SOL" },
      { from: addrs[1], to: addrs[2], amount: (Math.random() * 20 + 0.5).toFixed(2) + " SOL" },
      { from: addrs[2], to: addrs[3], amount: (Math.random() * 10 + 0.1).toFixed(2) + " SOL" },
    ];
    const decoys = [randomAddr(), randomAddr(), randomAddr()];
    cases.push({ startAddr: addrs[0], hops, finalAddr: addrs[3], decoys });
  }
  return cases;
}

export default function ExplorerContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const timer = useQuizTimer();
  const [trails] = useState(() => generateTrails());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = trails.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const trail = trails[round];

  useEffect(() => { if (gameOver) timer.stop(); }, [gameOver]);

  const options = [trail.finalAddr, ...trail.decoys].sort(() => Math.random() - 0.5);

  const handleAnswer = (addr: string) => {
    if (answered) return;
    setAnswered(true); setSelected(addr);
    if (addr === trail.finalAddr) setScore((s) => s + 1);
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
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">{t.explorer.headerTitle}</h2>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-slate-200 leading-relaxed">{t.explorer.storyIntro}</p>
      </div>
      <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4 sm:p-5">
        <p className="text-slate-300 leading-relaxed italic">{t.explorer.storyAnalogy}</p>
      </div>
    </div>
  );
  const slide2 = (
    <div>
      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-indigo-400 font-bold text-lg mb-2">{t.explorer.defExplorerTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.explorer.defExplorerText}</p>
      </div>
      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5">
        <p className="text-indigo-400 font-bold text-lg mb-2">{t.explorer.solscanTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.explorer.solscanText}</p>
      </div>
    </div>
  );
  const slide3 = (
    <div>
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-purple-400 font-bold text-lg mb-2">{t.explorer.keyConceptsTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.explorer.keyConceptsText}</p>
      </div>
      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 sm:p-5">
        <p className="text-amber-400 font-bold text-lg mb-2">{t.explorer.didYouKnowTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.explorer.didYouKnowText}</p>
      </div>
    </div>
  );
  const slide4 = (
    <div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5">
        <p className="text-slate-200 leading-relaxed">{t.explorer.storySummary}</p>
      </div>
    </div>
  );

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Suivez l&apos;Argent</h2>
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
            <p className="text-sm text-slate-400 mb-3">Suivez la chaîne de transactions. Où finit l&apos;argent ?</p>

            {/* Transaction chain */}
            <div className="bg-[#0d1117] border border-slate-700 rounded-xl p-4 mb-4 space-y-2">
              {trail.hops.map((hop, i) => (
                <div key={i} className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-slate-500">#{i + 1}</span>
                  <span className="text-blue-400">{shortAddr(hop.from)}</span>
                  <ArrowRight size={12} className="text-slate-500" />
                  <span className="text-blue-400">{shortAddr(hop.to)}</span>
                  <span className="text-[var(--sol-green)] ml-auto">{hop.amount}</span>
                </div>
              ))}
            </div>

            <p className="text-sm text-white font-medium mb-3">Quelle est l&apos;adresse de destination finale ?</p>

            <div className="grid grid-cols-2 gap-2">
              {options.map((addr) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && addr === trail.finalAddr) cls = "border-green-500 bg-green-900/30";
                else if (answered && addr === selected) cls = "border-red-500 bg-red-900/30";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-50";
                return (
                  <button key={addr} onClick={() => handleAnswer(addr)} disabled={answered}
                    className={`border rounded-lg p-3 text-center font-mono text-xs transition-all ${cls}`}>
                    {shortAddr(addr)}
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
          {passed ? <p className="text-slate-300 mb-4">{t.explorer.phase2Success}</p>
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
      <p className="text-slate-300 mb-6">{t.explorer.revealSubtitle}</p>
      <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-xl p-6 mb-6 inline-block">
        <div className="inline-block bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-4 mb-4">
          <Search className="w-8 h-8 text-slate-900" />
        </div>
        <h3 className="text-xl font-bold text-yellow-400">{t.badges.explorer}</h3>
        <p className="text-slate-300">+180 XP</p>
      </div>
      <div className="text-left bg-purple-900/30 border border-purple-500/50 rounded-xl p-5 mb-6">
        <p className="text-purple-400 font-bold mb-3">{t.explorer.keyPointsTitle}</p>
        <ul className="space-y-2">
          {t.explorer.keyPoints.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-slate-300">
              <CheckCircle2 size={16} className="text-[var(--sol-green)] mt-0.5 shrink-0" /> {p}
            </li>
          ))}
        </ul>
      </div>
      {!gameState?.modules?.find(m => m.id === 'explorer')?.completed && (
        <button onClick={() => completeModule('explorer', 180)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 px-8 py-3 rounded-lg font-bold cursor-pointer">
          {t.explorer.phase2FinishButton}
        </button>
      )}
      <div className="flex flex-col gap-3 mt-6">
        <Link href="/basics/adresse" className="text-[var(--sol-purple)] hover:text-purple-300 text-sm">{t.common.nextModule} →</Link>
        <Link href="/chapters" className="text-slate-400 hover:text-white text-sm">{t.explorer.backToBasics}</Link>
      </div>
    </div>
  );

  const slides = [slide1, slide2, slide3, slide4, gameSlide, revealSlide];
  return (
    <SlideLayout moduleTitle={t.explorer.headerTitle} moduleXp={180} backLink="/basics"
      backLabel={t.explorer.backToBasics} icon={<Search size={18} className="text-[var(--sol-purple)]" />}
      slides={slides}
      canAdvance={gameState?.modules?.find(m => m.id === 'explorer')?.completed
        ? [true, true, true, true, true, true]
        : [true, true, true, true, passed, true]} />
  );
}
