import { useTheme } from '../hooks/useTheme'

interface ScrollToTopProps {
  onClick?: () => void
}

export function ScrollToTop({ onClick }: ScrollToTopProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    onClick?.()
  }

  return (
    <button
      onClick={scrollToTop}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        padding: '0.5rem 1rem',
        background: isDark ? '#21262d' : '#f6f8fa',
        border: `1px solid ${isDark ? '#30363d' : '#d0d7de'}`,
        borderRadius: '8px',
        cursor: 'pointer',
        color: isDark ? '#e6edf3' : '#24292e',
        fontWeight: 500,
        fontSize: '0.9rem',
        marginTop: '1rem',
        transition: 'all 0.2s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = isDark ? '#30363d' : '#eaeef2'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isDark ? '#21262d' : '#f6f8fa'
      }}
    >
      <span>↑</span>
      <span>Наверх</span>
    </button>
  )
}
