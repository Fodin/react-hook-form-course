import { useForm } from 'react-hook-form'
import { useLanguage } from 'src/hooks'

// ============================================
// Задание 1.4: formState
// Task 1.4: formState
// ============================================

// TODO: Определите интерфейс LoginForm
// TODO: Define LoginForm interface

// TODO: Инициализируйте useForm<LoginForm>
// TODO: Initialize useForm<LoginForm>

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function

export function Task1_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.1.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}
    </div>
  )
}
