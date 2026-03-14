import { ThemeProvider } from './hooks/useTheme'
import { ThemeToggle } from './components/ThemeToggle'
import { useAppLevels } from './hooks/useAppLevels'
import { LevelSidebar } from './components/LevelSidebar'
import { ExerciseRenderer } from './components/ExerciseRenderer'
import styles from './App.module.css'

function AppContent() {
  const { currentLevel, levels, setCurrentLevel } = useAppLevels()

  return (
    <div className={styles.container}>
      <LevelSidebar 
        levels={levels}
        currentLevel={currentLevel}
        onLevelSelect={setCurrentLevel}
      />
      <main className={styles.main}>
        <ExerciseRenderer level={currentLevel} />
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  )
}
