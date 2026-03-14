import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 7.3: Submit с Loading/Error
// ============================================

// TODO: Определите интерфейс ContactForm


// TODO: Инициализируйте useForm<ContactForm>


// TODO: Создайте состояния для error и success


// TODO: Создайте onSubmit функцию


export function Task7_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.7.3')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
