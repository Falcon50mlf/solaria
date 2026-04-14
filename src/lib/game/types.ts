export type ModuleId = "decentralisation" | "blockchain" | "wallet";

export interface ModuleProgress {
  id: ModuleId;
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

export interface GameActions {
  completeModule: (moduleId: ModuleId, xp: number) => void;
  resetGameState: () => void;
}

export type GameStore = GameState & GameActions;

export const MODULE_BADGES: Record<ModuleId, string> = {
  decentralisation: "Architecte Réseau",
  blockchain: "Forgeur de Blocs",
  wallet: "Gardien des Clés",
};

export const MASTER_BADGE = "Maître des Basics";

export const MODULE_ORDER: ModuleId[] = [
  "decentralisation",
  "blockchain",
  "wallet",
];

export const INITIAL_MODULES: ModuleProgress[] = [
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
];

export const INITIAL_STATE: GameState = {
  playerName: "Fondateur",
  totalXp: 0,
  level: 1,
  modules: INITIAL_MODULES.map((m) => ({ ...m })),
  badges: [],
};
