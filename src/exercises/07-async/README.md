# Уровень 7: Асинхронность — Async Validation, API, Debounce

## Введение

Реальные формы часто требуют работы с сервером: проверка доступности username, загрузка данных для редактирования, отправка формы с обработкой ошибок. В этом уровне вы изучите все аспекты асинхронной работы с формами.

---

## Часть 1: Async Валидация

### Базовая async валидация

```tsx
import { useForm } from 'react-hook-form'

const validateUsername = async (value: string) => {
  // Имитация запроса к серверу
  await new Promise(resolve => setTimeout(resolve, 500))
  
  // Проверка доступности
  const takenUsernames = ['admin', 'user', 'test']
  if (takenUsernames.includes(value.toLowerCase())) {
    return 'Имя пользователя занято'
  }
  
  return true
}

function RegistrationForm() {
  const { register, handleSubmit } = useForm()

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input
        {...register('username', {
          required: 'Обязательно',
          validate: validateUsername,
        })}
      />
      <button type="submit">Зарегистрироваться</button>
    </form>
  )
}
```

### Async валидация с onBlur

```tsx
function AsyncValidationForm() {
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm()

  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)

  const validateUsername = async (value: string) => {
    if (!value || value.length < 3) return true
    
    setChecking(true)
    
    try {
      const response = await fetch(`/api/check-username?username=${value}`)
      const { available } = await response.json()
      
      setAvailable(available)
      
      if (!available) {
        setError('username', {
          type: 'manual',
          message: 'Имя пользователя занято',
        })
        return false
      }
      
      clearErrors('username')
      return true
    } catch (error) {
      return 'Ошибка проверки'
    } finally {
      setChecking(false)
    }
  }

  return (
    <form>
      <input
        {...register('username')}
        onBlur={(e) => validateUsername(e.target.value)}
      />
      
      {checking && <span>⏳ Проверка...</span>}
      {available === true && <span>✅ Доступно</span>}
      {available === false && <span>❌ Занято</span>}
      
      {errors.username && (
        <span className="error">{errors.username.message}</span>
      )}
    </form>
  )
}
```

### С использованием Zod

```tsx
import { z } from 'zod'

const schema = z.object({
  username: z.string().min(3, 'Минимум 3 символа'),
})

// Async валидация через refine
const schemaWithAsync = schema.refine(
  async (data) => {
    const response = await fetch(`/api/check-username?username=${data.username}`)
    const { available } = await response.json()
    return available
  },
  {
    message: 'Имя пользователя занято',
    path: ['username'],
  }
)

// Использование
const { register, handleSubmit } = useForm({
  resolver: zodResolver(schemaWithAsync),
  mode: 'onChange',
})
```

---

## Часть 2: Загрузка данных (Edit Mode)

### Базовая загрузка данных

```tsx
function EditForm() {
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Загрузка данных пользователя
    fetch('/api/user/1')
      .then(res => res.json())
      .then(data => {
        reset(data)  // Заполнение формы
        setLoading(false)
      })
  }, [reset])

  if (loading) {
    return <div>Загрузка...</div>
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <input {...register('email')} />
      
      <button type="submit" disabled={!isDirty}>
        Сохранить {isDirty && '*'}
      </button>
    </form>
  )
}
```

### С обработкой ошибок

```tsx
function EditFormWithErrorHandling() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  
  const { register, handleSubmit, reset } = useForm()

  useEffect(() => {
    const loadUser = async () => {
      try {
        const response = await fetch('/api/user/1')
        if (!response.ok) throw new Error('Не удалось загрузить данные')
        
        const data = await response.json()
        reset(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка')
      } finally {
        setLoading(false)
      }
    }

    loadUser()
  }, [reset])

  if (loading) return <div>⏳ Загрузка...</div>
  if (error) return <div style={{ color: 'red' }}>❌ {error}</div>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* поля формы */}
    </form>
  )
}
```

### С Zod валидацией

```tsx
const userSchema = z.object({
  name: z.string().min(1, 'Обязательно'),
  email: z.string().email('Неверный email'),
  bio: z.string().optional(),
})

type UserForm = z.infer<typeof userSchema>

function EditUserForm() {
  const [loading, setLoading] = useState(true)
  
  const { register, handleSubmit, reset, formState: { isDirty } } = useForm<UserForm>({
    resolver: zodResolver(userSchema),
  })

  useEffect(() => {
    fetch('/api/user/1')
      .then(res => res.json())
      .then(data => {
        reset(data)
        setLoading(false)
      })
  }, [reset])

  if (loading) return <div>Загрузка...</div>

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} />
      <input type="email" {...register('email')} />
      <textarea {...register('bio')} />
      
      <button type="submit" disabled={!isDirty}>
        Сохранить изменения
      </button>
    </form>
  )
}
```

---

## Часть 3: Submit с Loading/Error

### Базовая обработка отправки

```tsx
function SubmitForm() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    setSubmitting(true)
    setError(null)
    
    try {
      await fetch('/api/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      reset()
      alert('Успешно отправлено!')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {error && (
        <div style={{ color: 'red', marginBottom: '1rem' }}>
          ❌ {error}
        </div>
      )}
      
      <input {...register('name')} disabled={submitting} />
      <input {...register('email')} disabled={submitting} />
      
      <button type="submit" disabled={submitting}>
        {submitting ? '⏳ Отправка...' : 'Отправить'}
      </button>
    </form>
  )
}
```

### С уведомлением об успехе

```tsx
function SubmitWithNotification() {
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  
  const { register, handleSubmit, reset } = useForm()

  const onSubmit = async (data: any) => {
    setSubmitting(true)
    setError(null)
    
    try {
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
      
      // Скрыть уведомление через 3 секунды
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ошибка отправки')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {success && (
        <div style={{
          padding: '1rem',
          background: '#d1e7dd',
          color: '#0f5132',
          marginBottom: '1rem',
          borderRadius: '4px',
        }}>
          ✅ Отправлено успешно!
        </div>
      )}
      
      {error && (
        <div style={{
          padding: '1rem',
          background: '#f8d7da',
          color: '#842029',
          marginBottom: '1rem',
          borderRadius: '4px',
        }}>
          ❌ {error}
        </div>
      )}
      
      <input {...register('name')} disabled={submitting} />
      <input {...register('email')} disabled={submitting} />
      
      <button type="submit" disabled={submitting}>
        {submitting ? '⏳ Отправка...' : 'Отправить'}
      </button>
    </form>
  )
}
```

---

## Часть 4: Debounce для автосохранения

### Базовый debounce

```tsx
function AutoSaveForm() {
  const { watch } = useForm()
  const values = watch()
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      // Автосохранение
      console.log('Auto-saved:', values)
      localStorage.setItem('draft', JSON.stringify(values))
      setSaved(true)
      
      // Скрыть индикатор через 2 секунды
      setTimeout(() => setSaved(false), 2000)
    }, 1000)  // Debounce 1 секунда

    return () => clearTimeout(timer)
  }, [values])

  return (
    <form>
      <textarea {...register('content')} />
      
      {saved && (
        <div style={{ color: 'green' }}>✓ Сохранено</div>
      )}
    </form>
  )
}
```

### С кастомным хуком useDebounce

```tsx
// Кастомный хук
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => clearTimeout(timer)
  }, [value, delay])

  return debouncedValue
}

// Использование
function SearchForm() {
  const { watch } = useForm()
  const searchQuery = watch('query')
  const debouncedQuery = useDebounce(searchQuery, 500)

  useEffect(() => {
    if (debouncedQuery) {
      // Поиск только после debounce
      console.log('Searching for:', debouncedQuery)
    }
  }, [debouncedQuery])

  return (
    <form>
      <input {...register('query')} placeholder="Поиск..." />
    </form>
  )
}
```

### Автосохранение с индикатором состояния

```tsx
function DraftForm() {
  const { watch } = useForm()
  const values = watch()
  const [status, setStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle')

  useEffect(() => {
    const timer = setTimeout(async () => {
      setStatus('saving')
      
      try {
        await fetch('/api/draft', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        })
        setStatus('saved')
        
        setTimeout(() => setStatus('idle'), 2000)
      } catch (error) {
        setStatus('error')
      }
    }, 1000)

    return () => clearTimeout(timer)
  }, [values])

  return (
    <form>
      <textarea {...register('content')} />
      
      <div style={{ marginTop: '0.5rem', fontSize: '0.875rem' }}>
        {status === 'saving' && '⏳ Сохранение...'}
        {status === 'saved' && '✓ Сохранено'}
        {status === 'error' && '❌ Ошибка сохранения'}
      </div>
    </form>
  )
}
```

---

## Полный пример: Форма регистрации с async валидацией

```tsx
import { useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  username: z.string().min(3, 'Минимум 3 символа'),
  email: z.string().email('Неверный email'),
  password: z.string().min(8, 'Минимум 8 символов'),
})

type FormData = z.infer<typeof schema>

// Имитация API
const checkUsername = async (username: string): Promise<boolean> => {
  await new Promise(r => setTimeout(r, 500))
  return !['admin', 'user', 'test'].includes(username.toLowerCase())
}

export function AsyncRegistrationForm() {
  const [checking, setChecking] = useState(false)
  const [available, setAvailable] = useState<boolean | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    mode: 'onChange',
  })

  const validateUsername = useCallback(async (value: string) => {
    if (!value || value.length < 3) return true
    
    setChecking(true)
    const isAvailable = await checkUsername(value)
    setAvailable(isAvailable)
    setChecking(false)
    
    if (!isAvailable) {
      setError('username', {
        type: 'manual',
        message: 'Имя пользователя занято',
      })
      return false
    }
    
    clearErrors('username')
    return true
  }, [setError, clearErrors])

  const onSubmit = async (data: FormData) => {
    setSubmitting(true)
    setError(null)
    
    try {
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
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('root', {
        message: err instanceof Error ? err.message : 'Ошибка отправки',
      })
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {success && (
        <div style={{ padding: '1rem', background: '#d1e7dd', marginBottom: '1rem' }}>
          ✅ Регистрация успешна!
        </div>
      )}
      
      {error && (
        <div style={{ padding: '1rem', background: '#f8d7da', marginBottom: '1rem' }}>
          ❌ {error}
        </div>
      )}

      <div>
        <label>Username</label>
        <input
          {...register('username')}
          onBlur={(e) => validateUsername(e.target.value)}
        />
        {checking && <span>⏳ Проверка...</span>}
        {available === true && <span>✅ Доступно</span>}
        {available === false && <span>❌ Занято</span>}
        {errors.username && <span className="error">{errors.username.message}</span>}
      </div>

      <div>
        <label>Email</label>
        <input type="email" {...register('email')} />
        {errors.email && <span className="error">{errors.email.message}</span>}
      </div>

      <div>
        <label>Password</label>
        <input type="password" {...register('password')} />
        {errors.password && <span className="error">{errors.password.message}</span>}
      </div>

      <button type="submit" disabled={submitting}>
        {submitting ? '⏳ Регистрация...' : 'Зарегистрироваться'}
      </button>
    </form>
  )
}
```

---

## Частые ошибки новичков

### ❌ Ошибка 1: Нет обработки loading

```tsx
// ❌ Неправильно - кнопка активна во время отправки
<button type="submit">Отправить</button>

// ✅ Правильно - показываем состояние
const { formState: { isSubmitting } } = useForm()
<button type="submit" disabled={isSubmitting}>
  {isSubmitting ? '⏳ Отправка...' : 'Отправить'}
</button>
```

**Почему это ошибка:** Пользователь может отправить форму несколько раз, если не видно состояние загрузки.

---

### ❌ Ошибка 2: Debounce без cleanup

```tsx
// ❌ Неправильно - утечка памяти
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Search:', values)
  }, 500)
  // нет cleanup
})

// ✅ Правильно - очистка таймера
useEffect(() => {
  const timer = setTimeout(() => {
    console.log('Search:', values)
  }, 500)
  return () => clearTimeout(timer) // cleanup
}, [values])
```

**Почему это ошибка:** Без очистки таймера возникает утечка памяти и могут быть гонки запросов.

---

### ❌ Ошибка 3: Нет обработки ошибок API

```tsx
// ❌ Неправильно - ошибка игнорируется
const onSubmit = async (data) => {
  await fetch('/api/submit', { body: JSON.stringify(data) })
}

// ✅ Правильно - try/catch
const onSubmit = async (data) => {
  try {
    await fetch('/api/submit', { body: JSON.stringify(data) })
  } catch (err) {
    setError('root', { message: 'Ошибка сети' })
  }
}
```

**Почему это ошибка:** Сеть может отказать, и пользователь должен увидеть понятное сообщение об ошибке.

---

### ❌ Ошибка 4: Async валидация без индикатора

```tsx
// ❌ Неправильно - пользователь ждёт без обратной связи
validate: async (value) => {
  const response = await fetch(`/api/check?username=${value}`)
  return response.json()
}

// ✅ Правильно - показываем статус
const [checking, setChecking] = useState(false)
validate: async (value) => {
  setChecking(true)
  const response = await fetch(`/api/check?username=${value}`)
  setChecking(false)
  return response.json()
}
{checking && <span>⏳ Проверка...</span>}
```

**Почему это ошибка:** Пользователь не понимает, что происходит во время проверки.

---

### ❌ Ошибка 5: reset после загрузки без обработки ошибок

```tsx
// ❌ Неправильно - ошибка загрузки игнорируется
useEffect(() => {
  fetch('/api/user/1').then(res => res.json()).then(reset)
}, [reset])

// ✅ Правильно - обработка ошибок
useEffect(() => {
  fetch('/api/user/1')
    .then(res => {
      if (!res.ok) throw new Error('Не удалось загрузить')
      return res.json()
    })
    .then(reset)
    .catch(err => setError(err.message))
}, [reset])
```

**Почему это ошибка:** Если загрузка не удастся, форма останется в состоянии загрузки без данных.

---

## 📝 Задания

Переходите к файлу [`task.md`](./task.md) для выполнения практических заданий.

---

## 📚 Дополнительные ресурсы

- [Валидация в RHF](https://react-hook-form.com/docs/useform/register#rules)
- [setError документация](https://react-hook-form.com/docs/useform/seterror)
