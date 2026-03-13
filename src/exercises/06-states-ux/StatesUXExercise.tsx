import { useState } from 'react'
import { TheoryBlock } from '../../components/TheoryBlock'
import { Task6_1_Template, Task6_2_Template, Task6_3_Template, Task6_4_Template, Task6_5_Template } from './Template'
import { Task6_1_Solution, Task6_2_Solution, Task6_3_Solution, Task6_4_Solution, Task6_5_Solution } from './Solution'

type Task = '6.1' | '6.2' | '6.3' | '6.4' | '6.5'

export function StatesUXExercise() {
  const [currentTask, setCurrentTask] = useState<Task>('6.1')
  const [showSolution, setShowSolution] = useState(false)

  const templates: Record<Task, React.ReactNode> = {
    '6.1': <Task6_1_Template />,
    '6.2': <Task6_2_Template />,
    '6.3': <Task6_3_Template />,
    '6.4': <Task6_4_Template />,
    '6.5': <Task6_5_Template />,
  }

  const solutions: Record<Task, React.ReactNode> = {
    '6.1': <Task6_1_Solution />,
    '6.2': <Task6_2_Solution />,
    '6.3': <Task6_3_Solution />,
    '6.4': <Task6_4_Solution />,
    '6.5': <Task6_5_Solution />,
  }

  const tasks: { id: Task; name: string }[] = [
    { id: '6.1', name: 'Dirty/Touched' },
    { id: '6.2', name: 'Reset' },
    { id: '6.3', name: 'Focus' },
    { id: '6.4', name: 'A11y' },
    { id: '6.5', name: 'Performance' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Уровень 6: Состояния и UX
        </h1>
        <p style={{ color: '#6c757d' }}>
          dirty, touched, reset, focus management, accessibility, performance
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
            {task.name}
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

      {showSolution ? solutions[currentTask] : templates[currentTask]}

      <TheoryBlock level="6" />
    </div>
  )
}
