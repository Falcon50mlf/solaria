"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanSearch, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

function randomHash() { return Array.from({ length: 64 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join(""); }
function randomAddr() { const c = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"; return Array.from({ length: 44 }, () => c[Math.floor(Math.random() * 58)]).join(""); }
function randomSol() { return (Math.random() * 100).toFixed(4); }

interface Investigation {
  txSignature: string;
  sender: string;
  receiver: string;
  amount: string;
  fee: string;
  status: "Success" | "Failed";
  question: string;
  options: string[];
  correctIndex: number;
}

function generateInvestigations(): Investigation[] {
  const cases: Investigation[] = [];
  for (let i = 0; i < 6; i++) {
    const sender = randomAddr();
    const receiver = randomAddr();
    const amount = randomSol();
    const fee = "0.000005";
    const status = Math.random() > 0.2 ? "Success" as const : "Failed" as const;
    const sig = randomHash();

    const questionTypes = [
      { question: "Quel est le montant envoyé ?", options: [amount + " SOL", (parseFloat(amount) + 5).toFixed(4) + " SOL", "0.5 SOL", fee + " SOL"], correctIndex: 0 },
      { question: "Quel est le statut de la transaction ?", options: ["Success", "Failed", "Pending", "Cancelled"], correctIndex: status === "Success" ? 0 : 1 },
      { question: "Quels sont les frais de base ?", options: ["0.000005 SOL", "0.01 SOL", "1 SOL", "0 SOL"], correctIndex: 0 },
      { question: `L'adresse de l'émetteur commence par...`, options: [sender.slice(0, 4) + "...", receiver.slice(0, 4) + "...", "0x" + sig.slice(0, 4) + "...", "SOL" + sender.slice(3, 7) + "..."], correctIndex: 0 },
    ];
    const qt = questionTypes[i % questionTypes.length];
    cases.push({ txSignature: sig, sender, receiver, amount, fee, status, ...qt });
  }
  return cases.sort(() => Math.random() - 0.5);
}

export default function SolscanContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [cases] = useState(() => generateInvestigations());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const total = cases.length;
  const passed = gameOver && score >= Math.ceil(total * 0.7);
  const c = cases[round];

  const handleAnswer = (idx: number) => {
    if (answered) return;
    setAnswered(true); setSelected(idx);
    if (idx === c.correctIndex) setScore((s) => s + 1);
    setTimeout(() => {
      if (round + 1 >= total) { setGameOver(true); timer.stop(); }
      else { setRound((r) => r + 1); setAnswered(false); setSelected(null); }
    }, 1000);
  };

  const retry = () => { setRound(0); setScore(0); setAnswered(false); setSelected(null); setGameOver(false); startedRef.current = false; timer.reset(); };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Enquête On-Chain</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: total }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"}`} />
        ))}
      </div>

      {!gameOver ? (
        <AnimatePresence mode="wait">
          <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            {/* Fake Solscan card */}
            <div className="bg-[#0d1117] border border-slate-700 rounded-xl p-4 mb-4 font-mono text-xs">
              <div className="flex items-center gap-2 mb-3 border-b border-slate-700 pb-2">
                <ScanSearch size={14} className="text-[#14f195]" />
                <span className="text-slate-400">Transaction Details</span>
              </div>
              <div className="space-y-1.5">
                <div><span className="text-slate-500">Signature: </span><span className="text-blue-400">{c.txSignature.slice(0, 20)}...{c.txSignature.slice(-8)}</span></div>
                <div><span className="text-slate-500">From: </span><span className="text-white">{c.sender.slice(0, 8)}...{c.sender.slice(-6)}</span></div>
                <div><span className="text-slate-500">To: </span><span className="text-white">{c.receiver.slice(0, 8)}...{c.receiver.slice(-6)}</span></div>
                <div><span className="text-slate-500">Amount: </span><span className="text-[#14f195]">{c.amount} SOL</span></div>
                <div><span className="text-slate-500">Fee: </span><span className="text-slate-300">{c.fee} SOL</span></div>
                <div><span className="text-slate-500">Status: </span><span className={c.status === "Success" ? "text-green-400" : "text-red-400"}>{c.status}</span></div>
              </div>
            </div>

            <p className="text-white font-medium mb-3">{c.question}</p>
            <div className="grid grid-cols-2 gap-2">
              {c.options.map((opt, idx) => {
                let cls = "bg-slate-800/50 border-slate-600 hover:border-purple-500/50 cursor-pointer";
                if (answered && idx === c.correctIndex) cls = "bg-green-900/30 border-green-500";
                else if (answered && idx === selected) cls = "bg-red-900/30 border-red-500";
                else if (answered) cls = "bg-slate-800/30 border-slate-700 opacity-50";
                return (
                  <button key={idx} onClick={() => handleAnswer(idx)} disabled={answered}
                    className={`border rounded-lg p-3 text-left text-sm transition-all ${cls}`}>
                    <span className="text-slate-200">{opt}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>
            {score}/{total}
          </motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Vous savez lire Solscan comme un pro !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button>
            </div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="solscan" icon={<ScanSearch size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<ScanSearch className="w-8 h-8 text-slate-900" />} xp={150} badge={t.badges.solscan}
      content={t.solscan} nextModuleLink="/basics/node" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
