"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingDown, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface SurvivalRound {
  priceMove: string;
  newPrice: number;
  marginRatio: number;
  options: { label: string; effect: string; safe: boolean }[];
  explanation: string;
}

const ROUNDS: SurvivalRound[] = [
  {
    priceMove: "Prix baisse de 8%",
    newPrice: 138.0,
    marginRatio: 68,
    options: [
      { label: "Ajouter de la marge (+$200)", effect: "+15% ratio", safe: true },
      { label: "Tenir la position", effect: "Ratio reste à 68%", safe: true },
      { label: "Augmenter le levier", effect: "Ratio chute à 45%", safe: false },
    ],
    explanation: "Avec 68% de ratio, la position est encore sûre. Tenir ou ajouter de la marge sont les bonnes options.",
  },
  {
    priceMove: "Prix baisse encore de 12%",
    newPrice: 121.4,
    marginRatio: 48,
    options: [
      { label: "Ajouter de la marge (+$300)", effect: "+20% ratio → sécurisé", safe: true },
      { label: "Fermer 50% de la position", effect: "Réduit l'exposition", safe: true },
      { label: "Ne rien faire", effect: "Ratio proche du seuil 40%", safe: false },
    ],
    explanation: "À 48% de ratio, le seuil de liquidation (40%) approche. Ajouter de la marge ou réduire la position est nécessaire.",
  },
  {
    priceMove: "Légère remontée +5%",
    newPrice: 127.5,
    marginRatio: 55,
    options: [
      { label: "Conserver la position", effect: "Profite de la remontée", safe: true },
      { label: "Ajouter encore de la marge", effect: "Sécurise davantage", safe: true },
      { label: "Réouvrir du levier", effect: "Ratio retombe à 42%", safe: false },
    ],
    explanation: "La remontée donne une respiration. Conserver sans augmenter le levier est la décision prudente.",
  },
  {
    priceMove: "Flash crash -20%",
    newPrice: 102.0,
    marginRatio: 32,
    options: [
      { label: "Fermer la position immédiatement", effect: "Évite la liquidation forcée", safe: true },
      { label: "Ajouter de la marge (+$500)", effect: "Remonte à 52% — sauvé", safe: true },
      { label: "Attendre que le prix remonte", effect: "Liquidation probable", safe: false },
    ],
    explanation: "À 32%, sous le seuil de 40% — action immédiate requise. Fermer ou injecter massivement de la marge.",
  },
  {
    priceMove: "Rebond fort +15%",
    newPrice: 117.3,
    marginRatio: 58,
    options: [
      { label: "Prendre les profits partiels", effect: "Sécurise les gains", safe: true },
      { label: "Maintenir la position actuelle", effect: "Continue de profiter", safe: true },
      { label: "Tripler le levier pour maximiser", effect: "Ratio plonge à 25% — danger", safe: false },
    ],
    explanation: "Après un rebond, sécuriser ou maintenir est sage. Augmenter le levier sur un rebond volatile est risqué.",
  },
  {
    priceMove: "Stabilisation — prix stable",
    newPrice: 118.0,
    marginRatio: 62,
    options: [
      { label: "Clôturer la position avec profit", effect: "Sortie sécurisée", safe: true },
      { label: "Maintenir et surveiller", effect: "Attente d'un prochain mouvement", safe: true },
      { label: "Maximiser le levier maintenant", effect: "Ratio chute à 30% — dangereux", safe: false },
    ],
    explanation: "Avec 62% de ratio et prix stable, sortir proprement ou maintenir sont des choix solides. Pas le moment de sur-leverager.",
  },
];

export default function LiquidationContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = ROUNDS.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = ROUNDS[round];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(idx);
    if (current.options[idx].safe) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 1800);
  };

  const retry = () => {
    setRound(0); setScore(0); setSelected(null); setAnswered(false); setGameOver(false);
    startedRef.current = false; timer.reset();
  };

  const ratioColor = (ratio: number) =>
    ratio >= 60 ? "text-green-400" : ratio >= 45 ? "text-amber-400" : "text-red-400";

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Survival Mode</h2>
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
                <span className="text-amber-400 font-bold text-sm">⚡ {current.priceMove}</span>
                <span className="text-slate-400 text-xs">Prix: ${current.newPrice}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">Ratio de marge :</span>
                <span className={`font-mono font-bold text-lg ${ratioColor(current.marginRatio)}`}>
                  {current.marginRatio}%
                </span>
              </div>
              <div className="w-full bg-slate-700 rounded-full h-2 mt-2">
                <div
                  className={`h-2 rounded-full transition-all ${current.marginRatio >= 60 ? "bg-green-500" : current.marginRatio >= 45 ? "bg-amber-500" : "bg-red-500"}`}
                  style={{ width: `${Math.min(current.marginRatio, 100)}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>Liquidation: 40%</span>
                <span>Sûr: 60%+</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-2">Quelle action prendre ?</p>
            <div className="space-y-2">
              {current.options.map((opt, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && opt.safe) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected && !opt.safe) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-white font-medium">{opt.label}</p>
                        <p className="text-xs text-slate-400">{opt.effect}</p>
                      </div>
                      {answered && (opt.safe
                        ? <Check size={14} className="text-green-400 shrink-0" />
                        : idx === selected ? <X size={14} className="text-red-400 shrink-0" /> : null)}
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
          {passed ? <p className="text-slate-300 mb-4">Survivant de Liquidation certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="liquidation" icon={<TrendingDown size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<TrendingDown className="w-8 h-8 text-slate-900" />} xp={160} badge={t.badges.liquidation}
      content={t.liquidation} nextModuleLink="/finance/optionsonchain" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
