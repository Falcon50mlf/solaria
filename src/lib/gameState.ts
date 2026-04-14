"use client";

import { gameStore } from "./game/store";
import type { ModuleId } from "./game/types";

// Re-export types with string id for backward compatibility
export interface ModuleProgress {
  id: string;
  title: string;
  completed: boolean;
  xpEarned: number;
  maxXp: number;
  unlocked: boolean;
}

export interface GameState {
  playerName: string;
  totalXp: number;
  level: number;
  modules: ModuleProgress[];
  badges: string[];
}

export function getGameState() {
  return gameStore.getState();
}

export function subscribe(listener: () => void) {
  return gameStore.subscribe(listener);
}

export function completeModule(moduleId: string, xp: number) {
  gameStore.getState().completeModule(moduleId as ModuleId, xp);
}

export function resetGameState() {
  gameStore.getState().resetGameState();
}

export function getServerSnapshot() {
  return gameStore.getInitialState();
}
