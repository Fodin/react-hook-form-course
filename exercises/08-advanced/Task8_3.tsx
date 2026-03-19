import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from 'src/hooks'

// ============================================
// Задание 8.3: FormContext
// Task 8.3: FormContext
// ============================================

// TODO: Определите интерфейс RegistrationForm
// TODO: Define RegistrationForm interface

// TODO: Создайте компонент PersonalStep
// TODO: Create PersonalStep component

// TODO: Создайте компонент ContactStep
// TODO: Create ContactStep component

// TODO: Инициализируйте useForm<RegistrationForm>
// TODO: Initialize useForm<RegistrationForm>

// TODO: Используйте useState для step
// TODO: Use useState for step

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function

export function Task8_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.8.3')}</h2>

      {/* TODO: Оберните форму в FormProvider */}
      {/* TODO: Wrap form in FormProvider */}
    </div>
  )
}
