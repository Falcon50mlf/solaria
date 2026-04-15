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
    if (ready && authenticated) router.push(redirect);
  }, [ready, authenticated, router, redirect]);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#111]">
        <div className="animate-pulse text-[#919191]">...</div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-6 bg-[#111] text-white font-poppins overflow-hidden">
      <div
        className="absolute left-1/2 -translate-x-1/2 -top-[420px] w-[667px] h-[667px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(153,69,255,0.3) 0%, rgba(153,69,255,0.08) 40%, rgba(17,17,17,0) 70%)",
        }}
      />

      <div className="absolute top-4 right-4 z-20">
        <LanguageToggle />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[#9945ff] to-[#14f195]" />
            <span className="font-semibold text-2xl">SolQuest</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold mb-3">{t.login.title}</h1>
          <p className="text-[#919191]">{t.login.subtitle}</p>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={login}
          className="pill-purple w-full inline-flex items-center justify-center gap-3 !py-4 !text-base cursor-pointer"
        >
          <LogIn size={20} />
          {t.login.loginButton}
        </motion.button>

        <div className="flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-white/10" />
          <span className="text-sm text-[#919191]">{t.login.orContinue}</span>
          <div className="flex-1 h-px bg-white/10" />
        </div>

        <Link
          href="/"
          className="w-full flex items-center justify-center gap-2 border border-white/10 hover:border-[#9945ff]/50 text-[#919191] hover:text-white font-medium py-3 px-6 rounded-full transition-colors"
        >
          <ArrowLeft size={18} />
          {t.login.backHome}
        </Link>
      </motion.div>
    </div>
  );
}
