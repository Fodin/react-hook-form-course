import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'

import { ExerciseRenderer } from './components/ExerciseRenderer'
import { LevelSidebar } from './components/LevelSidebar'
import { ThemeProvider, LanguageProvider, ProgressProvider, useLanguage } from './hooks'
import { useAppLevels } from './hooks/useAppLevels'

import styles from './App.module.css'

function LevelPage() {
  const { levelId, taskId } = useParams<{ levelId: string; taskId?: string }>()
  const { levels } = useAppLevels()
  const { t } = useLanguage()

  // Проверка валидности levelId
  const isValidLevel = levels.some(level => level.id === levelId)
  if (!isValidLevel) {
    return <Navigate to="/level/0/0.1" replace />
  }

  // Если taskId не указан, редирект на первое задание
  if (!taskId) {
    const defaultTask = getDefaultTask(levelId || '0')
    return <Navigate to={`/level/${levelId}/${defaultTask}`} replace />
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>{t('nav.title')}</h2>
        </div>
        <LevelSidebar levels={levels} currentLevel={levelId || '0'} />
      </aside>
      <main className={styles.main}>
        <ExerciseRenderer level={levelId || '0'} />
      </main>
    </div>
  )
}

function getDefaultTask(levelId: string): string {
  return `${levelId}.1`
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/level/0/0.1" replace />} />
      <Route path="/level/:levelId" element={<LevelPage />} />
      <Route path="/level/:levelId/:taskId" element={<LevelPage />} />
      <Route path="*" element={<Navigate to="/level/0/0.1" replace />} />
    </Routes>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <ProgressProvider>
            <AppContent />
          </ProgressProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
