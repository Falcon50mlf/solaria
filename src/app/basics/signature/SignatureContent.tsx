"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PenTool, Check, X, ShieldAlert } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface TxToSign {
  from: string;
  to: string;
  amount: string;
  description: string;
  safe: boolean;
  danger?: string;
}

function generateTxs(): TxToSign[] {
  const pool: TxToSign[] = [
    { from: "Votre wallet", to: "7xKX...gAsU", amount: "2 SOL", description: "Transfert vers votre second wallet", safe: true },
    { from: "Votre wallet", to: "Raydium Pool", amount: "50 USDC", description: "Swap USDC → SOL sur Raydium", safe: true },
    { from: "Votre wallet", to: "Unknown Contract", amount: "ALL TOKENS", description: "Approve unlimited — dApp inconnue", safe: false, danger: "Approval illimité vers un contrat inconnu" },
    { from: "Votre wallet", to: "Marinade Finance", amount: "10 SOL", description: "Stake 10 SOL via Marinade", safe: true },
    { from: "Votre wallet", to: "0xFaKe...ScAm", amount: "0 SOL", description: "Mint gratuit NFT — setApprovalForAll", safe: false, danger: "setApprovalForAll donne accès à tous vos NFTs" },
    { from: "Votre wallet", to: "Jupiter", amount: "5 SOL", description: "Swap SOL → BONK via Jupiter", safe: true },
    { from: "Votre wallet", to: "???", amount: "100 SOL", description: "Transfert urgent — message Discord admin", safe: false, danger: "Demande suspecte d'un faux admin Discord" },
    { from: "Votre wallet", to: "Phantom Swap", amount: "1 SOL", description: "Swap intégré dans Phantom", safe: true },
    { from: "Votre wallet", to: "Drainer.sol", amount: "0 SOL", description: "Claim airdrop gratuit — sign message", safe: false, danger: "Drainer déguisé en airdrop" },
    { from: "Votre wallet", to: "Orca Whirlpool", amount: "20 USDC", description: "Ajouter de la liquidité sur Orca", safe: true },
    { from: "Votre wallet", to: "NFT Marketplace", amount: "3 SOL", description: "Acheter un NFT sur Magic Eden", safe: true },
    { from: "Votre wallet", to: "Unknown", amount: "ALL SOL", description: "Approve max — site copie de Phantom", safe: false, danger: "Site de phishing imitant Phantom" },
  ];
  return pool.sort(() => Math.random() - 0.5).slice(0, 8);
}

export default function SignatureContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [txs] = useState(() => generateTxs());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const total = txs.length;
  const passed = gameOver && score >= Math.ceil(total * 0.7);
  const currentTx = txs[round];

  const handleDecision = (sign: boolean) => {
    if (answered) return;
    setAnswered(true);
    const correct = sign === currentTx.safe;
    setLastCorrect(correct);
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (round + 1 >= total) { setGameOver(true); timer.stop(); }
      else { setRound((r) => r + 1); setAnswered(false); setLastCorrect(null); }
    }, 1200);
  };

  const retry = () => {
    setRound(0); setScore(0); setAnswered(false); setLastCorrect(null);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Signer ou Rejeter ?</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>

      <div className="flex gap-1 mb-6">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${
            i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"
          }`} />
        ))}
      </div>

      {!gameOver ? (
        <AnimatePresence mode="wait">
          <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <PenTool size={16} className="text-[var(--sol-purple)]" />
                <span className="text-xs text-slate-400 uppercase tracking-wider">Transaction #{round + 1}</span>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-slate-400">De :</span><span className="text-white font-mono">{currentTx.from}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Vers :</span><span className="text-white font-mono">{currentTx.to}</span></div>
                <div className="flex justify-between"><span className="text-slate-400">Montant :</span><span className={`font-bold ${currentTx.amount === "ALL TOKENS" || currentTx.amount === "ALL SOL" ? "text-red-400" : "text-white"}`}>{currentTx.amount}</span></div>
                <div className="pt-2 border-t border-slate-700">
                  <p className="text-slate-300">{currentTx.description}</p>
                </div>
              </div>
            </div>

            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`mb-4 p-3 rounded-lg ${lastCorrect ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {lastCorrect ? (
                  <><Check className="inline w-5 h-5 mr-1" /> Correct !</>
                ) : (
                  <><ShieldAlert className="inline w-5 h-5 mr-1" /> {currentTx.safe ? "C'était sûr à signer !" : currentTx.danger}</>
                )}
              </motion.div>
            )}

            {!answered && (
              <div className="grid grid-cols-2 gap-4">
                <button onClick={() => handleDecision(true)}
                  className="bg-green-900/30 border border-green-500/50 hover:border-green-400 rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-105">
                  <PenTool className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <span className="text-green-400 font-bold">Signer</span>
                </button>
                <button onClick={() => handleDecision(false)}
                  className="bg-red-900/30 border border-red-500/50 hover:border-red-400 rounded-xl p-4 text-center cursor-pointer transition-all hover:scale-105">
                  <X className="w-8 h-8 mx-auto mb-2 text-red-400" />
                  <span className="text-red-400 font-bold">Rejeter</span>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>
            {score}/{total}
          </motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Vous savez distinguer les transactions sûres des pièges !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button>
            </div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule
      moduleId="signature"
      icon={<PenTool size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<PenTool className="w-8 h-8 text-slate-900" />}
      xp={140}
      badge={t.badges.signature}
      content={t.signature}
      nextModuleLink="/basics/fees"
      gameSlide={gameSlide}
      gameCompleted={passed}
    />
  );
}
