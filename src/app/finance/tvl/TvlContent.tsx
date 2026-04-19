"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface Protocol {
  name: string;
  category: string;
  tvl: number;
  tvlDisplay: string;
}

interface TvlRound {
  protocols: Protocol[];
  correctOrder: number[];
  explanation: string;
}

function generateRounds(): TvlRound[] {
  const rounds: TvlRound[] = [
    {
      protocols: [
        { name: "Jito", category: "Liquid Staking", tvl: 2800, tvlDisplay: "$2.8B" },
        { name: "Marinade", category: "Liquid Staking", tvl: 1200, tvlDisplay: "$1.2B" },
        { name: "Raydium", category: "DEX / AMM", tvl: 650, tvlDisplay: "$650M" },
        { name: "Jupiter", category: "Aggregateur", tvl: 420, tvlDisplay: "$420M" },
        { name: "Drift", category: "Perpetuals", tvl: 180, tvlDisplay: "$180M" },
      ],
      correctOrder: [0, 1, 2, 3, 4],
      explanation: "Jito ($2.8B) > Marinade ($1.2B) > Raydium ($650M) > Jupiter ($420M) > Drift ($180M)",
    },
    {
      protocols: [
        { name: "Lido (Solana)", category: "Liquid Staking", tvl: 890, tvlDisplay: "$890M" },
        { name: "Orca", category: "DEX CLMM", tvl: 320, tvlDisplay: "$320M" },
        { name: "Kamino", category: "Lending", tvl: 1450, tvlDisplay: "$1.45B" },
        { name: "Mango Markets", category: "Spot/Perps", tvl: 95, tvlDisplay: "$95M" },
        { name: "Solend", category: "Lending", tvl: 540, tvlDisplay: "$540M" },
      ],
      correctOrder: [2, 0, 4, 1, 3],
      explanation: "Kamino ($1.45B) > Lido ($890M) > Solend ($540M) > Orca ($320M) > Mango ($95M)",
    },
    {
      protocols: [
        { name: "Tensor", category: "NFT Marketplace", tvl: 75, tvlDisplay: "$75M" },
        { name: "Phoenix", category: "Orderbook DEX", tvl: 45, tvlDisplay: "$45M" },
        { name: "Meteora", category: "DLMM Pools", tvl: 380, tvlDisplay: "$380M" },
        { name: "Pyth Network", category: "Oracle", tvl: 210, tvlDisplay: "$210M" },
        { name: "Marginfi", category: "Lending", tvl: 620, tvlDisplay: "$620M" },
      ],
      correctOrder: [4, 2, 3, 0, 1],
      explanation: "Marginfi ($620M) > Meteora ($380M) > Pyth ($210M) > Tensor ($75M) > Phoenix ($45M)",
    },
    {
      protocols: [
        { name: "Zeta Markets", category: "Options/Perps", tvl: 88, tvlDisplay: "$88M" },
        { name: "Hubble Protocol", category: "Stablecoin", tvl: 155, tvlDisplay: "$155M" },
        { name: "Lifinity", category: "AMM Proactif", tvl: 62, tvlDisplay: "$62M" },
        { name: "Tulip Protocol", category: "Yield Aggregator", tvl: 290, tvlDisplay: "$290M" },
        { name: "Saber", category: "Stableswap", tvl: 430, tvlDisplay: "$430M" },
      ],
      correctOrder: [4, 3, 1, 0, 2],
      explanation: "Saber ($430M) > Tulip ($290M) > Hubble ($155M) > Zeta ($88M) > Lifinity ($62M)",
    },
  ];
  return rounds.sort(() => Math.random() - 0.5);
}

function shuffle<T>(arr: T[]): { item: T; origIdx: number }[] {
  return arr.map((item, origIdx) => ({ item, origIdx })).sort(() => Math.random() - 0.5);
}

export default function TvlContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => generateRounds());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [shuffled, setShuffled] = useState(() => shuffle(rounds[0].protocols));
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const moveItem = (from: number, to: number) => {
    if (answered) return;
    setShuffled(prev => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  const handleSubmit = () => {
    if (answered) return;
    setAnswered(true);
    const order = shuffled.map(s => s.origIdx);
    setUserOrder(order);
    // Check if sorted by TVL descending
    const sortedByTvl = [...shuffled].sort((a, b) => b.item.tvl - a.item.tvl);
    const isCorrect = sortedByTvl.every((item, i) => item.origIdx === order[i]);
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else {
        setRound(r => r + 1);
        setAnswered(false);
        setShuffled(shuffle(rounds[round + 1].protocols));
        setUserOrder([]);
      }
    }, 2000);
  };

  const retry = () => {
    setRound(0); setScore(0); setAnswered(false); setGameOver(false);
    setShuffled(shuffle(rounds[0].protocols));
    setUserOrder([]);
    startedRef.current = false; timer.reset();
  };

  const sortedByTvl = [...shuffled].sort((a, b) => b.item.tvl - a.item.tvl);

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">TVL Ranking</h2>
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
            <p className="text-xs text-slate-400 mb-3">Ordonne ces protocoles du plus grand au plus petit TVL :</p>
            <div className="space-y-2 mb-4">
              {shuffled.map((s, idx) => {
                let cls = "border-slate-600 bg-slate-800/50";
                if (answered) {
                  const correctPos = sortedByTvl.findIndex(x => x.origIdx === s.origIdx);
                  cls = correctPos === idx ? "border-green-500 bg-green-900/20" : "border-red-500/50 bg-red-900/10";
                }
                return (
                  <div key={s.origIdx} className={`border rounded-xl p-3 transition-all ${cls}`}>
                    <div className="flex items-center gap-3">
                      {!answered && (
                        <div className="flex flex-col gap-0.5">
                          <button onClick={() => idx > 0 && moveItem(idx, idx - 1)} disabled={idx === 0}
                            className="text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer text-xs">▲</button>
                          <button onClick={() => idx < shuffled.length - 1 && moveItem(idx, idx + 1)} disabled={idx === shuffled.length - 1}
                            className="text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer text-xs">▼</button>
                        </div>
                      )}
                      <span className="text-xs font-mono w-5 h-5 flex items-center justify-center rounded-full font-bold shrink-0 bg-purple-500/20 text-purple-400">
                        {idx + 1}
                      </span>
                      <div className="flex-1">
                        <p className="text-sm font-bold text-white">{s.item.name}</p>
                        <p className="text-xs text-slate-400">{s.item.category}</p>
                      </div>
                      {answered && (
                        <span className="text-xs font-mono font-bold text-[var(--sol-green)]">{s.item.tvlDisplay}</span>
                      )}
                      {answered && (() => {
                        const correctPos = sortedByTvl.findIndex(x => x.origIdx === s.origIdx);
                        return correctPos === idx
                          ? <Check size={12} className="text-green-400 shrink-0" />
                          : <X size={12} className="text-red-400 shrink-0" />;
                      })()}
                    </div>
                  </div>
                );
              })}
            </div>
            {!answered && (
              <button onClick={handleSubmit}
                className="w-full py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">
                Valider le classement
              </button>
            )}
            {answered && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs p-3 rounded-lg border border-amber-500/30 bg-amber-900/20 text-amber-300">
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
          {passed ? <p className="text-slate-300 mb-4">Mesureur de TVL certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="tvl" icon={<Lock size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Lock className="w-8 h-8 text-slate-900" />} xp={130} badge={t.badges.tvl}
      content={t.tvl} nextModuleLink="/finance/soltoken" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
