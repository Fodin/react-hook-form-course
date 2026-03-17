import { Link } from 'react-router-dom'
import { useLanguage } from '../hooks/useLanguage'
import { useTheme } from '../hooks/useTheme'
import { ThemeToggle } from './ThemeToggle'
import { LanguageToggle } from './LanguageToggle'
import styles from './LevelSidebar.module.css'

export interface LevelInfo {
  id: string
  name: string
  descriptionKey: string
}

interface LevelSidebarProps {
  levels: LevelInfo[]
  currentLevel: string
}

export function LevelSidebar({ levels, currentLevel }: LevelSidebarProps) {
  const { theme } = useTheme()
  const { language, t } = useLanguage()
  const isDark = theme === 'dark'

  return (
    <div>
      <nav className={styles.nav}>
        {levels.map((level) => (
          <Link
            key={level.id}
            to={`/level/${level.id}`}
            className={`
              ${styles.button}
              ${currentLevel === level.id
                ? (isDark ? styles.buttonActiveDark : styles.buttonActiveLight)
                : (isDark ? styles.buttonInactiveDark : styles.buttonInactiveLight)}
            `}
          >
            <div className={styles.buttonTitle}>
              {t(`nav.level`)} {level.id}: {t(`nav.${level.name.toLowerCase()}` as any) || level.name}
            </div>
            <div className={styles.buttonDescription}>
              {t(`level.${level.id}.desc` as any)}
            </div>
          </Link>
        ))}
      </nav>
      
      <div className={`${styles.toggles} ${isDark ? styles.togglesDark : styles.togglesLight}`}>
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </div>
  )
}
