import { ReactNode } from 'react'
import { CodeHighlight } from './CodeHighlight'

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
  return (
    <div style={{
      marginBottom: '2rem',
      padding: '1.5rem',
      background: '#fff',
      borderRadius: '12px',
      border: '2px solid #e9ecef',
      boxShadow: '0 2px 8px rgba(0,0,0,0.08)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginBottom: '1.25rem',
        paddingBottom: '1rem',
        borderBottom: '2px solid #f0f0f0'
      }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: '2.5rem',
          height: '2.5rem',
          padding: '0 0.75rem',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          color: '#fff',
          borderRadius: '8px',
          fontWeight: 700,
          fontSize: '1rem'
        }}>
          {taskNumber}
        </span>
        <h3 style={{
          margin: 0,
          fontSize: '1.25rem',
          fontWeight: 600,
          color: '#213547'
        }}>
          {title}
        </h3>
      </div>

      <div style={{ lineHeight: 1.7 }}>
        {children}
      </div>

      {footer && (
        <div style={{
          marginTop: '1.5rem',
          paddingTop: '1rem',
          borderTop: '1px dashed #e9ecef'
        }}>
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
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <h4 style={{
        margin: '0 0 0.75rem 0',
        fontSize: '0.95rem',
        fontWeight: 600,
        color: '#495057',
        textTransform: 'uppercase',
        letterSpacing: '0.5px'
      }}>
        ✅ Требования
      </h4>
      <ul style={{
        margin: 0,
        paddingLeft: '1.5rem',
        color: '#213547'
      }}>
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
  return (
    <div style={{
      padding: '1rem',
      background: 'linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%)',
      borderRadius: '8px',
      border: '1px solid #bae6fd',
      color: '#0c4a6e'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem',
        marginBottom: '0.5rem',
        fontWeight: 600,
        fontSize: '0.9rem'
      }}>
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
  return (
    <div style={{ marginBottom: '1rem' }}>
      {label && (
        <div style={{
          marginBottom: '0.5rem',
          fontSize: '0.85rem',
          fontWeight: 500,
          color: '#495057'
        }}>
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
  return (
    <div style={{ marginBottom: '1rem' }}>
      <h4 style={{
        margin: '0 0 0.5rem 0',
        fontSize: '0.9rem',
        fontWeight: 600,
        color: '#495057'
      }}>
        Интерфейс: <code style={{ background: '#e9ecef', padding: '0.2rem 0.4rem', borderRadius: '4px' }}>{name}</code>
      </h4>
      <CodeHighlight code={code} />
    </div>
  )
}
