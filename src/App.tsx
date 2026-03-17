import { BrowserRouter, Routes, Route, Navigate, useParams } from 'react-router-dom'
import { ThemeProvider, LanguageProvider, useLanguage } from './hooks'
import { ThemeToggle } from './components/ThemeToggle'
import { LanguageToggle } from './components/LanguageToggle'
import { useAppLevels } from './hooks/useAppLevels'
import { LevelSidebar } from './components/LevelSidebar'
import { ExerciseRenderer } from './components/ExerciseRenderer'
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
        <LevelSidebar
          levels={levels}
          currentLevel={levelId || '0'}
        />
      </aside>
      <main className={styles.main}>
        <ExerciseRenderer level={levelId || '0'} taskId={taskId} />
      </main>
    </div>
  )
}

// Получить первое задание для уровня
function getDefaultTask(levelId: string): string {
  const defaultTasks: Record<string, string> = {
    '0': '0.1',
    '1': '1.1',
    '2': '2.1',
    '3': '3.1',
    '4': '4.1',
    '5': '5.1',
    '6': '6.1',
    '7': '7.1',
    '8': '8.1',
  }
  return defaultTasks[levelId] || '0.1'
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
          <AppContent />
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
