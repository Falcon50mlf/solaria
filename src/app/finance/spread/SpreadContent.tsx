"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart3, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

type SpreadClass = "tight" | "normal" | "wide";

interface SpreadRound {
  asset: string;
  bid: number;
  ask: number;
  spreadPct: number;
  classification: SpreadClass;
  explanation: string;
}

function generateRounds(): SpreadRound[] {
  const data: SpreadRound[] = [
    { asset: "SOL/USDC", bid: 145.20, ask: 145.28, spreadPct: 0.055, classification: "tight", explanation: "Spread de 0.055% — très serré, typique d'un actif liquide comme SOL sur un grand DEX." },
    { asset: "BTC/USDC", bid: 62500.00, ask: 62512.50, spreadPct: 0.020, classification: "tight", explanation: "Spread de 0.02% sur BTC — très tight, Bitcoin est l'actif le plus liquide du marché crypto." },
    { asset: "ETH/USDC", bid: 3480.00, ask: 3496.96, spreadPct: 0.487, classification: "normal", explanation: "Spread de 0.487% — dans la normale, légèrement en dessous du seuil de 0.5% pour les altcoins majeurs." },
    { asset: "BONK/USDC", bid: 0.002450, ask: 0.002530, spreadPct: 3.27, classification: "wide", explanation: "Spread de 3.27% — très large, typique des memecoins avec peu de liquidité." },
    { asset: "JUP/USDC", bid: 0.7850, ask: 0.7935, spreadPct: 1.08, classification: "normal", explanation: "Spread de 1.08% — normal pour un token mid-cap avec liquidité modérée." },
    { asset: "NEWTOKEN/SOL", bid: 0.00120, ask: 0.00135, spreadPct: 12.5, classification: "wide", explanation: "Spread de 12.5% — extrêmement large, signe de très faible liquidité sur ce token récent." },
  ];
  return data.sort(() => Math.random() - 0.5);
}

const OPTIONS: { label: string; value: SpreadClass; range: string; color: string }[] = [
  { label: "Serré", value: "tight", range: "< 0.5%", color: "text-green-400" },
  { label: "Normal", value: "normal", range: "0.5% – 2%", color: "text-amber-400" },
  { label: "Large", value: "wide", range: "> 2%", color: "text-red-400" },
];

export default function SpreadContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => generateRounds());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<SpreadClass | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const handleSelect = (choice: SpreadClass) => {
    if (answered) return;
    setAnswered(true);
    setSelected(choice);
    if (choice === current.classification) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Market Maker</h2>
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
              <p className="text-sm font-bold text-white mb-3">{current.asset}</p>
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-2">
                  <div className="text-xs text-slate-400 mb-1">BID (achat)</div>
                  <div className="text-green-400 font-mono font-bold">{current.bid}</div>
                </div>
                <div className="flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-xs text-slate-500">Spread</div>
                    <div className="text-white font-mono text-sm font-bold">{current.spreadPct.toFixed(3)}%</div>
                  </div>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-2">
                  <div className="text-xs text-slate-400 mb-1">ASK (vente)</div>
                  <div className="text-red-400 font-mono font-bold">{current.ask}</div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-3">Classifie ce spread :</p>
            <div className="grid grid-cols-3 gap-2">
              {OPTIONS.map((opt) => {
                const isCorrect = opt.value === current.classification;
                const isSelected = opt.value === selected;
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && isCorrect) cls = "border-green-500 bg-green-900/20";
                else if (answered && isSelected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={opt.value} onClick={() => handleSelect(opt.value)} disabled={answered}
                    className={`border rounded-xl p-3 text-center transition-all ${cls}`}>
                    <div className={`font-bold text-sm ${opt.color}`}>{opt.label}</div>
                    <div className="text-xs text-slate-400">{opt.range}</div>
                    {answered && (isCorrect
                      ? <Check size={14} className="text-green-400 mx-auto mt-1" />
                      : isSelected ? <X size={14} className="text-red-400 mx-auto mt-1" /> : null)}
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
          {passed ? <p className="text-slate-300 mb-4">Analyste du Spread certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="spread" icon={<BarChart3 size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<BarChart3 className="w-8 h-8 text-slate-900" />} xp={130} badge={t.badges.spread}
      content={t.spread} nextModuleLink="/finance/liquidation" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
