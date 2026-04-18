"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Archive, Check, X, Puzzle } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

function generateShredPuzzles() {
  const blockData = [
    { blockId: 4521, fragments: ["Genesis hash: 5eyb...M2Jk", "Prev: 0x8fa3", "Txs: 142", "Validator: SolFlare", "Timestamp: 1712345"] },
    { blockId: 7893, fragments: ["Fee: 0.00021 SOL", "Program: TokenkegQ", "Signer: 7xKX...gAsU", "Status: Success", "Slot: 234001"] },
    { blockId: 1204, fragments: ["Mint: DezX...n8Pq", "Supply: 1000", "Decimals: 9", "Authority: 3mFt...Kz2p", "Freeze: null"] },
    { blockId: 9010, fragments: ["Stake: 50000 SOL", "Delegator: Ax3f...P9qw", "Validator: Jito", "Epoch: 450", "Reward: 12.4 SOL"] },
    { blockId: 3377, fragments: ["Swap: 100 USDC", "Route: Jupiter", "Slippage: 0.3%", "Output: 0.72 SOL", "Pool: Raydium"] },
  ];
  return blockData.map(b => ({
    blockId: b.blockId,
    correctOrder: b.fragments,
    shuffled: [...b.fragments].sort(() => Math.random() - 0.5),
  }));
}

export default function ArchiversContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [puzzles] = useState(() => generateShredPuzzles());
  const [round, setRound] = useState(0);
  const [placed, setPlaced] = useState<string[]>([]);
  const [remaining, setRemaining] = useState<string[]>(() => puzzles[0].shuffled);
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = puzzles.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);

  const handlePick = (frag: string) => {
    if (checked) return;
    setPlaced([...placed, frag]);
    setRemaining(remaining.filter(f => f !== frag));
  };

  const handleUndo = () => {
    if (checked || placed.length === 0) return;
    const last = placed[placed.length - 1];
    setPlaced(placed.slice(0, -1));
    setRemaining([...remaining, last]);
  };

  const handleCheck = () => {
    if (placed.length !== 5) return;
    setChecked(true);
    const correct = placed.every((f, i) => f === puzzles[round].correctOrder[i]);
    if (correct) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else {
        const nextPuzzle = puzzles[round + 1];
        setRound(r => r + 1);
        setPlaced([]);
        setRemaining([...nextPuzzle.shuffled]);
        setChecked(false);
      }
    }, 1200);
  };

  const retry = () => {
    setRound(0); setScore(0); setPlaced([]); setRemaining([...puzzles[0].shuffled]);
    setChecked(false); setGameOver(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Reconstitue le Bloc</h2>
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
            <p className="text-sm text-slate-400 mb-3">
              Bloc #{puzzles[round].blockId} — Remets les shreds dans le bon ordre.
            </p>

            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-3 mb-3 min-h-[80px]">
              <p className="text-xs text-slate-500 mb-2">Bloc reconstitué :</p>
              {placed.map((frag, i) => {
                const correct = checked && frag === puzzles[round].correctOrder[i];
                const wrong = checked && frag !== puzzles[round].correctOrder[i];
                return (
                  <div key={i} className={`font-mono text-xs p-1.5 rounded mb-1 ${correct ? "bg-green-900/30 text-green-400" : wrong ? "bg-red-900/30 text-red-400" : "bg-purple-900/20 text-purple-300"}`}>
                    <Puzzle size={10} className="inline mr-1" />{frag}
                  </div>
                );
              })}
            </div>

            {!checked && remaining.length > 0 && (
              <div className="space-y-1 mb-3">
                {remaining.map(frag => (
                  <button key={frag} onClick={() => handlePick(frag)}
                    className="w-full bg-slate-800/50 border border-slate-600 hover:border-purple-500/50 rounded-lg p-2.5 text-left font-mono text-xs text-white cursor-pointer transition-all">
                    {frag}
                  </button>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              {!checked && placed.length > 0 && (
                <button onClick={handleUndo} className="px-4 py-2 border border-slate-600 rounded-lg text-sm text-slate-300 cursor-pointer">Annuler</button>
              )}
              {!checked && placed.length === 5 && (
                <button onClick={handleCheck} className="px-6 py-2 bg-[var(--sol-purple)] rounded-lg text-sm font-medium cursor-pointer">Valider</button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Archiviste certifié !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="archivers" icon={<Archive size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Archive className="w-8 h-8 text-slate-900" />} xp={150} badge={t.badges.archivers}
      content={t.archivers} nextModuleLink="/infrastructure/tps" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
