import { ReactNode } from 'react'

import styles from './Requirements.module.css'

interface RequirementProps {
  children: ReactNode
}

/**
 * Компонент для списка требований
 */
export function Requirements({ children }: RequirementProps) {
  return (
    <div className={styles.requirements}>
      <h4 className={styles.requirementsTitle}>✅ Требования</h4>
      <ul className={styles.requirementsList}>{children}</ul>
    </div>
  )
}
