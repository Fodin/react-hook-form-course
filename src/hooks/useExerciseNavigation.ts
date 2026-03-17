import { useState, useEffect, useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface UseExerciseNavigationOptions {
  levelId: string
  defaultTask: string
  validTasks: string[]
}

/**
 * Хук для управления навигацией между заданиями уровня
 */
export function useExerciseNavigation({
  levelId,
  defaultTask,
  validTasks,
}: UseExerciseNavigationOptions) {
  const navigate = useNavigate()
  const { taskId } = useParams<{ taskId: string }>()

  const [currentTask, setCurrentTask] = useState<string>(
    taskId && validTasks.includes(taskId) ? taskId : defaultTask
  )

  // Синхронизация с URL
  useEffect(() => {
    if (taskId && validTasks.includes(taskId)) {
      setCurrentTask(taskId)
    } else if (taskId && !validTasks.includes(taskId)) {
      // Если taskId невалиден, редирект на дефолтное задание
      navigate(`/level/${levelId}/${defaultTask}`, { replace: true })
    }
  }, [taskId, validTasks, defaultTask, levelId, navigate])

  // Функция для изменения задания с обновлением URL
  const changeTask = useCallback(
    (task: string) => {
      if (validTasks.includes(task)) {
        setCurrentTask(task)
        navigate(`/level/${levelId}/${task}`)
      }
    },
    [levelId, validTasks, navigate]
  )

  return {
    currentTask,
    changeTask,
  }
}
