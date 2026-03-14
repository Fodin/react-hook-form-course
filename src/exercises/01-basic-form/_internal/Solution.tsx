import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useTheme } from '../../../hooks/useTheme'

// ============================================
// Задание 1.1: Форма регистрации — Решение
// ============================================

interface RegistrationForm {
  firstName: string
  lastName: string
  email: string
  age: number
  bio?: string
  website?: string
}

export function Task1_1_Solution() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const { register, handleSubmit, reset } = useForm<RegistrationForm>()
  const [submittedData, setSubmittedData] = useState<RegistrationForm | null>(null)

  const onSubmit = (data: RegistrationForm) => {
    console.log('Registration:', data)
    setSubmittedData(data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 1.1: Форма регистрации</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '500px' }}>
        <div className="form-group">
          <label htmlFor="firstName">Имя *</label>
          <input id="firstName" type="text" {...register('firstName', { required: true })} />
        </div>
        
        <div className="form-group">
          <label htmlFor="lastName">Фамилия *</label>
          <input id="lastName" type="text" {...register('lastName', { required: true })} />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email *</label>
          <input id="email" type="email" {...register('email', { required: true })} />
        </div>
        
        <div className="form-group">
          <label htmlFor="age">Возраст (18-100) *</label>
          <input 
            id="age" 
            type="number" 
            {...register('age', { 
              required: true, 
              valueAsNumber: true,
              min: 18,
              max: 100 
            })} 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="bio">О себе</label>
          <textarea id="bio" {...register('bio')} rows={4} style={{ width: '100%', resize: 'vertical' }} />
        </div>
        
        <div className="form-group">
          <label htmlFor="website">Сайт</label>
          <input id="website" type="url" {...register('website')} placeholder="https://example.com" />
        </div>
        
        <button type="submit">Зарегистрироваться</button>
        <button
          type="button"
          onClick={() => reset()}
          style={{ marginLeft: '0.5rem' }}
        >
          Сбросить
        </button>
      </form>

      {submittedData && (
        <div style={{
          marginTop: '2rem',
          padding: '1rem',
          background: isDark ? '#1a4d2e' : '#e8f5e9',
          borderRadius: '8px',
          color: isDark ? '#e6edf3' : '#213547'
        }}>
          <h3>📬 Данные:</h3>
          <pre>{JSON.stringify(submittedData, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}

// ============================================
// Задание 1.2: Watch — Решение
// ============================================

export function Task1_2_Solution() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  
  const { register, watch } = useForm<{ username: string; password: string }>()

  const username = watch('username', '')
  const password = watch('password', '')

  const getPasswordStrength = (pwd: string): { label: string; color: string } => {
    if (pwd.length === 0) return { label: '—', color: isDark ? '#8b949e' : '#888' }
    if (pwd.length < 6) return { label: 'Слабый 🔴', color: '#f44336' }
    if (pwd.length < 10) return { label: 'Средний 🟡', color: '#ff9800' }
    return { label: 'Сильный 🟢', color: '#4caf50' }
  }

  const strength = getPasswordStrength(password)

  return (
    <div className="exercise-container">
      <h2>✅ Задание 1.2: Watch в реальном времени</h2>
      
      <div style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input id="username" type="text" {...register('username')} placeholder="Введите username" />
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input id="password" type="password" {...register('password')} placeholder="Введите пароль" />
        </div>

        <div style={{
          marginTop: '1.5rem',
          padding: '1rem',
          background: isDark ? '#21262d' : '#f5f5f5',
          borderRadius: '8px',
          color: isDark ? '#e6edf3' : '#213547'
        }}>
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Username:</strong> {username || '(пусто)'}
          </div>
          <div style={{ marginBottom: '1rem' }}>
            <strong>Длина:</strong> {username.length} символов
          </div>
          
          <div style={{ marginBottom: '0.5rem' }}>
            <strong>Password:</strong> {password ? '•'.repeat(password.length) : '(пусто)'}
          </div>
          <div>
            <strong>Сила пароля:</strong>{' '}
            <span style={{ color: strength.color, fontWeight: 600 }}>
              {strength.label}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ============================================
// Задание 1.3: setValue и getValues — Решение
// ============================================

interface ProductForm {
  title: string
  description: string
  price: number
}

export function Task1_3_Solution() {
  const { register, handleSubmit, setValue, getValues, reset } = useForm<ProductForm>({
    defaultValues: {
      title: '',
      description: '',
      price: 0,
    }
  })

  const fillTestData = () => {
    setValue('title', 'Тестовый товар')
    setValue('description', 'Описание тестового товара')
    setValue('price', 999)
  }

  const doublePrice = () => {
    const currentPrice = getValues('price')
    setValue('price', currentPrice * 2, { shouldValidate: true })
  }

  const onSubmit = (data: ProductForm) => {
    console.log('Product:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 1.3: setValue и getValues</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '500px' }}>
        <div className="form-group">
          <label htmlFor="title">Название</label>
          <input id="title" type="text" {...register('title')} />
        </div>
        
        <div className="form-group">
          <label htmlFor="description">Описание</label>
          <textarea id="description" {...register('description')} rows={3} style={{ width: '100%' }} />
        </div>
        
        <div className="form-group">
          <label htmlFor="price">Цена</label>
          <input id="price" type="number" {...register('price', { valueAsNumber: true })} />
        </div>

        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
          <button type="button" onClick={fillTestData}>
            📝 Заполнить тестовыми
          </button>
          <button type="button" onClick={doublePrice}>
            💰 Удвоить цену
          </button>
          <button type="button" onClick={() => reset()}>
            🗑️ Очистить
          </button>
        </div>
        
        <button type="submit">Сохранить товар</button>
      </form>
    </div>
  )
}

// ============================================
// Задание 1.4: formState — Решение
// ============================================

interface LoginForm {
  email: string
  password: string
}

export function Task1_4_Solution() {
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isValid, isSubmitting, isDirty } 
  } = useForm<LoginForm>({ mode: 'onChange' })

  const onSubmit = async (data: LoginForm) => {
    await new Promise(resolve => setTimeout(resolve, 1000))
    console.log('Login:', data)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Задание 1.4: formState</h2>
      
      {/* Индикаторы состояния */}
      <div style={{ 
        display: 'flex', 
        gap: '1rem', 
        flexWrap: 'wrap', 
        marginBottom: '1.5rem',
        padding: '1rem',
        background: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{isValid ? '✅' : '❌'}</span>
          <span>Валидна: {isValid ? 'Да' : 'Нет'}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{isDirty ? '📝' : '📄'}</span>
          <span>Изменена: {isDirty ? 'Да' : 'Нет'}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{isSubmitting ? '⏳' : '✓'}</span>
          <span>{isSubmitting ? 'Отправка...' : 'Готова'}</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.5rem' }}>{Object.keys(errors).length > 0 ? '⚠️' : '✅'}</span>
          <span>Ошибок: {Object.keys(errors).length}</span>
        </div>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input 
            id="email" 
            type="email" 
            {...register('email', { required: 'Email обязателен' })} 
          />
          {errors.email && <span className="error">{errors.email.message}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input 
            id="password" 
            type="password" 
            {...register('password', { required: 'Пароль обязателен' })} 
          />
          {errors.password && <span className="error">{errors.password.message}</span>}
        </div>
        
        <button type="submit" disabled={isSubmitting || !isValid}>
          {isSubmitting ? 'Отправка...' : 'Войти'}
        </button>
      </form>
    </div>
  )
}
