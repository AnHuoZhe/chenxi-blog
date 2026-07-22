import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function UnderworldPage() {
  const posts = getAllPosts("underworld");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#150826] via-[#0d0518] to-black">
      <div className="mx-auto max-w-2xl px-4 py-14">
        {/* 页头 */}
        <header className="mb-10 flex items-center gap-4">
          <img src="/images/hachimi-dragon-cut.png" alt="耄耋" className="h-14 w-14 object-contain drop-shadow-[0_0_8px_rgba(126,34,206,0.7)]" />
          <div>
            <h1 className="text-3xl font-black tracking-wide text-purple-300">
              冥界 · 我的感悟
            </h1>
            <p className="mt-1 text-sm text-purple-400/60">
              哈——老吴哦~ 黑暗领地，{posts.length} 篇。
            </p>
          </div>
        </header>

        {/* 文章卡片 */}
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <Link key={post.slug} href={`/underworld/${post.slug}`} className="group block">
              <article className="relative overflow-hidden rounded-xl border border-purple-500/15 bg-gradient-to-br from-[#1a0f2e] to-[#0d0718] p-5 pl-6 transition-all duration-300 hover:border-purple-400/50 hover:shadow-[0_0_30px_rgba(126,34,206,0.15)]">
                <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-purple-500/70 to-purple-800/20 opacity-40 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-lg font-bold text-zinc-200 transition-colors group-hover:text-purple-300">
                    {post.title}
                  </h2>
                  <time className="shrink-0 text-xs tracking-wider text-zinc-600">
                    {post.date}
                  </time>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {post.excerpt}…
                </p>
                <span className="mt-3 inline-block text-xs font-medium text-purple-400/0 transition-colors duration-300 group-hover:text-purple-400">
                  深入冥界 →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
