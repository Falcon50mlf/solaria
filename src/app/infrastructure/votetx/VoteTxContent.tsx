"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Vote, Check, X, ThumbsUp, ThumbsDown } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface VoteBlock { slot: number; hash: string; validVotes: number; totalValidators: number; shouldConfirm: boolean; reason: string }

function generateVoteBlocks(): VoteBlock[] {
  return Array.from({ length: 8 }, (_, i) => {
    const totalValidators = 1900;
    const validVotes = Math.floor(Math.random() * 1400) + 500;
    const quorum = Math.floor(totalValidators * 2 / 3);
    const shouldConfirm = validVotes >= quorum;
    return {
      slot: 200000 + i * 4 + Math.floor(Math.random() * 3),
      hash: Array.from({ length: 8 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(""),
      validVotes,
      totalValidators,
      shouldConfirm,
      reason: shouldConfirm ? `${validVotes}/${totalValidators} ≥ 2/3 quorum` : `${validVotes}/${totalValidators} < 2/3 quorum`,
    };
  });
}

export default function VoteTxContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [blocks] = useState(() => generateVoteBlocks());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = blocks.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);

  const handleVote = (confirm: boolean) => {
    if (answered) return;
    setAnswered(true);
    const correct = confirm === blocks[round].shouldConfirm;
    setLastCorrect(correct);
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setLastCorrect(null); }
    }, 1000);
  };

  const retry = () => { setRound(0); setScore(0); setAnswered(false); setLastCorrect(null); setGameOver(false); startedRef.current = false; timer.reset(); };

  const b = blocks[round];
  const quorum = Math.floor(b.totalValidators * 2 / 3);

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Confirme ou Rejette</h2>
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
              <div className="flex justify-between text-sm mb-2">
                <span className="text-slate-400">Slot #{b.slot}</span>
                <span className="font-mono text-xs text-blue-400">0x{b.hash}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400 text-sm">Votes reçus :</span>
                <span className={`font-bold ${b.validVotes >= quorum ? "text-green-400" : "text-amber-400"}`}>{b.validVotes} / {b.totalValidators}</span>
              </div>
              <div className="h-2 rounded-full bg-slate-700 mt-2 overflow-hidden">
                <div className={`h-full rounded-full ${b.validVotes >= quorum ? "bg-green-500" : "bg-amber-500"}`} style={{ width: `${(b.validVotes / b.totalValidators) * 100}%` }} />
              </div>
              <p className="text-xs text-slate-500 mt-1">Quorum 2/3 = {quorum} votes</p>
            </div>
            <p className="text-sm text-slate-400 mb-3">Ce bloc a-t-il assez de votes pour être confirmé ?</p>
            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`mb-4 p-3 rounded-lg text-center ${lastCorrect ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {lastCorrect ? <Check className="inline w-4 h-4 mr-1" /> : <X className="inline w-4 h-4 mr-1" />}
                {b.reason}
              </motion.div>
            )}
            {!answered && (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleVote(true)} className="bg-green-900/30 border border-green-500/50 hover:border-green-400 rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition-all">
                  <ThumbsUp className="w-8 h-8 mx-auto mb-2 text-green-400" /><span className="text-green-400 font-bold">Confirmer</span>
                </button>
                <button onClick={() => handleVote(false)} className="bg-red-900/30 border border-red-500/50 hover:border-red-400 rounded-xl p-4 text-center cursor-pointer hover:scale-105 transition-all">
                  <ThumbsDown className="w-8 h-8 mx-auto mb-2 text-red-400" /><span className="text-red-400 font-bold">Rejeter</span>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Vote transactions maîtrisées !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="votetx" icon={<Vote size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Vote className="w-8 h-8 text-slate-900" />} xp={160} badge={t.badges.votetx}
      content={t.votetx} nextModuleLink="/infrastructure/restart" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
