import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 0.1: Первая форма
// Task 0.1: First Form
// ============================================

// TODO: Определите интерфейс LoginForm
// TODO: Define LoginForm interface
// interface LoginForm { ... }

export function Task0_1() {
  const { t } = useLanguage()

  // TODO: Инициализируйте useForm с типом LoginForm
  // TODO: Initialize useForm with LoginForm type
  // const { register, handleSubmit } = useForm<LoginForm>()

  // TODO: Создайте функцию onSubmit для обработки данных
  // TODO: Create onSubmit function to handle form data
  // const onSubmit = (data: LoginForm) => { ... }

  return (
    <div className="exercise-container">
      <h2>{t('task.0.1')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
