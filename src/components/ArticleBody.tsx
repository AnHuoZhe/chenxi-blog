"use client";

import ReactMarkdown from "react-markdown";
import { useInvasion } from "@/contexts/InvasionContext";

export function ArticleBody({ content }: { content: string }) {
  const { setInvading } = useInvasion();

  return (
    <ReactMarkdown
      components={{
        // 所有段落暂时都触发冥界入侵，后续只标记 dark_passages 段落
        p: ({ children }) => (
          <p
            className="group cursor-default"
            onMouseEnter={() => setInvading(true)}
            onMouseLeave={() => setInvading(false)}
          >
            {children}
          </p>
        ),
      }}
    >
      {content}
    </ReactMarkdown>
  );
}
