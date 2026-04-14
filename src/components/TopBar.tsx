"use client";

import { LanguageToggle } from "./LanguageToggle";
import { AuthButton } from "./AuthButton";

export function TopBar() {
  return (
    <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
      <AuthButton />
      <LanguageToggle />
    </div>
  );
}
