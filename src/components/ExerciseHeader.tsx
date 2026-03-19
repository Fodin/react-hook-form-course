import { LevelInfo } from './LevelSidebar'
import { useLanguage } from '../hooks'
import type { TranslationKey } from '../translations'

interface ExerciseHeaderProps {
  level: LevelInfo
}

export function ExerciseHeader({ level }: ExerciseHeaderProps) {
  const { t } = useLanguage()

  return (
    <header style={{ marginBottom: '2rem' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
        {t('nav.level')} {level.id}: {t(`nav.${level.name}` as TranslationKey)}
      </h1>
      <p style={{ color: 'var(--text-muted)' }}>{t(level.descriptionKey as TranslationKey)}</p>
    </header>
  )
}
