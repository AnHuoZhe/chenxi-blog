"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ClickSpark from "@/components/ClickSpark";

export default function Home() {
  return (
    <ClickSpark sparkColor="#facc15" sparkCount={10} sparkRadius={24}>
      <section className="flex min-h-screen flex-col items-center justify-center gap-8 px-4 text-center">
        {/* 比格犬守门 */}
        <div className="text-[120px] leading-none" role="img" aria-label="比格犬守门">
          🐕
        </div>
        <h1 className="text-5xl font-bold tracking-tight sm:text-6xl">
          大狗叫博客
        </h1>
        <p className="text-lg text-muted-foreground">
          比格犬在此守门，werwerwer
        </p>
        {/* 只有天堂入口，无冥界入口——冥界只在文章中入侵 */}
        <Link href="/posts">
          <Button size="lg" className="px-8 text-lg">
            [进入天堂 / 大狗叫]
          </Button>
        </Link>
      </section>
    </ClickSpark>
  );
}
