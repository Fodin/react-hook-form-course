import { ReactNode } from 'react'
import { useTheme } from '../hooks'
import styles from './Requirements.module.css'

interface RequirementProps {
  children: ReactNode
}

/**
 * Компонент для списка требований
 */
export function Requirements({ children }: RequirementProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={styles.requirements}>
      <h4 className={`${styles.requirementsTitle} ${isDark ? styles.requirementsTitleDark : styles.requirementsTitleLight}`}>
        ✅ Требования
      </h4>
      <ul className={`${styles.requirementsList} ${isDark ? styles.requirementsListDark : styles.requirementsListLight}`}>
        {children}
      </ul>
    </div>
  )
}
