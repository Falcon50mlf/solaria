"use client";

import { useEffect, useRef } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { supabase } from "@/lib/supabase";
import { gameStore } from "@/lib/game/store";
import { MODULE_ORDER, MODULE_BADGES, MASTER_BADGE } from "@/lib/game/types";
import type { ModuleId } from "@/lib/game/types";

export function ProgressSync() {
  const { user, authenticated, ready } = usePrivy();
  const syncedRef = useRef<string | null>(null);

  useEffect(() => {
    if (!ready || !authenticated || !user) return;
    if (syncedRef.current === user.id) return;
    syncedRef.current = user.id;

    supabase
      .from("progress")
      .select("module_id, xp_earned, badge, completed_at")
      .eq("privy_did", user.id)
      .then(({ data, error }) => {
        if (error || !data || data.length === 0) return;

        const remoteCompleted = new Map(
          data.map((row) => [row.module_id, row])
        );

        gameStore.setState((state) => {
          const modules = state.modules.map((m) => ({ ...m }));
          let totalXp = 0;
          const badges: string[] = [];

          for (const mod of modules) {
            const remote = remoteCompleted.get(mod.id);
            if (remote) {
              mod.completed = true;
              mod.xpEarned = remote.xp_earned;
              totalXp += remote.xp_earned;

              const badge = MODULE_BADGES[mod.id as ModuleId];
              if (badge && !badges.includes(badge)) {
                badges.push(badge);
              }
            } else if (mod.completed && mod.xpEarned > 0) {
              // Keep local progress that hasn't been synced yet
              totalXp += mod.xpEarned;
              const badge = MODULE_BADGES[mod.id as ModuleId];
              if (badge && !badges.includes(badge)) {
                badges.push(badge);
              }
            }
          }

          // Recalculate unlock state based on MODULE_ORDER
          for (let i = 0; i < MODULE_ORDER.length; i++) {
            const mod = modules.find((m) => m.id === MODULE_ORDER[i]);
            if (!mod) continue;
            if (i === 0) {
              mod.unlocked = true;
            } else {
              const prev = modules.find(
                (m) => m.id === MODULE_ORDER[i - 1]
              );
              mod.unlocked = prev?.completed ?? false;
            }
          }

          // Master badge
          if (
            modules.every((m) => m.completed) &&
            !badges.includes(MASTER_BADGE)
          ) {
            badges.push(MASTER_BADGE);
          }

          const level = Math.floor(totalXp / 100) + 1;

          return { modules, totalXp, level, badges };
        });
      });
  }, [ready, authenticated, user]);

  return null;
}
