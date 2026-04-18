"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Coins, Check, X, TrendingUp, Server } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

function randomConfig() {
  const commission = [0, 5, 7, 8, 10, 15, 20][Math.floor(Math.random() * 7)];
  const stakeK = 100 + Math.floor(Math.random() * 900);
  const serverCost = 500 + Math.floor(Math.random() * 500);
  const inflationRate = 5 + Math.random() * 2;
  const jitoTips = Math.floor(Math.random() * 50);
  const annualReward = (stakeK * 1000 * inflationRate / 100) * (commission / 100) + jitoTips * 12;
  const annualCost = serverCost * 12;
  const profit = annualReward - annualCost;
  return { commission, stakeK, serverCost, inflationRate: Math.round(inflationRate * 10) / 10, jitoTips, annualReward: Math.round(annualReward), annualCost, profit: Math.round(profit) };
}

export default function EconomicsContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [configs] = useState(() => Array.from({ length: 5 }, () => {
    const options = [randomConfig(), randomConfig(), randomConfig()];
    return options;
  }));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = configs.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const options = configs[round];
  const bestIdx = options.reduce((best, c, i, arr) => c.profit > arr[best].profit ? i : best, 0);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setAnswered(true); setSelected(idx);
    if (idx === bestIdx) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 1200);
  };

  const retry = () => { setRound(0); setScore(0); setAnswered(false); setSelected(null); setGameOver(false); startedRef.current = false; timer.reset(); };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Optimise le P&L</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"}`} />
        ))}
      </div>

      {!gameOver ? (
        <div>
          <p className="text-sm text-slate-400 mb-3">Quel validateur a le meilleur profit annuel ?</p>
          <div className="space-y-3">
            {options.map((c, idx) => {
              let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
              if (answered && idx === bestIdx) cls = "border-green-500 bg-green-900/30";
              else if (answered && idx === selected) cls = "border-red-500 bg-red-900/30";
              else if (answered) cls = "border-slate-700 opacity-50";
              return (
                <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                  className={`w-full border rounded-xl p-4 text-left transition-all ${cls}`}>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium flex items-center gap-2"><Server size={14} /> Validateur {idx + 1}</span>
                    {answered && <span className={`text-sm font-bold ${c.profit > 0 ? "text-green-400" : "text-red-400"}`}>{c.profit > 0 ? "+" : ""}{c.profit}$/an</span>}
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <div><span className="text-slate-400">Commission: </span><span className="text-white">{c.commission}%</span></div>
                    <div><span className="text-slate-400">Stake: </span><span className="text-white">{c.stakeK}K SOL</span></div>
                    <div><span className="text-slate-400">Serveur: </span><span className="text-white">${c.serverCost}/mois</span></div>
                    <div><span className="text-slate-400">Jito tips: </span><span className="text-white">${c.jitoTips}/mois</span></div>
                    <div><span className="text-slate-400">Inflation: </span><span className="text-white">{c.inflationRate}%</span></div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Économiste Solana certifié !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="economics" icon={<Coins size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Coins className="w-8 h-8 text-slate-900" />} xp={190} badge={t.badges.economics}
      content={t.economics} nextModuleLink="/infrastructure/cluster" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
