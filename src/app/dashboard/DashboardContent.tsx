"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Zap,
  BookOpen,
  Trophy,
  ChevronDown,
  LogOut,
  User,
  ArrowRight,
  Rocket,
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
  ShieldBan,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/hooks/useUser";
import { useLocale } from "@/lib/useLocale";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SolariaLogo } from "@/components/SolariaLogo";

interface ProgressRow {
  module_id: string;
  xp_earned: number;
  badge: string | null;
  completed_at: string;
}

const MODULE_ICONS: Record<string, typeof Network> = {
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
};

const BASICS_ORDER = [
  "decentralisation", "blockchain", "wallet", "seedphrase",
  "transactions", "consensus", "validators", "explorer",
  "adresse", "networks", "signature", "fees", "solscan", "node",
];
const BASICS_TOTAL_XP = 1960;

const INFRA_ORDER = [
  "poh", "gulfstream", "sealevel", "archivers", "tps",
  "votetx", "restart", "congestion", "tower", "turbine",
  "cloudbreak", "slot", "economics", "cluster", "jito",
];
const INFRA_TOTAL_XP = 2540;

const SECURITY_ORDER = [
  "rugpull", "scamphishing", "approvetx", "revoke",
  "hardwarewallet", "hotvscold", "audit", "exploit",
  "flashloan", "reentrancy", "socialeng", "fakedapp",
  "malware", "dyor", "escrow",
];
const SECURITY_TOTAL_XP = 2290;

export default function DashboardContent() {
  const { t } = useLocale();
  const { ready, logout } = usePrivy();
  const { user, isAuthenticated, isLoading } = useUser();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressRow[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (ready && !isAuthenticated) router.push("/login?redirect=/dashboard");
  }, [ready, isAuthenticated, router]);

  useEffect(() => {
    if (!user) return;
    supabase
      .from("progress")
      .select("module_id, xp_earned, badge, completed_at")
      .eq("privy_did", user.id)
      .order("completed_at", { ascending: false })
      .then(({ data, error }) => {
        if (error) console.error(error.message);
        else setProgress(data ?? []);
        setLoadingProgress(false);
      });
  }, [user]);

  if (isLoading || !ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111]">
        <div className="animate-pulse text-[#919191]">...</div>
      </div>
    );
  }

  const totalXp = progress.reduce((s, p) => s + p.xp_earned, 0);
  const completedIds = new Set(progress.map((p) => p.module_id));
  const badges = progress.filter((p) => p.badge).map((p) => p.badge as string);
  const basicsCompleted = BASICS_ORDER.filter((id) => completedIds.has(id)).length;
  const basicsXp = progress.filter((p) => BASICS_ORDER.includes(p.module_id)).reduce((s, p) => s + p.xp_earned, 0);
  const infraCompleted = INFRA_ORDER.filter((id) => completedIds.has(id)).length;
  const infraXp = progress.filter((p) => INFRA_ORDER.includes(p.module_id)).reduce((s, p) => s + p.xp_earned, 0);
  const securityCompleted = SECURITY_ORDER.filter((id) => completedIds.has(id)).length;
  const securityXp = progress.filter((p) => SECURITY_ORDER.includes(p.module_id)).reduce((s, p) => s + p.xp_earned, 0);
  const allModulesCount = BASICS_ORDER.length + INFRA_ORDER.length + SECURITY_ORDER.length;
  const email = user?.email?.address ?? user?.google?.email ?? null;
  const emailTruncated = email
    ? email.length > 14
      ? email.slice(0, 4) + "..." + email.slice(-6)
      : email
    : "Account";

  return (
    <div className="relative min-h-screen bg-[#111] text-white font-poppins">
      {/* Navbar */}
      <nav className="relative z-30 flex items-center justify-between px-6 sm:px-12 py-4">
        <Link href="/" className="flex items-center gap-2">
          <SolariaLogo size={26} fill="white" />
          <span className="font-semibold text-xl tracking-tight">Solaria</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          <div className="relative">
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className="pill-purple inline-flex items-center gap-2 cursor-pointer"
            >
              <span className="font-mono text-sm">{emailTruncated}</span>
              <ChevronDown size={14} className={`transition-transform ${menuOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence>
              {menuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-44 rounded-2xl border border-[#9945ff] bg-[rgba(153,69,255,0.1)] backdrop-blur-md p-3 flex flex-col gap-2"
                >
                  <button
                    onClick={async () => {
                      await logout();
                      router.push("/");
                    }}
                    className="flex items-center gap-2 text-sm text-white hover:text-[#14f195] transition-colors cursor-pointer"
                  >
                    <LogOut size={14} /> {t.dashboard.logout}
                  </button>
                  <div className="flex items-center gap-2 text-sm text-white/70">
                    <User size={14} /> {t.dashboard.emailLabel}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </nav>

      {/* Grid layout */}
      <div className="max-w-[1305px] mx-auto px-4 sm:px-8 pt-8 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_369px] gap-10">
        {/* Left column */}
        <div className="flex flex-col gap-10 min-w-0">
          {/* Welcome Back card */}
          <section className="fg-card-purple relative rounded-[38px] p-8 sm:p-12 overflow-hidden">
            <h2 className="text-3xl font-bold mb-8">{t.dashboard.welcomeBack} 👋</h2>
            <div className="flex items-stretch justify-between gap-6">
              <Stat icon={<Zap size={24} className="text-[#14f195]" />} value={String(totalXp)} label={t.dashboard.totalXp} />
              <div className="w-px bg-white/10 self-stretch" />
              <Stat
                icon={<BookOpen size={24} className="text-[#9945ff]" />}
                value={`${progress.length}/${allModulesCount}`}
                label={t.common.modulesCompleted}
              />
              <div className="w-px bg-white/10 self-stretch" />
              <Stat
                icon={<Trophy size={24} className="text-amber-400" />}
                value={String(badges.length)}
                label={t.dashboard.badgesEarned}
              />
            </div>
          </section>

          {/* Basics chapter card */}
          <section className="fg-card-green relative rounded-[38px] p-8 sm:p-12 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                  <BookOpen size={24} className="text-[#14f195]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal">{t.basics.pageTitle}</h3>
              </div>
              <Link href="/basics" className="pill-green inline-flex items-center gap-2">
                {t.common.continue} <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-[#919191]">
                {basicsCompleted}/{BASICS_ORDER.length} {t.common.modulesCompleted}
              </span>
              <span className="text-[#14f195] font-medium">
                {basicsXp}/{BASICS_TOTAL_XP} XP
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(basicsCompleted / BASICS_ORDER.length) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-[#9945ff] to-[#14f195]"
              />
            </div>

            <div className="flex gap-2.5 flex-wrap">
              {BASICS_ORDER.map((id) => {
                const Icon = MODULE_ICONS[id] ?? BookOpen;
                const done = completedIds.has(id);
                return (
                  <div
                    key={id}
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      done ? "bg-[rgba(20,241,149,0.2)] text-[#14f195]" : "bg-[#07070f] text-white/40"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Infrastructure chapter card */}
          <section className="fg-card-green relative rounded-[38px] p-8 sm:p-12 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                  <Server size={24} className="text-[#14f195]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal">{t.infrastructure.pageTitle}</h3>
              </div>
              <Link href="/infrastructure" className="pill-green inline-flex items-center gap-2">
                {t.common.continue} <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-[#919191]">
                {infraCompleted}/{INFRA_ORDER.length} {t.common.modulesCompleted}
              </span>
              <span className="text-[#14f195] font-medium">
                {infraXp}/{INFRA_TOTAL_XP} XP
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${INFRA_ORDER.length > 0 ? (infraCompleted / INFRA_ORDER.length) * 100 : 0}%`}}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="h-full rounded-full bg-gradient-to-r from-[#14f195] to-[#00d4ff]"
              />
            </div>

            <div className="flex gap-2.5 flex-wrap">
              {INFRA_ORDER.map((id) => {
                const Icon = MODULE_ICONS[id] ?? BookOpen;
                const done = completedIds.has(id);
                return (
                  <div
                    key={id}
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      done ? "bg-[rgba(20,241,149,0.2)] text-[#14f195]" : "bg-[#07070f] text-white/40"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Security chapter card */}
          <section className="fg-card-green relative rounded-[38px] p-8 sm:p-12 overflow-hidden">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex items-center gap-5">
                <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                  <ShieldBan size={24} className="text-[#ff6b6b]" />
                </div>
                <h3 className="text-2xl sm:text-3xl font-normal">{t.security.pageTitle}</h3>
              </div>
              <Link href="/security" className="pill-green inline-flex items-center gap-2">
                {t.common.continue} <ArrowRight size={18} />
              </Link>
            </div>

            <div className="flex items-center justify-between text-sm mb-3">
              <span className="text-[#919191]">
                {securityCompleted}/{SECURITY_ORDER.length} {t.common.modulesCompleted}
              </span>
              <span className="text-[#14f195] font-medium">
                {securityXp}/{SECURITY_TOTAL_XP} XP
              </span>
            </div>
            <div className="h-2 rounded-full bg-white/10 overflow-hidden mb-8">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${SECURITY_ORDER.length > 0 ? (securityCompleted / SECURITY_ORDER.length) * 100 : 0}%` }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="h-full rounded-full bg-gradient-to-r from-[#ff6b6b] to-[#9945ff]"
              />
            </div>

            <div className="flex gap-2.5 flex-wrap">
              {SECURITY_ORDER.map((id) => {
                const Icon = MODULE_ICONS[id] ?? BookOpen;
                const done = completedIds.has(id);
                return (
                  <div
                    key={id}
                    className={`w-8 h-8 rounded-md flex items-center justify-center ${
                      done ? "bg-[rgba(20,241,149,0.2)] text-[#14f195]" : "bg-[#07070f] text-white/40"
                    }`}
                  >
                    <Icon size={16} />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Progression list */}
          <section className="fg-card-purple relative rounded-[38px] p-8 sm:p-12 overflow-hidden">
            <div className="flex items-center gap-5 mb-6">
              <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center">
                <Rocket size={24} className="text-[#9945ff]" />
              </div>
              <h3 className="text-2xl sm:text-3xl font-normal">{t.dashboard.progressTitle}</h3>
            </div>

            {loadingProgress ? (
              <div className="animate-pulse text-[#919191]">...</div>
            ) : progress.length === 0 ? (
              <p className="text-[#919191]">{t.dashboard.noProgress}</p>
            ) : (
              <div className="flex flex-col gap-4">
                {progress.map((p) => {
                  const Icon = MODULE_ICONS[p.module_id] ?? BookOpen;
                  const moduleName =
                    (t.basics.modules as Record<string, { title: string }>)[p.module_id]?.title ??
                    (t.infrastructure.modules as Record<string, { title: string }>)[p.module_id]?.title ??
                    (t.security.modules as Record<string, { title: string }>)[p.module_id]?.title ??
                    p.module_id;
                  return (
                    <motion.div
                      key={p.module_id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center justify-between gap-4 rounded-xl border border-[#1a1a3e] bg-white/5 px-4 py-3"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div
                          className="w-12 h-12 rounded-lg shrink-0 flex items-center justify-center"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(153,69,255,0.2) 0%, rgba(20,241,149,0.2) 100%)",
                          }}
                        >
                          <Icon size={20} className="text-white" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-base truncate">{moduleName}</p>
                          <p className="text-sm text-[#919191]">
                            {t.dashboard.moduleCompleted} — {new Date(p.completed_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2 shrink-0">
                        <span className="font-bold text-[#14f195]">+{p.xp_earned} XP</span>
                        {p.badge && (
                          <span className="badge-blue inline-flex items-center gap-1.5">
                            <Trophy size={12} /> {p.badge}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </section>
        </div>

        {/* Right column: My Badges */}
        <aside className="fg-card-blue relative rounded-[38px] p-8 overflow-hidden h-fit">
          <Trophy size={37} className="text-amber-400 mb-4" />
          <h3 className="text-2xl sm:text-3xl font-normal mb-6">{t.dashboard.badgesEarned}</h3>

          {badges.length === 0 ? (
            <p className="text-[#919191] text-sm">{t.dashboard.noProgress}</p>
          ) : (
            <div className="grid grid-cols-2 gap-4">
              {badges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  className="relative rounded-md overflow-hidden aspect-[131/121]"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(153,69,255,0.5) 0%, rgba(102,148,255,0.4) 50%, rgba(20,241,149,0.3) 100%)",
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Trophy size={42} className="text-white/80" />
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-2 badge-blue inline-flex items-center gap-1 whitespace-nowrap !text-[8px] !px-2 !py-1">
                    <Trophy size={9} />
                    <span className="truncate max-w-[80px]">{badge}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex-1 flex flex-col items-center gap-2 text-center">
      {icon}
      <div className="font-bold text-2xl sm:text-3xl">{value}</div>
      <div className="text-xs text-[#88a]">{label}</div>
    </div>
  );
}
