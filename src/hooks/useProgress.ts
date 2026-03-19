import { useState, useEffect, useCallback, useContext, createContext } from 'react'
import type { ReactNode } from 'react'
import { createElement } from 'react'

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
  const [progress, setProgress] = useState<TaskProgress>(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY)
      return saved ? JSON.parse(saved) : {}
    } catch {
      return {}
    }
  })

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress))
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }, [progress])

  const toggleTask = useCallback((levelId: string, taskId: string) => {
    setProgress(prev => ({
      ...prev,
      [levelId]: {
        ...(prev[levelId] || {}),
        [taskId]: !prev[levelId]?.[taskId],
      },
    }))
  }, [])

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
  }, [])

  return createElement(
    ProgressContext.Provider,
    {
      value: {
        progress,
        toggleTask,
        isTaskComplete,
        getLevelProgress,
        getTotalProgress,
        resetProgress,
      },
    },
    children
  )
}

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider')
  }
  return context
}
