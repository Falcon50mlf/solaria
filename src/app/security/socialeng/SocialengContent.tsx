"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserX, AlertTriangle, Check, MessageSquare } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface ChatMessage {
  author: string;
  text: string;
  isRedFlag: boolean;
}

interface Scenario {
  context: string;
  messages: ChatMessage[];
  redFlagIdx: number;
  explanation: string;
}

const SCENARIOS: Scenario[] = [
  {
    context: "Un inconnu te DM sur Discord après que tu as posté dans #help",
    messages: [
      { author: "CryptoHelper#4421", text: "Salut, j'ai vu ton problème. Je peux t'aider !", isRedFlag: false },
      { author: "CryptoHelper#4421", text: "C'est un bug connu, le support officiel peut le résoudre.", isRedFlag: false },
      { author: "CryptoHelper#4421", text: "Pour vérifier ton wallet, j'ai besoin de ta seed phrase. C'est la procédure standard.", isRedFlag: true },
    ],
    redFlagIdx: 2,
    explanation: "Personne ne demande jamais ta seed phrase. Le support officiel ne DM JAMAIS en premier."
  },
  {
    context: "Un 'mod' du serveur Uniswap officiel te contacte",
    messages: [
      { author: "Uniswap_Mod ✓", text: "Bonjour, nous avons détecté une activité suspecte sur votre compte.", isRedFlag: false },
      { author: "Uniswap_Mod ✓", text: "Pour sécuriser vos fonds, veuillez vérifier votre wallet maintenant.", isRedFlag: true },
      { author: "Uniswap_Mod ✓", text: "Cliquez ici : uniswap-security.io/verify", isRedFlag: false },
    ],
    redFlagIdx: 1,
    explanation: "Les mods légitimes ne DM jamais en premier pour 'sécuriser' ton compte. C'est toujours une tentative de phishing."
  },
  {
    context: "Quelqu'un te répond sur Twitter après que tu as mentionné avoir un problème",
    messages: [
      { author: "@MetaMask_Help", text: "Hey ! On peut t'aider avec ce problème.", isRedFlag: false },
      { author: "@MetaMask_Help", text: "Peux-tu nous envoyer ton adresse wallet pour vérification ?", isRedFlag: true },
      { author: "@MetaMask_Help", text: "On traitera ça en priorité pour toi.", isRedFlag: false },
    ],
    redFlagIdx: 1,
    explanation: "L'adresse wallet publique n'est pas un secret, mais ce compte est probablement un faux. Le vrai MetaMask ne DM pas."
  },
  {
    context: "Un investisseur te contacte via Telegram pour un 'partenariat'",
    messages: [
      { author: "CryptoVC_Alex", text: "Bonjour ! J'ai vu votre projet sur Twitter, c'est très prometteur.", isRedFlag: false },
      { author: "CryptoVC_Alex", text: "Nous investissons dans des projets early-stage. Budget disponible : 500k$.", isRedFlag: false },
      { author: "CryptoVC_Alex", text: "Pour procéder, nous avons besoin d'un 'gas fee' de 0.1 ETH pour l'audit préliminaire.", isRedFlag: true },
    ],
    redFlagIdx: 2,
    explanation: "Les vrais VCs ne demandent jamais d'argent pour un 'audit'. C'est l'arnaque classique advance-fee fraud."
  },
  {
    context: "Un 'gagnant' d'un concours te contacte pour te remettre ton prix",
    messages: [
      { author: "NFT_Contest_Bot", text: "Félicitations ! Tu as été sélectionné parmi 10 000 participants !", isRedFlag: false },
      { author: "NFT_Contest_Bot", text: "Tu as gagné un NFT d'une valeur de 2 ETH.", isRedFlag: false },
      { author: "NFT_Contest_Bot", text: "Pour débloquer le NFT, approuve cette transaction de 0.05 ETH.", isRedFlag: true },
    ],
    redFlagIdx: 2,
    explanation: "Tu n'as pas participé à ce concours. Les vrais prix ne demandent pas de paiement pour être réclamés."
  },
  {
    context: "Un admin d'un protocole DeFi te contacte pour un airdrop exclusif",
    messages: [
      { author: "YieldProtocol_Dev", text: "Salut ! Tu es un early user de notre protocole.", isRedFlag: false },
      { author: "YieldProtocol_Dev", text: "Nous t'avons réservé 500 tokens YIELD en tant qu'early adopter.", isRedFlag: false },
      { author: "YieldProtocol_Dev", text: "Connecte-toi sur yield-claim.net avec MetaMask pour les réclamer.", isRedFlag: true },
    ],
    redFlagIdx: 2,
    explanation: "Le domaine 'yield-claim.net' n'est pas le domaine officiel. Les airdrops légitimes se font sur le site officiel du projet."
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function SocialengContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(SCENARIOS).slice(0, 6));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const handleSelect = (msgIdx: number) => {
    if (answered) return;
    setAnswered(true);
    setSelected(msgIdx);
    if (msgIdx === current.redFlagIdx) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswered(false); setSelected(null); }
    }, 2000);
  };

  const retry = () => {
    setRound(0); setScore(0); setSelected(null); setAnswered(false);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Chat Simulator</h2>
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
            <div className="bg-slate-900/80 border border-slate-700 rounded-xl p-3 mb-4">
              <div className="flex items-center gap-2 mb-1">
                <MessageSquare size={12} className="text-[var(--sol-blue)]" />
                <span className="text-xs text-slate-400">{current.context}</span>
              </div>
            </div>
            <p className="text-xs text-slate-400 mb-3">Clique sur le message qui contient un red flag :</p>
            <div className="space-y-2 mb-4">
              {current.messages.map((msg, idx) => {
                let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                if (answered && idx === current.redFlagIdx) cls = "border-red-500 bg-red-900/20";
                else if (answered && idx === selected) cls = "border-amber-500 bg-amber-900/20";
                else if (answered) cls = "border-slate-700 bg-slate-800/30 opacity-70";
                return (
                  <button key={idx} onClick={() => handleSelect(idx)} disabled={answered}
                    className={`w-full border rounded-xl p-3 text-left transition-all ${cls}`}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs font-semibold text-[var(--sol-blue)]">{msg.author}</span>
                      {answered && idx === current.redFlagIdx && <AlertTriangle size={12} className="text-red-400" />}
                      {answered && idx === selected && idx !== current.redFlagIdx && <Check size={12} className="text-slate-400" />}
                    </div>
                    <p className="text-sm text-slate-300">{msg.text}</p>
                  </button>
                );
              })}
            </div>
            {answered && (
              <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="text-xs text-amber-300 p-3 bg-amber-900/20 border border-amber-500/30 rounded-lg">
                <AlertTriangle size={10} className="inline mr-1" />{current.explanation}
              </motion.p>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Résistant à l'ingénierie sociale !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="socialeng" icon={<UserX size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<UserX className="w-8 h-8 text-slate-900" />} xp={150} badge={t.badges.socialeng}
      content={t.socialeng} nextModuleLink="/security/fakedapp" gameSlide={gameSlide} gameCompleted={passed} />
  );
}
