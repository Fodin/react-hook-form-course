import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { TheoryBlock } from '../../components/TheoryBlock'
import { FormContainer } from '../../components/FormContainer'
import { TaskDescription } from '../../components/TaskDescription'
import { Task6_1 } from './Task6_1'
import { Task6_2 } from './Task6_2'
import { Task6_3 } from './Task6_3'
import { Task6_4 } from './Task6_4'
import { Task6_5 } from './Task6_5'
import { Task6_1_Solution, Task6_2_Solution, Task6_3_Solution, Task6_4_Solution, Task6_5_Solution } from './Solution'

type Task = '6.1' | '6.2' | '6.3' | '6.4' | '6.5'

export function StatesUXExercise() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [currentTask, setCurrentTask] = useState<Task>('6.1')
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '6.1': <Task6_1 />,
    '6.2': <Task6_2 />,
    '6.3': <Task6_3 />,
    '6.4': <Task6_4 />,
    '6.5': <Task6_5 />,
  }

  const solutions = {
    '6.1': <Task6_1_Solution />,
    '6.2': <Task6_2_Solution />,
    '6.3': <Task6_3_Solution />,
    '6.4': <Task6_4_Solution />,
    '6.5': <Task6_5_Solution />,
  }

  const taskList = [
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
        {taskList.map((task) => (
          <button
            key={task.id}
            onClick={() => setCurrentTask(task.id as Task)}
            style={{
              textAlign: 'left',
              padding: '0.75rem 1rem',
              background: currentTask === task.id
                ? '#646cff'
                : (isDark ? '#161b22' : '#ffffff'),
              color: currentTask === task.id ? '#fff' : isDark ? '#e6edf3' : '#213547',
              border: '2px solid ' + (currentTask === task.id
                ? '#646cff'
                : '#30363d'),
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: currentTask === task.id ? 600 : 400,
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

      {showSolution ? solutions[currentTask] : (
        <FormContainer taskFile={`Task${currentTask.replace('.', '_')}.tsx`}>
          {tasks[currentTask]}
        </FormContainer>
      )}

      <TaskDescription taskNumber={currentTask} level="6" />

      <TheoryBlock level="6" />
    </div>
  )
}
