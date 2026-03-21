import { useCallback, type ReactNode } from 'react'

import { useLocalStorage } from './useLocalStorage'
import { ProgressContext, type TaskProgress } from './useProgress'

const PROGRESS_KEY = 'rhf-course-progress'

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
