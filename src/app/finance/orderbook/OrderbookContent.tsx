"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface OrderbookLevel {
  price: number;
  size: number;
}

interface OrderbookRound {
  pair: string;
  bids: OrderbookLevel[];
  asks: OrderbookLevel[];
  question: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

function generateRounds(): OrderbookRound[] {
  const rounds: OrderbookRound[] = [
    {
      pair: "SOL/USDC",
      bids: [
        { price: 145.50, size: 120 },
        { price: 145.40, size: 350 },
        { price: 145.30, size: 80 },
        { price: 145.20, size: 200 },
        { price: 145.10, size: 450 },
      ],
      asks: [
        { price: 145.60, size: 90 },
        { price: 145.70, size: 280 },
        { price: 145.80, size: 150 },
        { price: 145.90, size: 420 },
        { price: 146.00, size: 110 },
      ],
      question: "Quel est le meilleur prix d'achat (best ask) ?",
      options: ["145.50", "145.60", "145.40", "146.00"],
      correctIdx: 1,
      explanation: "Le best ask est le prix minimum auquel un vendeur accepte de vendre. Ici 145.60 USDC — le premier niveau côté ask.",
    },
    {
      pair: "BTC/USDC",
      bids: [
        { price: 62500, size: 0.5 },
        { price: 62450, size: 1.2 },
        { price: 62400, size: 0.8 },
        { price: 62350, size: 2.1 },
        { price: 62300, size: 0.3 },
      ],
      asks: [
        { price: 62550, size: 0.7 },
        { price: 62600, size: 1.5 },
        { price: 62650, size: 0.9 },
        { price: 62700, size: 2.3 },
        { price: 62750, size: 0.4 },
      ],
      question: "Quel est le spread bid/ask ?",
      options: ["$100", "$50", "$150", "$200"],
      correctIdx: 1,
      explanation: "Spread = Best Ask - Best Bid = 62550 - 62500 = $50. Spread serré pour BTC, signe de forte liquidité.",
    },
    {
      pair: "SOL/USDC",
      bids: [
        { price: 148.20, size: 200 },
        { price: 148.10, size: 150 },
        { price: 148.00, size: 300 },
        { price: 147.90, size: 100 },
        { price: 147.80, size: 250 },
      ],
      asks: [
        { price: 148.30, size: 180 },
        { price: 148.40, size: 220 },
        { price: 148.50, size: 90 },
        { price: 148.60, size: 310 },
        { price: 148.70, size: 140 },
      ],
      question: "Quelle est la profondeur totale côté bid (5 niveaux) ?",
      options: ["900 SOL", "1000 SOL", "1200 SOL", "800 SOL"],
      correctIdx: 1,
      explanation: "Profondeur bid = 200 + 150 + 300 + 100 + 250 = 1000 SOL au total sur les 5 niveaux bid.",
    },
    {
      pair: "ETH/USDC",
      bids: [
        { price: 3480, size: 5 },
        { price: 3475, size: 8 },
        { price: 3470, size: 3 },
        { price: 3465, size: 12 },
        { price: 3460, size: 6 },
      ],
      asks: [
        { price: 3485, size: 4 },
        { price: 3490, size: 10 },
        { price: 3495, size: 7 },
        { price: 3500, size: 15 },
        { price: 3505, size: 2 },
      ],
      question: "Quel est le meilleur prix de vente (best bid) ?",
      options: ["3475", "3460", "3480", "3485"],
      correctIdx: 2,
      explanation: "Le best bid est le prix maximum auquel un acheteur veut acheter. Ici 3480 USDC — le premier niveau côté bid.",
    },
    {
      pair: "RAY/USDC",
      bids: [
        { price: 2.850, size: 5000 },
        { price: 2.840, size: 8000 },
        { price: 2.830, size: 3000 },
        { price: 2.820, size: 12000 },
        { price: 2.810, size: 6000 },
      ],
      asks: [
        { price: 2.860, size: 4000 },
        { price: 2.870, size: 10000 },
        { price: 2.880, size: 7000 },
        { price: 2.890, size: 15000 },
        { price: 2.900, size: 2000 },
      ],
      question: "Quel est le spread en pourcentage ?",
      options: ["0.07%", "0.35%", "0.5%", "1.2%"],
      correctIdx: 1,
      explanation: "Spread = (2.860 - 2.850) / 2.850 × 100 = 0.010/2.850 × 100 ≈ 0.35%. Spread normal pour un token mid-cap.",
    },
  ];
  return rounds.sort(() => Math.random() - 0.5);
}

export default function OrderbookContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => generateRounds());
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
    if (idx === current.correctIdx) setScore(s => s + 1);
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
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Orderbook Reader</h2>
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
              <p className="text-xs text-slate-400 mb-2 font-bold">{current.pair} — Orderbook</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-red-400 font-bold mb-1 text-center">ASK (vente)</div>
                  {[...current.asks].reverse().map((a, i) => (
                    <div key={i} className="flex justify-between text-red-300/80 font-mono">
                      <span>{a.price}</span>
                      <span className="text-slate-400">{a.size}</span>
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-green-400 font-bold mb-1 text-center">BID (achat)</div>
                  {current.bids.map((b, i) => (
                    <div key={i} className="flex justify-between text-green-300/80 font-mono">
                      <span>{b.price}</span>
                      <span className="text-slate-400">{b.size}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <p className="text-xs text-white font-medium mb-2">{current.question}</p>
            <div className="grid grid-cols-2 gap-2">
              {current.options.map((opt, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && idx === current.correctIdx) cls = "border-green-500 bg-green-900/20";
                else if (answered && idx === selected) cls = "border-red-500 bg-red-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-60";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`border rounded-xl p-3 text-center transition-all ${cls}`}>
                    <div className="font-mono font-bold text-white">{opt}</div>
                    {answered && (idx === current.correctIdx
                      ? <Check size={14} className="text-green-400 mx-auto mt-1" />
                      : idx === selected ? <X size={14} className="text-red-400 mx-auto mt-1" /> : null)}
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
          {passed ? <p className="text-slate-300 mb-4">Lecteur d&apos;Orderbook certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="orderbook" icon={<BookOpen size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<BookOpen className="w-8 h-8 text-slate-900" />} xp={150} badge={t.badges.orderbook}
      content={t.orderbook} nextModuleLink="/finance/leverage" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
