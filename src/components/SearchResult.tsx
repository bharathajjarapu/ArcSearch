import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Card } from "@/components/ui/card";

interface SearchResultProps {
  content: string;
}

export function SearchResult({ content }: SearchResultProps) {
  return (
    <Card className="p-6 mt-8 bg-secondary/50">
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
        className="prose prose-invert max-w-none space-y-4 leading-relaxed"
      >
        {content}
      </ReactMarkdown>
    </Card>
  );
}