import { useState } from 'react'
import { Template } from './Template'
import { Solution } from './Solution'
import { TheoryBlock } from '../../components/TheoryBlock'

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

      <TheoryBlock level="0" />
    </div>
  )
}
