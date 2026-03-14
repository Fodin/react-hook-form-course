import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 2.2: Pattern валидация
// Task 2.2: Pattern Validation
// ============================================

// TODO: Определите интерфейс PatternForm
// TODO: Define PatternForm interface
// interface PatternForm { ... }

// TODO: Инициализируйте useForm<PatternForm>
// TODO: Initialize useForm<PatternForm>
// const { register, handleSubmit } = useForm<PatternForm>()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: PatternForm) => { ... }

export function Task2_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.2.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
