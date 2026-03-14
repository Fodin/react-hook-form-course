import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Task8_1 } from './Task8_1'
import { Task8_2 } from './Task8_2'
import { Task8_3 } from './Task8_3'
import { Task8_4 } from './Task8_4'
import { Task8_5 } from './Task8_5'
import { Task8_1_Solution, Task8_2_Solution, Task8_3_Solution, Task8_4_Solution, Task8_5_Solution } from './Solution'
import { TheoryBlock } from '../../components/TheoryBlock'

type Task = '8.1' | '8.2' | '8.3' | '8.4' | '8.5'

export function AdvancedExercise() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [currentTask, setCurrentTask] = useState<Task>('8.1')
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '8.1': <Task8_1 />,
    '8.2': <Task8_2 />,
    '8.3': <Task8_3 />,
    '8.4': <Task8_4 />,
    '8.5': <Task8_5 />,
  }

  const solutions = {
    '8.1': <Task8_1_Solution />,
    '8.2': <Task8_2_Solution />,
    '8.3': <Task8_3_Solution />,
    '8.4': <Task8_4_Solution />,
    '8.5': <Task8_5_Solution />,
  }

  const taskList = [
    { id: '8.1', name: 'UI-библиотека' },
    { id: '8.2', name: 'Кастомный хук' },
    { id: '8.3', name: 'FormContext' },
    { id: '8.4', name: 'localStorage' },
    { id: '8.5', name: 'Финальный' },
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
          Уровень 8: Продвинутые Техники
        </h1>
        <p style={{ color: '#6c757d' }}>
          UI интеграция, кастомные хуки, context, persistence, финальный проект
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
            background: showSolution ? '#28a745' : '#646cff',
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

      <TheoryBlock level="8" />
    </div>
  )
}
