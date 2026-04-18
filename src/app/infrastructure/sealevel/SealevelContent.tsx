"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GitBranch, Check, X, Layers } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface Tx { id: string; accounts: string[]; writable: string[] }

function generatePuzzles(): { txs: Tx[]; parallelGroups: number[][] }[] {
  const accts = ["TokenA", "TokenB", "Pool_AB", "UserWallet", "StakePool", "VoteAcct", "NFT_Mint", "Treasury", "Oracle", "Config"];
  const puzzles = [];
  for (let p = 0; p < 6; p++) {
    const shuffled = accts.sort(() => Math.random() - 0.5);
    const txs: Tx[] = [
      { id: "TX-1", accounts: [shuffled[0], shuffled[1]], writable: [shuffled[0]] },
      { id: "TX-2", accounts: [shuffled[2], shuffled[3]], writable: [shuffled[2]] },
      { id: "TX-3", accounts: [shuffled[0], shuffled[4]], writable: [shuffled[0]] }, // conflicts with TX-1
      { id: "TX-4", accounts: [shuffled[5], shuffled[6]], writable: [shuffled[5]] },
    ];
    // TX-1 and TX-3 conflict (same writable). TX-2 and TX-4 are independent.
    // Parallel groups: [TX-1, TX-2, TX-4] or [TX-2, TX-3, TX-4]
    puzzles.push({ txs, parallelGroups: [[0, 1, 3], [1, 2, 3]] });
  }
  return puzzles;
}

export default function SealevelContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [puzzles] = useState(() => generatePuzzles());
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = puzzles.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const puzzle = puzzles[round];

  const toggleTx = (idx: number) => {
    if (checked) return;
    const next = new Set(selected);
    if (next.has(idx)) next.delete(idx); else next.add(idx);
    setSelected(next);
  };

  const handleCheck = () => {
    if (selected.size < 2) return;
    setChecked(true);
    const sel = Array.from(selected).sort();
    // Check if selected txs have no writable conflicts
    const writables = sel.flatMap(i => puzzle.txs[i].writable);
    const hasConflict = writables.length !== new Set(writables).size;
    const correct = !hasConflict && sel.length >= 3;
    setIsCorrect(correct);
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setSelected(new Set()); setChecked(false); }
    }, 1200);
  };

  const retry = () => {
    setRound(0); setScore(0); setSelected(new Set()); setChecked(false);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Parallélise !</h2>
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
            <p className="text-sm text-slate-400 mb-3">Sélectionne le maximum de transactions exécutables <strong>en parallèle</strong> (pas de conflit d&apos;écriture sur un même compte).</p>

            <div className="space-y-2 mb-4">
              {puzzle.txs.map((tx, idx) => {
                const isSel = selected.has(idx);
                let cls = isSel ? "border-purple-500 bg-purple-900/30" : "border-slate-600 bg-slate-800/50 hover:border-slate-400";
                if (checked) {
                  const selArr = Array.from(selected);
                  const writablesAll = selArr.flatMap(i => puzzle.txs[i].writable);
                  const conflicting = writablesAll.filter((w, i, arr) => arr.indexOf(w) !== i);
                  const txConflicts = isSel && tx.writable.some(w => conflicting.includes(w));
                  if (isSel && !txConflicts) cls = "border-green-500 bg-green-900/30";
                  else if (isSel && txConflicts) cls = "border-red-500 bg-red-900/30";
                  else cls = "border-slate-700 bg-slate-800/30 opacity-50";
                }
                return (
                  <button key={idx} onClick={() => toggleTx(idx)} disabled={checked}
                    className={`w-full border rounded-xl p-3 text-left cursor-pointer transition-all ${cls}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-white font-mono text-sm font-bold">{tx.id}</span>
                      <Layers size={14} className={isSel ? "text-purple-400" : "text-slate-500"} />
                    </div>
                    <div className="text-xs space-y-0.5">
                      <div><span className="text-slate-400">Read: </span><span className="text-slate-300">{tx.accounts.filter(a => !tx.writable.includes(a)).join(", ") || "—"}</span></div>
                      <div><span className="text-slate-400">Write: </span><span className="text-amber-400">{tx.writable.join(", ")}</span></div>
                    </div>
                  </button>
                );
              })}
            </div>

            {!checked && (
              <button onClick={handleCheck} disabled={selected.size < 2}
                className={`w-full py-3 rounded-lg font-bold cursor-pointer ${selected.size >= 2 ? "bg-[var(--sol-purple)]" : "bg-slate-700 text-slate-400"}`}>
                Valider ({selected.size} sélectionnées)
              </button>
            )}
            {checked && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`p-3 rounded-lg text-center ${isCorrect ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {isCorrect ? <><Check className="inline w-5 h-5 mr-1" /> Parallélisation optimale !</> : <><X className="inline w-5 h-5 mr-1" /> Conflit d&apos;écriture ou pas assez de tx !</>}
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Sealevel n&apos;a plus de secrets !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="sealevel" icon={<GitBranch size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<GitBranch className="w-8 h-8 text-slate-900" />} xp={190} badge={t.badges.sealevel}
      content={t.sealevel} nextModuleLink="/infrastructure/archivers" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
