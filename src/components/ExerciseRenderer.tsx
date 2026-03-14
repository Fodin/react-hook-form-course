import { SetupExercise } from '../exercises/00-setup/_internal/SetupExercise'
import { BasicFormExercise } from '../exercises/01-basic-form/_internal/BasicFormExercise'
import { ValidationExercise } from '../exercises/02-validation/_internal/ValidationExercise'
import { SchemaValidationExercise } from '../exercises/03-schema-validation/_internal/SchemaValidationExercise'
import { ComplexFieldsExercise } from '../exercises/04-complex-fields/_internal/ComplexFieldsExercise'
import { DynamicFormsExercise } from '../exercises/05-dynamic-forms/_internal/DynamicFormsExercise'
import { StatesUXExercise } from '../exercises/06-states-ux/_internal/StatesUXExercise'
import { AsyncExercise } from '../exercises/07-async/_internal/AsyncExercise'
import { AdvancedExercise } from '../exercises/08-advanced/_internal/AdvancedExercise'

interface ExerciseRendererProps {
  level: string
}

export function ExerciseRenderer({ level }: ExerciseRendererProps) {
  switch (level) {
    case '0':
      return <SetupExercise />
    case '1':
      return <BasicFormExercise />
    case '2':
      return <ValidationExercise />
    case '3':
      return <SchemaValidationExercise />
    case '4':
      return <ComplexFieldsExercise />
    case '5':
      return <DynamicFormsExercise />
    case '6':
      return <StatesUXExercise />
    case '7':
      return <AsyncExercise />
    case '8':
      return <AdvancedExercise />
    default:
      return <SetupExercise />
  }
}
