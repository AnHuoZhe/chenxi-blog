import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost } from "@/lib/posts";
import { ArticleBody } from "@/components/ArticleBody";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-3xl px-4 py-12">
      <Link
        href="/posts"
        className="text-sm text-muted-foreground hover:text-foreground"
      >
        ← 返回天堂
      </Link>
      <h1 className="mb-2 mt-4 text-3xl font-bold">{post.title}</h1>
      <p className="mb-8 text-sm text-muted-foreground">{post.date}</p>
      <div className="prose prose-invert max-w-none leading-7 [&_p]:my-4">
        <ArticleBody content={post.content} />
      </div>
    </article>
  );
}
