"use client";

import { LanguageToggle } from "./LanguageToggle";
import { AuthButton } from "./AuthButton";

export function TopBar() {
  return (
    <div className="fixed top-3 right-3 sm:top-4 sm:right-4 z-50 flex flex-wrap items-center gap-2">
      <AuthButton />
      <LanguageToggle />
    </div>
  );
}
