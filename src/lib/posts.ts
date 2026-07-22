import fs from "fs";
import path from "path";
import matter from "gray-matter";

export type Realm = "heaven" | "underworld";

const DIRS: Record<Realm, string> = {
  heaven: path.join(process.cwd(), "content", "个体"),
  underworld: path.join(process.cwd(), "content", "我的感悟"),
};

export interface PostMeta {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
}

export interface Post extends PostMeta {
  content: string;
}

function stripMarkdown(md: string): string {
  return md
    .replace(/^---[\s\S]*?---/, "")
    .replace(/[#>*`\-\[\]()!|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function getAllPosts(realm: Realm): PostMeta[] {
  const dir = DIRS[realm];
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(dir, file);
      const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
      const stat = fs.statSync(fullPath);
      return {
        slug,
        title: data.title ?? slug,
        date: data.date
          ? String(data.date)
          : stat.mtime.toISOString().slice(0, 10),
        excerpt: stripMarkdown(content).slice(0, 200),
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getPost(realm: Realm, slug: string): Post | null {
  const fullPath = path.join(DIRS[realm], `${slug}.md`);
  if (!fs.existsSync(fullPath)) return null;
  const { data, content } = matter(fs.readFileSync(fullPath, "utf8"));
  const stat = fs.statSync(fullPath);
  return {
    slug,
    title: data.title ?? slug,
    date: data.date ? String(data.date) : stat.mtime.toISOString().slice(0, 10),
    excerpt: stripMarkdown(content).slice(0, 200),
    content,
  };
}
