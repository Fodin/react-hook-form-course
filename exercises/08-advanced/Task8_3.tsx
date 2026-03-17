import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 8.3: FormContext
// Task 8.3: FormContext
// ============================================

// TODO: Определите интерфейс RegistrationForm
// TODO: Define RegistrationForm interface
// interface RegistrationForm { ... }

// TODO: Создайте компонент PersonalStep
// TODO: Create PersonalStep component
// const PersonalStep = () => { const { register } = useFormContext(); ... }

// TODO: Создайте компонент ContactStep
// TODO: Create ContactStep component
// const ContactStep = () => { const { register } = useFormContext(); ... }

// TODO: Инициализируйте useForm<RegistrationForm>
// TODO: Initialize useForm<RegistrationForm>
// const methods = useForm<RegistrationForm>()

// TODO: Используйте useState для step
// TODO: Use useState for step
// const [step, setStep] = useState(0)

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: RegistrationForm) => { ... }

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
