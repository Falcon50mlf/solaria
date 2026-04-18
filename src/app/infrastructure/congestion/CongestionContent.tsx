"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Activity, Check, X, Gauge } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

type Action = "priority_fee" | "quic" | "stake_qos" | "wait";
interface CongestionWave { load: number; bestAction: Action; explanation: string }

function generateWaves(): CongestionWave[] {
  const pool: CongestionWave[] = [
    { load: 30, bestAction: "wait", explanation: "Charge faible — pas besoin d'action, les tx passent normalement." },
    { load: 65, bestAction: "priority_fee", explanation: "Charge modérée — un priority fee aide à passer plus vite." },
    { load: 90, bestAction: "quic", explanation: "Charge élevée — QUIC backpressure régule le flux sans surcharger." },
    { load: 95, bestAction: "stake_qos", explanation: "Saturation — Stake-weighted QoS priorise les validateurs stakés." },
    { load: 20, bestAction: "wait", explanation: "Réseau calme — aucune mesure nécessaire." },
    { load: 75, bestAction: "priority_fee", explanation: "Congestion moyenne — priority fee recommandé." },
    { load: 88, bestAction: "quic", explanation: "Forte congestion — le backpressure QUIC est le plus efficace." },
    { load: 98, bestAction: "stake_qos", explanation: "Congestion critique — seul stake-weighted QoS peut aider." },
  ];
  return pool.sort(() => Math.random() - 0.5).slice(0, 6);
}

const ACTIONS: { id: Action; label: string; desc: string; color: string }[] = [
  { id: "wait", label: "Attendre", desc: "Pas d'action", color: "text-slate-400" },
  { id: "priority_fee", label: "Priority Fee", desc: "Payer pour prioriser", color: "text-blue-400" },
  { id: "quic", label: "QUIC", desc: "Backpressure réseau", color: "text-amber-400" },
  { id: "stake_qos", label: "Stake QoS", desc: "Prioriser par stake", color: "text-red-400" },
];

export default function CongestionContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [waves] = useState(() => generateWaves());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAction, setSelectedAction] = useState<Action | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = waves.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);

  const handleAction = useCallback((action: Action) => {
    if (answered) return;
    setAnswered(true); setSelectedAction(action);
    if (action === waves[round].bestAction) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelectedAction(null); }
    }, 1200);
  }, [answered, round, waves, TOTAL, timer]);

  const retry = () => { setRound(0); setScore(0); setAnswered(false); setSelectedAction(null); setGameOver(false); startedRef.current = false; timer.reset(); };

  const w = waves[round];
  const loadColor = w.load < 40 ? "bg-green-500" : w.load < 70 ? "bg-amber-500" : w.load < 90 ? "bg-orange-500" : "bg-red-500";
  const loadText = w.load < 40 ? "text-green-400" : w.load < 70 ? "text-amber-400" : w.load < 90 ? "text-orange-400" : "text-red-400";

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Gère la Congestion</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"}`} />
        ))}
      </div>

      {!gameOver ? (
        <div>
          <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2"><Gauge size={16} className={loadText} /><span className="text-sm text-slate-400">Charge réseau</span></div>
              <span className={`font-bold ${loadText}`}>{w.load}%</span>
            </div>
            <div className="h-3 rounded-full bg-slate-700 overflow-hidden">
              <motion.div initial={{ width: 0 }} animate={{ width: `${w.load}%` }} className={`h-full rounded-full ${loadColor}`} />
            </div>
          </div>

          {answered && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`mb-4 p-3 rounded-lg text-center text-sm ${selectedAction === w.bestAction ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
              {selectedAction === w.bestAction ? <Check className="inline w-4 h-4 mr-1" /> : <X className="inline w-4 h-4 mr-1" />}
              {w.explanation}
            </motion.div>
          )}

          {!answered && (
            <div className="grid grid-cols-2 gap-3">
              {ACTIONS.map(a => (
                <button key={a.id} onClick={() => handleAction(a.id)}
                  className="bg-slate-800/50 border border-slate-600 hover:border-purple-500/50 rounded-xl p-3 text-center cursor-pointer transition-all hover:scale-105">
                  <span className={`font-bold text-sm block ${a.color}`}>{a.label}</span>
                  <span className="text-xs text-slate-400">{a.desc}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Régulateur de trafic certifié !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="congestion" icon={<Activity size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Activity className="w-8 h-8 text-slate-900" />} xp={160} badge={t.badges.congestion}
      content={t.congestion} nextModuleLink="/infrastructure/tower" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
