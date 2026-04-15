'use client';

import { useState, useEffect } from 'react';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Award, ArrowRight, Home, Boxes } from 'lucide-react';
import { useLocale } from '@/lib/useLocale';
import { SlideLayout } from '@/components/SlideLayout';


// Fake hash generation function
function fakeHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, '0').slice(0, 16);
}

interface Block {
  index: number;
  timestamp: string;
  data: string;
  previousHash: string;
  hash: string;
}

export default function BlockchainContent() {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isMining, setIsMining] = useState(false);
  const [miningNumbers, setMiningNumbers] = useState('');
  const [completedModule, setCompletedModule] = useState(false);
  const [showSlide4, setShowSlide4] = useState(false);
  const gameState = useGameState();
  const { t } = useLocale();

  // Initialize genesis block and check if module already completed
  useEffect(() => {
    const genesisHash = fakeHash('genesis');
    const genesisBlock: Block = {
      index: 0,
      timestamp: new Date().toISOString().split('T')[0],
      data: 'Genesis Block',
      previousHash: '0000000000000000',
      hash: genesisHash,
    };
    setBlocks([genesisBlock]);

    // Check if module already completed
    const mod = gameState?.modules?.find((m: { id: string }) => m.id === 'blockchain');
    if (mod?.completed) {
      setCompletedModule(true);
      setShowSlide4(true);
    }
  }, [gameState]);

  const handleMineBlock = async () => {
    if (!currentInput.trim()) return;

    setIsMining(true);

    // Mining animation - cycle through numbers
    const animationDuration = 2000;
    const startTime = Date.now();

    const animationInterval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const randomNum = Math.floor(Math.random() * 0xffffff)
        .toString(16)
        .padStart(6, '0')
        .toUpperCase();
      setMiningNumbers(randomNum);

      if (elapsed >= animationDuration) {
        clearInterval(animationInterval);
      }
    }, 100);

    // Create new block after animation
    await new Promise((resolve) => setTimeout(resolve, animationDuration));

    const previousBlock = blocks[blocks.length - 1];
    const newBlockIndex = blocks.length;
    const inputForHash = currentInput + previousBlock.hash;
    const newHash = fakeHash(inputForHash);

    const newBlock: Block = {
      index: newBlockIndex,
      timestamp: new Date().toISOString().split('T')[0],
      data: currentInput,
      previousHash: previousBlock.hash.slice(0, 8),
      hash: newHash,
    };

    setBlocks([...blocks, newBlock]);
    setCurrentInput('');
    setIsMining(false);
    setMiningNumbers('');
  };

  const handleFinish = () => {
    if (!completedModule) {
      completeModule('blockchain', 150);
      setCompletedModule(true);
    }
    setShowSlide4(true);
  };

  // Slide 1: Story intro + genesis block visual
  const slide1 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.blockchain.headerTitle}
      </h2>

      {/* Narrative */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 sm:p-8 border border-purple-600/30 mb-6"
      >
        <p className="text-lg text-slate-200 leading-relaxed italic">
          {t.blockchain.phase1Narrative}
        </p>
      </motion.div>

      {/* Genesis Block Visual */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center"
      >
        <div className="block-visual valid w-full max-w-md">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, staggerChildren: 0.1 }}
            className="space-y-4 p-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg text-white"
          >
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              className="flex items-center space-x-4"
            >
              <span className="font-mono text-sm bg-white bg-opacity-20 px-3 py-1 rounded">
                Index
              </span>
              <span className="text-lg font-semibold">0</span>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="flex items-center space-x-4"
            >
              <span className="font-mono text-sm bg-white bg-opacity-20 px-3 py-1 rounded">
                Timestamp
              </span>
              <span className="text-sm font-mono">
                {new Date().toISOString().split('T')[0]}
              </span>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center space-x-4"
            >
              <span className="font-mono text-sm bg-white bg-opacity-20 px-3 py-1 rounded">
                Data
              </span>
              <span className="text-sm font-mono">Genesis Block</span>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex items-center space-x-4"
            >
              <span className="font-mono text-sm bg-white bg-opacity-20 px-3 py-1 rounded">
                Previous Hash
              </span>
              <span className="text-xs font-mono break-all">
                0000000000000000
              </span>
            </motion.div>

            <motion.div
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-4 border-t border-white border-opacity-30"
            >
              <span className="font-mono text-sm bg-white bg-opacity-20 px-3 py-1 rounded block mb-2">
                Hash
              </span>
              <span className="text-xs font-mono break-all bg-white bg-opacity-10 p-2 rounded">
                {blocks[0]?.hash}
              </span>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );

  // Slide 2: Hash definition + Key concepts + Did you know
  const slide2 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.blockchain.defHashTitle}
      </h2>

      <div className="space-y-4">
        {/* Definition: Hash */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5"
        >
          <p className="text-indigo-400 font-bold text-lg mb-2">{t.blockchain.defHashTitle}</p>
          <p className="text-slate-300 leading-relaxed">
            {t.blockchain.defHashText}
          </p>
        </motion.div>

        {/* Notions cles: contenu d'un bloc */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
        >
          <p className="text-purple-400 font-bold text-lg mb-2">{t.blockchain.keyConceptsBlockTitle}</p>
          <p className="text-slate-300 leading-relaxed">
            {t.blockchain.keyConceptsBlockText}
          </p>
        </motion.div>

        {/* Le saviez-vous: Genesis Block */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5"
        >
          <p className="text-amber-400 font-bold text-lg mb-2">{t.blockchain.didYouKnowGenesisTitle}</p>
          <p className="text-slate-300 leading-relaxed">
            {t.blockchain.didYouKnowGenesisText}
          </p>
        </motion.div>
      </div>
    </div>
  );

  // Slide 3: Mining game
  const slide3 = (
    <div>
      <h2 className="text-xl sm:text-3xl font-bold text-white mb-2">
        {t.blockchain.phase2Title}
      </h2>
      <p className="text-slate-400 mb-4">
        {t.blockchain.phase2Subtitle}
      </p>

      {/* Narrative: Mineur */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 rounded-lg p-6 sm:p-8 border border-purple-600/30 mb-4"
      >
        <p className="text-lg text-slate-200 leading-relaxed italic">
          {t.blockchain.phase2Narrative}
        </p>
      </motion.div>

      {/* Notions cles: Solana speed */}
      <div className="space-y-4 mb-4">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
        >
          <p className="text-purple-400 font-bold text-lg mb-2">{t.blockchain.phase2KeyConceptsTitle}</p>
          <p className="text-slate-300 leading-relaxed">
            {t.blockchain.phase2KeyConceptsText}
          </p>
        </motion.div>
      </div>

      {/* Blockchain Visualization */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8 overflow-x-auto mb-4"
      >
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:space-x-4 sm:gap-0 pb-4">
          {blocks.map((block, index) => (
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center"
            >
              {/* Block */}
              <div
                className={`block-visual ${
                  index === 0 ? 'valid' : blocks.length > index ? 'valid' : ''
                } min-w-max`}
              >
                <div
                  className={`p-4 rounded-lg border-2 ${
                    index === 0 || index < blocks.length
                      ? 'border-green-500/50 bg-green-900/20'
                      : 'border-slate-600 bg-slate-800/50'
                  }`}
                >
                  <div className="text-sm font-mono space-y-2 w-full sm:w-64">
                    <div>
                      <span className="font-bold text-slate-400">
                        Index:
                      </span>{' '}
                      <span>{block.index}</span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400">
                        Data:
                      </span>{' '}
                      <span className="break-words text-xs">
                        {block.data}
                      </span>
                    </div>
                    <div>
                      <span className="font-bold text-slate-400">
                        Prev Hash:
                      </span>{' '}
                      <span className="text-xs">
                        {block.previousHash}
                      </span>
                    </div>
                    <div className="border-t pt-2">
                      <span className="font-bold text-slate-400">
                        Hash:
                      </span>{' '}
                      <span className="text-xs break-all">
                        {block.hash}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Chain Link Arrow */}
              {index < blocks.length - 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                  className="mx-2 text-purple-400 font-bold text-2xl sm:rotate-0 rotate-90"
                >
                  →
                </motion.div>
              )}
            </motion.div>
          ))}

          {/* Add Block Placeholder */}
          {blocks.length < 4 && (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: blocks.length * 0.1 }}
              className="text-slate-500 text-2xl font-bold"
            >
              +
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Mining Controls */}
      {blocks.length < 4 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-slate-800/50 backdrop-blur border border-slate-700 rounded-lg p-4 sm:p-8"
        >
          <h3 className="text-base sm:text-lg font-semibold text-white mb-4">
            {t.blockchain.phase2BlockLabel}{blocks.length}
          </h3>

          {/* Transaction Input */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t.blockchain.phase2InputLabel}
            </label>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && !isMining) {
                  handleMineBlock();
                }
              }}
              disabled={isMining}
              placeholder={t.blockchain.phase2InputPlaceholder}
              className="w-full px-4 py-2 bg-slate-900/50 border border-slate-700 text-white rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed placeholder-slate-500"
            />
          </div>

          {/* Mining Animation */}
          {isMining && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-4 bg-purple-900/30 border border-purple-500/50 rounded-lg"
            >
              <p className="text-sm text-purple-300 font-semibold mb-3">
                {t.blockchain.phase2Mining}
              </p>
              <div className="font-mono text-lg sm:text-2xl text-purple-400 tracking-widest">
                {miningNumbers || '000000'}
              </div>
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2 }}
                className="mt-3 h-1 bg-purple-500 rounded"
              />
            </motion.div>
          )}

          {/* Mine Button */}
          <button
            onClick={handleMineBlock}
            disabled={isMining || !currentInput.trim()}
            className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
          >
            {isMining ? t.blockchain.phase2Mining : t.blockchain.phase2MineButton}
          </button>
        </motion.div>
      )}

      {/* Success Message */}
      {blocks.length === 4 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-green-900/30 border-2 border-green-500/50 rounded-lg p-8 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="mb-4"
          >
            <Award size={64} className="text-green-400 mx-auto" />
          </motion.div>
          <h3 className="text-2xl font-bold text-green-400 mb-2">
            {t.blockchain.phase2ChainComplete}
          </h3>
          <p className="text-slate-300 mb-6">
            {t.blockchain.phase2ChainCompleteText}
          </p>
          <button
            onClick={handleFinish}
            className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 mx-auto"
          >
            <span>{t.blockchain.phase2Revelation}</span>
          </button>
        </motion.div>
      )}
    </div>
  );

  // Slide 4: Badge + recap + immutability
  const slide4 = (
    <div>
      {/* Narrative */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="bg-gradient-to-r from-purple-900/50 to-blue-900/50 rounded-lg p-6 sm:p-8 border border-purple-600/30 mb-6"
      >
        <p className="text-lg text-slate-200 leading-relaxed italic">
          {t.blockchain.phase3Narrative}
        </p>
      </motion.div>

      {/* Grouped pedagogical boxes */}
      <div className="space-y-4 mb-6">
        {/* Definition: Immutabilite */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5"
        >
          <p className="text-indigo-400 font-bold text-lg mb-2">{t.blockchain.defImmutabilityTitle}</p>
          <p className="text-slate-300 leading-relaxed">
            {t.blockchain.defImmutabilityText}
          </p>
        </motion.div>

        {/* Notions cles: Recap */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35 }}
          className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
        >
          <p className="text-purple-400 font-bold text-lg mb-2">{t.blockchain.phase3KeyPointsTitle}</p>
          <ul className="list-disc list-inside text-slate-300 space-y-2">
            {t.blockchain.phase3KeyPoints.map((point: string, i: number) => (
              <li key={i}>{point}</li>
            ))}
          </ul>
        </motion.div>

        {/* Le saviez-vous: Proof of History */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5"
        >
          <p className="text-amber-400 font-bold text-lg mb-2">{t.blockchain.phase3DidYouKnowTitle}</p>
          <p className="text-slate-300 leading-relaxed">
            {t.blockchain.phase3DidYouKnowText}
          </p>
        </motion.div>
      </div>

      {/* XP Badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="flex justify-center mb-6"
      >
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            delay: 0.6,
            type: 'spring',
            stiffness: 200,
            damping: 15,
          }}
          className="bg-gradient-to-br from-yellow-900/40 to-amber-900/40 border-2 border-yellow-700/50 rounded-full p-8"
        >
          <div className="text-center">
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
              className="mb-4"
            >
              <Award size={64} className="text-amber-400 mx-auto" />
            </motion.div>
            <h3 className="text-2xl font-bold text-amber-400 mb-2">
              {t.badges.blockchain}
            </h3>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-3xl font-bold text-amber-400"
            >
              +150 XP
            </motion.p>
          </div>
        </motion.div>
      </motion.div>

      {/* Navigation Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="flex gap-4 justify-center flex-wrap"
      >
        <Link href="/basics">
          <button className="bg-slate-700 hover:bg-slate-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105">
            <Home size={20} />
            <span>{t.blockchain.backToBasics}</span>
          </button>
        </Link>

        <Link href="/basics/wallet">
          <button className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105">
            <span>{t.blockchain.nextWallet}</span>
            <ArrowRight size={20} />
          </button>
        </Link>
      </motion.div>
    </div>
  );

  const slides = [slide1, slide2, slide3];
  if (showSlide4) {
    slides.push(slide4);
  }

  return (
    <>
      <SlideLayout
        moduleTitle={t.blockchain.headerTitle}
        moduleXp={150}
        backLink="/basics"
        backLabel={t.blockchain.backToBasics}
        slides={slides}
        canAdvance={showSlide4 ? [true, true, true, true] : [true, true, false]}
        icon={<Boxes size={18} className="text-[var(--sol-green)]" />}
      />

      {/* CSS for block-visual styling */}
      <style jsx>{`
        .block-visual {
          transition: all 0.3s ease;
        }

        .block-visual.valid {
          box-shadow: 0 0 20px rgba(34, 197, 94, 0.3);
        }

        .block-visual.building {
          animation: pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
        }
      `}</style>
    </>
  );
}
