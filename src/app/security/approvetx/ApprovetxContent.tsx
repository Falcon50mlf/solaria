"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileCheck2, ShieldCheck, AlertTriangle } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface Approval {
  protocol: string;
  contract: string;
  amount: string;
  function: string;
  isSafe: boolean;
  explanation: string;
}

const APPROVAL_POOL: Approval[] = [
  { protocol: "Uniswap V3", contract: "0x68b3...4e2f (Uniswap Router)", amount: "100 USDC", function: "approve()", isSafe: true, explanation: "Montant limité, protocole connu et audité" },
  { protocol: "???", contract: "0x4f91...d33a (Inconnu)", amount: "Illimité (max uint256)", function: "approve()", isSafe: false, explanation: "Contrat inconnu + approbation illimitée = danger maximum" },
  { protocol: "Aave V3", contract: "0x87870...d70 (Aave Pool)", amount: "500 DAI", function: "approve()", isSafe: true, explanation: "Montant précis, Aave est un protocole de référence audité" },
  { protocol: "NFT Marketplace", contract: "0x1c8c...7b3f (Inconnu)", amount: "Tous vos NFTs", function: "setApprovalForAll()", isSafe: false, explanation: "setApprovalForAll sur contrat inconnu = vol de tous vos NFTs possible" },
  { protocol: "Curve Finance", contract: "0xD533...4b5f (Curve DAO)", amount: "1000 USDT", function: "approve()", isSafe: true, explanation: "Montant limité, Curve est un protocole de confiance" },
  { protocol: "Free NFT Claim", contract: "0x9a2b...c8d1 (Inconnu)", amount: "Illimité (max uint256)", function: "approve()", isSafe: false, explanation: "Faux claim gratuit — approbation illimitée à un drainer" },
  { protocol: "Compound V3", contract: "0xc3d6...9e11 (Compound Comet)", amount: "200 WETH", function: "approve()", isSafe: true, explanation: "Compound est audité, montant précis et raisonnable" },
  { protocol: "OpenSea", contract: "0x1e0...0e71 (Seaport)", amount: "Tous vos NFTs", function: "setApprovalForAll()", isSafe: false, explanation: "Même OpenSea : setApprovalForAll donne accès à TOUS vos NFTs" },
  { protocol: "1inch", contract: "0x111...E20 (1inch Router)", amount: "50 WBTC", function: "approve()", isSafe: true, explanation: "1inch Router officiel, montant limité" },
  { protocol: "SOL Reward Bot", contract: "0x7f3c...a9b2 (Inconnu)", amount: "Illimité", function: "transferFrom()", isSafe: false, explanation: "Bot de reward + contrat inconnu + transferFrom illimité = scam évident" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function ApprovetxContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [approvals] = useState(() => shuffle(APPROVAL_POOL).slice(0, 8));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = approvals.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = approvals[round];

  const handleAnswer = (isSafe: boolean) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(isSafe);
    if (isSafe === current.isSafe) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelectedAnswer(null); }
    }, 1600);
  };

  const retry = () => {
    setRound(0); setScore(0); setAnswered(false); setSelectedAnswer(null);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Approval Reader</h2>
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
            <p className="text-sm text-slate-400 mb-3">Cette demande d'approbation est-elle sûre ou dangereuse ?</p>
            <div className={`border rounded-xl p-4 mb-4 transition-all ${answered ? (current.isSafe ? "border-green-500 bg-green-900/10" : "border-red-500 bg-red-900/20") : "border-slate-600 bg-slate-800/50"}`}>
              <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-white">{current.protocol}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-mono ${current.function === "setApprovalForAll()" ? "bg-red-900/50 text-red-300" : "bg-slate-700 text-slate-300"}`}>{current.function}</span>
              </div>
              <div className="space-y-1.5 text-xs">
                <div><span className="text-slate-400">Contrat : </span><span className="font-mono text-slate-300">{current.contract}</span></div>
                <div><span className="text-slate-400">Montant approuvé : </span><span className={`font-semibold ${current.amount.includes("Illimité") || current.amount.includes("Tous") ? "text-red-400" : "text-slate-200"}`}>{current.amount}</span></div>
              </div>
              {answered && (
                <p className={`text-xs mt-3 flex items-start gap-1 ${current.isSafe ? "text-green-400" : "text-red-400"}`}>
                  {current.isSafe ? <ShieldCheck size={12} className="mt-0.5 shrink-0" /> : <AlertTriangle size={12} className="mt-0.5 shrink-0" />}
                  {current.explanation}
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleAnswer(true)}
                disabled={answered}
                className={`py-3 rounded-xl font-bold text-sm border transition-all cursor-pointer ${answered && current.isSafe ? "border-green-500 bg-green-900/30 text-green-300" : answered && selectedAnswer === true ? "border-red-500 bg-red-900/20 text-red-300" : "border-green-600/50 bg-green-900/10 hover:bg-green-900/20 text-green-400"}`}
              >
                <ShieldCheck size={16} className="inline mr-1" />Safe
              </button>
              <button
                onClick={() => handleAnswer(false)}
                disabled={answered}
                className={`py-3 rounded-xl font-bold text-sm border transition-all cursor-pointer ${answered && !current.isSafe ? "border-red-500 bg-red-900/30 text-red-300" : answered && selectedAnswer === false ? "border-amber-500 bg-amber-900/20 text-amber-300" : "border-red-600/50 bg-red-900/10 hover:bg-red-900/20 text-red-400"}`}
              >
                <AlertTriangle size={16} className="inline mr-1" />Danger
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Auditeur d'approbations certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="approvetx" icon={<FileCheck2 size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<FileCheck2 className="w-8 h-8 text-slate-900" />} xp={130} badge={t.badges.approvetx}
      content={t.approvetx} nextModuleLink="/security/revoke" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
