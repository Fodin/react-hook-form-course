import { useState, useEffect, useCallback } from 'react'

const PROGRESS_KEY = 'rhf-course-progress'

export interface TaskProgress {
  [levelId: string]: {
    [taskId: string]: boolean
  }
}

export function useProgress() {
  const [progress, setProgress] = useState<TaskProgress>({})

  // Загрузка прогресса из localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_KEY)
      if (saved) {
        setProgress(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Failed to load progress:', error)
    }
  }, [])

  // Сохранение прогресса в localStorage
  const saveProgress = useCallback((newProgress: TaskProgress) => {
    try {
      localStorage.setItem(PROGRESS_KEY, JSON.stringify(newProgress))
      setProgress(newProgress)
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }, [])

  // Отметить задание как выполненное
  const markTaskComplete = useCallback(
    (levelId: string, taskId: string) => {
      setProgress(prev => {
        const newProgress = {
          ...prev,
          [levelId]: {
            ...(prev[levelId] || {}),
            [taskId]: true,
          },
        }
        saveProgress(newProgress)
        return newProgress
      })
    },
    [saveProgress]
  )

  // Снять отметку с задания
  const markTaskIncomplete = useCallback(
    (levelId: string, taskId: string) => {
      setProgress(prev => {
        const newProgress = {
          ...prev,
          [levelId]: {
            ...(prev[levelId] || {}),
            [taskId]: false,
          },
        }
        saveProgress(newProgress)
        return newProgress
      })
    },
    [saveProgress]
  )

  // Переключить статус задания
  const toggleTask = useCallback(
    (levelId: string, taskId: string) => {
      const isComplete = progress[levelId]?.[taskId] || false
      if (isComplete) {
        markTaskIncomplete(levelId, taskId)
      } else {
        markTaskComplete(levelId, taskId)
      }
    },
    [progress, markTaskComplete, markTaskIncomplete]
  )

  // Проверить, выполнено ли задание
  const isTaskComplete = useCallback(
    (levelId: string, taskId: string) => {
      return progress[levelId]?.[taskId] || false
    },
    [progress]
  )

  // Получить процент выполнения уровня
  const getLevelProgress = useCallback(
    (levelId: string, totalTasks: number) => {
      const levelData = progress[levelId] || {}
      const completedCount = Object.values(levelData).filter(Boolean).length
      return totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0
    },
    [progress]
  )

  // Получить общий процент выполнения курса
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

  // Сбросить весь прогресс
  const resetProgress = useCallback(() => {
    localStorage.removeItem(PROGRESS_KEY)
    setProgress({})
  }, [])

  return {
    progress,
    markTaskComplete,
    markTaskIncomplete,
    toggleTask,
    isTaskComplete,
    getLevelProgress,
    getTotalProgress,
    resetProgress,
  }
}
