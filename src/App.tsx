import { ThemeProvider, useAppLevels } from './hooks'
import { LevelSidebar, ExerciseRenderer } from './components'
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
