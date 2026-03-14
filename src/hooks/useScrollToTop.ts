import { useCallback } from 'react'

interface UseScrollToTopOptions {
  behavior?: ScrollBehavior
}

/**
 * Хук для прокрутки к началу страницы
 */
export function useScrollToTop(options: UseScrollToTopOptions = {}) {
  const { behavior = 'smooth' } = options

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior,
    })
  }, [behavior])

  return scrollToTop
}
