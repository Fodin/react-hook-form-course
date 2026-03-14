import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks'

// ============================================
// Задание 0.2: Вывод данных
// Task 0.2: Display Data
// ============================================

// TODO: Определите интерфейс LoginForm
// TODO: Define LoginForm interface
// interface LoginForm { ... }

export function Task0_2() {
  const { t } = useLanguage()

  // TODO: Инициализируйте useForm<LoginForm>
  // TODO: Initialize useForm<LoginForm>
  // const { register, handleSubmit } = useForm<LoginForm>()

  // TODO: Создайте функцию onSubmit
  // TODO: Create onSubmit function
  // const onSubmit = (data: LoginForm) => { ... }

  return (
    <div className="exercise-container">
      <h2>{t('task.0.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
