"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Landmark, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface DefiRound {
  action: string;
  protocols: { name: string; description: string; correct: boolean }[];
  explanation: string;
}

const ROUNDS: DefiRound[] = [
  {
    action: "Échanger des tokens SOL contre USDC avec le meilleur taux agrégé",
    protocols: [
      { name: "Jupiter", description: "Agrégateur de routes DEX sur Solana", correct: true },
      { name: "Marinade", description: "Protocole de liquid staking SOL", correct: false },
      { name: "Raydium", description: "AMM avec pools CLMM", correct: false },
    ],
    explanation: "Jupiter agrège les routes de tous les DEX pour trouver le meilleur prix — c'est son rôle principal.",
  },
  {
    action: "Staker du SOL et recevoir un token liquide utilisable dans la DeFi",
    protocols: [
      { name: "Orca", description: "DEX concentré sur l'expérience utilisateur", correct: false },
      { name: "Marinade", description: "Liquid staking → mSOL utilisable en DeFi", correct: true },
      { name: "Jupiter", description: "Agrégateur DEX multi-routes", correct: false },
    ],
    explanation: "Marinade Finance offre du liquid staking : tu déposes SOL et reçois mSOL, utilisable en DeFi tout en générant du rendement.",
  },
  {
    action: "Fournir de la liquidité concentrée dans une plage de prix précise",
    protocols: [
      { name: "Marinade", description: "Liquid staking natif Solana", correct: false },
      { name: "Jupiter", description: "Agrégateur de swaps", correct: false },
      { name: "Orca", description: "CLMM Whirlpools — liquidité concentrée", correct: true },
    ],
    explanation: "Orca propose des Whirlpools (CLMM) pour fournir de la liquidité dans des plages de prix définies, maximisant l'efficacité du capital.",
  },
  {
    action: "Ajouter de la liquidité dans un pool SOL/USDC pour gagner des frais de trading",
    protocols: [
      { name: "Raydium", description: "AMM et pools de liquidité avec farming", correct: true },
      { name: "Marinade", description: "Staking de SOL uniquement", correct: false },
      { name: "Orca", description: "CLMM avec positions actives requises", correct: false },
    ],
    explanation: "Raydium est un AMM classique permettant d'ajouter de la liquidité passive dans des pools standard et de farmer des récompenses.",
  },
  {
    action: "Obtenir du SOL staké avec MEV rewards pour maximiser le rendement",
    protocols: [
      { name: "Jupiter", description: "Swaps et DCA uniquement", correct: false },
      { name: "Raydium", description: "Farming de tokens LP", correct: false },
      { name: "Marinade", description: "mSOL et jitoSOL via intégrations MEV", correct: true },
    ],
    explanation: "Marinade et les intégrations jitoSOL offrent du staking avec capture de MEV rewards, augmentant l'APY au-delà du staking natif.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function DefiContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(idx);
    if (current.protocols[idx].correct) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 1800);
  };

  const retry = () => {
    setRound(0); setScore(0); setSelected(null); setAnswered(false); setGameOver(false);
    startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Lego DeFi</h2>
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
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-3 mb-4">
              <p className="text-xs text-slate-400 mb-1">Action à effectuer :</p>
              <p className="text-white font-medium text-sm">{current.action}</p>
            </div>
            <p className="text-xs text-slate-400 mb-3">Quel protocole utiliser ?</p>
            <div className="space-y-2">
              {current.protocols.map((p, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && p.correct) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white text-sm">{p.name}</p>
                        <p className="text-xs text-slate-400">{p.description}</p>
                      </div>
                      {answered && (p.correct
                        ? <Check size={16} className="text-green-400 shrink-0" />
                        : idx === selected ? <X size={16} className="text-red-400 shrink-0" /> : null)}
                    </div>
                  </button>
                );
              })}
            </div>
            {answered && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs p-3 rounded-lg border border-amber-500/30 bg-amber-900/20 text-amber-300 mt-3">
                {current.explanation}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Architecte DeFi certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="defi" icon={<Landmark size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Landmark className="w-8 h-8 text-slate-900" />} xp={150} badge={t.badges.defi}
      content={t.defi} nextModuleLink="/finance/staking" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
