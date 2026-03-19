import { useForm } from 'react-hook-form'
import { useLanguage } from 'src/hooks'

// ============================================
// Задание 1.1: Форма регистрации
// Task 1.1: Registration Form
// ============================================

// TODO: Определите интерфейс RegistrationForm
// TODO: Define RegistrationForm interface

export function Task1_1() {
  const { t } = useLanguage()

  // TODO: Инициализируйте useForm<RegistrationForm>
  // TODO: Initialize useForm<RegistrationForm>

  // TODO: Создайте функцию onSubmit
  // TODO: Create onSubmit function

  return (
    <div className="exercise-container">
      <h2>{t('task.1.1')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}
    </div>
  )
}
