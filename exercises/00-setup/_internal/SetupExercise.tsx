import { useState } from 'react'
import { useTheme } from '../../../src/hooks/useTheme'
import { useLanguage } from '../../../src/hooks/useLanguage'
import { useProgress } from '../../../src/hooks/useProgress'
import { useExerciseNavigation } from '../../../src/hooks/useExerciseNavigation'
import { TheoryBlock } from '../../../src/components/TheoryBlock'
import { FormContainer } from '../../../src/components/FormContainer'
import { TaskDescription } from '../../../src/components/TaskDescription'
import { Task0_1 } from '../Task0_1'
import { Task0_2 } from '../Task0_2'
import { Task0_1_Solution, Task0_2_Solution } from './Solution'
import taskStyles from '../../../src/components/TaskButtons.module.css'
import solutionStyles from '../../../src/components/SolutionButton.module.css'

type Task = '0.1' | '0.2'

interface SetupExerciseProps {
  initialTask?: string
}

export function SetupExercise({ initialTask }: SetupExerciseProps) {
  const { theme } = useTheme()
  const { t } = useLanguage()
  const { isTaskComplete, toggleTask } = useProgress()
  const isDark = theme === 'dark'

  const { currentTask, changeTask } = useExerciseNavigation({
    levelId: '0',
    defaultTask: '0.1',
    validTasks: ['0.1', '0.2']
  })

  const [showSolution, setShowSolution] = useState(false)

  const tasks = {
    '0.1': <Task0_1 />,
    '0.2': <Task0_2 />,
  }

  const solutions = {
    '0.1': <Task0_1_Solution />,
    '0.2': <Task0_2_Solution />,
  }

  const taskList = [
    { id: '0.1', name: t('task.0.1') || 'Первая форма' },
    { id: '0.2', name: t('task.0.2') || 'Вывод данных' },
  ]

  return (
    <div>
      <header style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>
          {t('nav.level')} 0: {t('nav.setup')}
        </h1>
        <p style={{ color: 'var(--text-muted)' }}>
          {t('level.0.desc')}
        </p>
      </header>

      <div className={taskStyles.container}>
        {taskList.map((task) => {
          const completed = isTaskComplete('0', task.id)
          const isActive = currentTask === task.id
          const buttonClass = `${taskStyles.button} ${
            isActive
              ? (isDark ? taskStyles.buttonActiveDark : taskStyles.buttonActiveLight)
              : (isDark ? taskStyles.buttonInactiveDark : taskStyles.buttonInactiveLight)
          } ${completed ? taskStyles.buttonCompleted : ''}`

          return (
            <div key={task.id} className={taskStyles.taskWrapper}>
              <button
                onClick={() => changeTask(task.id)}
                className={buttonClass}
              >
                {t('task.title')} {task.id}
              </button>
              <input
                type="checkbox"
                checked={completed}
                onChange={() => toggleTask('0', task.id)}
                className={taskStyles.checkbox}
                title={completed ? 'Отметить как не выполненное' : 'Отметить как выполненное'}
              />
            </div>
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

      <TaskDescription taskNumber={currentTask} level="0" />

      <TheoryBlock level="0" />
    </div>
  )
}
