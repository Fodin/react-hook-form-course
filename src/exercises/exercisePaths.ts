import { exercisesConfigMap } from './exercisesConfig'

export function getTaskPath(levelId: string, taskId: string): string {
  const config = exercisesConfigMap.get(levelId)
  if (!config) return ''
  return `/src/exercises/${config.folder}/task-${taskId}.md`
}

export function getTheoryPath(levelId: string): string {
  const config = exercisesConfigMap.get(levelId)
  if (!config) return ''
  return `/src/exercises/${config.folder}/README.md`
}
