"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building2, Check, X, Layers } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface TowerRound {
  mainForkHash: string;
  altForkHash: string;
  mainVotes: number;
  altVotes: number;
  correctChoice: "main" | "alt";
  lockCost: number;
}

function generateTowerRounds(): TowerRound[] {
  return Array.from({ length: 8 }, () => {
    const mainVotes = 800 + Math.floor(Math.random() * 600);
    const altVotes = 400 + Math.floor(Math.random() * 800);
    const correctChoice = mainVotes >= altVotes ? "main" as const : "alt" as const;
    const lockCost = Math.pow(2, Math.floor(Math.random() * 5));
    return {
      mainForkHash: Array.from({ length: 8 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(""),
      altForkHash: Array.from({ length: 8 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(""),
      mainVotes, altVotes, correctChoice, lockCost,
    };
  });
}

export default function TowerContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => generateTowerRounds());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [towerHeight, setTowerHeight] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const r = rounds[round];

  const handleVote = (choice: "main" | "alt") => {
    if (answered) return;
    setAnswered(true);
    const correct = choice === r.correctChoice;
    setLastCorrect(correct);
    if (correct) { setScore(s => s + 1); setTowerHeight(h => h + 1); }
    else { setTowerHeight(h => Math.max(0, h - 2)); }
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(rr => rr + 1); setAnswered(false); setLastCorrect(null); }
    }, 1000);
  };

  const retry = () => { setRound(0); setScore(0); setTowerHeight(0); setAnswered(false); setLastCorrect(null); setGameOver(false); startedRef.current = false; timer.reset(); };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Construis la Tour</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>

      {/* Tower visualization */}
      <div className="flex items-end justify-center gap-1 mb-4 h-16">
        {Array.from({ length: Math.max(towerHeight, 1) }).map((_, i) => (
          <motion.div key={i} initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
            className="w-6 bg-gradient-to-t from-purple-600 to-purple-400 rounded-t" style={{ height: `${Math.min(100, (i + 1) * 12)}%` }} />
        ))}
        <span className="text-xs text-slate-400 ml-2">{towerHeight} étages</span>
      </div>

      <div className="flex gap-1 mb-4">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"}`} />
        ))}
      </div>

      {!gameOver ? (
        <AnimatePresence mode="wait">
          <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <p className="text-sm text-slate-400 mb-3">Deux forks en compétition — votez pour celui avec le plus de support. Mauvais choix = perte d&apos;étages (slashing).</p>

            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`mb-3 p-3 rounded-lg text-center ${lastCorrect ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {lastCorrect ? <><Check className="inline w-4 h-4 mr-1" /> Bon fork ! +1 étage</> : <><X className="inline w-4 h-4 mr-1" /> Mauvais fork ! -2 étages (slashing)</>}
              </motion.div>
            )}

            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => handleVote("main")} disabled={answered}
                className={`border rounded-xl p-4 text-center cursor-pointer transition-all ${
                  answered && r.correctChoice === "main" ? "border-green-500 bg-green-900/30" :
                  answered ? "border-red-500 bg-red-900/30 opacity-60" :
                  "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 hover:scale-105"}`}>
                <div className="font-mono text-xs text-blue-400 mb-2">Fork A: 0x{r.mainForkHash}</div>
                <div className="text-2xl font-bold text-white mb-1">{r.mainVotes}</div>
                <div className="text-xs text-slate-400">votes</div>
              </button>
              <button onClick={() => handleVote("alt")} disabled={answered}
                className={`border rounded-xl p-4 text-center cursor-pointer transition-all ${
                  answered && r.correctChoice === "alt" ? "border-green-500 bg-green-900/30" :
                  answered ? "border-red-500 bg-red-900/30 opacity-60" :
                  "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 hover:scale-105"}`}>
                <div className="font-mono text-xs text-amber-400 mb-2">Fork B: 0x{r.altForkHash}</div>
                <div className="text-2xl font-bold text-white mb-1">{r.altVotes}</div>
                <div className="text-xs text-slate-400">votes</div>
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          <p className="text-sm text-slate-400 mb-4">Tour finale : {towerHeight} étages</p>
          {passed ? <p className="text-slate-300 mb-4">Architecte de la Tour certifié !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="tower" icon={<Building2 size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Building2 className="w-8 h-8 text-slate-900" />} xp={180} badge={t.badges.tower}
      content={t.tower} nextModuleLink="/infrastructure/turbine" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
