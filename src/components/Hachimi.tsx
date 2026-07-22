"use client";

import { useState } from "react";
import { useZenMode } from "@/contexts/ZenModeContext";

export function Hachimi() {
  const { isZenMode } = useZenMode();
  const [inBox, setInBox] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setInBox((v) => !v)}
      className="fixed bottom-[120px] right-[20px] z-40 flex flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-muted/40"
      aria-label={inBox ? "打开哈基米盒子" : "哈基米"}
    >
      {inBox ? (
        // 盒子状态：点击切换，动画后续做
        <span className="text-4xl" role="img" aria-label="盒子">
          📦
        </span>
      ) : (
        <>
          <span className="text-4xl" role="img" aria-label="哈基米">
            🐱
          </span>
          <span className="text-xs text-muted-foreground">
            {isZenMode ? "被隔离在罩子外" : "哈基米"}
          </span>
        </>
      )}
    </button>
  );
}
