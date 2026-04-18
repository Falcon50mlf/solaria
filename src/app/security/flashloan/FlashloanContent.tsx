"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface FlashRound {
  scenario: string;
  steps: string[];
  correctOrder: number[];
  explanation: string;
}

const ROUNDS: FlashRound[] = [
  {
    scenario: "Arbitrage DEX simple",
    steps: [
      "Emprunter 1000 ETH via flash loan Aave",
      "Rembourser le flash loan + frais",
      "Acheter ETH moins cher sur Uniswap",
      "Vendre ETH plus cher sur SushiSwap",
    ],
    correctOrder: [0, 2, 3, 1],
    explanation: "L'ordre correct : emprunter → acheter bas → vendre haut → rembourser. Tout en 1 transaction."
  },
  {
    scenario: "Attaque de manipulation de prix",
    steps: [
      "Emprunter massivement via flash loan",
      "Rembourser le flash loan, garder le profit",
      "Acheter tokens pour manipuler le prix de l'oracle",
      "Exploiter le protocole avec le prix gonflé",
    ],
    correctOrder: [0, 2, 3, 1],
    explanation: "Le schéma d'attaque : emprunt → manipulation prix → exploitation → remboursement."
  },
  {
    scenario: "Liquidation forcée profitable",
    steps: [
      "Utiliser le profit pour rembourser le flash loan",
      "Emprunter des stablecoins en flash loan",
      "Déclencher la liquidation d'une position sous-collatéralisée",
      "Recevoir le collatéral liquidé avec bonus",
    ],
    correctOrder: [1, 2, 3, 0],
    explanation: "Emprunter pour liquider → recevoir collatéral bonusé → rembourser avec bénéfice."
  },
  {
    scenario: "Refinancement de position DeFi",
    steps: [
      "Fermer l'ancienne position Compound en remboursant la dette",
      "Ouvrir une meilleure position sur Aave avec le collatéral",
      "Utiliser le collatéral récupéré + nouveaux fonds",
      "Emprunter en flash loan pour couvrir la dette Compound",
    ],
    correctOrder: [3, 0, 2, 1],
    explanation: "Flash loan → rembourser ancienne dette → récupérer collatéral → ouvrir nouvelle position meilleure."
  },
  {
    scenario: "Exploitation de reentrancy via flash loan",
    steps: [
      "Emprunter via flash loan pour amplifier l'attaque",
      "Retirer les fonds avant que le solde soit mis à 0",
      "Appeler la fonction withdraw() vulnérable",
      "Rembourser le flash loan avec les fonds volés",
    ],
    correctOrder: [0, 2, 1, 3],
    explanation: "Flash loan pour capital → appel withdraw() → réentrance pour retirer avant mise à zéro → remboursement."
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function shuffleSteps(steps: string[]): { text: string; originalIdx: number }[] {
  return steps.map((text, idx) => ({ text, originalIdx: idx })).sort(() => Math.random() - 0.5);
}

export default function FlashloanContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(ROUNDS).slice(0, 5));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [shuffledSteps, setShuffledSteps] = useState(() => shuffleSteps(rounds[0].steps));
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const moveStep = (from: number, to: number) => {
    if (answered) return;
    setShuffledSteps(prev => {
      const arr = [...prev];
      const [item] = arr.splice(from, 1);
      arr.splice(to, 0, item);
      return arr;
    });
  };

  const handleSubmit = () => {
    if (answered) return;
    setAnswered(true);
    const userOrder = shuffledSteps.map(s => s.originalIdx);
    const isCorrect = current.correctOrder.every((v, i) => v === userOrder[i]);
    if (isCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else {
        const nextRound = rounds[round + 1];
        setRound(r => r + 1);
        setAnswered(false);
        setShuffledSteps(shuffleSteps(nextRound.steps));
      }
    }, 2000);
  };

  const retry = () => {
    setRound(0); setScore(0); setAnswered(false); setGameOver(false);
    setShuffledSteps(shuffleSteps(rounds[0].steps));
    startedRef.current = false; timer.reset();
  };

  const userOrder = shuffledSteps.map(s => s.originalIdx);
  const isCorrect = answered && current.correctOrder.every((v, i) => v === userOrder[i]);

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Flash Loan Executor</h2>
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
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-yellow-400" />
                <span className="font-bold text-white text-sm">{current.scenario}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-3">Ordonne les étapes pour exécuter le flash loan :</p>
            <div className="space-y-2 mb-4">
              {shuffledSteps.map((step, idx) => {
                let cls = "border-slate-600 bg-slate-800/50";
                if (answered) {
                  cls = current.correctOrder[idx] === step.originalIdx
                    ? "border-green-500 bg-green-900/20"
                    : "border-red-500 bg-red-900/20";
                }
                return (
                  <div key={step.originalIdx} className={`border rounded-xl p-3 transition-all ${cls}`}>
                    <div className="flex items-center gap-3">
                      {!answered && (
                        <div className="flex flex-col gap-0.5">
                          <button onClick={() => idx > 0 && moveStep(idx, idx - 1)} disabled={idx === 0}
                            className="text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer text-xs">▲</button>
                          <button onClick={() => idx < shuffledSteps.length - 1 && moveStep(idx, idx + 1)} disabled={idx === shuffledSteps.length - 1}
                            className="text-slate-400 hover:text-white disabled:opacity-20 cursor-pointer text-xs">▼</button>
                        </div>
                      )}
                      <span className={`text-xs font-mono w-5 h-5 flex items-center justify-center rounded-full font-bold shrink-0 ${answered ? (current.correctOrder[idx] === step.originalIdx ? "bg-green-500 text-white" : "bg-red-500 text-white") : "bg-yellow-500/20 text-yellow-400"}`}>{idx + 1}</span>
                      <p className="text-xs text-slate-300 leading-relaxed flex-1">{step.text}</p>
                      {answered && (current.correctOrder[idx] === step.originalIdx
                        ? <Check size={12} className="text-green-400 shrink-0" />
                        : <X size={12} className="text-red-400 shrink-0" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            {!answered && (
              <button onClick={handleSubmit}
                className="w-full py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">
                Exécuter la séquence
              </button>
            )}
            {answered && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`text-xs p-3 rounded-lg border ${isCorrect ? "text-green-400 bg-green-900/20 border-green-500/30" : "text-amber-300 bg-amber-900/20 border-amber-500/30"}`}>
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
          {passed ? <p className="text-slate-300 mb-4">Expert Flash Loan certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="flashloan" icon={<Zap size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Zap className="w-8 h-8 text-slate-900" />} xp={190} badge={t.badges.flashloan}
      content={t.flashloan} nextModuleLink="/security/reentrancy" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
