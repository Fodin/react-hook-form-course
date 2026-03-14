import { useForm } from 'react-hook-form'
import { useEffect } from 'react'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 8.2: Кастомные хуки
// Task 8.2: Custom Hooks
// ============================================

// TODO: Определите интерфейс DraftForm
// TODO: Define DraftForm interface
// interface DraftForm { ... }

// TODO: Создайте хук useFormPersist
// TODO: Create useFormPersist hook
// const useFormPersist = (name: string, { watch, setValue }) => { ... }

// TODO: Используйте useFormPersist хук
// TODO: Use useFormPersist hook
// useFormPersist('formName', { watch, setValue })

// TODO: Инициализируйте useForm с stored значениями
// TODO: Initialize useForm with stored values
// const { watch, setValue } = useForm<DraftForm>({ defaultValues: storedValues })

// TODO: Сохраняйте данные при изменении
// TODO: Save data on change
// useEffect(() => { ... }, [watch()])

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: DraftForm) => { ... }

export function Task8_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.8.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
