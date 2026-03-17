import { ReactNode } from 'react'

import { useTheme } from '../hooks'

import styles from './Tip.module.css'

interface TipProps {
  children: ReactNode
}

/**
 * Компонент для подсказок
 */
export function Tip({ children }: TipProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={`${styles.tip} ${isDark ? styles.tipDark : styles.tipLight}`}>
      <div className={styles.tipHeader}>
        <span>💡</span>
        Подсказка
      </div>
      {children}
    </div>
  )
}
