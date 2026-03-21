import { useCallback, useRef } from 'react'
import type { Components } from 'react-markdown'

import { getTaskPath } from '../exercises/exercisePaths'
import { useLanguage, useLocalStorage } from '../hooks'
import { CollapsibleMarkdown } from './CollapsibleMarkdown'

import styles from './TaskDescription.module.css'

interface TaskDescriptionProps {
  taskNumber: string
  level: string
}

export function TaskDescription({ taskNumber, level }: TaskDescriptionProps) {
  const { t } = useLanguage()
  const [checked, setChecked] = useLocalStorage<Record<number, boolean>>(
    `task-checklist-${taskNumber}`,
    {}
  )
  const indexRef = useRef(0)

  const handleToggle = useCallback(
    (index: number) => {
      setChecked(prev => ({ ...prev, [index]: !prev[index] }))
    },
    [setChecked]
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
      const hasCheckbox = node?.children?.some(child => {
        if (!child || child.type !== 'element') return false
        return child.tagName === 'input' && child.properties?.type === 'checkbox'
      })
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

  return (
    <CollapsibleMarkdown
      path={getTaskPath(level, taskNumber)}
      title={`${t('task.description')} ${taskNumber}`}
      components={components}
    />
  )
}
