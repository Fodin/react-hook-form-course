import { ReactNode } from 'react'
import { useTheme } from '../hooks'
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
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`${styles.container} ${isDark ? styles.containerDark : styles.containerLight}`}>
      <div className={`${styles.header} ${isDark ? styles.headerDark : styles.headerLight}`}>
        <span className={styles.taskNumber}>
          {taskNumber}
        </span>
        <h3 className={`${styles.taskTitle} ${isDark ? styles.taskTitleDark : styles.taskTitleLight}`}>
          {title}
        </h3>
      </div>

      <div className={styles.content}>
        {children}
      </div>

      {footer && (
        <div className={`${styles.footer} ${isDark ? styles.footerDark : styles.footerLight}`}>
          {footer}
        </div>
      )}
    </div>
  )
}
