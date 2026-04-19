"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Building, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface CexDexRound {
  situation: string;
  answer: "CEX" | "DEX";
  explanation: string;
}

const ROUNDS: CexDexRound[] = [
  {
    situation: "Tu veux exécuter un trade de 500 000 USD avec le minimum de slippage possible.",
    answer: "CEX",
    explanation: "Les CEX majeurs (Binance, Coinbase) ont une liquidité profonde pour les gros trades — moins de slippage qu'un DEX.",
  },
  {
    situation: "Tu veux trader un nouveau token Solana lancé il y a 24h, non listé sur les exchanges centralisés.",
    answer: "DEX",
    explanation: "Les DEX permettent de trader n'importe quel token dès qu'un pool de liquidité existe — les CEX tardent à lister.",
  },
  {
    situation: "Tu es un débutant absolu et tu veux une interface simple avec support client.",
    answer: "CEX",
    explanation: "Les CEX offrent une interface intuitive, un support client et une récupération de compte si nécessaire.",
  },
  {
    situation: "Tu veux trader sans révéler ton identité ni faire de KYC.",
    answer: "DEX",
    explanation: "Les DEX sont non-custodial et sans KYC — tu trades directement depuis ton wallet sans vérification d'identité.",
  },
  {
    situation: "Tu as besoin d'exécuter un swap en moins de 2 secondes pour profiter d'une opportunité d'arbitrage.",
    answer: "DEX",
    explanation: "Sur Solana, les DEX (Jupiter, Raydium) exécutent en ~400ms. Les CEX ont des ordres plus rapides mais dépendent du réseau.",
  },
  {
    situation: "Tu veux détenir tes clés privées et ne pas confier tes fonds à un tiers.",
    answer: "DEX",
    explanation: "Les DEX sont non-custodial — tes fonds restent dans ton wallet. Les CEX détiennent tes actifs (\"not your keys, not your coins\").",
  },
  {
    situation: "Tu veux trader des options et des futures avec un effet de levier élevé réglementé.",
    answer: "CEX",
    explanation: "Les CEX proposent des produits dérivés régulés avec fort levier (Binance Futures, OKX) — peu de DEX offrent ces produits.",
  },
  {
    situation: "Tu veux fournir de la liquidité dans un pool et gagner des frais de trading en passif.",
    answer: "DEX",
    explanation: "Fournir de la liquidité (LP) est une fonctionnalité DEX — les CEX ne permettent pas aux utilisateurs de devenir market makers.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function CexdexContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<"CEX" | "DEX" | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const handleSelect = (choice: "CEX" | "DEX") => {
    if (answered) return;
    setAnswered(true);
    setSelected(choice);
    if (choice === current.answer) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">CEX ou DEX ?</h2>
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
              <p className="text-xs text-slate-400 mb-1">Situation :</p>
              <p className="text-white text-sm leading-relaxed">{current.situation}</p>
            </div>
            <p className="text-xs text-slate-400 mb-3">Pour ce cas, mieux vaut utiliser :</p>
            <div className="grid grid-cols-2 gap-3">
              {(["CEX", "DEX"] as const).map((choice) => {
                const isCorrect = choice === current.answer;
                const isSelected = choice === selected;
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && isCorrect) cls = "border-green-500 bg-green-900/20";
                else if (answered && isSelected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={choice} onClick={() => handleSelect(choice)} disabled={answered}
                    className={`border rounded-xl p-4 text-center transition-all ${cls}`}>
                    <div className="text-2xl mb-1">{choice === "CEX" ? "🏦" : "🔗"}</div>
                    <div className="font-bold text-white">{choice}</div>
                    <div className="text-xs text-slate-400">{choice === "CEX" ? "Centralisé" : "Décentralisé"}</div>
                    {answered && (isCorrect
                      ? <Check size={16} className="text-green-400 mx-auto mt-2" />
                      : isSelected ? <X size={16} className="text-red-400 mx-auto mt-2" /> : null)}
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
          {passed ? <p className="text-slate-300 mb-4">Navigateur CEX/DEX certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="cexdex" icon={<Building size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Building className="w-8 h-8 text-slate-900" />} xp={140} badge={t.badges.cexdex}
      content={t.cexdex} nextModuleLink="/finance/spread" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
