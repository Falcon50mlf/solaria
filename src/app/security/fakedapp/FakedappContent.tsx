"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertOctagon, Check, X, Eye } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface DiffItem {
  label: string;
  real: string;
  fake: string;
  explanation: string;
}

interface SpotRound {
  name: string;
  realLabel: string;
  fakeLabel: string;
  differences: DiffItem[];
}

const ROUNDS: SpotRound[] = [
  {
    name: "Uniswap",
    realLabel: "app.uniswap.org",
    fakeLabel: "app.uniswop.org",
    differences: [
      { label: "URL", real: "app.uniswap.org", fake: "app.uniswop.org", explanation: "Typo dans l'URL : 'uniswop' au lieu de 'uniswap'" },
      { label: "Logo texte", real: "Uniswap", fake: "UniSwap", explanation: "Le logo officiel s'écrit 'Uniswap' (minuscule 's')" },
      { label: "Certificat SSL", real: "🔒 Sécurisé", fake: "🔓 Non sécurisé", explanation: "Absence de HTTPS — jamais interagir sans certificat valide" },
    ]
  },
  {
    name: "MetaMask",
    realLabel: "metamask.io",
    fakeLabel: "metamask-io.com",
    differences: [
      { label: "Domaine", real: "metamask.io", fake: "metamask-io.com", explanation: "Le vrai MetaMask = metamask.io uniquement, jamais de tiret" },
      { label: "Extension permission", real: "Lire données onglet actif", fake: "Lire TOUTES les données de navigation", explanation: "Une extension légitime ne demande pas toutes les données de navigation" },
      { label: "Bouton principal", real: "Créer un nouveau wallet", fake: "Importer wallet (champ seed phrase visible)", explanation: "Une fausse extension affiche immédiatement le champ seed phrase" },
    ]
  },
  {
    name: "OpenSea",
    realLabel: "opensea.io",
    fakeLabel: "opensea.io.market.net",
    differences: [
      { label: "URL complète", real: "https://opensea.io/collection/xyz", fake: "https://opensea.io.market.net/xyz", explanation: "Le domaine réel est 'opensea.io' — tout ce qui suit le premier slash est un chemin, pas un sous-domaine" },
      { label: "Bouton mint", real: "Aucun bouton mint (collection existante)", fake: "Mint NFT exclusif — 0.1 ETH", explanation: "Les collections existantes ne se mintent plus — bouton mint = arnaque" },
      { label: "Nombre d'items", real: "10 000 items (vérifié ✓)", fake: "3 items (non vérifié)", explanation: "Peu d'items et collection non vérifiée = copie frauduleuse" },
    ]
  },
  {
    name: "Ledger",
    realLabel: "ledger.com",
    fakeLabel: "ledger-live.app",
    differences: [
      { label: "Domaine officiel", real: "ledger.com/ledger-live", fake: "ledger-live.app", explanation: "Ledger Live se télécharge uniquement sur ledger.com — jamais un .app suspect" },
      { label: "Connexion wallet", real: "Connection via câble USB", fake: "Entrez votre seed phrase pour connecter", explanation: "Ledger ne demande JAMAIS la seed phrase en ligne" },
      { label: "Contact support", real: "Formulaire officiel sur ledger.com/support", fake: "Support Telegram direct", explanation: "Le vrai support Ledger n'est jamais via Telegram" },
    ]
  },
  {
    name: "Phantom",
    realLabel: "phantom.app",
    fakeLabel: "phantom-wallet.com",
    differences: [
      { label: "URL", real: "https://phantom.app", fake: "https://phantom-wallet.com", explanation: "Phantom officiel = phantom.app uniquement" },
      { label: "Icône extension", real: "Fantôme violet officiel", fake: "Fantôme avec légère variation de couleur", explanation: "Les extensions malveillantes copient presque parfaitement les icônes" },
      { label: "Permissions demandées", real: "Accès aux sites crypto approuvés", fake: "Accès complet à tous les sites web", explanation: "Phantom légitime ne demande pas l'accès à tous les sites" },
    ]
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function FakedappContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(ROUNDS).slice(0, 5));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [found, setFound] = useState<Set<number>>(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const toggleDiff = (idx: number) => {
    if (submitted) return;
    setFound(prev => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const handleSubmit = () => {
    if (submitted) return;
    setSubmitted(true);
    const roundScore = found.size === current.differences.length && [...found].every(i => i < current.differences.length) ? 1 : 0;
    const newScore = score + roundScore;
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setScore(newScore); setGameOver(true); timer.stop(); }
      else {
        setScore(newScore); setRound(r => r + 1);
        setFound(new Set()); setSubmitted(false);
      }
    }, 2000);
  };

  const retry = () => {
    setRound(0); setScore(0); setFound(new Set()); setSubmitted(false);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Spot the Fake</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <div key={i} className={`h-1.5 flex-1 rounded-full ${i < round ? "bg-[var(--sol-green)]" : i === round && !gameOver ? "bg-[var(--sol-purple)]" : "bg-slate-700"}`} />
        ))}
      </div>
      {!gameOver ? (
        <AnimatePresence mode="wait">
          <motion.div key={round} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
            <div className="bg-slate-800/50 border border-slate-600 rounded-xl p-3 mb-4">
              <p className="text-sm font-bold text-white mb-1">{current.name}</p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-green-900/20 border border-green-500/30 rounded-lg p-2">
                  <p className="text-green-400 font-semibold mb-0.5">RÉEL</p>
                  <p className="font-mono text-slate-300">{current.realLabel}</p>
                </div>
                <div className="bg-red-900/20 border border-red-500/30 rounded-lg p-2">
                  <p className="text-red-400 font-semibold mb-0.5">FAKE</p>
                  <p className="font-mono text-slate-300">{current.fakeLabel}</p>
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-3">Sélectionne les {current.differences.length} différences que tu trouves :</p>
            <div className="space-y-2 mb-4">
              {current.differences.map((diff, idx) => {
                const isFound = found.has(idx);
                return (
                  <button key={idx} onClick={() => toggleDiff(idx)} disabled={submitted}
                    className={`w-full border rounded-xl p-3 text-left transition-all cursor-pointer ${submitted ? "border-green-500 bg-green-900/20" : isFound ? "border-purple-500 bg-purple-900/20" : "border-slate-600 bg-slate-800/50 hover:border-purple-500/50"}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-white">{diff.label}</span>
                      {isFound && !submitted && <Eye size={12} className="text-[var(--sol-purple)]" />}
                      {submitted && <Check size={12} className="text-green-400" />}
                    </div>
                    <div className="grid grid-cols-2 gap-1 text-xs">
                      <span className="text-green-400 truncate">{diff.real}</span>
                      <span className="text-red-400 truncate">{diff.fake}</span>
                    </div>
                    {submitted && <p className="text-xs text-amber-300 mt-1">{diff.explanation}</p>}
                  </button>
                );
              })}
            </div>
            {!submitted && (
              <button onClick={handleSubmit} disabled={found.size === 0}
                className="w-full py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 disabled:opacity-50 rounded-lg text-sm font-medium cursor-pointer">
                Signaler les différences ({found.size}/{current.differences.length})
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Détecteur de faux dApps certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="fakedapp" icon={<AlertOctagon size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<AlertOctagon className="w-8 h-8 text-slate-900" />} xp={140} badge={t.badges.fakedapp}
      content={t.fakedapp} nextModuleLink="/security/malware" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
