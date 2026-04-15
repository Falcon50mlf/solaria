'use client';

import { useGameState } from '@/lib/useGameState';
import { usePrivy } from '@privy-io/react-auth';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Network,
  Boxes,
  Key,
  Shield,
  Lock,
  CheckCircle2,
  Trophy,
  Zap,
  ChevronLeft,
  Send,
  Brain,
  Server,
  Search,
} from 'lucide-react';
import '@/styles/basics.css';
import { useLocale } from '@/lib/useLocale';
import { TopBar } from '@/components/TopBar';

/* MODULES is now defined inside the component to access i18n translations */

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2,
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
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
  hover: {
    scale: 1.03,
    transition: {
      duration: 0.2,
    },
  },
};

export default function BasicsContent() {
  const { t } = useLocale();
  const { authenticated } = usePrivy();
  const { totalXp, level, modules, badges } = useGameState();
  const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const MODULES = [
    { id: 'decentralisation', title: t.basics.modules.decentralisation.title, subtitle: t.basics.modules.decentralisation.subtitle, backDescription: t.basics.modules.decentralisation.backDescription, icon: Network, maxXp: 100, link: '/basics/decentralisation', step: 1 },
    { id: 'blockchain', title: t.basics.modules.blockchain.title, subtitle: t.basics.modules.blockchain.subtitle, backDescription: t.basics.modules.blockchain.backDescription, icon: Boxes, maxXp: 150, link: '/basics/blockchain', step: 2 },
    { id: 'wallet', title: t.basics.modules.wallet.title, subtitle: t.basics.modules.wallet.subtitle, backDescription: t.basics.modules.wallet.backDescription, icon: Key, maxXp: 120, link: '/basics/wallet', step: 3 },
    { id: 'seedphrase', title: t.basics.modules.seedphrase.title, subtitle: t.basics.modules.seedphrase.subtitle, backDescription: t.basics.modules.seedphrase.backDescription, icon: Shield, maxXp: 130, link: '/basics/seedphrase', step: 4 },
    { id: 'transactions', title: t.basics.modules.transactions.title, subtitle: t.basics.modules.transactions.subtitle, backDescription: t.basics.modules.transactions.backDescription, icon: Send, maxXp: 140, link: '/basics/transactions', step: 5 },
    { id: 'consensus', title: t.basics.modules.consensus.title, subtitle: t.basics.modules.consensus.subtitle, backDescription: t.basics.modules.consensus.backDescription, icon: Brain, maxXp: 160, link: '/basics/consensus', step: 6 },
    { id: 'validators', title: t.basics.modules.validators.title, subtitle: t.basics.modules.validators.subtitle, backDescription: t.basics.modules.validators.backDescription, icon: Server, maxXp: 170, link: '/basics/validators', step: 7 },
    { id: 'explorer', title: t.basics.modules.explorer.title, subtitle: t.basics.modules.explorer.subtitle, backDescription: t.basics.modules.explorer.backDescription, icon: Search, maxXp: 180, link: '/basics/explorer', step: 8 },
  ];

  const moduleStates = new Map(modules.map((m) => [m.id, m]));

  const xpForCurrentLevel = (level - 1) * 100;
  const xpForNextLevel = level * 100;
  const currentLevelXp = totalXp - xpForCurrentLevel;
  const xpNeeded = xpForNextLevel - xpForCurrentLevel;
  const xpProgress = Math.max(0, Math.min(100, (currentLevelXp / xpNeeded) * 100));

  return (
    <main className="basics-container">
      <TopBar />
      <Link
        href={authenticated ? "/dashboard" : "/"}
        className="inline-flex items-center gap-1 text-[var(--sol-text-muted)] hover:text-[var(--sol-text)] transition-colors mb-4 text-sm"
      >
        <ChevronLeft size={16} />
        {authenticated ? t.home.backToDashboard : t.login.backHome}
      </Link>
      <motion.div
        className="player-info-bar"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="player-stats">
          <div className="level-badge">
            <span className="level-number">{level}</span>
            <span className="level-label">{t.common.lvl}</span>
          </div>

          <div className="xp-section">
            <div className="xp-header">
              <span className="xp-label">{t.common.xp}</span>
              <span className="xp-value">
                {totalXp} / {xpForNextLevel}
              </span>
            </div>
            <div className="xp-bar relative overflow-hidden">
              <motion.div
                className="xp-fill"
                initial={{ width: 0 }}
                animate={{ width: `${xpProgress}%` }}
                transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              />
              {!prefersReducedMotion && xpProgress > 0 && (
                <motion.div
                  className="absolute inset-0 rounded-full overflow-hidden pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <motion.div
                    className="h-full w-[30%] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    animate={{ x: ["-100%", "400%"] }}
                    transition={{ duration: 1.5, delay: 1.3, ease: "easeInOut" }}
                  />
                </motion.div>
              )}
            </div>
          </div>
        </div>

        {badges && badges.length > 0 && (
          <div className="badges-container">
            {badges.map((badge, idx) => (
              <motion.div
                key={idx}
                className="badge"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + idx * 0.1, duration: 0.3, type: "spring" }}
                whileHover={{
                  scale: 1.1,
                  rotateY: 15,
                  transition: { duration: 0.2 },
                }}
                style={{ transformStyle: "preserve-3d" }}
                title={badge}
              >
                <Trophy size={16} />
                <span className="badge-text">{badge}</span>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>

      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h1 className="page-title">{t.basics.pageTitle}</h1>
        <p className="page-subtitle">
          {t.basics.pageSubtitle}
        </p>
      </motion.div>

      <motion.div
        className="narrative-box"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <div className="narrative-header">
          <Zap size={20} className="narrative-icon" />
          <h2>{t.basics.chapterTitle}</h2>
        </div>
        <p>
          {t.basics.chapterText}
        </p>
      </motion.div>

      <motion.div
        className="learning-path"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="path-lines">
          {MODULES.map((_, idx) => (
            idx < MODULES.length - 1 && (
              <div key={`line-${idx}`} className="path-line" />
            )
          ))}
        </div>

        <div className="modules-grid">
          {MODULES.map((moduleConfig, idx) => {
            const moduleState = moduleStates.get(moduleConfig.id) || {
              completed: false,
              unlocked: idx === 0,
              xpEarned: 0,
            };

            const Icon = moduleConfig.icon;
            const isLocked = !moduleState.unlocked;
            const isCompleted = moduleState.completed;
            const isActive = moduleState.unlocked && !isCompleted;

            return (
              <motion.div
                key={moduleConfig.id}
                className="module-step relative"
                variants={itemVariants}
              >
                {!prefersReducedMotion && isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-2xl pointer-events-none"
                    animate={{
                      boxShadow: [
                        "0 0 0 1px rgba(20, 241, 149, 0.2)",
                        "0 0 15px 2px rgba(20, 241, 149, 0.3)",
                        "0 0 0 1px rgba(20, 241, 149, 0.2)",
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    style={{ borderRadius: "inherit" }}
                  />
                )}
                <div className={`${isLocked ? '' : 'flip-card'}`} style={{ minHeight: '320px' }}>
                  <div className="flip-card-inner" style={{ minHeight: '320px' }}>
                    {/* FRONT */}
                    <div className="flip-card-front">
                      <Link
                        href={isLocked ? '#' : moduleConfig.link}
                        className={`game-card h-full ${isLocked ? 'locked' : ''} ${
                          isCompleted ? 'completed' : ''
                        } ${isActive ? 'active' : ''}`}
                        style={{
                          pointerEvents: isLocked ? 'none' : 'auto',
                        }}
                      >
                        <motion.div
                          className="card-content h-full"
                          variants={cardVariants}
                        >
                          <div className="step-number">
                            {t.common.step} {moduleConfig.step}
                          </div>

                          <div className="card-icon-wrapper">
                            <div className="card-icon" style={{ filter: isLocked ? "blur(1px)" : "none" }}>
                              <Icon size={36} />
                            </div>
                            {isLocked && (
                              <div className="lock-overlay">
                                <Lock size={20} />
                              </div>
                            )}
                            {isCompleted && (
                              <div className="complete-overlay">
                                <motion.div
                                  initial={{ scale: 0, rotate: -180 }}
                                  animate={{ scale: 1, rotate: 0 }}
                                  transition={{ type: "spring", stiffness: 200, damping: 15, delay: 0.3 }}
                                >
                                  <CheckCircle2 size={24} />
                                </motion.div>
                              </div>
                            )}
                          </div>

                          <h3 className="card-title">{moduleConfig.title}</h3>
                          <p className="card-subtitle">{moduleConfig.subtitle}</p>

                          <div className="card-xp">
                            {isCompleted ? (
                              <div className="xp-earned">
                                <span className="xp-badge">
                                  +{moduleState.xpEarned} {t.common.xp}
                                </span>
                              </div>
                            ) : (
                              <div className="xp-available">
                                <Zap size={14} />
                                <span>{moduleConfig.maxXp} {t.common.xp}</span>
                              </div>
                            )}
                          </div>

                          {isLocked && (
                            <p className="lock-message">
                              {t.common.completePrevious}
                            </p>
                          )}

                          <div className="card-action">
                            {isCompleted ? (
                              <button className="btn-primary completed">
                                {t.common.completed}
                              </button>
                            ) : isLocked ? (
                              <button className="btn-primary locked" disabled>
                                {t.common.locked}
                              </button>
                            ) : (
                              <button className="btn-primary">
                                {t.common.start}
                              </button>
                            )}
                          </div>
                        </motion.div>
                      </Link>
                    </div>

                    {/* BACK */}
                    {!isLocked && (
                      <div className="flip-card-back">
                        <Link
                          href={moduleConfig.link}
                          className={`game-card h-full flex flex-col items-center justify-center text-center ${
                            isCompleted ? 'completed' : ''
                          } ${isActive ? 'active' : ''}`}
                        >
                          <div className="card-content h-full flex flex-col items-center justify-center p-6">
                            <div className="card-icon mb-4">
                              <Icon size={32} />
                            </div>
                            <h3 className="card-title text-lg mb-3">{moduleConfig.title}</h3>
                            <p className="text-sm leading-relaxed" style={{ color: 'var(--color-text-secondary, #b0b5c8)' }}>
                              {moduleConfig.backDescription}
                            </p>
                            <div className="mt-4">
                              <button className="btn-primary text-sm px-4 py-2">
                                {isCompleted ? t.common.completed : t.common.start}
                              </button>
                            </div>
                          </div>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        className="progress-summary"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <div className="summary-content">
          <div className="summary-stat">
            <span className="summary-label">{t.common.modulesCompleted}</span>
            <span className="summary-value">
              {modules.filter((m) => m.completed).length} / {MODULES.length}
            </span>
          </div>
          <div className="summary-stat">
            <span className="summary-label">{t.common.progression}</span>
            <span className="summary-value">
              {Math.round(
                (modules.filter((m) => m.completed).length / MODULES.length) *
                  100
              )}
              %
            </span>
          </div>
          <div className="summary-stat">
            <span className="summary-label">{t.common.xpEarned}</span>
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
