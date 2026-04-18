"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock, Check, X, ArrowDown } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface TimeEvent {
  id: number;
  label: string;
  timestamp: number;
}

function generateEvents(): TimeEvent[][] {
  const eventSets = [
    ["Alice envoie 5 SOL", "Bob reçoit 5 SOL", "Charlie stake 10 SOL", "Bloc #4521 produit", "Reward distribué"],
    ["Mint NFT #0012", "Transfer NFT → Dave", "Listing sur marketplace", "Vente à 2 SOL", "Royalties payés"],
    ["Swap 100 USDC → SOL", "LP deposit Raydium", "Farm rewards claim", "Unstake mSOL", "Transfer vers CEX"],
    ["Programme deploy", "First invoke", "Error log", "Upgrade authority", "Close program"],
    ["Vote slot #8001", "Vote slot #8002", "Skip slot #8003", "Vote slot #8004", "Epoch change"],
  ];
  return eventSets.map(labels => {
    const events = labels.map((label, i) => ({
      id: i,
      label,
      timestamp: 1000 + i * (400 + Math.floor(Math.random() * 200)),
    }));
    return events;
  });
}

const TOTAL = 5;

export default function PohContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => generateEvents());
  const [round, setRound] = useState(0);
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [remaining, setRemaining] = useState<number[]>(() => [0, 1, 2, 3, 4].sort(() => Math.random() - 0.5));
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const events = rounds[round];

  const handlePick = (eventId: number) => {
    if (checked) return;
    setUserOrder([...userOrder, eventId]);
    setRemaining(remaining.filter(id => id !== eventId));
  };

  const handleUndo = () => {
    if (checked || userOrder.length === 0) return;
    const last = userOrder[userOrder.length - 1];
    setUserOrder(userOrder.slice(0, -1));
    setRemaining([...remaining, last]);
  };

  const handleCheck = () => {
    if (userOrder.length !== 5) return;
    setChecked(true);
    const correctOrder = [...events].sort((a, b) => a.timestamp - b.timestamp).map(e => e.id);
    const isCorrect = userOrder.every((id, i) => id === correctOrder[i]);
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else {
        setRound(r => r + 1);
        setUserOrder([]);
        setRemaining([0, 1, 2, 3, 4].sort(() => Math.random() - 0.5));
        setChecked(false);
      }
    }, 1500);
  };

  const retry = () => {
    setRound(0); setScore(0); setUserOrder([]); setRemaining([0, 1, 2, 3, 4].sort(() => Math.random() - 0.5));
    setChecked(false); setGameOver(false); startedRef.current = false; timer.reset();
  };

  const correctOrder = [...events].sort((a, b) => a.timestamp - b.timestamp).map(e => e.id);

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Ordonne la Timeline</h2>
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
            <p className="text-sm text-slate-400 mb-3">Place les événements dans l&apos;ordre chronologique du PoH.</p>

            {/* User's ordered list */}
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-3 mb-3 min-h-[60px]">
              <p className="text-xs text-slate-500 mb-2">Votre ordre :</p>
              <div className="flex flex-wrap gap-2">
                {userOrder.map((id, i) => {
                  const ev = events[id];
                  const isCorrectPos = checked && id === correctOrder[i];
                  return (
                    <span key={i} className={`text-xs px-3 py-1.5 rounded-full border ${checked ? (isCorrectPos ? "border-green-500 bg-green-900/30 text-green-400" : "border-red-500 bg-red-900/30 text-red-400") : "border-purple-500/50 bg-purple-900/30 text-purple-300"}`}>
                      {i + 1}. {ev.label}
                    </span>
                  );
                })}
              </div>
            </div>

            {/* Remaining to pick */}
            {!checked && remaining.length > 0 && (
              <div className="space-y-2 mb-3">
                {remaining.map(id => {
                  const ev = events[id];
                  return (
                    <button key={id} onClick={() => handlePick(id)}
                      className="w-full bg-slate-800/50 border border-slate-600 hover:border-purple-500/50 rounded-lg p-3 text-left text-sm text-white cursor-pointer transition-all">
                      {ev.label}
                    </button>
                  );
                })}
              </div>
            )}

            <div className="flex gap-2">
              {!checked && userOrder.length > 0 && (
                <button onClick={handleUndo} className="px-4 py-2 border border-slate-600 rounded-lg text-sm text-slate-300 cursor-pointer hover:border-slate-400">Annuler</button>
              )}
              {!checked && userOrder.length === 5 && (
                <button onClick={handleCheck} className="px-6 py-2 bg-[var(--sol-purple)] rounded-lg text-sm font-medium cursor-pointer">Valider</button>
              )}
            </div>

            {checked && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`mt-3 p-3 rounded-lg text-center ${userOrder.every((id, i) => id === correctOrder[i]) ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {userOrder.every((id, i) => id === correctOrder[i]) ? <><Check className="inline w-5 h-5 mr-1" /> Ordre parfait !</> : <><X className="inline w-5 h-5 mr-1" /> Mauvais ordre !</>}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Vous maîtrisez l&apos;horloge PoH !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="poh" icon={<Clock size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Clock className="w-8 h-8 text-slate-900" />} xp={180} badge={t.badges.poh}
      content={t.poh} nextModuleLink="/infrastructure/gulfstream" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
