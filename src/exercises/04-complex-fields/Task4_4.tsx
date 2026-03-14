import { useForm } from 'react-hook-form'
import { useLanguage } from '../../hooks/useLanguage'

// ============================================
// Задание 4.4: Загрузка файлов
// Task 4.4: File Upload
// ============================================

// TODO: Определите интерфейс AvatarForm
// TODO: Define AvatarForm interface
// interface AvatarForm { ... }

// TODO: Инициализируйте useForm<AvatarForm>
// TODO: Initialize useForm<AvatarForm>
// const { register, handleSubmit } = useForm<AvatarForm>()

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: AvatarForm) => { ... }

export function Task4_4() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.4.4')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
