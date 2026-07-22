"use client";

import { usePathname } from "next/navigation";
import { SiteHeader } from "@/components/site-header";
import { MainShell } from "@/components/MainShell";
import { Beagle } from "@/components/Beagle";
import { DagouJiao } from "@/components/DagouJiao";
import { Hachimi } from "@/components/Hachimi";
import { MusicPlayer } from "@/components/MusicPlayer";

/**
 * 首页是纯视觉沉浸场景：无导航栏、无漂浮角色。
 * 其余页面带完整chrome。
 */
export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/") {
    return <MainShell>{children}</MainShell>;
  }

  return (
    <>
      <SiteHeader />
      <MainShell>{children}</MainShell>
      <Beagle />
      <DagouJiao />
      <Hachimi />
      <MusicPlayer />
    </>
  );
}
