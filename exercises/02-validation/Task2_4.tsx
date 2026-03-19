import { useForm } from 'react-hook-form'
import { useLanguage } from 'src/hooks'

// ============================================
// Задание 2.4: Cross-field валидация
// Task 2.4: Cross-field Validation
// ============================================

// TODO: Определите интерфейс ChangePasswordForm
// TODO: Define ChangePasswordForm interface

// TODO: Инициализируйте useForm<ChangePasswordForm>
// TODO: Initialize useForm<ChangePasswordForm>

// TODO: Получите newPassword через watch для валидации confirmPassword
// TODO: Get newPassword via watch for confirmPassword validation

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function

export function Task2_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.2.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}
    </div>
  )
}
