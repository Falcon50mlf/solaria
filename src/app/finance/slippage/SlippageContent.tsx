"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

type SlippageLevel = "low" | "medium" | "high";

interface SlippageRound {
  tradeSize: string;
  poolLiquidity: string;
  ratio: number; // tradeSize / poolLiquidity as %
  classification: SlippageLevel;
  slippagePct: string;
  explanation: string;
}

const ROUNDS: SlippageRound[] = [
  {
    tradeSize: "$1 000 USDC",
    poolLiquidity: "$10 000 000",
    ratio: 0.01,
    classification: "low",
    slippagePct: "~0.01%",
    explanation: "Trade de $1k dans un pool de $10M = 0.01% du pool. Slippage négligeable (<0.5%).",
  },
  {
    tradeSize: "$50 000 USDC",
    poolLiquidity: "$500 000",
    ratio: 10,
    classification: "high",
    slippagePct: "~8-12%",
    explanation: "Trade de $50k dans un pool de $500k = 10% du pool. Slippage extrême (>2%), voire plus selon la formule AMM.",
  },
  {
    tradeSize: "$5 000 USDC",
    poolLiquidity: "$1 000 000",
    ratio: 0.5,
    classification: "low",
    slippagePct: "~0.25%",
    explanation: "Trade de $5k dans $1M = 0.5% du pool. Slippage faible (<0.5%), acceptable pour la plupart des DEX.",
  },
  {
    tradeSize: "$20 000 USDC",
    poolLiquidity: "$400 000",
    ratio: 5,
    classification: "high",
    slippagePct: "~4-6%",
    explanation: "Trade de $20k dans $400k = 5% du pool. Slippage élevé (>2%) — envisager de splitter le trade.",
  },
  {
    tradeSize: "$10 000 USDC",
    poolLiquidity: "$800 000",
    ratio: 1.25,
    classification: "medium",
    slippagePct: "~0.8-1.2%",
    explanation: "Trade de $10k dans $800k = 1.25% du pool. Slippage modéré (0.5-2%) — normal pour ce ratio.",
  },
  {
    tradeSize: "$500 USDC",
    poolLiquidity: "$50 000",
    ratio: 1.0,
    classification: "medium",
    slippagePct: "~0.7%",
    explanation: "Malgré le petit montant, le pool est petit ($50k). Ratio 1% = slippage modéré (~0.7%).",
  },
  {
    tradeSize: "$100 000 USDC",
    poolLiquidity: "$50 000 000",
    ratio: 0.2,
    classification: "low",
    slippagePct: "~0.1%",
    explanation: "Trade de $100k dans $50M = 0.2% du pool. Même un gros trade dans un grand pool a peu de slippage.",
  },
  {
    tradeSize: "$15 000 USDC",
    poolLiquidity: "$300 000",
    ratio: 5.0,
    classification: "high",
    slippagePct: "~4-7%",
    explanation: "5% du pool en un seul trade = slippage élevé. Sur un petit pool, chaque gros trade impacte fortement le prix.",
  },
];

const OPTIONS: { label: string; value: SlippageLevel; range: string; color: string }[] = [
  { label: "Faible", value: "low", range: "< 0.5%", color: "text-green-400" },
  { label: "Moyen", value: "medium", range: "0.5% – 2%", color: "text-amber-400" },
  { label: "Élevé", value: "high", range: "> 2%", color: "text-red-400" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function SlippageContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<SlippageLevel | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const handleSelect = (choice: SlippageLevel) => {
    if (answered) return;
    setAnswered(true);
    setSelected(choice);
    if (choice === current.classification) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Slippage Predictor</h2>
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
                  <div className="text-xs text-slate-400">Taille du trade</div>
                  <div className="text-white font-bold text-sm">{current.tradeSize}</div>
                </div>
                <div className="bg-blue-900/30 rounded-lg p-2">
                  <div className="text-xs text-slate-400">Liquidité du pool</div>
                  <div className="text-white font-bold text-sm">{current.poolLiquidity}</div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <span className="text-xs text-slate-400">Ratio: </span>
                <span className="text-amber-400 font-mono font-bold">{current.ratio.toFixed(2)}% du pool</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-2">Quel niveau de slippage attendre ?</p>
            <div className="grid grid-cols-3 gap-2">
              {OPTIONS.map((opt) => {
                const isCorrect = opt.value === current.classification;
                const isSelected = opt.value === selected;
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && isCorrect) cls = "border-green-500 bg-green-900/20";
                else if (answered && isSelected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={opt.value} onClick={() => handleSelect(opt.value)} disabled={answered}
                    className={`border rounded-xl p-3 text-center transition-all ${cls}`}>
                    <div className={`font-bold text-sm ${opt.color}`}>{opt.label}</div>
                    <div className="text-xs text-slate-400">{opt.range}</div>
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
                Slippage réel: <strong>{current.slippagePct}</strong> — {current.explanation}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Chasseur de Slippage certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="slippage" icon={<AlertTriangle size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<AlertTriangle className="w-8 h-8 text-slate-900" />} xp={130} badge={t.badges.slippage}
      content={t.slippage} nextModuleLink="/finance/orderbook" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
