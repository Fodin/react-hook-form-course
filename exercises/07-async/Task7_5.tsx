import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 7.5: Async defaultValues и isLoading
// Task 7.5: Async defaultValues and isLoading
// ============================================

// TODO: Создайте форму редактирования пользователя с асинхронной загрузкой данных
// TODO: Create a user edit form with async data loading
//
// 1. Данные загружаются асинхронно через async defaultValues
// 1. Data loads asynchronously via async defaultValues
//
// 2. Пока данные загружаются — показывать скелетон/спиннер (используйте isLoading)
// 2. While loading — show skeleton/spinner (use isLoading)
//
// 3. Поля: name, email, bio (textarea)
// 3. Fields: name, email, bio (textarea)
//
// 4. Добавьте кнопку "Обновить данные" которая использует values для синхронизации
// 4. Add "Refresh data" button that uses values for synchronization
//
// 5. Валидация: все поля обязательные, email должен быть валидным
// 5. Validation: all fields required, email must be valid

export function Task7_5() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.7.5')}</h2>

      {/* TODO: Реализуйте форму здесь */}
      {/* TODO: Implement form here */}

    </div>
  )
}
