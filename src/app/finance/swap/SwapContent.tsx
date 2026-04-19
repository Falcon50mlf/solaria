"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface SwapRoute {
  label: string;
  path: string;
  output: number;
  fee: number;
  net: number;
}

interface SwapRound {
  pair: string;
  inputAmount: number;
  routes: SwapRoute[];
  bestIdx: number;
  explanation: string;
}

const ROUNDS: SwapRound[] = [
  {
    pair: "SOL → USDC",
    inputAmount: 10,
    routes: [
      { label: "Direct", path: "SOL → USDC", output: 1450.00, fee: 1.45, net: 1448.55 },
      { label: "2 hops", path: "SOL → mSOL → USDC", output: 1453.20, fee: 2.18, net: 1451.02 },
      { label: "3 hops", path: "SOL → ETH → BTC → USDC", output: 1460.00, fee: 8.76, net: 1451.24 },
    ],
    bestIdx: 1,
    explanation: "La route 2 hops offre le meilleur output net (1451.02 USDC) — plus que le direct malgré des frais légèrement supérieurs.",
  },
  {
    pair: "USDC → SOL",
    inputAmount: 1000,
    routes: [
      { label: "Direct", path: "USDC → SOL", output: 6.85, fee: 0.007, net: 6.843 },
      { label: "2 hops", path: "USDC → USDT → SOL", output: 6.87, fee: 0.014, net: 6.856 },
      { label: "3 hops", path: "USDC → ETH → BNB → SOL", output: 6.90, fee: 0.069, net: 6.831 },
    ],
    bestIdx: 1,
    explanation: "La route 2 hops donne 6.856 SOL net — supérieure au direct (6.843) et bien meilleure que les 3 hops qui paient trop de frais.",
  },
  {
    pair: "RAY → SOL",
    inputAmount: 500,
    routes: [
      { label: "Direct", path: "RAY → SOL", output: 12.50, fee: 0.0125, net: 12.4875 },
      { label: "2 hops", path: "RAY → USDC → SOL", output: 12.65, fee: 0.025, net: 12.625 },
      { label: "3 hops", path: "RAY → mSOL → ETH → SOL", output: 12.70, fee: 0.19, net: 12.51 },
    ],
    bestIdx: 1,
    explanation: "2 hops via USDC donne 12.625 SOL net — le meilleur résultat. Les 3 hops ont des frais trop élevés.",
  },
  {
    pair: "ETH → USDC",
    inputAmount: 1,
    routes: [
      { label: "Direct", path: "ETH → USDC", output: 3480.00, fee: 3.48, net: 3476.52 },
      { label: "2 hops", path: "ETH → SOL → USDC", output: 3485.00, fee: 5.23, net: 3479.77 },
      { label: "3 hops", path: "ETH → BTC → SOL → USDC", output: 3490.00, fee: 17.45, net: 3472.55 },
    ],
    bestIdx: 1,
    explanation: "La route ETH → SOL → USDC offre 3479.77 USDC net — 3.25 USDC de plus que le direct et bien plus que les 3 hops.",
  },
  {
    pair: "BONK → USDC",
    inputAmount: 1000000,
    routes: [
      { label: "Direct", path: "BONK → USDC", output: 25.00, fee: 0.025, net: 24.975 },
      { label: "2 hops", path: "BONK → SOL → USDC", output: 25.20, fee: 0.05, net: 25.15 },
      { label: "3 hops", path: "BONK → RAY → ETH → USDC", output: 25.30, fee: 0.51, net: 24.79 },
    ],
    bestIdx: 1,
    explanation: "Via SOL, on obtient 25.15 USDC net — meilleur que le direct (24.975) et que les 3 hops avec frais élevés.",
  },
  {
    pair: "mSOL → USDC",
    inputAmount: 5,
    routes: [
      { label: "Direct", path: "mSOL → USDC", output: 740.00, fee: 0.74, net: 739.26 },
      { label: "2 hops", path: "mSOL → SOL → USDC", output: 742.50, fee: 1.11, net: 741.39 },
      { label: "3 hops", path: "mSOL → jitoSOL → BTC → USDC", output: 745.00, fee: 7.45, net: 737.55 },
    ],
    bestIdx: 1,
    explanation: "mSOL → SOL → USDC donne 741.39 USDC net — 2.13 USDC de mieux que le direct. Les 3 hops perdent trop en frais.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function SwapContent() {
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
    if (idx === current.bestIdx) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Best Route</h2>
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
              <p className="text-xs text-slate-400">Swap : <span className="text-white font-bold">{current.pair}</span> — {current.inputAmount} tokens</p>
            </div>
            <p className="text-xs text-slate-400 mb-2">Quelle route donne le meilleur output net ?</p>
            <div className="space-y-2">
              {current.routes.map((route, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && idx === current.bestIdx) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-sm">{route.label}</span>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-mono font-bold ${answered && idx === current.bestIdx ? "text-green-400" : "text-slate-300"}`}>
                          Net: {route.net}
                        </span>
                        {answered && (idx === current.bestIdx
                          ? <Check size={14} className="text-green-400" />
                          : idx === selected ? <X size={14} className="text-red-400" /> : null)}
                      </div>
                    </div>
                    <div className="text-xs text-slate-400">
                      <span>{route.path}</span>
                      <span className="ml-3 text-slate-500">Frais: {route.fee}</span>
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
          {passed ? <p className="text-slate-300 mb-4">Swappeur certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="swap" icon={<ArrowLeftRight size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<ArrowLeftRight className="w-8 h-8 text-slate-900" />} xp={120} badge={t.badges.swap}
      content={t.swap} nextModuleLink="/finance/cexdex" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
