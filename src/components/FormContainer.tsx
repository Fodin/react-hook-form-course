import { useEffect, useRef, useState } from 'react'

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
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [hasForm, setHasForm] = useState(false)
  const [formStats, setFormStats] = useState({ inputs: 0, buttons: 0, hasValidation: false })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const checkForForm = () => {
      const formElement = container.querySelector('form')
      const inputs = container.querySelectorAll('input, select, textarea')
      const buttons = container.querySelectorAll('button[type="submit"]')
      const requiredInputs = container.querySelectorAll(
        '[required], input[aria-required="true"]'
      )

      const found = !!formElement || inputs.length > 0
      setHasForm(found)

      if (found) {
        setFormStats({
          inputs: inputs.length,
          buttons: buttons.length,
          hasValidation:
            requiredInputs.length > 0 || !!container.querySelector('[aria-invalid]'),
        })
      }
    }

    checkForForm()

    const observer = new MutationObserver(checkForForm)
    observer.observe(container, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [children])

  return (
    <div ref={containerRef}>
      {children}

      {!hasForm && (
        <div className={styles.placeholder}>
          <div className={styles.placeholderIcon}>✏️</div>
          <div className={styles.placeholderTitle}>{t('task.placeholder')}</div>
          <div className={styles.placeholderText}>
            {t('task.openFile')} <code>{taskFile}</code> {t('task.andComplete')}
          </div>
        </div>
      )}

      {hasForm && (
        <div className={styles.successMessage}>
          <div className={styles.successHeader}>
            <span>✅</span> {t('task.formReady')}
          </div>
          <div className={styles.formStats}>
            <span title={t('task.stats.fields')}>
              📝 {formStats.inputs}{' '}
              {formStats.inputs === 1 ? t('task.stats.field') : t('task.stats.fields')}
            </span>
            {formStats.buttons > 0 && (
              <span title={t('task.stats.submitButton')}>
                🔘 {formStats.buttons}{' '}
                {formStats.buttons === 1 ? t('task.stats.button') : t('task.stats.buttons')}
              </span>
            )}
            {formStats.hasValidation && (
              <span title={t('task.stats.hasValidation')}>✓ {t('task.stats.validation')}</span>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
