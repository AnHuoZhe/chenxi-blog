"use client";

import { createContext, useContext, useState } from "react";

interface InvasionContextValue {
  isInvading: boolean;
  setInvading: (v: boolean) => void;
}

const InvasionContext = createContext<InvasionContextValue>({
  isInvading: false,
  setInvading: () => {},
});

export function useInvasion() {
  return useContext(InvasionContext);
}

export function InvasionProvider({ children }: { children: React.ReactNode }) {
  const [isInvading, setInvading] = useState(false);

  return (
    <InvasionContext.Provider value={{ isInvading, setInvading }}>
      {children}
      {/* 冥界入侵：从右边缘渗入的暗色光晕 */}
      <div
        aria-hidden
        className={`pointer-events-none fixed inset-y-0 right-0 z-30 w-1/3 transition-opacity duration-700 ${
          isInvading ? "opacity-100" : "opacity-0"
        }`}
        style={{
          background:
            "linear-gradient(to left, rgba(20,0,40,0.85), rgba(60,0,80,0.35) 55%, transparent)",
        }}
      />
    </InvasionContext.Provider>
  );
}
