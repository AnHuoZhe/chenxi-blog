import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/posts";
import { ArticleBody } from "@/components/ArticleBody";

export function generateStaticParams() {
  return getAllPosts("heaven").map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost("heaven", slug);
  if (!post) notFound();

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-amber-100/60 text-zinc-900">
      <article className="mx-auto max-w-2xl px-4 py-14">
        <Link
          href="/posts"
          className="text-sm text-zinc-400 transition-colors hover:text-amber-600"
        >
          ← 返回天堂
        </Link>

        <header className="mb-10 mt-6 border-b border-amber-300/40 pb-8">
          <div className="flex items-start justify-between gap-4">
            <h1 className="text-3xl font-black leading-snug text-amber-800">
              {post.title}
            </h1>
            <img src="/images/dagou-closed-cut.png" alt="大狗叫" className="h-12 w-12 object-contain" />
          </div>
          <time className="mt-3 block text-sm tracking-wider text-zinc-400">
            {post.date}
          </time>
        </header>

        <div className="article-prose-heaven">
          <ArticleBody content={post.content} />
        </div>

        <footer className="mt-14 border-t border-amber-300/40 pt-6 text-center text-xs text-zinc-400">
          晨汐 · 天堂区 · 比格犬已巡逻过本页
        </footer>
      </article>
    </div>
  );
}
