import { useState } from 'react'
import { useTheme } from '../../../hooks/useTheme'
import { useLanguage } from '../../../hooks/useLanguage'
import { TheoryBlock } from '../../../components/TheoryBlock'
import { FormContainer } from '../../../components/FormContainer'
import { TaskDescription } from '../../../components/TaskDescription'
import { Task1_1 } from '../Task1_1'
import { Task1_2 } from '../Task1_2'
import { Task1_3 } from '../Task1_3'
import { Task1_4 } from '../Task1_4'
import { Task1_1_Solution, Task1_2_Solution, Task1_3_Solution, Task1_4_Solution } from './Solution'

type Task = '1.1' | '1.2' | '1.3' | '1.4'

export function BasicFormExercise() {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'

  const [currentTask, setCurrentTask] = useState<Task>('1.1')
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '1.1': <Task1_1 />,
    '1.2': <Task1_2 />,
    '1.3': <Task1_3 />,
    '1.4': <Task1_4 />,
  }

  const solutions = {
    '1.1': <Task1_1_Solution />,
    '1.2': <Task1_2_Solution />,
    '1.3': <Task1_3_Solution />,
    '1.4': <Task1_4_Solution />,
  }

  const taskList: { id: Task; name: string }[] = [
    { id: '1.1', name: 'Форма регистрации' },
    { id: '1.2', name: 'Watch в реальном времени' },
    { id: '1.3', name: 'setValue и getValues' },
    { id: '1.4', name: 'formState' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {t('nav.level')} 1: {t('nav.basics')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
          {t('level.1.desc')}
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

      <TaskDescription taskNumber={currentTask} level="1" />

      <TheoryBlock level="1" />
    </div>
  )
}
