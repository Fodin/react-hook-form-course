import type { ReactNode } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import { useMarkdownLoader, useCollapsible } from '../hooks'

import styles from './CollapsibleMarkdown.module.css'

interface CollapsibleMarkdownProps {
  path: string
  title: string
  initialOpen?: boolean
  components?: Components
  children?: ReactNode
}

export function CollapsibleMarkdown({
  path,
  title,
  initialOpen = true,
  components,
  children,
}: CollapsibleMarkdownProps) {
  const { isOpen, toggle } = useCollapsible({ initialState: initialOpen })
  const { content, loading } = useMarkdownLoader(path)

  if (!content || loading) {
    return null
  }

  return (
    <section className={styles.container}>
      <div
        className={`${styles.header} ${isOpen ? styles.headerOpen : styles.headerClosed}`}
        onClick={toggle}
      >
        <span className={styles.title}>{title}</span>
        <span className={styles.icon}>{isOpen ? '🔼' : '🔽'}</span>
      </div>

      {isOpen && (
        <div className={`${styles.content} theory-content`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
            components={components}
          >
            {content}
          </ReactMarkdown>
          {children}
        </div>
      )}
    </section>
  )
}
