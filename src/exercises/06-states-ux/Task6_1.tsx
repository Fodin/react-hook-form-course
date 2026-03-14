import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 6.1: Dirty / Touched
// Task 6.1: Dirty / Touched
// ============================================

// TODO: Определите интерфейс ProfileForm
// TODO: Define ProfileForm interface
// interface ProfileForm { ... }

// TODO: Инициализируйте useForm<ProfileForm>
// TODO: Initialize useForm<ProfileForm>
// const { register, handleSubmit, formState } = useForm<ProfileForm>()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: ProfileForm) => { ... }

export function Task6_1() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.6.1')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
