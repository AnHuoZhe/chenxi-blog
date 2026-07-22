"use client";

import { useZenMode } from "@/contexts/ZenModeContext";

export function Beagle() {
  const { isZenMode } = useZenMode();

  return (
    <div className="fixed bottom-0 left-0 z-40 flex h-[60px] w-full items-center gap-3 border-t border-border/40 bg-muted/40 px-4 backdrop-blur">
      {isZenMode ? (
        <>
          <span className="text-2xl" role="img" aria-label="比格犬">
            🐕
          </span>
          <span className="text-sm text-muted-foreground">
            比格犬被隔离在罩子外，扒玻璃中…
          </span>
        </>
      ) : (
        <>
          <span className="text-2xl" role="img" aria-label="比格犬">
            🐕
          </span>
          <span className="text-sm text-muted-foreground">巡逻中...</span>
        </>
      )}
    </div>
  );
}
