import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 5.4: Wizard
// Task 5.4: Wizard
// ============================================

// TODO: Определите интерфейс OrderForm
// TODO: Define OrderForm interface
// interface OrderForm { ... }

// TODO: Инициализируйте useForm<OrderForm>
// TODO: Initialize useForm<OrderForm>
// const { register, handleSubmit, trigger } = useForm<OrderForm>()

// TODO: Используйте useState для step
// TODO: Use useState for step
// const [step, setStep] = useState(0)

// TODO: Создайте onNext для перехода с валидацией
// TODO: Create onNext for navigation with validation
// const onNext = async () => { const isValid = await trigger(); if (isValid) setStep(s => s + 1) }

// TODO: Создайте onBack для возврата
// TODO: Create onBack for going back
// const onBack = () => setStep(s => s - 1)

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: OrderForm) => { ... }

export function Task5_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.5.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
