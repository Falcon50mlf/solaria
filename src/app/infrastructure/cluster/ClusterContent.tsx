"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Boxes, Check, X, Globe2 } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface Request { description: string; correctCluster: "mainnet" | "devnet" | "testnet"; hint: string }

function generateRequests(): Request[] {
  const pool: Request[] = [
    { description: "Déployer un smart contract en production", correctCluster: "mainnet", hint: "Utilisateurs réels" },
    { description: "Tester un nouveau programme Anchor", correctCluster: "devnet", hint: "SOL gratuits" },
    { description: "Évaluer la stabilité de Firedancer v0.2", correctCluster: "testnet", hint: "Test protocole" },
    { description: "Lancer un swap de 500 USDC sur Jupiter", correctCluster: "mainnet", hint: "Argent réel" },
    { description: "Débugger une erreur de sérialisation Borsh", correctCluster: "devnet", hint: "Développement" },
    { description: "Mesurer les performances d'un nouveau scheduler", correctCluster: "testnet", hint: "Benchmark" },
    { description: "Mint une collection NFT publique", correctCluster: "mainnet", hint: "Vente réelle" },
    { description: "Faire un airdrop de test à votre wallet", correctCluster: "devnet", hint: "Faucet" },
    { description: "Tester le comportement réseau sous charge extrême", correctCluster: "testnet", hint: "Stress test" },
    { description: "Staker 1000 SOL chez un validateur", correctCluster: "mainnet", hint: "Rendement réel" },
  ];
  return pool.sort(() => Math.random() - 0.5).slice(0, 8);
}

const CLUSTER_STYLES = {
  mainnet: { label: "Mainnet", color: "text-green-400", border: "border-green-500/50", bg: "bg-green-900/30" },
  devnet: { label: "Devnet", color: "text-blue-400", border: "border-blue-500/50", bg: "bg-blue-900/30" },
  testnet: { label: "Testnet", color: "text-amber-400", border: "border-amber-500/50", bg: "bg-amber-900/30" },
};

export default function ClusterContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [requests] = useState(() => generateRequests());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = requests.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);

  const handleRoute = useCallback((cluster: "mainnet" | "devnet" | "testnet") => {
    if (answered) return;
    setAnswered(true); setSelected(cluster);
    if (cluster === requests[round].correctCluster) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 900);
  }, [answered, round, requests, TOTAL, timer]);

  const retry = () => { setRound(0); setScore(0); setAnswered(false); setSelected(null); setGameOver(false); startedRef.current = false; timer.reset(); };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Routage Cluster</h2>
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
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-4 mb-4">
              <p className="text-white font-medium mb-1">{requests[round].description}</p>
              <p className="text-xs text-slate-400 italic">Indice : {requests[round].hint}</p>
            </div>

            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`mb-3 p-2 rounded-lg text-center text-sm ${selected === requests[round].correctCluster ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {selected === requests[round].correctCluster ? <Check className="inline w-4 h-4 mr-1" /> : <X className="inline w-4 h-4 mr-1" />}
                {CLUSTER_STYLES[requests[round].correctCluster].label}
              </motion.div>
            )}

            <div className="grid grid-cols-3 gap-3">
              {(["mainnet", "devnet", "testnet"] as const).map(c => {
                const s = CLUSTER_STYLES[c];
                let cls = `${s.bg} ${s.border} hover:scale-105`;
                if (answered && c === requests[round].correctCluster) cls = "bg-green-900/30 border-green-500";
                else if (answered && c === selected) cls = "bg-red-900/30 border-red-500";
                else if (answered) cls = "bg-slate-800/30 border-slate-700 opacity-50";
                return (
                  <button key={c} onClick={() => handleRoute(c)} disabled={answered}
                    className={`border rounded-xl p-4 text-center cursor-pointer transition-all ${cls}`}>
                    <Globe2 size={20} className={`mx-auto mb-1 ${s.color}`} />
                    <span className={`font-bold text-sm ${s.color}`}>{s.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Chef de Cluster certifié !</p>
          : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="cluster" icon={<Boxes size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Boxes className="w-8 h-8 text-slate-900" />} xp={150} badge={t.badges.cluster}
      content={t.cluster} nextModuleLink="/infrastructure/jito" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
