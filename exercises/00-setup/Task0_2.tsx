import { useForm } from 'react-hook-form'
import { useLanguage } from '../../src/hooks'
import { useState } from 'react';

// ============================================
// Задание 0.2: Вывод данных
// Task 0.2: Display Data
// ============================================

// TODO: Определите интерфейс LoginForm
// TODO: Define LoginForm interface
interface LoginForm {
  email: string
  password: string
}

export function Task0_2() {
  const { t } = useLanguage()

  const [formData, setFormData] = useState<LoginForm | null>(null)

  // TODO: Инициализируйте useForm<LoginForm>
  // TODO: Initialize useForm<LoginForm>
  const { register, handleSubmit } = useForm<LoginForm>()

  // TODO: Создайте функцию onSubmit
  // TODO: Create onSubmit function
  const onSubmit = (data: LoginForm) => {
    setFormData(data);
  }

  return (
    <div className="exercise-container">
      <h2>{t('task.0.2')}</h2>

      {/* TODO: Создайте форму ниже */}
      {/* TODO: Create form below */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="email">Email</label>
        <input {...register('email')}/>

        <label htmlFor="password">Password</label>
        <input type={'password'}{...register('password')}/>

        <button
          type={'submit'}
        >Submit</button>

      </form>

      {formData && <div style={{border: '1px solid black'}}>
        <div>{formData.email}</div>
        <div>{formData.password}</div>
      </div>
      }

    </div>
  )
}
