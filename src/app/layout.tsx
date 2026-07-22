import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

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
        {/* 顶部导航栏（含静心模式开关占位） */}
        <SiteHeader />
        {/* 全屏天堂主内容区 */}
        <main className="flex-1">{children}</main>
        {/* 底部比格犬巡逻区 */}
        <SiteFooter />
      </body>
    </html>
  );
}
