"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldAlert, Check, X } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface Message {
  from: string;
  subject: string;
  body: string;
  isScam: boolean;
  explanation: string;
}

const MESSAGE_POOL: Message[] = [
  { from: "noreply@discord.com", subject: "Nouveau message dans #général", body: "Quelqu'un t'a mentionné dans le serveur Solana Dev Hub.", isScam: false, explanation: "" },
  { from: "airdrop@solana-reward.net", subject: "🎁 Tu as gagné 500 SOL !", body: "Connecte ton wallet maintenant pour réclamer ton airdrop gratuit. Offre limitée 24h !", isScam: true, explanation: "Domaine non officiel, urgence artificielle, connexion wallet demandée" },
  { from: "security@binance.com", subject: "Confirmation de retrait", body: "Votre retrait de 0.05 BTC vers 1A2B... a été confirmé. Référence : TX-9482.", isScam: false, explanation: "" },
  { from: "support@metamask-secure.io", subject: "Votre wallet est compromis", body: "Action requise immédiatement. Entrez votre seed phrase pour sécuriser votre compte.", isScam: true, explanation: "MetaMask ne demande JAMAIS votre seed phrase par email" },
  { from: "team@uniswap.org", subject: "Mise à jour du protocole v4", body: "Uniswap v4 est maintenant disponible. Découvrez les nouvelles fonctionnalités sur notre blog.", isScam: false, explanation: "" },
  { from: "admin@opensea-airdrop.xyz", subject: "NFT gratuit pour toi !", body: "Tu as été sélectionné pour recevoir un NFT rare. Approuve la transaction pour le réclamer.", isScam: true, explanation: "Domaine typosquat, NFT 'gratuit' nécessitant une approbation = drainer" },
  { from: "noreply@coinbase.com", subject: "Connexion depuis un nouvel appareil", body: "Une connexion a été détectée depuis Paris, France. Si ce n'est pas vous, contactez le support.", isScam: false, explanation: "" },
  { from: "rewards@phantom-wallet.net", subject: "Récompense exclusive Phantom", body: "Phantom offre 200 SOL aux early adopters. Visite notre site et connecte ton wallet.", isScam: true, explanation: "Phantom officiel = phantom.app, pas phantom-wallet.net" },
  { from: "discord-bot@discord.com", subject: "Rappel d'événement : AMAs demain", body: "L'AMA avec l'équipe Solana commence demain à 18h UTC dans #ama-channel.", isScam: false, explanation: "" },
  { from: "nft-mint@cryptopunks-free.com", subject: "Mint gratuit CryptoPunks !", body: "Les vrais CryptoPunks ne se mintent plus depuis longtemps. Clique ici pour un faux mint.", isScam: true, explanation: "CryptoPunks ne se mintent plus. Domaine frauduleux évident." },
  { from: "alert@ledger.com", subject: "Mise à jour firmware importante", body: "Une mise à jour de sécurité est disponible pour votre Ledger. Téléchargez via ledger.com/start.", isScam: false, explanation: "" },
  { from: "support@metamask.io", subject: "Phishing alert", body: "Nous avons détecté une tentative de phishing ciblant vos actifs. Cliquez ici pour sécuriser.", isScam: true, explanation: "MetaMask officiel = metamask.io mais le lien 'cliquez ici' redirige ailleurs" },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

function generateRounds(): Message[] {
  return shuffle(MESSAGE_POOL).slice(0, 8);
}

export default function ScamphishingContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [messages] = useState(() => generateRounds());
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<boolean | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = messages.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = messages[round];

  const handleAnswer = (isScam: boolean) => {
    if (answered) return;
    setAnswered(true);
    setSelectedAnswer(isScam);
    if (isScam === current.isScam) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelectedAnswer(null); }
    }, 1600);
  };

  const retry = () => {
    setRound(0); setScore(0); setAnswered(false); setSelectedAnswer(null);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Crypto Inbox</h2>
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
            <p className="text-sm text-slate-400 mb-3">Ce message est-il légitime ou un scam ?</p>
            <div className={`border rounded-xl p-4 mb-4 transition-all ${answered ? (current.isScam ? "border-red-500 bg-red-900/20" : "border-green-500 bg-green-900/10") : "border-slate-600 bg-slate-800/50"}`}>
              <div className="mb-2">
                <span className="text-xs text-slate-400">De : </span>
                <span className="text-xs font-mono text-slate-300">{current.from}</span>
              </div>
              <div className="mb-3">
                <span className="text-xs text-slate-400">Objet : </span>
                <span className="text-sm font-semibold text-white">{current.subject}</span>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{current.body}</p>
              {answered && current.isScam && (
                <p className="text-xs text-red-400 mt-3 flex items-start gap-1">
                  <X size={12} className="mt-0.5 shrink-0" />
                  {current.explanation}
                </p>
              )}
              {answered && !current.isScam && (
                <p className="text-xs text-green-400 mt-3 flex items-start gap-1">
                  <Check size={12} className="mt-0.5 shrink-0" />
                  Message légitime — aucun signal d'alarme détecté.
                </p>
              )}
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => handleAnswer(false)}
                disabled={answered}
                className={`py-3 rounded-xl font-bold text-sm border transition-all cursor-pointer ${answered && !current.isScam ? "border-green-500 bg-green-900/30 text-green-300" : answered && selectedAnswer === false ? "border-red-500 bg-red-900/20 text-red-300" : "border-green-600/50 bg-green-900/10 hover:bg-green-900/20 text-green-400"}`}
              >
                <Check size={16} className="inline mr-1" />Légit
              </button>
              <button
                onClick={() => handleAnswer(true)}
                disabled={answered}
                className={`py-3 rounded-xl font-bold text-sm border transition-all cursor-pointer ${answered && current.isScam ? "border-red-500 bg-red-900/30 text-red-300" : answered && selectedAnswer === true ? "border-amber-500 bg-amber-900/20 text-amber-300" : "border-red-600/50 bg-red-900/10 hover:bg-red-900/20 text-red-400"}`}
              >
                <X size={16} className="inline mr-1" />Scam
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Détecteur de phishing certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="scamphishing" icon={<ShieldAlert size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<ShieldAlert className="w-8 h-8 text-slate-900" />} xp={150} badge={t.badges.scamphishing}
      content={t.scamphishing} nextModuleLink="/security/approvetx" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
