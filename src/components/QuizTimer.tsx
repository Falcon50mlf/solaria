"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { Timer } from "lucide-react";

export function useQuizTimer() {
  const [elapsed, setElapsed] = useState(0);
  const [running, setRunning] = useState(false);
  const startRef = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    if (startRef.current) return;
    startRef.current = Date.now();
    setRunning(true);
  }, []);

  const stop = useCallback(() => {
    setRunning(false);
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = null;
  }, []);

  const reset = useCallback(() => {
    stop();
    setElapsed(0);
    startRef.current = null;
  }, [stop]);

  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setElapsed(Math.floor((Date.now() - (startRef.current ?? Date.now())) / 1000));
    }, 1000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [running]);

  return { elapsed, start, stop, reset, running };
}

export function TimerDisplay({ elapsed }: { elapsed: number }) {
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  const formatted = `${m}:${s.toString().padStart(2, "0")}`;
  const color = elapsed < 30 ? "text-[var(--sol-green)]" : elapsed < 60 ? "text-amber-400" : "text-[var(--sol-accent)]";

  return (
    <div className={`flex items-center gap-2 font-mono text-lg font-bold ${color} transition-colors`}>
      <Timer size={18} />
      <span>{formatted}</span>
    </div>
  );
}

export function TimerResult({ elapsed, passed }: { elapsed: number; passed: boolean }) {
  const m = Math.floor(elapsed / 60);
  const s = elapsed % 60;
  const formatted = `${m}:${s.toString().padStart(2, "0")}`;

  return (
    <p className="text-sm font-mono text-slate-400 mb-4 flex items-center justify-center gap-1.5">
      <Timer size={14} /> {formatted}
      {passed && elapsed < 30 && <span className="ml-2 text-[var(--sol-green)] font-bold uppercase text-xs">Speed bonus!</span>}
    </p>
  );
}
