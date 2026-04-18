"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Check, X, ShieldCheck } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface ReentrancyRound {
  title: string;
  lines: string[];
  guardLine: number;
  guardCode: string;
  explanation: string;
}

const ROUNDS: ReentrancyRound[] = [
  {
    title: "Withdraw basique",
    lines: [
      "function withdraw(uint amount) public {",
      "  require(balances[msg.sender] >= amount);",
      "  (bool ok,) = msg.sender.call{value: amount}(\"\");",
      "  balances[msg.sender] -= amount;",
      "}",
    ],
    guardLine: 3,
    guardCode: "  balances[msg.sender] -= amount; // ← Déplacer AVANT l'appel externe",
    explanation: "Le guard doit être AVANT l'appel externe. Déplace la mise à jour du solde en ligne 2, avant le call()."
  },
  {
    title: "Claim rewards",
    lines: [
      "function claimReward() public {",
      "  uint reward = rewards[msg.sender];",
      "  rewards[msg.sender] = 0;",
      "  payable(msg.sender).transfer(reward);",
      "}",
    ],
    guardLine: 2,
    guardCode: "  rewards[msg.sender] = 0; // ← Déjà correct : remise à 0 avant le transfert",
    explanation: "Bien joué ! La remise à 0 en ligne 3 AVANT le transfer() est le bon pattern. C'est déjà sécurisé."
  },
  {
    title: "Liquidation DeFi",
    lines: [
      "function liquidate(address user) public {",
      "  uint collateral = positions[user];",
      "  (bool ok,) = msg.sender.call{value: collateral}(\"\");",
      "  require(ok);",
      "  positions[user] = 0;",
      "}",
    ],
    guardLine: 4,
    guardCode: "  positions[user] = 0; // ← Déplacer AVANT le call externe en ligne 3",
    explanation: "positions[user] = 0 doit venir avant l'appel externe. Sans cela, un contrat malveillant peut se liquider plusieurs fois."
  },
  {
    title: "Flash loan callback",
    lines: [
      "function executeFlashLoan(uint amount) public {",
      "  loanActive[msg.sender] = true;",
      "  token.transfer(msg.sender, amount);",
      "  ICallback(msg.sender).onFlashLoan(amount);",
      "  loanActive[msg.sender] = false;",
      "}",
    ],
    guardLine: 4,
    guardCode: "  loanActive[msg.sender] = false; // ← Déplacer AVANT onFlashLoan callback",
    explanation: "Le callback externe peut rappeler executeFlashLoan. La désactivation du flag doit être avant l'appel au callback."
  },
  {
    title: "NFT mint avec refund",
    lines: [
      "function mintNFT() public payable {",
      "  require(msg.value >= mintPrice);",
      "  uint refund = msg.value - mintPrice;",
      "  if (refund > 0) payable(msg.sender).transfer(refund);",
      "  _mint(msg.sender, nextTokenId++);",
      "}",
    ],
    guardLine: 4,
    guardCode: "  _mint(msg.sender, nextTokenId++); // ← Déplacer AVANT le transfert de refund",
    explanation: "Le mint doit se faire avant le remboursement. Sinon un contrat peut rappeler mintNFT() lors du receive() du refund."
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function ReentrancyContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(ROUNDS).slice(0, 5));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const handleSelect = (lineIdx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(lineIdx);
    if (lineIdx === current.guardLine) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 2000);
  };

  const retry = () => {
    setRound(0); setScore(0); setSelected(null); setAnswered(false);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Code Fixer</h2>
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
            <div className="flex items-center gap-2 mb-3">
              <RefreshCw size={14} className="text-[var(--sol-purple)]" />
              <span className="text-sm font-semibold text-white">{current.title}</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Clique sur la ligne qui doit être déplacée ou corrigée pour éviter la réentrance :</p>
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden mb-4">
              {current.lines.map((line, idx) => {
                let bg = "hover:bg-slate-700/50 cursor-pointer";
                if (answered && idx === current.guardLine) bg = "bg-green-900/40 border-l-2 border-green-500";
                else if (answered && idx === selected) bg = "bg-red-900/30 border-l-2 border-red-500";
                else if (answered) bg = "opacity-70";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full text-left px-4 py-2.5 font-mono text-xs transition-all ${bg} ${idx > 0 ? "border-t border-slate-700/50" : ""}`}>
                    <span className="text-slate-500 mr-3 select-none">{idx + 1}</span>
                    <span className="text-slate-200">{line}</span>
                    {answered && idx === current.guardLine && (
                      <span className="ml-2"><ShieldCheck size={12} className="inline text-green-400" /></span>
                    )}
                    {answered && idx === selected && idx !== current.guardLine && (
                      <span className="ml-2"><X size={12} className="inline text-red-400" /></span>
                    )}
                  </button>
                );
              })}
            </div>
            {answered && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-amber-300 p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
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
          {passed ? <p className="text-slate-300 mb-4">Spécialiste anti-réentrance certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="reentrancy" icon={<RefreshCw size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<RefreshCw className="w-8 h-8 text-slate-900" />} xp={180} badge={t.badges.reentrancy}
      content={t.reentrancy} nextModuleLink="/security/socialeng" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
