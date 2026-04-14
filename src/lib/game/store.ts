import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  type GameStore,
  type GameState,
  type ModuleId,
  type ModuleProgress,
  INITIAL_STATE,
  INITIAL_MODULES,
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
      version: 1,
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
      merge: (persisted, current) => {
        const persistedState = persisted as Partial<GameState> | undefined;
        if (!persistedState?.modules) return { ...current };

        const savedModules = persistedState.modules;
        const savedIds = new Set(savedModules.map((m) => m.id));

        // Reconcile: keep saved progress, add any new modules from INITIAL_MODULES
        const mergedModules: ModuleProgress[] = INITIAL_MODULES.map((initial) => {
          const saved = savedModules.find((m) => m.id === initial.id);
          if (saved) return { ...saved };
          // New module: check if the previous module in order was completed
          const idx = MODULE_ORDER.indexOf(initial.id as ModuleId);
          const prevId = idx > 0 ? MODULE_ORDER[idx - 1] : null;
          const prevCompleted = prevId
            ? savedModules.find((m) => m.id === prevId)?.completed ?? false
            : true;
          return { ...initial, unlocked: prevCompleted };
        });

        return {
          ...current,
          ...persistedState,
          modules: mergedModules,
        };
      },
    }
  )
);
