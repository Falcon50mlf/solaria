"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CircleDollarSign, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

type SolDestination = "burned" | "validator" | "treasury" | "staker";

interface SolFlowRound {
  scenario: string;
  amount: string;
  options: { label: string; destination: SolDestination; icon: string }[];
  correctDestination: SolDestination;
  explanation: string;
}

const ROUNDS: SolFlowRound[] = [
  {
    scenario: "Tu paies des frais de transaction sur Solana (0.000005 SOL)",
    amount: "0.000005 SOL",
    options: [
      { label: "Brûlé (détruit définitivement)", destination: "burned", icon: "🔥" },
      { label: "Envoyé au validateur actuel", destination: "validator", icon: "⚡" },
      { label: "Versé dans la trésorerie Solana", destination: "treasury", icon: "🏦" },
    ],
    correctDestination: "validator",
    explanation: "Les frais de transaction (base fee) vont majoritairement au validateur qui produit le bloc. 50% sont brûlés depuis une mise à jour récente.",
  },
  {
    scenario: "La priorité fee d'une transaction est définie à 0.001 SOL pour passer en tête de file",
    amount: "0.001 SOL",
    options: [
      { label: "Brûlé (50%) + Validateur (50%)", destination: "burned", icon: "🔥" },
      { label: "Entièrement au staker", destination: "staker", icon: "💎" },
      { label: "Entièrement à la trésorerie", destination: "treasury", icon: "🏦" },
    ],
    correctDestination: "burned",
    explanation: "Les priority fees sont partagés : 50% brûlés, 50% au validateur. C'est la politique post-SIMD-096.",
  },
  {
    scenario: "Un compte Solana est créé avec un dépôt de rent de 0.002 SOL",
    amount: "0.002 SOL",
    options: [
      { label: "Brûlé immédiatement", destination: "burned", icon: "🔥" },
      { label: "Retourné au créateur si le compte est fermé", destination: "staker", icon: "💎" },
      { label: "Versé aux validateurs", destination: "validator", icon: "⚡" },
    ],
    correctDestination: "staker",
    explanation: "Le rent (dépôt d'exemption de loyer) est récupérable — il est retourné au payeur quand le compte est fermé (zero out).",
  },
  {
    scenario: "Des tokens SPL inutilisés sont brûlés par leur protocole (burn instruction)",
    amount: "1000 TOKENS",
    options: [
      { label: "Détruits définitivement (supply réduite)", destination: "burned", icon: "🔥" },
      { label: "Envoyés à une adresse treasury", destination: "treasury", icon: "🏦" },
      { label: "Redistribués aux stakers", destination: "staker", icon: "💎" },
    ],
    correctDestination: "burned",
    explanation: "L'instruction burn SPL détruit définitivement les tokens — la supply totale est réduite, créant une pression déflationniste.",
  },
  {
    scenario: "Les récompenses de staking sont distribuées à la fin d'une epoch (432 000 slots)",
    amount: "~7% APY annualisé",
    options: [
      { label: "Brûlé pour contrôler l'inflation", destination: "burned", icon: "🔥" },
      { label: "Aux validateurs uniquement", destination: "validator", icon: "⚡" },
      { label: "Aux stakers (délégateurs + validateurs)", destination: "staker", icon: "💎" },
    ],
    correctDestination: "staker",
    explanation: "Les récompenses de staking sont distribuées aux stakers (délégateurs) et aux validateurs (commission) à chaque fin d'epoch.",
  },
  {
    scenario: "Une transaction échoue (erreur de programme) — les frais de base ont été payés",
    amount: "0.000005 SOL (frais base)",
    options: [
      { label: "Remboursé à l'expéditeur", destination: "staker", icon: "💎" },
      { label: "Conservé par le validateur malgré l'échec", destination: "validator", icon: "⚡" },
      { label: "Brûlé automatiquement", destination: "burned", icon: "🔥" },
    ],
    correctDestination: "validator",
    explanation: "Sur Solana, les frais de base sont toujours perçus même si la transaction échoue — le validateur a traité la requête.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function SoltokenContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<SolDestination | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const handleSelect = (destination: SolDestination) => {
    if (answered) return;
    setAnswered(true);
    setSelected(destination);
    if (destination === current.correctDestination) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">SOL Flow</h2>
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
              <p className="text-xs text-slate-400 mb-1">Scénario :</p>
              <p className="text-white text-sm">{current.scenario}</p>
              <p className="text-[var(--sol-green)] font-mono text-sm mt-1">{current.amount}</p>
            </div>
            <p className="text-xs text-slate-400 mb-2">Où va le SOL ?</p>
            <div className="space-y-2">
              {current.options.map((opt, idx) => {
                const isCorrect = opt.destination === current.correctDestination;
                const isSelected = opt.destination === selected;
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && isCorrect) cls = "border-green-500 bg-green-900/20";
                else if (answered && isSelected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(opt.destination)} disabled={answered}
                    className={`w-full border rounded-xl p-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{opt.icon}</span>
                        <span className="text-sm text-white">{opt.label}</span>
                      </div>
                      {answered && (isCorrect
                        ? <Check size={14} className="text-green-400 shrink-0" />
                        : isSelected ? <X size={14} className="text-red-400 shrink-0" /> : null)}
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
          {passed ? <p className="text-slate-300 mb-4">Expert SOL certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="soltoken" icon={<CircleDollarSign size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<CircleDollarSign className="w-8 h-8 text-slate-900" />} xp={140} badge={t.badges.soltoken}
      content={t.soltoken} nextModuleLink="/finance/yieldfarming" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
