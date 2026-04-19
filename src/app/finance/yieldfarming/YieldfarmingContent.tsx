"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sprout, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface Farm {
  name: string;
  apy: string;
  risk: string;
  il: string;
  pair: string;
}

interface FarmRound {
  marketCondition: string;
  question: string;
  farms: Farm[];
  bestIdx: number;
  explanation: string;
}

const ROUNDS: FarmRound[] = [
  {
    marketCondition: "Marché stable — faible volatilité attendue",
    question: "Tu veux maximiser le rendement avec un risque minimal d'IL.",
    farms: [
      { name: "Farm SOL/USDC", apy: "18%", risk: "Moyen", il: "Élevé", pair: "Volatile/Stable" },
      { name: "Farm USDC/USDT", apy: "8%", risk: "Faible", il: "Quasi nul", pair: "Stable/Stable" },
      { name: "Farm BONK/SOL", apy: "120%", risk: "Très élevé", il: "Extrême", pair: "Meme/Volatile" },
    ],
    bestIdx: 1,
    explanation: "En marché stable, la farm USDC/USDT a un IL quasi nul (paire stable) avec 8% APY sûr — meilleur ratio risque/rendement.",
  },
  {
    marketCondition: "Bull run confirmé — SOL en hausse forte",
    question: "Tu es bullish sur SOL et veux maximiser les gains de farming.",
    farms: [
      { name: "Farm SOL/mSOL", apy: "12%", risk: "Faible", il: "Minimal", pair: "Corrélée" },
      { name: "Farm USDC/USDT", apy: "8%", risk: "Très faible", il: "Nul", pair: "Stable/Stable" },
      { name: "Farm SOL/USDC", apy: "25%", risk: "Moyen", il: "Modéré", pair: "Volatile/Stable" },
    ],
    bestIdx: 0,
    explanation: "En bull run SOL, la farm SOL/mSOL (paire corrélée) donne 12% APY sans IL significatif — tu profites de la hausse SOL sans te diluer.",
  },
  {
    marketCondition: "Marché baissier — crypto en chute générale",
    question: "Tu veux préserver ton capital tout en générant un peu de rendement.",
    farms: [
      { name: "Farm BTC/ETH", apy: "22%", risk: "Élevé", il: "Élevé en baisse", pair: "Volatile/Volatile" },
      { name: "Farm USDC/USDT", apy: "8%", risk: "Très faible", il: "Nul", pair: "Stable/Stable" },
      { name: "Farm SOL/USDC", apy: "30%", risk: "Élevé", il: "Élevé si SOL chute", pair: "Volatile/Stable" },
    ],
    bestIdx: 1,
    explanation: "En marché baissier, préserver le capital est prioritaire — la farm stable USDC/USDT évite toute perte impermanente.",
  },
  {
    marketCondition: "Volatilité extrême — swing trader actif",
    question: "Tu veux capter les frais de trading élevés générés par la volatilité.",
    farms: [
      { name: "Farm SOL/USDC (CLMM)", apy: "85%", risk: "Élevé", il: "Gérable actif", pair: "Concentrée active" },
      { name: "Farm USDC/USDT", apy: "8%", risk: "Faible", il: "Nul", pair: "Stable/Stable" },
      { name: "Farm mSOL/SOL", apy: "11%", risk: "Très faible", il: "Minimal", pair: "Corrélée" },
    ],
    bestIdx: 0,
    explanation: "En volatilité extrême, un CLMM SOL/USDC actif peut générer 85% APY grâce aux volumes élevés — idéal pour un trader qui gère sa position.",
  },
  {
    marketCondition: "Lancement d'un nouveau protocole avec tokens de rewards",
    question: "Tu veux maximiser les rewards token du protocole (yield farming agressif).",
    farms: [
      { name: "Farm SOL/USDC (protocole classique)", apy: "20%", risk: "Moyen", il: "Modéré", pair: "Standard" },
      { name: "Farm nouvelle pair XYZ/USDC", apy: "300%+", risk: "Très élevé", il: "+ risque token", pair: "Nouveau token" },
      { name: "Farm USDC/USDT (stable)", apy: "10%", risk: "Faible", il: "Nul", pair: "Safe" },
    ],
    bestIdx: 1,
    explanation: "Pour du yield farming agressif sur nouveau protocole, la farm à 300%+ est le choix. Risque élevé (IL + token dump) mais c'est l'objectif assumé.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function YieldfarmingContent() {
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
    if (idx === current.bestIdx) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Farm Manager</h2>
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
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-3 mb-3">
              <p className="text-xs text-amber-400 font-bold mb-1">{current.marketCondition}</p>
              <p className="text-white text-sm">{current.question}</p>
            </div>
            <p className="text-xs text-slate-400 mb-2">Quelle farm choisir ?</p>
            <div className="space-y-2">
              {current.farms.map((farm, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && idx === current.bestIdx) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-white text-sm">{farm.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-[var(--sol-green)]">{farm.apy} APY</span>
                        {answered && (idx === current.bestIdx
                          ? <Check size={14} className="text-green-400" />
                          : idx === selected ? <X size={14} className="text-red-400" /> : null)}
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-1 text-xs text-slate-400">
                      <span>⚠️ {farm.risk}</span>
                      <span>📉 IL: {farm.il}</span>
                      <span>🔗 {farm.pair}</span>
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
          {passed ? <p className="text-slate-300 mb-4">Fermier de Rendement certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="yieldfarming" icon={<Sprout size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Sprout className="w-8 h-8 text-slate-900" />} xp={170} badge={t.badges.yieldfarming}
      content={t.yieldfarming} nextModuleLink="/finance/amm" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
