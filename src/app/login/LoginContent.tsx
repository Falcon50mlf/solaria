"use client";

import { usePrivy } from "@privy-io/react-auth";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { motion } from "framer-motion";
import { LogIn, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useLocale } from "@/lib/useLocale";
import { LanguageToggle } from "@/components/LanguageToggle";

export default function LoginContent() {
  const { t } = useLocale();
  const { login, authenticated, ready } = usePrivy();
  const router = useRouter();
  const searchParams = useSearchParams();

  const redirect = searchParams.get("redirect") || "/dashboard";

  useEffect(() => {
    if (ready && authenticated) {
      router.push(redirect);
    }
  }, [ready, authenticated, router, redirect]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-[var(--sol-text-muted)]">...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 relative">
      <LanguageToggle />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl sm:text-5xl font-bold mb-3">
            <span className="bg-gradient-to-r from-[var(--sol-purple)] via-[var(--sol-blue)] to-[var(--sol-green)] bg-clip-text text-transparent">
              SolQuest
            </span>
          </h1>
          <h2 className="text-xl sm:text-2xl font-semibold text-[var(--sol-text)] mb-2">
            {t.login.title}
          </h2>
          <p className="text-[var(--sol-text-muted)]">{t.login.subtitle}</p>
        </motion.div>

        {/* Login button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={login}
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[var(--sol-purple)] to-[var(--sol-blue)] hover:opacity-90 text-white font-bold py-4 px-6 rounded-lg transition-opacity cursor-pointer"
        >
          <LogIn size={20} />
          {t.login.loginButton}
        </motion.button>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="flex items-center gap-4 my-6"
        >
          <div className="flex-1 h-px bg-[var(--sol-card)]" />
          <span className="text-sm text-[var(--sol-text-muted)]">
            {t.login.orContinue}
          </span>
          <div className="flex-1 h-px bg-[var(--sol-card)]" />
        </motion.div>

        {/* Back to home */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Link
            href="/"
            className="w-full flex items-center justify-center gap-2 border border-[var(--sol-card)] hover:border-[var(--sol-purple)]/50 text-[var(--sol-text-muted)] hover:text-[var(--sol-text)] font-medium py-3 px-6 rounded-lg transition-colors"
          >
            <ArrowLeft size={18} />
            {t.login.backHome}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
