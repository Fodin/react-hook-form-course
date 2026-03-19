import { useCallback } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

interface UseExerciseNavigationOptions {
  levelId: string
  defaultTask: string
  validTasks: string[]
}

export function useExerciseNavigation({
  levelId,
  defaultTask,
  validTasks,
}: UseExerciseNavigationOptions) {
  const navigate = useNavigate()
  const { taskId } = useParams<{ taskId: string }>()

  const currentTask = taskId && validTasks.includes(taskId) ? taskId : defaultTask

  const changeTask = useCallback(
    (task: string) => {
      if (validTasks.includes(task)) {
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
