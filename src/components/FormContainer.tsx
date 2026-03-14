import { useEffect, useRef, useState } from 'react'
import { useTheme } from '../hooks'
import { useLanguage } from '../hooks'
import styles from './FormContainer.module.css'

interface FormContainerProps {
  children: React.ReactNode
  taskFile: string
}

/**
 * Контейнер для формы ученика.
 * Автоматически обнаруживает форму и показывает/скрывает плейсхолдер.
 */
export function FormContainer({ children, taskFile }: FormContainerProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasForm, setHasForm] = useState(false)

  useEffect(() => {
    const checkForForm = () => {
      if (containerRef.current) {
        const formElement = containerRef.current.querySelector('form')
        const inputs = containerRef.current.querySelectorAll('input, select, textarea')
        const found = !!formElement || inputs.length > 0
        setHasForm(found)
      }
    }

    const timer = setTimeout(checkForForm, 100)
    const interval = setInterval(checkForForm, 500)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [children])

  return (
    <div ref={containerRef}>
      {children}

      {!hasForm && (
        <div className={`${styles.placeholder} ${isDark ? styles.placeholderDark : styles.placeholderLight}`}>
          <div className={styles.placeholderIcon}>✏️</div>
          <div className={styles.placeholderTitle}>
            {t('task.placeholder')}
          </div>
          <div className={`${styles.placeholderText} ${isDark ? styles.placeholderTextDark : ''}`}>
            {t('task.openFile')} <code>{taskFile}</code> {t('task.andComplete')}
          </div>
        </div>
      )}

      {hasForm && (
        <div className={`${styles.successMessage} ${isDark ? styles.successMessageDark : styles.successMessageLight}`}>
          <span>✅</span> Форма реализована!
        </div>
      )}
    </div>
  )
}
