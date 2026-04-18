"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thermometer, Check } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface AllocationScenario {
  profile: string;
  description: string;
  options: { hot: number; cold: number; label: string }[];
  correctIdx: number;
  explanation: string;
}

const SCENARIOS: AllocationScenario[] = [
  {
    profile: "Trader quotidien",
    description: "Tu trades des crypto-monnaies tous les jours sur des DEX. Tu as 10 000€ en crypto.",
    options: [
      { hot: 90, cold: 10, label: "90% hot / 10% cold" },
      { hot: 20, cold: 80, label: "20% hot / 80% cold" },
      { hot: 50, cold: 50, label: "50% hot / 50% cold" },
    ],
    correctIdx: 0,
    explanation: "Un trader actif a besoin d'accès rapide. 90% hot avec des sommes gérées et 10% cold en réserve."
  },
  {
    profile: "HODLeur long terme",
    description: "Tu as acheté 1 BTC il y a 3 ans et tu ne comptes pas vendre avant 10 ans.",
    options: [
      { hot: 50, cold: 50, label: "50% hot / 50% cold" },
      { hot: 5, cold: 95, label: "5% hot / 95% cold" },
      { hot: 70, cold: 30, label: "70% hot / 30% cold" },
    ],
    correctIdx: 1,
    explanation: "Pour du stockage long terme, 95% cold wallet minimise les risques. Le hot wallet ne garde que du liquide opérationnel."
  },
  {
    profile: "Collectionneur NFT actif",
    description: "Tu achètes et vends des NFTs plusieurs fois par semaine sur OpenSea et Blur.",
    options: [
      { hot: 100, cold: 0, label: "100% hot / 0% cold" },
      { hot: 60, cold: 40, label: "60% hot / 40% cold" },
      { hot: 10, cold: 90, label: "10% hot / 90% cold" },
    ],
    correctIdx: 1,
    explanation: "60% hot pour les transactions fréquentes, 40% cold pour les NFTs de valeur à long terme."
  },
  {
    profile: "Investisseur DeFi",
    description: "Tu fournis de la liquidité sur Uniswap et stakes sur Lido. Portfolio de 50 000€.",
    options: [
      { hot: 30, cold: 70, label: "30% hot / 70% cold" },
      { hot: 80, cold: 20, label: "80% hot / 80% cold" },
      { hot: 100, cold: 0, label: "100% hot / 0% cold" },
    ],
    correctIdx: 0,
    explanation: "30% hot pour les positions DeFi actives, 70% cold pour préserver le capital principal."
  },
  {
    profile: "Débutant prudent",
    description: "Tu viens d'acheter 500€ de crypto pour la première fois et tu testes l'écosystème.",
    options: [
      { hot: 0, cold: 100, label: "0% hot / 100% cold" },
      { hot: 100, cold: 0, label: "100% hot / 100% cold" },
      { hot: 70, cold: 30, label: "70% hot / 30% cold" },
    ],
    correctIdx: 2,
    explanation: "Pour de petites sommes en apprentissage, 70% hot pour explorer + 30% cold pour prendre l'habitude de sécuriser."
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function HotvscoldContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(SCENARIOS).slice(0, 5));
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
    setRound(0); setScore(0); setSelected(null); setAnswered(false);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Portfolio Allocation</h2>
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
              <p className="text-[var(--sol-blue)] font-bold text-sm mb-1">{current.profile}</p>
              <p className="text-sm text-slate-300 leading-relaxed">{current.description}</p>
            </div>
            <p className="text-xs text-slate-400 mb-3">Quelle répartition hot/cold wallet est optimale ?</p>
            <div className="space-y-2">
              {current.options.map((opt, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && idx === current.correctIdx) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl px-4 py-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center gap-3">
                      {answered && idx === current.correctIdx && <Check size={14} className="text-green-400 shrink-0" />}
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-white mb-1.5">{opt.label}</p>
                        <div className="flex h-2 rounded-full overflow-hidden">
                          <div className="bg-orange-500 transition-all" style={{ width: `${opt.hot}%` }} />
                          <div className="bg-blue-500 flex-1" />
                        </div>
                        <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>Hot</span>
                          <span>Cold</span>
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
            {answered && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-amber-300 mt-3 p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
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
          {passed ? <p className="text-slate-300 mb-4">Stratège de portefeuille certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="hotvscold" icon={<Thermometer size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Thermometer className="w-8 h-8 text-slate-900" />} xp={140} badge={t.badges.hotvscold}
      content={t.hotvscold} nextModuleLink="/security/audit" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
