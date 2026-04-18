"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Gauge, Check, X, Zap, Vote } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface TxItem { id: number; type: "user" | "vote"; label: string }

function generateStream(): TxItem[] {
  const userLabels = ["SOL Transfer", "NFT Mint", "DeFi Swap", "Stake", "Token Burn", "LP Add", "Program Call", "Close Account"];
  const voteLabels = ["Vote Slot #2001", "Vote Slot #2002", "Vote Slot #2003", "Vote Slot #2004"];
  const items: TxItem[] = [];
  for (let i = 0; i < 20; i++) {
    const isVote = Math.random() < 0.6; // ~60% vote tx
    items.push({
      id: i,
      type: isVote ? "vote" : "user",
      label: isVote ? voteLabels[Math.floor(Math.random() * voteLabels.length)] : userLabels[Math.floor(Math.random() * userLabels.length)],
    });
  }
  return items;
}

export default function TpsContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [stream] = useState(() => generateStream());
  const [classified, setClassified] = useState<Record<number, "user" | "vote">>({});
  const [current, setCurrent] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const totalTx = stream.length;
  const allDone = current >= totalTx;

  const correctCount = Object.entries(classified).filter(([id, type]) => stream[Number(id)].type === type).length;
  const userTxCount = stream.filter(tx => tx.type === "user").length;
  const voteTxCount = stream.filter(tx => tx.type === "vote").length;
  const userClassified = Object.entries(classified).filter(([id, type]) => type === "user" && stream[Number(id)].type === "user").length;
  const accuracy = totalTx > 0 ? correctCount / totalTx : 0;
  const passed = gameOver && accuracy >= 0.7;

  const handleClassify = useCallback((type: "user" | "vote") => {
    if (current >= totalTx || gameOver) return;
    setClassified(prev => ({ ...prev, [current]: type }));
    if (current + 1 >= totalTx) {
      setGameOver(true);
      timer.stop();
    } else {
      setCurrent(c => c + 1);
    }
  }, [current, totalTx, gameOver, timer]);

  const retry = () => {
    setCurrent(0); setClassified({}); setGameOver(false);
    startedRef.current = false; timer.reset();
  };

  const tx = current < totalTx ? stream[current] : null;

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Filtre le TPS</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>

      <div className="flex gap-1 mb-2">
        {stream.map((_, i) => {
          const c = classified[i];
          const correct = c && stream[i].type === c;
          return (
            <div key={i} className={`h-1 flex-1 rounded-full ${
              c ? (correct ? "bg-[var(--sol-green)]" : "bg-[var(--sol-accent)]")
              : i === current ? "bg-[var(--sol-purple)]" : "bg-slate-700"
            }`} />
          );
        })}
      </div>
      <div className="flex justify-between text-xs text-slate-400 mb-4">
        <span>{current}/{totalTx} classées</span>
        <span>Real TPS détecté : {userClassified}</span>
      </div>

      {!gameOver && tx ? (
        <div>
          <motion.div
            key={current}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-800/50 border border-slate-600 rounded-xl p-5 mb-4 text-center"
          >
            <p className="text-xs text-slate-400 mb-2">Transaction #{current + 1}</p>
            <p className="text-white font-medium text-lg">{tx.label}</p>
          </motion.div>

          <div className="grid grid-cols-2 gap-4">
            <button onClick={() => handleClassify("user")}
              className="bg-blue-900/30 border border-blue-500/50 hover:border-blue-400 rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-105">
              <Zap className="w-8 h-8 mx-auto mb-2 text-blue-400" />
              <span className="text-blue-400 font-bold text-sm">User TX</span>
            </button>
            <button onClick={() => handleClassify("vote")}
              className="bg-amber-900/30 border border-amber-500/50 hover:border-amber-400 rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-105">
              <Vote className="w-8 h-8 mx-auto mb-2 text-amber-400" />
              <span className="text-amber-400 font-bold text-sm">Vote TX</span>
            </button>
          </div>
        </div>
      ) : gameOver ? (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>
            {Math.round(accuracy * 100)}%
          </motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          <div className="text-sm text-slate-400 mb-4 space-y-1">
            <p>Total : {totalTx} tx ({voteTxCount} vote + {userTxCount} user)</p>
            <p>Real TPS identifié : {userClassified}/{userTxCount}</p>
          </div>
          {passed ? <p className="text-slate-300 mb-4">Vous savez lire le vrai TPS !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Précision minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      ) : null}
    </div>
  );

  return (
    <GameModule moduleId="tps" icon={<Gauge size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Gauge className="w-8 h-8 text-slate-900" />} xp={140} badge={t.badges.tps}
      content={t.tps} nextModuleLink="/infrastructure/votetx" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
