import { useState, useEffect, useCallback, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// ============================================
// Задание 7.1: Async валидация — Решение
// ============================================

const asyncSchema = z.object({
  email: z.string().email('Неверный формат'),
  username: z.string().min(3, 'Минимум 3 символа'),
})

type AsyncForm = z.infer<typeof asyncSchema>

// Имитация проверки на сервере
const checkUsername = async (username: string): Promise<boolean> => {
  await new Promise(r => setTimeout(r, 500))
  return !['admin', 'user', 'test'].includes(username.toLowerCase())
}

export function Task7_1_Solution() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm<AsyncForm>({
    resolver: zodResolver(asyncSchema),
    mode: 'onChange',
  })

  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)

  const validateUsername = useCallback(
    async (value: string) => {
      if (!value || value.length < 3) return true
      setChecking(true)
      const isAvailable = await checkUsername(value)
      setAvailable(isAvailable)
      setChecking(false)
      if (!isAvailable) {
        setError('username', { type: 'manual', message: 'Имя занято' })
        return false
      }
      clearErrors('username')
      return true
    },
    [setError, clearErrors]
  )

  const onSubmit = (data: AsyncForm) => {
    console.log('Submitted:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 7.1: Async Валидация</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Username *</label>
          <input
            {...register('username')}
            onBlur={e => validateUsername(e.target.value)}
            placeholder="Введите username"
          />
          {checking && (
            <span style={{ color: '#0d6efd', fontSize: '0.875rem' }}> ⏳ Проверка...</span>
          )}
          {available === true && (
            <span style={{ color: '#198754', fontSize: '0.875rem' }}> ✅ Доступно</span>
          )}
          {available === false && (
            <span style={{ color: '#dc3545', fontSize: '0.875rem' }}> ❌ Занято</span>
          )}
          {errors.username && <span className="error">{errors.username.message}</span>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input type="email" {...register('email')} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <button type="submit">Отправить</button>

        <p style={{ fontSize: '0.75rem', color: '#6c757d', marginTop: '1rem' }}>
          Попробуйте: admin, user, test (заняты) или любое другое (свободно)
        </p>
      </form>
    </div>
  )
}

// ============================================
// Задание 7.2: Загрузка данных — Решение
// ============================================

const userEditSchema = z.object({
  name: z.string().min(1, 'Обязательно'),
  email: z.string().email('Неверный email'),
  bio: z.string().optional(),
})

type UserEditForm = z.infer<typeof userEditSchema>

const mockFetchUser = async (id: number): Promise<UserEditForm> => {
  await new Promise(r => setTimeout(r, 800))
  return { name: 'John Doe', email: 'john@example.com', bio: 'Developer' }
}

export function Task7_2_Solution() {
  const [loading, setLoading] = useState(true)
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { isDirty },
  } = useForm<UserEditForm>({
    resolver: zodResolver(userEditSchema),
  })

  useEffect(() => {
    mockFetchUser(1).then(data => {
      reset(data)
      setLoading(false)
    })
  }, [reset])

  const onSubmit = (data: UserEditForm) => {
    console.log('Updated:', data)
  }

  if (loading) {
    return (
      <div className="exercise-container">
        <h2>✅ Задание 7.2: Загрузка Данных</h2>
        <div style={{ padding: '2rem', textAlign: 'center', color: '#6c757d' }}>
          ⏳ Загрузка данных...
        </div>
      </div>
    )
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 7.2: Загрузка Данных (Edit Mode)</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Name</label>
          <input {...register('name')} />
        </div>

        <div className="form-group">
          <label>Email</label>
          <input type="email" {...register('email')} />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea {...register('bio')} rows={3} />
        </div>

        <button type="submit" disabled={!isDirty} style={{ opacity: isDirty ? 1 : 0.6 }}>
          Сохранить {isDirty && '*'}
        </button>

        <p style={{ fontSize: '0.875rem', color: '#6c757d', marginTop: '1rem' }}>
          💡 Кнопка активна только при изменении данных
        </p>
      </form>
    </div>
  )
}

// ============================================
// Задание 7.3: Submit с loading/error — Решение
// ============================================

const contactSchema = z.object({
  name: z.string().min(1, 'Обязательно'),
  email: z.string().email('Неверный email'),
  message: z.string().min(10, 'Минимум 10 символов'),
})

type ContactForm = z.infer<typeof contactSchema>

export function Task7_3_Solution() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  })

  const onSubmit = async (data: ContactForm) => {
    setSubmitting(true)
    setError(null)
    try {
      // Имитация API с шансом на ошибку
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.8) {
            reject(new Error('Ошибка сети'))
          } else {
            resolve(data)
          }
        }, 1500)
      })
      setSuccess(true)
      reset()
      setTimeout(() => setSuccess(false), 3000)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Ошибка отправки')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 7.3: Submit с Loading/Error</h2>
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        {success && (
          <div
            style={{
              padding: '1rem',
              background: '#d1e7dd',
              borderRadius: '4px',
              marginBottom: '1rem',
              color: '#0f5132',
            }}
          >
            ✅ Отправлено успешно!
          </div>
        )}

        {error && (
          <div
            style={{
              padding: '1rem',
              background: '#f8d7da',
              borderRadius: '4px',
              marginBottom: '1rem',
              color: '#842029',
            }}
          >
            ❌ {error}
          </div>
        )}

        <div className="form-group">
          <label>Name *</label>
          <input {...register('name')} disabled={submitting} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input type="email" {...register('email')} disabled={submitting} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label>Message *</label>
          <textarea {...register('message')} rows={4} disabled={submitting} />
          {errors.message && <span className="error">{errors.message.message}</span>}
        </div>

        <button type="submit" disabled={submitting}>
          {submitting ? '⏳ Отправка...' : 'Отправить'}
        </button>
      </form>
    </div>
  )
}

// ============================================
// Задание 7.4: Debounce для автосохранения — Решение
// ============================================

export function Task7_4_Solution() {
  const [saved, setSaved] = useState(false)
  const { register, watch } = useForm<{ content: string }>({
    defaultValues: { content: '' },
  })

  const content = watch('content')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (content) {
        console.log('Auto-saved:', content)
        localStorage.setItem('draft-content', content)
        setSaved(true)
        setTimeout(() => setSaved(false), 2000)
      }
    }, 1000)
    return () => clearTimeout(timer)
  }, [content])

  return (
    <div className="exercise-container">
      <h2>✅ Задание 7.4: Debounce для Автосохранения</h2>
      <form style={{ maxWidth: '500px' }}>
        <div className="form-group">
          <label>Контент (автосохранение через 1 сек)</label>
          <textarea
            {...register('content')}
            rows={8}
            style={{ width: '100%' }}
            placeholder="Начните писать..."
          />
        </div>

        {saved && (
          <div style={{ color: '#198754', fontSize: '0.875rem', fontWeight: 500 }}>
            ✓ Сохранено в localStorage
          </div>
        )}

        <p style={{ fontSize: '0.875rem', color: '#6c757d', marginTop: '1rem' }}>
          💡 Откройте консоль разработчика, чтобы увидеть сообщения о сохранении
        </p>
      </form>
    </div>
  )
}

// ============================================
// Задание 7.5: Async defaultValues и isLoading — Решение
// ============================================

interface UserProfileForm {
  name: string
  email: string
  bio: string
}

const fetchUser = async (): Promise<UserProfileForm> => {
  await new Promise(r => setTimeout(r, 1500))
  return { name: 'John Doe', email: 'john@example.com', bio: 'Разработчик' }
}

export function Task7_5_Solution() {
  const [externalUser, setExternalUser] = useState<UserProfileForm | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
  } = useForm<UserProfileForm>({
    defaultValues: fetchUser,
    values: externalUser ?? undefined,
  })

  const onSubmit = (data: UserProfileForm) => {
    console.log('Updated:', data)
  }

  const handleRefresh = async () => {
    const user = await fetchUser()
    setExternalUser({ ...user, name: 'Jane Doe (обновлено)' })
  }

  if (isLoading) {
    return (
      <div className="exercise-container">
        <h2>✅ Задание 7.5: Async defaultValues</h2>
        <div style={{ padding: '2rem', textAlign: 'center' }}>
          <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⏳</div>
          <div style={{ color: '#6c757d' }}>Загрузка данных пользователя...</div>
        </div>
      </div>
    )
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 7.5: Async defaultValues</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label>Имя *</label>
          <input {...register('name', { required: 'Обязательно' })} />
          {errors.name && <span className="error">{errors.name.message}</span>}
        </div>

        <div className="form-group">
          <label>Email *</label>
          <input type="email" {...register('email', {
            required: 'Обязательно',
            pattern: { value: /^\S+@\S+$/, message: 'Неверный email' },
          })} />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>

        <div className="form-group">
          <label>О себе *</label>
          <textarea {...register('bio', { required: 'Обязательно' })} rows={4} style={{ width: '100%' }} />
          {errors.bio && <span className="error">{errors.bio.message}</span>}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit">Сохранить</button>
          <button type="button" onClick={handleRefresh} style={{ background: '#17a2b8', color: '#fff', border: 'none' }}>
            🔄 Обновить данные
          </button>
        </div>

        <p style={{ fontSize: '0.875rem', color: '#6c757d', marginTop: '1rem' }}>
          💡 Данные загружены через async defaultValues. Кнопка «Обновить» использует values для синхронизации.
        </p>
      </form>
    </div>
  )
}
