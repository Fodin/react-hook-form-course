import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { useTheme, useLanguage, useMarkdownLoader, useCollapsible } from '../hooks'
import { ScrollToTop } from './ScrollToTop'
import styles from './TheoryBlock.module.css'

interface TheoryBlockProps {
  level: string
}

/**
 * Компонент для отображения теории из README.md
 */
export function TheoryBlock({ level }: TheoryBlockProps) {
  const { theme } = useTheme()
  const { language, t } = useLanguage()
  const isDark = theme === 'dark'
  const { isOpen, toggle } = useCollapsible({ initialState: true })

  const paths: Record<string, string> = {
    '0': '/src/exercises/00-setup/_internal/README.md',
    '1': '/src/exercises/01-basic-form/_internal/README.md',
    '2': '/src/exercises/02-validation/_internal/README.md',
    '3': '/src/exercises/03-schema-validation/_internal/README.md',
    '4': '/src/exercises/04-complex-fields/_internal/README.md',
    '5': '/src/exercises/05-dynamic-forms/_internal/README.md',
    '6': '/src/exercises/06-states-ux/_internal/README.md',
    '7': '/src/exercises/07-async/_internal/README.md',
    '8': '/src/exercises/08-advanced/_internal/README.md',
  }

  const { content, loading, error } = useMarkdownLoader(paths[level] || '')

  if (!content || loading) {
    return null
  }

  return (
    <section className={`${styles.container} ${isDark ? styles.containerDark : styles.containerLight}`}>
      <div
        className={`${styles.header} ${isDark ? styles.headerDark : styles.headerLight} ${isOpen ? (isDark ? styles.headerOpenDark : styles.headerOpenLight) : styles.headerClosed}`}
        onClick={toggle}
      >
        <h2 className={`${styles.title} ${isDark ? styles.titleDark : styles.titleLight}`}>
          {t('theory.title')}
        </h2>
        <span className={styles.icon}>
          {isOpen ? '🔼' : '🔽'}
        </span>
      </div>
      
      {isOpen && (
        <div className={`${styles.content} ${isDark ? styles.contentDark : styles.contentLight} theory-content`}>
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
