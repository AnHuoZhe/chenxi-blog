"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import ClickSpark from "@/components/ClickSpark";

export default function Home() {
  return (
    <ClickSpark sparkColor="#facc15" sparkCount={10} sparkRadius={24}>
      <section className="relative flex min-h-[calc(100vh-8.5rem)] flex-col items-center justify-center gap-8 px-4 text-center">
        {/* 比格犬守门占位：后续换正式角色形象 + werwerwer 动画 */}
        <div className="text-8xl" role="img" aria-label="比格犬守门">
          🐶
        </div>
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          比格犬在此守门
        </h1>
        <p className="max-w-md text-muted-foreground">
          这里是三元抽象博客的大门。天堂是主场，冥界是入侵者。
          比格犬是房东，wer wer wer 停不下来。
        </p>
        {/* 只有天堂入口，无冥界入口——冥界只在文章中入侵 */}
        <Link href="/">
          <Button size="lg" className="text-lg">
            进入天堂
          </Button>
        </Link>
      </section>
    </ClickSpark>
  );
}
