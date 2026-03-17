import ReactMarkdown from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import { useTheme, useLanguage, useMarkdownLoader, useCollapsible } from '../hooks'

import styles from './TaskDescription.module.css'

interface TaskDescriptionProps {
  taskNumber: string
  level: string
}

/**
 * Компонент для отображения описания задания
 */
export function TaskDescription({ taskNumber, level }: TaskDescriptionProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const { isOpen, toggle } = useCollapsible({ initialState: true })

  const paths: Record<string, Record<string, string>> = {
    '0': {
      '0.1': '/src/exercises/00-setup/task-0.1.md',
      '0.2': '/src/exercises/00-setup/task-0.2.md',
    },
    '1': {
      '1.1': '/src/exercises/01-basic-form/task-1.1.md',
      '1.2': '/src/exercises/01-basic-form/task-1.2.md',
      '1.3': '/src/exercises/01-basic-form/task-1.3.md',
      '1.4': '/src/exercises/01-basic-form/task-1.4.md',
    },
    '2': {
      '2.1': '/src/exercises/02-validation/task-2.1.md',
      '2.2': '/src/exercises/02-validation/task-2.2.md',
      '2.3': '/src/exercises/02-validation/task-2.3.md',
      '2.4': '/src/exercises/02-validation/task-2.4.md',
    },
    '3': {
      '3.1': '/src/exercises/03-schema-validation/task-3.1.md',
      '3.2': '/src/exercises/03-schema-validation/task-3.2.md',
      '3.3': '/src/exercises/03-schema-validation/task-3.3.md',
      '3.4': '/src/exercises/03-schema-validation/task-3.4.md',
      '3.5': '/src/exercises/03-schema-validation/task-3.5.md',
    },
    '4': {
      '4.1': '/src/exercises/04-complex-fields/task-4.1.md',
      '4.2': '/src/exercises/04-complex-fields/task-4.2.md',
      '4.3': '/src/exercises/04-complex-fields/task-4.3.md',
      '4.4': '/src/exercises/04-complex-fields/task-4.4.md',
      '4.5': '/src/exercises/04-complex-fields/task-4.5.md',
    },
    '5': {
      '5.1': '/src/exercises/05-dynamic-forms/task-5.1.md',
      '5.2': '/src/exercises/05-dynamic-forms/task-5.2.md',
      '5.3': '/src/exercises/05-dynamic-forms/task-5.3.md',
      '5.4': '/src/exercises/05-dynamic-forms/task-5.4.md',
    },
    '6': {
      '6.1': '/src/exercises/06-states-ux/task-6.1.md',
      '6.2': '/src/exercises/06-states-ux/task-6.2.md',
      '6.3': '/src/exercises/06-states-ux/task-6.3.md',
      '6.4': '/src/exercises/06-states-ux/task-6.4.md',
      '6.5': '/src/exercises/06-states-ux/task-6.5.md',
    },
    '7': {
      '7.1': '/src/exercises/07-async/task-7.1.md',
      '7.2': '/src/exercises/07-async/task-7.2.md',
      '7.3': '/src/exercises/07-async/task-7.3.md',
      '7.4': '/src/exercises/07-async/task-7.4.md',
    },
    '8': {
      '8.1': '/src/exercises/08-advanced/task-8.1.md',
      '8.2': '/src/exercises/08-advanced/task-8.2.md',
      '8.3': '/src/exercises/08-advanced/task-8.3.md',
      '8.4': '/src/exercises/08-advanced/task-8.4.md',
      '8.5': '/src/exercises/08-advanced/task-8.5.md',
    },
  }

  const path = paths[level]?.[taskNumber]
  const { content, loading } = useMarkdownLoader(path || '')

  if (!content || loading) {
    return null
  }

  return (
    <div className={`${styles.container} ${isDark ? styles.containerDark : styles.containerLight}`}>
      <div
        className={`${styles.header} ${isDark ? styles.headerDark : styles.headerLight}`}
        onClick={toggle}
      >
        <span className={`${styles.title} ${isDark ? styles.titleDark : styles.titleLight}`}>
          {t('task.description')} {taskNumber}
        </span>
        <span className={styles.icon}>{isOpen ? '🔼' : '🔽'}</span>
      </div>

      {isOpen && (
        <div
          className={`${styles.content} ${isDark ? styles.contentDark : styles.contentLight} theory-content`}
        >
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}
