"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Target, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface OptionsRound {
  outlook: string;
  context: string;
  strategies: { name: string; description: string; correct: boolean }[];
  explanation: string;
}

const ROUNDS: OptionsRound[] = [
  {
    outlook: "Fortement haussier",
    context: "Tu penses que SOL va monter de 30% dans les 30 prochains jours.",
    strategies: [
      { name: "Achat de Call", description: "Droit d'acheter SOL à un prix fixé — profite de la hausse avec levier", correct: true },
      { name: "Achat de Put", description: "Droit de vendre SOL à un prix fixé — profite de la baisse", correct: false },
      { name: "Vente de Call couvert", description: "Vendre le droit d'achat sur SOL que tu détiens déjà", correct: false },
    ],
    explanation: "L'achat de Call est la stratégie haussière directe — profit illimité à la hausse avec une prime comme risque maximum.",
  },
  {
    outlook: "Fortement baissier",
    context: "Tu anticipes une chute de 25% du prix de BTC dans les 2 semaines.",
    strategies: [
      { name: "Achat de Call", description: "Profite de la hausse — à l'opposé de ta vue", correct: false },
      { name: "Achat de Put", description: "Droit de vendre BTC à prix fixé — profite de la baisse", correct: true },
      { name: "Straddle", description: "Achat simultané Call + Put — profite de forte volatilité dans les deux sens", correct: false },
    ],
    explanation: "Le Put donne le droit de vendre à prix fixé — idéal pour profiter d'une baisse anticipée avec risque limité à la prime.",
  },
  {
    outlook: "Neutre / Légèrement haussier",
    context: "Tu détiens déjà 10 ETH et tu penses que le prix va rester stable ou monter légèrement.",
    strategies: [
      { name: "Achat de Put", description: "Protection contre la baisse — coûte de l'argent", correct: false },
      { name: "Vente de Call couvert", description: "Vendre des Calls sur ETH déjà détenu — génère des revenus", correct: true },
      { name: "Achat de Call", description: "Exposition haussière supplémentaire — risque si stable", correct: false },
    ],
    explanation: "Le Call couvert génère un revenu (prime) sur ETH déjà détenu. Si le prix reste stable ou monte légèrement, on encaisse la prime.",
  },
  {
    outlook: "Très volatile — incertain",
    context: "Un événement macro majeur arrive demain. Tu ne sais pas dans quel sens le marché va partir.",
    strategies: [
      { name: "Achat de Call seulement", description: "Profite uniquement si ça monte", correct: false },
      { name: "Vente de Call couvert", description: "Limite les gains si ça explose", correct: false },
      { name: "Straddle (Call + Put)", description: "Profite d'un fort mouvement dans n'importe quel sens", correct: true },
    ],
    explanation: "Le Straddle (acheter Call + Put au même strike) profite d'une forte volatilité dans n'importe quelle direction — parfait avant un événement incertain.",
  },
  {
    outlook: "Haussier modéré",
    context: "Tu penses que SOL va monter de 5-10% maximum. Tu veux générer un revenu récurrent.",
    strategies: [
      { name: "Straddle", description: "Trop cher pour un mouvement limité anticipé", correct: false },
      { name: "Achat de Call", description: "Profite mais coûte une prime — risque si mouvement faible", correct: false },
      { name: "Vente de Call couvert", description: "Vendre un Call sur SOL détenu — encaisse la prime", correct: true },
    ],
    explanation: "Pour un mouvement modéré avec SOL déjà détenu, la vente de Call couvert maximise le revenu en encaissant la prime.",
  },
  {
    outlook: "Baissier à court terme, haussier long terme",
    context: "Tu crois en SOL long terme mais tu penses qu'il va baisser de 15% dans les 2 prochaines semaines.",
    strategies: [
      { name: "Vendre tout ton SOL", description: "Perte de l'exposition long terme", correct: false },
      { name: "Achat de Put", description: "Protection/profit sur la baisse tout en gardant le SOL", correct: true },
      { name: "Achat de Call", description: "Renforce l'exposition haussière — mauvais timing", correct: false },
    ],
    explanation: "Acheter un Put protège contre la baisse à court terme tout en conservant le SOL pour le long terme — stratégie de couverture.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function OptionsonchainContent() {
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
    if (current.strategies[idx].correct) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Strategy Builder</h2>
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
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs bg-purple-800/50 text-purple-300 px-2 py-0.5 rounded-full font-bold">{current.outlook}</span>
              </div>
              <p className="text-white text-sm">{current.context}</p>
            </div>
            <p className="text-xs text-slate-400 mb-2">Quelle stratégie d&apos;options choisir ?</p>
            <div className="space-y-2">
              {current.strategies.map((s, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && s.correct) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold text-white text-sm">{s.name}</p>
                        <p className="text-xs text-slate-400">{s.description}</p>
                      </div>
                      {answered && (s.correct
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
          {passed ? <p className="text-slate-300 mb-4">Stratège d&apos;Options certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="optionsonchain" icon={<Target size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Target className="w-8 h-8 text-slate-900" />} xp={180} badge={t.badges.optionsonchain}
      content={t.optionsonchain} nextModuleLink="/finance/indextokens" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
