'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  ArrowRight,
  CheckCircle2,
  Trophy,
  ChevronRight,
  ArrowDown,
} from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { TopBar } from '@/components/TopBar';

const generateAddress = (): string => {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  return Array.from({ length: 44 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const generateTxHash = (): string => {
  return Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

type Phase = 'story' | 'minigame' | 'reveal';

export default function TransactionsContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const [phase, setPhase] = useState<Phase>('story');
  const [senderAddress] = useState(generateAddress());
  const [receiverAddress] = useState(generateAddress());
  const [amount, setAmount] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [balance, setBalance] = useState(10);
  const [signingProgress, setSigningProgress] = useState(0);

  // Check if transactions module is already completed
  useEffect(() => {
    const mod = gameState?.modules?.find(m => m.id === 'transactions');
    if (mod?.completed) setPhase('reveal');
  }, [gameState]);

  const handleSign = async () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0 || amt > balance) return;
    setIsSigning(true);
    setSigningProgress(0);
    // Animate progress bar
    const interval = setInterval(() => {
      setSigningProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    // Simulate signing delay
    await new Promise(r => setTimeout(r, 2000));
    clearInterval(interval);
    setSigningProgress(100);
    setTxHash(generateTxHash());
    setBalance(prev => Math.round((prev - amt - 0.000005) * 1000000) / 1000000);
    setIsSigning(false);
    setIsConfirmed(true);
  };

  const canSign = !isSigning && !isConfirmed && amount !== '' && parseFloat(amount) > 0 && parseFloat(amount) <= balance;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      <TopBar />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/basics"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            {t.transactions.backToBasics}
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <Send className="w-8 h-8 text-purple-400" />
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold">{t.transactions.headerTitle}</h1>
          </div>
          <p className="text-slate-400">
            {t.transactions.headerSubtitle}
          </p>
        </div>

        <AnimatePresence mode="wait">
          {/* PHASE 1: STORY */}
          {phase === 'story' && (
            <motion.div
              key="phase-story"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 mb-8">
                <p className="text-base sm:text-xl md:text-2xl mb-8 leading-relaxed text-slate-200">
                  {t.transactions.storyIntro}
                </p>
              </div>

              {/* Analogy box */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-slate-800/50 border border-purple-500/50 rounded-lg p-6 mb-8"
              >
                <p className="text-lg text-slate-200 leading-relaxed">
                  {t.transactions.storyAnalogy}
                </p>
              </motion.div>

              {/* Educational boxes */}
              <div className="space-y-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5"
                >
                  <p className="text-indigo-400 font-bold text-lg mb-2">
                    {t.transactions.defTransactionTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.transactions.defTransactionText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
                >
                  <p className="text-purple-400 font-bold text-lg mb-2">
                    {t.transactions.keyConceptsTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.transactions.keyConceptsText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5"
                >
                  <p className="text-amber-400 font-bold text-lg mb-2">
                    {t.transactions.didYouKnowTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.transactions.didYouKnowText}
                  </p>
                </motion.div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
                <p className="text-lg text-slate-200 mb-2">
                  {t.transactions.storySummary}
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setPhase('minigame')}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                {t.transactions.storyNextButton}
                <ArrowRight className="inline ml-2 w-5 h-5" />
              </motion.button>
            </motion.div>
          )}

          {/* PHASE 2: MINIGAME */}
          {phase === 'minigame' && (
            <motion.div
              key="phase-minigame"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">
                  {t.transactions.phase2Title}
                </h2>
                <p className="text-slate-400">
                  {t.transactions.phase2Subtitle}
                </p>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 mb-6">
                <p className="text-lg text-slate-200 mb-6 leading-relaxed">
                  {t.transactions.phase2Narrative}
                </p>
              </div>

              {!isConfirmed && (
                <>
                  {/* Transaction form */}
                  <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 sm:p-6 space-y-5 mb-6">
                    {/* From */}
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">{t.transactions.phase2FromLabel}</label>
                      <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                        <p className="font-mono text-green-400 text-xs sm:text-sm break-all">{senderAddress}</p>
                        <p className="text-sm text-slate-400 mt-1">{balance} SOL</p>
                      </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex justify-center">
                      <ArrowDown className="text-purple-400" size={24} />
                    </div>

                    {/* To */}
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">{t.transactions.phase2ToLabel}</label>
                      <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                        <p className="font-mono text-blue-400 text-xs sm:text-sm break-all">{receiverAddress}</p>
                      </div>
                    </div>

                    {/* Amount */}
                    <div>
                      <label className="text-sm text-slate-400 mb-1 block">{t.transactions.phase2AmountLabel}</label>
                      <input
                        type="number"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder={t.transactions.phase2AmountPlaceholder}
                        min="0.001"
                        max={balance.toString()}
                        step="0.1"
                        disabled={isSigning || isConfirmed}
                        className="w-full bg-slate-900/50 border border-slate-700 rounded-lg p-3 text-white font-mono focus:border-purple-500 focus:outline-none disabled:opacity-50"
                      />
                    </div>

                    {/* Fees */}
                    <div className="flex justify-between items-center bg-slate-900/30 rounded-lg p-3 border border-slate-700/50">
                      <span className="text-sm text-slate-400">{t.transactions.phase2FeesLabel}</span>
                      <span className="text-sm font-mono text-amber-400">0.000005 SOL</span>
                    </div>
                  </div>

                  {/* Signing animation */}
                  {isSigning && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mb-6"
                    >
                      <p className="text-purple-400 font-semibold mb-3 text-center">{t.transactions.phase2Signing}</p>
                      <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
                        <motion.div
                          className="h-full bg-gradient-to-r from-purple-500 to-purple-400 rounded-full"
                          style={{ width: `${signingProgress}%` }}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Sign button */}
                  <motion.button
                    whileHover={{ scale: canSign ? 1.02 : 1 }}
                    whileTap={{ scale: canSign ? 0.98 : 1 }}
                    disabled={!canSign}
                    onClick={handleSign}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                      canSign
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 cursor-pointer'
                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    <Send className="inline mr-2 w-5 h-5" />
                    {t.transactions.phase2SignButton}
                  </motion.button>
                </>
              )}

              {/* Confirmation */}
              {isConfirmed && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-green-900/30 border border-green-500/50 rounded-xl p-6 text-center"
                >
                  <CheckCircle2 size={48} className="text-green-400 mx-auto mb-3" />
                  <h3 className="text-xl sm:text-2xl font-bold text-green-400 mb-2">{t.transactions.phase2Confirmed}</h3>
                  <p className="text-slate-300 mb-4">{t.transactions.phase2ConfirmedText}</p>
                  <div className="bg-slate-900/50 rounded-lg p-3 mb-4">
                    <p className="text-xs text-slate-400 mb-1">{t.transactions.phase2TxHash}</p>
                    <p className="font-mono text-xs text-purple-400 break-all">{txHash}</p>
                  </div>
                  <button
                    onClick={() => {
                      completeModule('transactions', 140);
                      setPhase('reveal');
                    }}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-3 rounded-lg font-bold text-lg transition-colors"
                  >
                    {t.transactions.phase2FinishButton}
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* PHASE 3: REVEAL */}
          {phase === 'reveal' && (
            <motion.div
              key="phase-reveal"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Congratulations */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center mb-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                  className="inline-block mb-4"
                >
                  <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
                </motion.div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2">
                  {t.common.congratulations}
                </h2>
                <p className="text-xl text-slate-300">
                  {t.transactions.revealSubtitle}
                </p>
              </motion.div>

              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-700/50 rounded-lg p-6 mb-8 text-center"
              >
                <div className="inline-block bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-4 mb-4">
                  <Send className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
                  {t.badges.transactions}
                </h3>
                <p className="text-slate-300 mb-2">+140 XP</p>
                <p className="text-sm text-slate-400">
                  {t.transactions.revealSubtitle}
                </p>
              </motion.div>

              {/* Narrative */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 mb-8">
                <p className="text-lg md:text-xl leading-relaxed text-slate-200 mb-4">
                  {t.transactions.revealNarrative1}
                </p>
                <p className="text-slate-300">
                  {t.transactions.revealNarrative2}
                </p>
              </div>

              {/* Educational boxes */}
              <div className="space-y-4 mb-8">
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5"
                >
                  <p className="text-amber-400 font-bold text-lg mb-2">
                    {t.transactions.didYouKnowRevealTitle}
                  </p>
                  <p className="text-slate-300">
                    {t.transactions.didYouKnowRevealText}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                  className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
                >
                  <p className="text-purple-400 font-bold text-lg mb-3">
                    {t.transactions.keyPointsTitle}
                  </p>
                  <ul className="space-y-2 text-slate-300">
                    {t.transactions.keyPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                        <span>{point}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </div>

              {/* Check if all modules completed */}
              {gameState?.modules?.every((m) => m.completed) && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-lg p-4 sm:p-8 mb-8 text-center"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <Trophy className="w-12 h-12 text-yellow-400 mx-auto" />
                  </motion.div>
                  <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                    {t.seedphrase.allCompletedTitle}
                  </h2>
                  <p className="text-slate-300">
                    {t.seedphrase.allCompletedText}
                  </p>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/basics/consensus"
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 py-4 rounded-lg font-bold text-lg text-center transition-colors flex items-center justify-center gap-2"
                >
                  {t.common.nextModule}
                  <ArrowRight className="w-5 h-5" />
                </Link>
                <Link
                  href="/basics"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg text-center transition-colors"
                >
                  {t.transactions.backToBasics}
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
