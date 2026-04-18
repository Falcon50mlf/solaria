"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Hourglass, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface TimelineEvent { label: string; correctCategory: "slot" | "epoch" | "neither" }

function generateEvents(): TimelineEvent[] {
  const pool: TimelineEvent[] = [
    { label: "Un bloc est produit (400ms)", correctCategory: "slot" },
    { label: "Le leader change", correctCategory: "slot" },
    { label: "Un slot est skipped (leader offline)", correctCategory: "slot" },
    { label: "Les rewards de staking sont distribués", correctCategory: "epoch" },
    { label: "Le leader schedule est recalculé", correctCategory: "epoch" },
    { label: "Les changements de stake prennent effet", correctCategory: "epoch" },
    { label: "Un validateur vote pour un bloc", correctCategory: "slot" },
    { label: "Le taux d'inflation est ajusté", correctCategory: "epoch" },
    { label: "432 000 slots se sont écoulés", correctCategory: "epoch" },
    { label: "Une transaction est confirmée", correctCategory: "slot" },
    { label: "Un NFT est minté", correctCategory: "neither" },
    { label: "Le prix du SOL augmente", correctCategory: "neither" },
  ];
  return pool.sort(() => Math.random() - 0.5).slice(0, 8);
}

const CATEGORIES = [
  { id: "slot" as const, label: "Slot (400ms)", color: "text-blue-400", border: "border-blue-500/50", bg: "bg-blue-900/30" },
  { id: "epoch" as const, label: "Epoch (~2j)", color: "text-green-400", border: "border-green-500/50", bg: "bg-green-900/30" },
  { id: "neither" as const, label: "Ni l'un ni l'autre", color: "text-slate-400", border: "border-slate-500/50", bg: "bg-slate-800/50" },
];

export default function SlotContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [events] = useState(() => generateEvents());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = events.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);

  const handleAnswer = (cat: "slot" | "epoch" | "neither") => {
    if (answered) return;
    setAnswered(true); setSelected(cat);
    if (cat === events[round].correctCategory) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 900);
  };

  const retry = () => { setRound(0); setScore(0); setAnswered(false); setSelected(null); setGameOver(false); startedRef.current = false; timer.reset(); };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Slot ou Epoch ?</h2>
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
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-5 mb-4 text-center">
              <p className="text-white font-medium text-lg">{events[round].label}</p>
            </div>
            <p className="text-sm text-slate-400 mb-3">Cet événement se produit à l&apos;échelle de...</p>

            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`mb-3 p-2 rounded-lg text-center text-sm ${selected === events[round].correctCategory ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {selected === events[round].correctCategory ? <Check className="inline w-4 h-4 mr-1" /> : <X className="inline w-4 h-4 mr-1" />}
                {CATEGORIES.find(c => c.id === events[round].correctCategory)?.label}
              </motion.div>
            )}

            <div className="grid grid-cols-3 gap-3">
              {CATEGORIES.map(cat => {
                let cls = `${cat.bg} ${cat.border} hover:scale-105`;
                if (answered && cat.id === events[round].correctCategory) cls = "bg-green-900/30 border-green-500";
                else if (answered && cat.id === selected) cls = "bg-red-900/30 border-red-500";
                else if (answered) cls = "bg-slate-800/30 border-slate-700 opacity-50";
                return (
                  <button key={cat.id} onClick={() => handleAnswer(cat.id)} disabled={answered}
                    className={`border rounded-xl p-3 text-center cursor-pointer transition-all ${cls}`}>
                    <span className={`font-bold text-sm ${cat.color}`}>{cat.label}</span>
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
          {passed ? <p className="text-slate-300 mb-4">Maître du temps Solana !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="slot" icon={<Hourglass size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Hourglass className="w-8 h-8 text-slate-900" />} xp={150} badge={t.badges.slot}
      content={t.slot} nextModuleLink="/infrastructure/economics" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
