import { useTheme } from '../hooks'
import { CodeHighlight } from './CodeHighlight'

import styles from './CodeExample.module.css'

interface CodeExampleProps {
  code: string
  label?: string
}

/**
 * Компонент для примеров кода
 */
export function CodeExample({ code, label }: CodeExampleProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={styles.codeExample}>
      {label && (
        <div
          className={`${styles.codeExampleLabel} ${isDark ? styles.codeExampleLabelDark : styles.codeExampleLabelLight}`}
        >
          {label}
        </div>
      )}
      <CodeHighlight code={code} />
    </div>
  )
}
