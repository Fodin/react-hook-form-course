import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Task2_1 } from './Task2_1'
import { Task2_2 } from './Task2_2'
import { Task2_3 } from './Task2_3'
import { Task2_4 } from './Task2_4'
import { Task2_1_Solution, Task2_2_Solution, Task2_3_Solution, Task2_4_Solution } from './Solution'
import { TheoryBlock } from '../../components/TheoryBlock'

type Task = '2.1' | '2.2' | '2.3' | '2.4'

export function ValidationExercise() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [currentTask, setCurrentTask] = useState<Task>('2.1')
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '2.1': <Task2_1 />,
    '2.2': <Task2_2 />,
    '2.3': <Task2_3 />,
    '2.4': <Task2_4 />,
  }

  const solutions = {
    '2.1': <Task2_1_Solution />,
    '2.2': <Task2_2_Solution />,
    '2.3': <Task2_3_Solution />,
    '2.4': <Task2_4_Solution />,
  }

  const taskList = [
    { id: '2.1', name: 'Built-in валидация' },
    { id: '2.2', name: 'Pattern валидация' },
    { id: '2.3', name: 'Custom валидация' },
    { id: '2.4', name: 'Cross-field валидация' },
  ]

  const placeholderStyle: React.CSSProperties = {
    marginTop: '2rem',
    padding: '2rem',
    background: isDark ? '#1c2128' : '#f0f9ff',
    borderRadius: '12px',
    border: `2px dashed ${isDark ? '#30363d' : '#646cff'}`,
    textAlign: 'center',
    color: isDark ? '#8b949e' : '#6c757d',
  }

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
        {taskList.map((task) => (
          <button
            key={task.id}
            onClick={() => setCurrentTask(task.id as Task)}
            style={{
              background: currentTask === task.id ? '#646cff' : '#ffffff',
              color: currentTask === task.id ? '#fff' : '#213547',
              border: '2px solid ' + (currentTask === task.id ? '#646cff' : '#ddd'),
              padding: '0.5rem 1rem',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: currentTask === task.id ? 600 : 400,
            }}
            onMouseEnter={(e) => {
              if (currentTask !== task.id) {
                e.currentTarget.style.borderColor = '#646cff'
                e.currentTarget.style.background = '#f0f0ff'
              }
            }}
            onMouseLeave={(e) => {
              if (currentTask !== task.id) {
                e.currentTarget.style.borderColor = '#ddd'
                e.currentTarget.style.background = '#ffffff'
              }
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

      {showSolution ? solutions[currentTask] : tasks[currentTask]}

      <div style={placeholderStyle}>
        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✏️</div>
        <div style={{ fontWeight: 600, marginBottom: '0.5rem' }}>
          Ваша форма появится здесь
        </div>
        <div style={{ fontSize: '0.9rem' }}>
          Откройте файл Task{currentTask.replace('.', '_')}.tsx и выполните задание
        </div>
      </div>

      <TheoryBlock level="2" />
    </div>
  )
}
