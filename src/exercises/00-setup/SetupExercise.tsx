import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Task0_1 } from './Task0_1'
import { Task0_1_Solution } from './Solution'
import { TheoryBlock } from '../../components/TheoryBlock'

type Task = '0.1'

export function SetupExercise() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [currentTask, setCurrentTask] = useState<Task>('0.1')
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '0.1': <Task0_1 />,
  }

  const solutions = {
    '0.1': <Task0_1_Solution />,
  }

  const taskList = [
    { id: '0.1', name: 'Первая форма' },
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
          Уровень 0: Setup
        </h1>
        <p style={{ color: '#6c757d' }}>
          Настройка проекта и первая форма
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

      <TheoryBlock level="0" />
    </div>
  )
}
