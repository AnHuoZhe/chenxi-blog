import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="relative mx-auto max-w-2xl px-4 py-14">
      {/* 页头 */}
      <header className="mb-10 flex items-center gap-4">
        <img src="/images/dagou-closed-cut.png" alt="大狗叫" className="h-14 w-14 object-contain" />
        <div>
          <h1 className="text-3xl font-black tracking-wide text-amber-300">
            天堂 · 我的感悟
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            大狗大狗大狗…叫~ 这里是光明的主场，{posts.length} 篇。
          </p>
        </div>
      </header>

      {/* 文章卡片 */}
      <div className="flex flex-col gap-5">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`} className="group block">
            <article className="relative overflow-hidden rounded-xl border border-amber-200/10 bg-gradient-to-br from-zinc-900 to-zinc-950 p-5 pl-6 transition-all duration-300 hover:border-amber-300/40 hover:shadow-[0_0_30px_rgba(252,211,77,0.12)]">
              {/* 左侧圣光条 */}
              <span className="absolute inset-y-0 left-0 w-1 bg-gradient-to-b from-amber-300/70 to-amber-500/20 opacity-40 transition-opacity duration-300 group-hover:opacity-100" />
              <div className="flex items-baseline justify-between gap-4">
                <h2 className="text-lg font-bold text-zinc-100 transition-colors group-hover:text-amber-200">
                  {post.title}
                </h2>
                <time className="shrink-0 text-xs tracking-wider text-zinc-500">
                  {post.date}
                </time>
              </div>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                {post.excerpt}…
              </p>
              <span className="mt-3 inline-block text-xs font-medium text-amber-400/0 transition-colors duration-300 group-hover:text-amber-400">
                进入阅读 →
              </span>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}
