"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface Project { name: string; team: string; liquidity: string; promises: string; age: string; isRug: boolean; redFlag: string }

function generateProjects(): Project[][] {
  const rounds: Project[][] = [
    [
      { name: "SolMoon", team: "Anonyme", liquidity: "Non verrouillée", promises: "1000x garanti", age: "2 jours", isRug: true, redFlag: "Anonyme + LP non verrouillée + promesses irréalistes" },
      { name: "Marinade Finance", team: "Doxxed, audité", liquidity: "Verrouillée 2 ans", promises: "~7% APY", age: "3 ans", isRug: false, redFlag: "" },
      { name: "Jupiter", team: "Doxxed (meow)", liquidity: "TVL $2B+", promises: "Agrégateur DEX", age: "2 ans", isRug: false, redFlag: "" },
    ],
    [
      { name: "Orca", team: "Doxxed, YC-backed", liquidity: "Verrouillée", promises: "CLMM", age: "3 ans", isRug: false, redFlag: "" },
      { name: "RocketSOL", team: "Telegram only", liquidity: "100% créateur", promises: "Airdrop $50k/holder", age: "12h", isRug: true, redFlag: "Créateur détient 100% LP + promesse airdrop massif" },
      { name: "Raydium", team: "Doxxed", liquidity: "TVL $500M+", promises: "AMM performant", age: "3 ans", isRug: false, redFlag: "" },
    ],
    [
      { name: "PhantomGold", team: "Clone Phantom", liquidity: "Pas de pool", promises: "Token Phantom officiel", age: "1 jour", isRug: true, redFlag: "Usurpation d'identité + pas de liquidité" },
      { name: "Drift Protocol", team: "Doxxed, audité", liquidity: "TVL $300M+", promises: "Perps", age: "2 ans", isRug: false, redFlag: "" },
      { name: "Tensor", team: "Doxxed", liquidity: "Vol $10M/j", promises: "NFT trading", age: "2 ans", isRug: false, redFlag: "" },
    ],
    [
      { name: "Jito", team: "Jump Crypto", liquidity: "TVL $2B+", promises: "MEV + LST", age: "2 ans", isRug: false, redFlag: "" },
      { name: "SolGem100x", team: "Bot Telegram", liquidity: "LP retirée après 4h", promises: "Garantie 100x", age: "4h", isRug: true, redFlag: "LP retirée + bot auto + garantie gains" },
      { name: "Helium", team: "Doxxed, migré Solana", liquidity: "CEX majeurs", promises: "IoT", age: "5 ans", isRug: false, redFlag: "" },
    ],
  ];
  return rounds.sort(() => Math.random() - 0.5);
}

export default function RugpullContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => generateProjects());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const projects = rounds[round];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setAnswered(true); setSelected(idx);
    if (projects[idx].isRug) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 1500);
  };

  const retry = () => { setRound(0); setScore(0); setSelected(null); setAnswered(false); setGameOver(false); startedRef.current = false; timer.reset(); };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Trouve le Rug Pull</h2>
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
            <p className="text-sm text-slate-400 mb-3">Un de ces projets est un rug pull. Lequel ?</p>
            <div className="space-y-3">
              {projects.map((p, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && p.isRug) cls = "border-red-500 bg-red-900/30";
                else if (answered && idx === selected) cls = "border-amber-500 bg-amber-900/20";
                else if (answered) cls = "border-green-500/30 bg-green-900/10";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-4 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-bold">{p.name}</span>
                      <span className="text-xs text-slate-400">{p.age}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div><span className="text-slate-400">Équipe: </span><span className="text-slate-300">{p.team}</span></div>
                      <div><span className="text-slate-400">Liquidité: </span><span className="text-slate-300">{p.liquidity}</span></div>
                      <div className="col-span-2"><span className="text-slate-400">Promesses: </span><span className="text-slate-300">{p.promises}</span></div>
                    </div>
                    {answered && p.isRug && <p className="text-xs text-red-400 mt-2"><AlertTriangle size={12} className="inline mr-1" />{p.redFlag}</p>}
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
          {passed ? <p className="text-slate-300 mb-4">Détecteur de rug certifié !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="rugpull" icon={<AlertTriangle size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<AlertTriangle className="w-8 h-8 text-slate-900" />} xp={140} badge={t.badges.rugpull}
      content={t.rugpull} nextModuleLink="/security/scamphishing" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
