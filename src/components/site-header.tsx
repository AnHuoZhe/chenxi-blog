"use client";

import Link from "next/link";
import { Switch } from "@/components/ui/switch";
import { useZenMode } from "@/contexts/ZenModeContext";

export function SiteHeader() {
  const { isZenMode, toggleZenMode } = useZenMode();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-zinc-950/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <img src="/images/beagle-cut.png" alt="比格犬" className="h-7 w-7 object-contain" />
          <span className="text-lg font-black tracking-[0.3em] text-amber-200">
            晨汐
          </span>
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link
            href="/posts"
            className="text-zinc-300 transition-colors hover:text-amber-300"
          >
            天堂
          </Link>
          <Link
            href="/underworld"
            className="text-zinc-300 transition-colors hover:text-purple-400"
          >
            冥界
          </Link>
          {/* 静心模式：珊迪玻璃罩 */}
          <label className="flex items-center gap-2">
            <span className="text-zinc-400">静心</span>
            <Switch
              checked={isZenMode}
              onCheckedChange={toggleZenMode}
              aria-label="静心模式"
            />
          </label>
        </nav>
      </div>
    </header>
  );
}
