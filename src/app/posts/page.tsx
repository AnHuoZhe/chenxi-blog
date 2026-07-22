import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts("heaven");

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100/60 text-zinc-900">
      <div className="mx-auto max-w-2xl px-4 py-14">
        {/* 页头 */}
        <header className="mb-10 flex items-center gap-4">
          <img src="/images/dagou-closed-cut.png" alt="大狗叫" className="h-14 w-14 object-contain" />
          <div>
            <h1 className="text-3xl font-black tracking-wide text-amber-700">
              天堂 · 项目
            </h1>
            <p className="mt-1 text-sm text-amber-900/60">
              大狗大狗大狗…叫~ 光明主场，{posts.length} 个项目。
            </p>
          </div>
        </header>

        {/* 项目卡片 */}
        <div className="flex flex-col gap-5">
          {posts.map((post) => (
            <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
              <article className="relative overflow-hidden rounded-xl border border-amber-300/50 bg-white/80 p-5 pl-6 shadow-sm transition-all duration-300 hover:border-amber-400 hover:shadow-[0_8px_30px_rgba(217,119,6,0.15)]">
                <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-400 to-amber-200 opacity-50 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="flex items-baseline justify-between gap-4">
                  <h2 className="text-lg font-bold text-zinc-800 transition-colors group-hover:text-amber-700">
                    {post.title}
                  </h2>
                  <time className="shrink-0 text-xs tracking-wider text-zinc-400">
                    {post.date}
                  </time>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-500">
                  {post.excerpt}…
                </p>
                <span className="mt-3 inline-block text-xs font-medium text-amber-600/0 transition-colors duration-300 group-hover:text-amber-600">
                  进入阅读 →
                </span>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
