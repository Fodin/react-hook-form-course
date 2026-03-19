import { SetupExercise } from '../exercises/00-setup'
import { BasicFormExercise } from '../exercises/01-basic-form'
import { ValidationExercise } from '../exercises/02-validation'
import { SchemaValidationExercise } from '../exercises/03-schema-validation'
import { ComplexFieldsExercise } from '../exercises/04-complex-fields'
import { DynamicFormsExercise } from '../exercises/05-dynamic-forms'
import { StatesUXExercise } from '../exercises/06-states-ux'
import { AsyncExercise } from '../exercises/07-async'
import { AdvancedExercise } from '../exercises/08-advanced'

interface ExerciseRendererProps {
  level: string
  taskId?: string
}

export function ExerciseRenderer({ level, taskId }: ExerciseRendererProps) {
  switch (level) {
    case '0':
      return <SetupExercise initialTask={taskId} />
    case '1':
      return <BasicFormExercise initialTask={taskId} />
    case '2':
      return <ValidationExercise initialTask={taskId} />
    case '3':
      return <SchemaValidationExercise initialTask={taskId} />
    case '4':
      return <ComplexFieldsExercise initialTask={taskId} />
    case '5':
      return <DynamicFormsExercise initialTask={taskId} />
    case '6':
      return <StatesUXExercise initialTask={taskId} />
    case '7':
      return <AsyncExercise initialTask={taskId} />
    case '8':
      return <AdvancedExercise initialTask={taskId} />
    default:
      return <SetupExercise initialTask={taskId} />
  }
}
