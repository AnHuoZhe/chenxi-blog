export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-4">
        {/* 比格犬巡逻区占位：后续接巡逻动画 + werwerwer 音效 */}
        <div className="flex items-center gap-3">
          <span className="text-3xl" role="img" aria-label="比格犬">
            🐶
          </span>
          <span className="text-sm text-muted-foreground">
            比格犬巡逻中… wer wer wer
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          © 2026 大狗叫博客 · 比格犬是房东
        </p>
      </div>
    </footer>
  );
}
