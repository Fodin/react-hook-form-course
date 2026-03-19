import { useState } from 'react'

import { Task2_1, Task2_2, Task2_3, Task2_4 } from ".."

import { Task2_1_Solution, Task2_2_Solution, Task2_3_Solution, Task2_4_Solution } from './Solution'
import { FormContainer, TaskDescription, TheoryBlock } from '../../components'
import solutionStyles from '../../components/SolutionButton.module.css'
import taskStyles from '../../components/TaskButtons.module.css'
import { useExerciseNavigation, useLanguage, useTheme } from '../../hooks'

interface ValidationExerciseProps {
  initialTask?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ValidationExercise(_props: ValidationExerciseProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'

  const { currentTask, changeTask } = useExerciseNavigation({
    levelId: '2',
    defaultTask: '2.1',
    validTasks: ['2.1', '2.2', '2.3', '2.4'],
  })

  const [showSolution, setShowSolution] = useState(false)

  const tasks: Record<string, React.ReactElement> = {
    '2.1': <Task2_1 />,
    '2.2': <Task2_2 />,
    '2.3': <Task2_3 />,
    '2.4': <Task2_4 />,
  }

  const solutions: Record<string, React.ReactElement> = {
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
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>{t('level.2.desc')}</p>
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

      <TaskDescription taskNumber={currentTask} level="2" />

      <TheoryBlock level="2" />
    </div>
  )
}
