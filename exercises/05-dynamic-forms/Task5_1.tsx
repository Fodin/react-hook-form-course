import { useForm, useFieldArray } from 'react-hook-form'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 5.1: useFieldArray
// Task 5.1: useFieldArray
// ============================================

// TODO: Определите интерфейс EmailsForm
// TODO: Define EmailsForm interface
// interface EmailsForm { ... }

// TODO: Инициализируйте useForm с defaultValues
// TODO: Initialize useForm with defaultValues
// const { control, handleSubmit } = useForm<EmailsForm>({ defaultValues: { emails: [...] } })

// TODO: Инициализируйте useFieldArray
// TODO: Initialize useFieldArray
// const { fields, append, remove } = useFieldArray({ control, name: 'emails' })

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: EmailsForm) => { ... }

export function Task5_1() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.5.1')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
