"use client";

import { useEffect, useState, useRef } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { supabase } from "@/lib/supabase";

interface UseUserReturn {
  user: ReturnType<typeof usePrivy>["user"];
  walletAddress: string | null;
  isLoading: boolean;
  isAuthenticated: boolean;
}

export function useUser(): UseUserReturn {
  const { user, authenticated, ready } = usePrivy();
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const upsertedRef = useRef<string | null>(null);

  // Extract Solana wallet address from Privy user's linked accounts
  useEffect(() => {
    if (!user) {
      setWalletAddress(null);
      return;
    }
    const solanaWallet = user.linkedAccounts.find(
      (a) =>
        a.type === "wallet" &&
        "chainType" in a &&
        (a as { chainType: string }).chainType === "solana"
    );
    setWalletAddress(
      solanaWallet && "address" in solanaWallet
        ? (solanaWallet as { address: string }).address
        : null
    );
  }, [user]);

  // Upsert user in Supabase when authenticated
  useEffect(() => {
    if (!authenticated || !user) return;

    const privyDid = user.id;

    // Set cookie so gameState sync can identify the user
    document.cookie = `privy-id=${encodeURIComponent(privyDid)};path=/;max-age=31536000;samesite=lax`;

    // Skip if already upserted for this user
    if (upsertedRef.current === privyDid) return;
    upsertedRef.current = privyDid;

    const email =
      user.email?.address ??
      user.google?.email ??
      null;

    supabase
      .from("users")
      .upsert(
        {
          privy_did: privyDid,
          email,
          wallet_address: walletAddress,
        },
        { onConflict: "privy_did" }
      )
      .then(({ error }) => {
        if (error) {
          console.error("Supabase upsert error:", error.message);
          upsertedRef.current = null;
        }
      });
  }, [authenticated, user, walletAddress]);

  return {
    user: user ?? null,
    walletAddress,
    isLoading: !ready,
    isAuthenticated: authenticated,
  };
}
