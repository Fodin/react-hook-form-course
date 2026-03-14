import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 5.4: Wizard (multi-step форма)
// ============================================

// TODO: Определите интерфейс OrderForm


// TODO: Инициализируйте useForm<OrderForm>


// TODO: Используйте useState для step


// TODO: Создайте onNext для перехода с валидацией


// TODO: Создайте onBack для возврата


// TODO: Создайте onSubmit функцию


export function Task5_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.5.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
