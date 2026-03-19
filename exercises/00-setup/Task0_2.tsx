import { useLanguage } from 'src/hooks'

// ============================================
// Задание 0.2: Вывод данных
// Task 0.2: Display Data
// ============================================

// TODO: Определите интерфейс LoginForm
// TODO: Define LoginForm interface

// TODO: Создайте состояние для хранения отправленных данных (useState)
// TODO: Create state for storing submitted data (useState)

// TODO: Инициализируйте useForm<LoginForm>
// TODO: Initialize useForm<LoginForm>

// TODO: Создайте функцию onSubmit, которая сохраняет данные в state
// TODO: Create onSubmit function that saves data to state

export function Task0_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.0.2')}</h2>

      {/* TODO: Создайте форму с полями email и password */}
      {/* TODO: Create form with email and password fields */}

      {/* TODO: Отобразите отправленные данные под формой */}
      {/* TODO: Display submitted data below the form */}

      {/* TODO: Добавьте кнопку "Очистить" для сброса данных */}
      {/* TODO: Add "Clear" button to reset displayed data */}
    </div>
  )
}
