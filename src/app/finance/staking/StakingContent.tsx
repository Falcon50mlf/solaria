"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Coins, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface StakingOption {
  name: string;
  apy: string;
  lock: string;
  risk: string;
  liquidity: string;
}

interface StakingRound {
  scenario: string;
  options: StakingOption[];
  correctIdx: number;
  explanation: string;
}

const ROUNDS: StakingRound[] = [
  {
    scenario: "Tu veux maximiser le rendement et utiliser ton SOL staké comme collatéral en DeFi sans période de blocage.",
    options: [
      { name: "Staking natif", apy: "~7%", lock: "2-3 jours de cooldown", risk: "Faible", liquidity: "Non liquide" },
      { name: "mSOL (Marinade)", apy: "~7.5%", lock: "Aucune", risk: "Faible", liquidity: "Liquide, utilisable DeFi" },
      { name: "jitoSOL (Jito)", apy: "~8%", lock: "Aucune", risk: "Faible+", liquidity: "Liquide, MEV rewards" },
    ],
    correctIdx: 2,
    explanation: "jitoSOL offre le meilleur APY grâce aux MEV rewards, reste liquide et utilisable en DeFi — parfait pour ce scénario.",
  },
  {
    scenario: "Tu es débutant, tu veux la solution la plus simple et sécurisée, sans risque de smart contract.",
    options: [
      { name: "Staking natif", apy: "~7%", lock: "2-3 jours cooldown", risk: "Minimal", liquidity: "Non liquide" },
      { name: "mSOL (Marinade)", apy: "~7.5%", lock: "Aucune", risk: "Smart contract", liquidity: "Liquide" },
      { name: "jitoSOL (Jito)", apy: "~8%", lock: "Aucune", risk: "Smart contract + MEV", liquidity: "Liquide" },
    ],
    correctIdx: 0,
    explanation: "Le staking natif n'expose à aucun risque de smart contract. C'est la solution la plus sûre pour un débutant.",
  },
  {
    scenario: "Tu veux staker du SOL et pouvoir le récupérer instantanément si le marché bouge brutalement.",
    options: [
      { name: "Staking natif", apy: "~7%", lock: "2-3 jours cooldown", risk: "Faible", liquidity: "Non liquide" },
      { name: "mSOL (Marinade)", apy: "~7.5%", lock: "Aucune", risk: "Faible", liquidity: "Swap instantané mSOL→SOL" },
      { name: "jitoSOL (Jito)", apy: "~8%", lock: "Aucune", risk: "Faible", liquidity: "Swap instantané jitoSOL→SOL" },
    ],
    correctIdx: 1,
    explanation: "mSOL peut être swappé instantanément sur Jupiter. Le staking natif impose 2-3 jours de cooldown — dangereux en cas de volatilité.",
  },
  {
    scenario: "Tu veux maximiser l'APY et capturer des revenus MEV en plus du rendement de staking standard.",
    options: [
      { name: "Staking natif", apy: "~7%", lock: "Cooldown", risk: "Minimal", liquidity: "Non" },
      { name: "mSOL (Marinade)", apy: "~7.5%", lock: "Aucune", risk: "Faible", liquidity: "Oui" },
      { name: "jitoSOL (Jito)", apy: "~8%+", lock: "Aucune", risk: "Faible", liquidity: "Oui + MEV rewards" },
    ],
    correctIdx: 2,
    explanation: "Jito capture les revenus MEV et les redistribue aux stakers jitoSOL, offrant le meilleur APY du groupe.",
  },
  {
    scenario: "Tu veux diversifier entre plusieurs validateurs automatiquement pour réduire le risque de slashing.",
    options: [
      { name: "Staking natif", apy: "~7%", lock: "Cooldown", risk: "Risque si validateur mauvais", liquidity: "Non" },
      { name: "mSOL (Marinade)", apy: "~7.5%", lock: "Aucune", risk: "Diversification auto >100 validators", liquidity: "Oui" },
      { name: "jitoSOL (Jito)", apy: "~8%", lock: "Aucune", risk: "Réseau Jito validators", liquidity: "Oui" },
    ],
    correctIdx: 1,
    explanation: "Marinade Finance répartit automatiquement sur plus de 100 validateurs, minimisant le risque de slashing par diversification.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function StakingContent() {
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
    if (idx === current.correctIdx) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Staking Simulator</h2>
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
              <p className="text-xs text-slate-400 mb-1">Scénario :</p>
              <p className="text-white text-sm">{current.scenario}</p>
            </div>
            <p className="text-xs text-slate-400 mb-3">Quelle option de staking choisir ?</p>
            <div className="space-y-2">
              {current.options.map((opt, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && idx === current.correctIdx) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-sm">{opt.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-[var(--sol-green)] font-mono">{opt.apy}</span>
                        {answered && (idx === current.correctIdx
                          ? <Check size={14} className="text-green-400" />
                          : idx === selected ? <X size={14} className="text-red-400" /> : null)}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-xs text-slate-400">
                      <span>🔒 {opt.lock}</span>
                      <span>⚠️ {opt.risk}</span>
                      <span>💧 {opt.liquidity}</span>
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
          {passed ? <p className="text-slate-300 mb-4">Staker Pro certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="staking" icon={<Coins size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Coins className="w-8 h-8 text-slate-900" />} xp={140} badge={t.badges.staking}
      content={t.staking} nextModuleLink="/finance/liquiditypool" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
