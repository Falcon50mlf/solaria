"use client";

import { gameStore } from "./game/store";
import type { ModuleId } from "./game/types";
import { MODULE_BADGES } from "./game/types";
import { supabase } from "./supabase";

// Re-export types with string id for backward compatibility
export interface ModuleProgress {
  id: string;
  title: string;
  completed: boolean;
  xpEarned: number;
  maxXp: number;
  unlocked: boolean;
}

export interface GameState {
  playerName: string;
  totalXp: number;
  level: number;
  modules: ModuleProgress[];
  badges: string[];
}

export function getGameState() {
  return gameStore.getState();
}

export function subscribe(listener: () => void) {
  return gameStore.subscribe(listener);
}

export function completeModule(moduleId: string, xp: number) {
  gameStore.getState().completeModule(moduleId as ModuleId, xp);

  // Sync to Supabase if user is logged in (fire and forget)
  syncProgressToSupabase(moduleId as ModuleId, xp);
}

function syncProgressToSupabase(moduleId: ModuleId, xp: number) {
  try {
    const privyCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith("privy-id="));
    if (!privyCookie) return;

    const privyDid = decodeURIComponent(privyCookie.split("=")[1]);
    if (!privyDid) return;

    const badge = MODULE_BADGES[moduleId] ?? null;

    supabase
      .from("progress")
      .upsert(
        {
          privy_did: privyDid,
          module_id: moduleId,
          xp_earned: xp,
          badge,
        },
        { onConflict: "privy_did,module_id" }
      )
      .then(({ error }) => {
        if (error) console.error("Progress sync error:", error.message);
      });
  } catch {
    // Not logged in or no cookie — skip silently
  }
}

export function resetGameState() {
  gameStore.getState().resetGameState();
}

export function getServerSnapshot() {
  return gameStore.getInitialState();
}
