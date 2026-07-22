import Link from "next/link";
import { Switch } from "@/components/ui/switch";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
        <Link href="/" className="text-lg font-bold tracking-wide">
          大狗叫博客
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="transition-colors hover:text-foreground/80">
            天堂
          </Link>
          <Link href="/" className="transition-colors hover:text-foreground/80">
            冥界
          </Link>
          {/* 静心模式开关：珊迪玻璃罩，后续接全局状态 */}
          <label className="flex items-center gap-2">
            <span className="text-muted-foreground">静心模式</span>
            <Switch disabled aria-label="静心模式（即将上线）" />
          </label>
        </nav>
      </div>
    </header>
  );
}
