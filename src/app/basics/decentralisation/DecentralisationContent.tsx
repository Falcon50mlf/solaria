'use client';

import { useState, useEffect } from 'react';
import { completeModule } from '@/lib/gameState';
import { useGameState } from '@/lib/useGameState';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { CheckCircle, ArrowRight, RotateCcw } from 'lucide-react';


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
      <svg viewBox="0 0 100 100" className="w-full h-full" style={{ minHeight: '400px' }}>
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
      {/* Phase 1: Story Intro */}
      {phase === 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Le Problème</h1>

          {/* Centralized Network Diagram */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8 border border-slate-700">
            <div style={{ height: '400px' }}>{renderNetworkDiagram(false)}</div>
          </div>

          {/* Narrative Box */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-6 mb-8 border border-blue-600"
          >
            <p className="text-lg leading-relaxed italic">
              "Nous sommes en 2008. Le système financier mondial s'effondre. Les banques centrales
              contrôlent tout. Un mystérieux personnage, Satoshi Nakamoto, se pose une question
              fondamentale : Et si on pouvait supprimer les intermédiaires ?"
            </p>
          </motion.div>

          {/* Definition Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5 mb-6"
          >
            <h3 className="font-bold text-indigo-300 mb-3 text-lg">📖 Définition</h3>
            <p className="text-slate-200 leading-relaxed">
              <strong>La décentralisation</strong>, c'est le fait de répartir le pouvoir entre
              plusieurs participants au lieu de le concentrer en un seul point. Imaginez une salle
              de classe : dans un système centralisé, un seul professeur corrige tous les examens.
              S'il est malade, personne n'est noté. Dans un système décentralisé, les étudiants se
              corrigent mutuellement. Même si l'un d'eux est absent, les autres continuent.
            </p>
          </motion.div>

          {/* Le saviez-vous Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5 mb-6"
          >
            <h3 className="font-bold text-amber-300 mb-3 text-lg">💡 Le saviez-vous ?</h3>
            <p className="text-slate-200 leading-relaxed">
              Bitcoin a été créé en 2009 comme première monnaie décentralisée. Aucune banque,
              aucun gouvernement ne le contrôle. Aujourd'hui, des milliers d'ordinateurs dans le
              monde entier maintiennent le réseau.
            </p>
          </motion.div>

          {/* Explanation */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.9 }}
            className="space-y-4 mb-8"
          >
            <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-red-500">
              <h3 className="font-bold text-red-400 mb-2">Point Unique de Défaillance</h3>
              <p>Si le nœud central échoue, tout le système s'effondre.</p>
              <p className="text-slate-400 text-sm mt-2">
                Imaginez si YouTube était sur un seul serveur : une panne et plus personne ne peut
                regarder de vidéos.
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-yellow-500">
              <h3 className="font-bold text-yellow-400 mb-2">Censure</h3>
              <p>L'autorité centrale peut bloquer les transactions ou contrôler qui a accès.</p>
              <p className="text-slate-400 text-sm mt-2">
                C'est comme si votre banque pouvait décider de bloquer votre compte sans votre
                accord.
              </p>
            </div>

            <div className="bg-slate-700 rounded-lg p-4 border-l-4 border-purple-500">
              <h3 className="font-bold text-purple-400 mb-2">Confiance Requise</h3>
              <p>Vous devez faire confiance à une entité que vous ne contrôlez pas.</p>
              <p className="text-slate-400 text-sm mt-2">
                Quand vous utilisez PayPal, vous faites confiance à PayPal pour ne pas perdre votre
                argent.
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
            Suivant <ArrowRight size={20} />
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
          <h1 className="text-4xl font-bold mb-2 text-center">Décentralisez le réseau !</h1>

          <p className="text-center text-slate-300 mb-6 text-lg">
            Le réseau est centralisé. Cliquez sur les nœuds pour créer des connexions entre eux et
            éliminer le point central.
          </p>

          {/* Mission narrative */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-r from-blue-900 to-blue-800 rounded-lg p-5 mb-6 border border-blue-600"
          >
            <p className="text-slate-200 leading-relaxed">
              Votre mission : transformer ce réseau centralisé en réseau décentralisé. Connectez les
              noeuds entre eux pour que même si un noeud tombe en panne, le réseau continue de
              fonctionner.
            </p>
          </motion.div>

          {/* En pratique Box */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-emerald-900/30 border border-emerald-500/50 rounded-lg p-5 mb-8"
          >
            <h3 className="font-bold text-emerald-300 mb-3 text-lg">🔧 En pratique</h3>
            <p className="text-slate-200 leading-relaxed">
              Dans le réseau Solana, plus de 1 900 validateurs répartis dans le monde entier
              vérifient les transactions. Si un validateur s'arrête, les autres continuent sans
              interruption.
            </p>
          </motion.div>

          {/* Game Area */}
          <div className="bg-slate-800 rounded-lg p-8 mb-6 border border-slate-700">
            <div style={{ height: '500px' }}>{renderNetworkDiagram(true, true)}</div>
          </div>

          {/* Progress Counter */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="bg-gradient-to-r from-purple-900 to-purple-800 rounded-lg p-4 mb-6 border border-purple-600 text-center"
          >
            <p className="text-2xl font-bold">
              Connexions: <span className="text-emerald-400">{connections.length}</span>/
              {outerNodeIds.length} minimum
            </p>
            <p className="text-sm text-slate-300 mt-2">
              Chaque nœud doit avoir au minimum 2 connexions
            </p>
          </motion.div>

          {/* Instructions */}
          {!gameWon && (
            <div className="bg-slate-700 rounded-lg p-4 text-sm text-slate-200 mb-6">
              <p>
                💡 <strong>Comment jouer:</strong> Cliquez sur un nœud pour le sélectionner (il devient
                jaune), puis cliquez sur un autre nœud pour créer une connexion.
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
              <RotateCcw size={18} /> Réinitialiser
            </motion.button>
          )}

          {/* Confetti Effect */}
          {showConfetti && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              className="fixed inset-0 pointer-events-none flex items-center justify-center"
            >
              <div className="text-6xl font-bold text-emerald-400">+100 XP</div>
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
          <h1 className="text-4xl font-bold mb-4 text-center text-emerald-400">La Révélation</h1>

          {isAlreadyCompleted && (
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="bg-slate-700 border border-slate-600 rounded-lg p-3 mb-6 text-sm text-slate-300 text-center"
            >
              ✓ Module déjà complété
            </motion.div>
          )}

          {/* Decentralized Network Diagram */}
          <div className="bg-slate-800 rounded-lg p-8 mb-8 border border-slate-700">
            <div style={{ height: '400px' }}>{renderNetworkDiagram(false, false)}</div>
          </div>

          {/* Narrative */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-r from-emerald-900 to-emerald-800 rounded-lg p-6 mb-8 border border-emerald-600"
          >
            <p className="text-lg leading-relaxed italic">
              "Bravo ! Vous venez de comprendre le principe fondamental de la décentralisation.
              C'est exactement cette vision qui a inspiré Anatoly Yakovenko quand il a commencé à
              imaginer Solana en 2017."
            </p>
          </motion.div>

          {/* Definition: Réseau peer-to-peer */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-indigo-900/30 border border-indigo-500/50 rounded-lg p-5 mb-6"
          >
            <h3 className="font-bold text-indigo-300 mb-3 text-lg">📖 Définition</h3>
            <p className="text-slate-200 leading-relaxed">
              <strong>Réseau peer-to-peer</strong> : un réseau où chaque participant est à la fois
              client et serveur. Pas de chef, tout le monde est égal. C'est comme un groupe WhatsApp
              où tout le monde peut envoyer des messages à tout le monde, sans passer par un
              administrateur.
            </p>
          </motion.div>

          {/* Le saviez-vous: Solana performance */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-amber-900/30 border border-amber-500/50 rounded-lg p-5 mb-6"
          >
            <h3 className="font-bold text-amber-300 mb-3 text-lg">💡 Le saviez-vous ?</h3>
            <p className="text-slate-200 leading-relaxed">
              Solana peut traiter jusqu'à 65 000 transactions par seconde grâce à sa technologie
              unique appelée Proof of History. C'est plus rapide que Visa !
            </p>
          </motion.div>

          {/* Recap section */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-slate-700/50 border border-slate-500/50 rounded-lg p-5 mb-8"
          >
            <h3 className="font-bold text-slate-200 mb-3 text-lg">📝 Ce que vous avez appris</h3>
            <ul className="space-y-2 text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-red-400 mt-1">&#8226;</span>
                <span>Un réseau centralisé dépend d'un seul point &#8594; fragile</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-400 mt-1">&#8226;</span>
                <span>Un réseau décentralisé répartit le pouvoir &#8594; résilient</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-400 mt-1">&#8226;</span>
                <span>La décentralisation est le fondement de toutes les blockchains, dont Solana</span>
              </li>
            </ul>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.1, type: 'spring' }}
            className="bg-gradient-to-r from-amber-600 to-yellow-600 rounded-lg p-6 mb-8 text-center border border-yellow-500"
          >
            <div className="text-5xl mb-2">🏆</div>
            <h2 className="text-2xl font-bold text-white">Architecte Réseau</h2>
            <p className="text-yellow-100 mt-2">+100 XP gagnés</p>
          </motion.div>

          {/* Navigation Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Link href="/basics">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-slate-700 hover:bg-slate-600 font-bold py-3 rounded-lg transition"
              >
                Retour au parcours
              </motion.button>
            </Link>
            <Link href="/basics/blockchain">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition"
              >
                Module suivant <ArrowRight size={20} />
              </motion.button>
            </Link>
          </div>
        </motion.div>
      )}
    </div>
  );
}
