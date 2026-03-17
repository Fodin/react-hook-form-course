import { useForm } from 'react-hook-form'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 6.4: Accessibility
// Task 6.4: Accessibility
// ============================================

// TODO: Определите интерфейс LoginForm
// TODO: Define LoginForm interface
// interface LoginForm { ... }

// TODO: Инициализируйте useForm<LoginForm>
// TODO: Initialize useForm<LoginForm>
// const { register, handleSubmit, formState } = useForm<LoginForm>()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: LoginForm) => { ... }

export function Task6_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.6.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
