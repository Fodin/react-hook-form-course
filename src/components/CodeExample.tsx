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
  return (
    <div className={styles.codeExample}>
      {label && <div className={styles.codeExampleLabel}>{label}</div>}
      <CodeHighlight code={code} />
    </div>
  )
}
