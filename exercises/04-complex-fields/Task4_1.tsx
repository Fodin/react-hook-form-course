import { Controller, useForm } from 'react-hook-form'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 4.1: Controller
// Task 4.1: Controller
// ============================================

// TODO: Определите интерфейс CountryForm
// TODO: Define CountryForm interface
// interface CountryForm { ... }

// TODO: Создайте кастомный компонент Select
// TODO: Create custom Select component
// const Select = ({ value, onChange, options }) => { ... }

// TODO: Инициализируйте useForm<CountryForm>
// TODO: Initialize useForm<CountryForm>
// const { control, handleSubmit } = useForm<CountryForm>()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: CountryForm) => { ... }

export function Task4_1() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.4.1')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
