import { useState } from 'react'
import { useTheme } from '../../../hooks/useTheme'
import { useLanguage } from '../../../hooks/useLanguage'
import { TheoryBlock } from '../../../components/TheoryBlock'
import { FormContainer } from '../../../components/FormContainer'
import { TaskDescription } from '../../../components/TaskDescription'
import { Task4_1 } from '../Task4_1'
import { Task4_2 } from '../Task4_2'
import { Task4_3 } from '../Task4_3'
import { Task4_4 } from '../Task4_4'
import { Task4_5 } from '../Task4_5'
import { Task4_1_Solution, Task4_2_Solution, Task4_3_Solution, Task4_4_Solution, Task4_5_Solution } from './Solution'

type Task = '4.1' | '4.2' | '4.3' | '4.4' | '4.5'

export function ComplexFieldsExercise() {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const [currentTask, setCurrentTask] = useState<Task>('4.1')
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '4.1': <Task4_1 />,
    '4.2': <Task4_2 />,
    '4.3': <Task4_3 />,
    '4.4': <Task4_4 />,
    '4.5': <Task4_5 />,
  }

  const solutions = {
    '4.1': <Task4_1_Solution />,
    '4.2': <Task4_2_Solution />,
    '4.3': <Task4_3_Solution />,
    '4.4': <Task4_4_Solution />,
    '4.5': <Task4_5_Solution />,
  }

  const taskList = [
    { id: '4.1', name: 'Controller' },
    { id: '4.2', name: 'Radio/Select' },
    { id: '4.3', name: 'Checkbox' },
    { id: '4.4', name: 'File Upload' },
    { id: '4.5', name: 'Дата/Время' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {t('nav.level')} 4: {t('nav.complex')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
          {t('level.4.desc')}
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

      <TaskDescription taskNumber={currentTask} level="4" />

      <TheoryBlock level="4" />
    </div>
  )
}
