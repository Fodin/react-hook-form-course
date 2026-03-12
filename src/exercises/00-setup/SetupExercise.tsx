import { useState } from 'react'
import { Template } from './Template'
import { Solution } from './Solution'

export function SetupExercise() {
  const [showSolution, setShowSolution] = useState(false)

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Уровень 0: Setup
        </h1>
        <p style={{ color: '#6c757d' }}>
          Настройка проекта и первая форма
        </p>
      </header>

      <div style={{ marginBottom: '1.5rem' }}>
        <button 
          onClick={() => setShowSolution(!showSolution)}
          style={{
            background: showSolution ? '#4caf50' : '#646cff',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          {showSolution ? '🙈 Скрыть решение' : '💡 Показать решение'}
        </button>
      </div>

      {showSolution ? <Solution /> : <Template />}

      <section style={{
        marginTop: '3rem',
        padding: '1.5rem',
        background: '#f8f9fa',
        borderRadius: '8px',
        border: '1px solid #e9ecef'
      }}>
        <h2 style={{ marginBottom: '1rem' }}>📚 Теория</h2>
        <div style={{ lineHeight: 1.8 }}>
          <p>
            <strong>React Hook Form</strong> — это библиотека для управления формами в React,
            которая использует хуки для простого и эффективного способа работы с формами.
          </p>
          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem' }}>Основные концепты:</h3>
          <ul style={{ marginLeft: '1.5rem' }}>
            <li>
              <code>useForm</code> — главный хук для управления формой
            </li>
            <li>
              <code>register</code> — регистрирует поле в форме
            </li>
            <li>
              <code>handleSubmit</code> — обрабатывает отправку формы
            </li>
            <li>
              <code>formState</code> — состояние формы (ошибки, валидность, и т.д.)
            </li>
          </ul>
        </div>
      </section>
    </div>
  )
}
