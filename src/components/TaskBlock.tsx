import { ReactNode } from 'react'

import styles from './TaskBlock.module.css'

interface TaskBlockProps {
  taskNumber: string
  title: string
  children: ReactNode
  footer?: ReactNode
}

/**
 * Компонент для отображения блока задания с требованиями
 */
export function TaskBlock({ taskNumber, title, children, footer }: TaskBlockProps) {
  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.taskNumber}>{taskNumber}</span>
        <h3 className={styles.taskTitle}>{title}</h3>
      </div>

      <div className={styles.content}>{children}</div>

      {footer && <div className={styles.footer}>{footer}</div>}
    </div>
  )
}
