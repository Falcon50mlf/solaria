"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Wind, Check, X, Network } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface TreeChoice { fanout: number; layers: number; reachable: number; time: string; isOptimal: boolean }

function generateTreeRounds(): { validators: number; choices: TreeChoice[] }[] {
  return [
    { validators: 200, choices: [
      { fanout: 10, layers: 3, reachable: 200, time: "150ms", isOptimal: false },
      { fanout: 50, layers: 2, reachable: 200, time: "80ms", isOptimal: true },
      { fanout: 5, layers: 4, reachable: 200, time: "320ms", isOptimal: false },
    ]},
    { validators: 1900, choices: [
      { fanout: 200, layers: 2, reachable: 1900, time: "120ms", isOptimal: true },
      { fanout: 50, layers: 3, reachable: 1900, time: "240ms", isOptimal: false },
      { fanout: 10, layers: 4, reachable: 1900, time: "480ms", isOptimal: false },
    ]},
    { validators: 500, choices: [
      { fanout: 25, layers: 3, reachable: 500, time: "180ms", isOptimal: false },
      { fanout: 100, layers: 2, reachable: 500, time: "90ms", isOptimal: true },
      { fanout: 10, layers: 4, reachable: 500, time: "360ms", isOptimal: false },
    ]},
    { validators: 3000, choices: [
      { fanout: 100, layers: 3, reachable: 3000, time: "200ms", isOptimal: false },
      { fanout: 300, layers: 2, reachable: 3000, time: "100ms", isOptimal: true },
      { fanout: 50, layers: 3, reachable: 3000, time: "350ms", isOptimal: false },
    ]},
    { validators: 1000, choices: [
      { fanout: 200, layers: 2, reachable: 1000, time: "85ms", isOptimal: true },
      { fanout: 30, layers: 3, reachable: 1000, time: "260ms", isOptimal: false },
      { fanout: 10, layers: 4, reachable: 1000, time: "500ms", isOptimal: false },
    ]},
  ].sort(() => Math.random() - 0.5);
}

export default function TurbineContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => generateTreeRounds());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const r = rounds[round];

  const handleSelect = useCallback((idx: number) => {
    if (answered) return;
    setAnswered(true); setSelected(idx);
    if (r.choices[idx].isOptimal) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(rr => rr + 1); setAnswered(false); setSelected(null); }
    }, 1000);
  }, [answered, r, round, TOTAL, timer]);

  const retry = () => { setRound(0); setScore(0); setAnswered(false); setSelected(null); setGameOver(false); startedRef.current = false; timer.reset(); };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Optimise l&apos;Arbre</h2>
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
              <div className="flex items-center gap-2 mb-1">
                <Network size={16} className="text-[var(--sol-purple)]" />
                <span className="text-white font-medium">{r.validators} validateurs à atteindre</span>
              </div>
              <p className="text-xs text-slate-400">Choisis la configuration Turbine la plus rapide (&lt;200ms).</p>
            </div>

            <div className="space-y-2">
              {r.choices.map((c, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && c.isOptimal) cls = "border-green-500 bg-green-900/30";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/30";
                else if (answered) cls = "border-slate-700 opacity-50";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-4 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-medium">Fanout {c.fanout} × {c.layers} couches</span>
                      <span className={`font-mono font-bold ${parseInt(c.time) <= 200 ? "text-green-400" : "text-red-400"}`}>{c.time}</span>
                    </div>
                    <p className="text-xs text-slate-400">{c.reachable} validateurs atteints</p>
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
          {passed ? <p className="text-slate-300 mb-4">Ingénieur Turbine certifié !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="turbine" icon={<Wind size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Wind className="w-8 h-8 text-slate-900" />} xp={170} badge={t.badges.turbine}
      content={t.turbine} nextModuleLink="/infrastructure/cloudbreak" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
