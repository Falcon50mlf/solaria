"use client";

import { useEffect, useRef } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { resetGameState } from "@/lib/gameState";

const SESSION_KEY = "solaria-session-start";
const EXPIRY_MS = 5 * 60 * 1000; // 5 minutes

export function SessionGuard() {
  const { authenticated, ready } = usePrivy();
  const checkedRef = useRef(false);

  useEffect(() => {
    if (!ready || checkedRef.current) return;
    checkedRef.current = true;

    // Authenticated users keep their progress forever
    if (authenticated) {
      localStorage.removeItem(SESSION_KEY);
      return;
    }

    const now = Date.now();
    const sessionStart = localStorage.getItem(SESSION_KEY);

    if (!sessionStart) {
      // First visit — record timestamp
      localStorage.setItem(SESSION_KEY, String(now));
      return;
    }

    const elapsed = now - Number(sessionStart);

    if (elapsed >= EXPIRY_MS) {
      // Session expired — reset progress and restart timer
      resetGameState();
      localStorage.setItem(SESSION_KEY, String(now));
    }
  }, [ready, authenticated]);

  return null;
}
