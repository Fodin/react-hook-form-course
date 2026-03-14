import { useState } from 'react'
import { useTheme } from '../../hooks/useTheme'
import { TheoryBlock } from '../../components/TheoryBlock'
import { FormContainer } from '../../components/FormContainer'
import { TaskDescription } from '../../components/TaskDescription'
import { Task5_1 } from './Task5_1'
import { Task5_2 } from './Task5_2'
import { Task5_3 } from './Task5_3'
import { Task5_4 } from './Task5_4'
import { Task5_1_Solution, Task5_2_Solution, Task5_3_Solution, Task5_4_Solution } from './Solution'

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

      <TaskDescription taskNumber={currentTask} level="5" />

      <TheoryBlock level="5" />
    </div>
  )
}
