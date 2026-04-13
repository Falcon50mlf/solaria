'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Lock,
  Mail,
  ArrowRight,
  CheckCircle2,
  Zap,
  Trophy,
  ChevronRight,
} from 'lucide-react';
import Link from 'next/link';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';

type Phase = 'story' | 'minigame' | 'reveal';
type MinigameStep = 'entropy' | 'derivation' | 'wallet';

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

export default function WalletPage() {
  const gameState = useGameState();
  const [phase, setPhase] = useState<Phase>('story');
  const [minigameStep, setMinigameStep] = useState<MinigameStep>('entropy');
  const [wallet, setWallet] = useState<GeneratedWallet | null>(null);

  // Entropy tracking
  const entropyCanvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePositions, setMousePositions] = useState<Set<string>>(new Set());
  const [entropyReady, setEntropyReady] = useState(false);
  const canvasDirtyRef = useRef(false);

  // Derivation animation
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const [showPublicKey, setShowPublicKey] = useState(false);
  const [privKeyChars, setPrivKeyChars] = useState(0);
  const [pubKeyChars, setPubKeyChars] = useState(0);

  // Check if wallet module is already completed
  useEffect(() => {
    const walletModule = gameState?.modules?.find(m => m.id === 'wallet');
    if (walletModule?.completed) {
      setPhase('reveal');
    }
  }, [gameState]);

  // Mouse tracking for entropy
  useEffect(() => {
    if (minigameStep !== 'entropy' || !entropyCanvasRef.current) return;

    const canvas = entropyCanvasRef.current;
    const ctx = canvas.getContext('2d');

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = Math.round(e.clientX - rect.left);
      const y = Math.round(e.clientY - rect.top);

      if (x >= 0 && x < canvas.width && y >= 0 && y < canvas.height) {
        const key = `${Math.floor(x / 4)},${Math.floor(y / 4)}`;

        if (!mousePositions.has(key)) {
          setMousePositions((prev) => new Set([...prev, key]));
          canvasDirtyRef.current = true;

          // Draw a small dot
          if (ctx) {
            ctx.fillStyle = `hsla(${Math.random() * 360}, 100%, 50%, 0.6)`;
            ctx.beginPath();
            ctx.arc(x, y, 3, 0, Math.PI * 2);
            ctx.fill();
          }

          if (mousePositions.size >= 30) {
            setEntropyReady(true);
          }
        }
      }
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, [minigameStep, mousePositions]);

  // Animate derivation step
  useEffect(() => {
    if (minigameStep !== 'derivation') return;

    // Animate private key appearance
    if (!showPrivateKey) {
      const timer = setTimeout(() => setShowPrivateKey(true), 500);
      return () => clearTimeout(timer);
    }

    if (showPrivateKey && privKeyChars < 32) {
      const timer = setTimeout(() => setPrivKeyChars((p) => p + 1), 30);
      return () => clearTimeout(timer);
    }

    if (privKeyChars === 32 && !showPublicKey) {
      const timer = setTimeout(() => setShowPublicKey(true), 500);
      return () => clearTimeout(timer);
    }

    if (showPublicKey && pubKeyChars < 32) {
      const timer = setTimeout(() => setPubKeyChars((p) => p + 1), 30);
      return () => clearTimeout(timer);
    }
  }, [minigameStep, showPrivateKey, showPublicKey, privKeyChars, pubKeyChars]);

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

    setMinigameStep('derivation');
  };

  const handleDerivationComplete = () => {
    setMinigameStep('wallet');
  };

  const handleWalletComplete = async () => {
    await completeModule('wallet', 120);
    setPhase('reveal');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Link
            href="/basics"
            className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 mb-4"
          >
            <ChevronRight className="w-4 h-4 rotate-180" />
            Retour aux Basics
          </Link>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">Le Wallet</h1>
          <p className="text-slate-400">
            Maîtrisez les clés de votre identité numérique
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
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-8 mb-8">
                <p className="text-xl md:text-2xl mb-8 leading-relaxed text-slate-200">
                  Vous avez compris la décentralisation et la blockchain. Mais
                  comment prouver que{' '}
                  <span className="text-purple-400 font-semibold">VOUS</span>{' '}
                  êtes bien vous dans ce monde sans autorité centrale ?
                </p>
                <p className="text-lg text-slate-300 mb-8">
                  Il faut un système d'identité révolutionnaire :{' '}
                  <span className="text-yellow-400 font-semibold">
                    la cryptographie à clé publique
                  </span>
                  .
                </p>
              </div>

              {/* Mailbox Analogy */}
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                {/* Public Key Card */}
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="bg-gradient-to-br from-green-900/30 to-green-800/20 border border-green-700/50 rounded-lg p-6"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <Mail className="w-8 h-8 text-green-400" />
                    <h3 className="text-2xl font-bold text-green-400">
                      Clé Publique
                    </h3>
                  </div>
                  <p className="text-slate-300 mb-6">
                    L'adresse de votre boîte aux lettres
                  </p>
                  <div className="bg-slate-900/50 rounded p-4 mb-4">
                    <p className="text-sm text-slate-400 mb-2">Exemple:</p>
                    <p className="font-mono text-green-400 break-all">
                      wallet_address_xyz123...
                    </p>
                  </div>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>✓ Tout le monde la connaît</li>
                    <li>✓ N'importe qui peut vous envoyer des fonds</li>
                    <li>✓ C'est votre identité publique</li>
                  </ul>
                </motion.div>

                {/* Private Key Card */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="bg-gradient-to-br from-red-900/30 to-red-800/20 border border-red-700/50 rounded-lg p-6 relative"
                >
                  <div className="absolute -top-3 right-4 bg-red-600 px-3 py-1 rounded-full text-xs font-bold">
                    ⚠️ SECRET
                  </div>
                  <div className="flex items-center gap-3 mb-4 mt-2">
                    <Lock className="w-8 h-8 text-red-400" />
                    <h3 className="text-2xl font-bold text-red-400">
                      Clé Privée
                    </h3>
                  </div>
                  <p className="text-slate-300 mb-6">
                    La clé qui ouvre votre boîte
                  </p>
                  <div className="bg-slate-900/50 rounded p-4 mb-4">
                    <p className="text-sm text-slate-400 mb-2">Exemple:</p>
                    <p className="font-mono text-red-400 break-all text-xs">
                      8f2a9c7e5d1b3f4g6h8j2k4m6n8p0...
                    </p>
                  </div>
                  <ul className="space-y-2 text-slate-300 text-sm">
                    <li>✓ SEULEMENT vous la connaissez</li>
                    <li>✓ Elle contrôle vos fonds</li>
                    <li>✗ JAMAIS la partager</li>
                  </ul>
                </motion.div>
              </div>

              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6 mb-8">
                <p className="text-lg text-slate-200 mb-2">
                  <span className="font-bold text-purple-400">
                    Votre wallet, c'est cette paire de clés.
                  </span>{' '}
                  La clé publique est votre adresse, la clé privée votre
                  pouvoir.
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  setMinigameStep('entropy');
                  setPhase('minigame');
                }}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg transition-colors"
              >
                Suivant: Créez Votre Wallet
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
              {/* STEP 1: ENTROPY */}
              {minigameStep === 'entropy' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Étape 1: Générer l'Entropie
                    </h2>
                    <p className="text-slate-400">
                      Bougez votre souris de manière aléatoire pour créer de
                      l'entropie (au moins 30 mouvements uniques)
                    </p>
                  </div>

                  <div className="mb-6 relative">
                    <canvas
                      ref={entropyCanvasRef}
                      width={400}
                      height={300}
                      className="w-full bg-slate-950 border-2 border-slate-700 rounded-lg cursor-crosshair"
                      style={{ maxWidth: '100%' }}
                    />
                  </div>

                  <div className="mb-6 bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold">Entropie collectée</span>
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
                        className="mb-6 bg-green-900/30 border border-green-700/50 rounded-lg p-4"
                      >
                        <p className="text-green-400 font-bold text-center">
                          ✓ Entropie suffisante !
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
                    Continuer
                    <ArrowRight className="inline ml-2 w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* STEP 2: DERIVATION */}
              {minigameStep === 'derivation' && wallet && (
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Étape 2: Dériver les Clés
                    </h2>
                    <p className="text-slate-400">
                      Observez comment l'entropie génère vos clés
                    </p>
                  </div>

                  <div className="space-y-8 mb-8">
                    {/* Entropy */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6"
                    >
                      <p className="text-sm text-slate-400 mb-2">Entropie</p>
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
                      className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6"
                    >
                      <p className="text-sm text-slate-400 mb-2">Clé Privée</p>
                      <p className="font-mono text-yellow-400 break-all text-sm">
                        {wallet.privateKey.substring(0, privKeyChars)}
                        {privKeyChars < 64 && (
                          <span className="animate-pulse">▋</span>
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
                      className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-6"
                    >
                      <p className="text-sm text-slate-400 mb-2">Clé Publique</p>
                      <p className="font-mono text-green-400 break-all text-sm">
                        {wallet.publicKey.substring(0, pubKeyChars)}
                        {pubKeyChars < 64 && (
                          <span className="animate-pulse">▋</span>
                        )}
                      </p>
                    </motion.div>
                  </div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    disabled={pubKeyChars < 64}
                    onClick={handleDerivationComplete}
                    className={`w-full py-4 rounded-lg font-bold text-lg transition-all ${
                      pubKeyChars === 64
                        ? 'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 cursor-pointer'
                        : 'bg-slate-700 text-slate-500 cursor-not-allowed'
                    }`}
                  >
                    Continuer
                    <ArrowRight className="inline ml-2 w-5 h-5" />
                  </motion.button>
                </div>
              )}

              {/* STEP 3: WALLET DISPLAY */}
              {minigameStep === 'wallet' && wallet && (
                <div>
                  <div className="mb-8">
                    <h2 className="text-2xl md:text-3xl font-bold mb-2">
                      Étape 3: Votre Wallet
                    </h2>
                    <p className="text-slate-400">
                      Voici votre première adresse Solana
                    </p>
                  </div>

                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="relative bg-gradient-to-br from-purple-900/40 to-slate-900/40 backdrop-blur border border-purple-700/50 rounded-lg p-8 mb-8 shadow-2xl"
                  >
                    {/* Glow effect */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg blur-xl -z-10" />

                    {/* Wallet Details */}
                    <div className="space-y-6">
                      {/* Address */}
                      <div>
                        <p className="text-sm text-slate-400 mb-2">Adresse</p>
                        <div className="bg-slate-900/50 rounded p-3 border border-slate-700/50">
                          <p className="font-mono text-green-400 break-all text-xs md:text-sm">
                            {wallet.address}
                          </p>
                        </div>
                        <p className="text-xs text-slate-500 mt-1">
                          💡 Partagez cette adresse pour recevoir des SOL
                        </p>
                      </div>

                      {/* Public Key */}
                      <div>
                        <p className="text-sm text-slate-400 mb-2">Clé Publique</p>
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
                          Secret: Ne JAMAIS partager votre clé privée
                        </p>
                        <p className="text-xs text-slate-300">
                          Votre clé privée est masquée pour votre sécurité.
                          Quiconque possède cette clé contrôle vos fonds.
                        </p>
                      </div>

                      {/* Balance */}
                      <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700/50">
                        <p className="text-sm text-slate-400 mb-1">Balance</p>
                        <p className="text-3xl font-bold text-purple-400">
                          0 SOL
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          Prêt à recevoir des tokens !
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleWalletComplete}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg transition-colors"
                  >
                    Terminer et Recevoir le Badge
                    <Trophy className="inline ml-2 w-5 h-5" />
                  </motion.button>
                </div>
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
                  <Trophy className="w-16 h-16 text-yellow-400" />
                </motion.div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">
                  Félicitations !
                </h2>
                <p className="text-xl text-slate-300">
                  Vous possédez maintenant votre propre wallet
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
                  <Lock className="w-8 h-8 text-slate-900" />
                </div>
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                  Gardien des Clés
                </h3>
                <p className="text-slate-300 mb-2">+120 XP</p>
                <p className="text-sm text-slate-400">
                  Vous maîtrisez les fondamentaux des wallets Solana
                </p>
              </motion.div>

              {/* Narrative */}
              <div className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-8 mb-8">
                <p className="text-lg md:text-xl leading-relaxed text-slate-200 mb-4">
                  Dans l'univers Solana, cette paire de clés est votre
                  passeport.{' '}
                  <span className="text-purple-400 font-semibold">
                    Anatoly Yakovenko
                  </span>{' '}
                  a conçu Solana pour que des millions de wallets puissent
                  interagir simultanément, à la vitesse de la lumière.
                </p>
                <p className="text-slate-300">
                  Vous êtes maintenant prêt à explorer l'écosystème Solana.
                </p>
              </div>

              {/* Check if all modules completed */}
              {gameState?.modules?.filter((m) => m.completed).length === 3 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-purple-900/40 to-blue-900/40 border border-purple-700/50 rounded-lg p-8 mb-8 text-center"
                >
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="mb-4"
                  >
                    <Zap className="w-12 h-12 text-yellow-400 mx-auto" />
                  </motion.div>
                  <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400 mb-2">
                    Maître des Basics
                  </h2>
                  <p className="text-slate-300">
                    Vous avez complété les trois modules fondamentaux !
                  </p>
                </motion.div>
              )}

              {/* Navigation */}
              <div className="flex flex-col gap-3">
                <Link
                  href="/basics"
                  className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 py-4 rounded-lg font-bold text-lg text-center transition-colors"
                >
                  ← Retour aux Basics
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
