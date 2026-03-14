import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { theoryContent } from '../data/theory'
import { useTheme } from '../hooks/useTheme'
import { ScrollToTop } from './ScrollToTop'

interface TheoryBlockProps {
  level: string
}

/**
 * Компонент для отображения теории из README.md
 */
export function TheoryBlock({ level }: TheoryBlockProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [content, setContent] = useState<string>('')
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    // Динамически импортируем README.md для уровня
    const paths: Record<string, string> = {
      '0': '/src/exercises/00-setup/README.md',
      '1': '/src/exercises/01-basic-form/README.md',
      '2': '/src/exercises/02-validation/README.md',
      '3': '/src/exercises/03-schema-validation/README.md',
      '4': '/src/exercises/04-complex-fields/README.md',
      '5': '/src/exercises/05-dynamic-forms/README.md',
      '6': '/src/exercises/06-states-ux/README.md',
      '7': '/src/exercises/07-async/README.md',
      '8': '/src/exercises/08-advanced/README.md',
    }

    const path = paths[level]
    
    if (path) {
      fetch(path)
        .then(res => res.text())
        .then(setContent)
        .catch(() => {
          setContent(theoryContent[level] || '')
        })
    } else {
      setContent(theoryContent[level] || '')
    }
  }, [level])

  const containerStyle: React.CSSProperties = {
    marginTop: '2rem',
    borderRadius: '8px',
    border: `1px solid ${isDark ? '#30363d' : '#d0d7de'}`,
  }

  const headerStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    background: isDark ? '#21262d' : '#f6f8fa',
    border: 'none',
    borderBottom: isOpen ? `1px solid ${isDark ? '#30363d' : '#d0d7de'}` : 'none',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    userSelect: 'none',
  }

  const contentStyle: React.CSSProperties = {
    padding: isOpen ? '1.5rem' : '0',
    background: isDark ? '#0d1117' : '#ffffff',
  }

  if (!content) {
    return null
  }

  return (
    <section style={containerStyle}>
      <div 
        style={headerStyle}
        onClick={() => setIsOpen(!isOpen)}
      >
        <h2 style={{ margin: 0, fontSize: '1.25rem', color: isDark ? '#e6edf3' : '#24292e' }}>
          📚 Теория
        </h2>
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
          <ScrollToTop />
        </div>
      )}
    </section>
  )
}
