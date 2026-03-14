import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { Task5_1 } from './Task5_1'
import { Task5_2 } from './Task5_2'
import { Task5_3 } from './Task5_3'
import { Task5_4 } from './Task5_4'
import { Task5_1_Solution, Task5_2_Solution, Task5_3_Solution, Task5_4_Solution } from './Solution'
import { TheoryBlock } from '../../components/TheoryBlock'

type Task = '5.1' | '5.2' | '5.3' | '5.4'

export function DynamicFormsExercise() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [currentTask, setCurrentTask] = useState<Task>('5.1')
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '5.1': <Task5_1 />,
    '5.2': <Task5_2 />,
    '5.3': <Task5_3 />,
    '5.4': <Task5_4 />,
  }

  const solutions = {
    '5.1': <Task5_1_Solution />,
    '5.2': <Task5_2_Solution />,
    '5.3': <Task5_3_Solution />,
    '5.4': <Task5_4_Solution />,
  }

  const taskList = [
    { id: '5.1', name: 'useFieldArray' },
    { id: '5.2', name: 'Условные поля' },
    { id: '5.3', name: 'Зависимые поля' },
    { id: '5.4', name: 'Wizard' },
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
          Уровень 5: Динамические формы
        </h1>
        <p style={{ color: '#6c757d' }}>
          useFieldArray, conditional fields, dependent fields, wizard
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

      <TheoryBlock level="5" />
    </div>
  )
}
