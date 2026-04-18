"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Database, Check, X, HardDrive } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface Account { name: string; size: number }
interface SSD { id: string; capacity: number; used: number }

function generateRound(): { accounts: Account[]; ssds: SSD[] } {
  const accountNames = ["Token Mint", "NFT Metadata", "Stake Account", "Vote Account", "LP Position", "Program Data", "Config", "Oracle Feed"];
  const shuffled = accountNames.sort(() => Math.random() - 0.5).slice(0, 5);
  const accounts = shuffled.map(name => ({ name, size: 10 + Math.floor(Math.random() * 30) }));
  const ssds: SSD[] = [
    { id: "NVMe-1", capacity: 50, used: Math.floor(Math.random() * 20) },
    { id: "NVMe-2", capacity: 50, used: Math.floor(Math.random() * 20) },
    { id: "NVMe-3", capacity: 50, used: Math.floor(Math.random() * 20) },
  ];
  return { accounts, ssds };
}

const TOTAL_ROUNDS = 4;

export default function CloudbreakContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [roundData, setRoundData] = useState(() => generateRound());
  const [round, setRound] = useState(0);
  const [assignments, setAssignments] = useState<Record<number, number>>({});
  const [score, setScore] = useState(0);
  const [checked, setChecked] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const passed = gameOver && score >= Math.ceil(TOTAL_ROUNDS * 0.7);

  const ssdLoads = roundData.ssds.map((ssd, ssdIdx) => {
    const assigned = Object.entries(assignments).filter(([, s]) => s === ssdIdx).map(([aIdx]) => roundData.accounts[Number(aIdx)].size);
    return ssd.used + assigned.reduce((s, v) => s + v, 0);
  });

  const allAssigned = Object.keys(assignments).length === roundData.accounts.length;
  const balanced = allAssigned && Math.max(...ssdLoads) - Math.min(...ssdLoads) <= 20;
  const noOverflow = allAssigned && ssdLoads.every((load, i) => load <= roundData.ssds[i].capacity);

  const handleAssign = (accountIdx: number, ssdIdx: number) => {
    if (checked) return;
    setAssignments(prev => ({ ...prev, [accountIdx]: ssdIdx }));
  };

  const handleCheck = () => {
    if (!allAssigned) return;
    setChecked(true);
    if (balanced && noOverflow) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL_ROUNDS) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setRoundData(generateRound()); setAssignments({}); setChecked(false); }
    }, 1200);
  };

  const retry = () => { setRound(0); setScore(0); setAssignments({}); setChecked(false); setRoundData(generateRound()); setGameOver(false); startedRef.current = false; timer.reset(); };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Tetris de Stockage</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"}`} />
        ))}
      </div>

      {!gameOver ? (
        <div>
          <p className="text-sm text-slate-400 mb-3">Répartis les comptes sur les 3 SSDs. Équilibre la charge sans dépasser la capacité.</p>

          {/* SSDs */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {roundData.ssds.map((ssd, ssdIdx) => (
              <div key={ssd.id} className={`border rounded-xl p-3 ${checked ? (ssdLoads[ssdIdx] > ssd.capacity ? "border-red-500 bg-red-900/20" : "border-green-500/50 bg-green-900/10") : "border-slate-600 bg-slate-800/50"}`}>
                <div className="flex items-center gap-1 mb-1"><HardDrive size={12} className="text-slate-400" /><span className="text-xs font-medium text-white">{ssd.id}</span></div>
                <div className="h-2 rounded-full bg-slate-700 overflow-hidden mb-1">
                  <div className={`h-full rounded-full ${ssdLoads[ssdIdx] > ssd.capacity ? "bg-red-500" : ssdLoads[ssdIdx] > ssd.capacity * 0.8 ? "bg-amber-500" : "bg-green-500"}`}
                    style={{ width: `${Math.min(100, (ssdLoads[ssdIdx] / ssd.capacity) * 100)}%` }} />
                </div>
                <span className="text-xs text-slate-400">{ssdLoads[ssdIdx]}/{ssd.capacity} Go</span>
              </div>
            ))}
          </div>

          {/* Accounts */}
          <div className="space-y-2 mb-4">
            {roundData.accounts.map((acc, aIdx) => (
              <div key={aIdx} className="flex items-center gap-2 bg-slate-800/50 border border-slate-600 rounded-lg p-2">
                <span className="text-sm text-white flex-1">{acc.name} <span className="text-slate-400">({acc.size} Go)</span></span>
                <div className="flex gap-1">
                  {roundData.ssds.map((_, ssdIdx) => (
                    <button key={ssdIdx} onClick={() => handleAssign(aIdx, ssdIdx)} disabled={checked}
                      className={`w-8 h-8 rounded text-xs font-bold cursor-pointer transition-all ${assignments[aIdx] === ssdIdx ? "bg-purple-600 text-white" : "bg-slate-700 text-slate-400 hover:bg-slate-600"}`}>
                      {ssdIdx + 1}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {!checked && <button onClick={handleCheck} disabled={!allAssigned}
            className={`w-full py-3 rounded-lg font-bold cursor-pointer ${allAssigned ? "bg-[var(--sol-purple)]" : "bg-slate-700 text-slate-400"}`}>Valider</button>}

          {checked && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className={`p-3 rounded-lg text-center ${balanced && noOverflow ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
              {balanced && noOverflow ? <><Check className="inline w-4 h-4 mr-1" /> Stockage bien équilibré !</> :
                !noOverflow ? <><X className="inline w-4 h-4 mr-1" /> SSD surchargé !</> :
                <><X className="inline w-4 h-4 mr-1" /> Charge déséquilibrée (écart &gt; 20 Go)</>}
            </motion.div>
          )}
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL_ROUNDS}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Maître du stockage !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="cloudbreak" icon={<Database size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Database className="w-8 h-8 text-slate-900" />} xp={180} badge={t.badges.cloudbreak}
      content={t.cloudbreak} nextModuleLink="/infrastructure/slot" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
