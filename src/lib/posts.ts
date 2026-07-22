import fs from "fs";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content", "我的感悟");

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

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".md"));
  return files
    .map((file) => {
      const slug = file.replace(/\.md$/, "");
      const fullPath = path.join(POSTS_DIR, file);
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

export function getPost(slug: string): Post | null {
  const fullPath = path.join(POSTS_DIR, `${slug}.md`);
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
