import { useTheme } from '../hooks'
import { ThemeToggle } from './ThemeToggle'
import styles from './LevelSidebar.module.css'

interface LevelInfo {
  id: string
  name: string
  description: string
}

interface LevelSidebarProps {
  levels: LevelInfo[]
  currentLevel: string
  onLevelSelect: (level: string) => void
}

export function LevelSidebar({ levels, currentLevel, onLevelSelect }: LevelSidebarProps) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <aside className={`${styles.sidebar} ${isDark ? styles.sidebarDark : styles.sidebarLight}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>📚 Уровни</h2>
        <ThemeToggle />
      </div>
      <nav className={styles.nav}>
        {levels.map((level) => (
          <button
            key={level.id}
            onClick={() => onLevelSelect(level.id)}
            className={`
              ${styles.button}
              ${currentLevel === level.id 
                ? (isDark ? styles.buttonActiveDark : styles.buttonActiveLight) 
                : (isDark ? styles.buttonInactiveDark : styles.buttonInactiveLight)}
            `}
          >
            <div className={styles.buttonTitle}>
              Уровень {level.id}: {level.name}
            </div>
            <div className={styles.buttonDescription}>
              {level.description}
            </div>
          </button>
        ))}
      </nav>
    </aside>
  )
}
