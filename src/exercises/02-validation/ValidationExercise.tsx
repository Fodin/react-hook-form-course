import { useState } from 'react'
import { Task2_1_Template, Task2_2_Template, Task2_3_Template, Task2_4_Template } from './Template'
import { Task2_1_Solution, Task2_2_Solution, Task2_3_Solution, Task2_4_Solution } from './Solution'

type Task = '2.1' | '2.2' | '2.3' | '2.4'

export function ValidationExercise() {
  const [currentTask, setCurrentTask] = useState<Task>('2.1')
  const [showSolution, setShowSolution] = useState(false)

  const templates = {
    '2.1': <Task2_1_Template />,
    '2.2': <Task2_2_Template />,
    '2.3': <Task2_3_Template />,
    '2.4': <Task2_4_Template />,
  }

  const solutions = {
    '2.1': <Task2_1_Solution />,
    '2.2': <Task2_2_Solution />,
    '2.3': <Task2_3_Solution />,
    '2.4': <Task2_4_Solution />,
  }

  const tasks: { id: Task; name: string }[] = [
    { id: '2.1', name: 'Built-in валидация' },
    { id: '2.2', name: 'Pattern валидация' },
    { id: '2.3', name: 'Custom валидация' },
    { id: '2.4', name: 'Cross-field валидация' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Уровень 2: Валидация
        </h1>
        <p style={{ color: '#6c757d' }}>
          required, minLength, maxLength, pattern, validate, cross-field
        </p>
      </header>

      <div style={{ marginBottom: '1.5rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => setCurrentTask(task.id)}
            style={{
              background: currentTask === task.id ? '#646cff' : '#ffffff',
              color: currentTask === task.id ? '#fff' : '#213547',
              border: currentTask === task.id ? '2px solid #646cff' : '1px solid #ddd',
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Задание {task.id}
          </button>
        ))}
      </div>

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

      {showSolution ? solutions[currentTask] : templates[currentTask]}

      <section style={{ 
        marginTop: '3rem', 
        padding: '1.5rem', 
        background: '#f8f9fa', 
        borderRadius: '8px' 
      }}>
        <h2 style={{ marginBottom: '1rem' }}>📚 Теория</h2>
        <div style={{ lineHeight: 1.8 }}>
          <h3>Built-in валидация</h3>
          <p>
            React Hook Form предоставляет встроенные правила: required, minLength, maxLength, min, max, pattern.
          </p>
          
          <h3 style={{ marginTop: '1rem' }}>Custom валидация</h3>
          <p>
            Функция validate позволяет создавать сложные правила валидации с кастомными сообщениями.
          </p>
          
          <h3 style={{ marginTop: '1rem' }}>Cross-field валидация</h3>
          <p>
            Используйте watch для получения значений других полей и валидируйте на их основе.
          </p>
          
          <h3 style={{ marginTop: '1rem' }}>mode валидации</h3>
          <p>
            onChange — валидация при изменении, onBlur — при потере фокуса, onSubmit — при отправке.
          </p>
        </div>
      </section>
    </div>
  )
}
