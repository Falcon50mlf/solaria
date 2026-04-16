import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";
import type { Locale, TranslationDictionary } from "./types";
import { fr } from "./dictionaries/fr";
import { en } from "./dictionaries/en";

const dictionaries: Record<Locale, TranslationDictionary> = { fr, en };

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggleLocale: () => void;
}

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

export const localeStore = createStore<LocaleState>()(
  persist(
    (set) => ({
      locale: "fr" as Locale,
      setLocale: (locale: Locale) => set({ locale }),
      toggleLocale: () =>
        set((state) => ({ locale: state.locale === "fr" ? "en" : "fr" })),
    }),
    {
      name: "solaria-locale",
      storage: createJSONStorage(() =>
        typeof window !== "undefined" ? localStorage : noopStorage
      ),
      partialize: (state) => ({ locale: state.locale }),
    }
  )
);

export function getDictionary(locale: Locale): TranslationDictionary {
  return dictionaries[locale];
}
