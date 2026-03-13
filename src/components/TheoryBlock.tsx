import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { theoryContent } from '../data/theory'

interface TheoryBlockProps {
  level: string
}

/**
 * Компонент для отображения теории из README.md
 */
export function TheoryBlock({ level }: TheoryBlockProps) {
  const [content, setContent] = useState<string>('')

  useEffect(() => {
    // Динамически импортируем README.md для уровня
    const levelNum = level.padStart(2, '0')
    
    // Маппинг уровней на пути
    const paths: Record<string, string> = {
      '0': '../exercises/00-setup/README.md',
      '1': '../exercises/01-basic-form/README.md',
      '2': '../exercises/02-validation/README.md',
      '3': '../exercises/03-schema-validation/README.md',
      '4': '../exercises/04-complex-fields/README.md',
      '5': '../exercises/05-dynamic-forms/README.md',
      '6': '../exercises/06-states-ux/README.md',
      '7': '../exercises/07-async/README.md',
      '8': '../exercises/08-advanced/README.md',
    }

    const path = paths[level]
    
    if (path) {
      // Используем fetch для загрузки markdown файла
      fetch(new URL(path, import.meta.url).href)
        .then(res => res.text())
        .then(setContent)
        .catch(() => {
          // Fallback на theoryContent
          setContent(theoryContent[level] || '')
        })
    } else {
      setContent(theoryContent[level] || '')
    }
  }, [level])

  if (!content) {
    return (
      <section style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>📚 Теория</h2>
        <p>Загрузка...</p>
      </section>
    )
  }

  return (
    <section style={{
      marginTop: '3rem',
      padding: '1.5rem',
      background: '#f8f9fa',
      borderRadius: '8px',
      border: '1px solid #e9ecef'
    }}>
      <h2 style={{ marginBottom: '1rem' }}>📚 Теория</h2>
      <div className="theory-content">
        <ReactMarkdown 
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeHighlight]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </section>
  )
}
