import { useTheme } from '../hooks/useTheme'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      title={`Переключить на ${theme === 'light' ? 'тёмную' : 'светлую'} тему`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '40px',
        padding: 0,
        background: theme === 'light' ? '#f6f8fa' : '#2d333b',
        border: '1px solid #d0d7de',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1.25rem',
        transition: 'all 0.2s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = theme === 'light' ? '#eaeef2' : '#3d444d'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = theme === 'light' ? '#f6f8fa' : '#2d333b'
      }}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  )
}
