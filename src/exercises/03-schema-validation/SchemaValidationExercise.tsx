import { useState } from 'react'

import { Task3_1, Task3_2, Task3_3, Task3_4, Task3_5 } from ".."

import {
  Task3_1_Solution,
  Task3_2_Solution,
  Task3_3_Solution,
  Task3_4_Solution,
  Task3_5_Solution,
} from './Solution'
import { FormContainer, TaskDescription, TheoryBlock } from '../../components'
import solutionStyles from '../../components/SolutionButton.module.css'
import taskStyles from '../../components/TaskButtons.module.css'
import { useExerciseNavigation, useLanguage, useTheme } from '../../hooks'

interface SchemaValidationExerciseProps {
  initialTask?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function SchemaValidationExercise(_props: SchemaValidationExerciseProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const { currentTask, changeTask } = useExerciseNavigation({
    levelId: '3',
    defaultTask: '3.1',
    validTasks: ['3.1', '3.2', '3.3', '3.4', '3.5'],
  })
  const [showSolution, setShowSolution] = useState(false)

  const tasks: Record<string, React.ReactElement> = {
    '3.1': <Task3_1 />,
    '3.2': <Task3_2 />,
    '3.3': <Task3_3 />,
    '3.4': <Task3_4 />,
    '3.5': <Task3_5 />,
  }

  const solutions: Record<string, React.ReactElement> = {
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
          {t('nav.level')} 3: {t('nav.schemas')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>{t('level.3.desc')}</p>
      </header>

      <div className={taskStyles.container}>
        {taskList.map(task => {
          const isActive = currentTask === task.id
          const buttonClass = `${taskStyles.button} ${
            isActive
              ? isDark
                ? taskStyles.buttonActiveDark
                : taskStyles.buttonActiveLight
              : isDark
                ? taskStyles.buttonInactiveDark
                : taskStyles.buttonInactiveLight
          }`
          return (
            <button key={task.id} onClick={() => changeTask(task.id)} className={buttonClass}>
              {t('task.title')} {task.id}
            </button>
          )
        })}
      </div>

      <div className={solutionStyles.container}>
        <button
          onClick={() => setShowSolution(!showSolution)}
          className={`${solutionStyles.button} ${
            showSolution ? solutionStyles.buttonHide : solutionStyles.buttonShow
          }`}
        >
          {showSolution ? t('solution.hide') : t('solution.show')}
        </button>
      </div>

      {showSolution ? (
        solutions[currentTask]
      ) : (
        <FormContainer taskFile={`Task${currentTask.replace('.', '_')}.tsx`}>
          {tasks[currentTask]}
        </FormContainer>
      )}

      <TaskDescription taskNumber={currentTask} level="3" />

      <TheoryBlock level="3" />
    </div>
  )
}
