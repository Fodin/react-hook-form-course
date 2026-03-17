import { useForm } from 'react-hook-form'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 5.2: Условные поля
// Task 5.2: Conditional Fields
// ============================================

// TODO: Определите интерфейс ContactForm
// TODO: Define ContactForm interface
// interface ContactForm { ... }

// TODO: Инициализируйте useForm<ContactForm>
// TODO: Initialize useForm<ContactForm>
// const { register, handleSubmit, watch } = useForm<ContactForm>()

// TODO: Получите contactMethod через watch
// TODO: Get contactMethod via watch
// const contactMethod = watch('contactMethod')

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: ContactForm) => { ... }

export function Task5_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.5.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
