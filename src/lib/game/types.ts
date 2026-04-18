export type ModuleId =
  | "decentralisation"
  | "blockchain"
  | "wallet"
  | "seedphrase"
  | "transactions"
  | "consensus"
  | "validators"
  | "explorer"
  | "adresse"
  | "networks"
  | "signature"
  | "fees"
  | "solscan"
  | "node"
  | "poh"
  | "gulfstream"
  | "sealevel"
  | "archivers"
  | "tps"
  | "votetx"
  | "restart"
  | "congestion"
  | "tower"
  | "turbine"
  | "cloudbreak"
  | "slot"
  | "economics"
  | "cluster"
  | "jito"
  | "rugpull"
  | "scamphishing"
  | "approvetx"
  | "revoke"
  | "hardwarewallet"
  | "hotvscold"
  | "audit"
  | "exploit"
  | "flashloan"
  | "reentrancy"
  | "socialeng"
  | "fakedapp"
  | "malware"
  | "dyor"
  | "escrow";

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
  consensus: "Maître du Consensus",
  validators: "Gardien du Réseau",
  explorer: "Détective On-Chain",
  adresse: "Cartographe d'Adresses",
  networks: "Navigateur des Réseaux",
  signature: "Maître des Signatures",
  fees: "Économe du Gas",
  solscan: "Enquêteur Solscan",
  node: "Sentinelle du Nœud",
  poh: "Horloger du PoH",
  gulfstream: "Pilote du Gulf Stream",
  sealevel: "Paralléliste",
  archivers: "Gardien des Archives",
  tps: "Mesureur de Vitesse",
  votetx: "Votant du Consensus",
  restart: "Mécanicien du Cluster",
  congestion: "Régulateur de Trafic",
  tower: "Architecte de la Tour",
  turbine: "Ingénieur Turbine",
  cloudbreak: "Maître du Stockage",
  slot: "Maître du Temps",
  economics: "Économiste Solana",
  cluster: "Chef de Cluster",
  jito: "Capitaine MEV",
  rugpull: "Détecteur de Rug",
  scamphishing: "Anti-Phishing",
  approvetx: "Approbateur Averti",
  revoke: "Révocateur",
  hardwarewallet: "Forteresse Hardware",
  hotvscold: "Maître du Froid",
  audit: "Auditeur",
  exploit: "Chasseur d'Exploits",
  flashloan: "Expert Flash Loan",
  reentrancy: "Bouclier Anti-Reentrancy",
  socialeng: "Détecteur Social",
  fakedapp: "Vérificateur de dApps",
  malware: "Anti-Malware",
  dyor: "Chercheur Autonome",
  escrow: "Gardien d'Escrow",
};

export const MASTER_BADGE = "Maître des Basics";

export const MODULE_ORDER: ModuleId[] = [
  "decentralisation",
  "blockchain",
  "wallet",
  "seedphrase",
  "transactions",
  "consensus",
  "validators",
  "explorer",
  "adresse",
  "networks",
  "signature",
  "fees",
  "solscan",
  "node",
  "poh",
  "gulfstream",
  "sealevel",
  "archivers",
  "tps",
  "votetx",
  "restart",
  "congestion",
  "tower",
  "turbine",
  "cloudbreak",
  "slot",
  "economics",
  "cluster",
  "jito",
  "rugpull",
  "scamphishing",
  "approvetx",
  "revoke",
  "hardwarewallet",
  "hotvscold",
  "audit",
  "exploit",
  "flashloan",
  "reentrancy",
  "socialeng",
  "fakedapp",
  "malware",
  "dyor",
  "escrow",
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
  {
    id: "consensus",
    title: "Le Consensus",
    completed: false,
    xpEarned: 0,
    maxXp: 160,
    unlocked: false,
  },
  {
    id: "validators",
    title: "Les Validateurs",
    completed: false,
    xpEarned: 0,
    maxXp: 170,
    unlocked: false,
  },
  {
    id: "explorer",
    title: "L'Explorateur Blockchain",
    completed: false,
    xpEarned: 0,
    maxXp: 180,
    unlocked: false,
  },
  {
    id: "adresse",
    title: "L'Adresse Solana",
    completed: false,
    xpEarned: 0,
    maxXp: 110,
    unlocked: false,
  },
  {
    id: "networks",
    title: "Mainnet / Devnet / Testnet",
    completed: false,
    xpEarned: 0,
    maxXp: 120,
    unlocked: false,
  },
  {
    id: "signature",
    title: "La Signature de Transaction",
    completed: false,
    xpEarned: 0,
    maxXp: 140,
    unlocked: false,
  },
  {
    id: "fees",
    title: "Les Frais de Gas",
    completed: false,
    xpEarned: 0,
    maxXp: 130,
    unlocked: false,
  },
  {
    id: "solscan",
    title: "Solscan / Solana Explorer",
    completed: false,
    xpEarned: 0,
    maxXp: 150,
    unlocked: false,
  },
  {
    id: "node",
    title: "Le Nœud (Node)",
    completed: false,
    xpEarned: 0,
    maxXp: 160,
    unlocked: false,
  },
  {
    id: "poh",
    title: "Proof of History (PoH)",
    completed: false,
    xpEarned: 0,
    maxXp: 180,
    unlocked: false,
  },
  {
    id: "gulfstream",
    title: "Gulf Stream",
    completed: false,
    xpEarned: 0,
    maxXp: 170,
    unlocked: false,
  },
  {
    id: "sealevel",
    title: "Sealevel (Parallélisme)",
    completed: false,
    xpEarned: 0,
    maxXp: 190,
    unlocked: false,
  },
  {
    id: "archivers",
    title: "Archivers",
    completed: false,
    xpEarned: 0,
    maxXp: 150,
    unlocked: false,
  },
  {
    id: "tps",
    title: "TPS (Transactions / seconde)",
    completed: false,
    xpEarned: 0,
    maxXp: 140,
    unlocked: false,
  },
  {
    id: "votetx",
    title: "Vote Transactions",
    completed: false,
    xpEarned: 0,
    maxXp: 160,
    unlocked: false,
  },
  {
    id: "restart",
    title: "Restart & Upgrade",
    completed: false,
    xpEarned: 0,
    maxXp: 170,
    unlocked: false,
  },
  {
    id: "congestion",
    title: "Congestion Réseau",
    completed: false,
    xpEarned: 0,
    maxXp: 160,
    unlocked: false,
  },
  {
    id: "tower",
    title: "Tower BFT",
    completed: false,
    xpEarned: 0,
    maxXp: 180,
    unlocked: false,
  },
  {
    id: "turbine",
    title: "Turbine",
    completed: false,
    xpEarned: 0,
    maxXp: 170,
    unlocked: false,
  },
  {
    id: "cloudbreak",
    title: "Cloudbreak (Stockage)",
    completed: false,
    xpEarned: 0,
    maxXp: 180,
    unlocked: false,
  },
  {
    id: "slot",
    title: "Slot / Epoch",
    completed: false,
    xpEarned: 0,
    maxXp: 150,
    unlocked: false,
  },
  {
    id: "economics",
    title: "Validator Economics",
    completed: false,
    xpEarned: 0,
    maxXp: 190,
    unlocked: false,
  },
  {
    id: "cluster",
    title: "Cluster",
    completed: false,
    xpEarned: 0,
    maxXp: 150,
    unlocked: false,
  },
  {
    id: "jito",
    title: "Jito (MEV)",
    completed: false,
    xpEarned: 0,
    maxXp: 200,
    unlocked: false,
  },
  { id: "rugpull", title: "Rug Pull", completed: false, xpEarned: 0, maxXp: 140, unlocked: false },
  { id: "scamphishing", title: "Scam / Phishing", completed: false, xpEarned: 0, maxXp: 150, unlocked: false },
  { id: "approvetx", title: "Approuver une Transaction", completed: false, xpEarned: 0, maxXp: 130, unlocked: false },
  { id: "revoke", title: "Revoke Permissions", completed: false, xpEarned: 0, maxXp: 120, unlocked: false },
  { id: "hardwarewallet", title: "Hardware Wallet (Ledger)", completed: false, xpEarned: 0, maxXp: 160, unlocked: false },
  { id: "hotvscold", title: "Hot vs Cold Wallet", completed: false, xpEarned: 0, maxXp: 140, unlocked: false },
  { id: "audit", title: "Smart Contract Audit", completed: false, xpEarned: 0, maxXp: 180, unlocked: false },
  { id: "exploit", title: "Exploit / Hack", completed: false, xpEarned: 0, maxXp: 170, unlocked: false },
  { id: "flashloan", title: "Flash Loan Attack", completed: false, xpEarned: 0, maxXp: 190, unlocked: false },
  { id: "reentrancy", title: "Reentrancy", completed: false, xpEarned: 0, maxXp: 180, unlocked: false },
  { id: "socialeng", title: "Social Engineering", completed: false, xpEarned: 0, maxXp: 150, unlocked: false },
  { id: "fakedapp", title: "Fausse dApp", completed: false, xpEarned: 0, maxXp: 140, unlocked: false },
  { id: "malware", title: "Malware / Drainer", completed: false, xpEarned: 0, maxXp: 160, unlocked: false },
  { id: "dyor", title: "DYOR", completed: false, xpEarned: 0, maxXp: 130, unlocked: false },
  { id: "escrow", title: "Escrow", completed: false, xpEarned: 0, maxXp: 150, unlocked: false },
];

export const INITIAL_STATE: GameState = {
  playerName: "Fondateur",
  totalXp: 0,
  level: 1,
  modules: INITIAL_MODULES.map((m) => ({ ...m })),
  badges: [],
};
