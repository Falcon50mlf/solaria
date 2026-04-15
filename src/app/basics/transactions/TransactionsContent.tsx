'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  ArrowDown,
  CheckCircle2,
  Trophy,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { SlideLayout } from '@/components/SlideLayout';

const generateAddress = (): string => {
  const chars = '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  return Array.from({ length: 44 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
};

const generateTxHash = (): string => {
  return Array.from({ length: 64 }, () => Math.floor(Math.random() * 16).toString(16)).join('');
};

export default function TransactionsContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const [senderAddress] = useState(generateAddress());
  const [receiverAddress] = useState(generateAddress());
  const [amount, setAmount] = useState('');
  const [isSigning, setIsSigning] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [txHash, setTxHash] = useState('');
  const [balance, setBalance] = useState(10);
  const [signingProgress, setSigningProgress] = useState(0);
  const [moduleCompleted, setModuleCompleted] = useState(false);

  const isAlreadyCompleted = gameState?.modules?.find(m => m.id === 'transactions')?.completed;

  const handleSign = async () => {
    const amt = parseFloat(amount);
    if (isNaN(amt) || amt <= 0 || amt > balance) return;
    setIsSigning(true);
    setSigningProgress(0);
    const interval = setInterval(() => {
      setSigningProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 40);
    await new Promise(r => setTimeout(r, 2000));
    clearInterval(interval);
    setSigningProgress(100);
    setTxHash(generateTxHash());
    setBalance(prev => Math.round((prev - amt - 0.000005) * 1000000) / 1000000);
    setIsSigning(false);
    setIsConfirmed(true);
  };

  const canSign = !isSigning && !isConfirmed && amount !== '' && parseFloat(amount) > 0 && parseFloat(amount) <= balance;

  // Slide 1: Story intro + analogy
  const slide1 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.transactions.headerTitle}
      </h2>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-slate-200 leading-relaxed">{t.transactions.storyIntro}</p>
      </div>
      <div className="bg-purple-900/30 border border-purple-500/30 rounded-xl p-4 sm:p-5">
        <p className="text-slate-300 leading-relaxed italic">{t.transactions.storyAnalogy}</p>
      </div>
    </div>
  );

  // Slide 2: Transaction definition + key concepts + big stat
  const slide2 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.transactions.defTransactionTitle}
      </h2>
      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-indigo-400 font-bold text-lg mb-2">{t.transactions.defTransactionTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.transactions.defTransactionText}</p>
      </div>
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-purple-400 font-bold text-lg mb-2">{t.transactions.keyConceptsTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.transactions.keyConceptsText}</p>
      </div>
      <div className="bg-slate-800/50 border border-[var(--sol-green)]/30 rounded-xl p-5 text-center">
        <p className="text-sm text-slate-400 mb-1">{t.transactions.phase2FeesLabel}</p>
        <p className="text-4xl sm:text-5xl font-bold font-mono text-[var(--sol-green)]">0.000005 SOL</p>
      </div>
    </div>
  );

  // Slide 3: Did you know + summary
  const slide3 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.transactions.didYouKnowTitle}
      </h2>
      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-amber-400 font-bold text-lg mb-2">{t.transactions.didYouKnowTitle}</p>
        <p className="text-slate-300 leading-relaxed">{t.transactions.didYouKnowText}</p>
      </div>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5">
        <p className="text-slate-200 leading-relaxed">{t.transactions.storySummary}</p>
      </div>
    </div>
  );

  // Slide 4: Transaction simulator
  const slide4 = (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)] mb-2">
        {t.transactions.phase2Title}
      </h2>
      <p className="text-slate-400 mb-4 text-sm">{t.transactions.phase2Subtitle}</p>

      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-slate-200 leading-relaxed text-sm">{t.transactions.phase2Narrative}</p>
      </div>

      {!isConfirmed && (
        <>
          <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 space-y-4 mb-4">
            {/* From */}
            <div>
              <label className="text-sm text-slate-400 mb-1 block">{t.transactions.phase2FromLabel}</label>
              <div className="bg-slate-900/50 rounded-lg p-3 border border-slate-700">
                <p className="font-mono text-green-400 text-xs sm:text-sm break-all">{senderAddress}</p>
                <p className="text-sm text-slate-400 mt-1">{balance} SOL</p>
              </div>
            </div>

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
              className="mb-4"
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
              setModuleCompleted(true);
            }}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-3 rounded-lg font-bold text-lg transition-colors"
          >
            {t.transactions.phase2FinishButton}
          </button>
        </motion.div>
      )}
    </div>
  );

  // Slide 5: Reveal / completion
  const slide5 = (
    <div>
      <div className="text-center mb-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
          className="inline-block mb-4"
        >
          <Trophy className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
        </motion.div>
        <h2 className="text-2xl sm:text-3xl font-bold mb-2">{t.common.congratulations}</h2>
        <p className="text-lg text-slate-300">{t.transactions.revealSubtitle}</p>
      </div>

      {/* Badge */}
      <div className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-700/50 rounded-xl p-5 mb-6 text-center">
        <div className="inline-block bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-4 mb-3">
          <Send className="w-8 h-8 text-slate-900" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-1">
          {t.badges.transactions}
        </h3>
        <p className="text-slate-300 mb-1">+140 XP</p>
        <p className="text-sm text-slate-400">{t.transactions.revealSubtitle}</p>
      </div>

      {/* Key points */}
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5 mb-6">
        <p className="text-purple-400 font-bold text-lg mb-3">{t.transactions.keyPointsTitle}</p>
        <ul className="space-y-2 text-slate-300">
          {t.transactions.keyPoints.map((point, i) => (
            <li key={i} className="flex items-start gap-2">
              <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
              <span>{point}</span>
            </li>
          ))}
        </ul>
      </div>

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
    </div>
  );

  const slides = isAlreadyCompleted || moduleCompleted
    ? [slide1, slide2, slide3, slide4, slide5]
    : [slide1, slide2, slide3, slide4];

  return (
    <SlideLayout
      moduleTitle={t.transactions.headerTitle}
      moduleXp={140}
      backLink="/basics"
      backLabel={t.transactions.backToBasics}
      icon={<Send size={18} className="text-purple-400" />}
      slides={slides}
    />
  );
}
