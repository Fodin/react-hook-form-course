import { useState } from 'react'

import { Task7_1, Task7_2, Task7_3, Task7_4 } from ".."

import { Task7_1_Solution, Task7_2_Solution, Task7_3_Solution, Task7_4_Solution } from './Solution'
import { FormContainer, TaskDescription, TheoryBlock } from '../../components'
import solutionStyles from '../../components/SolutionButton.module.css'
import taskStyles from '../../components/TaskButtons.module.css'
import { useTheme, useLanguage, useExerciseNavigation } from '../../hooks'

interface AsyncExerciseProps {
  initialTask?: string
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function AsyncExercise(_props: AsyncExerciseProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const { currentTask, changeTask } = useExerciseNavigation({
    levelId: '7',
    defaultTask: '7.1',
    validTasks: ['7.1', '7.2', '7.3', '7.4'],
  })
  const [showSolution, setShowSolution] = useState(false)

  const tasks: Record<string, React.ReactElement> = {
    '7.1': <Task7_1 />,
    '7.2': <Task7_2 />,
    '7.3': <Task7_3 />,
    '7.4': <Task7_4 />,
  }

  const solutions: Record<string, React.ReactElement> = {
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
          {t('nav.level')} 7: {t('nav.async')}
        </h1>
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>{t('level.7.desc')}</p>
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

      <TaskDescription taskNumber={currentTask} level="7" />

      <TheoryBlock level="7" />
    </div>
  )
}
