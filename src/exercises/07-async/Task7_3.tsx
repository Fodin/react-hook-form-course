import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 7.3: Submit loading
// Task 7.3: Submit Loading
// ============================================

// TODO: Определите интерфейс ContactForm
// TODO: Define ContactForm interface
// interface ContactForm { ... }

// TODO: Инициализируйте useForm<ContactForm>
// TODO: Initialize useForm<ContactForm>
// const { register, handleSubmit } = useForm<ContactForm>()

// TODO: Создайте состояния для error и success
// TODO: Create error and success states
// const [error, setError] = useState<string | null>(null)
// const [success, setSuccess] = useState(false)

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = async (data: ContactForm) => { ... }

export function Task7_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.7.3')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
