import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 7.4: Debounce для Автосохранения
// ============================================

// TODO: Определите интерфейс DraftForm


// TODO: Получите savedDraft из localStorage


// TODO: Инициализируйте useForm<DraftForm> с defaultValues из localStorage


// TODO: Получите значения через watch


// TODO: Создайте состояния для статуса сохранения


// TODO: Используйте useEffect с setTimeout для debounce


export function Task7_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.7.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      
    </div>
  )
}
