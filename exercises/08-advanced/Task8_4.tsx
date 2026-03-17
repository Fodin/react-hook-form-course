import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 8.4: localStorage
// Task 8.4: localStorage
// ============================================

// TODO: Определите интерфейс EmailDraftForm
// TODO: Define EmailDraftForm interface
// interface EmailDraftForm { ... }

// TODO: Получите сохранённые данные из localStorage
// TODO: Get saved data from localStorage
// const savedData = localStorage.getItem('emailDraft')

// TODO: Инициализируйте useForm с defaultValues
// TODO: Initialize useForm with defaultValues
// const { register, handleSubmit, watch } = useForm<EmailDraftForm>({ defaultValues: savedData })

// TODO: Создайте состояния для статуса сохранения
// TODO: Create save status state
// const [saveStatus, setSaveStatus] = useState<'saving' | 'saved'>()

// TODO: Используйте useEffect для автосохранения
// TODO: Use useEffect for auto-save
// useEffect(() => { const timer = setTimeout(() => { ... }, 1000); return () => clearTimeout(timer) }, [watch()])

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: EmailDraftForm) => { ... }

export function Task8_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.8.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
