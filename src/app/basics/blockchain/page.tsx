'use client';

import { useState, useEffect } from 'react';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, Award, ArrowRight, Home } from 'lucide-react';
import { ClientOnly } from '@/lib/ClientOnly';

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

export default function BlockchainPage() {
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [isMining, setIsMining] = useState(false);
  const [miningNumbers, setMiningNumbers] = useState('');
  const [completedModule, setCompletedModule] = useState(false);
  const gameState = useGameState();

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
      setPhase(3);
      setCompletedModule(true);
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

  const handlePhase3 = () => {
    if (!completedModule) {
      completeModule('blockchain', 150);
      setCompletedModule(true);
    }
    setPhase(3);
  };

  return (
    <ClientOnly>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            La Blockchain
          </h1>
          <p className="text-lg text-gray-600">
            Apprenez les secrets de la technologie révolutionnaire
          </p>
        </motion.div>

        {/* PHASE 1: Le Concept */}
        <AnimatePresence mode="wait">
          {phase === 1 && (
            <motion.div
              key="phase1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Narrative */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-indigo-600"
              >
                <p className="text-lg text-gray-800 leading-relaxed italic">
                  "Maintenant que vous comprenez la décentralisation, une
                  question se pose : comment faire confiance aux autres sans
                  intermédiaire ? La réponse : une chaîne de blocs, où chaque
                  maillon prouve l'intégrité du précédent."
                </p>
              </motion.div>

              {/* Block Visual Explanation */}
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
                    className="space-y-4 p-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg shadow-xl text-white"
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

              {/* Next Button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex justify-center"
              >
                <button
                  onClick={() => setPhase(2)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105"
                >
                  <span>Suivant</span>
                  <ChevronRight size={20} />
                </button>
              </motion.div>
            </motion.div>
          )}

          {/* PHASE 2: Le Mini-Jeu */}
          {phase === 2 && (
            <motion.div
              key="phase2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Game Title */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  Le Mini-Jeu — Forgez la Chaîne
                </h2>
                <p className="text-gray-600">
                  Construisez une blockchain de 4 blocs en entrant des données
                  de transaction
                </p>
              </motion.div>

              {/* Blockchain Visualization */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-8 overflow-x-auto"
              >
                <div className="flex items-center space-x-4 min-w-max pb-4">
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
                              ? 'border-green-500 bg-green-50'
                              : 'border-gray-300 bg-gray-50'
                          }`}
                        >
                          <div className="text-sm font-mono space-y-2 w-64">
                            <div>
                              <span className="font-bold text-gray-700">
                                Index:
                              </span>{' '}
                              <span>{block.index}</span>
                            </div>
                            <div>
                              <span className="font-bold text-gray-700">
                                Data:
                              </span>{' '}
                              <span className="break-words text-xs">
                                {block.data}
                              </span>
                            </div>
                            <div>
                              <span className="font-bold text-gray-700">
                                Prev Hash:
                              </span>{' '}
                              <span className="text-xs">
                                {block.previousHash}
                              </span>
                            </div>
                            <div className="border-t pt-2">
                              <span className="font-bold text-gray-700">
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
                          className="mx-2 text-indigo-600 font-bold text-2xl"
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
                      className="text-gray-400 text-2xl font-bold"
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
                  className="bg-white rounded-lg shadow-lg p-8"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Bloc #{blocks.length}
                  </h3>

                  {/* Transaction Input */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Données de transaction
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
                      placeholder="ex: Alice envoie 5 SOL à Bob"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    />
                  </div>

                  {/* Mining Animation */}
                  {isMining && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="mb-6 p-4 bg-indigo-50 border border-indigo-200 rounded-lg"
                    >
                      <p className="text-sm text-indigo-900 font-semibold mb-3">
                        Mining en cours...
                      </p>
                      <div className="font-mono text-2xl text-indigo-600 tracking-widest">
                        {miningNumbers || '000000'}
                      </div>
                      <motion.div
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2 }}
                        className="mt-3 h-1 bg-indigo-600 rounded"
                      />
                    </motion.div>
                  )}

                  {/* Mine Button */}
                  <button
                    onClick={handleMineBlock}
                    disabled={isMining || !currentInput.trim()}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105"
                  >
                    {isMining ? 'Mining...' : 'Miner le bloc'}
                  </button>
                </motion.div>
              )}

              {/* Success Message */}
              {blocks.length === 4 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-500 rounded-lg shadow-lg p-8 text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                    className="mb-4"
                  >
                    <Award size={64} className="text-green-600 mx-auto" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-green-900 mb-2">
                    Chaîne Complète !
                  </h3>
                  <p className="text-gray-700 mb-6">
                    Vous avez forgé votre première blockchain avec succès !
                  </p>
                  <button
                    onClick={handlePhase3}
                    className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2 transition-all duration-200 transform hover:scale-105 mx-auto"
                  >
                    <span>La Révélation</span>
                    <ChevronRight size={20} />
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* PHASE 3: La Révélation */}
          {phase === 3 && (
            <motion.div
              key="phase3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8"
            >
              {/* Narrative */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-white rounded-lg shadow-lg p-8 border-l-4 border-purple-600"
              >
                <p className="text-lg text-gray-800 leading-relaxed italic">
                  "Vous venez de forger votre première blockchain ! Chaque bloc
                  est lié au précédent par son hash. Modifier un seul bloc
                  casserait toute la chaîne. C'est cette immutabilité qui rend
                  la blockchain révolutionnaire. Anatoly Yakovenko a vu cela et
                  s'est dit : comment rendre cette chaîne 1000 fois plus
                  rapide ?"
                </p>
              </motion.div>

              {/* XP Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="flex justify-center"
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
                  className="bg-gradient-to-br from-amber-100 to-amber-50 border-2 border-amber-500 rounded-full p-8 shadow-xl"
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
                      <Award size={64} className="text-amber-600 mx-auto" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-amber-900 mb-2">
                      Forgeur de Blocs
                    </h3>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.8 }}
                      className="text-3xl font-bold text-amber-600"
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
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105">
                    <Home size={20} />
                    <span>Retour aux Bases</span>
                  </button>
                </Link>

                <Link href="/basics/wallet">
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200 transform hover:scale-105">
                    <span>Suivant : Les Portefeuilles</span>
                    <ArrowRight size={20} />
                  </button>
                </Link>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

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
    </div>
    </ClientOnly>
  );
}
