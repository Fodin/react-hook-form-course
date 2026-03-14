import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 8.4: localStorage Persistence
// ============================================

// TODO: Определите интерфейс EmailDraftForm


// TODO: Получите сохранённые данные из localStorage


// TODO: Инициализируйте useForm с defaultValues


// TODO: Создайте состояния для статуса сохранения


// TODO: Используйте useEffect для автосохранения


// TODO: Создайте onSubmit функцию


export function Task8_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.8.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
