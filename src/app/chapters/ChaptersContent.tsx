"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  ArrowRight,
  ChevronLeft,
  Network,
  Boxes,
  Key,
  Shield,
  Send,
  Brain,
  Server,
  Search,
  MapPin,
  Globe2,
  PenTool,
  Fuel,
  ScanSearch,
  Cpu,
  Clock,
  Waves,
  GitBranch,
  Archive,
  Gauge,
  Vote,
  RotateCw,
  Activity,
  Building2,
  Wind,
  Database,
  Hourglass,
  Coins,
  Zap,
  AlertTriangle,
  ShieldAlert,
  FileCheck2,
  Ban,
  HardDrive,
  Thermometer,
  ClipboardCheck,
  Bug,
  RefreshCw,
  UserX,
  AlertOctagon,
  Skull,
  Glasses,
  ShieldCheck,
  Landmark,
  Droplets,
  ArrowLeftRight,
  BarChart3,
  TrendingDown,
  Target,
  PieChart,
  CircleDollarSign,
  Sprout,
  Repeat2,
  Scale,
  CandlestickChart,
  LineChart,
  Percent,
} from "lucide-react";
import { useLocale } from "@/lib/useLocale";
import { useGameState } from "@/lib/useGameState";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SolariaLogo } from "@/components/SolariaLogo";

const MODULE_ICONS: Record<string, typeof BookOpen> = {
  decentralisation: Network,
  blockchain: Boxes,
  wallet: Key,
  seedphrase: Shield,
  transactions: Send,
  consensus: Brain,
  validators: Server,
  explorer: Search,
  adresse: MapPin,
  networks: Globe2,
  signature: PenTool,
  fees: Fuel,
  solscan: ScanSearch,
  node: Cpu,
  poh: Clock,
  gulfstream: Waves,
  sealevel: GitBranch,
  archivers: Archive,
  tps: Gauge,
  votetx: Vote,
  restart: RotateCw,
  congestion: Activity,
  tower: Building2,
  turbine: Wind,
  cloudbreak: Database,
  slot: Hourglass,
  economics: Coins,
  cluster: Boxes,
  jito: Zap,
  rugpull: AlertTriangle,
  scamphishing: ShieldAlert,
  approvetx: FileCheck2,
  revoke: Ban,
  hardwarewallet: HardDrive,
  hotvscold: Thermometer,
  audit: ClipboardCheck,
  exploit: Bug,
  flashloan: Zap,
  reentrancy: RefreshCw,
  socialeng: UserX,
  fakedapp: AlertOctagon,
  malware: Skull,
  dyor: Glasses,
  escrow: ShieldCheck,
  defi: Landmark,
  staking: Coins,
  liquiditypool: Droplets,
  swap: ArrowLeftRight,
  cexdex: Building2,
  spread: BarChart3,
  liquidation: TrendingDown,
  optionsonchain: Target,
  indextokens: PieChart,
  tvl: Hourglass,
  soltoken: CircleDollarSign,
  yieldfarming: Sprout,
  amm: Repeat2,
  slippage: AlertTriangle,
  orderbook: BookOpen,
  leverage: Scale,
  perp: CandlestickChart,
  etfcrypto: LineChart,
  apyapr: Percent,
};

interface Chapter {
  id: string;
  link: string;
  moduleIds: string[];
  totalXp: number;
  titleKey: "basics" | "infrastructure" | "security" | "finance";
  cardClass: string;
  accentColor: string;
  progressGradient: string;
  pillClass: string;
}

const CHAPTERS: Chapter[] = [
  {
    id: "basics",
    link: "/basics",
    titleKey: "basics",
    cardClass: "fg-card-purple",
    accentColor: "#9945ff",
    progressGradient: "from-[#9945ff] to-[#14f195]",
    pillClass: "pill-purple",
    moduleIds: [
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
    ],
    totalXp: 1960,
  },
  {
    id: "infrastructure",
    link: "/infrastructure",
    titleKey: "infrastructure",
    cardClass: "fg-card-green",
    accentColor: "#14f195",
    progressGradient: "from-[#14f195] to-[#00d4ff]",
    pillClass: "pill-green",
    moduleIds: [
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
    ],
    totalXp: 2540,
  },
  {
    id: "security",
    link: "/security",
    titleKey: "security",
    cardClass: "fg-card-red",
    accentColor: "#ff6b6b",
    progressGradient: "from-[#ff6b6b] to-[#9945ff]",
    pillClass: "pill-red",
    moduleIds: [
      "rugpull", "scamphishing", "approvetx", "revoke",
      "hardwarewallet", "hotvscold", "audit", "exploit",
      "flashloan", "reentrancy", "socialeng", "fakedapp",
      "malware", "dyor", "escrow",
    ],
    totalXp: 2290,
  },
  {
    id: "finance",
    link: "/finance",
    titleKey: "finance",
    cardClass: "fg-card-teal",
    accentColor: "#2dd4bf",
    progressGradient: "from-[#2dd4bf] to-[#06b6d4]",
    pillClass: "pill-teal",
    moduleIds: [
      "defi", "staking", "liquiditypool", "swap", "cexdex",
      "spread", "liquidation", "optionsonchain", "indextokens", "tvl",
      "soltoken", "yieldfarming", "amm", "slippage", "orderbook",
      "leverage", "perp", "etfcrypto", "apyapr",
    ],
    totalXp: 2870,
  },
];

export default function ChaptersContent() {
  const { t } = useLocale();
  const { modules } = useGameState();
  const completedIds = new Set(modules.filter((m) => m.completed).map((m) => m.id));

  return (
    <div className="relative min-h-screen bg-[#111] text-white font-poppins overflow-hidden">
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-[420px] w-[667px] h-[667px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(153,69,255,0.25) 0%, rgba(153,69,255,0.05) 40%, rgba(17,17,17,0) 70%)",
        }}
      />

      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-4">
        <Link href="/" className="flex items-center gap-2">
          <SolariaLogo size={26} fill="white" />
          <span className="font-semibold text-xl">Solaria</span>
        </Link>
        <LanguageToggle />
      </nav>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-8 pt-4 pb-16">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[#919191] hover:text-white transition-colors mb-6 text-sm"
        >
          <ChevronLeft size={16} />
          {t.login.backHome}
        </Link>

        <motion.header
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-[#9945ff] to-[#14f195] bg-clip-text text-transparent">
              {t.home.chaptersTitle}
            </span>
          </h1>
          <p className="text-[#919191] text-base sm:text-lg">{t.basics.pageSubtitle}</p>
        </motion.header>

        <div className="flex flex-col gap-6">
          {CHAPTERS.map((chapter) => {
            const chapterCompleted = chapter.moduleIds.filter((id) => completedIds.has(id)).length;
            const chapterTotal = chapter.moduleIds.length;
            const chapterXp = modules
              .filter((m) => chapter.moduleIds.includes(m.id))
              .reduce((sum, m) => sum + m.xpEarned, 0);
            const progressPercent = Math.round((chapterCompleted / chapterTotal) * 100);

            return (
              <motion.div
                key={chapter.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`${chapter.cardClass} relative rounded-[38px] p-8 sm:p-10 overflow-hidden`}
              >
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                      <BookOpen size={24} style={{ color: chapter.accentColor }} />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-normal">{t[chapter.titleKey].pageTitle}</h3>
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm mb-3">
                  <span className="text-[#919191]">
                    {chapterCompleted}/{chapterTotal} {t.common.modulesCompleted}
                  </span>
                  <span style={{ color: chapter.accentColor }} className="font-medium">
                    {chapterXp}/{chapter.totalXp} XP
                  </span>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-6">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className={`h-full rounded-full bg-gradient-to-r ${chapter.progressGradient}`}
                  />
                </div>

                <div className="flex gap-2 flex-wrap mb-8">
                  {chapter.moduleIds.map((modId) => {
                    const Icon = MODULE_ICONS[modId] ?? BookOpen;
                    const done = completedIds.has(modId);
                    return (
                      <div
                        key={modId}
                        className={`w-8 h-8 rounded-md flex items-center justify-center ${
                          done ? "bg-white/15" : "bg-[#07070f] text-white/40"
                        }`}
                        style={done ? { color: chapter.accentColor } : undefined}
                      >
                        <Icon size={16} />
                      </div>
                    );
                  })}
                </div>

                <Link href={chapter.link} className={`${chapter.pillClass} inline-flex items-center gap-2`}>
                  {t.home.exploreWithoutAccount} <ArrowRight size={18} />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
