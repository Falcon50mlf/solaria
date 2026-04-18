"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShieldCheck, Check, X, AlertTriangle } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface EscrowParam {
  label: string;
  options: string[];
  correctIdx: number;
  explanation: string;
}

interface TradeScenario {
  title: string;
  description: string;
  params: EscrowParam[];
}

const SCENARIOS: TradeScenario[] = [
  {
    title: "Vente de NFT rare entre particuliers",
    description: "Tu vends un NFT Bored Ape à 15 ETH à un acheteur inconnu sur Telegram.",
    params: [
      { label: "Montant de garantie", options: ["0 ETH (confiance)", "15 ETH (valeur totale)", "1 ETH (10%)"], correctIdx: 1, explanation: "L'escrow doit couvrir la totalité de la transaction pour protéger les deux parties." },
      { label: "Délai de contestation", options: ["1 heure", "48 heures", "1 semaine"], correctIdx: 1, explanation: "48h est raisonnable pour vérifier la livraison et contester si nécessaire." },
      { label: "Condition de release", options: ["Confirmation acheteur", "Automatique après délai", "Confirmation des deux parties"], correctIdx: 2, explanation: "La confirmation mutuelle protège vendeur ET acheteur d'un litige unilatéral." },
    ]
  },
  {
    title: "Achat de compte gaming contre SOL",
    description: "Tu achètes un compte avec des items rares pour 5 SOL via un forum P2P.",
    params: [
      { label: "Qui dépose les fonds", options: ["Acheteur dépose les SOL", "Vendeur dépose les items", "Les deux déposent"], correctIdx: 0, explanation: "L'acheteur dépose le paiement, le vendeur doit prouver la livraison avant release." },
      { label: "Timeout si pas de réponse", options: ["Refund automatique acheteur", "Release automatique vendeur", "Blocage indéfini"], correctIdx: 0, explanation: "Si le vendeur disparaît, le timeout doit rembourser l'acheteur automatiquement." },
      { label: "Arbitage en cas de dispute", options: ["Tiers arbitre de confiance", "Pas d'arbitre", "Le vendeur décide"], correctIdx: 0, explanation: "Un arbitre neutre est indispensable pour résoudre les disputes fairly." },
    ]
  },
  {
    title: "Freelance crypto : dev de smart contract",
    description: "Tu paies 2 ETH pour qu'un développeur crée un contrat. Livraison en 2 semaines.",
    params: [
      { label: "Structure du paiement", options: ["100% au départ", "50% au départ / 50% à la livraison", "100% à la livraison"], correctIdx: 1, explanation: "50/50 équilibre le risque : le dev est motivé, tu ne perds pas tout si ça échoue." },
      { label: "Condition de release finale", options: ["Code livré sur GitHub", "Tests passants + audit basique", "Confiance mutuelle"], correctIdx: 1, explanation: "Le code doit fonctionner (tests passants) et être basiquement sécurisé avant paiement final." },
      { label: "Délai maximum du projet", options: ["1 semaine", "3 semaines", "6 mois"], correctIdx: 1, explanation: "3 semaines avec marge sur les 2 semaines annoncées — ni trop court, ni ouvert indéfiniment." },
    ]
  },
  {
    title: "Échange OTC entre tokens illiquides",
    description: "Tu échanges 10 000 tokens MOON contre 1 SOL avec un inconnu.",
    params: [
      { label: "Mécanisme d'échange", options: ["Envoyer d'abord et attendre", "Escrow smart contract atomique", "Faire confiance au chat history"], correctIdx: 1, explanation: "Un swap atomique garantit que les deux transferts se font en même temps ou pas du tout." },
      { label: "Vérification des tokens", options: ["Adresse contrat officielle seulement", "Pas de vérification nécessaire", "Vérifier le nom seulement"], correctIdx: 0, explanation: "Toujours vérifier l'adresse du contrat officiel — les faux tokens ont des noms identiques." },
      { label: "Timeout de l'escrow", options: ["24 heures", "5 minutes", "1 mois"], correctIdx: 0, explanation: "24h laisse le temps de compléter mais expire rapidement si l'autre partie disparaît." },
    ]
  },
  {
    title: "Location de wallet multisig pour DAO",
    description: "Une DAO loue l'usage de ton wallet multisig pour gérer 100 000$ de trésorerie.",
    params: [
      { label: "Type d'accès accordé", options: ["Clé privée complète", "Co-signature seulement (multisig 2/3)", "Accès lecture uniquement"], correctIdx: 1, explanation: "Co-signature en multisig : tu gardes le contrôle et peux bloquer des transactions douteuses." },
      { label: "Garantie de la DAO", options: ["Aucune garantie", "5% des fonds en escrow", "Signature d'un document"], correctIdx: 1, explanation: "Une garantie financière en escrow aligne les intérêts et protège en cas de mauvaise foi." },
      { label: "Résiliation du contrat", options: ["Immédiate sans préavis", "30 jours de préavis", "Irrevocable"], correctIdx: 1, explanation: "30 jours permettent un retrait ordonné des fonds sans bloquer les opérations de la DAO." },
    ]
  },
];

function shuffle<T>(arr: T[]): T[] {
  return [...arr].sort(() => Math.random() - 0.5);
}

export default function EscrowContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [rounds] = useState(() => shuffle(SCENARIOS).slice(0, 5));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([null, null, null]);
  const [answered, setAnswered] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const startedRef = useRef(false);

  const TOTAL = rounds.length;
  const passed = gameOver && score >= Math.ceil(TOTAL * 0.7);
  const current = rounds[round];

  const selectAnswer = (paramIdx: number, optIdx: number) => {
    if (answered) return;
    setAnswers(prev => { const next = [...prev]; next[paramIdx] = optIdx; return next; });
  };

  const handleSubmit = () => {
    if (answered) return;
    setAnswered(true);
    const allCorrect = current.params.every((p, i) => answers[i] === p.correctIdx);
    if (allCorrect) setScore(s => s + 1);
    setTimeout(() => {
      if (round + 1 >= TOTAL) { setGameOver(true); timer.stop(); }
      else { setRound(r => r + 1); setAnswers([null, null, null]); setAnswered(false); }
    }, 2200);
  };

  const retry = () => {
    setRound(0); setScore(0); setAnswers([null, null, null]); setAnswered(false);
    setGameOver(false); startedRef.current = false; timer.reset();
  };

  const allAnswered = answers.every(a => a !== null);

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">P2P Trade Config</h2>
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
              <p className="font-bold text-white text-sm mb-1">{current.title}</p>
              <p className="text-xs text-slate-400">{current.description}</p>
            </div>
            <p className="text-xs text-slate-400 mb-3">Configure les paramètres de l'escrow :</p>
            <div className="space-y-4 mb-4">
              {current.params.map((param, pIdx) => (
                <div key={pIdx}>
                  <p className="text-xs font-semibold text-slate-300 mb-1.5">{param.label}</p>
                  <div className="space-y-1.5">
                    {param.options.map((opt, oIdx) => {
                      const isSelected = answers[pIdx] === oIdx;
                      let cls = "border-slate-600 bg-slate-800/50 hover:border-purple-500/50 cursor-pointer";
                      if (answered && oIdx === param.correctIdx) cls = "border-green-500 bg-green-900/20";
                      else if (answered && isSelected && oIdx !== param.correctIdx) cls = "border-red-500 bg-red-900/20";
                      else if (!answered && isSelected) cls = "border-[var(--sol-purple)] bg-purple-900/20";
                      else if (answered) cls = "border-slate-700 bg-slate-800/20 opacity-50";
                      return (
                        <button key={oIdx} onClick={() => selectAnswer(pIdx, oIdx)} disabled={answered}
                          className={`w-full border rounded-lg px-3 py-2 text-left text-xs transition-all ${cls}`}>
                          <div className="flex items-center gap-2">
                            {answered && oIdx === param.correctIdx && <Check size={10} className="text-green-400 shrink-0" />}
                            {answered && isSelected && oIdx !== param.correctIdx && <X size={10} className="text-red-400 shrink-0" />}
                            <span className="text-slate-200">{opt}</span>
                          </div>
                          {answered && oIdx === param.correctIdx && (
                            <p className="text-green-400/80 mt-1 pl-4">{param.explanation}</p>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
            {!answered && (
              <button onClick={handleSubmit} disabled={!allAnswered}
                className="w-full py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 disabled:opacity-50 rounded-lg text-sm font-medium cursor-pointer">
                Valider la configuration
              </button>
            )}
          </motion.div>
        </AnimatePresence>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}
            className={`text-5xl font-bold block mb-2 ${passed ? "text-[var(--sol-green)]" : "text-[var(--sol-accent)]"}`}>{score}/{TOTAL}</motion.span>
          <TimerResult elapsed={timer.elapsed} passed={passed} />
          {passed ? <p className="text-slate-300 mb-4">Expert Escrow P2P certifié !</p>
            : <div><p className="text-[var(--sol-accent)] mb-2">Score minimum : 70%</p>
              <button onClick={retry} className="mt-4 px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">Réessayer</button></div>}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="escrow" icon={<ShieldCheck size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<ShieldCheck className="w-8 h-8 text-slate-900" />} xp={150} badge={t.badges.escrow}
      content={t.escrow} nextModuleLink={null} gameSlide={gameSlide} gameCompleted={passed} />
  );
}
