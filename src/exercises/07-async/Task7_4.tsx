import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 7.4: Debounce
// Task 7.4: Debounce
// ============================================

// TODO: Определите интерфейс DraftForm
// TODO: Define DraftForm interface
// interface DraftForm { ... }

// TODO: Получите savedDraft из localStorage
// TODO: Get savedDraft from localStorage
// const savedDraft = localStorage.getItem('draft')

// TODO: Инициализируйте useForm<DraftForm> с defaultValues из localStorage
// TODO: Initialize useForm<DraftForm> with defaultValues from localStorage
// const { register, handleSubmit, watch } = useForm<DraftForm>({ defaultValues: savedDraft })

// TODO: Получите значения через watch
// TODO: Get values via watch
// const values = watch()

// TODO: Создайте состояния для статуса сохранения
// TODO: Create save status state
// const [saveStatus, setSaveStatus] = useState<'saving' | 'saved'>()

// TODO: Используйте useEffect с setTimeout для debounce
// TODO: Use useEffect with setTimeout for debounce
// useEffect(() => { const timer = setTimeout(() => { ... }, 500); return () => clearTimeout(timer) }, [values])

export function Task7_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.7.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
