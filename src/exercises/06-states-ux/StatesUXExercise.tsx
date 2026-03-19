import { useState } from 'react'

import { Task6_1, Task6_2, Task6_3, Task6_4, Task6_5 } from ".."

import {
  Task6_1_Solution,
  Task6_2_Solution,
  Task6_3_Solution,
  Task6_4_Solution,
  Task6_5_Solution,
} from './Solution'
import { FormContainer, TaskDescription, TheoryBlock } from '../../components'
import solutionStyles from '../../components/SolutionButton.module.css'
import taskStyles from '../../components/TaskButtons.module.css'
import { useTheme, useLanguage, useExerciseNavigation } from '../../hooks'

interface StatesUXExerciseProps {
  initialTask?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function StatesUXExercise(_props: StatesUXExerciseProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const { currentTask, changeTask } = useExerciseNavigation({
    levelId: '6',
    defaultTask: '6.1',
    validTasks: ['6.1', '6.2', '6.3', '6.4', '6.5'],
  })
  const [showSolution, setShowSolution] = useState(false)

  const tasks: Record<string, React.ReactElement> = {
    '6.1': <Task6_1 />,
    '6.2': <Task6_2 />,
    '6.3': <Task6_3 />,
    '6.4': <Task6_4 />,
    '6.5': <Task6_5 />,
  }

  const solutions: Record<string, React.ReactElement> = {
    '6.1': <Task6_1_Solution />,
    '6.2': <Task6_2_Solution />,
    '6.3': <Task6_3_Solution />,
    '6.4': <Task6_4_Solution />,
    '6.5': <Task6_5_Solution />,
  }

  const taskList = [
    { id: '6.1', name: 'Dirty/Touched' },
    { id: '6.2', name: 'Reset' },
    { id: '6.3', name: 'Focus' },
    { id: '6.4', name: 'A11y' },
    { id: '6.5', name: 'Performance' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {t('nav.level')} 6: {t('nav.ux')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>{t('level.6.desc')}</p>
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

      <TaskDescription taskNumber={currentTask} level="6" />

      <TheoryBlock level="6" />
    </div>
  )
}
