"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HardDrive, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface Scenario {
  situation: string;
  options: string[];
  correct: number;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    situation: "Tu veux stocker 10 BTC pour les 5 prochaines années sans y toucher.",
    options: ["Laisser sur Binance", "Wallet logiciel (Metamask)", "Hardware wallet (Ledger/Trezor)", "Fichier texte chiffré sur PC"],
    correct: 2,
    explanation: "Le hardware wallet isole les clés du réseau — idéal pour le stockage long terme."
  },
  {
    situation: "Tu trades des altcoins quotidiennement sur un DEX.",
    options: ["Hardware wallet uniquement", "Hot wallet avec petites sommes", "Paper wallet", "Exchange centralisé uniquement"],
    correct: 1,
    explanation: "Un hot wallet avec des montants limités permet le trading fréquent avec un risque contrôlé."
  },
  {
    situation: "Tu dois sauvegarder ta seed phrase de 24 mots.",
    options: ["Screenshot sur téléphone", "Google Drive chiffré", "Plaque en acier gravée dans un coffre", "Mémorisation uniquement"],
    correct: 2,
    explanation: "La gravure sur métal résiste au feu et à l'eau. Jamais numérique, jamais dans le cloud."
  },
  {
    situation: "Tu reçois 50 000€ en ETH d'un héritage. Où les gardes-tu ?",
    options: ["Hot wallet MetaMask", "Exchange régulé", "Hardware wallet hors ligne", "Portefeuille papier imprimé"],
    correct: 2,
    explanation: "Pour de grosses sommes, le hardware wallet offline est le standard de l'industrie."
  },
  {
    situation: "Tu veux participer à un nouveau DeFi protocol tous les jours.",
    options: ["Hardware wallet branché en permanence", "Hot wallet dédié avec budget limité", "Seed phrase dans notes iPhone", "Exchange pour tout conserver"],
    correct: 1,
    explanation: "Un hot wallet dédié aux interactions DeFi avec budget limité = moins de risques si compromis."
  },
  {
    situation: "Tu as perdu accès à ton hardware wallet. Tu as ta seed phrase. Que fais-tu ?",
    options: ["Entrer la seed sur un site web", "Racheter un hardware wallet officiel", "Contacter le support pour récupération", "Abandonner les fonds"],
    correct: 1,
    explanation: "Rachète un hardware wallet officiel et restaure via ta seed phrase — jamais en ligne."
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function HardwarewalletContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(SCENARIOS).slice(0, 6));
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
    if (idx === current.correct) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Obstacle Course</h2>
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
              <p className="text-sm font-semibold text-white leading-relaxed">{current.situation}</p>
            </div>
            <p className="text-xs text-slate-400 mb-3">Quelle est la meilleure option ?</p>
            <div className="space-y-2">
              {current.options.map((opt, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && idx === current.correct) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl px-4 py-3 text-left text-sm transition-all ${cls}`}>
                    <div className="flex items-center gap-2">
                      {answered && idx === current.correct && <Check size={14} className="text-green-400 shrink-0" />}
                      {answered && idx === selected && idx !== current.correct && <X size={14} className="text-red-400 shrink-0" />}
                      <span className="text-slate-200">{opt}</span>
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
          {passed ? <p className="text-slate-300 mb-4">Expert en stockage sécurisé !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="hardwarewallet" icon={<HardDrive size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<HardDrive className="w-8 h-8 text-slate-900" />} xp={160} badge={t.badges.hardwarewallet}
      content={t.hardwarewallet} nextModuleLink="/security/hotvscold" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
