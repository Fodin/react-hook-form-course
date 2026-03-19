import { exercisesConfigMap } from '../exercises/exercisesConfig'

import { ExerciseLayout } from './ExerciseLayout'

interface ExerciseRendererProps {
  level: string
}

export function ExerciseRenderer({ level }: ExerciseRendererProps) {
  const config = exercisesConfigMap.get(level) ?? exercisesConfigMap.get('0')!

  return <ExerciseLayout config={config} />
}
