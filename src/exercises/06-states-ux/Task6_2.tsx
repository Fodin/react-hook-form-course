import { useForm } from 'react-hook-form'
import { useState } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 6.2: Reset
// Task 6.2: Reset
// ============================================

// TODO: Определите интерфейс UserForm
// TODO: Define UserForm interface
// interface UserForm { ... }

// TODO: Определите объект defaultValues
// TODO: Define defaultValues object
// const defaultValues: UserForm = { ... }

// TODO: Инициализируйте useForm с defaultValues
// TODO: Initialize useForm with defaultValues
// const { register, handleSubmit, reset } = useForm<UserForm>({ defaultValues })

// TODO: Сохраните последние отправленные данные в состоянии
// TODO: Store last submitted data in state
// const [lastSubmitted, setLastSubmitted] = useState<UserForm | null>(null)

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: UserForm) => { ... }

// TODO: Создайте handleFill для заполнения тестовыми данными
// TODO: Create handleFill for filling with test data
// const handleFill = () => { ... }

export function Task6_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.6.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
