import { useState } from 'react'
import { useTheme } from '../../../hooks/useTheme'
import { useLanguage } from '../../../hooks/useLanguage'
import { TheoryBlock } from '../../../components/TheoryBlock'
import { FormContainer } from '../../../components/FormContainer'
import { TaskDescription } from '../../../components/TaskDescription'
import { Task2_1 } from '../Task2_1'
import { Task2_2 } from '../Task2_2'
import { Task2_3 } from '../Task2_3'
import { Task2_4 } from '../Task2_4'
import { Task2_1_Solution, Task2_2_Solution, Task2_3_Solution, Task2_4_Solution } from './Solution'

type Task = '2.1' | '2.2' | '2.3' | '2.4'

export function ValidationExercise() {
  const { theme } = useTheme()
  const { t } = useLanguage()
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

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {t('nav.level')} 2: {t('nav.validation')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
          {t('level.2.desc')}
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
            {t('task.title')} {task.id}
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
          {showSolution ? t('solution.hide') : t('solution.show')}
        </button>
      </div>

      {showSolution ? solutions[currentTask] : (
        <FormContainer taskFile={`Task${currentTask.replace('.', '_')}.tsx`}>
          {tasks[currentTask]}
        </FormContainer>
      )}

      <TaskDescription taskNumber={currentTask} level="2" />

      <TheoryBlock level="2" />
    </div>
  )
}
