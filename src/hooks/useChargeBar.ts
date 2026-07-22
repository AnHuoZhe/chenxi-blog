"use client";

import { useEffect, useRef, useState } from "react";
import { useSound } from "@/hooks/useSound";
import { useZenMode } from "@/contexts/ZenModeContext";

const STORAGE_KEY = "dagou-charge";

/**
 * 大狗叫蓄力：滚动200px +1，停留30秒 +3，点文章链接 +5。
 * 满100播放"叫~"，蓄力条闪烁，归零重来。静心模式不积累。
 */
export function useChargeBar() {
  const { play } = useSound();
  const { isZenMode } = useZenMode();
  const [charge, setCharge] = useState(0);
  const [flash, setFlash] = useState(false);
  const lastScrollY = useRef(0);

  // 初始值从localStorage读取
  useEffect(() => {
    const saved = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
    if (saved > 0 && saved < 100) setCharge(saved);
    lastScrollY.current = window.scrollY;
  }, []);

  const gain = (amount: number) => {
    if (isZenMode) return;
    setCharge((prev) => {
      const next = prev + amount;
      if (next >= 100) {
        play("dagou-release");
        setFlash(true);
        setTimeout(() => setFlash(false), 1200);
        localStorage.setItem(STORAGE_KEY, "0");
        return 0;
      }
      localStorage.setItem(STORAGE_KEY, String(next));
      return next;
    });
  };
  const gainRef = useRef(gain);
  gainRef.current = gain;

  useEffect(() => {
    // 滚动超200px：+1
    const onScroll = () => {
      if (Math.abs(window.scrollY - lastScrollY.current) >= 200) {
        lastScrollY.current = window.scrollY;
        gainRef.current(1);
      }
    };
    // 停留每30秒：+3
    const stayTimer = setInterval(() => gainRef.current(3), 30000);
    // 点击文章链接：+5（事件委托）
    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest?.("a");
      if (anchor?.getAttribute("href")?.startsWith("/posts/")) {
        gainRef.current(5);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("click", onClick);
      clearInterval(stayTimer);
    };
  }, []);

  return { charge, flash };
}
