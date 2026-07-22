import type { Metadata } from "next";
import "./globals.css";
import { ZenModeProvider } from "@/contexts/ZenModeContext";
import { SiteHeader } from "@/components/site-header";
import { MainShell } from "@/components/MainShell";
import { Beagle } from "@/components/Beagle";
import { DagouJiao } from "@/components/DagouJiao";
import { Hachimi } from "@/components/Hachimi";

export const metadata: Metadata = {
  title: "大狗叫博客",
  description: "三元抽象个人博客：比格犬守门，大狗叫镇天堂，哈基米守冥界。",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className="dark h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ZenModeProvider>
          {/* 顶部导航栏（静心模式开关） */}
          <SiteHeader />
          {/* 全屏天堂主内容区（珊迪玻璃罩） */}
          <MainShell>{children}</MainShell>
          {/* 三元角色：罩子外 */}
          <Beagle />
          <DagouJiao />
          <Hachimi />
        </ZenModeProvider>
      </body>
    </html>
  );
}
