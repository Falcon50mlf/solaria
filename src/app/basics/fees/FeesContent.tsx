"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Fuel, Check, X, Gauge } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

function randomCongestion() {
  return Math.floor(Math.random() * 100); // 0-99%
}

function feeNeeded(congestion: number): number {
  if (congestion < 20) return 0;
  if (congestion < 40) return 1000;
  if (congestion < 60) return 10000;
  if (congestion < 80) return 50000;
  return 200000;
}

const FEE_OPTIONS = [
  { label: "0 lamports", value: 0, desc: "Aucune priorité" },
  { label: "1 000 lamports", value: 1000, desc: "Priorité basse" },
  { label: "10 000 lamports", value: 10000, desc: "Priorité moyenne" },
  { label: "50 000 lamports", value: 50000, desc: "Priorité haute" },
  { label: "200 000 lamports", value: 200000, desc: "Priorité urgente" },
];

const TOTAL_ROUNDS = 6;

export default function FeesContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [round, setRound] = useState(0);
  const [congestion, setCongestion] = useState(() => randomCongestion());
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [feedbackOk, setFeedbackOk] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const passed = gameOver && score >= Math.ceil(TOTAL_ROUNDS * 0.7);

  const handleFee = (feeValue: number) => {
    if (answered) return;
    setAnswered(true);
    const needed = feeNeeded(congestion);
    const isOptimal = feeValue === needed;
    const isEnough = feeValue >= needed;
    const isWaste = feeValue > needed && feeValue - needed >= 50000;

    if (isOptimal) {
      setScore((s) => s + 1); setFeedback("Parfait ! Fee optimale."); setFeedbackOk(true);
    } else if (isEnough && !isWaste) {
      setScore((s) => s + 1); setFeedback("Passé ! Un peu cher mais ça marche."); setFeedbackOk(true);
    } else if (isWaste) {
      setFeedback("Gaspillage ! Trop de priority fees."); setFeedbackOk(false);
    } else {
      setFeedback("Timeout ! Fee insuffisante, transaction rejetée."); setFeedbackOk(false);
    }

    setTimeout(() => {
      if (round + 1 >= TOTAL_ROUNDS) { setGameOver(true); timer.stop(); }
      else { setRound((r) => r + 1); setCongestion(randomCongestion()); setAnswered(false); setFeedback(null); }
    }, 1200);
  };

  const retry = () => {
    setRound(0); setScore(0); setAnswered(false); setFeedback(null);
    setGameOver(false); setCongestion(randomCongestion()); startedRef.current = false; timer.reset();
  };

  const congestionColor = congestion < 20 ? "text-green-400" : congestion < 50 ? "text-amber-400" : congestion < 80 ? "text-orange-400" : "text-red-400";
  const congestionLabel = congestion < 20 ? "Calme" : congestion < 50 ? "Modéré" : congestion < 80 ? "Chargé" : "Saturé";

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Ajuste les Fees</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>

      <div className="flex gap-1 mb-6">
        {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${
            i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"
          }`} />
        ))}
      </div>

      {!gameOver ? (
        <div>
          {/* Congestion gauge */}
          <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-5 mb-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Gauge size={18} className={congestionColor} />
                <span className="text-sm text-slate-400">Congestion réseau</span>
              </div>
              <span className={`font-bold ${congestionColor}`}>{congestionLabel} ({congestion}%)</span>
            </div>
            <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${congestion}%` }}
                className={`h-full rounded-full ${congestion < 20 ? "bg-green-500" : congestion < 50 ? "bg-amber-500" : congestion < 80 ? "bg-orange-500" : "bg-red-500"}`}
              />
            </div>
          </div>

          {feedback && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`mb-4 p-3 rounded-lg text-center ${feedbackOk ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
              {feedbackOk ? <Check className="inline w-5 h-5 mr-1" /> : <X className="inline w-5 h-5 mr-1" />}
              {feedback}
            </motion.div>
          )}

          {!answered && (
            <div className="grid grid-cols-1 gap-2">
              {FEE_OPTIONS.map((opt) => (
                <button key={opt.value} onClick={() => handleFee(opt.value)}
                  className="bg-slate-800/50 border border-slate-600 hover:border-purple-500/50 rounded-lg p-3 text-left cursor-pointer transition-all flex justify-between items-center">
                  <span className="text-white font-medium">{opt.label}</span>
                  <span className="text-xs text-slate-400">{opt.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>
            {score}/{TOTAL_ROUNDS}
          </motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Vous maîtrisez l'économie des fees !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button>
            </div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule
      moduleId="fees"
      icon={<Fuel size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Fuel className="w-8 h-8 text-slate-900" />}
      xp={130}
      badge={t.badges.fees}
      content={t.fees}
      nextModuleLink="/basics/solscan"
      gameSlide={gameSlide}
      gameCompleted={passed}
    />
  );
}
