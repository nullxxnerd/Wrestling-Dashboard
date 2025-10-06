import { Card } from "@/components/ui/card";
import { Bot, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ChatMessage as ChatMessageType } from "../types";
import { formatTimestamp } from "../utils";
import { ReactNode } from "react";

interface ChatMessageProps {
  message: ChatMessageType;
}

interface MarkdownComponentProps {
  children?: ReactNode;
}

export function ChatMessage({ message }: ChatMessageProps) {
  if (message.role === "user") {
    // User messages on the right
    return (
      <div className="flex justify-end mb-3">
        <div className="flex gap-2 max-w-[80%] flex-row-reverse">
          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center">
            <User className="h-3 w-3 text-white" />
          </div>
          <Card className="p-2 bg-blue-50 border-blue-200">
            <p className="text-xs text-gray-800 whitespace-pre-wrap leading-relaxed">
              {message.content}
            </p>
            <div className="mt-1">
              <span className="text-[10px] text-gray-500">
                {formatTimestamp(message.timestamp)}
              </span>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  // Assistant messages on the left
  return (
    <div className="flex justify-start mb-3">
      <div className="flex gap-2 max-w-[80%]">
        <div className="flex-shrink-0 w-6 h-6 rounded-full bg-gray-500 flex items-center justify-center">
          <Bot className="h-3 w-3 text-white" />
        </div>
        <Card className="px-3 bg-gray-50 border-gray-200">
          <div className="text-gray-800 text-xs leading-relaxed [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                p: ({ children }: MarkdownComponentProps) => (
                  <p className="mb-2 last:mb-0 text-xs leading-relaxed">
                    {children}
                  </p>
                ),
                ul: ({ children }: MarkdownComponentProps) => (
                  <ul className="mb-2 last:mb-0 pr-4 list-disc list-inside space-y-1">
                    {children}
                  </ul>
                ),
                ol: ({ children }: MarkdownComponentProps) => (
                  <ol className="mb-2 last:mb-0 pr-4 list-decimal list-inside space-y-1">
                    {children}
                  </ol>
                ),
                li: ({ children }: MarkdownComponentProps) => (
                  <li className="text-xs leading-relaxed">{children}</li>
                ),
                h1: ({ children }: MarkdownComponentProps) => (
                  <h1 className="text-sm font-bold mb-2 mt-3 first:mt-0">
                    {children}
                  </h1>
                ),
                h2: ({ children }: MarkdownComponentProps) => (
                  <h2 className="text-xs font-semibold mb-2 mt-2 first:mt-0">
                    {children}
                  </h2>
                ),
                h3: ({ children }: MarkdownComponentProps) => (
                  <h3 className="text-xs font-medium mb-1 mt-2 first:mt-0">
                    {children}
                  </h3>
                ),
                code: ({ children }: MarkdownComponentProps) => (
                  <code className="bg-gray-200 px-1 py-0.5 rounded text-[10px] font-mono">
                    {children}
                  </code>
                ),
                pre: ({ children }: MarkdownComponentProps) => (
                  <pre className="bg-gray-100 border border-gray-200 p-2 rounded text-[10px] overflow-x-auto mb-2 font-mono">
                    {children}
                  </pre>
                ),
                blockquote: ({ children }: MarkdownComponentProps) => (
                  <blockquote className="border-r-2 border-gray-300 pr-3 mr-2 italic mb-2 text-gray-700">
                    {children}
                  </blockquote>
                ),
                strong: ({ children }: MarkdownComponentProps) => (
                  <strong className="font-semibold">{children}</strong>
                ),
                em: ({ children }: MarkdownComponentProps) => (
                  <em className="italic">{children}</em>
                ),
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
          <div className="mt-1">
            <span className="text-[10px] text-gray-500">
              {formatTimestamp(message.timestamp)}
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}
