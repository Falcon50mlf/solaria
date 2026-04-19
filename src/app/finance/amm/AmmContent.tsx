"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Repeat2, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface AmmRound {
  reserveX: number;
  reserveY: number;
  tokenX: string;
  tokenY: string;
  tradeAmount: number;
  correct: number;
  options: number[];
  priceImpact: string;
  explanation: string;
}

// x * y = k AMM formula: output = reserveY - k / (reserveX + input)
function calcOutput(reserveX: number, reserveY: number, input: number): number {
  const k = reserveX * reserveY;
  const newX = reserveX + input;
  const newY = k / newX;
  return reserveY - newY;
}

const ROUNDS: AmmRound[] = (() => {
  const data = [
    { reserveX: 1000, reserveY: 100000, tokenX: "SOL", tokenY: "USDC", tradeAmount: 10 },
    { reserveX: 500, reserveY: 50000, tokenX: "SOL", tokenY: "USDC", tradeAmount: 50 },
    { reserveX: 10000, reserveY: 1000000, tokenX: "SOL", tokenY: "USDC", tradeAmount: 100 },
    { reserveX: 100, reserveY: 300000, tokenX: "ETH", tokenY: "USDC", tradeAmount: 1 },
    { reserveX: 2000, reserveY: 2000, tokenX: "TOKEN_A", tokenY: "TOKEN_B", tradeAmount: 100 },
  ];
  return data.map(d => {
    const exact = calcOutput(d.reserveX, d.reserveY, d.tradeAmount);
    const rounded = Math.round(exact * 100) / 100;
    const wrong1 = Math.round((rounded * 1.05) * 100) / 100;
    const wrong2 = Math.round((rounded * 0.92) * 100) / 100;
    const impact = ((d.tradeAmount / d.reserveX) * 100).toFixed(2);
    const options = [rounded, wrong1, wrong2].sort(() => Math.random() - 0.5);
    return {
      ...d,
      correct: rounded,
      options,
      priceImpact: `${impact}%`,
      explanation: `Formule x*y=k : output = ${d.reserveY} - (${d.reserveX}×${d.reserveY}) / (${d.reserveX} + ${d.tradeAmount}) ≈ ${rounded} ${d.tokenY}. Impact prix: ${impact}%.`,
    };
  });
})();

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function AmmContent() {
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">x × y = k</h2>
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
              <p className="text-xs text-slate-400 mb-2">Réserves du pool :</p>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-purple-900/30 rounded-lg p-2">
                  <div className="font-bold text-purple-300">{current.reserveX} {current.tokenX}</div>
                </div>
                <div className="flex items-center justify-center text-slate-500 font-mono text-sm">×</div>
                <div className="bg-blue-900/30 rounded-lg p-2">
                  <div className="font-bold text-blue-300">{current.reserveY} {current.tokenY}</div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-slate-400">k = </span>
                <span className="text-xs font-mono text-amber-400">{(current.reserveX * current.reserveY).toLocaleString()}</span>
              </div>
              <div className="mt-2 bg-slate-700/50 rounded-lg p-2 text-center">
                <p className="text-xs text-slate-400">Trade entrant</p>
                <p className="text-white font-bold">{current.tradeAmount} {current.tokenX}</p>
                <p className="text-xs text-amber-400">Impact prix: ~{current.priceImpact}</p>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-2">Combien de {current.tokenY} sortent du pool ?</p>
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
                    <div className="font-mono font-bold text-white text-sm">{opt}</div>
                    <div className="text-xs text-slate-400">{current.tokenY}</div>
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
          {passed ? <p className="text-slate-300 mb-4">Maître AMM certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="amm" icon={<Repeat2 size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Repeat2 className="w-8 h-8 text-slate-900" />} xp={180} badge={t.badges.amm}
      content={t.amm} nextModuleLink="/finance/slippage" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
