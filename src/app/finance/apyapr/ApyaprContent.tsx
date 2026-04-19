"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Percent, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface ApyRound {
  apr: number;
  compoundingFreq: string;
  n: number; // number of compounding periods per year
  correct: number;
  options: number[];
  formula: string;
  explanation: string;
}

// APY = (1 + APR/n)^n - 1
function calcApy(apr: number, n: number): number {
  return Math.round(((Math.pow(1 + apr / 100 / n, n) - 1) * 100) * 100) / 100;
}

const ROUNDS: ApyRound[] = (() => {
  const params = [
    { apr: 10, compoundingFreq: "Mensuelle (12×/an)", n: 12 },
    { apr: 20, compoundingFreq: "Quotidienne (365×/an)", n: 365 },
    { apr: 50, compoundingFreq: "Hebdomadaire (52×/an)", n: 52 },
    { apr: 100, compoundingFreq: "Quotidienne (365×/an)", n: 365 },
    { apr: 12, compoundingFreq: "Trimestrielle (4×/an)", n: 4 },
    { apr: 8, compoundingFreq: "Semestrielle (2×/an)", n: 2 },
    { apr: 36, compoundingFreq: "Mensuelle (12×/an)", n: 12 },
    { apr: 24, compoundingFreq: "Quotidienne (365×/an)", n: 365 },
  ];
  return params.map(p => {
    const exact = calcApy(p.apr, p.n);
    const wrong1 = Math.round((exact + (Math.random() * 3 + 1)) * 100) / 100;
    const wrong2 = Math.round((exact - (Math.random() * 2 + 0.5)) * 100) / 100;
    const wrong3 = p.apr; // raw APR as a wrong option (common mistake)
    const options = [exact, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
    return {
      ...p,
      correct: exact,
      options,
      formula: `(1 + ${p.apr}%/${p.n})^${p.n} - 1`,
      explanation: `APY = (1 + ${p.apr / 100 / p.n})^${p.n} - 1 = ${exact}%. Avec ${p.compoundingFreq.toLowerCase()}, les intérêts composés augmentent le rendement réel au-delà de l'APR.`,
    };
  });
})();

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function ApyaprContent() {
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Yield Calculator</h2>
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
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="bg-purple-900/30 rounded-lg p-2">
                  <div className="text-xs text-slate-400">APR</div>
                  <div className="text-white font-bold font-mono text-xl">{current.apr}%</div>
                </div>
                <div className="bg-blue-900/30 rounded-lg p-2">
                  <div className="text-xs text-slate-400">Composition</div>
                  <div className="text-blue-300 font-bold text-xs">{current.compoundingFreq}</div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-slate-400 font-mono">APY = {current.formula}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-2">Quel est l&apos;APY résultant ?</p>
            <div className="grid grid-cols-2 gap-2">
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
                    <div className={`font-mono font-bold text-lg ${answered && isCorrect ? "text-green-400" : "text-white"}`}>{opt}%</div>
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
          {passed ? <p className="text-slate-300 mb-4">Calculateur de Rendement certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="apyapr" icon={<Percent size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Percent className="w-8 h-8 text-slate-900" />} xp={120} badge={t.badges.apyapr}
      content={t.apyapr} nextModuleLink={null} gameSlide={gameSlide} gameCompleted={passed} />
  );
}
