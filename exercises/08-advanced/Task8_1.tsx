import { Controller, useForm } from 'react-hook-form'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 8.1: UI библиотека
// Task 8.1: UI Library
// ============================================

// TODO: Определите интерфейс LoginForm
// TODO: Define LoginForm interface
// interface LoginForm { ... }

// TODO: Создайте кастомный компонент TextField
// TODO: Create custom TextField component
// const TextField = ({ label, error, ...props }) => { ... }

// TODO: Создайте кастомный компонент Button
// TODO: Create custom Button component
// const Button = ({ children, loading, ...props }) => { ... }

// TODO: Инициализируйте useForm<LoginForm>
// TODO: Initialize useForm<LoginForm>
// const { control, handleSubmit } = useForm<LoginForm>()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: LoginForm) => { ... }

export function Task8_1() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.8.1')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
