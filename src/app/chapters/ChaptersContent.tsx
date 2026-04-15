"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  ChevronLeft,
  Network,
  Boxes,
  Key,
  Shield,
  Send,
  Brain,
  Server,
  Search,
} from "lucide-react";
import { useLocale } from "@/lib/useLocale";
import { useGameState } from "@/lib/useGameState";
import { TopBar } from "@/components/TopBar";

const MODULE_ICONS: Record<string, typeof BookOpen> = {
  decentralisation: Network,
  blockchain: Boxes,
  wallet: Key,
  seedphrase: Shield,
  transactions: Send,
  consensus: Brain,
  validators: Server,
  explorer: Search,
};

interface Chapter {
  id: string;
  link: string;
  moduleIds: string[];
  totalXp: number;
}

const CHAPTERS: Chapter[] = [
  {
    id: "basics",
    link: "/basics",
    moduleIds: [
      "decentralisation",
      "blockchain",
      "wallet",
      "seedphrase",
      "transactions",
      "consensus",
      "validators",
      "explorer",
    ],
    totalXp: 1150,
  },
];

export default function ChaptersContent() {
  const { t } = useLocale();
  const { modules } = useGameState();
  const completedIds = new Set(modules.filter((m) => m.completed).map((m) => m.id));

  return (
    <div className="min-h-screen p-4 sm:p-6 md:p-10">
      <TopBar />
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-[var(--sol-text-muted)] hover:text-[var(--sol-text)] transition-colors mb-4 text-sm"
        >
          <ChevronLeft size={16} />
          {t.login.backHome}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 sm:mb-10"
        >
          <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-[var(--sol-purple)] to-[var(--sol-green)] bg-clip-text text-transparent">
              {t.home.chaptersTitle}
            </span>
          </h1>
          <p className="text-[var(--sol-text-muted)] text-base sm:text-lg">
            {t.basics.pageSubtitle}
          </p>
        </motion.div>

        <div className="space-y-4">
          {CHAPTERS.map((chapter) => {
            const chapterCompleted = chapter.moduleIds.filter((id) =>
              completedIds.has(id)
            ).length;
            const chapterTotal = chapter.moduleIds.length;
            const chapterXp = modules
              .filter((m) => chapter.moduleIds.includes(m.id))
              .reduce((sum, m) => sum + m.xpEarned, 0);
            const progressPercent = Math.round(
              (chapterCompleted / chapterTotal) * 100
            );

            return (
              <Link key={chapter.id} href={chapter.link}>
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0 0 20px rgba(153, 69, 255, 0.2)",
                  }}
                  className="bg-[var(--sol-card)] border border-[var(--sol-card-hover)] hover:border-[var(--sol-purple)]/40 rounded-xl p-4 sm:p-6 transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-[var(--sol-purple)]/20 to-[var(--sol-green)]/20 flex items-center justify-center">
                        <BookOpen size={24} className="text-[var(--sol-purple)]" />
                      </div>
                      <div>
                        <h3 className="font-bold text-[var(--sol-text)] text-base sm:text-lg">
                          {t.basics.pageTitle}
                        </h3>
                        <p className="text-xs sm:text-sm text-[var(--sol-text-muted)]">
                          {chapterTotal} {t.home.chapterModules}
                        </p>
                      </div>
                    </div>
                    <ChevronRight size={20} className="text-[var(--sol-text-muted)]" />
                  </div>

                  <div className="mb-3">
                    <div className="flex justify-between text-xs sm:text-sm mb-1">
                      <span className="text-[var(--sol-text-muted)]">
                        {chapterCompleted}/{chapterTotal} {t.common.modulesCompleted}
                      </span>
                      <span className="text-[var(--sol-green)] font-medium">
                        {chapterXp}/{chapter.totalXp} XP
                      </span>
                    </div>
                    <div className="w-full bg-[var(--sol-darker)] rounded-full h-2 overflow-hidden">
                      <motion.div
                        className="bg-gradient-to-r from-[var(--sol-purple)] to-[var(--sol-green)] h-full rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercent}%` }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                      />
                    </div>
                  </div>

                  <div className="flex gap-2">
                    {chapter.moduleIds.map((modId, i) => {
                      const Icon = MODULE_ICONS[modId] ?? BookOpen;
                      const done = completedIds.has(modId);
                      return (
                        <motion.div
                          key={modId}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            type: "spring",
                            stiffness: 300,
                            damping: 15,
                            delay: 0.3 + i * 0.06,
                          }}
                          className={`w-8 h-8 rounded-md flex items-center justify-center ${
                            done
                              ? "bg-[var(--sol-green)]/20 text-[var(--sol-green)]"
                              : "bg-[var(--sol-darker)] text-[var(--sol-text-muted)]/50"
                          }`}
                        >
                          <Icon size={16} />
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
