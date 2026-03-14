import { useForm, Controller } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 8.5: Финальный проект
// Task 8.5: Final Project
// ============================================

// TODO: Определите интерфейс RegistrationForm
// TODO: Define RegistrationForm interface
// interface RegistrationForm { ... }

// TODO: Инициализируйте useForm<RegistrationForm>
// TODO: Initialize useForm<RegistrationForm>
// const { register, handleSubmit, control, trigger } = useForm<RegistrationForm>()

// TODO: Используйте useState для step
// TODO: Use useState for step
// const [step, setStep] = useState(0)

// TODO: Создайте onNext с валидацией
// TODO: Create onNext with validation
// const onNext = async () => { const isValid = await trigger(); if (isValid) setStep(s => s + 1) }

// TODO: Создайте onBack
// TODO: Create onBack
// const onBack = () => setStep(s => s - 1)

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: RegistrationForm) => { ... }

export function Task8_5() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.8.5')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
