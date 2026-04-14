"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { LogIn, LogOut, User } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/useLocale";

export function AuthButton() {
  const { authenticated, ready, login, logout } = usePrivy();
  const { t } = useLocale();
  const router = useRouter();
  // Track auth state transitions to detect fresh login
  const prevAuthenticated = useRef<boolean | null>(null);
  useEffect(() => {
    if (!ready) return;
    // Detect transition: was not authenticated → now authenticated = just logged in
    if (prevAuthenticated.current === false && authenticated) {
      router.push("/dashboard");
    }
    prevAuthenticated.current = authenticated;
  }, [ready, authenticated, router]);

  if (!ready) return null;

  if (authenticated) {
    const isOnDashboard = typeof window !== "undefined" && window.location.pathname === "/dashboard";

    if (isOnDashboard) {
      return (
        <motion.button
          onClick={async () => {
            await logout();
            router.push("/");
          }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 bg-[var(--sol-darker)]/80 backdrop-blur-sm border border-[var(--sol-accent)]/30 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--sol-accent)] hover:border-[var(--sol-accent)]/60 transition-colors cursor-pointer"
        >
          <LogOut size={14} />
          {t.dashboard.logout}
        </motion.button>
      );
    }

    return (
      <Link href="/dashboard">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 bg-[var(--sol-darker)]/80 backdrop-blur-sm border border-[var(--sol-green)]/30 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--sol-green)] hover:border-[var(--sol-green)]/60 transition-colors cursor-pointer"
        >
          <User size={14} />
          {t.dashboard.title}
        </motion.div>
      </Link>
    );
  }

  return (
    <motion.button
      onClick={login}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="flex items-center gap-1.5 bg-[var(--sol-darker)]/80 backdrop-blur-sm border border-[var(--sol-purple)]/30 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--sol-text)] hover:border-[var(--sol-purple)]/60 transition-colors cursor-pointer"
    >
      <LogIn size={14} />
      {t.login.loginButton}
    </motion.button>
  );
}
