"use client";

import { useEffect, useRef, useState } from "react";
import { useZenMode } from "@/contexts/ZenModeContext";

/**
 * 娱乐区音乐播放器：哈基米二创音乐，静心模式完全隐藏。
 */
export function MusicPlayer() {
  const { isZenMode } = useZenMode();
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio("/sounds/hachimi-music.mp3");
    audioRef.current.loop = true;
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, []);

  // 静心模式开启立即静音（组件只是隐藏，Audio对象不会自动停）
  useEffect(() => {
    if (isZenMode) audioRef.current?.pause();
  }, [isZenMode]);

  // zen下视为未播放（界面隐藏，恢复后显示为暂停态）
  const isPlaying = playing && !isZenMode;

  if (isZenMode) return null;

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setPlaying(false);
    } else {
      audio.play().catch(() => {});
      setPlaying(true);
    }
  };

  const close = () => {
    audioRef.current?.pause();
    setPlaying(false);
    setOpen(false);
  };

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="fixed bottom-[260px] right-[20px] z-40 rounded-full bg-muted/60 p-2 text-2xl backdrop-blur transition-colors hover:bg-muted"
        aria-label="打开音乐播放器"
      >
        🎵
      </button>
    );
  }

  return (
    <div className="fixed bottom-[260px] right-[20px] z-40 flex items-center gap-2 rounded-lg border border-border/40 bg-muted/80 px-3 py-2 backdrop-blur">
      <span className="text-lg">🎵</span>
      <span className="text-xs text-muted-foreground">哈基米二创音乐</span>
      <button
        type="button"
        onClick={togglePlay}
        className="text-sm hover:text-foreground/80"
        aria-label={isPlaying ? "暂停" : "播放"}
      >
        {isPlaying ? "⏸" : "▶"}
      </button>
      <button
        type="button"
        onClick={close}
        className="text-sm hover:text-foreground/80"
        aria-label="关闭"
      >
        ✕
      </button>
    </div>
  );
}
