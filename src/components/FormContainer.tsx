import { useEffect, useState, ReactNode, useRef } from 'react'
import { useTheme } from '../hooks/useTheme'

interface FormContainerProps {
  children: ReactNode
  taskFile: string
}

/**
 * Контейнер для формы ученика.
 * Автоматически обнаруживает форму и показывает/скрывает плейсхолдер.
 */
export function FormContainer({ children, taskFile }: FormContainerProps) {
  const { theme } = useTheme()
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

    // Проверяем сразу и периодически
    const timer = setTimeout(checkForForm, 100)
    const interval = setInterval(checkForForm, 500)

    return () => {
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [children])

  const placeholderStyle: React.CSSProperties = {
    marginTop: '2rem',
    padding: '2rem',
    background: isDark ? '#1c2128' : '#f0f9ff',
    borderRadius: '12px',
    border: `2px dashed ${isDark ? '#30363d' : '#646cff'}`,
    textAlign: 'center',
    color: isDark ? '#8b949e' : '#6c757d',
  }

  return (
    <div>
      {/* Контейнер с ref для обнаружения формы */}
      <div ref={containerRef}>
        {/* Дети рендерятся всегда */}
        {children}
        
        {/* Плейсхолдер показываем только если нет формы */}
        {!hasForm && (
          <div style={placeholderStyle}>
            <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✏️</div>
            <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
              Ваша форма появится здесь
            </div>
            <div style={{ fontSize: '0.9rem' }}>
              Откройте файл <code style={{ 
                background: isDark ? '#30363d' : '#eaeef2', 
                padding: '0.2rem 0.5rem', 
                borderRadius: '4px',
                fontWeight: 600
              }}>{taskFile}</code> и выполните задание
            </div>
          </div>
        )}
        
        {/* Сообщение об успехе показываем только если есть форма */}
        {hasForm && (
          <div style={{ 
            marginTop: '1rem', 
            padding: '1rem',
            background: isDark ? '#0c2d1b' : '#d4edda',
            borderRadius: '8px',
            border: `1px solid ${isDark ? '#1e5c3a' : '#c3e6cb'}`,
            fontWeight: 600,
            color: isDark ? '#7ee787' : '#155724',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}>
            <span>✅</span> Форма реализована!
          </div>
        )}
      </div>
    </div>
  )
}
