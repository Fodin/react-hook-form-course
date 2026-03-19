import { ReactNode } from 'react'

import styles from './Tip.module.css'

interface TipProps {
  children: ReactNode
}

/**
 * Компонент для подсказок
 */
export function Tip({ children }: TipProps) {
  return (
    <div className={styles.tip}>
      <div className={styles.tipHeader}>
        <span>💡</span>
        Подсказка
      </div>
      {children}
    </div>
  )
}
