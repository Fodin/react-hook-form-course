import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 7.1: Async валидация
// Task 7.1: Async Validation
// ============================================

// TODO: Определите интерфейс RegistrationForm
// TODO: Define RegistrationForm interface
// interface RegistrationForm { ... }

// TODO: Определите массив busyUsernames
// TODO: Define busyUsernames array
// const busyUsernames = ['admin', 'user', 'test']

// TODO: Инициализируйте useForm<RegistrationForm>
// TODO: Initialize useForm<RegistrationForm>
// const { register, handleSubmit } = useForm<RegistrationForm>()

// TODO: Создайте состояние для статуса проверки
// TODO: Create state for validation status
// const [validationStatus, setValidationStatus] = useState<'checking' | 'available' | 'taken'>()

// TODO: Создайте async функцию validateUsername
// TODO: Create async validateUsername function
// const validateUsername = async (username: string) => { ... }

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: RegistrationForm) => { ... }

export function Task7_1() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.7.1')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
