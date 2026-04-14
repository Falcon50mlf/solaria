'use client';

import { useState, useEffect } from 'react';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';
import { useLocale } from '@/lib/useLocale';
import { TopBar } from '@/components/TopBar';


interface Node {
  id: number;
  x: number;
  y: number;
  type: 'center' | 'outer';
}

interface Connection {
  from: number;
  to: number;
}

export default function DecentralisationContent() {
  const { t } = useLocale();
  const [phase, setPhase] = useState<1 | 2 | 3>(1);
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const gameState = useGameState();
  const [showConfetti, setShowConfetti] = useState(false);

  const nodes: Node[] = [
    { id: 0, x: 50, y: 50, type: 'center' },
    { id: 1, x: 50, y: 10, type: 'outer' },
    { id: 2, x: 85, y: 18, type: 'outer' },
    { id: 3, x: 95, y: 50, type: 'outer' },
    { id: 4, x: 85, y: 82, type: 'outer' },
    { id: 5, x: 50, y: 90, type: 'outer' },
    { id: 6, x: 15, y: 82, type: 'outer' },
    { id: 7, x: 5, y: 50, type: 'outer' },
    { id: 8, x: 15, y: 18, type: 'outer' },
  ];

  const outerNodeIds = nodes.filter(n => n.type === 'outer').map(n => n.id);

  const handleNodeClick = (nodeId: number) => {
    if (gameWon) return;
    if (nodeId === 0) return; // Can't click center node

    if (selectedNode === null) {
      setSelectedNode(nodeId);
    } else if (selectedNode === nodeId) {
      setSelectedNode(null);
    } else {
      // Create connection between two outer nodes
      const newConnection: Connection = {
        from: Math.min(selectedNode, nodeId),
        to: Math.max(selectedNode, nodeId),
      };

      // Check if connection already exists
      const exists = connections.some(
        c => c.from === newConnection.from && c.to === newConnection.to
      );

      if (!exists) {
        setConnections([...connections, newConnection]);
      }

      setSelectedNode(null);
    }
  };

  // Check win condition
  useEffect(() => {
    if (phase === 2 && connections.length > 0) {
      const connectionCounts = new Map<number, number>();
      outerNodeIds.forEach(id => connectionCounts.set(id, 0));

      connections.forEach(conn => {
        connectionCounts.set(conn.from, (connectionCounts.get(conn.from) || 0) + 1);
        connectionCounts.set(conn.to, (connectionCounts.get(conn.to) || 0) + 1);
      });

      const allConnected = Array.from(connectionCounts.values()).every(count => count >= 2);

      if (allConnected && !gameWon) {
        setGameWon(true);
        setShowConfetti(true);
        setTimeout(() => {
          setPhase(3);
          completeModule('decentralisation', 100);
        }, 1500);
      }
    }
  }, [connections, phase, gameWon, outerNodeIds]);

  // Check if already completed
  const decentralisationModule = gameState.modules.find(m => m.id === 'decentralisation');
  const isAlreadyCompleted = decentralisationModule?.completed ?? false;

  if (isAlreadyCompleted && phase === 1) {
    setPhase(3);
  }

  const renderNetworkDiagram = (interactive: boolean = false, showCentralNode: boolean = true) => {
    return (
      <svg viewBox="0 0 100 100" className="w-full h-[250px] sm:h-[400px]">
        {/* Render connections */}
        {connections.map((conn, idx) => {
          const fromNode = nodes.find(n => n.id === conn.from);
          const toNode = nodes.find(n => n.id === conn.to);
          if (!fromNode || !toNode) return null;

          return (
            <motion.line
              key={`conn-${idx}`}
              x1={`${fromNode.x}%`}
              y1={`${fromNode.y}%`}
              x2={`${toNode.x}%`}
              y2={`${toNode.y}%`}
              stroke="#10b981"
              strokeWidth="0.8"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.5 }}
            />
          );
        })}

        {/* Render nodes */}
        {nodes.map(node => {
          if (!showCentralNode && node.type === 'center') return null;

          const isSelected = selectedNode === node.id;
          const isCenter = node.type === 'center';
          const radius = isCenter ? 3 : 2.5;

          return (
            <g key={`node-${node.id}`}>
              <motion.circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={radius}
                fill={
                  isCenter
                    ? gameWon
                      ? '#10b981'
                      : '#ef4444'
                    : isSelected
                      ? '#fbbf24'
                      : '#a78bfa'
                }
                onClick={() => interactive && handleNodeClick(node.id)}
                style={{ cursor: interactive ? 'pointer' : 'default' }}
                animate={
                  isCenter && !gameWon
                    ? { opacity: [1, 0.5, 1] }
                    : isCenter && gameWon
                      ? { opacity: 0 }
                      : {}
                }
                transition={
                  isCenter && !gameWon
                    ? { duration: 0.8, repeat: Infinity }
                    : isCenter && gameWon
                      ? { duration: 0.6 }
                      : {}
                }
                className={interactive ? 'hover:opacity-80' : ''}
              />
              {isSelected && (
                <motion.circle
                  cx={`${node.x}%`}
                  cy={`${node.y}%`}
                  r={radius + 1}
                  fill="none"
                  stroke="#fbbf24"
                  strokeWidth="0.5"
                  animate={{ r: radius + 2 }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                />
              )}
            </g>
          );
        })}
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 text-white p-6">
      <TopBar />
      {/* Phase 1: Story Intro */}
      {phase === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-8 text-center">{t.decentralisation.phase1Title}</h1>

          {/* Centralized Network Diagram */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8 border border-slate-700">
            <div className="h-[250px] sm:h-[400px]">{renderNetworkDiagram(false)}</div>
          </div>

          {/* Narrative Box */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 mb-8 border border-blue-600"
          >
            <p className="text-lg leading-relaxed italic">
              {t.decentralisation.phase1Narrative}
            </p>
          </motion.div>

          {/* Pedagogical boxes */}
          <div className="space-y-4 mb-8">
            {/* Definition Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5"
            >
              <h3 className="text-indigo-400 font-bold text-lg mb-2">{t.decentralisation.defTitle}</h3>
              <p className="text-slate-200 leading-relaxed">
                {t.decentralisation.defText}
              </p>
            </motion.div>

            {/* Le saviez-vous Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5"
            >
              <h3 className="text-amber-400 font-bold text-lg mb-2">{t.decentralisation.didYouKnowTitle}</h3>
              <p className="text-slate-200 leading-relaxed">
                {t.decentralisation.didYouKnowText}
              </p>
            </motion.div>
          </div>

          {/* Explanation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="space-y-4 mb-8"
          >
            <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-bold text-red-400 mb-2">{t.decentralisation.singlePointTitle}</h3>
              <p>{t.decentralisation.singlePointText}</p>
              <p className="text-slate-400 text-sm mt-2">
                {t.decentralisation.singlePointExample}
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="font-bold text-yellow-400 mb-2">{t.decentralisation.censorshipTitle}</h3>
              <p>{t.decentralisation.censorshipText}</p>
              <p className="text-slate-400 text-sm mt-2">
                {t.decentralisation.censorshipExample}
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-400 mb-2">{t.decentralisation.trustTitle}</h3>
              <p>{t.decentralisation.trustText}</p>
              <p className="text-slate-400 text-sm mt-2">
                {t.decentralisation.trustExample}
              </p>
            </div>
          </motion.div>

          {/* Next Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setPhase(2)}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition"
          >
            {t.common.next} <ArrowRight size={20} />
          </motion.button>
        </motion.div>
      )}

      {/* Phase 2: Interactive Game */}
      {phase === 2 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-2 text-center">{t.decentralisation.phase2Title}</h1>

          <p className="text-center text-slate-300 mb-6 text-lg">
            {t.decentralisation.phase2Subtitle}
          </p>

          {/* Mission narrative */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-5 mb-6 border border-blue-600"
          >
            <p className="text-slate-200 leading-relaxed">
              {t.decentralisation.phase2Mission}
            </p>
          </motion.div>

          {/* Pedagogical boxes */}
          <div className="space-y-4 mb-8">
            {/* Notions clés Box */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
            >
              <h3 className="text-purple-400 font-bold text-lg mb-2">{t.decentralisation.phase2KeyConceptsTitle}</h3>
              <p className="text-slate-200 leading-relaxed">
                {t.decentralisation.phase2KeyConceptsText}
              </p>
            </motion.div>
          </div>

          {/* Game Area */}
          <div className="bg-slate-800 rounded-lg p-8 mb-6 border border-slate-700">
            <div className="h-[300px] sm:h-[500px]">{renderNetworkDiagram(true, true)}</div>
          </div>

          {/* Progress Counter */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-lg p-4 mb-6 border border-purple-600 text-center"
          >
            <p className="text-lg sm:text-2xl font-bold">
              {t.decentralisation.phase2Connections} <span className="text-emerald-400">{connections.length}</span>/
              {outerNodeIds.length} minimum
            </p>
            <p className="text-sm text-slate-300 mt-2">
              {t.decentralisation.phase2MinConnections}
            </p>
          </motion.div>

          {/* Instructions */}
          {!gameWon && (
            <div className="bg-slate-700 rounded-lg p-4 text-sm text-slate-200 mb-6">
              <p>
                {t.decentralisation.phase2HowToPlay}
              </p>
            </div>
          )}

          {/* Reset Button */}
          {!gameWon && connections.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setConnections([]);
                setSelectedNode(null);
              }}
              className="w-full bg-slate-700 hover:bg-slate-600 font-bold py-2 rounded-lg flex items-center justify-center gap-2 mb-4 transition"
            >
              <RotateCcw size={18} /> {t.common.reset}
            </motion.button>
          )}

          {/* Confetti Effect */}
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 pointer-events-none flex items-center justify-center"
            >
              <div className="text-4xl sm:text-6xl font-bold text-emerald-400">+100 XP</div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Phase 3: Completion */}
      {phase === 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-2xl sm:text-4xl font-bold mb-4 text-center text-emerald-400">{t.decentralisation.phase3Title}</h1>

          {isAlreadyCompleted && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-slate-700 border border-slate-600 rounded-lg p-3 mb-6 text-sm text-slate-300 text-center"
            >
              ✓ {t.common.alreadyCompleted}
            </motion.div>
          )}

          {/* Decentralized Network Diagram */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8 border border-slate-700">
            <div className="h-[250px] sm:h-[400px]">{renderNetworkDiagram(false, false)}</div>
          </div>

          {/* Narrative */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-lg p-6 mb-8 border border-emerald-600"
          >
            <p className="text-lg leading-relaxed italic">
              {t.decentralisation.phase3Narrative}
            </p>
          </motion.div>

          {/* Pedagogical boxes */}
          <div className="space-y-4 mb-8">
            {/* Definition: Réseau peer-to-peer */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5"
            >
              <h3 className="text-indigo-400 font-bold text-lg mb-2">{t.decentralisation.phase3PeerDefTitle}</h3>
              <p className="text-slate-200 leading-relaxed">
                {t.decentralisation.phase3PeerDefText}
              </p>
            </motion.div>

            {/* Le saviez-vous: Solana performance */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5"
            >
              <h3 className="text-amber-400 font-bold text-lg mb-2">{t.decentralisation.phase3DidYouKnowTitle}</h3>
              <p className="text-slate-200 leading-relaxed">
                {t.decentralisation.phase3DidYouKnowText}
              </p>
            </motion.div>

            {/* Notions clés (recap) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
              className="bg-purple-900/30 border border-purple-500/50 rounded-lg p-5"
            >
              <h3 className="text-purple-400 font-bold text-lg mb-2">{t.decentralisation.phase3KeyPointsTitle}</h3>
              <ul className="space-y-2 text-slate-300">
                {t.decentralisation.phase3KeyPoints.map((point, idx) => {
                  const colors = ['text-red-400', 'text-emerald-400', 'text-blue-400'];
                  return (
                    <li key={idx} className="flex items-start gap-2">
                      <span className={`${colors[idx] || 'text-slate-400'} mt-1`}>&#8226;</span>
                      <span>{point}</span>
                    </li>
                  );
                })}
              </ul>
            </motion.div>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.1, type: 'spring' }}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg p-6 mb-8 text-center border border-yellow-500"
          >
            <div className="text-5xl mb-2">🏆</div>
            <h2 className="text-xl sm:text-2xl font-bold text-white">{t.badges.decentralisation}</h2>
            <p className="text-yellow-100 mt-2">+100 {t.common.xp}</p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/basics">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-slate-700 hover:bg-slate-600 font-bold py-3 rounded-lg transition"
              >
                {t.common.backToCourse}
              </motion.button>
            </Link>
            <Link href="/basics/blockchain">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition"
              >
                {t.common.nextModule} <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
