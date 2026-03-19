import { useCallback, useEffect, useRef, useState } from 'react'
import ReactMarkdown, { type Components } from 'react-markdown'
import rehypeHighlight from 'rehype-highlight'
import remarkGfm from 'remark-gfm'

import { useLanguage, useMarkdownLoader, useCollapsible } from '../hooks'

import styles from './TaskDescription.module.css'

interface TaskDescriptionProps {
  taskNumber: string
  level: string
}

function getStorageKey(taskNumber: string) {
  return `task-checklist-${taskNumber}`
}

function loadChecked(taskNumber: string): Record<number, boolean> {
  try {
    const raw = localStorage.getItem(getStorageKey(taskNumber))
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

function saveChecked(taskNumber: string, checked: Record<number, boolean>) {
  localStorage.setItem(getStorageKey(taskNumber), JSON.stringify(checked))
}

export function TaskDescription({ taskNumber, level }: TaskDescriptionProps) {
  const { t } = useLanguage()
  const { isOpen, toggle } = useCollapsible({ initialState: true })
  const [checked, setChecked] = useState(() => loadChecked(taskNumber))
  const indexRef = useRef(0)

  useEffect(() => {
    setChecked(loadChecked(taskNumber))
  }, [taskNumber])

  const handleToggle = useCallback(
    (index: number) => {
      setChecked(prev => {
        const next = { ...prev, [index]: !prev[index] }
        saveChecked(taskNumber, next)
        return next
      })
    },
    [taskNumber]
  )

  const components: Components = {
    input: ({ type, ...props }) => {
      if (type !== 'checkbox') return <input type={type} {...props} />
      const index = indexRef.current++
      return (
        <input
          type="checkbox"
          checked={checked[index]}
          onChange={() => handleToggle(index)}
          className={styles.checkbox}
        />
      )
    },
    li: ({ children, node, ...props }) => {
      const hasCheckbox = node?.children?.some(
        (child: unknown) =>
          typeof child === 'object' &&
          child !== null &&
          'tagName' in child &&
          (child as { tagName: string }).tagName === 'input' &&
          'properties' in child &&
          (child as { properties: { type?: string } }).properties?.type === 'checkbox'
      )
      if (hasCheckbox) {
        return (
          <li {...props}>
            <label className={styles.checkboxLabel}>{children}</label>
          </li>
        )
      }
      return <li {...props}>{children}</li>
    },
  }

  // Сбрасываем счётчик перед каждым рендером markdown
  indexRef.current = 0

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
      '3.6': '/src/exercises/03-schema-validation/task-3.6.md',
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
      '6.6': '/src/exercises/06-states-ux/task-6.6.md',
    },
    '7': {
      '7.1': '/src/exercises/07-async/task-7.1.md',
      '7.2': '/src/exercises/07-async/task-7.2.md',
      '7.3': '/src/exercises/07-async/task-7.3.md',
      '7.4': '/src/exercises/07-async/task-7.4.md',
      '7.5': '/src/exercises/07-async/task-7.5.md',
    },
    '8': {
      '8.1': '/src/exercises/08-advanced/task-8.1.md',
      '8.2': '/src/exercises/08-advanced/task-8.2.md',
      '8.3': '/src/exercises/08-advanced/task-8.3.md',
      '8.4': '/src/exercises/08-advanced/task-8.4.md',
      '8.5': '/src/exercises/08-advanced/task-8.5.md',
      '8.6': '/src/exercises/08-advanced/task-8.6.md',
    },
  }

  const path = paths[level]?.[taskNumber]
  const { content, loading } = useMarkdownLoader(path || '')

  if (!content || loading) {
    return null
  }

  return (
    <div className={styles.container}>
      <div className={styles.header} onClick={toggle}>
        <span className={styles.title}>
          {t('task.description')} {taskNumber}
        </span>
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
        </div>
      )}
    </div>
  )
}
