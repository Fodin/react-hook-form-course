import { Link } from 'react-router-dom'

import { exercisesConfig } from '../exercises/exercisesConfig'
import { useLanguage, useProgress } from '../hooks'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'

import styles from './LevelSidebar.module.css'

interface LevelSidebarProps {
  currentLevel: string
}

export function LevelSidebar({ currentLevel }: LevelSidebarProps) {
  const { t } = useLanguage()
  const { getLevelProgress } = useProgress()

  return (
    <div>
      <nav className={styles.nav}>
        {exercisesConfig.map(level => {
          const totalTasks = level.tasks.length
          const isCompleted = totalTasks > 0 && getLevelProgress(level.levelId, totalTasks) === 100

          return (
            <Link
              key={level.levelId}
              to={`/task/${level.tasks[0]?.id ?? `${level.levelId}.1`}`}
              className={`
                ${styles.button}
                ${currentLevel === level.levelId ? styles.buttonActive : styles.buttonInactive}
              `}
            >
              {isCompleted && <span className={styles.checkmark}>✓</span>}
              <div className={styles.buttonTitle}>
                {t('nav.level')} {level.levelId}: {t(level.navKey)}
              </div>
              <div className={styles.buttonDescription}>{t(level.descKey)}</div>
            </Link>
          )
        })}
      </nav>

      <div className={styles.toggles}>
        <ThemeToggle />
        <LanguageToggle />
      </div>
    </div>
  )
}
