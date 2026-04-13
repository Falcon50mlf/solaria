'use client';

import { useGameState } from '@/lib/useGameState';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Network,
  Boxes,
  Key,
  Lock,
  CheckCircle2,
  Trophy,
  Zap,
} from 'lucide-react';
import '@/styles/basics.css';

const MODULES = [
  {
    id: 'decentralisation',
    title: 'La Décentralisation',
    subtitle: 'Pourquoi distribuer le pouvoir ?',
    icon: Network,
    maxXp: 100,
    link: '/basics/decentralisation',
    step: 1,
  },
  {
    id: 'blockchain',
    title: 'La Blockchain',
    subtitle: 'Comment créer une chaîne de confiance ?',
    icon: Boxes,
    maxXp: 150,
    link: '/basics/blockchain',
    step: 2,
  },
  {
    id: 'wallet',
    title: 'Le Wallet',
    subtitle: 'Votre identité dans le monde crypto',
    icon: Key,
    maxXp: 120,
    link: '/basics/wallet',
    step: 3,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut" as const,
    },
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.2,
    },
  },
};

export default function BasicsPage() {
  const { totalXp, level, modules, badges } = useGameState();

  // Map game state modules by id
  const moduleStates = new Map(modules.map((m) => [m.id, m]));

  // Calculate XP for progress bar
  const xpForCurrentLevel = level * 100;
  const xpForNextLevel = (level + 1) * 100;
  const currentLevelXp = totalXp - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  const xpProgress = Math.max(0, Math.min(100, (currentLevelXp / xpNeeded) * 100));

  return (
    <main className="basics-container">
      {/* Top Bar - Player Info */}
      <motion.div
        className="player-info-bar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="player-stats">
          <div className="level-badge">
            <span className="level-number">{level}</span>
            <span className="level-label">LVL</span>
          </div>

          <div className="xp-section">
            <div className="xp-header">
              <span className="xp-label">XP</span>
              <span className="xp-value">
                {totalXp} / {xpForNextLevel}
              </span>
            </div>
            <div className="xp-bar">
              <motion.div
                className="xp-fill"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 1, delay: 0.3, ease: 'easeOut' }}
              />
            </div>
          </div>
        </div>

        {/* Badges */}
        {badges && badges.length > 0 && (
          <div className="badges-container">
            {badges.map((badge, idx) => (
              <motion.div
                key={idx}
                className="badge"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.3 }}
                title={badge}
              >
                <Trophy size={16} />
                <span className="badge-text">{badge}</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      {/* Page Header */}
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="page-title">Les Basics</h1>
        <p className="page-subtitle">
          Les fondations de la révolution Solana
        </p>
      </motion.div>

      {/* Narrative Box */}
      <motion.div
        className="narrative-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="narrative-header">
          <Zap size={20} className="narrative-icon" />
          <h2>Chapitre 1 : Les Basics</h2>
        </div>
        <p>
          Avant de construire Solana, il faut comprendre les piliers sur
          lesquels repose toute blockchain. Chaque étape vous rapproche de la
          vision d'Anatoly Yakovenko.
        </p>
      </motion.div>

      {/* Vertical Learning Path */}
      <motion.div
        className="learning-path"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Connecting Lines */}
        <div className="path-lines">
          {MODULES.map((_, idx) => (
            idx < MODULES.length - 1 && (
              <div key={`line-${idx}`} className="path-line" />
            )
          ))}
        </div>

        {/* Module Cards */}
        <div className="modules-grid">
          {MODULES.map((moduleConfig, idx) => {
            const moduleState = moduleStates.get(moduleConfig.id) || {
              completed: false,
              unlocked: idx === 0, // First module is always unlocked
              xpEarned: 0,
            };

            const Icon = moduleConfig.icon;
            const isLocked = !moduleState.unlocked;
            const isCompleted = moduleState.completed;
            const isActive = moduleState.unlocked && !isCompleted;

            return (
              <motion.div
                key={moduleConfig.id}
                className="module-step"
                variants={itemVariants}
              >
                <Link
                  href={isLocked ? '#' : moduleConfig.link}
                  className={`game-card ${isLocked ? 'locked' : ''} ${
                    isCompleted ? 'completed' : ''
                  } ${isActive ? 'active' : ''}`}
                  style={{
                    pointerEvents: isLocked ? 'none' : 'auto',
                  }}
                >
                  <motion.div
                    className="card-content"
                    variants={cardVariants}
                    whileHover={!isLocked ? 'hover' : undefined}
                  >
                    {/* Step Number */}
                    <div className="step-number">
                      Étape {moduleConfig.step}
                    </div>

                    {/* Card Icon */}
                    <div className="card-icon-wrapper">
                      <div className="card-icon">
                        <Icon size={36} />
                      </div>
                      {isLocked && (
                        <div className="lock-overlay">
                          <Lock size={20} />
                        </div>
                      )}
                      {isCompleted && (
                        <div className="complete-overlay">
                          <CheckCircle2 size={24} />
                        </div>
                      )}
                    </div>

                    {/* Card Title */}
                    <h3 className="card-title">{moduleConfig.title}</h3>

                    {/* Card Subtitle */}
                    <p className="card-subtitle">{moduleConfig.subtitle}</p>

                    {/* XP Info */}
                    <div className="card-xp">
                      {isCompleted ? (
                        <div className="xp-earned">
                          <span className="xp-badge">
                            +{moduleState.xpEarned} XP
                          </span>
                        </div>
                      ) : (
                        <div className="xp-available">
                          <Zap size={14} />
                          <span>{moduleConfig.maxXp} XP</span>
                        </div>
                      )}
                    </div>

                    {/* Lock Message */}
                    {isLocked && (
                      <p className="lock-message">
                        Complétez l'étape précédente
                      </p>
                    )}

                    {/* Button */}
                    <div className="card-action">
                      {isCompleted ? (
                        <button className="btn-primary completed">
                          Terminé
                        </button>
                      ) : isLocked ? (
                        <button className="btn-primary locked" disabled>
                          Verrouillé
                        </button>
                      ) : (
                        <button className="btn-primary">
                          Commencer
                        </button>
                      )}
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Progress Summary */}
      <motion.div
        className="progress-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="summary-content">
          <div className="summary-stat">
            <span className="summary-label">Modules complétés</span>
            <span className="summary-value">
              {modules.filter((m) => m.completed).length} / {MODULES.length}
            </span>
          </div>
          <div className="summary-stat">
            <span className="summary-label">Progression</span>
            <span className="summary-value">
              {Math.round(
                (modules.filter((m) => m.completed).length / MODULES.length) *
                  100
              )}
              %
            </span>
          </div>
          <div className="summary-stat">
            <span className="summary-label">XP gagné</span>
            <span className="summary-value">
              {modules.reduce((sum, m) => sum + m.xpEarned, 0)} /{' '}
              {MODULES.reduce((sum, m) => sum + m.maxXp, 0)}
            </span>
          </div>
        </div>
      </motion.div>
    </main>
  );
}
