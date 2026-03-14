import { useForm } from 'react-hook-form'
import { useEffect, useRef } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 6.3: Focus management
// Task 6.3: Focus Management
// ============================================

// TODO: Определите интерфейс LoginForm
// TODO: Define LoginForm interface
// interface LoginForm { ... }

// TODO: Инициализируйте useForm<LoginForm>
// TODO: Initialize useForm<LoginForm>
// const { register, handleSubmit, formState } = useForm<LoginForm>()

// TODO: Создайте refs для полей
// TODO: Create refs for fields
// const emailRef = useRef<HTMLInputElement>(null)
// const passwordRef = useRef<HTMLInputElement>(null)

// TODO: Используйте useEffect для фокуса на первом ошибочном поле
// TODO: Use useEffect to focus on first error field
// useEffect(() => { if (formState.errors.email) emailRef.current?.focus() }, [formState.errors])

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: LoginForm) => { ... }

export function Task6_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.6.3')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
