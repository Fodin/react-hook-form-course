import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { TheoryBlock } from '../../components/TheoryBlock'
import { FormContainer } from '../../components/FormContainer'
import { TaskDescription } from '../../components/TaskDescription'
import { Task7_1 } from './Task7_1'
import { Task7_2 } from './Task7_2'
import { Task7_3 } from './Task7_3'
import { Task7_4 } from './Task7_4'
import { Task7_1_Solution, Task7_2_Solution, Task7_3_Solution, Task7_4_Solution } from './Solution'

type Task = '7.1' | '7.2' | '7.3' | '7.4'

export function AsyncExercise() {
  const { theme } = useTheme()
  const isDark = theme === 'dark'
  const [currentTask, setCurrentTask] = useState<Task>('7.1')
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '7.1': <Task7_1 />,
    '7.2': <Task7_2 />,
    '7.3': <Task7_3 />,
    '7.4': <Task7_4 />,
  }

  const solutions = {
    '7.1': <Task7_1_Solution />,
    '7.2': <Task7_2_Solution />,
    '7.3': <Task7_3_Solution />,
    '7.4': <Task7_4_Solution />,
  }

  const taskList = [
    { id: '7.1', name: 'Async валидация' },
    { id: '7.2', name: 'Загрузка данных' },
    { id: '7.3', name: 'Submit loading/error' },
    { id: '7.4', name: 'Debounce' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Уровень 7: Асинхронность
        </h1>
        <p style={{ color: '#6c757d' }}>
          async validation, API loading, error handling, debounce
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

      {showSolution ? solutions[currentTask] : (
        <FormContainer>
          {tasks[currentTask]}
        </FormContainer>
      )}

      <TaskDescription taskNumber={currentTask} level="7" />

      <TheoryBlock level="7" />
    </div>
  )
}
