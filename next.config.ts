import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 静态导出到 out/，供 GitHub Pages 使用
  output: "export",
  // GitHub Pages 无服务端图片优化
  images: { unoptimized: true },
  // 自定义域名 chenxiblog.me 部署在根路径，无需 basePath
};

export default nextConfig;
