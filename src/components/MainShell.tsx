"use client";

import { useZenMode } from "@/contexts/ZenModeContext";

export function MainShell({ children }: { children: React.ReactNode }) {
  const { isZenMode } = useZenMode();

  return (
    <main
      className={
        isZenMode
          ? // 珊迪玻璃罩：半透明边框 + 微弱发光，三元角色隔离在外
            "flex-1 pb-24 outline outline-1 outline-cyan-200/30 shadow-[0_0_60px_10px_rgba(165,243,252,0.12)]"
          : "flex-1 pb-24"
      }
    >
      {children}
    </main>
  );
}
