'use client';

import { useState, useEffect } from 'react';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, RotateCcw, Network } from 'lucide-react';
import { useLocale } from '@/lib/useLocale';
import { SlideLayout } from '@/components/SlideLayout';


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
  const [connections, setConnections] = useState<Connection[]>([]);
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [gameWon, setGameWon] = useState(false);
  const gameState = useGameState();
  const [showConfetti, setShowConfetti] = useState(false);
  const [moduleCompleted, setModuleCompleted] = useState(false);

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
    if (connections.length > 0) {
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
      }
    }
  }, [connections, gameWon, outerNodeIds]);

  // Check if already completed
  const decentralisationModule = gameState.modules.find(m => m.id === 'decentralisation');
  const isAlreadyCompleted = decentralisationModule?.completed ?? false;

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

  // Slide 1: Story intro (Satoshi narrative + problems)
  const slide1 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.decentralisation.phase1Title}
      </h2>

      {/* Narrative Box */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-5 mb-5 border border-blue-600">
        <p className="text-lg leading-relaxed italic text-slate-200">
          {t.decentralisation.phase1Narrative}
        </p>
      </div>

      {/* Problems */}
      <div className="space-y-3">
        <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-red-500">
          <h3 className="font-bold text-red-400 mb-2">{t.decentralisation.singlePointTitle}</h3>
          <p className="text-slate-200">{t.decentralisation.singlePointText}</p>
          <p className="text-slate-400 text-sm mt-2">
            {t.decentralisation.singlePointExample}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-yellow-500">
          <h3 className="font-bold text-yellow-400 mb-2">{t.decentralisation.censorshipTitle}</h3>
          <p className="text-slate-200">{t.decentralisation.censorshipText}</p>
          <p className="text-slate-400 text-sm mt-2">
            {t.decentralisation.censorshipExample}
          </p>
        </div>

        <div className="bg-slate-800/50 rounded-lg p-4 border-l-4 border-purple-500">
          <h3 className="font-bold text-purple-400 mb-2">{t.decentralisation.trustTitle}</h3>
          <p className="text-slate-200">{t.decentralisation.trustText}</p>
          <p className="text-slate-400 text-sm mt-2">
            {t.decentralisation.trustExample}
          </p>
        </div>
      </div>
    </div>
  );

  // Slide 2: Definition + Did you know
  const slide2 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4">
        {t.decentralisation.defTitle}
      </h2>

      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-indigo-400 font-bold text-lg mb-2">{t.decentralisation.defTitle}</p>
        <p className="text-slate-200 leading-relaxed">
          {t.decentralisation.defText}
        </p>
      </div>

      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 sm:p-5">
        <p className="text-amber-400 font-bold text-lg mb-2">{t.decentralisation.didYouKnowTitle}</p>
        <p className="text-slate-200 leading-relaxed">
          {t.decentralisation.didYouKnowText}
        </p>
      </div>
    </div>
  );

  // Slide 3: Network game (full interactive SVG game)
  const slide3 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-2 text-center">
        {t.decentralisation.phase2Title}
      </h2>

      <p className="text-center text-slate-300 mb-4 text-lg">
        {t.decentralisation.phase2Subtitle}
      </p>

      {/* Mission narrative */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-xl p-4 mb-4 border border-blue-600">
        <p className="text-slate-200 leading-relaxed">
          {t.decentralisation.phase2Mission}
        </p>
      </div>

      {/* Key concepts */}
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 mb-4">
        <h3 className="text-purple-400 font-bold text-lg mb-2">{t.decentralisation.phase2KeyConceptsTitle}</h3>
        <p className="text-slate-200 leading-relaxed">
          {t.decentralisation.phase2KeyConceptsText}
        </p>
      </div>

      {/* Game Area */}
      <div className="bg-slate-800/50 rounded-lg p-4 sm:p-8 mb-4 border border-slate-700">
        <div className="h-[250px] sm:h-[400px]">{renderNetworkDiagram(true, true)}</div>
      </div>

      {/* Progress Counter */}
      <div className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-lg p-4 mb-4 border border-purple-600 text-center">
        <p className="text-lg sm:text-2xl font-bold">
          {t.decentralisation.phase2Connections} <span className="text-emerald-400">{(() => {
            const counts = new Map<number, number>();
            outerNodeIds.forEach(id => counts.set(id, 0));
            connections.forEach(conn => {
              counts.set(conn.from, (counts.get(conn.from) || 0) + 1);
              counts.set(conn.to, (counts.get(conn.to) || 0) + 1);
            });
            return Array.from(counts.values()).filter(c => c >= 2).length;
          })()}</span>/{outerNodeIds.length}
        </p>
        <p className="text-sm text-slate-300 mt-2">
          {t.decentralisation.phase2MinConnections}
        </p>
      </div>

      {/* Instructions */}
      {!gameWon && (
        <div className="bg-slate-800/50 rounded-lg p-4 text-sm text-slate-200 mb-4">
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
          className="fixed inset-0 pointer-events-none flex items-center justify-center z-50"
        >
          <div className="text-4xl sm:text-6xl font-bold text-emerald-400">+100 XP</div>
        </motion.div>
      )}

      {/* Finish button when game is won */}
      {gameWon && !moduleCompleted && (
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            completeModule('decentralisation', 100);
            setModuleCompleted(true);
          }}
          className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition"
        >
          {t.common.next} <ArrowRight size={20} />
        </motion.button>
      )}
    </div>
  );

  // Slide 4: Reveal/completion (badge + key points + narrative)
  const slide4 = (
    <div>
      <h2 className="text-2xl sm:text-3xl font-bold text-[var(--sol-green)] mb-4 text-center">
        {t.decentralisation.phase3Title}
      </h2>

      {isAlreadyCompleted && (
        <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3 mb-4 text-sm text-slate-300 text-center">
          <CheckCircle className="inline mr-1" size={14} /> {t.common.alreadyCompleted}
        </div>
      )}

      {/* Decentralized Network Diagram */}
      <div className="bg-slate-800/50 rounded-lg p-4 sm:p-8 mb-4 border border-slate-700">
        <div className="h-[250px] sm:h-[400px]">{renderNetworkDiagram(false, false)}</div>
      </div>

      {/* Narrative */}
      <div className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-xl p-5 mb-4 border border-emerald-600">
        <p className="text-lg leading-relaxed italic text-slate-200">
          {t.decentralisation.phase3Narrative}
        </p>
      </div>

      {/* Peer-to-peer definition */}
      <div className="bg-indigo-900/30 border border-indigo-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-indigo-400 font-bold text-lg mb-2">{t.decentralisation.phase3PeerDefTitle}</p>
        <p className="text-slate-200 leading-relaxed">
          {t.decentralisation.phase3PeerDefText}
        </p>
      </div>

      {/* Did you know: Solana */}
      <div className="bg-amber-900/30 border border-amber-500/50 rounded-xl p-4 sm:p-5 mb-4">
        <p className="text-amber-400 font-bold text-lg mb-2">{t.decentralisation.phase3DidYouKnowTitle}</p>
        <p className="text-slate-200 leading-relaxed">
          {t.decentralisation.phase3DidYouKnowText}
        </p>
      </div>

      {/* Key points recap */}
      <div className="bg-purple-900/30 border border-purple-500/50 rounded-xl p-4 sm:p-5 mb-4">
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
      </div>

      {/* Badge */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.3, type: 'spring' }}
        className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-xl p-6 mb-6 text-center border border-yellow-500"
      >
        <div className="text-5xl mb-2">🏆</div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">{t.badges.decentralisation}</h2>
        <p className="text-yellow-100 mt-2">+100 {t.common.xp}</p>
      </motion.div>

      {/* Navigation */}
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
  );

  // Build slides array: include slide 4 only if module is completed
  const slides = isAlreadyCompleted || moduleCompleted
    ? [slide1, slide2, slide3, slide4]
    : [slide1, slide2, slide3];

  return (
    <SlideLayout
      moduleTitle={t.decentralisation.phase1Title}
      moduleXp={100}
      backLink="/basics"
      backLabel={t.common.backToCourse}
      slides={slides}
      icon={<Network size={18} className="text-[var(--sol-green)]" />}
    />
  );
}
