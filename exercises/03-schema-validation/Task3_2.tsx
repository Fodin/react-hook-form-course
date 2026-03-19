import { useForm } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useLanguage } from 'src/hooks'

// ============================================
// Задание 3.2: Валидация с Yup
// Task 3.2: Yup Validation
// ============================================

// TODO: Создайте схему Yup
// TODO: Create Yup schema

// TODO: Выведите тип FormData из схемы
// TODO: Derive FormData type from schema

// TODO: Инициализируйте useForm с yupResolver
// TODO: Initialize useForm with yupResolver

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function

export function Task3_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.3.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
