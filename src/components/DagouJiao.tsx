"use client";

import { useZenMode } from "@/contexts/ZenModeContext";

export function DagouJiao() {
  const { isZenMode } = useZenMode();

  return (
    <div className="fixed bottom-[20px] right-[20px] z-40 flex flex-col items-center gap-2">
      {/* 圆形容器 */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/60 bg-muted/60 text-4xl backdrop-blur">
        <span role="img" aria-label="大狗叫">
          🐕
        </span>
      </div>
      {/* 蓄力条：目前固定50%假数据 */}
      <div className="w-[120px]">
        <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full w-1/2 rounded-full bg-amber-400" />
        </div>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          {isZenMode ? "被隔离在罩子外…" : "大狗大狗大狗…"}
        </p>
      </div>
    </div>
  );
}
