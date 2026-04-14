"use client";

import { useSyncExternalStore } from "react";
import { localeStore, getDictionary } from "./i18n/store";
import type { Locale, TranslationDictionary } from "./i18n/types";

function getSnapshot() {
  return localeStore.getState();
}

function getServerSnapshot() {
  return localeStore.getInitialState();
}

function subscribe(listener: () => void) {
  return localeStore.subscribe(listener);
}

interface UseLocaleReturn {
  locale: Locale;
  t: TranslationDictionary;
  toggleLocale: () => void;
  setLocale: (locale: Locale) => void;
}

export function useLocale(): UseLocaleReturn {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    locale: state.locale,
    t: getDictionary(state.locale),
    toggleLocale: state.toggleLocale,
    setLocale: state.setLocale,
  };
}
