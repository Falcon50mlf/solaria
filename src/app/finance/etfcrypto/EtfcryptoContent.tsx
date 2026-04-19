"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LineChart, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface Etf {
  ticker: string;
  issuer: string;
  fee: string;
  trackingError: string;
  aum: string;
  type: string;
}

interface EtfRound {
  investorProfile: string;
  profileDetail: string;
  etfs: Etf[];
  bestIdx: number;
  explanation: string;
}

const ROUNDS: EtfRound[] = [
  {
    investorProfile: "Investisseur conservateur",
    profileDetail: "Retraite proche, priorité à la minimisation des frais et la stabilité de l'émetteur.",
    etfs: [
      { ticker: "IBTC", issuer: "BlackRock (iShares)", fee: "0.25%", trackingError: "0.1%", aum: "$12B", type: "Bitcoin Spot" },
      { ticker: "FBTC", issuer: "Fidelity", fee: "0.25%", trackingError: "0.2%", aum: "$8B", type: "Bitcoin Spot" },
      { ticker: "ARKB", issuer: "ARK Invest", fee: "0.21%", trackingError: "0.8%", aum: "$2B", type: "Bitcoin Spot" },
    ],
    bestIdx: 0,
    explanation: "BlackRock (iShares) avec $12B d'AUM, tracking error minimal (0.1%) et frais faibles = idéal pour un conservateur qui veut stabilité et liquidité.",
  },
  {
    investorProfile: "Trader actif",
    profileDetail: "Trading intraday, besoin de spreads très serrés et volume élevé.",
    etfs: [
      { ticker: "GBTC", issuer: "Grayscale", fee: "1.5%", trackingError: "1.2%", aum: "$15B", type: "Bitcoin Trust" },
      { ticker: "IBTC", issuer: "BlackRock", fee: "0.25%", trackingError: "0.1%", aum: "$12B", type: "Bitcoin Spot" },
      { ticker: "BTCO", issuer: "Invesco", fee: "0.25%", trackingError: "0.3%", aum: "$1.5B", type: "Bitcoin Spot" },
    ],
    bestIdx: 1,
    explanation: "Pour un trader actif, IBTC (BlackRock) offre le plus grand AUM ($12B), les spreads les plus serrés et les frais les plus bas.",
  },
  {
    investorProfile: "Investisseur institutionnel",
    profileDetail: "Fonds de pension, exige rapport mensuel détaillé, AUM > $5B, émetteur réglementé Tier-1.",
    etfs: [
      { ticker: "FBTC", issuer: "Fidelity", fee: "0.25%", trackingError: "0.2%", aum: "$8B", type: "Bitcoin Spot" },
      { ticker: "ARKB", issuer: "ARK Invest", fee: "0.21%", trackingError: "0.8%", aum: "$2B", type: "Bitcoin Spot" },
      { ticker: "HODL", issuer: "VanEck", fee: "0.20%", trackingError: "0.5%", aum: "$800M", type: "Bitcoin Spot" },
    ],
    bestIdx: 0,
    explanation: "Fidelity (FBTC) répond aux critères institutionnels : $8B d'AUM, émetteur Tier-1, frais compétitifs et tracking error faible.",
  },
  {
    investorProfile: "Investisseur cost-conscious",
    profileDetail: "DCA mensuel, priorité absolue aux frais minimaux sur le long terme.",
    etfs: [
      { ticker: "IBTC", issuer: "BlackRock", fee: "0.25%", trackingError: "0.1%", aum: "$12B", type: "Bitcoin Spot" },
      { ticker: "ARKB", issuer: "ARK Invest", fee: "0.21%", trackingError: "0.8%", aum: "$2B", type: "Bitcoin Spot" },
      { ticker: "BTCW", issuer: "WisdomTree", fee: "0.30%", trackingError: "0.4%", aum: "$600M", type: "Bitcoin Spot" },
    ],
    bestIdx: 1,
    explanation: "ARKB a les frais les plus bas (0.21%), crucial pour un DCA mensuel sur le long terme — même si le tracking error est plus élevé.",
  },
  {
    investorProfile: "Investisseur crypto-natif diversifié",
    profileDetail: "Veut une exposition diversifiée BTC + ETH en un seul produit.",
    etfs: [
      { ticker: "IBTC", issuer: "BlackRock Bitcoin", fee: "0.25%", trackingError: "0.1%", aum: "$12B", type: "Bitcoin only" },
      { ticker: "ETHA", issuer: "BlackRock Ethereum", fee: "0.25%", trackingError: "0.2%", aum: "$3B", type: "Ethereum only" },
      { ticker: "HODL2", issuer: "VanEck Multi-Asset", fee: "0.45%", trackingError: "0.6%", aum: "$500M", type: "BTC + ETH" },
    ],
    bestIdx: 2,
    explanation: "Pour une exposition BTC + ETH en un seul produit, le multi-asset ETF VanEck est le seul qui combine les deux — malgré des frais plus élevés.",
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function EtfcryptoContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(ROUNDS));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const handleSelect = (idx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(idx);
    if (idx === current.bestIdx) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 1800);
  };

  const retry = () => {
    setRound(0); setScore(0); setSelected(null); setAnswered(false); setGameOver(false);
    startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">ETF Comparator</h2>
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
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-3 mb-3">
              <p className="text-xs font-bold text-purple-300 mb-1">{current.investorProfile}</p>
              <p className="text-xs text-slate-300">{current.profileDetail}</p>
            </div>
            <p className="text-xs text-slate-400 mb-2">Quel ETF recommander ?</p>
            <div className="space-y-2">
              {current.etfs.map((etf, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && idx === current.bestIdx) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between mb-1">
                      <div>
                        <span className="font-bold text-white text-sm">{etf.ticker}</span>
                        <span className="text-xs text-slate-400 ml-2">— {etf.issuer}</span>
                      </div>
                      {answered && (idx === current.bestIdx
                        ? <Check size={14} className="text-green-400" />
                        : idx === selected ? <X size={14} className="text-red-400" /> : null)}
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-xs text-slate-400">
                      <span>💸 {etf.fee}</span>
                      <span>📊 TE: {etf.trackingError}</span>
                      <span>💰 {etf.aum}</span>
                      <span>🏷️ {etf.type}</span>
                    </div>
                  </button>
                );
              })}
            </div>
            {answered && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs p-3 rounded-lg border border-amber-500/30 bg-amber-900/20 text-amber-300 mt-3">
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
          {passed ? <p className="text-slate-300 mb-4">Expert ETF certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="etfcrypto" icon={<LineChart size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<LineChart className="w-8 h-8 text-slate-900" />} xp={140} badge={t.badges.etfcrypto}
      content={t.etfcrypto} nextModuleLink="/finance/apyapr" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
