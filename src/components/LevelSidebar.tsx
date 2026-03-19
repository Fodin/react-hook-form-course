import { Link } from 'react-router-dom'

import { exercisesConfigMap } from '../exercises/exercisesConfig'
import { useLanguage, useProgress } from '../hooks'
import { LanguageToggle } from './LanguageToggle'
import { ThemeToggle } from './ThemeToggle'
import type { TranslationKey } from '../translations'

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
  const { t } = useLanguage()
  const { getLevelProgress } = useProgress()

  return (
    <div>
      <nav className={styles.nav}>
        {levels.map(level => {
          const config = exercisesConfigMap.get(level.id)
          const totalTasks = config?.tasks.length ?? 0
          const isCompleted = totalTasks > 0 && getLevelProgress(level.id, totalTasks) === 100

          return (
            <Link
              key={level.id}
              to={`/level/${level.id}`}
              className={`
                ${styles.button}
                ${currentLevel === level.id ? styles.buttonActive : styles.buttonInactive}
              `}
            >
              {isCompleted && <span className={styles.checkmark}>✓</span>}
              <div className={styles.buttonTitle}>
                {t('nav.level')} {level.id}:{' '}
                {t(`nav.${level.name.toLowerCase()}` as TranslationKey) || level.name}
              </div>
              <div className={styles.buttonDescription}>
                {t(`level.${level.id}.desc` as TranslationKey)}
              </div>
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
