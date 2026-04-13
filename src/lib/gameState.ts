"use client";

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

const INITIAL_STATE: GameState = {
  playerName: "Fondateur",
  totalXp: 0,
  level: 1,
  modules: [
    {
      id: "decentralisation",
      title: "La Décentralisation",
      completed: false,
      xpEarned: 0,
      maxXp: 100,
      unlocked: true,
    },
    {
      id: "blockchain",
      title: "La Blockchain",
      completed: false,
      xpEarned: 0,
      maxXp: 150,
      unlocked: false,
    },
    {
      id: "wallet",
      title: "Le Wallet",
      completed: false,
      xpEarned: 0,
      maxXp: 120,
      unlocked: false,
    },
  ],
  badges: [],
};

let currentState: GameState = { ...INITIAL_STATE };
let cachedSnapshot: GameState = { ...currentState, modules: currentState.modules.map(m => ({ ...m })), badges: [...currentState.badges] };
const listeners: Set<() => void> = new Set();

export function getGameState(): GameState {
  return cachedSnapshot;
}

export function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function notify() {
  cachedSnapshot = { ...currentState, modules: currentState.modules.map(m => ({ ...m })), badges: [...currentState.badges] };
  listeners.forEach(fn => fn());
}

export function completeModule(moduleId: string, xp: number) {
  const mod = currentState.modules.find(m => m.id === moduleId);
  if (!mod) return;

  mod.completed = true;
  mod.xpEarned = xp;
  currentState.totalXp += xp;
  currentState.level = Math.floor(currentState.totalXp / 100) + 1;

  // Unlock next module
  const idx = currentState.modules.findIndex(m => m.id === moduleId);
  if (idx < currentState.modules.length - 1) {
    currentState.modules[idx + 1].unlocked = true;
  }

  // Award badges
  if (moduleId === "decentralisation") {
    currentState.badges.push("Architecte Réseau");
  } else if (moduleId === "blockchain") {
    currentState.badges.push("Forgeur de Blocs");
  } else if (moduleId === "wallet") {
    currentState.badges.push("Gardien des Clés");
  }

  // Check if all completed
  if (currentState.modules.every(m => m.completed)) {
    currentState.badges.push("Maître des Basics");
  }

  notify();
}

const SERVER_SNAPSHOT: GameState = {
  ...INITIAL_STATE,
  modules: INITIAL_STATE.modules.map(m => ({ ...m })),
  badges: [],
};

export function getServerSnapshot(): GameState {
  return SERVER_SNAPSHOT;
}

export function resetGameState() {
  currentState = {
    ...INITIAL_STATE,
    modules: INITIAL_STATE.modules.map(m => ({ ...m })),
    badges: [],
  };
  notify();
}
