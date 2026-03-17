import { useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import { useLanguage } from '../../src/hooks/useLanguage'

// ============================================
// Задание 7.2: Загрузка данных
// Task 7.2: Data Loading
// ============================================

// TODO: Определите интерфейс ProfileForm
// TODO: Define ProfileForm interface
// interface ProfileForm { ... }

// TODO: Определите объект mockUserData
// TODO: Define mockUserData object
// const mockUserData = { ... }

// TODO: Инициализируйте useForm<ProfileForm>
// TODO: Initialize useForm<ProfileForm>
// const { register, handleSubmit, reset } = useForm<ProfileForm>()

// TODO: Создайте состояние для загрузки
// TODO: Create loading state
// const [isLoading, setIsLoading] = useState(true)

// TODO: Загрузите данные в useEffect
// TODO: Load data in useEffect
// useEffect(() => { ... }, [])

// TODO: Создайте функцию onSubmit
// TODO: Create onSubmit function
// const onSubmit = (data: ProfileForm) => { ... }

export function Task7_2() {
  const { t } = useLanguage()

  return (
    <div className="exercise-container">
      <h2>{t('task.7.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}

    </div>
  )
}
