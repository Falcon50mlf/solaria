import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  type GameStore,
  type ModuleId,
  INITIAL_STATE,
  MODULE_BADGES,
  MODULE_ORDER,
  MASTER_BADGE,
} from "./types";

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const gameStore = createStore<GameStore>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,
      modules: INITIAL_STATE.modules.map((m) => ({ ...m })),
      badges: [],

      completeModule: (moduleId: ModuleId, xp: number) => {
        set((state) => {
          const modules = state.modules.map((m) => ({ ...m }));
          const mod = modules.find((m) => m.id === moduleId);
          if (!mod || mod.completed) return state;

          mod.completed = true;
          mod.xpEarned = xp;

          const totalXp = state.totalXp + xp;
          const level = Math.floor(totalXp / 100) + 1;

          // Unlock next module
          const idx = MODULE_ORDER.indexOf(moduleId);
          if (idx >= 0 && idx < MODULE_ORDER.length - 1) {
            const nextId = MODULE_ORDER[idx + 1];
            const nextMod = modules.find((m) => m.id === nextId);
            if (nextMod) nextMod.unlocked = true;
          }

          // Award badge
          const badges = [...state.badges];
          const badge = MODULE_BADGES[moduleId];
          if (badge && !badges.includes(badge)) {
            badges.push(badge);
          }

          // Master badge
          if (
            modules.every((m) => m.completed) &&
            !badges.includes(MASTER_BADGE)
          ) {
            badges.push(MASTER_BADGE);
          }

          return { modules, totalXp, level, badges };
        });
      },

      resetGameState: () => {
        set({
          ...INITIAL_STATE,
          modules: INITIAL_STATE.modules.map((m) => ({ ...m })),
          badges: [],
        });
      },
    }),
    {
      name: "solquest-game-state",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : noopStorage
      ),
      partialize: (state) => ({
        playerName: state.playerName,
        totalXp: state.totalXp,
        level: state.level,
        modules: state.modules,
        badges: state.badges,
      }),
    }
  )
);
