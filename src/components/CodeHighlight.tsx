import { useMemo } from 'react'
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter'
import ts from 'react-syntax-highlighter/dist/esm/languages/hljs/typescript'

import { useTheme } from '../hooks'
import { githubLightStyle, githubDarkStyle } from '../styles'

import styles from './CodeHighlight.module.css'

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
export function CodeHighlight({
  code,
  language = 'typescript',
  inline = false,
}: CodeHighlightProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Мемоизируем рендеринг для производительности
  const highlightedCode = useMemo(() => {
    if (inline) {
      return (
        <code
          className={`
          ${styles.inlineCode}
          ${isDark ? styles.inlineCodeDark : styles.inlineCodeLight}
        `}
        >
          {code}
        </code>
      )
    }

    return (
      <SyntaxHighlighter
        language={language}
        style={isDark ? githubDarkStyle : githubLightStyle}
        className={`${styles.codeContainer} ${isDark ? styles.codeContainerDark : styles.codeContainerLight}`}
      >
        {code}
      </SyntaxHighlighter>
    )
  }, [code, language, inline, isDark])

  return highlightedCode
}
