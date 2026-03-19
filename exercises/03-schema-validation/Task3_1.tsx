import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useLanguage } from 'src/hooks'

// ============================================
// Задание 3.1: Валидация с Zod
// Task 3.1: Zod Validation
// ============================================

// TODO: Создайте схему Zod
// TODO: Create Zod schema

// TODO: Выведите тип FormData из схемы
// TODO: Derive FormData type from schema

// TODO: Инициализируйте useForm с zodResolver
// TODO: Initialize useForm with zodResolver

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function

export function Task3_1() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.3.1')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}
    </div>
  )
}
