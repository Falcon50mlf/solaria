"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, Check, X, Bug } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface ContractRound {
  title: string;
  lines: string[];
  vulnerableLine: number;
  vulnType: string;
  explanation: string;
}

const ROUNDS: ContractRound[] = [
  {
    title: "Overflow arithmétique",
    lines: [
      "function addBalance(uint8 a, uint8 b) public {",
      "  uint8 result = a + b;",
      "  balances[msg.sender] += result;",
      "}"
    ],
    vulnerableLine: 1,
    vulnType: "Integer Overflow",
    explanation: "uint8 max = 255. Si a + b dépasse 255, le résultat overflow et recommence à 0. Utiliser SafeMath ou Solidity 0.8+."
  },
  {
    title: "Contrôle d'accès manquant",
    lines: [
      "address public owner;",
      "function withdraw(uint amount) public {",
      "  payable(msg.sender).transfer(amount);",
      "}"
    ],
    vulnerableLine: 1,
    vulnType: "Missing Access Control",
    explanation: "N'importe qui peut appeler withdraw(). Il manque 'require(msg.sender == owner)' avant le transfert."
  },
  {
    title: "Réentrance",
    lines: [
      "function withdraw() public {",
      "  uint bal = balances[msg.sender];",
      "  (bool success,) = msg.sender.call{value: bal}(\"\");",
      "  balances[msg.sender] = 0;"
    ],
    vulnerableLine: 3,
    vulnType: "Reentrancy",
    explanation: "Le solde est mis à 0 APRÈS le transfert. Un contrat malveillant peut rappeler withdraw() avant la mise à zéro."
  },
  {
    title: "Valeur de retour non vérifiée",
    lines: [
      "function safeTransfer(address token, uint amount) public {",
      "  IERC20(token).transfer(msg.sender, amount);",
      "  totalSent += amount;",
      "}"
    ],
    vulnerableLine: 1,
    vulnType: "Unchecked Return Value",
    explanation: "transfer() peut retourner false en cas d'échec. Sans vérification, totalSent s'incrémente même si le transfert a échoué."
  },
  {
    title: "Dépendance au timestamp",
    lines: [
      "function isWinner() public view returns (bool) {",
      "  return block.timestamp % 15 == 0;",
      "  // Prix si timestamp divisible par 15",
      "}"
    ],
    vulnerableLine: 1,
    vulnType: "Timestamp Manipulation",
    explanation: "Les mineurs peuvent manipuler block.timestamp de quelques secondes pour déclencher la condition."
  },
  {
    title: "Délégation dangereuse",
    lines: [
      "function forward(address impl, bytes calldata data) public {",
      "  (bool ok,) = impl.delegatecall(data);",
      "  require(ok);",
      "}"
    ],
    vulnerableLine: 1,
    vulnType: "Uncontrolled Delegatecall",
    explanation: "delegatecall() exécute du code externe dans le contexte de ce contrat. Sans validation d'impl, n'importe qui peut en prendre le contrôle."
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function AuditContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(ROUNDS).slice(0, 6));
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
    if (lineIdx === current.vulnerableLine) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Bug Hunter</h2>
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
              <Bug size={14} className="text-red-400" />
              <span className="text-sm font-semibold text-red-400">{current.title}</span>
            </div>
            <p className="text-xs text-slate-400 mb-3">Clique sur la ligne vulnérable :</p>
            <div className="bg-slate-900 border border-slate-700 rounded-xl overflow-hidden mb-4">
              {current.lines.map((line, idx) => {
                let bg = "hover:bg-slate-700/50 cursor-pointer";
                if (answered && idx === current.vulnerableLine) bg = "bg-red-900/40 border-l-2 border-red-500";
                else if (answered && idx === selected) bg = "bg-amber-900/30 border-l-2 border-amber-500";
                else if (answered) bg = "opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full text-left px-4 py-2.5 font-mono text-xs transition-all ${bg} ${idx > 0 ? "border-t border-slate-700/50" : ""}`}>
                    <span className="text-slate-500 mr-3 select-none">{idx + 1}</span>
                    <span className="text-slate-200">{line}</span>
                    {answered && idx === current.vulnerableLine && (
                      <span className="ml-2 text-red-400 font-bold">← {current.vulnType}</span>
                    )}
                    {answered && idx === selected && idx !== current.vulnerableLine && (
                      <span className="ml-2 text-amber-400"><X size={10} className="inline" /></span>
                    )}
                    {answered && idx === current.vulnerableLine && idx === selected && (
                      <span className="ml-1"><Check size={10} className="inline text-green-400" /></span>
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
          {passed ? <p className="text-slate-300 mb-4">Auditeur de contrats certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="audit" icon={<ClipboardCheck size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<ClipboardCheck className="w-8 h-8 text-slate-900" />} xp={180} badge={t.badges.audit}
      content={t.audit} nextModuleLink="/security/exploit" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
