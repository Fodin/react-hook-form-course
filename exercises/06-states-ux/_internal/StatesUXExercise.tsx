import { useState } from 'react'
import { useTheme } from '../../../src/hooks/useTheme'
import { useLanguage } from '../../../src/hooks/useLanguage'
import { useExerciseNavigation } from '../../../src/hooks/useExerciseNavigation'
import { TheoryBlock } from '../../../src/components/TheoryBlock'
import { FormContainer } from '../../../src/components/FormContainer'
import { TaskDescription } from '../../../src/components/TaskDescription'
import { Task6_1 } from '../Task6_1'
import { Task6_2 } from '../Task6_2'
import { Task6_3 } from '../Task6_3'
import { Task6_4 } from '../Task6_4'
import { Task6_5 } from '../Task6_5'
import { Task6_1_Solution, Task6_2_Solution, Task6_3_Solution, Task6_4_Solution, Task6_5_Solution } from './Solution'
import taskStyles from '../../../src/components/TaskButtons.module.css'
import solutionStyles from '../../../src/components/SolutionButton.module.css'

type Task = '6.1' | '6.2' | '6.3' | '6.4' | '6.5'

interface StatesUXExerciseProps {
  initialTask?: string
}

export function StatesUXExercise({ initialTask }: StatesUXExerciseProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const isDark = theme === 'dark'
  const { currentTask, changeTask } = useExerciseNavigation({
    levelId: '6',
    defaultTask: '6.1',
    validTasks: ['6.1', '6.2', '6.3', '6.4', '6.5']
  })
  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '6.1': <Task6_1 />,
    '6.2': <Task6_2 />,
    '6.3': <Task6_3 />,
    '6.4': <Task6_4 />,
    '6.5': <Task6_5 />,
  }

  const solutions = {
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
        <p style={{ color: isDark ? '#8b949e' : '#6c757d' }}>
          {t('level.6.desc')}
        </p>
      </header>

      <div className={taskStyles.container}>
        {taskList.map((task) => {
          const isActive = currentTask === task.id
          const buttonClass = `${taskStyles.button} ${
            isActive
              ? (isDark ? taskStyles.buttonActiveDark : taskStyles.buttonActiveLight)
              : (isDark ? taskStyles.buttonInactiveDark : taskStyles.buttonInactiveLight)
          }`
          return (
            <button
              key={task.id}
              onClick={() => changeTask(task.id)}
              className={buttonClass}
            >
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

      {showSolution ? solutions[currentTask] : (
        <FormContainer taskFile={`Task${currentTask.replace('.', '_')}.tsx`}>
          {tasks[currentTask]}
        </FormContainer>
      )}

      <TaskDescription taskNumber={currentTask} level="6" />

      <TheoryBlock level="6" />
    </div>
  )
}
