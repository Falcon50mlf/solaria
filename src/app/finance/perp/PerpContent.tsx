"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CandlestickChart, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface FundingRound {
  fundingRate: string;
  rateValue: number; // positive = longs pay shorts, negative = shorts pay longs
  marketSentiment: string;
  bestAction: "long" | "short";
  explanation: string;
}

const ROUNDS: FundingRound[] = [
  {
    fundingRate: "+0.05%",
    rateValue: 0.05,
    marketSentiment: "Marché suracheté — forte demande de longs",
    bestAction: "short",
    explanation: "Taux positif (+0.05%) : les longs paient les shorts. Prendre un short te fait recevoir le funding toutes les 8h.",
  },
  {
    fundingRate: "-0.03%",
    rateValue: -0.03,
    marketSentiment: "Marché survendu — panique à la vente",
    bestAction: "long",
    explanation: "Taux négatif (-0.03%) : les shorts paient les longs. Prendre un long te fait recevoir le funding — et profiter d'un rebond potentiel.",
  },
  {
    fundingRate: "+0.10%",
    rateValue: 0.10,
    marketSentiment: "Euphorie extrême — all-time high récent",
    bestAction: "short",
    explanation: "Taux très élevé (+0.10%) : les longs payent massivement. Short = recevoir 0.1% toutes les 8h soit ~10.95% APY rien qu'en funding.",
  },
  {
    fundingRate: "-0.08%",
    rateValue: -0.08,
    marketSentiment: "Crash soudain — positions short massives",
    bestAction: "long",
    explanation: "Taux très négatif (-0.08%) : les shorts paient les longs. Un long capture le funding et peut bénéficier du rebond après le crash.",
  },
  {
    fundingRate: "+0.02%",
    rateValue: 0.02,
    marketSentiment: "Légère tendance haussière — marché équilibré",
    bestAction: "short",
    explanation: "Même un taux modéré (+0.02%) avantage le short. Attention cependant : avec une tendance haussière, le risque de perte est plus élevé.",
  },
  {
    fundingRate: "-0.12%",
    rateValue: -0.12,
    marketSentiment: "Bear market confirmé — shorts dominants",
    bestAction: "long",
    explanation: "Taux extrêmement négatif (-0.12%) : les shorts sur-payent les longs. Long = capture 0.12% toutes les 8h (~43% APY) rien qu'en funding.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function PerpContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<"long" | "short" | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [pnl, setPnl] = useState(0);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const handleSelect = (choice: "long" | "short") => {
    if (answered) return;
    setAnswered(true);
    setSelected(choice);
    const correct = choice === current.bestAction;
    if (correct) {
      setScore(s => s + 1);
      setPnl(p => p + Math.abs(current.rateValue));
    } else {
      setPnl(p => p - Math.abs(current.rateValue));
    }
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 1800);
  };

  const retry = () => {
    setRound(0); setScore(0); setSelected(null); setAnswered(false); setGameOver(false);
    setPnl(0);
    startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Funding Rate Trader</h2>
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
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs text-slate-400">Funding Rate (8h)</span>
                <span className={`font-mono font-bold text-xl ${current.rateValue > 0 ? "text-red-400" : "text-green-400"}`}>
                  {current.fundingRate}
                </span>
              </div>
              <p className="text-xs text-slate-300">{current.marketSentiment}</p>
              <div className="mt-2 text-xs text-slate-500">
                {current.rateValue > 0
                  ? "⚠️ Longs → paient les Shorts"
                  : "⚠️ Shorts → paient les Longs"}
              </div>
              <div className="mt-1 text-xs">
                <span className="text-slate-400">P&L funding: </span>
                <span className={`font-mono font-bold ${pnl >= 0 ? "text-green-400" : "text-red-400"}`}>
                  {pnl >= 0 ? "+" : ""}{pnl.toFixed(2)}%
                </span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-2">Pour capturer le funding, tu prends :</p>
            <div className="grid grid-cols-2 gap-3">
              {(["long", "short"] as const).map((choice) => {
                const isCorrect = choice === current.bestAction;
                const isSelected = choice === selected;
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && isCorrect) cls = "border-green-500 bg-green-900/20";
                else if (answered && isSelected && !isCorrect) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={choice} onClick={() => handleSelect(choice)} disabled={answered}
                    className={`border rounded-xl p-4 text-center transition-all ${cls}`}>
                    <div className={`text-2xl mb-1`}>{choice === "long" ? "🟢" : "🔴"}</div>
                    <div className={`font-bold text-lg ${choice === "long" ? "text-green-400" : "text-red-400"}`}>
                      {choice.toUpperCase()}
                    </div>
                    <div className="text-xs text-slate-400">
                      {choice === "long" ? "Prix monte = profit" : "Prix baisse = profit"}
                    </div>
                    {answered && (isCorrect
                      ? <Check size={16} className="text-green-400 mx-auto mt-1" />
                      : isSelected ? <X size={16} className="text-red-400 mx-auto mt-1" /> : null)}
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
          <p className="text-sm font-mono text-slate-400 mb-2">
            P&L funding total: <span className={pnl >= 0 ? "text-green-400 font-bold" : "text-red-400 font-bold"}>{pnl >= 0 ? "+" : ""}{pnl.toFixed(2)}%</span>
          </p>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Trader Perp certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="perp" icon={<CandlestickChart size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<CandlestickChart className="w-8 h-8 text-slate-900" />} xp={180} badge={t.badges.perp}
      content={t.perp} nextModuleLink="/finance/etfcrypto" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
