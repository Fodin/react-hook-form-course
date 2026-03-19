import { useState } from 'react'
import { useForm } from 'react-hook-form'

interface LoginForm {
  email: string
  password: string
}

export function Solution() {
  const { register, handleSubmit } = useForm<LoginForm>()
  const [submittedData, setSubmittedData] = useState<LoginForm | null>(null)

  const onSubmit = (data: LoginForm) => {
    console.log('Form submitted:', data)
    setSubmittedData(data)
  }

  const handleClear = () => {
    setSubmittedData(null)
  }

  return (
    <div className="exercise-container">
      <h2>✅ Решение: Первая форма</h2>

      <form onSubmit={handleSubmit(onSubmit)} style={{ maxWidth: '400px' }}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            {...register('email')}
            placeholder="Введите email"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль</label>
          <input
            id="password"
            type="password"
            {...register('password')}
            placeholder="Введите пароль"
            required
          />
        </div>

        <button type="submit">Войти</button>
      </form>

      {submittedData && (
        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            background: '#e8f5e9',
            borderRadius: '8px',
            border: '1px solid #4caf50',
          }}
        >
          <h3>📬 Данные формы:</h3>
          <pre style={{ marginTop: '0.5rem' }}>{JSON.stringify(submittedData, null, 2)}</pre>
          <button onClick={handleClear} style={{ marginTop: '1rem' }}>
            Очистить
          </button>
        </div>
      )}
    </div>
  )
}
