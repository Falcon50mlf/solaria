"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Glasses, Star } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface Project {
  name: string;
  team: string;
  tokenomics: string;
  audit: string;
  community: string;
  onchain: string;
  expertRating: number;
  expertNote: string;
}

const PROJECTS: Project[] = [
  {
    name: "NovaDeFi",
    team: "Anonyme, pas de LinkedIn",
    tokenomics: "80% équipe, vesting 1 mois",
    audit: "Aucun audit",
    community: "50k followers achetés",
    onchain: "3 wallets détiennent 95% supply",
    expertRating: 1,
    expertNote: "Tous les signaux d'alarme réunis : anonymat, tokenomics abusifs, pas d'audit, whales."
  },
  {
    name: "Solend",
    team: "Doxxed, ex-Coinbase",
    tokenomics: "40% communauté, vesting 4 ans",
    audit: "Audité Kudelski + Quantstamp",
    community: "Discord actif 30k membres",
    onchain: "TVL $150M, activité régulière",
    expertRating: 4,
    expertNote: "Projet solide avec équipe identifiée, audits multiples. Points de vigilance : gouvernance centralisée."
  },
  {
    name: "ApeRocket",
    team: "Partiellement doxxed",
    tokenomics: "50% communauté, vesting 2 ans",
    audit: "Auto-audit interne",
    community: "20k membres actifs",
    onchain: "Volume décroissant depuis 6 mois",
    expertRating: 2,
    expertNote: "Auto-audit insuffisant et volume décroissant sont des signaux négatifs importants."
  },
  {
    name: "Jito",
    team: "Doxxed, backed Jump Crypto",
    tokenomics: "34% communauté, 34% équipe vesting 4 ans",
    audit: "OtterSec + Neodyme",
    community: "Twitter 200k, Discord actif",
    onchain: "TVL $2B+, validators actifs",
    expertRating: 5,
    expertNote: "Projet de référence sur Solana. Équipe solide, audits multiples, métriques on-chain excellentes."
  },
  {
    name: "MoonYield",
    team: "Pseudonyme 'CryptoKing'",
    tokenomics: "APY garanti 1000%",
    audit: "Badge audit sans lien",
    community: "Telegram 5k membres récents",
    onchain: "Contrat déployé il y a 48h",
    expertRating: 1,
    expertNote: "APY 1000% garanti = Ponzi. Badge d'audit sans vérification. Contrat trop récent."
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function StarRating({ value, onChange, disabled }: { value: number; onChange: (v: number) => void; disabled: boolean }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map(n => (
        <button key={n} onClick={() => !disabled && onChange(n)}
          className={`transition-all ${disabled ? "cursor-default" : "cursor-pointer hover:scale-110"}`}>
          <Star size={24} className={n <= value ? "text-yellow-400 fill-yellow-400" : "text-slate-600"} />
        </button>
      ))}
    </div>
  );
}

export default function DyorContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(PROJECTS).slice(0, 5));
  const [round, setRound] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && (totalScore / TOTAL) >= 0.7;
  const current = rounds[round];

  const handleSubmit = () => {
    if (answered || userRating === 0) return;
    setAnswered(true);
    const diff = Math.abs(userRating - current.expertRating);
    const roundScore = diff === 0 ? 1 : diff === 1 ? 0.7 : diff === 2 ? 0.3 : 0;
    const newTotal = totalScore + roundScore;
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setTotalScore(newTotal); setGameOver(true); timer.stop(); }
      else { setTotalScore(newTotal); setRound(r => r + 1); setAnswered(false); setUserRating(0); }
    }, 2000);
  };

  const retry = () => {
    setRound(0); setTotalScore(0); setUserRating(0); setAnswered(false);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Project Evaluator</h2>
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
              <p className="font-bold text-white text-base mb-3">{current.name}</p>
              <div className="space-y-1.5 text-xs">
                <div><span className="text-slate-400">Équipe : </span><span className="text-slate-200">{current.team}</span></div>
                <div><span className="text-slate-400">Tokenomics : </span><span className="text-slate-200">{current.tokenomics}</span></div>
                <div><span className="text-slate-400">Audit : </span><span className="text-slate-200">{current.audit}</span></div>
                <div><span className="text-slate-400">Communauté : </span><span className="text-slate-200">{current.community}</span></div>
                <div><span className="text-slate-400">On-chain : </span><span className="text-slate-200">{current.onchain}</span></div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-3">Quelle note donnes-tu à ce projet ? (1 = très risqué, 5 = excellent)</p>
            <div className="flex flex-col items-center gap-4">
              <StarRating value={userRating} onChange={setUserRating} disabled={answered} />
              {answered && (
                <motion.div initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }}
                  className="text-center w-full">
                  <p className="text-sm text-slate-300 mb-1">
                    Note expert : {Array.from({ length: current.expertRating }).map((_, i) => (
                      <Star key={i} size={14} className="inline text-yellow-400 fill-yellow-400" />
                    ))}
                  </p>
                  <p className="text-xs text-amber-300 p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                    {current.expertNote}
                  </p>
                </motion.div>
              )}
              {!answered && (
                <button onClick={handleSubmit} disabled={userRating === 0}
                  className="px-6 py-2 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 disabled:opacity-50 rounded-lg text-sm font-medium cursor-pointer">
                  Soumettre mon évaluation
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>
            {Math.round((totalScore / TOTAL) * 100)}%
          </motion.span>
          <p className="text-xs text-slate-500 mb-1">précision d'évaluation</p>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Analyste DYOR certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Précision minimale : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="dyor" icon={<Glasses size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Glasses className="w-8 h-8 text-slate-900" />} xp={130} badge={t.badges.dyor}
      content={t.dyor} nextModuleLink="/security/escrow" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
