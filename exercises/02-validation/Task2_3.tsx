import { useForm } from 'react-hook-form'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 2.3: Custom валидация
// Task 2.3: Custom Validation
// ============================================

// TODO: Определите интерфейс PasswordForm
// TODO: Define PasswordForm interface
// interface PasswordForm { ... }

// TODO: Инициализируйте useForm<PasswordForm>
// TODO: Initialize useForm<PasswordForm>
// const { register, handleSubmit } = useForm<PasswordForm>()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: PasswordForm) => { ... }

export function Task2_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.2.3')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
