"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { Wallet, Building2, Layers, ShieldCheck, LogIn } from "lucide-react";
import { useLocale } from "@/lib/useLocale";
import { LanguageToggle } from "@/components/LanguageToggle";
import { SolariaLogo } from "@/components/SolariaLogo";

const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; o: number }>>([]);
  useEffect(() => {
    setParticles(
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        o: 0.2 + Math.random() * 0.4,
      }))
    );
  }, []);
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, background: "#9945ff", opacity: p.o }}
          animate={{ y: [0, -15, 0], opacity: [p.o * 0.5, p.o, p.o * 0.5] }}
          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() }}
        />
      ))}
    </div>
  );
};

export default function HomeContent() {
  const { t } = useLocale();
  const { authenticated, login, ready } = usePrivy();

  return (
    <div className="relative min-h-screen flex flex-col bg-[#111] text-white font-poppins overflow-hidden">
      {/* Top navbar */}
      <nav className="relative z-20 flex items-center justify-between px-6 sm:px-12 py-4">
        <Link href="/" className="flex items-center gap-2">
          <SolariaLogo size={26} fill="white" />
          <span className="font-semibold text-xl tracking-tight">Solaria</span>
        </Link>
        <div className="flex items-center gap-3">
          <LanguageToggle />
          {ready && authenticated ? (
            <Link href="/dashboard" className="pill-purple inline-flex items-center gap-2">
              <Wallet size={18} /> {t.dashboard.title}
            </Link>
          ) : (
            <button
              onClick={login}
              disabled={!ready}
              className="pill-purple inline-flex items-center gap-2 cursor-pointer"
            >
              <LogIn size={18} /> {t.login.loginButton}
            </button>
          )}
        </div>
      </nav>

      {/* Top elliptical glow */}
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-[480px] w-[667px] h-[667px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(153,69,255,0.35) 0%, rgba(153,69,255,0.1) 40%, rgba(17,17,17,0) 70%)",
        }}
      />
      <Particles />

      {/* Hero */}
      <main className="relative z-10 flex-1 flex flex-col items-center px-4 sm:px-8 pt-16 sm:pt-20 pb-32">
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center justify-center rounded-full border border-[#9945ff] bg-[rgba(153,69,255,0.1)] px-8 py-3 mb-6"
        >
          <span className="text-[13px] uppercase tracking-wider font-medium">
            {t.home.narratorLabel}
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-[52px] font-bold uppercase text-center leading-[1.1] mb-4 flex flex-wrap items-center justify-center gap-3"
        >
          <span>{t.home.heroTitle1}</span>
          <span className="bg-gradient-to-r from-[#9945ff] via-[#00d4ff] to-[#14f195] bg-clip-text text-transparent">
            {t.home.heroTitle2}
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg sm:text-xl text-center font-light text-white/90 max-w-2xl mb-16"
        >
          {t.home.subtitle}
        </motion.p>

        {/* 3 feature cards */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-9 w-full max-w-6xl mb-12"
        >
          <FeatureCard
            icon={<Building2 size={36} className="text-white" />}
            title={t.home.cardBasicsTitle}
            desc={t.home.cardBasicsDesc}
            comingSoonLabel={t.home.comingSoon}
            variant="blue"
            href="/chapters"
            enabled
          />
          <FeatureCard
            icon={<Layers size={36} className="text-white" />}
            title={t.home.cardInfraTitle}
            desc={t.home.cardInfraDesc}
            comingSoonLabel={t.home.comingSoon}
            variant="green"
          />
          <FeatureCard
            icon={<ShieldCheck size={36} className="text-white" />}
            title={t.home.cardSecurityTitle}
            desc={t.home.cardSecurityDesc}
            comingSoonLabel={t.home.comingSoon}
            variant="purple"
          />
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <Link href="/chapters" className="pill-outline inline-flex items-center gap-2">
            {t.home.exploreWithoutAccount}
          </Link>
        </motion.div>
      </main>

      {/* Bottom navbar */}
      <footer className="relative z-10 flex items-center justify-between px-6 sm:px-12 py-5 border-t border-white/5">
        <div className="flex items-center gap-3">
          <SolariaLogo size={42} fill="white" />
          <div>
            <div className="font-semibold text-2xl leading-tight">Solaria</div>
            <div className="text-[11px] tracking-[0.2em] uppercase text-white/60">{t.home.fromZeroToSolana}</div>
          </div>
        </div>
        <a
          href="https://x.com"
          target="_blank"
          rel="noreferrer"
          aria-label="X"
          className="w-8 h-8 flex items-center justify-center opacity-80 hover:opacity-100 transition-opacity"
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  desc,
  variant,
  href,
  enabled,
  comingSoonLabel,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
  variant: "blue" | "green" | "purple";
  href?: string;
  enabled?: boolean;
  comingSoonLabel: string;
}) {
  const variantClass =
    variant === "blue" ? "fg-card-blue" : variant === "green" ? "fg-card-green" : "fg-card-purple";

  const inner = (
    <motion.div
      whileHover={enabled ? { y: -4 } : {}}
      className={`${variantClass} relative rounded-[38px] p-8 sm:p-10 h-full min-h-[360px] flex flex-col gap-6 overflow-hidden ${
        enabled ? "cursor-pointer" : "opacity-90"
      }`}
    >
      <div>{icon}</div>
      <h3 className="text-2xl sm:text-[28px] font-normal">{title}</h3>
      <p className="text-[15px] text-[#919191] leading-relaxed flex-1">{desc}</p>
      {!enabled && (
        <span className="text-xs uppercase tracking-wider text-white/50 border border-white/10 rounded-full px-3 py-1 self-start">
          {comingSoonLabel}
        </span>
      )}
    </motion.div>
  );

  return href && enabled ? <Link href={href}>{inner}</Link> : inner;
}
