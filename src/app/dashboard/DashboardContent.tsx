"use client";

import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  Trophy,
  Zap,
  Network,
  Boxes,
  Key,
  LogOut,
  BookOpen,
  Copy,
  Check,
} from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import { useUser } from "@/hooks/useUser";
import { useLocale } from "@/lib/useLocale";
import { TopBar } from "@/components/TopBar";

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
};

export default function DashboardContent() {
  const { t } = useLocale();
  const { logout, ready } = usePrivy();
  const { user, walletAddress, isAuthenticated, isLoading } = useUser();
  const router = useRouter();
  const [progress, setProgress] = useState<ProgressRow[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(true);
  const [copied, setCopied] = useState(false);

  // Redirect if not authenticated
  useEffect(() => {
    if (ready && !isAuthenticated) {
      router.push("/login?redirect=/dashboard");
    }
  }, [ready, isAuthenticated, router]);

  // Fetch progress from Supabase
  useEffect(() => {
    if (!user) return;

    supabase
      .from("progress")
      .select("module_id, xp_earned, badge, completed_at")
      .eq("privy_did", user.id)
      .order("completed_at", { ascending: true })
      .then(({ data, error }) => {
        if (error) {
          console.error("Error fetching progress:", error.message);
        } else {
          setProgress(data ?? []);
        }
        setLoadingProgress(false);
      });
  }, [user]);

  const totalXp = progress.reduce((sum, p) => sum + p.xp_earned, 0);
  const badges = progress.filter((p) => p.badge).map((p) => p.badge as string);

  const handleCopyWallet = () => {
    if (!walletAddress) return;
    navigator.clipboard.writeText(walletAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  if (isLoading || !ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--sol-text-muted)]">...</div>
      </div>
    );
  }

  const email =
    user?.email?.address ?? user?.google?.email ?? null;

  return (
    <div className="min-h-screen p-6 md:p-10">
      <TopBar />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[var(--sol-purple)] to-[var(--sol-green)] bg-clip-text text-transparent">
              {t.dashboard.title}
            </span>
          </h1>
          <p className="text-[var(--sol-text-muted)] text-lg">
            {t.dashboard.subtitle}
          </p>
        </motion.div>

        {/* User info card */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[var(--sol-card)] border border-[var(--sol-card-hover)] rounded-xl p-6 mb-8"
        >
          <p className="text-lg font-semibold text-[var(--sol-text)] mb-4">
            {t.dashboard.welcomeBack} 👋
          </p>

          <div className="space-y-3">
            {email && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                <span className="text-sm text-[var(--sol-text-muted)] w-auto sm:w-32">
                  {t.dashboard.emailLabel}
                </span>
                <span className="text-sm font-mono text-[var(--sol-text)]">
                  {email}
                </span>
              </div>
            )}

            {walletAddress && (
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-3">
                <span className="text-sm text-[var(--sol-text-muted)] w-auto sm:w-32">
                  {t.dashboard.walletLabel}
                </span>
                <span className="text-sm font-mono text-[var(--sol-green)] truncate max-w-[120px] sm:max-w-[200px]">
                  {walletAddress}
                </span>
                <button
                  onClick={handleCopyWallet}
                  className="text-[var(--sol-text-muted)] hover:text-[var(--sol-text)] transition-colors cursor-pointer"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-8"
        >
          <div className="bg-[var(--sol-card)] border border-[var(--sol-card-hover)] rounded-xl p-5 text-center">
            <Zap size={24} className="text-[var(--sol-green)] mx-auto mb-2" />
            <p className="text-2xl font-bold text-[var(--sol-text)]">
              {totalXp}
            </p>
            <p className="text-xs text-[var(--sol-text-muted)]">
              {t.dashboard.totalXp}
            </p>
          </div>
          <div className="bg-[var(--sol-card)] border border-[var(--sol-card-hover)] rounded-xl p-5 text-center">
            <BookOpen
              size={24}
              className="text-[var(--sol-purple)] mx-auto mb-2"
            />
            <p className="text-2xl font-bold text-[var(--sol-text)]">
              {progress.length}/3
            </p>
            <p className="text-xs text-[var(--sol-text-muted)]">
              {t.common.modulesCompleted}
            </p>
          </div>
          <div className="bg-[var(--sol-card)] border border-[var(--sol-card-hover)] rounded-xl p-5 text-center">
            <Trophy
              size={24}
              className="text-amber-400 mx-auto mb-2"
            />
            <p className="text-2xl font-bold text-[var(--sol-text)]">
              {badges.length}
            </p>
            <p className="text-xs text-[var(--sol-text-muted)]">
              {t.dashboard.badgesEarned}
            </p>
          </div>
        </motion.div>

        {/* Progress list */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-xl font-bold text-[var(--sol-text)] mb-4">
            {t.dashboard.progressTitle}
          </h2>

          {loadingProgress ? (
            <div className="animate-pulse text-[var(--sol-text-muted)]">
              ...
            </div>
          ) : progress.length === 0 ? (
            <div className="bg-[var(--sol-card)] border border-[var(--sol-card-hover)] rounded-xl p-8 text-center">
              <p className="text-[var(--sol-text-muted)]">
                {t.dashboard.noProgress}
              </p>
              <Link
                href="/basics"
                className="inline-block mt-4 bg-gradient-to-r from-[var(--sol-purple)] to-[var(--sol-green)] text-white font-semibold py-2 px-6 rounded-lg"
              >
                {t.dashboard.continueLearn}
              </Link>
            </div>
          ) : (
            <div className="space-y-3">
              {progress.map((p) => {
                const Icon = MODULE_ICONS[p.module_id] ?? BookOpen;
                const moduleName =
                  t.basics.modules[
                    p.module_id as keyof typeof t.basics.modules
                  ]?.title ?? p.module_id;

                return (
                  <motion.div
                    key={p.module_id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-[var(--sol-card)] border border-[var(--sol-card-hover)] rounded-xl p-5 flex items-center gap-4"
                  >
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--sol-purple)]/20 to-[var(--sol-green)]/20 flex items-center justify-center">
                      <Icon size={24} className="text-[var(--sol-green)]" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[var(--sol-text)]">
                        {moduleName}
                      </p>
                      <p className="text-sm text-[var(--sol-text-muted)]">
                        {t.dashboard.moduleCompleted} —{" "}
                        {new Date(p.completed_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-[var(--sol-green)]">
                        +{p.xp_earned} XP
                      </p>
                      {p.badge && (
                        <p className="text-xs text-amber-400 flex items-center gap-1 justify-end">
                          <Trophy size={12} />
                          {p.badge}
                        </p>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </motion.div>

        {/* Badges row */}
        {badges.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-8"
          >
            <h2 className="text-xl font-bold text-[var(--sol-text)] mb-4">
              {t.dashboard.badgesEarned}
            </h2>
            <div className="flex flex-wrap gap-3">
              {badges.map((badge, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  className="flex items-center gap-2 bg-amber-900/30 border border-amber-500/50 rounded-full px-4 py-2"
                >
                  <Trophy size={16} className="text-amber-400" />
                  <span className="text-sm font-medium text-amber-200">
                    {badge}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-3"
        >
          <Link
            href="/basics"
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--sol-purple)] to-[var(--sol-blue)] hover:opacity-90 text-white font-bold py-3 px-6 rounded-lg transition-opacity"
          >
            <BookOpen size={18} />
            {t.dashboard.continueLearn}
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
