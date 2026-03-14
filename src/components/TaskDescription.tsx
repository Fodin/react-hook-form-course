import { useState, useEffect } from 'react'
import { useTheme } from '../hooks/useTheme'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'

interface TaskDescriptionProps {
  taskNumber: string
  level: string
}

export function TaskDescription({ taskNumber, level }: TaskDescriptionProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [isOpen, setIsOpen] = useState(true)
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    // Динамически импортируем markdown файл
    const paths: Record<string, Record<string, string>> = {
      '0': { '0.1': '/src/exercises/00-setup/task-0.1.md', '0.2': '/src/exercises/00-setup/task-0.2.md' },
      '1': { '1.1': '/src/exercises/01-basic-form/task-1.1.md', '1.2': '/src/exercises/01-basic-form/task-1.2.md', '1.3': '/src/exercises/01-basic-form/task-1.3.md', '1.4': '/src/exercises/01-basic-form/task-1.4.md' },
      '2': { '2.1': '/src/exercises/02-validation/task-2.1.md', '2.2': '/src/exercises/02-validation/task-2.2.md', '2.3': '/src/exercises/02-validation/task-2.3.md', '2.4': '/src/exercises/02-validation/task-2.4.md' },
      '3': { '3.1': '/src/exercises/03-schema-validation/task-3.1.md', '3.2': '/src/exercises/03-schema-validation/task-3.2.md', '3.3': '/src/exercises/03-schema-validation/task-3.3.md', '3.4': '/src/exercises/03-schema-validation/task-3.4.md', '3.5': '/src/exercises/03-schema-validation/task-3.5.md' },
      '4': { '4.1': '/src/exercises/04-complex-fields/task-4.1.md', '4.2': '/src/exercises/04-complex-fields/task-4.2.md', '4.3': '/src/exercises/04-complex-fields/task-4.3.md', '4.4': '/src/exercises/04-complex-fields/task-4.4.md', '4.5': '/src/exercises/04-complex-fields/task-4.5.md' },
      '5': { '5.1': '/src/exercises/05-dynamic-forms/task-5.1.md', '5.2': '/src/exercises/05-dynamic-forms/task-5.2.md', '5.3': '/src/exercises/05-dynamic-forms/task-5.3.md', '5.4': '/src/exercises/05-dynamic-forms/task-5.4.md' },
      '6': { '6.1': '/src/exercises/06-states-ux/task-6.1.md', '6.2': '/src/exercises/06-states-ux/task-6.2.md', '6.3': '/src/exercises/06-states-ux/task-6.3.md', '6.4': '/src/exercises/06-states-ux/task-6.4.md', '6.5': '/src/exercises/06-states-ux/task-6.5.md' },
      '7': { '7.1': '/src/exercises/07-async/task-7.1.md', '7.2': '/src/exercises/07-async/task-7.2.md', '7.3': '/src/exercises/07-async/task-7.3.md', '7.4': '/src/exercises/07-async/task-7.4.md' },
      '8': { '8.1': '/src/exercises/08-advanced/task-8.1.md', '8.2': '/src/exercises/08-advanced/task-8.2.md', '8.3': '/src/exercises/08-advanced/task-8.3.md', '8.4': '/src/exercises/08-advanced/task-8.4.md', '8.5': '/src/exercises/08-advanced/task-8.5.md' },
    }

    const path = paths[level]?.[taskNumber]
    
    if (path) {
      fetch(path)
        .then(res => res.text())
        .then(setContent)
        .catch(() => {
          setContent('# Описание задания\n\nЗагрузка...')
        })
    }
  }, [taskNumber, level])

  const containerStyle: React.CSSProperties = {
    marginTop: '1rem',
    borderRadius: '8px',
    border: `1px solid ${isDark ? '#30363d' : '#d0d7de'}`,
    overflow: 'hidden',
  }

  const headerStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    background: isDark ? '#21262d' : '#f6f8fa',
    border: 'none',
    borderBottom: `1px solid ${isDark ? '#30363d' : '#d0d7de'}`,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    userSelect: 'none',
  }

  const contentStyle: React.CSSProperties = {
    padding: isOpen ? '1rem' : '0',
    background: isDark ? '#0d1117' : '#ffffff',
    maxHeight: isOpen ? '1000px' : '0',
    overflow: 'auto',
    transition: 'all 0.3s ease',
  }

  const markdownStyles: React.CSSProperties = {
    listStylePosition: 'outside',
  }

  return (
    <div style={containerStyle}>
      <div 
        style={headerStyle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ fontWeight: 600, color: isDark ? '#e6edf3' : '#24292e' }}>
          📋 Описание задания {taskNumber}
        </span>
        <span style={{ fontSize: '1.25rem', transition: 'transform 0.3s' }}>
          {isOpen ? '🔼' : '🔽'}
        </span>
      </div>
      
      {isOpen && (
        <div style={contentStyle} className="theory-content">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[[rehypeHighlight, { detect: true, ignoreMissing: true }]]}
          >
            {content}
          </ReactMarkdown>
        </div>
      )}
    </div>
  )
}
