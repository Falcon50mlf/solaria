"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PieChart, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface IndexRound {
  indexName: string;
  targetAllocations: { token: string; target: number }[];
  options: { allocations: { token: string; weight: number }[]; isMatch: boolean; label: string }[];
  explanation: string;
}

const ROUNDS: IndexRound[] = [
  {
    indexName: "Index DeFi Solana",
    targetAllocations: [
      { token: "SOL", target: 40 },
      { token: "JUP", target: 20 },
      { token: "RAY", target: 20 },
      { token: "ORCA", target: 10 },
      { token: "MSOL", target: 10 },
    ],
    options: [
      {
        label: "Allocation A",
        allocations: [
          { token: "SOL", weight: 40 }, { token: "JUP", weight: 20 },
          { token: "RAY", weight: 20 }, { token: "ORCA", weight: 10 }, { token: "MSOL", weight: 10 },
        ],
        isMatch: true,
      },
      {
        label: "Allocation B",
        allocations: [
          { token: "SOL", weight: 50 }, { token: "JUP", weight: 15 },
          { token: "RAY", weight: 15 }, { token: "ORCA", weight: 10 }, { token: "MSOL", weight: 10 },
        ],
        isMatch: false,
      },
      {
        label: "Allocation C",
        allocations: [
          { token: "SOL", weight: 40 }, { token: "JUP", weight: 25 },
          { token: "RAY", weight: 15 }, { token: "ORCA", weight: 10 }, { token: "MSOL", weight: 10 },
        ],
        isMatch: false,
      },
    ],
    explanation: "L'allocation A correspond exactement à la cible : SOL 40%, JUP 20%, RAY 20%, ORCA 10%, MSOL 10%.",
  },
  {
    indexName: "Index Blue Chip Crypto",
    targetAllocations: [
      { token: "BTC", target: 50 },
      { token: "ETH", target: 30 },
      { token: "SOL", target: 10 },
      { token: "BNB", target: 5 },
      { token: "AVAX", target: 5 },
    ],
    options: [
      {
        label: "Allocation A",
        allocations: [
          { token: "BTC", weight: 45 }, { token: "ETH", weight: 30 },
          { token: "SOL", weight: 15 }, { token: "BNB", weight: 5 }, { token: "AVAX", weight: 5 },
        ],
        isMatch: false,
      },
      {
        label: "Allocation B",
        allocations: [
          { token: "BTC", weight: 50 }, { token: "ETH", weight: 30 },
          { token: "SOL", weight: 10 }, { token: "BNB", weight: 5 }, { token: "AVAX", weight: 5 },
        ],
        isMatch: true,
      },
      {
        label: "Allocation C",
        allocations: [
          { token: "BTC", weight: 50 }, { token: "ETH", weight: 25 },
          { token: "SOL", weight: 10 }, { token: "BNB", weight: 10 }, { token: "AVAX", weight: 5 },
        ],
        isMatch: false,
      },
    ],
    explanation: "L'allocation B correspond : BTC 50%, ETH 30%, SOL 10%, BNB 5%, AVAX 5%.",
  },
  {
    indexName: "Index Stablecoins Diversifié",
    targetAllocations: [
      { token: "USDC", target: 40 },
      { token: "USDT", target: 30 },
      { token: "DAI", target: 15 },
      { token: "FRAX", target: 10 },
      { token: "UXD", target: 5 },
    ],
    options: [
      {
        label: "Allocation A",
        allocations: [
          { token: "USDC", weight: 40 }, { token: "USDT", weight: 30 },
          { token: "DAI", weight: 15 }, { token: "FRAX", weight: 10 }, { token: "UXD", weight: 5 },
        ],
        isMatch: true,
      },
      {
        label: "Allocation B",
        allocations: [
          { token: "USDC", weight: 50 }, { token: "USDT", weight: 25 },
          { token: "DAI", weight: 10 }, { token: "FRAX", weight: 10 }, { token: "UXD", weight: 5 },
        ],
        isMatch: false,
      },
      {
        label: "Allocation C",
        allocations: [
          { token: "USDC", weight: 35 }, { token: "USDT", weight: 35 },
          { token: "DAI", weight: 15 }, { token: "FRAX", weight: 10 }, { token: "UXD", weight: 5 },
        ],
        isMatch: false,
      },
    ],
    explanation: "L'allocation A correspond exactement à la cible pour l'index stablecoins diversifié.",
  },
  {
    indexName: "Index Gaming & NFT",
    targetAllocations: [
      { token: "BONK", target: 25 },
      { token: "TENSOR", target: 25 },
      { token: "MAGIC", target: 20 },
      { token: "GMT", target: 15 },
      { token: "AUDIO", target: 15 },
    ],
    options: [
      {
        label: "Allocation A",
        allocations: [
          { token: "BONK", weight: 30 }, { token: "TENSOR", weight: 25 },
          { token: "MAGIC", weight: 20 }, { token: "GMT", weight: 15 }, { token: "AUDIO", weight: 10 },
        ],
        isMatch: false,
      },
      {
        label: "Allocation B",
        allocations: [
          { token: "BONK", weight: 25 }, { token: "TENSOR", weight: 20 },
          { token: "MAGIC", weight: 25 }, { token: "GMT", weight: 15 }, { token: "AUDIO", weight: 15 },
        ],
        isMatch: false,
      },
      {
        label: "Allocation C",
        allocations: [
          { token: "BONK", weight: 25 }, { token: "TENSOR", weight: 25 },
          { token: "MAGIC", weight: 20 }, { token: "GMT", weight: 15 }, { token: "AUDIO", weight: 15 },
        ],
        isMatch: true,
      },
    ],
    explanation: "L'allocation C correspond : BONK 25%, TENSOR 25%, MAGIC 20%, GMT 15%, AUDIO 15%.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function IndextokensContent() {
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

  const handleSelect = (idx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(idx);
    if (current.options[idx].isMatch) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Portfolio Builder</h2>
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
              <p className="text-xs text-slate-400 mb-1">Index cible : <span className="text-white font-bold">{current.indexName}</span></p>
              <div className="flex flex-wrap gap-1 mt-1">
                {current.targetAllocations.map((a) => (
                  <span key={a.token} className="text-xs bg-purple-900/40 text-purple-300 px-2 py-0.5 rounded-full font-mono">
                    {a.token}: {a.target}%
                  </span>
                ))}
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-2">Quelle allocation correspond à cet index ?</p>
            <div className="space-y-2">
              {current.options.map((opt, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && opt.isMatch) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-sm">{opt.label}</span>
                      {answered && (opt.isMatch
                        ? <Check size={14} className="text-green-400" />
                        : idx === selected ? <X size={14} className="text-red-400" /> : null)}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {opt.allocations.map((a) => (
                        <span key={a.token} className="text-xs text-slate-400 font-mono">{a.token}:{a.weight}%</span>
                      ))}
                    </div>
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
          {passed ? <p className="text-slate-300 mb-4">Indexeur certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="indextokens" icon={<PieChart size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<PieChart className="w-8 h-8 text-slate-900" />} xp={150} badge={t.badges.indextokens}
      content={t.indextokens} nextModuleLink="/finance/tvl" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
