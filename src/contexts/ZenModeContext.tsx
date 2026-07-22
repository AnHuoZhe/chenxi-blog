"use client";

import { createContext, useContext, useState } from "react";

interface ZenModeContextValue {
  isZenMode: boolean;
  toggleZenMode: () => void;
}

const ZenModeContext = createContext<ZenModeContextValue>({
  isZenMode: false,
  toggleZenMode: () => {},
});

export function useZenMode() {
  return useContext(ZenModeContext);
}

export function ZenModeProvider({ children }: { children: React.ReactNode }) {
  const [isZenMode, setIsZenMode] = useState(false);
  const toggleZenMode = () => setIsZenMode((v) => !v);

  return (
    <ZenModeContext.Provider value={{ isZenMode, toggleZenMode }}>
      {children}
    </ZenModeContext.Provider>
  );
}
