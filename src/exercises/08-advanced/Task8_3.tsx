import { useForm, FormProvider, useFormContext } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 8.3: FormContext
// ============================================

// TODO: Определите интерфейс RegistrationForm


// TODO: Создайте компонент PersonalStep


// TODO: Создайте компонент ContactStep


// TODO: Инициализируйте useForm<RegistrationForm>


// TODO: Используйте useState для step


// TODO: Создайте onSubmit функцию


export function Task8_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.8.3')}</h2>

      {/* TODO: Оберните форму в FormProvider */}
      
    </div>
  )
}
