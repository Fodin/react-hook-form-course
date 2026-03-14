import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { TheoryBlock } from '../../components/TheoryBlock'
import { FormContainer } from '../../components/FormContainer'
import { TaskDescription } from '../../components/TaskDescription'
import { Task3_1 } from './Task3_1'
import { Task3_2 } from './Task3_2'
import { Task3_3 } from './Task3_3'
import { Task3_4 } from './Task3_4'
import { Task3_5 } from './Task3_5'
import { Task3_1_Solution, Task3_2_Solution, Task3_3_Solution, Task3_4_Solution, Task3_5_Solution } from './Solution'

type Task = '3.1' | '3.2' | '3.3' | '3.4' | '3.5'

export function SchemaValidationExercise() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [currentTask, setCurrentTask] = useState<Task>('3.1')
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '3.1': <Task3_1 />,
    '3.2': <Task3_2 />,
    '3.3': <Task3_3 />,
    '3.4': <Task3_4 />,
    '3.5': <Task3_5 />,
  }

  const solutions = {
    '3.1': <Task3_1_Solution />,
    '3.2': <Task3_2_Solution />,
    '3.3': <Task3_3_Solution />,
    '3.4': <Task3_4_Solution />,
    '3.5': <Task3_5_Solution />,
  }

  const taskList = [
    { id: '3.1', name: 'Zod базовая' },
    { id: '3.2', name: 'Yup базовая' },
    { id: '3.3', name: 'Сложные схемы' },
    { id: '3.4', name: 'refine' },
    { id: '3.5', name: 'Сравнение' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Уровень 3: Валидация по схемам
        </h1>
        <p style={{ color: '#6c757d' }}>
          Zod, Yup, @hookform/resolvers, сложные схемы, refine
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
              background: currentTask === task.id ? '#646cff' : isDark ? '#161b22' : '#ffffff',
              color: currentTask === task.id ? '#fff' : isDark ? '#e6edf3' : '#213547',
              border: '2px solid ' + (currentTask === task.id ? '#646cff' : '#30363d'),
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 0.2s',
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

      {showSolution ? solutions[currentTask] : (
        <FormContainer>
          {tasks[currentTask]}
        </FormContainer>
      )}

      <TaskDescription taskNumber={currentTask} level="3" />

      <TheoryBlock level="3" />
    </div>
  )
}
