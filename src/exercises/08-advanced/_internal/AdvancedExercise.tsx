import { useState } from 'react'
import { useTheme } from '../../../hooks/useTheme'
import { useLanguage } from '../../../hooks/useLanguage'
import { TheoryBlock } from '../../../components/TheoryBlock'
import { FormContainer } from '../../../components/FormContainer'
import { TaskDescription } from '../../../components/TaskDescription'
import { Task8_1 } from '../Task8_1'
import { Task8_2 } from '../Task8_2'
import { Task8_3 } from '../Task8_3'
import { Task8_4 } from '../Task8_4'
import { Task8_5 } from '../Task8_5'
import { Task8_1_Solution, Task8_2_Solution, Task8_3_Solution, Task8_4_Solution, Task8_5_Solution } from './Solution'

type Task = '8.1' | '8.2' | '8.3' | '8.4' | '8.5'

export function AdvancedExercise() {
  const { theme } = useTheme()
  const { t } = useLanguage()
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

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {t('nav.level')} 8: {t('nav.advanced')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
          {t('level.8.desc')}
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
            background: showSolution ? '#28a745' : '#646cff',
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

      <TaskDescription taskNumber={currentTask} level="8" />

      <TheoryBlock level="8" />
    </div>
  )
}
