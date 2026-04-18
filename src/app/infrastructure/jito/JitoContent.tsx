"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, Check, X, DollarSign, Package } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface BundleTx { label: string; value: number }
interface AuctionRound { availableTxs: BundleTx[]; maxSlotSize: number; optimalValue: number }

function generateAuctions(): AuctionRound[] {
  const txLabels = ["Arb SOL/USDC", "NFT Snipe", "Liquidation", "Frontrun Swap", "Backrun DEX", "Token Launch", "Stake Rebalance", "Oracle Update"];
  return Array.from({ length: 5 }, () => {
    const shuffled = txLabels.sort(() => Math.random() - 0.5).slice(0, 5);
    const txs = shuffled.map(label => ({ label, value: Math.floor(Math.random() * 50) + 5 }));
    const maxSize = 3;
    const sorted = [...txs].sort((a, b) => b.value - a.value);
    const optimalValue = sorted.slice(0, maxSize).reduce((s, t) => s + t.value, 0);
    return { availableTxs: txs, maxSlotSize: maxSize, optimalValue };
  });
}

export default function JitoContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [auctions] = useState(() => generateAuctions());
  const [round, setRound] = useState(0);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = auctions.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const auction = auctions[round];
  const bundleValue = Array.from(selected).reduce((s, i) => s + auction.availableTxs[i].value, 0);

  const toggleTx = (idx: number) => {
    if (checked) return;
    const next = new Set(selected);
    if (next.has(idx)) next.delete(idx);
    else if (next.size < auction.maxSlotSize) next.add(idx);
    setSelected(next);
  };

  const handleSubmit = () => {
    if (selected.size === 0) return;
    setChecked(true);
    if (bundleValue >= auction.optimalValue * 0.9) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setSelected(new Set()); setChecked(false); }
    }, 1200);
  };

  const retry = () => { setRound(0); setScore(0); setSelected(new Set()); setChecked(false); setGameOver(false); startedRef.current = false; timer.reset(); };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Enchère de Bundles</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"}`} />
        ))}
      </div>

      {!gameOver ? (
        <div>
          <div className="flex items-center justify-between mb-3 bg-slate-800/50 border border-slate-600 rounded-lg p-3">
            <span className="text-sm text-slate-300">Bundle : <strong className="text-white">{selected.size}/{auction.maxSlotSize} tx</strong></span>
            <span className="text-sm font-bold flex items-center gap-1">
              <DollarSign size={14} className="text-[var(--sol-green)]" />
              <span className="text-[var(--sol-green)]">{bundleValue} SOL tip</span>
            </span>
          </div>

          <div className="space-y-2 mb-4">
            {auction.availableTxs.map((tx, idx) => {
              const isSel = selected.has(idx);
              let cls = isSel ? "border-purple-500 bg-purple-900/30" : "border-slate-600 bg-slate-800/50 hover:border-slate-400 cursor-pointer";
              if (checked) {
                const sorted = [...auction.availableTxs].map((t, i) => ({ ...t, i })).sort((a, b) => b.value - a.value);
                const optimalIdxs = new Set(sorted.slice(0, auction.maxSlotSize).map(t => t.i));
                if (isSel && optimalIdxs.has(idx)) cls = "border-green-500 bg-green-900/30";
                else if (isSel) cls = "border-amber-500 bg-amber-900/20";
                else if (optimalIdxs.has(idx)) cls = "border-green-500/30 bg-green-900/10";
                else cls = "border-slate-700 opacity-50";
              }
              return (
                <button key={idx} onClick={() => toggleTx(idx)} disabled={checked || (!isSel && selected.size >= auction.maxSlotSize)}
                  className={`w-full border rounded-xl p-3 text-left transition-all flex items-center justify-between ${cls}`}>
                  <span className="flex items-center gap-2">
                    <Package size={14} className={isSel ? "text-purple-400" : "text-slate-500"} />
                    <span className="text-white text-sm">{tx.label}</span>
                  </span>
                  <span className="text-sm font-bold text-[var(--sol-green)]">{tx.value} SOL</span>
                </button>
              );
            })}
          </div>

          {!checked && (
            <button onClick={handleSubmit} disabled={selected.size === 0}
              className={`w-full py-3 rounded-lg font-bold cursor-pointer ${selected.size > 0 ? "bg-[var(--sol-purple)]" : "bg-slate-700 text-slate-400"}`}>
              Soumettre le bundle
            </button>
          )}
          {checked && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`p-3 rounded-lg text-center ${bundleValue >= auction.optimalValue * 0.9 ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
              {bundleValue >= auction.optimalValue * 0.9 ? <><Check className="inline w-4 h-4 mr-1" /> Bundle optimal ! ({bundleValue}/{auction.optimalValue} SOL)</> :
                <><X className="inline w-4 h-4 mr-1" /> Pas assez rentable ({bundleValue}/{auction.optimalValue} SOL)</>}
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Capitaine MEV certifié !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="jito" icon={<Zap size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Zap className="w-8 h-8 text-slate-900" />} xp={200} badge={t.badges.jito}
      content={t.jito} nextModuleLink={null} gameSlide={gameSlide} gameCompleted={passed} />
  );
}
