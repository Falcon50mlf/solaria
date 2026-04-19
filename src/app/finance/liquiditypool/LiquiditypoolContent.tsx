"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Droplets, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface LpRound {
  tokenA: string;
  tokenB: string;
  ratioA: number;
  ratioB: number;
  priceChange: string;
  options: { label: string; correct: boolean; reason: string }[];
}

const ROUNDS: LpRound[] = [
  {
    tokenA: "SOL", tokenB: "USDC",
    ratioA: 65, ratioB: 35,
    priceChange: "SOL a augmenté de 30%",
    options: [
      { label: "Ajouter plus de SOL dans le pool", correct: false, reason: "Le pool a déjà trop de SOL — en ajouter empire le déséquilibre." },
      { label: "Retirer une partie du SOL pour rééquilibrer", correct: true, reason: "Retirer du SOL rétablit le ratio vers 50/50 après l'appréciation." },
      { label: "Ne rien faire", correct: false, reason: "Laisser le déséquilibre crée une exposition asymétrique et augmente l'IL." },
    ],
  },
  {
    tokenA: "ETH", tokenB: "USDC",
    ratioA: 35, ratioB: 65,
    priceChange: "ETH a chuté de 25%",
    options: [
      { label: "Ajouter de l'USDC pour rééquilibrer", correct: false, reason: "Le pool a déjà trop d'USDC — en ajouter ne rééquilibre pas." },
      { label: "Ajouter de l'ETH au pool", correct: true, reason: "Ajouter de l'ETH (qui a chuté) rééquilibre le ratio vers 50/50." },
      { label: "Fermer toute la position LP", correct: false, reason: "Fermer cristallise la perte impermanente sans chance de récupération." },
    ],
  },
  {
    tokenA: "SOL", tokenB: "mSOL",
    ratioA: 52, ratioB: 48,
    priceChange: "Ratio SOL/mSOL stable (paire corrélée)",
    options: [
      { label: "Rééquilibrer en ajoutant du SOL", correct: false, reason: "Le pool est quasi équilibré — une action génère des frais inutiles." },
      { label: "Ne rien faire — ratio acceptable", correct: true, reason: "4% de déséquilibre sur une paire corrélée est négligeable — maintenir la position est optimal." },
      { label: "Retirer toute la liquidité", correct: false, reason: "Sur une paire stable, l'IL est minimal — retirer perdrait les frais futurs." },
    ],
  },
  {
    tokenA: "SOL", tokenB: "USDC",
    ratioA: 75, ratioB: 25,
    priceChange: "SOL a pris +60% en une semaine",
    options: [
      { label: "Retirer une partie du SOL pour rééquilibrer", correct: true, reason: "Avec 75% en SOL, retirer rétablit l'équilibre 50/50 et réduit l'IL." },
      { label: "Ajouter plus d'USDC seulement", correct: false, reason: "Ajouter de l'USDC sans retirer de SOL dilue mais ne corrige pas le ratio efficacement." },
      { label: "Attendre que SOL redescende", correct: false, reason: "Attendre expose à plus d'IL si le prix continue de monter." },
    ],
  },
  {
    tokenA: "RAY", tokenB: "USDC",
    ratioA: 40, ratioB: 60,
    priceChange: "RAY a perdu 20% de valeur",
    options: [
      { label: "Acheter du RAY et l'ajouter au pool", correct: true, reason: "Acheter RAY (déprécié) et l'ajouter rééquilibre le pool — stratégie DCA dans la baisse." },
      { label: "Retirer tout l'USDC du pool", correct: false, reason: "Retirer l'USDC cristallise l'IL sans possibilité de récupérer si RAY remonte." },
      { label: "Ne rien faire", correct: false, reason: "20% de déséquilibre génère de l'IL non compensé par les frais sur faible volume." },
    ],
  },
  {
    tokenA: "BTC", tokenB: "USDC",
    ratioA: 50, ratioB: 50,
    priceChange: "Pool parfaitement équilibré",
    options: [
      { label: "Ajouter de la liquidité des deux côtés à parts égales", correct: true, reason: "Ajouter de manière équilibrée maintient le ratio 50/50 et augmente proportionnellement les frais." },
      { label: "N'ajouter que du BTC", correct: false, reason: "N'ajouter qu'un seul côté déséquilibre immédiatement le pool." },
      { label: "Retirer et réinvestir ailleurs", correct: false, reason: "Un pool équilibré est dans sa situation idéale — inutile de changer." },
    ],
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function LiquiditypoolContent() {
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
    if (current.options[idx].correct) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">LP Balance</h2>
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
                <span className="text-white font-bold text-sm">Pool {current.tokenA}/{current.tokenB}</span>
                <span className="text-xs text-amber-400">{current.priceChange}</span>
              </div>
              <div className="flex gap-2 text-xs">
                <div className="flex-1 bg-purple-900/30 rounded-lg p-2 text-center">
                  <div className="text-purple-300 font-bold">{current.ratioA}%</div>
                  <div className="text-slate-400">{current.tokenA}</div>
                </div>
                <div className="flex items-center text-slate-500 text-xs">vs</div>
                <div className="flex-1 bg-blue-900/30 rounded-lg p-2 text-center">
                  <div className="text-blue-300 font-bold">{current.ratioB}%</div>
                  <div className="text-slate-400">{current.tokenB}</div>
                </div>
                <div className="flex items-center">
                  <div className={`text-xs font-bold px-2 py-1 rounded ${Math.abs(current.ratioA - 50) < 5 ? "text-green-400 bg-green-900/20" : "text-amber-400 bg-amber-900/20"}`}>
                    Cible: 50/50
                  </div>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-2">Quelle action pour maintenir l&apos;équilibre ?</p>
            <div className="space-y-2">
              {current.options.map((opt, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && opt.correct) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-white">{opt.label}</span>
                      {answered && (opt.correct
                        ? <Check size={14} className="text-green-400 shrink-0" />
                        : idx === selected ? <X size={14} className="text-red-400 shrink-0" /> : null)}
                    </div>
                    {answered && (opt.correct || idx === selected) && (
                      <p className="text-xs text-slate-400 mt-1">{opt.reason}</p>
                    )}
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
          {passed ? <p className="text-slate-300 mb-4">Fournisseur de Liquidité certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="liquiditypool" icon={<Droplets size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Droplets className="w-8 h-8 text-slate-900" />} xp={170} badge={t.badges.liquiditypool}
      content={t.liquiditypool} nextModuleLink="/finance/swap" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
