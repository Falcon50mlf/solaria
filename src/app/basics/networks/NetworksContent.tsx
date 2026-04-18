"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe2, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface TxScenario {
  description: string;
  hint: string;
  correctNetwork: "mainnet" | "devnet" | "testnet";
}

function generateScenarios(): TxScenario[] {
  const pool: TxScenario[] = [
    { description: "Acheter 10 SOL sur Jupiter", hint: "Valeur réelle", correctNetwork: "mainnet" },
    { description: "Tester un smart contract en cours de développement", hint: "SOL gratuits via faucet", correctNetwork: "devnet" },
    { description: "Valider une nouvelle version du protocole Solana", hint: "Phase de test validateurs", correctNetwork: "testnet" },
    { description: "Mint d'un NFT vendu 2 SOL", hint: "Transaction réelle", correctNetwork: "mainnet" },
    { description: "Débugger une erreur dans votre programme Anchor", hint: "Environnement développeur", correctNetwork: "devnet" },
    { description: "Tester le comportement d'un validateur après upgrade v2.1", hint: "Essai protocole", correctNetwork: "testnet" },
    { description: "Envoyer 500 SOL à un exchange pour vendre", hint: "Argent réel", correctNetwork: "mainnet" },
    { description: "Déployer votre premier programme Hello World", hint: "Premier déploiement test", correctNetwork: "devnet" },
    { description: "Simuler la charge réseau pour mesurer les performances", hint: "Stress test validateurs", correctNetwork: "testnet" },
    { description: "Staker 100 SOL chez un validateur pour gagner des rewards", hint: "Rendement réel", correctNetwork: "mainnet" },
    { description: "Tester l'intégration de votre wallet dans votre dApp", hint: "Dev & test", correctNetwork: "devnet" },
    { description: "Participer au programme de test de Firedancer", hint: "Nouveau client validateur", correctNetwork: "testnet" },
    { description: "Swap USDC → SOL pour payer vos frais de transaction", hint: "Usage quotidien", correctNetwork: "mainnet" },
    { description: "Réclamer des SOL gratuits pour vos tests", hint: "Faucet disponible", correctNetwork: "devnet" },
  ];
  // Shuffle and pick 8
  const shuffled = pool.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 8);
}

const NETWORK_COLORS = {
  mainnet: { bg: "bg-green-900/30", border: "border-green-500/50", text: "text-green-400", label: "Mainnet" },
  devnet: { bg: "bg-blue-900/30", border: "border-blue-500/50", text: "text-blue-400", label: "Devnet" },
  testnet: { bg: "bg-amber-900/30", border: "border-amber-500/50", text: "text-amber-400", label: "Testnet" },
};

export default function NetworksContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [scenarios] = useState(() => generateScenarios());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [selectedNetwork, setSelectedNetwork] = useState<string | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const total = scenarios.length;
  const passed = gameOver && score >= Math.ceil(total * 0.7);

  const handleAnswer = useCallback((network: "mainnet" | "devnet" | "testnet") => {
    if (answered) return;
    setAnswered(true);
    setSelectedNetwork(network);
    const correct = network === scenarios[round].correctNetwork;
    setLastCorrect(correct);
    if (correct) setScore((s) => s + 1);
    setTimeout(() => {
      if (round + 1 >= total) {
        setGameOver(true);
        timer.stop();
      } else {
        setRound((r) => r + 1);
        setAnswered(false);
        setLastCorrect(null);
        setSelectedNetwork(null);
      }
    }, 1000);
  }, [answered, round, total, scenarios, timer]);

  const retry = () => {
    setRound(0); setScore(0); setAnswered(false); setLastCorrect(null);
    setSelectedNetwork(null); setGameOver(false);
    startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Route la Transaction</h2>
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
              <p className="text-white font-medium mb-2">{scenarios[round].description}</p>
              <p className="text-xs text-slate-400 italic">Indice : {scenarios[round].hint}</p>
            </div>

            {answered && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className={`text-center mb-4 p-3 rounded-lg ${lastCorrect ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}>
                {lastCorrect ? <Check className="inline w-5 h-5 mr-1" /> : <X className="inline w-5 h-5 mr-1" />}
                {lastCorrect ? "Correct !" : `C'était ${NETWORK_COLORS[scenarios[round].correctNetwork].label}`}
              </motion.div>
            )}

            <div className="grid grid-cols-3 gap-3">
              {(["mainnet", "devnet", "testnet"] as const).map((net) => {
                const c = NETWORK_COLORS[net];
                const isSelected = selectedNetwork === net;
                const isCorrectAnswer = answered && net === scenarios[round].correctNetwork;
                return (
                  <button key={net} onClick={() => handleAnswer(net)} disabled={answered}
                    className={`${c.bg} border ${isCorrectAnswer ? "border-green-400" : isSelected && !lastCorrect ? "border-red-400" : c.border} rounded-xl p-4 text-center cursor-pointer transition-all ${answered ? "" : "hover:scale-105"}`}>
                    <span className={`font-bold text-sm ${c.text}`}>{c.label}</span>
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
          {passed ? (
            <p className="text-slate-300 mb-4">Vous naviguez entre les réseaux comme un pro !</p>
          ) : (
            <div>
              <p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">
                Réessayer
              </button>
            </div>
          )}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule
      moduleId="networks"
      icon={<Globe2 size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Globe2 className="w-8 h-8 text-slate-900" />}
      xp={120}
      badge={t.badges.networks}
      content={t.networks}
      nextModuleLink="/basics/signature"
      gameSlide={gameSlide}
      gameCompleted={passed}
    />
  );
}
