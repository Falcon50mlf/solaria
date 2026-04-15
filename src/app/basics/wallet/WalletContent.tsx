'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Mail,
  Key,
  ArrowRight,
  CheckCircle2,
  Zap,
  Trophy,
} from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import { useLocale } from '@/lib/useLocale';
import { SlideLayout } from '@/components/SlideLayout';

interface GeneratedWallet {
  entropy: string;
  privateKey: string;
  publicKey: string;
  address: string;
}

// Utility functions
const generateHexString = (length: number): string => {
  return Array.from({ length }, () =>
    Math.floor(Math.random() * 16).toString(16)
  ).join('');
};

const generateBase58Like = (length: number): string => {
  const chars =
    '123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz';
  return Array.from({ length }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
};

const truncateKey = (key: string, visible: number = 6): string => {
  if (key.length <= visible * 2 + 3) return key;
  return `${key.slice(0, visible)}...${key.slice(-visible)}`;
};

export default function WalletContent() {
  const { t } = useLocale();
  const gameState = useGameState();
  const [wallet, setWallet] = useState<GeneratedWallet | null>(null);

  // Entropy tracking
  const entropyCanvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePositions, setMousePositions] = useState<Set<string>>(new Set());
  const [entropyReady, setEntropyReady] = useState(false);
  const positionsRef = useRef<Set<string>>(new Set());

  // Derivation animation
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showPublicKey, setShowPublicKey] = useState(false);
  const [privKeyChars, setPrivKeyChars] = useState(0);
  const [pubKeyChars, setPubKeyChars] = useState(0);

  // Track which slides are unlocked (for gating interactive progression)
  const [maxSlide, setMaxSlide] = useState(0);

  // Derivation step active flag
  const [derivationActive, setDerivationActive] = useState(false);

  // Wallet complete flag
  const [walletCompleted, setWalletCompleted] = useState(false);

  // Check if wallet module is already completed
  useEffect(() => {
    const walletModule = gameState?.modules?.find(m => m.id === 'wallet');
    if (walletModule?.completed) {
      setMaxSlide(5);
    }
  }, [gameState]);

  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = entropyCanvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    const x = Math.round((e.clientX - rect.left) * scaleX);
    const y = Math.round((e.clientY - rect.top) * scaleY);

    if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
      const key = `${Math.floor(x / 4)},${Math.floor(y / 4)}`;

      if (!positionsRef.current.has(key)) {
        positionsRef.current = new Set([...positionsRef.current, key]);
        setMousePositions(positionsRef.current);

        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.fillStyle = `hsla(${Math.random() * 360}, 100%, 50%, 0.6)`;
          ctx.beginPath();
          ctx.arc(x, y, 3, 0, Math.PI * 2);
          ctx.fill();
        }

        if (positionsRef.current.size >= 30) {
          setEntropyReady(true);
        }
      }
    }
  };

  // Animate derivation step
  useEffect(() => {
    if (!derivationActive) return;

    // Animate private key appearance
    if (!showPrivateKey) {
      const timer = setTimeout(() => setShowPrivateKey(true), 500);
      return () => clearTimeout(timer);
    }

    if (showPrivateKey && privKeyChars < 64) {
      const timer = setTimeout(() => setPrivKeyChars((p) => p + 1), 30);
      return () => clearTimeout(timer);
    }

    if (privKeyChars === 64 && !showPublicKey) {
      const timer = setTimeout(() => setShowPublicKey(true), 500);
      return () => clearTimeout(timer);
    }

    if (showPublicKey && pubKeyChars < 64) {
      const timer = setTimeout(() => setPubKeyChars((p) => p + 1), 30);
      return () => clearTimeout(timer);
    }
  }, [derivationActive, showPrivateKey, showPublicKey, privKeyChars, pubKeyChars]);

  const handleEntropyComplete = () => {
    const entropy = generateHexString(32);
    const privateKey = generateHexString(64);
    const publicKey = generateHexString(64);
    const address = generateBase58Like(44);

    setWallet({
      entropy,
      privateKey,
      publicKey,
      address,
    });

    setDerivationActive(true);
    setMaxSlide((prev) => Math.max(prev, 3));
  };

  const handleWalletComplete = async () => {
    await completeModule('wallet', 120);
    setWalletCompleted(true);
    setMaxSlide((prev) => Math.max(prev, 5));
  };

  // Slide 1: Story intro + public/private key analogy cards
  const slide1 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.wallet.headerTitle}
      </h2>
      <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-slate-200 leading-relaxed mb-3">
          {t.wallet.storyIntro}
        </p>
        <p className="text-slate-300 leading-relaxed">
          {t.wallet.storyKeySystem}
        </p>
      </div>

      {/* Public / Private key analogy cards */}
      <div className="grid md:grid-cols-2 gap-4">
        {/* Public Key Card */}
        <div className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/50 rounded-xl p-4 sm:p-5">
          <div className="flex items-center gap-3 mb-3">
            <Mail className="w-7 h-7 text-green-400" />
            <h3 className="text-lg font-bold text-green-400">
              {t.wallet.publicKeyTitle}
            </h3>
          </div>
          <p className="text-slate-300 mb-4 text-sm">
            {t.wallet.publicKeyDesc}
          </p>
          <div className="bg-slate-900/50 rounded p-3 mb-3">
            <p className="text-xs text-slate-400 mb-1">Exemple:</p>
            <p className="font-mono text-green-400 break-all text-sm">
              wallet_address_xyz123...
            </p>
          </div>
          <ul className="space-y-1.5 text-slate-300 text-sm">
            {t.wallet.publicKeyProps.map((prop, i) => (
              <li key={i}>{prop}</li>
            ))}
          </ul>
        </div>

        {/* Private Key Card */}
        <div className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-700/50 rounded-xl p-4 sm:p-5 relative">
          <div className="absolute -top-3 right-4 bg-red-600 px-3 py-1 rounded-full text-xs font-bold">
            {t.wallet.secretLabel}
          </div>
          <div className="flex items-center gap-3 mb-3 mt-2">
            <Lock className="w-7 h-7 text-red-400" />
            <h3 className="text-lg font-bold text-red-400">
              {t.wallet.privateKeyTitle}
            </h3>
          </div>
          <p className="text-slate-300 mb-4 text-sm">
            {t.wallet.privateKeyDesc}
          </p>
          <div className="bg-slate-900/50 rounded p-3 mb-3">
            <p className="text-xs text-slate-400 mb-1">Exemple:</p>
            <p className="font-mono text-red-400 break-all text-xs">
              8f2a9c7e5d1b3f4g6h8j2k4m6n8p0...
            </p>
          </div>
          <ul className="space-y-1.5 text-slate-300 text-sm">
            {t.wallet.privateKeyProps.map((prop, i) => (
              <li key={i}>{prop}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  // Slide 2: Wallet definition + did you know + key concepts
  const slide2 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.wallet.defWalletTitle}
      </h2>

      <div className="space-y-4">
        <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5">
          <p className="text-indigo-400 font-bold text-lg mb-2">
            {t.wallet.defWalletTitle}
          </p>
          <p className="text-slate-300">
            {t.wallet.defWalletText}
          </p>
        </div>

        <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 sm:p-5">
          <p className="text-amber-400 font-bold text-lg mb-2">
            {t.wallet.didYouKnowWalletsTitle}
          </p>
          <p className="text-slate-300">
            {t.wallet.didYouKnowWalletsText}
          </p>
        </div>

        <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5">
          <p className="text-purple-400 font-bold text-lg mb-2">
            {t.wallet.keyConceptsPhantomTitle}
          </p>
          <p className="text-slate-300">
            {t.wallet.keyConceptsPhantomText}
          </p>
        </div>

        <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 sm:p-5">
          <p className="text-slate-200">
            {t.wallet.storySummary}
          </p>
        </div>
      </div>
    </div>
  );

  // Slide 3: Entropy game (canvas with mouse tracking, progress bar)
  const slide3 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-2">
        {t.wallet.entropyTitle}
      </h2>
      <p className="text-slate-400 mb-4">
        {t.wallet.entropySubtitle}
      </p>

      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-indigo-400 font-bold text-lg mb-2">
          {t.wallet.defEntropyTitle}
        </p>
        <p className="text-slate-300">
          {t.wallet.defEntropyText}
        </p>
      </div>

      <div className="mb-4 relative">
        <canvas
          ref={entropyCanvasRef}
          onMouseMove={handleCanvasMouseMove}
          width={400}
          height={300}
          className="w-full bg-slate-950 border-2 border-slate-700 rounded-lg cursor-crosshair"
          style={{ maxWidth: '100%' }}
        />
      </div>

      <div className="mb-4 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-semibold">{t.wallet.entropyCollected}</span>
          <span className="text-purple-400 font-bold">
            {mousePositions.size}/30
          </span>
        </div>
        <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
          <motion.div
            className="bg-gradient-to-r from-purple-500 to-purple-400 h-full"
            animate={{
              width: `${Math.min(
                (mousePositions.size / 30) * 100,
                100
              )}%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence>
        {entropyReady && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 bg-green-900/30 border border-green-700/50 rounded-lg p-4"
          >
            <p className="text-green-400 font-bold text-center">
              {t.wallet.entropyReady}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: entropyReady ? 1.02 : 1 }}
        whileTap={{ scale: entropyReady ? 0.98 : 1 }}
        disabled={!entropyReady}
        onClick={handleEntropyComplete}
        className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
          entropyReady
            ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 cursor-pointer'
            : 'bg-slate-700 text-slate-500 cursor-not-allowed'
        }`}
      >
        {t.common.continue}
        <ArrowRight className="inline ml-2 w-5 h-5" />
      </motion.button>
    </div>
  );

  // Slide 4: Key derivation (animated private key + public key generation)
  const slide4 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-2">
        {t.wallet.derivationTitle}
      </h2>
      <p className="text-slate-400 mb-4">
        {t.wallet.derivationSubtitle}
      </p>

      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-purple-400 font-bold text-lg mb-2">
          {t.wallet.keyConceptsDerivationTitle}
        </p>
        <p className="text-slate-300">
          {t.wallet.keyConceptsDerivationText}
        </p>
      </div>

      {wallet && (
        <div className="space-y-6 mb-6">
          {/* Entropy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-6"
          >
            <p className="text-sm text-slate-400 mb-2">{t.wallet.entropyLabel}</p>
            <p className="font-mono text-slate-300 break-all text-sm">
              {wallet.entropy}
            </p>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-2 text-purple-400">
              <ArrowRight className="w-6 h-6 rotate-90" />
            </div>
          </motion.div>

          {/* Private Key */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showPrivateKey ? 1 : 0 }}
            transition={{ delay: 0.5 }}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-6"
          >
            <p className="text-sm text-slate-400 mb-2">{t.wallet.privateKeyLabel}</p>
            <p className="font-mono text-yellow-400 break-all text-sm">
              {wallet.privateKey.substring(0, privKeyChars)}
              {privKeyChars < 64 && (
                <span className="animate-pulse">&#9611;</span>
              )}
            </p>
          </motion.div>

          {/* Arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showPublicKey ? 1 : 0 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center"
          >
            <div className="flex items-center gap-2 text-purple-400">
              <ArrowRight className="w-6 h-6 rotate-90" />
            </div>
          </motion.div>

          {/* Public Key */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: showPublicKey ? 1 : 0 }}
            transition={{ delay: 1.5 }}
            className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-6"
          >
            <p className="text-sm text-slate-400 mb-2">{t.wallet.publicKeyLabel}</p>
            <p className="font-mono text-green-400 break-all text-sm">
              {wallet.publicKey.substring(0, pubKeyChars)}
              {pubKeyChars < 64 && (
                <span className="animate-pulse">&#9611;</span>
              )}
            </p>
          </motion.div>
        </div>
      )}

      {!wallet && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-6 text-center text-slate-400">
          Complete the entropy step first to see the derivation animation.
        </div>
      )}
    </div>
  );

  // Slide 5: Wallet display (generated address, balance, private key warning)
  const slide5 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-2">
        {t.wallet.walletStepTitle}
      </h2>
      <p className="text-slate-400 mb-4">
        {t.wallet.walletStepSubtitle}
      </p>

      {wallet && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative bg-gradient-to-br from-purple-900/40 to-slate-900/40 backdrop-blur border border-purple-700/50 rounded-xl p-4 sm:p-6 mb-6 shadow-2xl"
        >
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-xl -z-10" />

          {/* Wallet Details */}
          <div className="space-y-5">
            {/* Address */}
            <div>
              <p className="text-sm text-slate-400 mb-2">{t.wallet.addressLabel}</p>
              <div className="bg-slate-900/50 rounded p-3 border border-slate-700/50">
                <p className="font-mono text-green-400 break-all text-xs md:text-sm">
                  {wallet.address}
                </p>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                {t.wallet.addressHint}
              </p>
            </div>

            {/* Public Key */}
            <div>
              <p className="text-sm text-slate-400 mb-2">{t.wallet.publicKeyLabel}</p>
              <div className="bg-slate-900/50 rounded p-3 border border-slate-700/50">
                <p className="font-mono text-green-400 break-all text-xs md:text-sm">
                  {truncateKey(wallet.publicKey, 8)}
                </p>
              </div>
            </div>

            {/* Private Key Warning */}
            <div className="bg-red-900/30 border border-red-700/50 rounded-lg p-4">
              <p className="text-sm text-red-400 font-bold flex items-center gap-2 mb-2">
                <Lock className="w-4 h-4" />
                {t.wallet.privateKeyWarningTitle}
              </p>
              <p className="text-xs text-slate-300">
                {t.wallet.privateKeyWarningText}
              </p>
            </div>

            {/* Balance */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
              <p className="text-sm text-slate-400 mb-1">{t.wallet.balanceLabel}</p>
              <p className="text-2xl sm:text-3xl font-bold text-purple-400">
                0 SOL
              </p>
              <p className="text-xs text-slate-500 mt-1">
                {t.wallet.balanceReady}
              </p>
            </div>
          </div>
        </motion.div>
      )}

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleWalletComplete}
        className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg transition-colors cursor-pointer"
      >
        {t.wallet.finishButton}
        <Trophy className="inline ml-2 w-5 h-5" />
      </motion.button>
    </div>
  );

  // Slide 6: Reveal/completion (badge + recap + next module link)
  const slide6 = (
    <div>
      {/* Congratulations */}
      <div className="text-center mb-6">
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
          {t.wallet.revealSubtitle}
        </p>
      </div>

      {/* Badge */}
      <div className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border border-yellow-700/50 rounded-xl p-5 mb-6 text-center">
        <div className="inline-block bg-gradient-to-br from-yellow-500 to-amber-500 rounded-full p-4 mb-3">
          <Lock className="w-8 h-8 text-slate-900" />
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-yellow-400 mb-2">
          {t.badges.wallet}
        </h3>
        <p className="text-slate-300 mb-2">+120 XP</p>
        <p className="text-sm text-slate-400">
          Vous maîtrisez les fondamentaux des wallets Solana
        </p>
      </div>

      {/* Narrative */}
      <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-xl p-4 sm:p-5 mb-6">
        <p className="text-lg leading-relaxed text-slate-200 mb-3">
          {t.wallet.revealNarrative1}
        </p>
        <p className="text-slate-300">
          {t.wallet.revealNarrative2}
        </p>
      </div>

      {/* Educational boxes */}
      <div className="space-y-4 mb-6">
        <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 sm:p-5">
          <p className="text-amber-400 font-bold text-lg mb-2">
            {t.wallet.didYouKnowActiveTitle}
          </p>
          <p className="text-slate-300">
            {t.wallet.didYouKnowActiveText}
          </p>
        </div>

        <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5">
          <p className="text-purple-400 font-bold text-lg mb-3">
            {t.wallet.keyPointsTitle}
          </p>
          <ul className="space-y-2 text-slate-300">
            {t.wallet.keyPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-purple-400 mt-0.5 flex-shrink-0" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Check if all modules completed */}
      {gameState?.modules?.every((m) => m.completed) && (
        <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-xl p-4 sm:p-6 mb-6 text-center">
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-4"
          >
            <Zap className="w-12 h-12 text-yellow-400 mx-auto" />
          </motion.div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
            {t.badges.master}
          </h2>
          <p className="text-slate-300">
            {t.wallet.masterBadgeText}
          </p>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col gap-3">
        <Link
          href="/basics/seedphrase"
          className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg text-center transition-colors flex items-center justify-center gap-2"
        >
          {t.common.nextModule} <ArrowRight className="w-5 h-5" />
        </Link>
        <Link
          href="/basics"
          className="text-slate-400 hover:text-white text-sm text-center"
        >
          {t.wallet.backToBasics}
        </Link>
      </div>
    </div>
  );

  const slides = [slide1, slide2, slide3, slide4, slide5, slide6];

  return (
    <SlideLayout
      moduleTitle={t.wallet.headerTitle}
      moduleXp={120}
      backLink="/basics"
      backLabel={t.wallet.backToBasics}
      icon={<Key size={18} className="text-[var(--sol-purple)]" />}
      slides={slides}
    />
  );
}
