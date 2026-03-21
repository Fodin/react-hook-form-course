import { type ReactNode } from 'react'
import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'

import { ErrorBoundary } from './components/ErrorBoundary'
import { ExerciseRenderer } from './components/ExerciseRenderer'
import { LevelSidebar } from './components/LevelSidebar'
import { exercisesConfigMap } from './exercises/exercisesConfig'
import { ThemeProvider, LanguageProvider, ProgressProvider, useLanguage } from './hooks'

import styles from './App.module.css'

function getLevelFromTaskId(taskId: string): string {
  return taskId.split('.')[0]
}

function TaskPage() {
  const { taskId } = useParams<{ taskId: string }>()
  const { t } = useLanguage()

  const levelId = taskId ? getLevelFromTaskId(taskId) : '0'

  if (!exercisesConfigMap.has(levelId)) {
    return <Navigate to="/task/0.1" replace />
  }

  return (
    <div className={styles.container}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <h2 className={styles.sidebarTitle}>{t('nav.title')}</h2>
        </div>
        <LevelSidebar currentLevel={levelId} />
      </aside>
      <main className={styles.main}>
        <ErrorBoundary>
          <ExerciseRenderer level={levelId} />
        </ErrorBoundary>
      </main>
    </div>
  )
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/task/0.1" replace />} />
      <Route path="/task/:taskId" element={<TaskPage />} />
      {/* Обратная совместимость со старыми URL */}
      <Route path="/level/:levelId/:taskId" element={<OldUrlRedirect />} />
      <Route path="/level/:levelId" element={<OldLevelRedirect />} />
      <Route path="*" element={<Navigate to="/task/0.1" replace />} />
    </Routes>
  )
}

function OldUrlRedirect() {
  const { taskId } = useParams<{ taskId: string }>()
  return <Navigate to={`/task/${taskId}`} replace />
}

function OldLevelRedirect() {
  const { levelId } = useParams<{ levelId: string }>()
  return <Navigate to={`/task/${levelId}.1`} replace />
}

function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <ProgressProvider>{children}</ProgressProvider>
      </LanguageProvider>
    </ThemeProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppProviders>
        <AppContent />
      </AppProviders>
    </BrowserRouter>
  )
}
