import React from 'react'
import { useForm } from 'react-hook-form'

// ============================================
// Задание 2.1: Built-in валидация — Решение
// ============================================

interface RegistrationForm {
  username: string
  email: string
  age: number
  password: string
}

export function Task2_1_Solution() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegistrationForm>()

  const onSubmit = (data: RegistrationForm) => {
    console.log('Registered:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 2.1: Built-in валидация</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="username">Username *</label>
          <input
            id="username"
            type="text"
            {...register('username', {
              required: 'Username обязателен',
              minLength: { value: 3, message: 'Минимум 3 символа' },
              maxLength: { value: 20, message: 'Максимум 20 символов' },
            })}
          />
          {errors.username && <span className="error">{errors.username.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Email обязателен',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат email',
              },
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="age">Age *</label>
          <input
            id="age"
            type="number"
            {...register('age', {
              required: 'Возраст обязателен',
              min: { value: 18, message: 'Минимум 18 лет' },
              max: { value: 120, message: 'Максимум 120 лет' },
              valueAsNumber: true,
            })}
          />
          {errors.age && <span className="error">{errors.age.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Пароль обязателен',
              minLength: { value: 6, message: 'Минимум 6 символов' },
            })}
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 2.2: Pattern валидация — Решение
// ============================================

interface PatternForm {
  phone: string
  website: string
  hexColor: string
  slug: string
}

const patterns = {
  phone: /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/,
  url: /^https?:\/\/.+\..+$/,
  hex: /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/,
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
}

export function Task2_2_Solution() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PatternForm>()

  const onSubmit = (data: PatternForm) => {
    console.log('Patterns:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 2.2: Pattern валидация</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="phone">Телефон (+7 XXX XXX-XX-XX) *</label>
          <input
            id="phone"
            type="text"
            {...register('phone', {
              required: 'Телефон обязателен',
              pattern: {
                value: patterns.phone,
                message: 'Формат: +7 XXX XXX-XX-XX',
              },
            })}
            placeholder="+7 999 123-45-67"
          />
          {errors.phone && <span className="error">{errors.phone.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="website">Сайт (https://...) *</label>
          <input
            id="website"
            type="text"
            {...register('website', {
              required: 'Сайт обязателен',
              pattern: {
                value: patterns.url,
                message: 'Должен начинаться с http:// или https://',
              },
            })}
            placeholder="https://example.com"
          />
          {errors.website && <span className="error">{errors.website.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="hexColor">HEX цвет *</label>
          <input
            id="hexColor"
            type="text"
            {...register('hexColor', {
              required: 'Цвет обязателен',
              pattern: {
                value: patterns.hex,
                message: 'Формат: #FFF или #FFFFFF',
              },
            })}
            placeholder="#3498db"
          />
          {errors.hexColor && <span className="error">{errors.hexColor.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="slug">Slug *</label>
          <input
            id="slug"
            type="text"
            {...register('slug', {
              required: 'Slug обязателен',
              pattern: {
                value: patterns.slug,
                message: 'Только латиница, цифры и дефисы',
              },
            })}
            placeholder="my-awesome-page"
          />
          {errors.slug && <span className="error">{errors.slug.message}</span>}
        </div>

        <button type="submit">Проверить</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 2.3: Custom валидация — Решение
// ============================================

interface PasswordForm {
  password: string
}

export function Task2_3_Solution() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PasswordForm>()

  const onSubmit = (data: PasswordForm) => {
    console.log('Password valid:', data.password)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 2.3: Custom валидация пароля</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="password">Password *</label>
          <input
            id="password"
            type="password"
            {...register('password', {
              required: 'Пароль обязателен',
              validate: {
                minLength: v => v.length >= 8 || 'Минимум 8 символов',
                uppercase: v => /[A-Z]/.test(v) || 'Должна быть заглавная буква',
                number: v => /\d/.test(v) || 'Должна быть цифра',
                special: v => /[!@#$%^&*]/.test(v) || 'Должен быть специальный символ',
              },
            })}
          />
          {errors.password && (
            <div style={{ color: '#ff6b6b', fontSize: '0.875rem', marginTop: '0.25rem' }}>
              {typeof errors.password.message === 'string'
                ? errors.password.message
                : 'Ошибка валидации'}
            </div>
          )}
        </div>

        <button type="submit">Проверить пароль</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 2.4: Cross-field валидация — Решение
// ============================================

interface ChangePasswordForm {
  currentPassword: string
  newPassword: string
  confirmPassword: string
  email: string
}

export function Task2_4_Solution() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordForm>()

  const newPassword = watch('newPassword')
  const currentPassword = watch('currentPassword')

  const onSubmit = (data: ChangePasswordForm) => {
    console.log('Change password:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 2.4: Cross-field валидация</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="currentPassword">Текущий пароль *</label>
          <input
            id="currentPassword"
            type="password"
            {...register('currentPassword', {
              required: 'Обязательно',
              minLength: { value: 6, message: 'Минимум 6 символов' },
            })}
          />
          {errors.currentPassword && (
            <span className="error">{errors.currentPassword.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="newPassword">Новый пароль *</label>
          <input
            id="newPassword"
            type="password"
            {...register('newPassword', {
              required: 'Обязательно',
              minLength: { value: 8, message: 'Минимум 8 символов' },
            })}
          />
          {errors.newPassword && <span className="error">{errors.newPassword.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Подтверждение пароля *</label>
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword', {
              required: 'Обязательно',
              validate: {
                match: v => v === newPassword || 'Пароли не совпадают',
                different: v => v !== currentPassword || 'Новый пароль должен отличаться',
              },
            })}
          />
          {errors.confirmPassword && (
            <span className="error">{errors.confirmPassword.message}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email для уведомления *</label>
          <input
            id="email"
            type="email"
            {...register('email', {
              required: 'Обязательно',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Неверный формат email',
              },
            })}
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <button type="submit">Сменить пароль</button>
      </form>
    </div>
  )
}
