import { createContext, useContext } from 'react'

export interface TaskProgress {
  [levelId: string]: {
    [taskId: string]: boolean
  }
}

export interface ProgressContextValue {
  progress: TaskProgress
  toggleTask: (levelId: string, taskId: string) => void
  isTaskComplete: (levelId: string, taskId: string) => boolean
  getLevelProgress: (levelId: string, totalTasks: number) => number
  getTotalProgress: (levels: { id: string; tasks: number }[]) => number
  resetProgress: () => void
}

export const ProgressContext = createContext<ProgressContextValue | null>(null)

export function useProgress() {
  const context = useContext(ProgressContext)
  if (!context) {
    throw new Error('useProgress must be used within ProgressProvider')
  }
  return context
}
