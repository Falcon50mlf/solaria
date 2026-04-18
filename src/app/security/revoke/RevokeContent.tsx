"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Ban, Check, AlertTriangle, Clock } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface DApp {
  name: string;
  lastUsed: string;
  permission: string;
  protocol: string;
  shouldRevoke: boolean;
  reason: string;
}

const DAPP_POOL: DApp[] = [
  { name: "Uniswap V3 Router", lastUsed: "Il y a 2 jours", permission: "500 USDC", protocol: "Uniswap", shouldRevoke: false, reason: "" },
  { name: "0x4f9...d33a", lastUsed: "Il y a 2 ans", permission: "Illimité", protocol: "Inconnu", shouldRevoke: true, reason: "Protocole inconnu + permission illimitée + accès obsolète" },
  { name: "Aave V3 Pool", lastUsed: "Il y a 1 semaine", permission: "1000 DAI", protocol: "Aave", shouldRevoke: false, reason: "" },
  { name: "NFT Airdrop Claim", lastUsed: "Il y a 6 mois", permission: "Tous NFTs (setApprovalForAll)", protocol: "Inconnu", shouldRevoke: true, reason: "setApprovalForAll à un contrat inconnu et inutilisé depuis longtemps" },
  { name: "Curve Finance", lastUsed: "Il y a 3 jours", permission: "2000 USDT", protocol: "Curve", shouldRevoke: false, reason: "" },
  { name: "Ancient DEX V1", lastUsed: "Il y a 3 ans", permission: "Illimité WETH", protocol: "Déprécié", shouldRevoke: true, reason: "Protocole déprécié sans maintenance de sécurité, accès obsolète" },
  { name: "1inch Router", lastUsed: "Hier", permission: "100 WBTC", protocol: "1inch", shouldRevoke: false, reason: "" },
  { name: "Yield Farm 2021", lastUsed: "Il y a 2 ans", permission: "Illimité", protocol: "Abandonné", shouldRevoke: true, reason: "Protocole abandonné, équipe disparue, permission illimitée active" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function RevokeContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [dapps] = useState(() => shuffle(DAPP_POOL));
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const toRevoke = dapps.filter(d => d.shouldRevoke).length;
  const passed = gameOver && score >= Math.ceil(toRevoke * 0.7);

  const toggleSelect = (idx: number) => {
    if (submitted) return;
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    let correct = 0;
    dapps.forEach((d, i) => { if (d.shouldRevoke && selected.has(i)) correct++; });
    setScore(correct);
    setGameOver(true);
    timer.stop();
  };

  const retry = () => {
    setSelected(new Set()); setSubmitted(false); setScore(0);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Permission Dashboard</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>
      {!submitted && (
        <p className="text-sm text-slate-400 mb-4">Sélectionne les dApps dont tu dois révoquer les permissions ({toRevoke} à révoquer).</p>
      )}
      {!gameOver ? (
        <AnimatePresence mode="wait">
          <motion.div key="game" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <div className="space-y-2 mb-4">
              {dapps.map((d, i) => {
                const isSelected = selected.has(i);
                return (
                  <button key={i} onClick={() => toggleSelect(i)} disabled={submitted}
                    className={`w-full border rounded-xl p-3 text-left transition-all cursor-pointer ${isSelected ? "border-red-500 bg-red-900/20" : "border-slate-600 bg-slate-800/50 hover:border-purple-500/50"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-semibold text-sm text-white">{d.name}</span>
                      {isSelected && <Ban size={14} className="text-red-400 shrink-0" />}
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <div className="flex items-center gap-1 text-slate-400"><Clock size={10} />{d.lastUsed}</div>
                      <div><span className="text-slate-400">Protocole: </span><span className="text-slate-300">{d.protocol}</span></div>
                      <div className="col-span-2"><span className="text-slate-400">Permission: </span><span className={d.permission.includes("Illimité") || d.permission.includes("Tous") ? "text-red-400 font-semibold" : "text-slate-300"}>{d.permission}</span></div>
                    </div>
                  </button>
                );
              })}
            </div>
            <button onClick={handleSubmit}
              className="w-full py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">
              Révoquer la sélection ({selected.size})
            </button>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{toRevoke}</motion.span>
          <p className="text-xs text-slate-500 mb-1">permissions dangereuses identifiées</p>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          <div className="text-left space-y-1.5 mb-4">
            {dapps.map((d, i) => d.shouldRevoke && (
              <div key={i} className={`text-xs p-2 rounded-lg border ${selected.has(i) ? "border-green-500/50 bg-green-900/10 text-green-400" : "border-red-500/50 bg-red-900/10 text-red-400"}`}>
                {selected.has(i) ? <Check size={10} className="inline mr-1" /> : <AlertTriangle size={10} className="inline mr-1" />}
                <span className="font-semibold">{d.name}</span> — {d.reason}
              </div>
            ))}
          </div>
          {passed ? <p className="text-slate-300 mb-4">Wallet sécurisé !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="revoke" icon={<Ban size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Ban className="w-8 h-8 text-slate-900" />} xp={120} badge={t.badges.revoke}
      content={t.revoke} nextModuleLink="/security/hardwarewallet" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
