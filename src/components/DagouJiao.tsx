"use client";

import { useZenMode } from "@/contexts/ZenModeContext";
import { useChargeBar } from "@/hooks/useChargeBar";

export function DagouJiao() {
  const { isZenMode } = useZenMode();
  const { charge, flash } = useChargeBar();

  return (
    <div className="fixed bottom-[20px] right-[20px] z-40 flex flex-col items-center gap-2">
      {/* 圆形容器 */}
      <div className="flex h-20 w-20 items-center justify-center rounded-full border-2 border-amber-400/60 bg-muted/60 text-4xl backdrop-blur">
        <span role="img" aria-label="大狗叫">
          🐕
        </span>
      </div>
      {/* 蓄力条 */}
      <div className="w-[120px]">
        <div
          className={`h-2 w-full overflow-hidden rounded-full bg-muted ${
            flash ? "dagou-flash" : ""
          }`}
        >
          <div
            className="h-full rounded-full bg-amber-400 transition-all duration-300"
            style={{ width: `${charge}%` }}
          />
        </div>
        <p className="mt-1 text-center text-xs text-muted-foreground">
          {isZenMode ? "被隔离在罩子外…" : "大狗大狗大狗…"}
        </p>
      </div>
    </div>
  );
}
