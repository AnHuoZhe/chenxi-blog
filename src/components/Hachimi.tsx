"use client";

import { useRef, useState } from "react";
import { useZenMode } from "@/contexts/ZenModeContext";
import { useInvasion } from "@/contexts/InvasionContext";
import { useSound } from "@/hooks/useSound";

type Phase = "idle" | "sucking" | "spinosaurus";

export function Hachimi() {
  const { isZenMode } = useZenMode();
  const { isInvading } = useInvasion();
  const { play } = useSound();
  const [phase, setPhase] = useState<Phase>("idle");
  const cooling = useRef(false);

  const suck = () => {
    if (phase !== "idle" || cooling.current) return;
    cooling.current = true;
    setPhase("sucking");
    // 吸入动画结束后变棘背龙
    setTimeout(() => {
      setPhase("spinosaurus");
      play("hachimi-hiss");
      // 额外随机触发：老吴声或嚼口香糖（各50%）
      const r = Math.random();
      if (r < 0.5) play("hachimi-laowu");
      else play("hachimi-chew");
    }, 500);
    // 3秒后恢复常态
    setTimeout(() => setPhase("idle"), 3500);
    // 冷却5秒
    setTimeout(() => {
      cooling.current = false;
    }, 5000);
  };

  return (
    <button
      type="button"
      onClick={suck}
      className="fixed bottom-[120px] right-[20px] z-40 flex flex-col items-center gap-1 rounded-lg p-2 transition-colors hover:bg-muted/40"
      aria-label="哈基米盒子"
    >
      {phase === "sucking" && (
        // 吸入：🐱缩小+旋转进📦
        <span className="text-4xl hachimi-suck" role="img" aria-label="吸入中">
          🐱
        </span>
      )}
      {phase === "spinosaurus" && (
        <>
          <span className="text-4xl" role="img" aria-label="棘背龙">
            🦖
          </span>
          <span className="text-xs font-bold text-purple-400">棘背龙形态！</span>
        </>
      )}
      {phase === "idle" && (
        <>
          <span className="text-4xl" role="img" aria-label="盒子">
            📦
          </span>
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
