export type ModuleId = "decentralisation" | "blockchain" | "wallet" | "seedphrase" | "transactions";

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
  seedphrase: "Protecteur de Seeds",
  transactions: "Maître des Transactions",
};

export const MASTER_BADGE = "Maître des Basics";

export const MODULE_ORDER: ModuleId[] = [
  "decentralisation",
  "blockchain",
  "wallet",
  "seedphrase",
  "transactions",
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
  {
    id: "seedphrase",
    title: "La Seed Phrase",
    completed: false,
    xpEarned: 0,
    maxXp: 130,
    unlocked: false,
  },
  {
    id: "transactions",
    title: "Les Transactions",
    completed: false,
    xpEarned: 0,
    maxXp: 140,
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
