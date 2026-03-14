import { useEffect, useState } from 'react'

interface UseMarkdownLoaderOptions {
  fallback?: string
}

/**
 * Хук для загрузки markdown файлов
 */
export function useMarkdownLoader(path: string, options: UseMarkdownLoaderOptions = {}) {
  const { fallback = '' } = options
  const [content, setContent] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    const loadMarkdown = async () => {
      try {
        setLoading(true)
        const response = await fetch(path)
        
        if (!response.ok) {
          throw new Error(`Failed to load markdown: ${response.status}`)
        }
        
        const text = await response.text()
        
        if (mounted) {
          setContent(text)
          setError(null)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err.message : 'Unknown error')
          setContent(fallback)
        }
      } finally {
        if (mounted) {
          setLoading(false)
        }
      }
    }

    loadMarkdown()

    return () => {
      mounted = false
    }
  }, [path, fallback])

  return { content, loading, error }
}
