import { useCallback, useContext, createContext, type ReactNode } from 'react'

import { useLocalStorage } from './useLocalStorage'

const PROGRESS_KEY = 'rhf-course-progress'

export interface TaskProgress {
  [levelId: string]: {
    [taskId: string]: boolean
  }
}

interface ProgressContextValue {
  progress: TaskProgress
  toggleTask: (levelId: string, taskId: string) => void
  isTaskComplete: (levelId: string, taskId: string) => boolean
  getLevelProgress: (levelId: string, totalTasks: number) => number
  getTotalProgress: (levels: { id: string; tasks: number }[]) => number
  resetProgress: () => void
}

const ProgressContext = createContext<ProgressContextValue | null>(null)

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [progress, setProgress] = useLocalStorage<TaskProgress>(PROGRESS_KEY, {})

  const toggleTask = useCallback(
    (levelId: string, taskId: string) => {
      setProgress(prev => ({
        ...prev,
        [levelId]: {
          ...(prev[levelId] || {}),
          [taskId]: !prev[levelId]?.[taskId],
        },
      }))
    },
    [setProgress]
  )

  const isTaskComplete = useCallback(
    (levelId: string, taskId: string) => {
      return progress[levelId]?.[taskId] || false
    },
    [progress]
  )

  const getLevelProgress = useCallback(
    (levelId: string, totalTasks: number) => {
      const levelData = progress[levelId] || {}
      const completedCount = Object.values(levelData).filter(Boolean).length
      return totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0
    },
    [progress]
  )

  const getTotalProgress = useCallback(
    (levels: { id: string; tasks: number }[]) => {
      const totalTasks = levels.reduce((sum, level) => sum + level.tasks, 0)
      const completedTasks = levels.reduce((sum, level) => {
        const levelData = progress[level.id] || {}
        return sum + Object.values(levelData).filter(Boolean).length
      }, 0)
      return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    },
    [progress]
  )

  const resetProgress = useCallback(() => {
    setProgress({})
  }, [setProgress])

  return (
    <ProgressContext.Provider
      value={{
        progress,
        toggleTask,
        isTaskComplete,
        getLevelProgress,
        getTotalProgress,
        resetProgress,
      }}
    >
      {children}
    </ProgressContext.Provider>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider')
  }
  return context
}
