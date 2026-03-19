import { useLanguage } from 'src/hooks'

// ============================================
// Задание 8.6: useFormState и тестирование
// Task 8.6: useFormState and Testing
// ============================================

// TODO: Создайте форму входа с изолированным SubmitButton
// TODO: Create a login form with an isolated SubmitButton
//
// 1. Создайте форму с полями email и password
// 1. Create a form with email and password fields
//
// 2. Вынесите кнопку submit в отдельный компонент SubmitButton
// 2. Extract submit button into a separate SubmitButton component
//
// 3. SubmitButton использует useFormState({ control }) для получения isSubmitting и isValid
// 3. SubmitButton uses useFormState({ control }) to get isSubmitting and isValid
//
// 4. Добавьте счётчик ререндеров в основную форму и в SubmitButton
// 4. Add render counter to main form and SubmitButton
//
// 5. Покажите что SubmitButton ререндерится только при изменении isValid/isSubmitting
// 5. Show that SubmitButton only rerenders on isValid/isSubmitting changes

export function Task8_6() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.8.6')}</h2>

      {/* TODO: Реализуйте форму здесь */}
      {/* TODO: Implement form here */}
    </div>
  )
}
