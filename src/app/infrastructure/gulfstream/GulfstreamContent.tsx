"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Waves, Check, X, Send } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface TxToRoute {
  id: number;
  type: string;
  targetSlot: number;
  leaders: { slot: number; name: string; isCorrect: boolean }[];
}

function generateRounds(): TxToRoute[] {
  const txTypes = ["SOL Transfer", "NFT Mint", "DeFi Swap", "Stake Deposit", "Program Deploy", "Token Burn", "LP Deposit", "Governance Vote"];
  const validatorNames = ["SolFlare", "Everstake", "Figment", "Chorus", "Helius", "Triton", "Jito", "P2P"];
  const rounds: TxToRoute[] = [];
  for (let i = 0; i < 8; i++) {
    const baseSlot = 200000 + Math.floor(Math.random() * 50000);
    const correctSlot = baseSlot + Math.floor(Math.random() * 4);
    const shuffledNames = validatorNames.sort(() => Math.random() - 0.5);
    rounds.push({
      id: i,
      type: txTypes[i % txTypes.length],
      targetSlot: correctSlot,
      leaders: [
        { slot: correctSlot, name: shuffledNames[0], isCorrect: true },
        { slot: correctSlot + 4, name: shuffledNames[1], isCorrect: false },
        { slot: correctSlot - 8, name: shuffledNames[2], isCorrect: false },
      ].sort(() => Math.random() - 0.5),
    });
  }
  return rounds;
}

export default function GulfstreamContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => generateRounds());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);

  const handleRoute = useCallback((leaderIdx: number) => {
    if (answered) return;
    setAnswered(true); setSelected(leaderIdx);
    if (rounds[round].leaders[leaderIdx].isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 1000);
  }, [answered, round, rounds, TOTAL, timer]);

  const retry = () => {
    setRound(0); setScore(0); setAnswered(false); setSelected(null);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const r = rounds[round];

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Route la Transaction</h2>
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
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Send size={14} className="text-[var(--sol-purple)]" />
                <span className="text-white font-medium">{r.type}</span>
              </div>
              <p className="text-xs text-slate-400">Slot cible : <span className="text-white font-mono">#{r.targetSlot}</span></p>
              <p className="text-xs text-slate-400 mt-1">Envoie au leader le plus proche du slot cible.</p>
            </div>

            <div className="space-y-2">
              {r.leaders.map((leader, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && leader.isCorrect) cls = "border-green-500 bg-green-900/30";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/30";
                else if (answered) cls = "border-slate-700 opacity-50";
                return (
                  <button key={idx} onClick={() => handleRoute(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-4 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-white font-medium">{leader.name}</span>
                      <span className="font-mono text-sm text-slate-300">Slot #{leader.slot}</span>
                    </div>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Gulf Stream maîtrisé !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="gulfstream" icon={<Waves size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Waves className="w-8 h-8 text-slate-900" />} xp={170} badge={t.badges.gulfstream}
      content={t.gulfstream} nextModuleLink="/infrastructure/sealevel" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
