import {
  SetupExercise,
  BasicFormExercise,
  ValidationExercise,
  SchemaValidationExercise,
  ComplexFieldsExercise,
  DynamicFormsExercise,
  StatesUXExercise,
  AsyncExercise,
  AdvancedExercise
} from '../exercises'

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
