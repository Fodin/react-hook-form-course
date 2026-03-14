import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 4.5: Дата и время
// Task 4.5: Date and Time
// ============================================

// TODO: Определите интерфейс DateForm
// TODO: Define DateForm interface
// interface DateForm { ... }

// TODO: Инициализируйте useForm<DateForm>
// TODO: Initialize useForm<DateForm>
// const { register, handleSubmit } = useForm<DateForm>()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: DateForm) => { ... }

export function Task4_5() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.4.5')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
