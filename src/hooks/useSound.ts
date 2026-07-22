"use client";

import { useCallback } from "react";
import { useZenMode } from "@/contexts/ZenModeContext";

export type SoundName =
  | "beagle-wer"
  | "dagou-call"
  | "hachimi-hiss"
  | "hachimi-laowu"
  | "hachimi-chew"
  | "hachimi-music";

/**
 * 音效管理：HTML5 Audio，文件缺失静默失败，静心模式全静音。
 */
export function useSound() {
  const { isZenMode } = useZenMode();

  const play = useCallback(
    (name: SoundName) => {
      if (isZenMode) return;
      try {
        const audio = new Audio(`/sounds/${name}.mp3`);
        void audio.play().catch(() => {
          /* 文件缺失或浏览器限制，静默 */
        });
      } catch {
        /* 静默失败 */
      }
    },
    [isZenMode]
  );

  return { play };
}
