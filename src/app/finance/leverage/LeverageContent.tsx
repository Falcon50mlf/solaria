"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface LeverageRound {
  entryPrice: number;
  leverage: number;
  direction: "long" | "short";
  marginPct: number;
  correct: number;
  options: number[];
  explanation: string;
}

// Liquidation price for long: entry * (1 - 1/leverage)
// Liquidation price for short: entry * (1 + 1/leverage)
function calcLiquidation(entry: number, leverage: number, direction: "long" | "short"): number {
  if (direction === "long") {
    return Math.round(entry * (1 - 1 / leverage) * 100) / 100;
  } else {
    return Math.round(entry * (1 + 1 / leverage) * 100) / 100;
  }
}

const ROUNDS: LeverageRound[] = (() => {
  const params = [
    { entryPrice: 150, leverage: 5, direction: "long" as const },
    { entryPrice: 150, leverage: 10, direction: "long" as const },
    { entryPrice: 3500, leverage: 5, direction: "short" as const },
    { entryPrice: 62000, leverage: 20, direction: "long" as const },
    { entryPrice: 150, leverage: 3, direction: "short" as const },
    { entryPrice: 3500, leverage: 10, direction: "long" as const },
  ];
  return params.map(p => {
    const exact = calcLiquidation(p.entryPrice, p.leverage, p.direction);
    const wrong1 = Math.round(exact * 1.08 * 100) / 100;
    const wrong2 = Math.round(exact * 0.93 * 100) / 100;
    const options = [exact, wrong1, wrong2].sort(() => Math.random() - 0.5);
    return {
      ...p,
      marginPct: Math.round((1 / p.leverage) * 100),
      correct: exact,
      options,
      explanation: `Prix de liquidation = ${p.entryPrice} × (1 ${p.direction === "long" ? "-" : "+"} 1/${p.leverage}) = ${exact}. Marge initiale: ${Math.round(1/p.leverage*100)}%.`,
    };
  });
})();

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function LeverageContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const handleSelect = (val: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(val);
    if (val === current.correct) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 1800);
  };

  const retry = () => {
    setRound(0); setScore(0); setSelected(null); setAnswered(false); setGameOver(false);
    startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Risk Calculator</h2>
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
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-3 mb-3">
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-700/50 rounded-lg p-2">
                  <div className="text-slate-400">Prix d&apos;entrée</div>
                  <div className="text-white font-bold font-mono">${current.entryPrice}</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-2">
                  <div className="text-slate-400">Levier</div>
                  <div className={`font-bold font-mono ${current.leverage >= 10 ? "text-red-400" : "text-amber-400"}`}>{current.leverage}×</div>
                </div>
                <div className="bg-slate-700/50 rounded-lg p-2">
                  <div className="text-slate-400">Direction</div>
                  <div className={`font-bold ${current.direction === "long" ? "text-green-400" : "text-red-400"}`}>
                    {current.direction === "long" ? "🟢 LONG" : "🔴 SHORT"}
                  </div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-slate-400">Marge initiale requise: </span>
                <span className="text-amber-400 font-mono font-bold">{current.marginPct}%</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-2">Prix de liquidation = ?</p>
            <div className="grid grid-cols-3 gap-2">
              {current.options.map((opt, idx) => {
                const isCorrect = opt === current.correct;
                const isSelected = opt === selected;
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && isCorrect) cls = "border-green-500 bg-green-900/20";
                else if (answered && isSelected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(opt)} disabled={answered}
                    className={`border rounded-xl p-3 text-center transition-all ${cls}`}>
                    <div className="font-mono font-bold text-white text-sm">${opt}</div>
                    {answered && (isCorrect
                      ? <Check size={14} className="text-green-400 mx-auto mt-1" />
                      : isSelected ? <X size={14} className="text-red-400 mx-auto mt-1" /> : null)}
                  </button>
                );
              })}
            </div>
            {answered && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs p-3 rounded-lg border border-amber-500/30 bg-amber-900/20 text-amber-300 mt-3">
                {current.explanation}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Maître du Levier certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="leverage" icon={<Scale size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Scale className="w-8 h-8 text-slate-900" />} xp={170} badge={t.badges.leverage}
      content={t.leverage} nextModuleLink="/finance/perp" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
