"use client";

import { useEffect, useState } from "react";
import { useZenMode } from "@/contexts/ZenModeContext";
import { useSound } from "@/hooks/useSound";

export function Beagle() {
  const { isZenMode } = useZenMode();
  const { play } = useSound();
  const [showBubble, setShowBubble] = useState(false);

  // 随机5-15秒弹出"wer wer wer!"气泡，2秒后消失；静心模式停止
  useEffect(() => {
    if (isZenMode) {
      setShowBubble(false);
      return;
    }
    let hideTimer: ReturnType<typeof setTimeout>;
    let nextTimer: ReturnType<typeof setTimeout>;
    const schedule = () => {
      nextTimer = setTimeout(() => {
        setShowBubble(true);
        play("beagle-wer");
        hideTimer = setTimeout(() => {
          setShowBubble(false);
          schedule();
        }, 2000);
      }, 5000 + Math.random() * 10000);
    };
    schedule();
    return () => {
      clearTimeout(nextTimer);
      clearTimeout(hideTimer);
    };
  }, [isZenMode]);

  return (
    <div className="fixed bottom-0 left-0 z-40 h-[60px] w-full overflow-hidden border-t border-border/40 bg-muted/40 backdrop-blur">
      {isZenMode ? (
        <div className="flex h-full items-center gap-3 px-4">
          <img src="/images/beagle-cut.png" alt="比格犬" className="h-9 w-9 object-contain" />
          <span className="text-sm text-muted-foreground">
            比格犬被隔离在罩子外，扒玻璃中…
          </span>
        </div>
      ) : (
        <div className="beagle-patrol absolute bottom-1 left-0">
          <div className="relative">
            {showBubble && (
              <div className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-amber-300 px-3 py-1 text-xs font-bold text-black shadow">
                wer wer wer!
              </div>
            )}
            <img src="/images/beagle-cut.png" alt="比格犬" className="h-11 w-11 object-contain" />
          </div>
        </div>
      )}
    </div>
  );
}
