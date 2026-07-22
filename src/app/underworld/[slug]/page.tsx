import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/posts";
import { ArticleBody } from "@/components/ArticleBody";

export function generateStaticParams() {
  return getAllPosts("underworld").map((post) => ({ slug: post.slug }));
}

export default async function UnderworldPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("underworld", slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#150826] via-[#0d0518] to-black">
      <article className="mx-auto max-w-2xl px-4 py-14">
        <Link
          href="/underworld"
          className="text-sm text-zinc-600 transition-colors hover:text-purple-400"
        >
          ← 返回冥界
        </Link>

        <header className="mb-10 mt-6 border-b border-purple-500/15 pb-8">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-black leading-snug text-purple-200">
              {post.title}
            </h1>
            <img src="/images/hachimi-dragon-cut.png" alt="耄耋" className="h-12 w-12 object-contain drop-shadow-[0_0_8px_rgba(126,34,206,0.7)]" />
          </div>
          <time className="mt-3 block text-sm tracking-wider text-zinc-600">
            {post.date}
          </time>
        </header>

        {/* 正文：悬停段落触发冥界入侵 */}
        <div className="article-prose">
          <ArticleBody content={post.content} />
        </div>

        <footer className="mt-14 border-t border-purple-500/15 pt-6 text-center text-xs text-zinc-700">
          晨汐 · 冥界区 · 耄耋盯着你看呢
        </footer>
      </article>
    </div>
  );
}
