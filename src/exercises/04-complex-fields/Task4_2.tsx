import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 4.2: Radio и Select
// Task 4.2: Radio and Select
// ============================================

// TODO: Определите интерфейс ProfileForm
// TODO: Define ProfileForm interface
// interface ProfileForm { ... }

// TODO: Инициализируйте useForm<ProfileForm>
// TODO: Initialize useForm<ProfileForm>
// const { register, handleSubmit } = useForm<ProfileForm>()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: ProfileForm) => { ... }

export function Task4_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.4.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
