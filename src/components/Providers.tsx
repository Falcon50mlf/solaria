"use client";

import { PrivyProvider } from "@privy-io/react-auth";
import { useState, useEffect, type ReactNode } from "react";
import { SessionGuard } from "./SessionGuard";

const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? "";

export function Providers({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // During SSR/prerendering, render children without Privy to avoid
  // "invalid app ID" error during static generation
  if (!mounted || !appId) {
    return <>{children}</>;
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ["google", "email"],
        appearance: {
          theme: "dark",
          accentColor: "#9945FF",
        },
        embeddedWallets: {
          solana: {
            createOnLogin: "all-users",
          },
        },
      }}
    >
      <SessionGuard />
      {children}
    </PrivyProvider>
  );
}
