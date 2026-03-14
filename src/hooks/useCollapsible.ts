import { useState, useCallback } from 'react'

interface UseCollapsibleOptions {
  initialState?: boolean
}

/**
 * Хук для сворачиваемых блоков
 */
export function useCollapsible(options: UseCollapsibleOptions = {}) {
  const { initialState = true } = options
  const [isOpen, setIsOpen] = useState(initialState)

  const toggle = useCallback(() => {
    setIsOpen(prev => !prev)
  }, [])

  const open = useCallback(() => {
    setIsOpen(true)
  }, [])

  const close = useCallback(() => {
    setIsOpen(false)
  }, [])

  return { isOpen, toggle, open, close }
}
