import { useTheme } from '../hooks'
import { CodeHighlight } from './CodeHighlight'

import styles from './InterfaceDef.module.css'

interface InterfaceDefProps {
  name: string
  code: string
}

/**
 * Компонент для определения интерфейса TypeScript
 */
export function InterfaceDef({ name, code }: InterfaceDefProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <div className={styles.interfaceDef}>
      <h4
        className={`${styles.interfaceDefTitle} ${isDark ? styles.interfaceDefTitleDark : styles.interfaceDefTitleLight}`}
      >
        Интерфейс: <code>{name}</code>
      </h4>
      <CodeHighlight code={code} />
    </div>
  )
}
