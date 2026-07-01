import * as React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { cn } from '@/lib/utils'

interface MarkdownProps {
  children: string
  className?: string
}

const Markdown = ({ children, className }: MarkdownProps) => {
  return (
    <div className={cn('prose prose-sm dark:prose-invert max-w-none', className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ children }) => <h1 className="mb-4 text-2xl font-bold">{children}</h1>,
          h2: ({ children }) => <h2 className="mb-3 text-xl font-semibold">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-2 text-lg font-medium">{children}</h3>,
          p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="mb-4 list-disc pl-6">{children}</ul>,
          ol: ({ children }) => <ol className="mb-4 list-decimal pl-6">{children}</ol>,
          li: ({ children }) => <li className="mb-1">{children}</li>,
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" className="text-primary underline hover:opacity-80">
              {children}
            </a>
          ),
          code: ({ children, className }) => {
            const isInline = !className
            return isInline ? (
              <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm">{children}</code>
            ) : (
              <pre className="mb-4 overflow-auto rounded-md border bg-muted p-4">
                <code className={className}>{children}</code>
              </pre>
            )
          },
          blockquote: ({ children }) => (
            <blockquote className="mb-4 border-l-4 border-primary pl-4 italic text-muted-foreground">{children}</blockquote>
          ),
          table: ({ children }) => (
            <table className="mb-4 w-full border-collapse">{children}</table>
          ),
          th: ({ children }) => <th className="border border-border px-4 py-2 text-left font-medium">{children}</th>,
          td: ({ children }) => <td className="border border-border px-4 py-2">{children}</td>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  )
}

export { Markdown }
