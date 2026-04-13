"use client";

import { useSyncExternalStore } from "react";
import { getGameState, getServerSnapshot, subscribe, type GameState } from "./gameState";

export function useGameState(): GameState {
  return useSyncExternalStore(subscribe, getGameState, getServerSnapshot);
}
