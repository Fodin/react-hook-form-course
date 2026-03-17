import { useForm } from 'react-hook-form'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 1.2: Watch в реальном времени
// Task 1.2: Real-time Watch
// ============================================

// TODO: Определите интерфейс LoginForm
// TODO: Define LoginForm interface
// interface LoginForm { ... }

// TODO: Инициализируйте useForm<LoginForm>
// TODO: Initialize useForm<LoginForm>
// const { register, handleSubmit, watch } = useForm<LoginForm>()

// TODO: Используйте watch для отслеживания значений
// TODO: Use watch to track values
// const watchedValues = watch()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: LoginForm) => { ... }

export function Task1_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.1.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
