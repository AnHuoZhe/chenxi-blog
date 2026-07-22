"use client";

import { useZenMode } from "@/contexts/ZenModeContext";

export function MainShell({ children }: { children: React.ReactNode }) {
  const { isZenMode } = useZenMode();

  return (
    <main className={isZenMode ? "zen-dome flex-1" : "flex-1 pb-24"}>
      {children}
    </main>
  );
}
