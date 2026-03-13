import { useMemo } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'

// Регистрируем язык TypeScript
SyntaxHighlighter.registerLanguage('typescript', ts)

interface CodeHighlightProps {
  code: string
  language?: string
  inline?: boolean
}

/**
 * Компонент для подсветки синтаксиса кода
 */
export function CodeHighlight({ code, language = 'typescript', inline = false }: CodeHighlightProps) {
  // Мемоизируем рендеринг для производительности
  const highlightedCode = useMemo(() => {
    if (inline) {
      return (
        <code style={{
          background: '#f5f5f5',
          padding: '0.2em 0.4em',
          borderRadius: '4px',
          fontSize: '1.1em',
          fontWeight: 'bold',
          color: '#d63384'
        }}>
          {code}
        </code>
      )
    }

    return (
      <SyntaxHighlighter
        language={language}
        style={githubLightStyle}
        customStyle={{
          margin: 0,
          borderRadius: '8px',
          fontSize: '0.85rem',
          lineHeight: 1.6,
        }}
        showLineNumbers={false}
        wrapLines={true}
      >
        {code}
      </SyntaxHighlighter>
    )
  }, [code, language, inline])

  return highlightedCode
}

// Светлая тема в стиле GitHub
const githubLightStyle: { [key: string]: React.CSSProperties } = {
  'hljs': {
    display: 'block',
    overflowX: 'auto' as any,
    padding: '1rem',
    color: '#24292e',
    background: '#f6f8fa',
  },
  'hljs-comment': {
    color: '#22863a',
    fontStyle: 'italic',
  },
  'hljs-doctag': {
    color: '#d73a49',
  },
  'hljs-keyword': {
    color: '#d73a49',
    fontWeight: 'bold',
  },
  'hljs-built_in': {
    color: '#d73a49',
  },
  'hljs-type': {
    color: '#005cc5',
  },
  'hljs-literal': {
    color: '#005cc5',
  },
  'hljs-number': {
    color: '#005cc5',
  },
  'hljs-string': {
    color: '#032f62',
  },
  'hljs-regexp': {
    color: '#032f62',
  },
  'hljs-template-variable': {
    color: '#032f62',
  },
  'hljs-variable': {
    color: '#e36209',
  },
  'hljs-title': {
    color: '#6f42c1',
  },
  'hljs-params': {
    color: '#24292e',
  },
  'hljs-meta': {
    color: '#005cc5',
  },
  'hljs-meta-string': {
    color: '#032f62',
  },
  'hljs-section': {
    color: '#005cc5',
  },
  'hljs-selector-tag': {
    color: '#d73a49',
  },
  'hljs-selector-id': {
    color: '#005cc5',
  },
  'hljs-selector-class': {
    color: '#6f42c1',
  },
  'hljs-attr': {
    color: '#005cc5',
  },
  'hljs-attribute': {
    color: '#005cc5',
  },
  'hljs-symbol': {
    color: '#005cc5',
  },
  'hljs-bullet': {
    color: '#005cc5',
  },
  'hljs-addition': {
    color: '#22863a',
    background: '#f0fff4',
  },
  'hljs-deletion': {
    color: '#b31d28',
    background: '#ffeef0',
  },
  'hljs-link': {
    color: '#032f62',
    textDecoration: 'underline',
  },
}
