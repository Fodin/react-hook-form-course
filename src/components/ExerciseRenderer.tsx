import { SetupExercise } from '../../exercises/00-setup/_internal/SetupExercise'
import { BasicFormExercise } from '../../exercises/01-basic-form/_internal/BasicFormExercise'
import { ValidationExercise } from '../../exercises/02-validation/_internal/ValidationExercise'
import { SchemaValidationExercise } from '../../exercises/03-schema-validation/_internal/SchemaValidationExercise'
import { ComplexFieldsExercise } from '../../exercises/04-complex-fields/_internal/ComplexFieldsExercise'
import { DynamicFormsExercise } from '../../exercises/05-dynamic-forms/_internal/DynamicFormsExercise'
import { StatesUXExercise } from '../../exercises/06-states-ux/_internal/StatesUXExercise'
import { AsyncExercise } from '../../exercises/07-async/_internal/AsyncExercise'
import { AdvancedExercise } from '../../exercises/08-advanced/_internal/AdvancedExercise'

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
