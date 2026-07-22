"use client";

import { useState } from "react";
import { useZenMode } from "@/contexts/ZenModeContext";
import { useInvasion } from "@/contexts/InvasionContext";

export function Hachimi() {
  const { isZenMode } = useZenMode();
  const { isInvading } = useInvasion();
  const [inBox, setInBox] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setInBox((v) => !v)}
      className="fixed bottom-[120px] right-[20px] z-40 flex flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-muted/40"
      aria-label={inBox ? "打开哈基米盒子" : "哈基米"}
    >
      {inBox ? (
        <span
          className={`text-4xl ${isInvading ? "hachimi-box-glow" : ""}`}
          role="img"
          aria-label="盒子"
        >
          📦
        </span>
      ) : (
        <>
          <span
            className={`text-4xl ${isInvading ? "hachimi-shake" : ""}`}
            role="img"
            aria-label="哈基米"
          >
            🐱
          </span>
          <span className="text-xs text-muted-foreground">
            {isZenMode ? "被隔离在罩子外" : isInvading ? "哈气!" : "哈基米"}
          </span>
        </>
      )}
    </button>
  );
}
