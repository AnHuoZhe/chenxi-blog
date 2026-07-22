import type { Metadata } from "next";
import "./globals.css";
import { ZenModeProvider } from "@/contexts/ZenModeContext";
import { InvasionProvider } from "@/contexts/InvasionContext";
import { AppChrome } from "@/components/AppChrome";

export const metadata: Metadata = {
  title: "晨汐",
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
          <InvasionProvider>
            <AppChrome>{children}</AppChrome>
          </InvasionProvider>
        </ZenModeProvider>
      </body>
    </html>
  );
}
