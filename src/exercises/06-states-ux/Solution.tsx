import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ============================================
// Задание 6.1: Dirty / Touched — Решение
// ============================================

export function Task6_1_Solution() {
  const { register, formState: { dirtyFields, touchedFields, isDirty } } = useForm<{ name: string; email: string }>()

  return (
    <div className="exercise-container">
      <h2>✅ Задание 6.1: Dirty / Touched States</h2>
      <form style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Имя</label>
          <input {...register('name')} />
          <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
            <span>
              Dirty: <span style={{ color: dirtyFields.name ? '#28a745' : '#dc3545' }}>{dirtyFields.name ? '✅' : '❌'}</span>
            </span>
            <span>
              Touched: <span style={{ color: touchedFields.name ? '#28a745' : '#6c757d' }}>{touchedFields.name ? '✅' : '❌'}</span>
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>Email</label>
          <input {...register('email')} />
          <div style={{ fontSize: '0.75rem', marginTop: '0.5rem', display: 'flex', gap: '1rem' }}>
            <span>
              Dirty: <span style={{ color: dirtyFields.email ? '#28a745' : '#dc3545' }}>{dirtyFields.email ? '✅' : '❌'}</span>
            </span>
            <span>
              Touched: <span style={{ color: touchedFields.email ? '#28a745' : '#6c757d' }}>{touchedFields.email ? '✅' : '❌'}</span>
            </span>
          </div>
        </div>

        <div style={{
          marginTop: '1rem',
          padding: '0.75rem',
          background: isDirty ? '#fff3cd' : '#d4edda',
          borderRadius: '4px',
          fontWeight: 500
        }}>
          Форма изменена: <span style={{ color: isDirty ? '#856404' : '#155724' }}>{isDirty ? 'Да' : 'Нет'}</span>
        </div>
      </form>
    </div>
  )
}

// ============================================
// Задание 6.2: Reset и default values — Решение
// ============================================

const userSchema = z.object({
  username: z.string().min(3, 'Минимум 3 символа'),
  email: z.string().email('Неверный email'),
  role: z.enum(['admin', 'user']),
})

type UserForm = z.infer<typeof userSchema>

export function Task6_2_Solution() {
  const { register, handleSubmit, reset, watch } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
    defaultValues: { username: '', email: '', role: 'user' },
  })

  const [lastSubmitted, setLastSubmitted] = useState<UserForm | null>(null)

  const onSubmit = (data: UserForm) => {
    setLastSubmitted(data)
    console.log('Submitted:', data)
  }

  const handleFill = () => {
    reset({ username: 'john_doe', email: 'john@example.com', role: 'admin' })
  }

  const handleReset = () => {
    reset()
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 6.2: Reset и Default Values</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Username</label>
          <input {...register('username')} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register('email')} />
        </div>

        <div className="form-group">
          <label>Role</label>
          <select {...register('role')}>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={handleFill} style={{ background: '#17a2b8', color: '#fff', border: 'none' }}>
            📝 Заполнить
          </button>
          <button type="button" onClick={handleReset}>
            🗑️ Сбросить
          </button>
        </div>

        {lastSubmitted && (
          <div style={{
            marginTop: '1rem',
            padding: '1rem',
            background: '#d4edda',
            borderRadius: '8px',
            border: '1px solid #c3e6cb'
          }}>
            <strong>Последняя отправка:</strong>
            <pre style={{ marginTop: '0.5rem', marginBottom: 0 }}>{JSON.stringify(lastSubmitted, null, 2)}</pre>
          </div>
        )}
      </form>
    </div>
  )
}

// ============================================
// Задание 6.3: Focus management — Решение
// ============================================

const focusSchema = z.object({
  email: z.string().email('Неверный email'),
  password: z.string().min(6, 'Минимум 6 символов'),
  confirm: z.string(),
}).refine((data) => data.password === data.confirm, {
  message: 'Пароли не совпадают',
  path: ['confirm'],
})

type FocusForm = z.infer<typeof focusSchema>

export function Task6_3_Solution() {
  const { register, handleSubmit, setError, formState: { errors } } = useForm<FocusForm>({
    resolver: zodResolver(focusSchema),
  })

  const onSubmit = (data: FocusForm) => {
    console.log('Submitted:', data)
  }

  useEffect(() => {
    const firstError = Object.keys(errors)[0] as keyof FocusForm
    if (firstError) {
      const element = document.getElementById(firstError)
      element?.focus()
    }
  }, [errors])

  return (
    <div className="exercise-container">
      <h2>✅ Задание 6.3: Focus Management</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" {...register('email')} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input id="password" type="password" {...register('password')} />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirm">Подтверждение пароля</label>
          <input id="confirm" type="password" {...register('confirm')} />
          {errors.confirm && <span className="error">{errors.confirm.message}</span>}
        </div>

        <button type="submit">Отправить</button>

        <p style={{ fontSize: '0.875rem', color: '#6c757d', marginTop: '1rem' }}>
          💡 При ошибке фокус автоматически переходит к первому полю с ошибкой
        </p>
      </form>
    </div>
  )
}

// ============================================
// Задание 6.4: Accessibility (ARIA) — Решение
// ============================================

const a11ySchema = z.object({
  username: z.string().min(3, 'Минимум 3 символа'),
  email: z.string().email('Неверный email'),
})

type A11yForm = z.infer<typeof a11ySchema>

export function Task6_4_Solution() {
  const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm<A11yForm>({
    resolver: zodResolver(a11ySchema),
  })

  const onSubmit = (data: A11yForm) => {
    console.log('Submitted:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 6.4: Accessibility (ARIA)</h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ maxWidth: '400px' }}
        aria-label="Форма регистрации"
        noValidate
      >
        {isSubmitted && Object.keys(errors).length > 0 && (
          <div
            role="alert"
            style={{
              padding: '1rem',
              background: '#f8d7da',
              borderRadius: '4px',
              marginBottom: '1rem',
              color: '#721c24'
            }}
          >
            <strong>Имеются ошибки в форме</strong>
          </div>
        )}

        <div className="form-group">
          <label htmlFor="a11y-username">Username</label>
          <input
            id="a11y-username"
            type="text"
            {...register('username')}
            aria-invalid={!!errors.username}
            aria-describedby={errors.username ? 'username-error' : undefined}
          />
          {errors.username && (
            <span id="username-error" className="error" role="alert">
              {errors.username.message}
            </span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="a11y-email">Email</label>
          <input
            id="a11y-email"
            type="email"
            {...register('email')}
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span id="email-error" className="error" role="alert">
              {errors.email.message}
            </span>
          )}
        </div>

        <button type="submit">Отправить</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 6.5: Performance — Решение
// ============================================

export function Task6_5_Solution() {
  const [renderCount, setRenderCount] = useState(0)
  const { register, watch } = useForm<{ text: string }>()
  const values = watch()

  useEffect(() => {
    setRenderCount((c) => c + 1)
  }, [values])

  return (
    <div className="exercise-container">
      <h2>✅ Задание 6.5: Performance Оптимизация</h2>
      <form style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Текст (следите за счётчиком рендеров)</label>
          <input {...register('text')} placeholder="Введите текст..." />
        </div>

        <div style={{
          padding: '1rem',
          background: '#17a2b8',
          color: '#fff',
          borderRadius: '8px',
          marginTop: '1rem',
          fontWeight: 600
        }}>
          🔄 Рендеров формы: {renderCount}
        </div>

        <p style={{ fontSize: '0.875rem', color: '#6c757d', marginTop: '1rem' }}>
          💡 Совет: используйте <code>useWatch</code> для подписки на отдельные поля
          вместо <code>watch()</code> для всех полей
        </p>
      </form>
    </div>
  )
}
