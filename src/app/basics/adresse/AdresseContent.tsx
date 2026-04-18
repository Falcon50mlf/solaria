"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

// Base58 charset (no 0, O, I, l)
const BASE58 = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const INVALID_CHARS = "0OIl";

function randomBase58(len: number) {
  return Array.from({ length: len }, () => BASE58[Math.floor(Math.random() * 58)]).join("");
}

function generateAddress(): { address: string; valid: boolean } {
  const isValid = Math.random() > 0.4;
  if (isValid) {
    const len = 32 + Math.floor(Math.random() * 13); // 32-44
    return { address: randomBase58(len), valid: true };
  }
  // Invalid: insert forbidden chars or wrong length
  const flaw = Math.random();
  if (flaw < 0.5) {
    // Insert forbidden char
    const len = 32 + Math.floor(Math.random() * 13);
    const arr = randomBase58(len).split("");
    const pos = Math.floor(Math.random() * len);
    arr[pos] = INVALID_CHARS[Math.floor(Math.random() * 4)];
    return { address: arr.join(""), valid: false };
  }
  // Wrong length (too short or too long)
  const len = Math.random() > 0.5 ? 10 + Math.floor(Math.random() * 15) : 50 + Math.floor(Math.random() * 10);
  return { address: randomBase58(len), valid: false };
}

const TOTAL_ROUNDS = 10;

export default function AdresseContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [round, setRound] = useState(0);
  const [current, setCurrent] = useState(() => generateAddress());
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const passed = gameOver && score >= Math.ceil(TOTAL_ROUNDS * 0.7);

  const nextRound = useCallback(() => {
    if (round + 1 >= TOTAL_ROUNDS) {
      setGameOver(true);
      timer.stop();
      return;
    }
    setRound((r) => r + 1);
    setCurrent(generateAddress());
    setAnswered(false);
    setLastCorrect(null);
  }, [round, timer]);

  const handleAnswer = (userSaysValid: boolean) => {
    if (answered) return;
    setAnswered(true);
    const correct = userSaysValid === current.valid;
    setLastCorrect(correct);
    if (correct) setScore((s) => s + 1);
    setTimeout(nextRound, 800);
  };

  useEffect(() => {
    if (!startedRef.current) return;
    // Auto-generate on mount already handled by useState initializer
  }, []);

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">
          Adresse Valide ou Invalide ?
        </h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>

      {/* Progress */}
      <div className="flex gap-1 mb-6">
        {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${
            i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"
          }`} />
        ))}
      </div>

      {!gameOver ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={round}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            {/* Address display */}
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-6 mb-6">
              <p className="text-xs text-slate-400 mb-2 uppercase tracking-wider">Adresse #{round + 1}</p>
              <p className="font-mono text-sm sm:text-base text-white break-all leading-relaxed">
                {current.address.split("").map((char, i) => (
                  <span
                    key={i}
                    className={INVALID_CHARS.includes(char) && answered ? "text-red-400 font-bold underline" : ""}
                  >
                    {char}
                  </span>
                ))}
              </p>
              <p className="text-xs text-slate-500 mt-2">{current.address.length} caractères</p>
            </div>

            {/* Feedback */}
            {answered && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`text-center mb-4 p-3 rounded-lg ${lastCorrect ? "bg-green-900/30 text-green-400" : "bg-red-900/30 text-red-400"}`}
              >
                {lastCorrect ? <Check className="inline w-5 h-5 mr-2" /> : <X className="inline w-5 h-5 mr-2" />}
                {lastCorrect ? "Correct !" : current.valid ? "C'était valide !" : `Invalide — ${current.address.length < 32 || current.address.length > 44 ? "longueur incorrecte" : "caractère interdit détecté"}`}
              </motion.div>
            )}

            {/* Buttons */}
            {!answered && (
              <div className="grid grid-cols-2 gap-4">
                <button
                  onClick={() => handleAnswer(true)}
                  className="bg-green-900/30 border border-green-500/50 hover:border-green-400 rounded-xl p-4 text-center cursor-pointer transition-colors"
                >
                  <Check className="w-8 h-8 mx-auto mb-2 text-green-400" />
                  <span className="text-green-400 font-bold">Valide</span>
                </button>
                <button
                  onClick={() => handleAnswer(false)}
                  className="bg-red-900/30 border border-red-500/50 hover:border-red-400 rounded-xl p-4 text-center cursor-pointer transition-colors"
                >
                  <X className="w-8 h-8 mx-auto mb-2 text-red-400" />
                  <span className="text-red-400 font-bold">Invalide</span>
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}
          >
            {score}/{TOTAL_ROUNDS}
          </motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? (
            <p className="text-slate-300 mb-4">Vous savez repérer les adresses Solana !</p>
          ) : (
            <div>
              <p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button
                onClick={() => {
                  setRound(0); setScore(0); setAnswered(false); setLastCorrect(null);
                  setGameOver(false); setCurrent(generateAddress());
                  startedRef.current = false; timer.reset();
                }}
                className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer"
              >
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
      moduleId="adresse"
      icon={<MapPin size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<MapPin className="w-8 h-8 text-slate-900" />}
      xp={110}
      badge={t.badges.adresse}
      content={t.adresse}
      nextModuleLink="/basics/networks"
      gameSlide={gameSlide}
      gameCompleted={passed}
    />
  );
}
