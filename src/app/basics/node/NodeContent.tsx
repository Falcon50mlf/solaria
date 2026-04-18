"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Cpu, Check, X, HardDrive, MemoryStick, Wifi, DollarSign } from "lucide-react";
import { GameModule } from "@/components/GameModule";
import { useLocale } from "@/lib/useLocale";
import { useQuizTimer, TimerDisplay, TimerResult } from "@/components/QuizTimer";

interface HardwareOption { label: string; value: number; cost: number; min: number; unit: string }

function randomBudget() { return 800 + Math.floor(Math.random() * 500); }

const CPU_OPTIONS: HardwareOption[] = [
  { label: "4 cœurs", value: 4, cost: 100, min: 12, unit: "cœurs" },
  { label: "8 cœurs", value: 8, cost: 200, min: 12, unit: "cœurs" },
  { label: "12 cœurs", value: 12, cost: 350, min: 12, unit: "cœurs" },
  { label: "16 cœurs", value: 16, cost: 500, min: 12, unit: "cœurs" },
];
const RAM_OPTIONS: HardwareOption[] = [
  { label: "64 Go", value: 64, cost: 50, min: 256, unit: "Go" },
  { label: "128 Go", value: 128, cost: 100, min: 256, unit: "Go" },
  { label: "256 Go", value: 256, cost: 200, min: 256, unit: "Go" },
  { label: "512 Go", value: 512, cost: 400, min: 256, unit: "Go" },
];
const SSD_OPTIONS: HardwareOption[] = [
  { label: "500 Go SATA", value: 500, cost: 30, min: 2000, unit: "Go NVMe" },
  { label: "1 To NVMe", value: 1000, cost: 100, min: 2000, unit: "Go NVMe" },
  { label: "2 To NVMe", value: 2000, cost: 200, min: 2000, unit: "Go NVMe" },
  { label: "4 To NVMe", value: 4000, cost: 350, min: 2000, unit: "Go NVMe" },
];
const NET_OPTIONS: HardwareOption[] = [
  { label: "100 Mbps", value: 100, cost: 20, min: 1000, unit: "Mbps" },
  { label: "500 Mbps", value: 500, cost: 50, min: 1000, unit: "Mbps" },
  { label: "1 Gbps", value: 1000, cost: 100, min: 1000, unit: "Mbps" },
  { label: "10 Gbps", value: 10000, cost: 200, min: 1000, unit: "Mbps" },
];

const CATEGORIES = [
  { key: "cpu", label: "CPU", icon: Cpu, options: CPU_OPTIONS },
  { key: "ram", label: "RAM", icon: MemoryStick, options: RAM_OPTIONS },
  { key: "ssd", label: "SSD", icon: HardDrive, options: SSD_OPTIONS },
  { key: "net", label: "Réseau", icon: Wifi, options: NET_OPTIONS },
] as const;

export default function NodeContent() {
  const { t } = useLocale();
  const timer = useQuizTimer();
  const [budget] = useState(() => randomBudget());
  const [selections, setSelections] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const startedRef = useRef(false);

  const totalCost = Object.entries(selections).reduce((sum, [key, idx]) => {
    const cat = CATEGORIES.find((c) => c.key === key);
    return sum + (cat ? cat.options[idx].cost : 0);
  }, 0);

  const allSelected = CATEGORIES.every((c) => selections[c.key] !== undefined);

  const meetsSpecs = allSelected && CATEGORIES.every((c) => {
    const opt = c.options[selections[c.key]];
    return opt && opt.value >= opt.min;
  });

  const withinBudget = totalCost <= budget;
  const passed = submitted && meetsSpecs && withinBudget;

  const handleSelect = (catKey: string, optIdx: number) => {
    if (submitted) return;
    setSelections((prev) => ({ ...prev, [catKey]: optIdx }));
  };

  const handleSubmit = () => {
    if (!allSelected || submitted) return;
    setSubmitted(true);
    timer.stop();
  };

  const retry = () => {
    setSelections({}); setSubmitted(false); startedRef.current = false; timer.reset();
  };

  const gameSlide = (
    <div ref={(el) => { if (el && !startedRef.current) { startedRef.current = true; timer.start(); } }}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl sm:text-2xl font-bold text-[var(--sol-green)]">Construis ton Nœud</h2>
        <TimerDisplay elapsed={timer.elapsed} />
      </div>

      <div className="flex items-center justify-between mb-4 bg-slate-800/50 border border-slate-600 rounded-lg p-3">
        <div className="flex items-center gap-2">
          <DollarSign size={16} className="text-[var(--sol-green)]" />
          <span className="text-sm text-slate-300">Budget : <strong className="text-white">${budget}/mois</strong></span>
        </div>
        <span className={`text-sm font-bold ${totalCost > budget ? "text-red-400" : "text-[var(--sol-green)]"}`}>
          Dépensé : ${totalCost}
        </span>
      </div>

      {!submitted ? (
        <div className="space-y-4">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            return (
              <div key={cat.key}>
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={14} className="text-[var(--sol-purple)]" />
                  <span className="text-sm font-medium text-slate-300">{cat.label}</span>
                  <span className="text-xs text-slate-500">(min : {cat.options[0].min} {cat.options[0].unit})</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {cat.options.map((opt, idx) => {
                    const isSelected = selections[cat.key] === idx;
                    const meetsMin = opt.value >= opt.min;
                    return (
                      <button key={idx} onClick={() => handleSelect(cat.key, idx)}
                        className={`border rounded-lg p-2 text-center text-xs cursor-pointer transition-all ${
                          isSelected ? (meetsMin ? "border-green-500 bg-green-900/30" : "border-amber-500 bg-amber-900/30")
                          : "border-slate-600 bg-slate-800/50 hover:border-purple-500/50"}`}>
                        <div className="text-white font-medium">{opt.label}</div>
                        <div className="text-slate-400">${opt.cost}</div>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <button onClick={handleSubmit} disabled={!allSelected}
            className={`w-full py-3 rounded-lg font-bold cursor-pointer transition-all ${
              allSelected ? "bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-500 hover:to-purple-600"
              : "bg-slate-700 text-slate-400 cursor-not-allowed"}`}>
            Valider la configuration
          </button>
        </div>
      ) : (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          {passed ? (
            <>
              <Check className="w-16 h-16 mx-auto mb-4 text-[var(--sol-green)]" />
              <p className="text-2xl font-bold text-[var(--sol-green)] mb-2">Nœud opérationnel !</p>
              <TimerResult elapsed={timer.elapsed} passed={true} />
              <p className="text-slate-300">Specs valides, budget respecté (${totalCost}/${budget})</p>
            </>
          ) : (
            <>
              <X className="w-16 h-16 mx-auto mb-4 text-[var(--sol-accent)]" />
              <p className="text-2xl font-bold text-[var(--sol-accent)] mb-2">Configuration invalide</p>
              <div className="text-sm text-slate-400 space-y-1 mb-4">
                {!meetsSpecs && <p className="text-red-400">Specs insuffisantes pour un nœud Solana</p>}
                {!withinBudget && <p className="text-red-400">Budget dépassé (${totalCost} &gt; ${budget})</p>}
              </div>
              <button onClick={retry} className="px-6 py-2.5 bg-[var(--sol-purple)] hover:bg-[var(--sol-purple)]/80 rounded-lg text-sm font-medium cursor-pointer">
                Réessayer
              </button>
            </>
          )}
        </motion.div>
      )}
    </div>
  );

  return (
    <GameModule moduleId="node" icon={<Cpu size={18} className="text-[var(--sol-purple)]" />}
      badgeIcon={<Cpu className="w-8 h-8 text-slate-900" />} xp={160} badge={t.badges.node}
      content={t.node} nextModuleLink={null} gameSlide={gameSlide} gameCompleted={passed} />
  );
}
