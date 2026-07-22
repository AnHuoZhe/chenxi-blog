import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";

export default function PostsPage() {
  const posts = getAllPosts();

  return (
    <div className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="mb-2 text-3xl font-bold">天堂 · 我的感悟</h1>
      <p className="mb-8 text-muted-foreground">
        大狗大狗大狗…叫~ 这里是光明的主场。
      </p>
      <div className="flex flex-col gap-4">
        {posts.map((post) => (
          <Link key={post.slug} href={`/posts/${post.slug}`}>
            <Card className="transition-colors hover:border-amber-400/60">
              <CardHeader>
                <CardTitle>{post.title}</CardTitle>
                <CardDescription>{post.date}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">{post.excerpt}…</p>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
