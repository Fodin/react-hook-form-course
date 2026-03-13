import { useState } from 'react'
import { Task1_1_Template, Task1_2_Template, Task1_3_Template, Task1_4_Template } from './Template'
import { Task1_1_Solution, Task1_2_Solution, Task1_3_Solution, Task1_4_Solution } from './Solution'
import { TheoryBlock } from '../../components/TheoryBlock'

type Task = '1.1' | '1.2' | '1.3' | '1.4'

export function BasicFormExercise() {
  const [currentTask, setCurrentTask] = useState<Task>('1.1')
  const [showSolution, setShowSolution] = useState(false)

  const templates = {
    '1.1': <Task1_1_Template />,
    '1.2': <Task1_2_Template />,
    '1.3': <Task1_3_Template />,
    '1.4': <Task1_4_Template />,
  }

  const solutions = {
    '1.1': <Task1_1_Solution />,
    '1.2': <Task1_2_Solution />,
    '1.3': <Task1_3_Solution />,
    '1.4': <Task1_4_Solution />,
  }

  const tasks: { id: Task; name: string }[] = [
    { id: '1.1', name: 'Форма регистрации' },
    { id: '1.2', name: 'Watch в реальном времени' },
    { id: '1.3', name: 'setValue и getValues' },
    { id: '1.4', name: 'formState' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          Уровень 1: Основы
        </h1>
        <p style={{ color: '#6c757d' }}>
          useForm, register, handleSubmit, watch, setValue, getValues, formState
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

      <TheoryBlock level="1" />
    </div>
  )
}
