"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RotateCw, Check, X, Server } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface RestartStep { label: string; order: number }

function generateRestartProcedures() {
  const procedures = [
    [
      { label: "Identifier le dernier bloc valide", order: 0 },
      { label: "Arrêter les validateurs du cluster", order: 1 },
      { label: "Créer un snapshot à ce bloc", order: 2 },
      { label: "Distribuer le snapshot aux validateurs", order: 3 },
      { label: "Relancer avec le flag --wait-for-supermajority", order: 4 },
    ],
    [
      { label: "Détecter l'anomalie réseau", order: 0 },
      { label: "Coordonner les validateurs sur Discord", order: 1 },
      { label: "Voter pour le halt slot", order: 2 },
      { label: "Générer le nouveau genesis snapshot", order: 3 },
      { label: "Reprendre la production de blocs", order: 4 },
    ],
    [
      { label: "Publier la nouvelle version v2.1", order: 0 },
      { label: "Les validateurs mettent à jour un par un", order: 1 },
      { label: "Atteindre le quorum 2/3 sur la nouvelle version", order: 2 },
      { label: "Activer les nouvelles features", order: 3 },
      { label: "Vérifier la stabilité du cluster", order: 4 },
    ],
    [
      { label: "Recevoir l'alerte de congestion critique", order: 0 },
      { label: "Analyser les transactions spammées", order: 1 },
      { label: "Activer le rate limiting d'urgence", order: 2 },
      { label: "Vider la queue de tx backlog", order: 3 },
      { label: "Rétablir le débit normal", order: 4 },
    ],
  ];
  return procedures.map(steps => ({
    correctOrder: [...steps],
    shuffled: [...steps].sort(() => Math.random() - 0.5),
  }));
}

export default function RestartContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [procedures] = useState(() => generateRestartProcedures());
  const [round, setRound] = useState(0);
  const [placed, setPlaced] = useState<RestartStep[]>([]);
  const [remaining, setRemaining] = useState<RestartStep[]>(() => procedures[0].shuffled);
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = procedures.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);

  const handlePick = (step: RestartStep) => {
    if (checked) return;
    setPlaced([...placed, step]);
    setRemaining(remaining.filter(s => s.label !== step.label));
  };

  const handleUndo = () => {
    if (checked || placed.length === 0) return;
    const last = placed[placed.length - 1];
    setPlaced(placed.slice(0, -1));
    setRemaining([...remaining, last]);
  };

  const handleCheck = () => {
    if (placed.length !== 5) return;
    setChecked(true);
    const correct = placed.every((s, i) => s.order === i);
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else {
        setRound(r => r + 1); setPlaced([]); setRemaining([...procedures[round + 1].shuffled]); setChecked(false);
      }
    }, 1200);
  };

  const retry = () => { setRound(0); setScore(0); setPlaced([]); setRemaining([...procedures[0].shuffled]); setChecked(false); setGameOver(false); startedRef.current = false; timer.reset(); };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Restart Procedure</h2>
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
            <p className="text-sm text-slate-400 mb-3">Remets les étapes dans le bon ordre.</p>
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-3 mb-3 min-h-[60px]">
              {placed.map((step, i) => {
                const correctPos = checked && step.order === i;
                const wrongPos = checked && step.order !== i;
                return (
                  <div key={i} className={`text-sm p-2 rounded mb-1 flex items-center gap-2 ${correctPos ? "bg-green-900/30 text-green-400" : wrongPos ? "bg-red-900/30 text-red-400" : "bg-purple-900/20 text-purple-300"}`}>
                    <span className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-xs font-bold">{i + 1}</span>
                    {step.label}
                  </div>
                );
              })}
            </div>
            {!checked && remaining.length > 0 && (
              <div className="space-y-1 mb-3">
                {remaining.map(step => (
                  <button key={step.label} onClick={() => handlePick(step)}
                    className="w-full bg-slate-800/50 border border-slate-600 hover:border-purple-500/50 rounded-lg p-2.5 text-left text-sm text-white cursor-pointer transition-all">
                    <Server size={12} className="inline mr-2 text-slate-400" />{step.label}
                  </button>
                ))}
              </div>
            )}
            <div className="flex gap-2">
              {!checked && placed.length > 0 && <button onClick={handleUndo} className="px-4 py-2 border border-slate-600 rounded-lg text-sm text-slate-300 cursor-pointer">Annuler</button>}
              {!checked && placed.length === 5 && <button onClick={handleCheck} className="px-6 py-2 bg-[var(--sol-purple)] rounded-lg text-sm font-medium cursor-pointer">Valider</button>}
            </div>
            {checked && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`mt-3 p-3 rounded-lg text-center ${placed.every((s, i) => s.order === i) ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {placed.every((s, i) => s.order === i) ? <><Check className="inline w-4 h-4 mr-1" /> Procédure correcte !</> : <><X className="inline w-4 h-4 mr-1" /> Mauvais ordre !</>}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Mécanicien du cluster certifié !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="restart" icon={<RotateCw size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<RotateCw className="w-8 h-8 text-slate-900" />} xp={170} badge={t.badges.restart}
      content={t.restart} nextModuleLink="/infrastructure/congestion" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
