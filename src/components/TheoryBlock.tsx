import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import { useLanguage, useMarkdownLoader, useCollapsible } from '../hooks'
import { ScrollToTop } from './ScrollToTop'

import styles from './TheoryBlock.module.css'

interface TheoryBlockProps {
  level: string
}

/**
 * Компонент для отображения теории из README.md
 */
export function TheoryBlock({ level }: TheoryBlockProps) {
  const { t } = useLanguage()
  const { isOpen, toggle } = useCollapsible({ initialState: true })

  const paths: Record<string, string> = {
    '0': '/src/exercises/00-setup/README.md',
    '1': '/src/exercises/01-basic-form/README.md',
    '2': '/src/exercises/02-validation/README.md',
    '3': '/src/exercises/03-schema-validation/README.md',
    '4': '/src/exercises/04-complex-fields/README.md',
    '5': '/src/exercises/05-dynamic-forms/README.md',
    '6': '/src/exercises/06-states-ux/README.md',
    '7': '/src/exercises/07-async/README.md',
    '8': '/src/exercises/08-advanced/README.md',
  }

  const { content, loading } = useMarkdownLoader(paths[level] || '')

  if (!content || loading) {
    return null
  }

  return (
    <section className={styles.container}>
      <div
        className={`${styles.header} ${isOpen ? styles.headerOpen : styles.headerClosed}`}
        onClick={toggle}
      >
        <h2 className={styles.title}>{t('theory.title')}</h2>
        <span className={styles.icon}>{isOpen ? '🔼' : '🔽'}</span>
      </div>

      {isOpen && (
        <div className={`${styles.content} theory-content`}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
          >
            {content}
          </ReactMarkdown>
          <ScrollToTop />
        </div>
      )}
    </section>
  )
}
