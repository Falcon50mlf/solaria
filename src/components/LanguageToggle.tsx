"use client";

import { motion } from "framer-motion";
import { useLocale } from "@/lib/useLocale";

export function LanguageToggle() {
  const { locale, toggleLocale } = useLocale();

  return (
    <motion.button
      onClick={toggleLocale}
      className="flex items-center gap-1.5 bg-[var(--sol-darker)]/80 backdrop-blur-sm border border-[var(--sol-purple)]/30 rounded-full px-3 py-1.5 text-sm font-medium text-[var(--sol-text)] hover:border-[var(--sol-purple)]/60 transition-colors cursor-pointer"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      aria-label="Toggle language"
    >
      <span className={locale === "fr" ? "text-[var(--sol-purple)]" : "opacity-50"}>
        FR
      </span>
      <span className="text-[var(--sol-text-muted)]">/</span>
      <span className={locale === "en" ? "text-[var(--sol-purple)]" : "opacity-50"}>
        EN
      </span>
    </motion.button>
  );
}
