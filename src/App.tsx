import { ThemeProvider, LanguageProvider, useLanguage } from './hooks'
import { ThemeToggle } from './components/ThemeToggle'
import { LanguageToggle } from './components/LanguageToggle'
import { useAppLevels } from './hooks/useAppLevels'
import { LevelSidebar } from './components/LevelSidebar'
import { ExerciseRenderer } from './components/ExerciseRenderer'
import styles from './App.module.css'

function AppContent() {
  const { currentLevel, levels, setCurrentLevel } = useAppLevels()
  const { t } = useLanguage()

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>{t('nav.title')}</h2>
        </div>
        <LevelSidebar 
          levels={levels}
          currentLevel={currentLevel}
          onLevelSelect={setCurrentLevel}
        />
      </aside>
      <main className={styles.main}>
        <ExerciseRenderer level={currentLevel} />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <AppContent />
      </LanguageProvider>
    </ThemeProvider>
  )
}
