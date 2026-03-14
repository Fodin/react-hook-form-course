import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 1.3: setValue и getValues
// Task 1.3: setValue and getValues
// ============================================

// TODO: Определите интерфейс ProductForm
// TODO: Define ProductForm interface
// interface ProductForm { ... }

// TODO: Инициализируйте useForm<ProductForm>
// TODO: Initialize useForm<ProductForm>
// const { register, handleSubmit, setValue, getValues } = useForm<ProductForm>()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: ProductForm) => { ... }

export function Task1_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.1.3')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
