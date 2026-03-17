import { useForm } from 'react-hook-form'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 5.3: Зависимые поля
// Task 5.3: Dependent Fields
// ============================================

// TODO: Определите интерфейс LocationForm
// TODO: Define LocationForm interface
// interface LocationForm { ... }

// TODO: Определите citiesByCountry объект
// TODO: Define citiesByCountry object
// const citiesByCountry = { ... }

// TODO: Инициализируйте useForm<LocationForm>
// TODO: Initialize useForm<LocationForm>
// const { register, handleSubmit, watch } = useForm<LocationForm>()

// TODO: Получите country через watch
// TODO: Get country via watch
// const country = watch('country')

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: LocationForm) => { ... }

export function Task5_3() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.5.3')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
