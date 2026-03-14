import { ReactNode } from 'react'
import { useTheme } from '../hooks'
import { CodeHighlight } from './CodeHighlight'
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
        <div className={`${styles.codeExampleLabel} ${isDark ? styles.codeExampleLabelDark : styles.codeExampleLabelLight}`}>
          {label}
        </div>
      )}
      <CodeHighlight code={code} />
    </div>
  )
}

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
      <h4 className={`${styles.interfaceDefTitle} ${isDark ? styles.interfaceDefTitleDark : styles.interfaceDefTitleLight}`}>
        Интерфейс: <code>{name}</code>
      </h4>
      <CodeHighlight code={code} />
    </div>
  )
}
